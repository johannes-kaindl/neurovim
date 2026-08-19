import { MissionGenerator, renderKataMarkdown } from '../src/llm/MissionGenerator';
import type { KataSpec } from '../src/llm/kataPrompt';
import type { LlmPort, LlmMessage, LlmResult } from '../src/ports/LlmPort';

const SPEC: KataSpec = { category: 'text-objects', difficulty: 2, glitchCount: 2 };

const TARGET = [
  'RELAY GRID — SECTOR 9',
  '',
  'Agent     :  MERIDIAN',
  'Status    :  ACTIVE',
  'Vector    :  SOUTH',
].join('\n');

const ANSWER = {
  title: 'Ghost Grid',
  summary: 'Repair six mangled field values.',
  why: 'Sloppy words cost seconds you do not have.',
  tags: ['kata', 'vim/text-objects'],
  targetText: TARGET,
  glitches: [
    {
      id: 'g01', type: 'corp_word_replace', target_line_pattern: 'Agent',
      target_word: 'MERIDIAN', replacement: 'MERIDAIN', vim_move: 'ciw', hint: 'ciw — restore MERIDIAN',
    },
    {
      id: 'g02', type: 'caps_word', target_line_pattern: 'Vector',
      target_word: 'SOUTH', replacement: 'SOUTH!!', vim_move: 'ciw', hint: 'ciw — restore SOUTH',
    },
  ],
};

/** A port under the test's control — no network, fully scripted. */
class FakeLlm implements LlmPort {
  seen: LlmMessage[][] = [];
  constructor(private readonly reply: LlmResult) {}
  async complete(messages: LlmMessage[]): Promise<LlmResult> {
    this.seen.push(messages);
    return this.reply;
  }
}

const answering = (body: unknown): FakeLlm =>
  new FakeLlm({ ok: true, content: typeof body === 'string' ? body : JSON.stringify(body) });

const generate = (llm: LlmPort, spec: KataSpec = SPEC) =>
  new MissionGenerator(llm).generate(spec, 'KATA-15');

describe('MissionGenerator — the happy path', () => {
  it('returns the clean text as the solution, untouched', async () => {
    const res = await generate(answering(ANSWER));
    if (!res.ok) throw new Error(`expected ok, got ${res.reason}: ${res.detail}`);
    expect(res.kata.solution).toBe(TARGET);
  });

  it('derives a transmission that differs from the solution', async () => {
    const res = await generate(answering(ANSWER));
    if (!res.ok) throw new Error(res.reason);
    expect(res.kata.transmission).not.toBe(res.kata.solution);
    expect(res.kata.transmission).toContain('MERIDAIN');
    expect(res.kata.transmission).toContain('SOUTH!!');
  });

  it('keeps the line count stable — corruptions of this category do not insert', async () => {
    const res = await generate(answering(ANSWER));
    if (!res.ok) throw new Error(res.reason);
    expect(res.kata.transmission.split('\n')).toHaveLength(TARGET.split('\n').length);
  });

  it('sets the structural frontmatter itself and takes only prose from the model', async () => {
    const res = await generate(answering(ANSWER));
    if (!res.ok) throw new Error(res.reason);
    const fm = res.kata.frontmatter;
    expect(fm.mission_id).toBe('KATA-15');
    expect(fm.mission_type).toBe('practice');
    expect(fm.tier).toBe('⬛ KATA');
    expect(fm.locked).toBe(false);
    expect(fm.category).toBe('text-objects');
    expect(fm.difficulty).toBe(2);
    expect(typeof fm.xp_reward).toBe('number');
    expect(fm.title).toBe('Ghost Grid');
    expect(fm.generated_by).toMatch(/MissionGenerator/);
  });

  it('asks the model with the prompt built for that spec', async () => {
    const llm = answering(ANSWER);
    await generate(llm);
    expect(llm.seen).toHaveLength(1);
    expect(llm.seen[0].map(m => m.content).join('\n')).toContain('text-objects');
  });
});

