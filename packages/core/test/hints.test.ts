import { getHintKeys } from '../src/utils/hints';
import { CHEATSHEET } from '../src/data/cheatsheet';

describe('getHintKeys', () => {
  it('returns first 3 keys of matching category', () => {
    const keys = getHintKeys('word-movement', CHEATSHEET);
    expect(keys).toHaveLength(3);
    expect(keys[0].key).toBe('w');
    expect(keys[1].key).toBe('b');
    expect(keys[2].key).toBe('e');
  });

  it('returns empty array for unknown category', () => {
    expect(getHintKeys('nonexistent', CHEATSHEET)).toEqual([]);
  });

  it('returns empty array for null', () => {
    expect(getHintKeys(null, CHEATSHEET)).toEqual([]);
  });

  it('returns at most 3 keys even for large groups', () => {
    const keys = getHintKeys('navigation', CHEATSHEET);
    expect(keys.length).toBeLessThanOrEqual(3);
  });
});
