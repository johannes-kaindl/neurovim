import { ENTRIES, listMissions, getMission, getLore } from '../src/index';

describe('@neurovim/content manifest', () => {
  it('has all 159 content entries (109 content + 50 solutions)', () => {
    expect(ENTRIES.length).toBe(159);
  });

  it('role distribution matches the curriculum (40 transmission, 40 briefing, 11 kata, 6 loot, 10 fragment, 2 ref, 50 solution)', () => {
    const count = (role: string) => ENTRIES.filter((e) => e.role === role).length;
    expect(count('transmission')).toBe(40);
    expect(count('briefing')).toBe(40);
    expect(count('kata')).toBe(11);
    expect(count('loot')).toBe(6);
    expect(count('fragment')).toBe(10);
    expect(count('ref')).toBe(2);
    expect(count('solution')).toBe(50);
  });
});

describe('listMissions', () => {
  it('returns 51 playable missions (40 transmission + 11 kata)', () => {
    expect(listMissions().length).toBe(51);
  });

  it('arc filter: ARC I = M-* + katas, ARC II = R-*', () => {
    const arc2 = listMissions('II');
    expect(arc2.length).toBe(24); // R-01..R-24
    expect(arc2.every((m) => m.mission_id.startsWith('R-'))).toBe(true);
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
});

describe('getLore', () => {
  it('LOOT-01 returns a lore doc', () => {
    const lore = getLore('LOOT-01');
    expect(lore.kind).toBe('loot');
    expect(lore.body.length).toBeGreaterThan(0);
  });
});
