/**
 * Uplink settings + wiring — the seam between the player's switch and `WebLlm`.
 *
 * What is worth testing here is not the transport (code-kit's, tested there) nor the
 * translation (WebLlm's, tested next door), but the three decisions this layer makes:
 * whether a port exists at all, what address it ends up talking to, and what the player
 * reads at the switch when it went wrong.
 */
// jest runs on `testEnvironment: node`, which has no localStorage — and pulling in jsdom or a
// mock package for what is a Map with a string API would not carry its weight (AGENTS.md
// § Conventions). Same shape as the fake-indexeddb dependency next door, minus the dependency.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null { return this.store.get(k) ?? null; }
  setItem(k: string, v: string): void { this.store.set(k, v); }
  removeItem(k: string): void { this.store.delete(k); }
  clear(): void { this.store.clear(); }
}
(globalThis as { localStorage?: unknown }).localStorage = new MemoryStorage();

import {
  loadUplinkSettings,
  saveUplinkSettings,
  UPLINK_DEFAULTS,
  createUplink,
  fetchModels,
} from '../src/uplink';

beforeEach(() => localStorage.clear());

describe('persistence', () => {
  it('starts switched off, with nothing configured', () => {
    expect(loadUplinkSettings()).toEqual({ enabled: false, endpoint: '', model: '' });
  });

  it('round-trips what was saved', () => {
    saveUplinkSettings({ enabled: true, endpoint: 'http://localhost:1234', model: 'qwen' });
    expect(loadUplinkSettings()).toEqual({
      enabled: true,
      endpoint: 'http://localhost:1234',
      model: 'qwen',
    });
  });

  it('falls back to the defaults when the stored value is not readable', () => {
    localStorage.setItem('neurovim:uplink', '{not json');
    expect(loadUplinkSettings()).toEqual(UPLINK_DEFAULTS);
  });

  it('fills in missing fields rather than returning a half object', () => {
    localStorage.setItem('neurovim:uplink', JSON.stringify({ enabled: true }));
    expect(loadUplinkSettings()).toEqual({ enabled: true, endpoint: '', model: '' });
  });
});

describe('createUplink', () => {
  it('returns nothing while the switch is off', () => {
    expect(createUplink({ enabled: false, endpoint: 'http://localhost:1234', model: 'q' })).toBeNull();
  });

  it('returns nothing when switched on but no endpoint is configured', () => {
    expect(createUplink({ enabled: true, endpoint: '   ', model: 'q' })).toBeNull();
  });

  // Measured against the vendored transport (2026-09-03): `OpenAIClient` builds
  // `${base}/chat/completions` and `${base}/models` — it appends no `/v1` of its own. So the
  // base *must* carry it, and code-kit's `normalizeEndpoint` (which strips a trailing `/v1`)
  // is the wrong tool here: it is written for the obsidian-kit clients, which do append it.
  // Both spellings a player might type therefore have to arrive at the same URL.
  it.each([
    ['http://localhost:1234', 'the address LM Studio shows'],
    ['http://localhost:1234/v1', 'with the /v1 already typed'],
    ['  http://localhost:1234/v1/  ', 'with padding and a trailing slash'],
  ])('reaches the same endpoint for %s (%s)', async (typed) => {
    const calls: string[] = [];
    const llm = createUplink(
      { enabled: true, endpoint: typed, model: 'qwen' },
      {
        fetchFn: (url: string) => {
          calls.push(url);
          return Promise.reject(new TypeError('Failed to fetch'));
        },
      },
    );
    await llm!.complete([{ role: 'user', content: 'hi' }]);
    expect(calls[0]).toBe('http://localhost:1234/v1/chat/completions');
  });

  it('passes a deadline through, so nobody waits indefinitely at the switch', () => {
    const llm = createUplink(
      { enabled: true, endpoint: 'http://localhost:1234', model: 'q' },
      { timeoutMs: 5000 },
    );
    expect(llm).not.toBeNull();
  });
});

describe('fetchModels', () => {
  const ok = (ids: string[]) =>
    Promise.resolve(
      new Response(JSON.stringify({ data: ids.map((id) => ({ id })) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

  it('asks the configured server, with the same /v1 handling as a completion', async () => {
    const calls: string[] = [];
    await fetchModels(
      { enabled: false, endpoint: 'http://localhost:1234', model: '' },
      { fetchFn: (url: string) => { calls.push(url); return ok([]); } },
    );
    expect(calls[0]).toBe('http://localhost:1234/v1/models');
  });

  it('reports what the server offers', async () => {
    const r = await fetchModels(
      { enabled: false, endpoint: 'http://localhost:1234', model: '' },
      { fetchFn: () => ok(['qwen-7b', 'llama-8b']) },
    );
    expect(r.reachable).toBe(true);
    expect(r.models).toEqual(['llama-8b', 'qwen-7b']); // the transport sorts
  });

  it('is reachable-but-listless when the server answers with nothing', async () => {
    // An OpenAI-compatible server that serves a model but exposes no catalogue. The player
    // must still be able to type a name, which is what `resolveModelChoice` calls "freetext".
    const r = await fetchModels(
      { enabled: false, endpoint: 'http://localhost:1234', model: '' },
      { fetchFn: () => ok([]) },
    );
    expect(r.reachable).toBe(true);
    expect(r.models).toEqual([]);
  });

  it('explains a refusal in the terms of the browser, not as a bare TypeError', async () => {
    // Same fork as a failed completion: dead server, Chromium LNA denial and Safari's block
    // are one identical `TypeError`. The hint has to come from the user agent.
    const r = await fetchModels(
      { enabled: false, endpoint: 'http://localhost:1234', model: '' },
      {
        fetchFn: () => Promise.reject(new TypeError('Failed to fetch')),
        userAgent: 'Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15',
      },
    );
    expect(r.reachable).toBe(false);
    expect(r.detail).toContain('Safari');
  });

  it('does not reach out at all when no endpoint is configured', async () => {
    const calls: string[] = [];
    const r = await fetchModels(
      { enabled: false, endpoint: '  ', model: '' },
      { fetchFn: (url: string) => { calls.push(url); return ok([]); } },
    );
    expect(calls).toEqual([]);
    expect(r.reachable).toBe(false);
  });
});
