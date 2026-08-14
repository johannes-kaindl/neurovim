import type { ClockPort } from '../../src/utils/clock';

/** Node's own timers — the real ClockPort defaults to `window`, which doesn't
 *  exist in this Jest node environment. Delegating to bare setTimeout/
 *  clearTimeout keeps jest.useFakeTimers()/runAllTimers() working as before,
 *  since those patch the same global the bare identifiers resolve to. */
export const fakeClock: ClockPort = {
  now: () => Date.now(),
  setTimeout: (fn, ms) => setTimeout(fn, ms) as unknown as number,
  clearTimeout: (id) => clearTimeout(id as unknown as ReturnType<typeof setTimeout>),
};

/** A clock whose `now()` walks a fixed sequence and then holds its last value.
 *  Lets elapsed-time and trace-timestamp assertions be exact instead of fuzzy. */
export function scriptedClock(times: number[]): ClockPort {
  let i = 0;
  return {
    now: () => times[Math.min(i++, times.length - 1)],
    setTimeout: () => 0,
    clearTimeout: () => {},
  };
}
