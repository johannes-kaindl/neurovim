import { getDiff } from '../src/utils/diff';

describe('getDiff', () => {
  it('returns matches true for identical content', () => {
    const result = getDiff('hello\nworld', 'hello\nworld');
    expect(result.matches).toBe(true);
    expect(result.lines_off).toBe(0);
  });

  it('detects first divergent line', () => {
    const result = getDiff('hello\nworld', 'hello\nearth');
    expect(result.matches).toBe(false);
    expect(result.first_divergent_line).toBe(1);
    expect(result.lines_off).toBe(1);
  });

  it('counts multiple divergent lines', () => {
    const result = getDiff('a\nb\nc', 'a\nX\nY');
    expect(result.lines_off).toBe(2);
    expect(result.first_divergent_line).toBe(1);
  });

  it('ignores leading/trailing whitespace on full content', () => {
    const result = getDiff('hello\nworld\n', 'hello\nworld');
    expect(result.matches).toBe(true);
  });
});
