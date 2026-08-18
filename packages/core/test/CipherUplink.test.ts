import { CipherUplink } from '../src/llm/CipherUplink';
import type { LlmPort, LlmMessage, LlmResult } from '../src/ports/LlmPort';
import type { CipherKnowledge } from '../src/llm/cipherPrompt';
import type { RunTrace } from '../src/engine/RunTrace';
import { ChatSession } from '../src/llm/ChatSession';

const KNOWLEDGE: CipherKnowledge = { quickRef: 'w — next word', cheatsheet: '### Motions' };

const TRACE: RunTrace = {
  mission_id: 'M-01', ts: '2026-08-18T20:00:00.000Z', outcome: 'success',
  elapsed_ms: 12_000, keystrokes: 40, ks_per_min: 200, par_keystrokes: 14,
  is_new_best_time: false, is_new_best_ks: false,
  events: [{ k: 'l', t: 10 }, { k: 'w', t: 20 }],
};

/** A port under the test's control: it records what it was asked and replays
 *  a scripted answer, streaming it token by token first. */
class FakeLlm implements LlmPort {
  seen: LlmMessage[][] = [];
  constructor(private script: (n: number) => { tokens: string[]; result: LlmResult }) {}
  async complete(
    messages: LlmMessage[],
    opts?: { onToken?: (t: string) => void; signal?: AbortSignal },
  ): Promise<LlmResult> {
    this.seen.push(messages);
    const { tokens, result } = this.script(this.seen.length);
    for (const t of tokens) opts?.onToken?.(t);
    return result;
  }
}

const okAfter = (tokens: string[], content: string): FakeLlm =>
  new FakeLlm(() => ({ tokens, result: { ok: true, content } }));

describe('CipherUplink.debrief', () => {
  it('builds the debrief prompt from the trace and returns the result', async () => {
    const llm = okAfter(['Sloppy ', 'motion.'], 'Sloppy motion.');
    const uplink = new CipherUplink(llm, KNOWLEDGE);
    const seenTokens: string[] = [];

    const result = await uplink.debrief(
      TRACE, { id: 'M-01', title: 'First Cut', category: 'motions' },
      (t) => seenTokens.push(t), new AbortController().signal,
    );

    expect(result).toEqual({ ok: true, content: 'Sloppy motion.' });
    expect(seenTokens).toEqual(['Sloppy ', 'motion.']);
    // The prompt carries the run's numbers and the recorded keys.
    const user = llm.seen[0][llm.seen[0].length - 1].content;
    expect(user).toContain('M-01');
    expect(user).toContain('Keystrokes: 40 (par: 14)');
    expect(user).toContain('l w');
  });

  it('works without a mission — the trace alone is enough', async () => {
    const llm = okAfter([], 'Clean cut.');
    const uplink = new CipherUplink(llm, KNOWLEDGE);
    const result = await uplink.debrief(TRACE, null, () => {}, new AbortController().signal);
    expect(result).toEqual({ ok: true, content: 'Clean cut.' });
  });

  it('passes a failure straight through, partial included', async () => {
    const llm = new FakeLlm(() => ({
      tokens: ['Slop'],
      result: { ok: false, kind: 'timeout', detail: 'no answer within 120s', partial: 'Slop' },
    }));
    const uplink = new CipherUplink(llm, KNOWLEDGE);
    const result = await uplink.debrief(TRACE, null, () => {}, new AbortController().signal);
    expect(result).toEqual({
      ok: false, kind: 'timeout', detail: 'no answer within 120s', partial: 'Slop',
    });
  });
});

/** A port whose completion the test resolves by hand, so a second turn can
 *  start while the first is still in flight. */
class GatedLlm implements LlmPort {
  calls: { onToken?: (t: string) => void; resolve: (r: LlmResult) => void }[] = [];
  complete(
    _messages: LlmMessage[],
    opts?: { onToken?: (t: string) => void; signal?: AbortSignal },
  ): Promise<LlmResult> {
    return new Promise<LlmResult>((resolve) => {
      this.calls.push({ onToken: opts?.onToken, resolve });
    });
  }
}

