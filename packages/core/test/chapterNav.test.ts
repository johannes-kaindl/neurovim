import { isChapterUnlocked, getChapterTarget, getChapterProgress } from '../src/utils/chapterNav';
import { CHAPTERS } from '../src/data/chapters';

const ch1 = CHAPTERS[0]; // M-01..M-04
const ch2 = CHAPTERS[1]; // M-05..M-08

describe('isChapterUnlocked', () => {
  it('ch1 is always unlocked (M-01 always in unlocked)', () => {
    expect(isChapterUnlocked(ch1, ['M-01', 'M-02', 'M-03', 'M-04'])).toBe(true);
  });

  it('ch2 is locked when unlocked array has only ch1 missions', () => {
    expect(isChapterUnlocked(ch2, ['M-01', 'M-02', 'M-03', 'M-04'])).toBe(false);
  });

  it('ch2 is unlocked when M-05 is in unlocked array', () => {
    expect(isChapterUnlocked(ch2, ['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08'])).toBe(true);
  });
});

describe('getChapterTarget', () => {
  it('returns briefing_path of first mission when nothing completed', () => {
    expect(getChapterTarget(ch1, [])).toBe('_content/01 - Indoctrination/M-01-BRIEFING-Induction_Order.md');
  });

  it('returns briefing_path of first incomplete mission', () => {
    expect(getChapterTarget(ch1, ['M-01', 'M-02'])).toBe('_content/01 - Indoctrination/M-03-BRIEFING-Agent_Roster.md');
  });

  it('returns briefing_path of first mission when all completed (replay)', () => {
    expect(getChapterTarget(ch1, ['M-01', 'M-02', 'M-03', 'M-04'])).toBe('_content/01 - Indoctrination/M-01-BRIEFING-Induction_Order.md');
  });
});

describe('getChapterProgress', () => {
  it('returns 0/4 when nothing completed', () => {
    expect(getChapterProgress(ch1, [])).toEqual({ done: 0, total: 4 });
  });

  it('returns 2/4 when two completed', () => {
    expect(getChapterProgress(ch1, ['M-01', 'M-02'])).toEqual({ done: 2, total: 4 });
  });

  it('returns 4/4 when all completed', () => {
    expect(getChapterProgress(ch1, ['M-01', 'M-02', 'M-03', 'M-04'])).toEqual({ done: 4, total: 4 });
  });
});