describe('MissionGenerator — refusals', () => {
  it('declines a category with no inverse vocabulary before spending a call', async () => {
    const llm = answering(ANSWER);
    const res = await new MissionGenerator(llm).generate({ ...SPEC, category: 'regex' }, 'KATA-15');
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe('unsupported-category');
    expect(llm.seen).toHaveLength(0);
  });

  it('passes a port failure through as llm', async () => {
    const llm = new FakeLlm({ ok: false, kind: 'unavailable', detail: 'no endpoint', partial: '' });
    const res = await generate(llm);
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('llm');
    expect(res.detail).toContain('unavailable');
  });

  it('reports unparseable when the answer carries no JSON object', async () => {
    const res = await generate(answering('Sure! Here is your kata, operator.'));
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('unparseable');
  });

  it('finds the JSON even when the model reasons about braces first', async () => {
    // Reasoning models narrate before answering. A left-to-right "first { to
    // last }" cut mangles the object as soon as that narration contains a
    // brace — which is exactly what a model discussing JSON tends to write.
    const noisy = `Let me think. The shape is { "title": ..., "glitches": [...] }.
I will use two corruptions.
${JSON.stringify(ANSWER)}`;
    const res = await generate(answering(noisy));
    if (!res.ok) throw new Error(`${res.reason}: ${res.detail}`);
    expect(res.kata.frontmatter.title).toBe('Ghost Grid');
  });

  it('reports schema when a required field is missing', async () => {
    const noText: Record<string, unknown> = { ...ANSWER };
    delete noText.targetText;
    const res = await generate(answering(noText));
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('schema');
  });

  it('reports skill-mismatch for a glitch type outside the category vocabulary', async () => {
    const off = {
      ...ANSWER,
      glitches: [
        { ...ANSWER.glitches[0], type: 'join_lines' },
        ANSWER.glitches[1],
      ],
    };
    const res = await generate(answering(off));
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('skill-mismatch');
    expect(res.detail).toContain('join_lines');
  });

  it('reports glitch-miss when a target_line_pattern is not in the text', async () => {
    // The likeliest model error: a hallucinated pattern. applyGlitches drops it
    // silently, which would ship a drill with fewer corruptions than announced —
    // in the limit, a presolved one. This is the guard for that.
    const hallucinated = {
      ...ANSWER,
      glitches: [
        { ...ANSWER.glitches[0], target_line_pattern: 'Callsign' },
        ANSWER.glitches[1],
      ],
    };
    const res = await generate(answering(hallucinated));
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('glitch-miss');
    expect(res.detail).toContain('Callsign');
  });

  it('reports presolved when every corruption leaves the text unchanged', async () => {
    const inert = {
      ...ANSWER,
      glitches: [{
        ...ANSWER.glitches[0], target_word: 'MERIDIAN', replacement: 'MERIDIAN',
      }],
    };
    const res = await generate(answering({ ...inert, glitches: inert.glitches }));
    if (res.ok) throw new Error('expected failure');
    expect(res.reason).toBe('presolved');
  });
});

describe('renderKataMarkdown', () => {
  it('writes frontmatter and the transmission as the body', async () => {
    const res = await generate(answering(ANSWER));
    if (!res.ok) throw new Error(res.reason);
    const md = renderKataMarkdown(res.kata);
    expect(md.startsWith('---\n')).toBe(true);
    expect(md).toContain('mission_id: KATA-15');
    expect(md).toContain('mission_type: practice');
    expect(md.endsWith(res.kata.transmission + '\n')).toBe(true);
  });

  it('quotes a title that would break the YAML', async () => {
    const res = await generate(answering({ ...ANSWER, title: 'Grid: Down' }));
    if (!res.ok) throw new Error(res.reason);
    expect(renderKataMarkdown(res.kata)).toContain('title: "Grid: Down"');
  });
});
