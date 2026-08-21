/**
 * WebLlm — the web target's LlmPort implementation over the vendored code-kit
 * browser transport. The transport itself is tested in code-kit; what is tested here
 * is the half that only exists in this repo: translating the transport's throw-based
 * error surface into `LlmResult`'s four kinds without ever dropping the partial that
 * already streamed.
 *
 * The seam is `fetchFn` — a real `Response` over a real `ReadableStream`, so the SSE
 * parser, the reader pump and the abort handling all run for real. No mocks.
 */
import { WebLlm } from '../src/ports/WebLlm';

/** One SSE frame as an OpenAI-compatible server would send it. */
function frame(content: string): string {
  return `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;
}

/** A fetchFn answering 200 with `chunks` as an SSE stream, one enqueue per chunk. */
function streaming(chunks: string[]): (url: string, init?: RequestInit) => Promise<Response> {
  return async () => {
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const c of chunks) controller.enqueue(encoder.encode(frame(c)));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });
    return new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  };
}

function makeLlm(fetchFn: (url: string, init?: RequestInit) => Promise<Response>): WebLlm {
  return new WebLlm(
    { endpoint: { type: 'openai', baseUrl: 'http://localhost:1234/v1' }, model: 'test-model' },
    { fetchFn },
  );
}

describe('WebLlm — success path', () => {
  it('joins the streamed deltas into the completion content', async () => {
    const result = await makeLlm(streaming(['Hel', 'lo'])).complete([{ role: 'user', content: 'hi' }]);
    expect(result).toEqual({ ok: true, content: 'Hello' });
  });

  it('forwards every delta to onToken as it arrives', async () => {
    const seen: string[] = [];
    await makeLlm(streaming(['Hel', 'lo'])).complete([{ role: 'user', content: 'hi' }], {
      onToken: (t) => seen.push(t),
    });
    expect(seen).toEqual(['Hel', 'lo']);
  });
});

/** A fetchFn that streams `chunks` and then kills the connection mid-stream. */
function dyingStream(chunks: string[], error: Error): (url: string, init?: RequestInit) => Promise<Response> {
  return async () => {
    const encoder = new TextEncoder();
    let i = 0;
    // Chunk-wise via `pull`, not enqueue-then-error in `start`: erroring a controller
    // discards whatever is still queued, so the reader would never see the chunks at all.
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (i < chunks.length) {
          controller.enqueue(encoder.encode(frame(chunks[i++])));
          return;
        }
        controller.error(error);
      },
    });
    return new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  };
}

describe('WebLlm — nothing answered', () => {
  it('reports a request the browser never let out as unavailable', async () => {
    // Chromium's LNA denial and Safari's mixed-content block both surface exactly here.
    const result = await makeLlm(async () => {
      throw new TypeError('Failed to fetch');
    }).complete([{ role: 'user', content: 'hi' }]);

    expect(result).toEqual({
      ok: false,
      kind: 'unavailable',
      detail: expect.stringContaining('Failed to fetch'),
      partial: '',
    });
  });

  it('keeps the partial when the connection dies mid-stream', async () => {
    const result = await makeLlm(dyingStream(['Hel'], new TypeError('network error'))).complete([
      { role: 'user', content: 'hi' },
    ]);

    expect(result).toMatchObject({ ok: false, kind: 'unavailable', partial: 'Hel' });
  });
});

/** A fetchFn answering with an HTTP error status and `body` as the payload. */
function httpError(status: number, body: string): (url: string, init?: RequestInit) => Promise<Response> {
  return async () => new Response(body, { status });
}

describe('WebLlm — something answered, but not with a completion', () => {
  it('reports a rejected request as failed, carrying status and server message', async () => {
    const result = await makeLlm(
      httpError(400, JSON.stringify({ error: { message: 'model not found' } })),
    ).complete([{ role: 'user', content: 'hi' }]);

    expect(result).toMatchObject({ ok: false, kind: 'failed', partial: '' });
    expect((result as { detail: string }).detail).toContain('400');
    expect((result as { detail: string }).detail).toContain('model not found');
  });

  it('falls back to the raw body when it carries no error envelope', async () => {
    const result = await makeLlm(httpError(422, '<html>Unprocessable</html>')).complete([
      { role: 'user', content: 'hi' },
    ]);

    expect((result as { detail: string }).detail).toContain('Unprocessable');
  });
});

describe('WebLlm — an answering host is not an answering service', () => {
  // The `/v1` pitfall from the setup guide lands here: a server is listening, but the
  // completion endpoint is not at that path. That is "no endpoint", not "the model said no".
  it.each([404, 502, 503, 504])('reports HTTP %i as unavailable, not failed', async (status) => {
    const result = await makeLlm(httpError(status, '')).complete([{ role: 'user', content: 'hi' }]);
    expect(result).toMatchObject({ ok: false, kind: 'unavailable' });
  });

  it('still names the status so the cause stays readable', async () => {
    const result = await makeLlm(httpError(404, '')).complete([{ role: 'user', content: 'hi' }]);
    expect((result as { detail: string }).detail).toContain('404');
  });
});

/** What fetch and the stream reader throw once an AbortSignal fires. */
function abortError(): Error {
  const e = new Error('The operation was aborted.');
  e.name = 'AbortError';
  return e;
}

/** A fetchFn that streams `chunks` and then waits — the only way out is the signal. */
function abortableStream(chunks: string[]): (url: string, init?: RequestInit) => Promise<Response> {
  return async (_url, init) => {
    const signal = init?.signal ?? undefined;
    if (signal?.aborted) throw abortError();
    const encoder = new TextEncoder();
    let i = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (signal?.aborted) return void controller.error(abortError());
        if (i < chunks.length) return void controller.enqueue(encoder.encode(frame(chunks[i++])));
        return new Promise<void>((resolve) => {
          signal?.addEventListener('abort', () => {
            controller.error(abortError());
            resolve();
          });
        });
      },
    });
    return new Response(body, { status: 200 });
  };
}

describe('WebLlm — cut off', () => {
  it('reports a caller abort as aborted and hands back what had streamed', async () => {
    const controller = new AbortController();
    const result = await makeLlm(abortableStream(['Hel'])).complete([{ role: 'user', content: 'hi' }], {
      signal: controller.signal,
      onToken: () => controller.abort(),
    });

    expect(result).toMatchObject({ ok: false, kind: 'aborted', partial: 'Hel' });
  });

  it('reports a signal that fired before the request as aborted', async () => {
    const controller = new AbortController();
    controller.abort();
    const result = await makeLlm(abortableStream(['Hel'])).complete([{ role: 'user', content: 'hi' }], {
      signal: controller.signal,
    });

    expect(result).toMatchObject({ ok: false, kind: 'aborted', partial: '' });
  });
});

describe('WebLlm — deadline', () => {
  function withDeadline(ms: number, fetchFn: (url: string, init?: RequestInit) => Promise<Response>): WebLlm {
    return new WebLlm(
      { endpoint: { type: 'openai', baseUrl: 'http://localhost:1234/v1' }, model: 'test-model', timeoutMs: ms },
      { fetchFn },
    );
  }

  it('reports its own deadline as timeout, keeping the partial', async () => {
    // The stream sends one delta and then goes silent forever.
    const result = await withDeadline(20, abortableStream(['Hel'])).complete([{ role: 'user', content: 'hi' }]);

    expect(result).toMatchObject({ ok: false, kind: 'timeout', partial: 'Hel' });
  });

  it('still reports a caller abort as aborted while a deadline is armed', async () => {
    // Both arrive as an AbortError — only WebLlm knows which one fired.
    const controller = new AbortController();
    const result = await withDeadline(10_000, abortableStream(['Hel'])).complete(
      [{ role: 'user', content: 'hi' }],
      { signal: controller.signal, onToken: () => controller.abort() },
    );

    expect(result).toMatchObject({ ok: false, kind: 'aborted', partial: 'Hel' });
  });
});

describe('WebLlm — why the browser refused', () => {
  const CHROME =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36';
  const SAFARI =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15';

  function refusedUnder(userAgent: string): Promise<import('@neurovim/core').LlmResult> {
    const llm = new WebLlm(
      { endpoint: { type: 'openai', baseUrl: 'http://localhost:1234/v1' }, model: 'test-model' },
      {
        userAgent,
        fetchFn: async () => {
          throw new TypeError('Failed to fetch');
        },
      },
    );
    return llm.complete([{ role: 'user', content: 'hi' }]);
  }

  it('says a Chromium refusal can still be granted', async () => {
    // Measured 2026-08-21: one click on "Allow" opens the whole loopback space, persistently.
    const detail = (await refusedUnder(CHROME)) as { detail: string };
    expect(detail.detail).toMatch(/allow/i);
  });

  it('says a WebKit refusal cannot be granted at all', async () => {
    // Safari blocks this as mixed content with no permission prompt — a retry never helps.
    const detail = (await refusedUnder(SAFARI)) as { detail: string };
    expect(detail.detail).toMatch(/Safari/);
    expect(detail.detail).not.toMatch(/allow/i);
  });

  it('leaves an HTTP error alone — the browser let that one through', async () => {
    const llm = new WebLlm(
      { endpoint: { type: 'openai', baseUrl: 'http://localhost:1234/v1' }, model: 'test-model' },
      { userAgent: SAFARI, fetchFn: httpError(400, JSON.stringify({ error: 'no such model' })) },
    );
    const result = (await llm.complete([{ role: 'user', content: 'hi' }])) as { detail: string };
    expect(result.detail).toBe('HTTP 400: no such model');
  });
});
