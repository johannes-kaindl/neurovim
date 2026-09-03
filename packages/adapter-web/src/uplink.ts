/**
 * Uplink settings + wiring — between the player's switch and `WebLlm`.
 *
 * **Off by default, and connecting only after a deliberate switch-on** (decided 2026-09-02).
 * The reason is mechanical, not polite: Chromium stores a Local Network Access refusal *per
 * origin and permanently*, so a permission prompt that appears unasked gets dismissed by
 * reflex — and that one reflex costs the feature forever, with no way back inside the page.
 * Hence: no connection attempt at startup, not even a probe. The first request to `localhost`
 * happens after a click, when the player knows what the browser is asking about.
 *
 * These settings are **device-local, not game state**: they live in localStorage next to the
 * display prefs, never in `PluginData`. An endpoint address says nothing about progress and
 * has no business travelling with a save file or a score export.
 */
import { WebLlm, refusalHint } from './ports/WebLlm';
import { makeLlmClient } from './vendor/code-kit/web/llm-stream';

const KEY = 'neurovim:uplink';

export interface UplinkSettings {
  /** The switch. Nothing reaches the network while this is false. */
  enabled: boolean;
  /** Base address of an OpenAI-compatible server, as the player typed it. */
  endpoint: string;
  model: string;
}

export const UPLINK_DEFAULTS: UplinkSettings = { enabled: false, endpoint: '', model: '' };

export function loadUplinkSettings(): UplinkSettings {
  try {
    return { ...UPLINK_DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return { ...UPLINK_DEFAULTS };
  }
}

export function saveUplinkSettings(s: UplinkSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode: the switch simply does not survive a reload */
  }
}

/** Base URL for the vendored transport, from whatever the player typed.
 *
 *  Measured against `web/llm-stream` (2026-09-03): `OpenAIClient` requests
 *  `${base}/chat/completions` and `${base}/models` — it appends no `/v1`. The base therefore
 *  has to carry it, which is why code-kit's `normalizeEndpoint` is **not** used here: that
 *  one *strips* a trailing `/v1`, correctly, for the obsidian-kit clients that add it back.
 *  Same word, opposite direction — a vendored helper is only right inside its own contract. */
function baseUrlFrom(endpoint: string): string {
  const trimmed = endpoint.trim().replace(/\/+$/, '');
  return /\/v1$/.test(trimmed) ? trimmed : `${trimmed}/v1`;
}

export function createUplink(
  s: UplinkSettings,
  deps: {
    fetchFn?: (url: string, init: RequestInit) => Promise<Response>;
    timeoutMs?: number;
    userAgent?: string;
  } = {},
): WebLlm | null {
  if (!s.enabled) return null;
  if (s.endpoint.trim() === '') return null;
  return new WebLlm(
    {
      endpoint: { type: 'openai', baseUrl: baseUrlFrom(s.endpoint) },
      model: s.model,
      timeoutMs: deps.timeoutMs,
    },
    { fetchFn: deps.fetchFn, userAgent: deps.userAgent },
  );
}

export interface ModelListResult {
  reachable: boolean;
  models: string[];
  detail: string;
}

/** Ask the server what it serves — the round-trip behind the model dropdown.
 *
 *  This is the *only* probe the panel makes, and it doubles as the reachability check:
 *  `/models` is cheaper than a completion and cannot fail for the second reason a completion
 *  can (a model name the player mistyped). It runs on a press, never on a render — same rule
 *  as everything else here.
 *
 *  A failure is translated the same way `WebLlm` translates one, and for the same reason: a
 *  dead server, Chromium's Local-Network-Access denial and Safari's block all arrive as one
 *  indistinguishable `TypeError`. Hence the shared `refusalHint` rather than a second
 *  half-answer written next to it. */
export async function fetchModels(
  s: UplinkSettings,
  deps: {
    fetchFn?: (url: string, init?: RequestInit) => Promise<Response>;
    userAgent?: string;
  } = {},
): Promise<ModelListResult> {
  if (s.endpoint.trim() === '') return { reachable: false, models: [], detail: 'No server configured.' };
  const fetchFn = deps.fetchFn ?? ((url: string, init?: RequestInit) => fetch(url, init));
  const userAgent =
    deps.userAgent ?? (typeof navigator === 'undefined' ? '' : navigator.userAgent);
  const client = makeLlmClient({ type: 'openai', baseUrl: baseUrlFrom(s.endpoint) }, fetchFn);
  try {
    return { reachable: true, models: await client.listModels(), detail: '' };
  } catch (e) {
    const cause = e instanceof Error ? e.message : String(e);
    return { reachable: false, models: [], detail: `${cause} — ${refusalHint(userAgent)}` };
  }
}
