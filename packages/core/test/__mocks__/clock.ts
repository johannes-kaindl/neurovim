import type { ClockPort } from '../../src/utils/clock';

/** Node's own timers — the real ClockPort defaults to `window`, which doesn't
 *  exist in this Jest node environment. Delegating to bare setTimeout/
 *  clearTimeout keeps jest.useFakeTimers()/runAllTimers() working as before,
 *  since those patch the same global the bare identifiers resolve to. */
export const fakeClock: ClockPort = {
  setTimeout: (fn, ms) => setTimeout(fn, ms) as unknown as number,
  clearTimeout: (id) => clearTimeout(id as unknown as ReturnType<typeof setTimeout>),
};
