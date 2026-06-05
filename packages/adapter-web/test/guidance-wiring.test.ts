/**
 * Wiring contract: the content manifest feeds the pure GuidanceEngine, and the Reference
 * manual is reachable — without rendering any UI/CM6 (the brittle part). Guards the data
 * path App.tsx uses to build the Comms-Rail / briefing / result guidance.
 */
import { CHEATSHEET, deriveGuidance } from '@neurovim/core';
import { getMission, getManual, listMissions } from '@neurovim/content';

function nextSummary(id: string) {
  const list = listMissions(id.startsWith('R-') ? 'II' : 'I');
  const i = list.findIndex((m) => m.mission_id === id);
  if (i < 0 || i >= list.length - 1) return null;
  const n = list[i + 1];
  return { mission_id: n.mission_id, title: n.title, category: n.category };
}

describe('guidance wiring', () => {
  it('M-01 carries summary + authored why through the manifest', () => {
    const m = getMission('M-01');
    expect(m.summary).toMatch(/modes/i);
    expect(m.why).toMatch(/spine/i);
  });

  it('deriveGuidance builds a usable model from a real mission', () => {
    const m = getMission('M-01');
    const g = deriveGuidance({
      category: m.category, summary: m.summary, why: m.why,
      next: nextSummary('M-01'), cheatsheet: CHEATSHEET, level: 1, pin: null,
    });
    expect(g.skillTag).toBeTruthy();
    expect(g.keys.length).toBeGreaterThan(0);
    expect(g.why).toMatch(/spine/i);
    expect(g.leadsTo).toMatch(/M-02/);
    expect(g.tier).toBe(0);
  });

  it('getManual returns the comprehensive reference body', () => {
    expect(getManual().length).toBeGreaterThan(200);
  });
});
