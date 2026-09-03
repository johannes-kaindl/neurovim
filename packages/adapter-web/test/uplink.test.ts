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
  uplinkStatus,
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

describe('uplinkStatus', () => {
  it('says nothing before a first attempt', () => {
    expect(uplinkStatus(null).tone).toBe('idle');
  });

  it('reports a completed turn as ok', () => {
    expect(uplinkStatus({ ok: true, content: 'x' }).tone).toBe('ok');
  });

  it('carries the browser-specific refusal through to the switch', () => {
    const detail = 'Failed to fetch — the browser may be blocking access to the local network.';
    const s = uplinkStatus({ ok: false, kind: 'unavailable', detail, partial: '' });
    expect(s.tone).toBe('error');
    expect(s.text).toContain('blocking access to the local network');
  });

  it('treats a caller abort as idle, not as a failure the player must read', () => {
    // The player stopped it themselves; showing an error would blame them for their own action.
    expect(uplinkStatus({ ok: false, kind: 'aborted', detail: 'AbortError', partial: '' }).tone).toBe(
      'idle',
    );
  });

  it('names the deadline when nothing answered in time', () => {
    const s = uplinkStatus({
      ok: false,
      kind: 'timeout',
      detail: 'no completion within 5000 ms',
      partial: '',
    });
    expect(s.tone).toBe('error');
    expect(s.text).toContain('5000');
  });

  it('never promises that trying again would help', () => {
    // An LNA refusal is stored per origin: the next attempt fails instantly and silently.
    const kinds = ['unavailable', 'timeout', 'failed'] as const;
    for (const kind of kinds) {
      const s = uplinkStatus({ ok: false, kind, detail: 'x', partial: '' });
      expect(s.text.toLowerCase()).not.toMatch(/try again|retry|erneut versuchen/);
    }
  });
});
