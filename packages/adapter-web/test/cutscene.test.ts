import { mulberry32 } from '../src/cinematic/rng';
import { buildTimeline, frameAt, type Cutscene } from '../src/cinematic/cutscene';

const CUT: Cutscene = {
  id: 'test',
  beats: [
    { id: 'a', lines: ['hello'], typing: { cps: 50, typoChance: 0, jitter: 0 }, glitch: 0.1, theme: 'corp', holdMs: 500 },
    { id: 'b', lines: ['world', 'two'], typing: { cps: 50, typoChance: 0, jitter: 0 }, glitch: 0.8, theme: 'warning', holdMs: 300 },
  ],
};

describe('buildTimeline / frameAt', () => {
  it('produces contiguous windows whose total equals totalMs', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    expect(tl.windows).toHaveLength(2);
    expect(tl.windows[0].startMs).toBe(0);
    expect(tl.windows[1].startMs).toBe(tl.windows[0].endMs);
    expect(tl.totalMs).toBe(tl.windows[1].endMs);
  });

  it('each window fully types its beat text', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    expect(tl.windows[0].plan[tl.windows[0].plan.length - 1].text).toBe('hello');
    expect(tl.windows[1].plan[tl.windows[1].plan.length - 1].text).toBe('world\ntwo');
  });

  it('frameAt(0) is beat 0, not done', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const f = frameAt(tl, 0);
    expect(f.beatIndex).toBe(0);
    expect(f.theme).toBe('corp');
    expect(f.done).toBe(false);
  });

  it('frameAt past the end is done and on the last beat', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const f = frameAt(tl, tl.totalMs + 100);
    expect(f.done).toBe(true);
    expect(f.beatIndex).toBe(1);
    expect(f.text).toBe('world\ntwo');
  });

  it('during the hold after typing, the full beat text is shown', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const w0 = tl.windows[0];
    const holdT = w0.endMs - 10; // inside beat 0's hold
    const f = frameAt(tl, holdT);
    expect(f.beatIndex).toBe(0);
    expect(f.text).toBe('hello');
    expect(f.glitch).toBeCloseTo(0.1);
  });
});
