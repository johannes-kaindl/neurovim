import { verbosityTier, skillTagFor, deriveGuidance } from '../src/engine/GuidanceEngine';
import { CHEATSHEET } from '../src/data/cheatsheet';

const base = {
  category: 'fundamentals',
  summary: 'Learn the three modes.',
  why: undefined as string | undefined,
  next: { mission_id: 'M-02', title: 'Basic Navigation', category: 'navigation' },
  cheatsheet: CHEATSHEET,
  level: 1,
  pin: null as 'open' | 'quiet' | null,
};

describe('verbosityTier', () => {
  it('maps levels to tiers at the boundaries', () => {
    expect(verbosityTier(1)).toBe(0);
    expect(verbosityTier(2)).toBe(0);
    expect(verbosityTier(3)).toBe(1);
    expect(verbosityTier(5)).toBe(1);
    expect(verbosityTier(6)).toBe(2);
    expect(verbosityTier(99)).toBe(2);
  });
});

describe('skillTagFor', () => {
  it('maps a known category to a friendly label', () => {
    expect(skillTagFor('navigation')).toMatch(/hjkl/i);
  });
  it('falls back to the raw category, then a generic for null', () => {
    expect(skillTagFor('made-up')).toBe('made-up');
    expect(skillTagFor(null)).toBe('Vim practice');
  });
});

describe('deriveGuidance', () => {
  it('uses the authored why when present', () => {
    const g = deriveGuidance({ ...base, why: 'Custom reason.' });
    expect(g.why).toBe('Custom reason.');
  });
  it('falls back to guideWhyFor when why is absent/blank', () => {
    const g = deriveGuidance({ ...base, why: '   ' });
    expect(g.why).toMatch(/mode/i);
  });
  it('derives keys from the category', () => {
    const g = deriveGuidance(base);
    expect(g.keys.map((k) => k.key)).toContain('i');
  });
  it('builds leadsTo from next, null at arc end', () => {
    expect(deriveGuidance(base).leadsTo).toBe('Basic Navigation (M-02)');
    expect(deriveGuidance({ ...base, next: null }).leadsTo).toBeNull();
  });
  it('debrief names the next step, or THE RAVEN at the end', () => {
    expect(deriveGuidance(base).debrief).toMatch(/M-02/);
    expect(deriveGuidance({ ...base, next: null }).debrief).toMatch(/RAVEN/);
  });
  it('tier follows level by default and the pin override wins', () => {
    expect(deriveGuidance({ ...base, level: 7 }).tier).toBe(2);
    expect(deriveGuidance({ ...base, level: 7, pin: 'open' }).tier).toBe(0);
    expect(deriveGuidance({ ...base, level: 1, pin: 'quiet' }).tier).toBe(2);
  });
});
