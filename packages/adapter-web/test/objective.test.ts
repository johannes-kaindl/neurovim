/**
 * The objective panel's decision: authored steps beat the summary, the summary beats the
 * generic line, and the panel is never empty. Rendering itself is not tested here (no DOM).
 */
import { getMission, listMissions } from '@neurovim/content';
import { FALLBACK_OBJECTIVE, objectiveView } from '../src/ui/objective';

describe('objectiveView', () => {
  it('turns authored steps into segmented list items, code spans kept apart', () => {
    const v = objectiveView({
      objective: ['Change `alpha` to `beta`.', 'Keep the header.'],
      summary: 'ignored when steps exist',
    });
    expect(v).toEqual({
      kind: 'steps',
      steps: [
        [
          { code: false, text: 'Change ' },
          { code: true, text: 'alpha' },
          { code: false, text: ' to ' },
          { code: true, text: 'beta' },
          { code: false, text: '.' },
        ],
        [{ code: false, text: 'Keep the header.' }],
      ],
    });
  });

  it('drops blank steps; all-blank steps fall back to the summary', () => {
    expect(objectiveView({ objective: ['  ', 'Do it.', ''] })).toEqual({
      kind: 'steps',
      steps: [[{ code: false, text: 'Do it.' }]],
    });
    expect(objectiveView({ objective: [' ', ''], summary: 'Fix the log.' })).toEqual({
      kind: 'summary',
      text: 'Fix the log.',
    });
  });

  it('falls back to the summary, then to a generic line — never empty', () => {
    expect(objectiveView({ summary: '  Fix the log.  ' })).toEqual({ kind: 'summary', text: 'Fix the log.' });
    expect(objectiveView({ objective: [], summary: '   ' })).toEqual({ kind: 'summary', text: FALLBACK_OBJECTIVE });
    expect(objectiveView({})).toEqual({ kind: 'summary', text: FALLBACK_OBJECTIVE });
  });
});

describe('objective wiring through the content manifest', () => {
  it('M-04 reaches the editor as steps with exact target strings', () => {
    const v = objectiveView(getMission('M-04'));
    expect(v.kind).toBe('steps');
    if (v.kind !== 'steps') return;
    expect(v.steps.length).toBeGreaterThan(0);
    expect(v.steps.flat().some((seg) => seg.code)).toBe(true);
  });

  it('every playable mission yields a non-empty objective', () => {
    for (const m of [...listMissions('I'), ...listMissions('II')]) {
      const v = objectiveView(m);
      if (v.kind === 'steps') expect(v.steps.every((s) => s.length > 0)).toBe(true);
      else expect(v.text.length).toBeGreaterThan(0);
    }
  });
});
