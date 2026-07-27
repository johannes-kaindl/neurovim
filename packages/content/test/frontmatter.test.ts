import { asString } from '../src/frontmatter';

describe('asString', () => {
  it('passes strings through unchanged', () => {
    expect(asString('M-02')).toBe('M-02');
    expect(asString('')).toBe('');
  });

  it('coerces the primitives YAML frontmatter can legitimately produce', () => {
    expect(asString(3)).toBe('3');
    expect(asString(true)).toBe('true');
  });

  it('falls back for null/undefined instead of stringifying them', () => {
    expect(asString(null, 'fallback')).toBe('fallback');
    expect(asString(undefined, 'fallback')).toBe('fallback');
    expect(asString(null)).toBe('');
  });

  it('falls back for objects and arrays — String() would yield "[object Object]"', () => {
    expect(asString({ nested: 'map' }, 'M-02')).toBe('M-02');
    expect(asString(['a', 'b'], 'M-02')).toBe('M-02');
  });
});
