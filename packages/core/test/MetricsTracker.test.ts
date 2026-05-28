import { MetricsTracker } from '../src/engine/MetricsTracker';

describe('MetricsTracker', () => {
  let tracker: MetricsTracker;

  beforeEach(() => {
    tracker = new MetricsTracker();
  });

  it('starts at zero keystrokes', () => {
    tracker.start();
    expect(tracker.getKeystrokes()).toBe(0);
  });

  it('counts keystrokes after start', () => {
    tracker.start();
    tracker.addKeystroke();
    tracker.addKeystroke();
    expect(tracker.getKeystrokes()).toBe(2);
  });

  it('resets keystrokes on reset', () => {
    tracker.start();
    tracker.addKeystroke();
    tracker.reset();
    tracker.start();
    expect(tracker.getKeystrokes()).toBe(0);
  });

  it('calculates ks_per_min from elapsed time', () => {
    tracker.start();
    for (let i = 0; i < 60; i++) tracker.addKeystroke();
    const result = tracker.getResult(60_000);
    expect(result.ks_per_min).toBe(60);
    expect(result.keystrokes).toBe(60);
    expect(result.elapsed_ms).toBe(60_000);
  });

  it('does not count before start', () => {
    tracker.addKeystroke();
    expect(tracker.getKeystrokes()).toBe(0);
  });
});
