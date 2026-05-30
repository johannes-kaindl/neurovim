/** Device-local UI prefs (display + audio), persisted in localStorage. Not game state. */
const KEY = 'neurovim:ui';
export type UiSettings = { reduceEffects: boolean; audioOn: boolean };
const DEFAULTS: UiSettings = { reduceEffects: false, audioOn: false }; // audio OFF by default (D4)

export function loadSettings(): UiSettings {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; }
  catch { return { ...DEFAULTS }; }
}
export function saveSettings(s: UiSettings): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode: ignore */ }
}
/** Reflect reduceEffects onto <html data-fx> so the token overrides in styles.css apply. */
export function applyEffects(reduceEffects: boolean): void {
  document.documentElement.dataset.fx = reduceEffects ? 'off' : 'on';
}
