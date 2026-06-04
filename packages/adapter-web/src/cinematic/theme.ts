import type { BeatTheme } from './cutscene';

/** Which --nv-* token drives each beat's text colour. */
const TOKEN: Record<BeatTheme, string> = {
  corp: '--nv-accent',
  fault: '--nv-amber',
  warning: '--nv-fail',
  cipher: '--nv-cipher',
  unlock: '--nv-accent-hot',
};

/** Fallback hexes (node/SSR or missing token) — mirror styles.css :root. */
const FALLBACK: Record<BeatTheme, string> = {
  corp: '#39ff7a',
  fault: '#ffb02e',
  warning: '#ff5b5b',
  cipher: '#46e8ff',
  unlock: '#9dffc2',
};

/** Resolve a beat theme to a concrete colour, reading the CSS token when available. */
export function themeColor(theme: BeatTheme): string {
  if (typeof document === 'undefined') return FALLBACK[theme];
  const v = getComputedStyle(document.documentElement).getPropertyValue(TOKEN[theme]).trim();
  return v || FALLBACK[theme];
}
