import {
  defaultParKeystrokes, resolvePar, tierFor, keystrokesToNextTier,
  SILVER_FACTOR, BRONZE_FACTOR, PAR_BASE, PAR_PER_DIFFICULTY, FALLBACK_DIFFICULTY,
} from '../src/engine/ParTier';

describe('defaultParKeystrokes', () => {
  it('scales with difficulty: par = PAR_BASE + difficulty * PAR_PER_DIFFICULTY', () => {
    expect(defaultParKeystrokes(1)).toBe(PAR_BASE + 1 * PAR_PER_DIFFICULTY); // 40
    expect(defaultParKeystrokes(2)).toBe(PAR_BASE + 2 * PAR_PER_DIFFICULTY); // 60
  });
  it('is monotonic in difficulty', () => {
    expect(defaultParKeystrokes(3)).toBeGreaterThan(defaultParKeystrokes(2));
  });
  it('falls back to FALLBACK_DIFFICULTY for 0/undefined/null', () => {
    const fb = PAR_BASE + FALLBACK_DIFFICULTY * PAR_PER_DIFFICULTY; // 80
    expect(defaultParKeystrokes(0)).toBe(fb);
    expect(defaultParKeystrokes(undefined)).toBe(fb);
    expect(defaultParKeystrokes(null)).toBe(fb);
  });
});

describe('resolvePar', () => {
  it('prefers a positive override', () => {
    expect(resolvePar({ parOverride: 50, difficulty: 1 })).toBe(50);
  });
  it('ignores a non-positive override and uses difficulty', () => {
    expect(resolvePar({ parOverride: 0, difficulty: 2 })).toBe(60);
    expect(resolvePar({ parOverride: null, difficulty: 2 })).toBe(60);
  });
  it('falls back when neither is set', () => {
    expect(resolvePar({})).toBe(PAR_BASE + FALLBACK_DIFFICULTY * PAR_PER_DIFFICULTY); // 80
  });
});

describe('tierFor', () => {
  const par = 40; // silver <= 60, bronze <= 100
  it('gold at or under par', () => {
    expect(tierFor(40, par)).toBe('gold');
    expect(tierFor(25, par)).toBe('gold');
  });
  it('silver up to par * SILVER_FACTOR', () => {
    expect(tierFor(41, par)).toBe('silver');
    expect(tierFor(par * SILVER_FACTOR, par)).toBe('silver'); // 60
  });
  it('bronze up to par * BRONZE_FACTOR', () => {
    expect(tierFor(61, par)).toBe('bronze');
    expect(tierFor(par * BRONZE_FACTOR, par)).toBe('bronze'); // 100
  });
  it('no tier above bronze, or for non-positive inputs', () => {
    expect(tierFor(101, par)).toBeNull();
    expect(tierFor(0, par)).toBeNull();
    expect(tierFor(10, 0)).toBeNull();
  });
});

describe('keystrokesToNextTier', () => {
  const par = 40;
  it('is null when already gold', () => {
    expect(keystrokesToNextTier(40, par)).toBeNull();
  });
  it('targets gold from silver', () => {
    expect(keystrokesToNextTier(50, par)).toEqual({ nextTier: 'gold', delta: 10 });
  });
  it('targets silver from bronze', () => {
    expect(keystrokesToNextTier(70, par)).toEqual({ nextTier: 'silver', delta: 10 }); // 70 - 60
  });
  it('targets bronze when below bronze', () => {
    expect(keystrokesToNextTier(101, par)).toEqual({ nextTier: 'bronze', delta: 1 }); // 101 - 100
  });
});
