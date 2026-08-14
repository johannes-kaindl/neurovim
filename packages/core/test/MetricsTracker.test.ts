import { MetricsTracker } from '../src/engine/MetricsTracker';
import { scriptedClock } from './__mocks__/clock';
import { countsAsKeystroke } from '../src/engine/MetricsTracker';

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

describe('MetricsTracker (injected clock)', () => {
  it('measures elapsed time against the injected clock', () => {
    const t = new MetricsTracker(scriptedClock([1_000, 3_000]));
    t.start();
    expect(t.getElapsedMs()).toBe(2_000);
  });

  it('reports zero elapsed time before start', () => {
    const t = new MetricsTracker(scriptedClock([1_000, 9_999]));
    expect(t.getElapsedMs()).toBe(0);
  });
});

describe('countsAsKeystroke', () => {
  it('counts printable, navigation and command keys (incl. vim motions/operators)', () => {
    for (const k of ['h', 'j', 'k', 'l', 'w', 'b', 'd', 'x', 'i', 'a', '0', '$',
                     'Escape', 'Enter', 'Backspace', 'ArrowLeft', ' ']) {
      expect(countsAsKeystroke(k)).toBe(true);
    }
  });

  it('ignores bare modifier keys (they carry no edit intent on their own)', () => {
    for (const k of ['Control', 'Alt', 'Meta', 'Shift', 'CapsLock']) {
      expect(countsAsKeystroke(k)).toBe(false);
    }
  });
});

describe('MetricsTracker (trace recording)', () => {
  it('records keys with t relative to start', () => {
    const t = new MetricsTracker(scriptedClock([1_000, 1_120, 1_190]));
    t.start();
    t.addKeystroke('d');
    t.addKeystroke('w');
    expect(t.getEvents()).toEqual([{ k: 'd', t: 120 }, { k: 'w', t: 190 }]);
  });

  it('includes mode only when provided', () => {
    const t = new MetricsTracker(scriptedClock([0, 5]));
    t.start();
    t.addKeystroke('i', 'normal');
    expect(t.getEvents()).toEqual([{ k: 'i', m: 'normal', t: 5 }]);
  });

  it('counts without recording when no key is given (narrower recording scope)', () => {
    const t = new MetricsTracker(scriptedClock([0, 10]));
    t.start();
    t.addKeystroke();
    t.addKeystroke('d');
    expect(t.getKeystrokes()).toBe(2);
    expect(t.getEvents()).toHaveLength(1);
  });

  it('records nothing before start', () => {
    const t = new MetricsTracker(scriptedClock([0, 10]));
    t.addKeystroke('d');
    expect(t.getEvents()).toEqual([]);
  });

  it('reset clears recorded events and rebaselines t', () => {
    const t = new MetricsTracker(scriptedClock([0, 10, 100, 130]));
    t.start();
    t.addKeystroke('x');
    t.reset();
    t.start();           // base = 100
    t.addKeystroke('y'); // t = 30
    expect(t.getEvents()).toEqual([{ k: 'y', t: 30 }]);
  });

  it('getEvents returns a defensive copy', () => {
    const t = new MetricsTracker(scriptedClock([0, 1]));
    t.start();
    t.addKeystroke('a');
    const snap = t.getEvents();
    snap[0].k = 'MUT';
    expect(t.getEvents()[0].k).toBe('a');
  });
});
