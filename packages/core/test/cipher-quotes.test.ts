import { getCipherQuote, guideWhyFor } from '../src/data/cipher-quotes';

describe('guideWhyFor', () => {
  it('returns a category-specific line when present', () => {
    expect(guideWhyFor('fundamentals')).toMatch(/mode/i);
  });
  it('falls back to a universal line for an unmapped category', () => {
    expect(guideWhyFor('totally-unknown')).toBe(guideWhyFor(null));
  });
  it('is deterministic (no random pick)', () => {
    expect(guideWhyFor('navigation')).toBe(guideWhyFor('navigation'));
  });
});

describe('getCipherQuote still works', () => {
  it('returns a string for a known category/event', () => {
    expect(typeof getCipherQuote('fundamentals', 'success')).toBe('string');
  });
});