describe('CipherUplink.ask', () => {
  it('records the turn and appends the answer', async () => {
    const llm = okAfter(['dw'], 'Use dw.');
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    await uplink.ask(session, 'How do I delete a word?');

    expect(session.entries).toEqual([
      { role: 'user', text: 'How do I delete a word?' },
      { role: 'assistant', text: 'Use dw.' },
    ]);
    expect(session.busy).toBe(false);
    expect(session.streaming).toBeNull();
  });

  it('does not put the question in the history twice', async () => {
    const llm = okAfter([], 'ok');
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    await uplink.ask(session, 'first');
    await uplink.ask(session, 'second');

    // The second prompt: system + first Q + first A + second Q — no duplicate.
    const roles = llm.seen[1].map((m) => m.role);
    expect(roles).toEqual(['system', 'user', 'assistant', 'user']);
    expect(llm.seen[1].filter((m) => m.content === 'second')).toHaveLength(1);
  });

  it('ignores a second question while one is in flight', async () => {
    const llm = new GatedLlm();
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    const first = uplink.ask(session, 'one');
    await uplink.ask(session, 'two');          // must be a no-op

    expect(llm.calls).toHaveLength(1);
    expect(session.entries.filter((e) => e.role === 'user')).toHaveLength(1);

    llm.calls[0].resolve({ ok: true, content: 'answer' });
    await first;
  });

  it('streams tokens into the session while the turn is current', async () => {
    const llm = new GatedLlm();
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    const turn = uplink.ask(session, 'q');
    llm.calls[0].onToken?.('Use ');
    llm.calls[0].onToken?.('dw.');
    expect(session.streaming).toBe('Use dw.');
    expect(session.busy).toBe(true);

    llm.calls[0].resolve({ ok: true, content: 'Use dw.' });
    await turn;
    expect(session.streaming).toBeNull();
  });

  it('STALE TURN: a superseded turn writes neither tokens nor its result', async () => {
    const llm = new GatedLlm();
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    const first = uplink.ask(session, 'one');
    uplink.reset(session);                      // RST disowns turn one and clears the channel
    const second = uplink.ask(session, 'two');  // turn two takes over

    // Turn one comes back late and tries to write.
    llm.calls[0].onToken?.('stale token');
    llm.calls[0].resolve({ ok: true, content: 'stale answer' });
    await first;

    expect(session.streaming ?? '').not.toContain('stale');
    expect(session.entries.map((e) => e.text)).not.toContain('stale answer');

    llm.calls[1].onToken?.('fresh');
    llm.calls[1].resolve({ ok: true, content: 'fresh answer' });
    await second;

    expect(session.entries[session.entries.length - 1])
      .toEqual({ role: 'assistant', text: 'fresh answer' });
  });

  it('a reset mid-stream drops the answer instead of landing it late', async () => {
    const llm = new GatedLlm();
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    const turn = uplink.ask(session, 'q');
    uplink.reset(session);

    llm.calls[0].resolve({ ok: true, content: 'too late' });
    await turn;

    expect(session.entries).toEqual([]);
    expect(session.busy).toBe(false);
  });

  it('CUT lets the killed turn finish its bookkeeping — busy clears, partial lands', async () => {
    const llm = new GatedLlm();
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    const turn = uplink.ask(session, 'q');
    llm.calls[0].onToken?.('Use d');
    uplink.abort();                             // CUT — keeps the turn's identity

    // The transport reports the abort with whatever it had streamed.
    llm.calls[0].resolve({ ok: false, kind: 'aborted', detail: 'stream aborted', partial: 'Use d' });
    await turn;

    expect(session.entries[1]).toEqual({ role: 'assistant', text: 'Use d — signal cut' });
    expect(session.busy).toBe(false);           // would strand at true if CUT disowned the turn
    expect(session.streaming).toBeNull();
  });

  it('keeps a cut-off partial answer rather than losing it', async () => {
    const llm = new FakeLlm(() => ({
      tokens: [],
      result: { ok: false, kind: 'aborted', detail: 'stream aborted', partial: 'Use d' },
    }));
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    await uplink.ask(session, 'q');

    expect(session.entries[1]).toEqual({ role: 'assistant', text: 'Use d — signal cut' });
  });

  it('drops an abort that produced nothing', async () => {
    const llm = new FakeLlm(() => ({
      tokens: [],
      result: { ok: false, kind: 'aborted', detail: 'stream aborted', partial: '' },
    }));
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    await uplink.ask(session, 'q');

    expect(session.entries).toEqual([{ role: 'user', text: 'q' }]);
  });

  it.each([
    ['unavailable' as const, 'no endpoint reachable'],
    ['failed' as const, 'HTTP 500: upstream exploded'],
    ['timeout' as const, 'no answer within 120s'],
  ])('reports a %s failure as an error entry', async (kind, detail) => {
    const llm = new FakeLlm(() => ({ tokens: [], result: { ok: false, kind, detail, partial: '' } }));
    const session = new ChatSession();
    const uplink = new CipherUplink(llm, KNOWLEDGE);

    await uplink.ask(session, 'q');

    expect(session.entries[1]).toEqual({
      role: 'error', text: 'Signal lost. Check your uplink.', detail,
    });
  });

  it('notifies the consumer on every state change', async () => {
    const llm = okAfter(['x'], 'x');
    const session = new ChatSession();
    let ticks = 0;
    const uplink = new CipherUplink(llm, KNOWLEDGE, () => { ticks += 1; });

    await uplink.ask(session, 'q');

    // At least: turn opened, turn closed.
    expect(ticks).toBeGreaterThanOrEqual(2);
  });
});
