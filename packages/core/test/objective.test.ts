import { splitInlineCode } from '../src/utils/objective';

describe('splitInlineCode', () => {
  it('splits backtick spans into code segments', () => {
    expect(splitInlineCode('Change `SCAN-7741` to `UNIT-7741` (4×)')).toEqual([
      { code: false, text: 'Change ' },
      { code: true, text: 'SCAN-7741' },
      { code: false, text: ' to ' },
      { code: true, text: 'UNIT-7741' },
      { code: false, text: ' (4×)' },
    ]);
  });
  it('returns plain text unchanged', () => {
    expect(splitInlineCode('Leave the note as it is.')).toEqual([{ code: false, text: 'Leave the note as it is.' }]);
  });
  it('keeps an unmatched backtick as text instead of swallowing the rest', () => {
    expect(splitInlineCode('a `b')).toEqual([{ code: false, text: 'a `b' }]);
  });
  it('keeps spaces inside code spans', () => {
    expect(splitInlineCode('`=== SECTION 1 ===`')).toEqual([{ code: true, text: '=== SECTION 1 ===' }]);
  });
});
