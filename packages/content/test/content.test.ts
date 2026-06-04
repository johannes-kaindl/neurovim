import { ENTRIES, listMissions, getMission, getLore } from '../src/index';

describe('@neurovim/content manifest', () => {
  it('has all 163 content entries (111 content + 52 solutions)', () => {
    expect(ENTRIES.length).toBe(163);
  });

  it('role distribution matches the curriculum (40 transmission, 40 briefing, 13 kata, 6 loot, 10 fragment, 2 ref, 52 solution)', () => {
    const count = (role: string) => ENTRIES.filter((e) => e.role === role).length;
    expect(count('transmission')).toBe(40);
    expect(count('briefing')).toBe(40);
    expect(count('kata')).toBe(13);
    expect(count('loot')).toBe(6);
    expect(count('fragment')).toBe(10);
    expect(count('ref')).toBe(2);
    expect(count('solution')).toBe(52);
  });
});

describe('listMissions', () => {
  it('returns 53 playable missions (40 transmission + 13 kata)', () => {
    expect(listMissions().length).toBe(53);
  });

  it('arc filter: ARC I = M-* + katas, ARC II = R-*', () => {
    const arc2 = listMissions('II');
    expect(arc2.length).toBe(24); // R-01..R-24
    expect(arc2.every((m) => m.mission_id.startsWith('R-'))).toBe(true);
  });

  it('Arc II difficulty is a monotonic non-decreasing ramp', () => {
    const arc2 = [...listMissions('II')].sort((a, b) => a.mission_id.localeCompare(b.mission_id));
    const diffs = arc2.map((m) => m.difficulty ?? 0);
    for (let i = 1; i < diffs.length; i++) {
      expect(diffs[i]).toBeGreaterThanOrEqual(diffs[i - 1]);
    }
    expect(diffs[0]).toBe(1);
    expect(diffs[diffs.length - 1]).toBe(5);
  });

  it('frontmatter typed: xp_reward is number, locked is boolean', () => {
    const m = listMissions().find((x) => x.mission_id === 'M-01')!;
    expect(typeof m.xp_reward).toBe('number');
    expect(typeof m.locked).toBe('boolean');
    expect(m.arc).toBe('I');
  });
});

describe('getMission', () => {
  it('M-01 has both transmission AND briefing body', () => {
    const doc = getMission('M-01');
    expect(doc.transmissionBody.length).toBeGreaterThan(0);
    expect(doc.briefingBody.length).toBeGreaterThan(0);
    expect(doc.solution && doc.solution.length).toBeGreaterThan(0);
    expect(doc.title).toBeTruthy();
  });

  it('throws on an unknown ID', () => {
    expect(() => getMission('M-99')).toThrow();
  });

  it('surfaces difficulty from frontmatter on mission summaries', () => {
    const m = getMission('R-05');
    expect(typeof m.difficulty).toBe('number');
    expect(m.difficulty).toBeGreaterThan(0);
  });
});

describe('getLore', () => {
  it('LOOT-01 returns a lore doc', () => {
    const lore = getLore('LOOT-01');
    expect(lore.kind).toBe('loot');
    expect(lore.body.length).toBeGreaterThan(0);
  });
});
