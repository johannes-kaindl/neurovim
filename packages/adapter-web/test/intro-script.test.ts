import { INTRO } from '../src/cinematic/cutscenes/intro';
import { buildTimeline } from '../src/cinematic/cutscene';
import { mulberry32 } from '../src/cinematic/rng';

describe('INTRO cutscene', () => {
  it('has the six locked beats in order', () => {
    expect(INTRO.beats.map((b) => b.theme)).toEqual([
      'corp', 'fault', 'warning', 'cipher', 'unlock', 'unlock',
    ]);
  });

  it('keeps the locked verbatim payload lines (regression guard against paraphrase)', () => {
    const all = INTRO.beats.flatMap((b) => b.lines).join('\n');
    expect(all).toContain('A calm mind is a compliant mind');
    expect(all).toContain('UNPLUG IMMEDIATELY AND REPORT');
    expect(all).toContain('you read the Fault Conditions as a list of malfunctions.');
    expect(all).toContain('read it again as a syllabus');
    expect(all).toContain('let it run.');
    expect(all).toContain('the cursor is yours. it always was.');
    expect(all).toContain('the nerve to touch it.');
  });

  it('every beat has at least one non-empty line', () => {
    for (const b of INTRO.beats) {
      expect(b.lines.join('').trim().length).toBeGreaterThan(0);
    }
  });

  it('runs in a sane cinematic window (8s..30s)', () => {
    const tl = buildTimeline(INTRO, mulberry32(1));
    expect(tl.totalMs).toBeGreaterThan(8000);
    expect(tl.totalMs).toBeLessThan(30000);
  });
});
