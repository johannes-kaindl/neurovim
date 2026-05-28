import { GlitchEngine } from '../src/engine/GlitchEngine';
import { GlitchDefinition } from '../src/types';

const MOCK_ORIGINAL = [
  'Once upon a midnight dreary, while I pondered, weak and weary,',
  'Over many a quaint and curious volume of forgotten lore—',
  '    While I nodded, nearly napping, suddenly there came a tapping,',
  'As of some one gently rapping, rapping at my chamber door.',
].join('\n');

const MOCK_POOL: GlitchDefinition[] = [
  {
    id: 'g01', type: 'insert_corp_line',
    target_line_pattern: 'Once upon a midnight dreary',
    insert_after: true,
    injected_text: '>> CORP SIGNAL: COMPLY <<',
    vim_move: 'dd', hint: 'dd — delete CORP broadcast',
  },
  {
    id: 'g02', type: 'caps_word',
    target_line_pattern: 'weak and weary,',
    target_word: 'weary,', replacement: 'WEARY,',
    vim_move: 'ciw', hint: 'ciw — restore lowercase: weary',
  },
  {
    id: 'g03', type: 'corp_word_replace',
    target_line_pattern: 'quaint and curious',
    target_word: 'quaint', replacement: 'CORP-7741',
    vim_move: 'ciw', hint: 'ciw — restore word: quaint',
  },
  {
    id: 'g04', type: 'tag_append',
    target_line_pattern: 'forgotten lore—',
    target_word: 'lore—', tag: '##NOISE',
    vim_move: 'dw', hint: 'dw — delete CORP tag',
  },
  {
    id: 'g05', type: 'join_lines',
    target_line_pattern: 'nearly napping, suddenly',
    join_with_next: true,
    vim_move: 'a<Enter>', hint: 'position after comma — a<Enter> to split',
  },
];

describe('GlitchEngine.selectGlitches', () => {
  it('returns exactly count items', () => {
    const selected = GlitchEngine.selectGlitches(MOCK_POOL, 3);
    expect(selected).toHaveLength(3);
  });

  it('returns all items when count >= pool size', () => {
    const selected = GlitchEngine.selectGlitches(MOCK_POOL, 10);
    expect(selected).toHaveLength(MOCK_POOL.length);
  });

  it('returns unique items (no duplicates)', () => {
    const selected = GlitchEngine.selectGlitches(MOCK_POOL, 5);
    const ids = selected.map(g => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('GlitchEngine.applyGlitches', () => {
  it('insert_corp_line inserts text after target line', () => {
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, [MOCK_POOL[0]]);
    const lines = result.text.split('\n');
    expect(lines[1]).toBe('>> CORP SIGNAL: COMPLY <<');
    expect(result.glitches).toHaveLength(1);
    expect(result.glitches[0].line_number).toBe(2);
  });

  it('caps_word uppercases the target word', () => {
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, [MOCK_POOL[1]]);
    expect(result.text).toContain('WEARY,');
    expect(result.glitches[0].line_number).toBe(1);
  });

  it('corp_word_replace substitutes CORP code for target word', () => {
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, [MOCK_POOL[2]]);
    expect(result.text).toContain('CORP-7741');
    expect(result.text).not.toContain('quaint');
    expect(result.glitches[0].line_number).toBe(2);
  });

  it('tag_append appends tag to word', () => {
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, [MOCK_POOL[3]]);
    expect(result.text).toContain('lore—##NOISE');
    expect(result.glitches[0].line_number).toBe(2);
  });

  it('join_lines merges line with next', () => {
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, [MOCK_POOL[4]]);
    const lines = result.text.split('\n');
    // original line 3 + line 4 should be merged
    expect(lines[2]).toContain('tapping,As of some one');
    expect(result.glitches[0].line_number).toBe(3);
  });

  it('multiple glitches applied bottom-up without position drift', () => {
    const glitches = [MOCK_POOL[0], MOCK_POOL[1]]; // insert line 1, caps line 1
    const result = GlitchEngine.applyGlitches(MOCK_ORIGINAL, glitches);
    const lines = result.text.split('\n');
    expect(lines[1]).toBe('>> CORP SIGNAL: COMPLY <<');
    expect(lines[0]).toContain('WEARY,');
    expect(result.glitches).toHaveLength(2);
    const sortedByLine = result.glitches.slice().sort((a, b) => a.line_number - b.line_number);
    expect(sortedByLine[0].line_number).toBe(1);  // caps_word on original line 1
    expect(sortedByLine[1].line_number).toBe(2);  // inserted CORP line
  });
});
