import { mulberry32 } from '../src/cinematic/rng';
import { planTyping, type TypingProfile } from '../src/cinematic/typing';

const CALM: TypingProfile = { cps: 25, typoChance: 0, jitter: 0.2 };
const SLOPPY: TypingProfile = { cps: 25, typoChance: 0.5, jitter: 0.3 };

describe('planTyping', () => {
  it('with no typos, emits one step per character, ending in the full text', () => {
    const steps = planTyping('hello', CALM, mulberry32(1));
    expect(steps).toHaveLength(5);
    expect(steps[steps.length - 1].text).toBe('hello');
  });

  it('produces strictly increasing timestamps', () => {
    const steps = planTyping('a calm line of text', CALM, mulberry32(7));
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].atMs).toBeGreaterThan(steps[i - 1].atMs);
    }
  });

  it('starts after startMs', () => {
    const steps = planTyping('x', CALM, mulberry32(1), 1000);
    expect(steps[0].atMs).toBeGreaterThan(1000);
  });

  it('with typos, the final text is still exactly the target', () => {
    const steps = planTyping('compliance', SLOPPY, mulberry32(3));
    expect(steps[steps.length - 1].text).toBe('compliance');
  });

  it('with typos, at least one step shortens the text (a backspace correction)', () => {
    const steps = planTyping('compliance terminal', SLOPPY, mulberry32(3));
    const hasBackspace = steps.some((s, i) => i > 0 && s.text.length < steps[i - 1].text.length);
    expect(hasBackspace).toBe(true);
  });

  it('is deterministic for a given seed', () => {
    const a = planTyping('signal bleed', SLOPPY, mulberry32(42));
    const b = planTyping('signal bleed', SLOPPY, mulberry32(42));
    expect(a).toEqual(b);
  });
});
