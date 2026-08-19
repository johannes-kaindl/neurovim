import {
  buildKataMessages, CATEGORY_GLITCHES, isGeneratableCategory, glitchExample,
} from '../src/llm/kataPrompt';
import type { KataSpec } from '../src/llm/kataPrompt';

const SPEC: KataSpec = { category: 'text-objects', difficulty: 2, glitchCount: 6 };

const userText = (spec: KataSpec): string => {
  const msgs = buildKataMessages(spec);
  return msgs.filter(m => m.role === 'user').map(m => m.content).join('\n');
};

describe('CATEGORY_GLITCHES', () => {
  it('maps only categories whose glitch types carry an inverse vim operation', () => {
    expect(Object.keys(CATEGORY_GLITCHES).sort()).toEqual(
      ['editing', 'fundamentals', 'navigation', 'operators', 'text-objects'],
    );
  });

  it('rejects regex — no glitch type inverts a regex substitution', () => {
    expect(isGeneratableCategory('regex')).toBe(false);
    expect(isGeneratableCategory('text-objects')).toBe(true);
  });
});

describe('buildKataMessages', () => {
  it('opens with a system message that casts CIPHER as the author', () => {
    const [first] = buildKataMessages(SPEC);
    expect(first.role).toBe('system');
    expect(first.content).toMatch(/CIPHER/);
  });

  it('states the category, difficulty and how many glitches are wanted', () => {
    const text = userText(SPEC);
    expect(text).toMatch(/text-objects/);
    expect(text).toMatch(/\b2\b/);
    expect(text).toMatch(/\b6\b/);
  });

  it('lists only the glitch types allowed for that category', () => {
    const text = userText(SPEC);
    for (const t of CATEGORY_GLITCHES['text-objects']) expect(text).toContain(t);
    expect(text).not.toContain('join_lines');
  });

  it('demands the JSON answer schema verbatim', () => {
    const text = userText(SPEC);
    for (const key of ['title', 'summary', 'why', 'tags', 'targetText', 'glitches']) {
      expect(text).toContain(key);
    }
  });

  it('shows a fully filled example for every allowed type, not an ellipsis', () => {
    // A small model copies the shape it is shown. An example with "…" in it
    // comes back with the field missing — measured against gemma-4-e4b, which
    // dropped target_line_pattern on every glitch.
    const text = userText(SPEC);
    for (const type of CATEGORY_GLITCHES['text-objects']) {
      const example = glitchExample(type);
      expect(text).toContain(JSON.stringify(example));
      for (const key of ['id', 'type', 'target_line_pattern', 'vim_move', 'hint']) {
        expect(Object.keys(example)).toContain(key);
      }
      expect(JSON.stringify(example)).not.toContain('…');
    }
  });

  it('gives caps_word and corp_word_replace the word fields they need', () => {
    for (const type of ['caps_word', 'corp_word_replace'] as const) {
      expect(Object.keys(glitchExample(type))).toEqual(
        expect.arrayContaining(['target_word', 'replacement']),
      );
    }
  });

  it('carries an optional theme through to the prompt', () => {
    expect(userText({ ...SPEC, theme: 'relay grid' })).toMatch(/relay grid/);
  });
});
