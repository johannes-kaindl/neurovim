/** Millisekunden → kompakte Spielzeit: <60s → "12.3s", sonst "m:ss". */
export function fmtTime(ms: number): string {
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
