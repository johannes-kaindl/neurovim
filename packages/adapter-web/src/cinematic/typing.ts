import type { Rng } from './rng';

export interface TypingProfile {
  /** base characters per second */
  cps: number;
  /** 0..1 probability of a typo+backspace before a visible char */
  typoChance: number;
  /** 0..1 timing variance applied to each char delay */
  jitter: number;
}

/** A single render step: the cumulative visible text at time `atMs` (absolute ms). */
export interface TypeStep { atMs: number; text: string; }

const TYPO_CHARS = 'etaoinshrdlu';

/**
 * Deterministically expand `text` into timed steps, occasionally injecting a wrong char
 * followed by a backspace correction. Pure: identical (text, profile, seed, startMs) →
 * identical steps. The final step's text is always exactly `text`.
 */
export function planTyping(text: string, profile: TypingProfile, rng: Rng, startMs = 0): TypeStep[] {
  const steps: TypeStep[] = [];
  const base = 1000 / Math.max(1, profile.cps);
  let t = startMs;
  let shown = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const jit = 1 + (rng() * 2 - 1) * profile.jitter;
    t += Math.max(8, base * jit);
    if (profile.typoChance > 0 && ch !== ' ' && ch !== '\n' && rng() < profile.typoChance) {
      const wrong = TYPO_CHARS[Math.floor(rng() * TYPO_CHARS.length)];
      shown = shown + wrong;
      steps.push({ atMs: t, text: shown });
      t += base * 1.2;                 // notice the mistake
      shown = shown.slice(0, -1);
      steps.push({ atMs: t, text: shown }); // backspace
      t += base * 0.8;                 // re-aim
    }
    shown = shown + ch;
    steps.push({ atMs: t, text: shown });
  }
  return steps;
}
