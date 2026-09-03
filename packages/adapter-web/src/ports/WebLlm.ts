/**
 * WebLlm — `LlmPort` for the web target, over the vendored code-kit browser transport.
 *
 * The transport is not this file's work: `web/llm-stream` already does fetch, SSE and the
 * reader pump, and it is tested in code-kit. What lives here is the translation between two
 * error surfaces that do not line up. The transport *throws* — an `LlmHttpError`, an
 * `AbortError`, or the runtime's own bare `TypeError` — and a throw loses whatever already
 * streamed. `LlmPort.complete()` never throws: it returns one of four kinds plus the
 * `partial`, because CIPHER's chat renders a cut-off answer rather than dropping it.
 *
 * Two distinctions the exceptions themselves cannot make:
 *  - **deadline vs. caller abort** — both arrive as an `AbortError`; only the controller
 *    that fired knows which, so this class owns both and remembers.
 *  - **why nothing answered** — a dead server, Chromium's Local-Network-Access denial and
 *    Safari's mixed-content block are one identical `TypeError`. See `refusalHint`.
 */
import type { LlmMessage, LlmPort, LlmResult } from '@neurovim/core';
import { LlmHttpError, makeLlmClient, type LlmEndpoint, type LlmFetch } from '../vendor/code-kit/web/llm-stream';
import { errorMessageFromText } from '../vendor/code-kit/pure/error_body';

export interface WebLlmConfig {
  endpoint: LlmEndpoint;
  model: string;
  /** How long to wait before giving up, in ms. Omitted = wait indefinitely; a caller that
   *  wants a bounded wait must say so, because only it knows what the player is waiting on. */
  timeoutMs?: number;
}

export interface WebLlmDeps {
  /** Injected so tests drive real Responses; defaults to the page's own fetch. */
  fetchFn?: LlmFetch;
  /** Injected so the browser-specific refusal hint is testable; defaults to the page's UA. */
  userAgent?: string;
}

export class WebLlm implements LlmPort {
  private readonly fetchFn: LlmFetch;
  private readonly userAgent: string;

  constructor(private readonly config: WebLlmConfig, deps: WebLlmDeps = {}) {
    this.fetchFn = deps.fetchFn ?? ((url, init) => fetch(url, init));
    this.userAgent = deps.userAgent ?? (typeof navigator === 'undefined' ? '' : navigator.userAgent);
  }

  async complete(
    messages: LlmMessage[],
    opts?: { onToken?: (t: string) => void; signal?: AbortSignal },
  ): Promise<LlmResult> {
    const client = makeLlmClient(this.config.endpoint, this.fetchFn);
    let content = '';

    // One controller for both stop conditions, so a fired deadline and a caller abort
    // reach the transport the same way — `timedOut` is what tells them apart afterwards,
    // since both come back as an indistinguishable AbortError.
    const controller = new AbortController();
    let timedOut = false;
    const onCallerAbort = () => controller.abort();
    if (opts?.signal?.aborted) controller.abort();
    else opts?.signal?.addEventListener('abort', onCallerAbort);
    const timer =
      this.config.timeoutMs === undefined
        ? undefined
        : setTimeout(() => {
            timedOut = true;
            controller.abort();
          }, this.config.timeoutMs);

    try {
      try {
        await client.chatStream({
          model: this.config.model,
          messages,
          onToken: (t) => {
            content += t;
            opts?.onToken?.(t);
          },
          signal: controller.signal,
        });
      } catch (e) {
        if (isAbort(e)) {
          if (timedOut) {
            const detail = `no completion within ${String(this.config.timeoutMs)} ms`;
            return { ok: false, kind: 'timeout', detail, partial: content };
          }
          return { ok: false, kind: 'aborted', detail: describe(e), partial: content };
        }
        if (e instanceof LlmHttpError) {
          return { ok: false, kind: httpKind(e.status), detail: httpDetail(e), partial: content };
        }
        return {
          ok: false,
          kind: 'unavailable',
          detail: `${describe(e)} — ${refusalHint(this.userAgent)}`,
          partial: content,
        };
      }
      return { ok: true, content };
    } finally {
      if (timer !== undefined) clearTimeout(timer);
      opts?.signal?.removeEventListener('abort', onCallerAbort);
    }
  }
}

/** Why a local model server stayed silent, in the terms of the browser the player is using.
 *  Every cause collapses into one bare `TypeError: Failed to fetch`, so the message has to
 *  supply what the exception cannot (measured 2026-08-21, see AGENTS.md § Gotchas):
 *  Chromium refuses the loopback address space until the player allows it once per origin,
 *  while WebKit treats it as mixed content and offers no permission to grant at all. Firefox
 *  prompts like Chromium. A retry only ever helps in the first case. */
export function refusalHint(userAgent: string): string {
  const isChromium = /Chrom(e|ium)|Edg\//.test(userAgent);
  const isFirefox = /Firefox\//.test(userAgent);
  const isWebKit = !isChromium && !isFirefox && /Safari\//.test(userAgent);
  if (isWebKit) {
    return 'Safari blocks a local model server from this page and offers no way to permit it; use Chrome, Firefox, or the desktop app.';
  }
  if (isChromium || isFirefox) {
    return 'the browser may be blocking access to the local network — allow it for this site, and check that the server is running.';
  }
  return 'the server may not be running, or the browser blocked access to the local network.';
}

/** Both `fetch` and the stream reader surface a fired signal as a DOMException/Error
 *  named `AbortError` — there is no shared class to instanceof against across runtimes. */
function isAbort(e: unknown): boolean {
  return e instanceof Error && e.name === 'AbortError';
}

/** Statuses that mean "there is no service at this address", as opposed to "the service
 *  turned this request down". 404 is the `/v1` pitfall from the setup guide: something is
 *  listening, but the completion endpoint is not at that path. */
const NO_SERVICE = new Set([404, 502, 503, 504]);

function httpKind(status: number): 'unavailable' | 'failed' {
  return NO_SERVICE.has(status) ? 'unavailable' : 'failed';
}

/** `HTTP <status>: <what the server said>` — the server's own message when it sent an
 *  error envelope, its raw body otherwise (trimmed: a stray HTML page is not a message). */
function httpDetail(e: LlmHttpError): string {
  const message = errorMessageFromText(e.body) ?? e.body.trim().slice(0, 300);
  return message === '' ? `HTTP ${e.status}` : `HTTP ${e.status}: ${message}`;
}

/** Whatever the runtime threw, as one line the player-facing layer can show. */
function describe(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
