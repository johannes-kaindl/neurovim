import { ENTRIES, listMissions, getMission, getLore } from '../src/index';

describe('@neurovim/content manifest', () => {
  it('has all 173 content entries (120 content + 53 solutions)', () => {
    expect(ENTRIES.length).toBe(173);
  });

  it('role distribution matches the curriculum (40 transmission, 40 briefing, 14 kata, 9 loot, 14 fragment, 3 ref, 53 solution)', () => {
    const count = (role: string) => ENTRIES.filter((e) => e.role === role).length;
    expect(count('transmission')).toBe(40);
    expect(count('briefing')).toBe(40);
    expect(count('kata')).toBe(14);
    expect(count('loot')).toBe(9);
    expect(count('fragment')).toBe(14);
    expect(count('ref')).toBe(3);
    expect(count('solution')).toBe(53);
  });
});

describe('listMissions', () => {
  it('returns 54 playable missions (40 transmission + 14 kata)', () => {
    expect(listMissions().length).toBe(54);
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

describe('mission start state', () => {
  // Editor buffers seed with transmissionBody and diff against solution —
  // identical bodies mean the mission is already solved on open.
  it('every mission with a solution starts unsolved (transmission != solution)', () => {
    const presolved = listMissions()
      .filter((m) => {
        const doc = getMission(m.mission_id);
        return doc.solution != null && doc.transmissionBody.trim() === doc.solution.trim();
      })
      .map((m) => m.mission_id);
    expect(presolved).toEqual([]);
  });
});

describe('solution derivability', () => {
  // Missions whose solution introduces a line that doesn't appear (verbatim or
  // near-verbatim) in the transmission are only solvable by already knowing the
  // answer, UNLESS that content is stated explicitly elsewhere (a briefing
  // DIRECTIVE, an inline CIPHER note, or a deterministic formula given in the
  // mission text) — e.g. R-01's target word is named in its CIPHER note, R-24's
  // exact `:s` commands are spelled out in its briefing. Audit + full per-mission
  // reasoning: packages/content/CONTENT-AUDIT-solution-derivability.md
  const EXPLAINED_ORPHANS = new Set([
    'M-06', // decrypted roster spelled out in the briefing DIRECTIVE (fixed 2026-07-24)
    'M-13', // pure case-conversion — same words, bigram check is case-sensitive (false positive)
    'M-15', // regex capture-group formulas given in the transmission Note
    'M-16', // arithmetic/regex formulas given in the transmission Note
    'R-01', // target word ("NEXUS") named in the CIPHER note
    'R-04', // target word ("ACTIVE") named in the CIPHER note
    'R-07', // pure tag-stripping — payload content preserved verbatim
    'R-10', // target text ("[OK]") named in the CIPHER note
    'R-16', // target text ("[REDACTED]") + exact command named in the briefing
    'R-24', // exact three commands + target text named in the briefing
    'KATA-07', // target word ("NEXUS") stated in-line in the transmission's own Registry line
    'KATA-03', // field-reference line spelled out in-line (fixed 2026-07-24, same class as M-02/M-06)
  ]);

  function bigrams(s: string): Set<string> {
    const set = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
    return set;
  }

  function similarity(a: string, b: string): number {
    const A = bigrams(a);
    const B = bigrams(b);
    if (!A.size || !B.size) return a === b ? 1 : 0;
    let overlap = 0;
    for (const g of A) if (B.has(g)) overlap++;
    return overlap / (A.size + B.size - overlap);
  }

  function orphanLines(transmission: string, solution: string): string[] {
    const t = transmission.trim().split('\n');
    const s = solution.trim().split('\n');
    return s.filter((l) => l.trim() && !t.includes(l) && !t.some((x) => similarity(x, l) > 0.5));
  }

  it('every mission solution is derivable from its transmission, or its orphan content is explained (see audit)', () => {
    const unexplained = listMissions()
      .filter((m) => !EXPLAINED_ORPHANS.has(m.mission_id))
      .map((m) => ({ id: m.mission_id, doc: getMission(m.mission_id) }))
      .filter(({ doc }) => doc.solution != null)
      .filter(({ doc }) => orphanLines(doc.transmissionBody, doc.solution!).length > 0)
      .map(({ id }) => id);
    expect(unexplained).toEqual([]);
  });

  // The line-level check above is blind to an in-place word swap: replacing SCAN-7741
  // with UNIT-7741 leaves the rest of the line intact, so the line stays far above the
  // similarity threshold and never registers as an orphan. That is exactly how M-03
  // shipped unsolvable. This token-level pass catches the same defect class one
  // granularity down.
  // Same allowlist discipline as EXPLAINED_ORPHANS: one line of reasoning per entry.
  // A typo fix is derivable (the misspelling is right there); an arbitrary target value
  // is not, unless the mission text names it or gives a formula that produces it.
  const EXPLAINED_TOKENS = new Set([
    'M-01', // typo repairs — `knwo`/`wiats`/`laern`, too short for the bigram threshold
    'M-02', // typo repairs — `entarnce`/`la`/`befoer`, audited 2026-07-24
    'M-11', // target values live in FRAGMENT-10, linked in the briefing — the split-pane diff IS the mission
    'M-14', // per-column offset-keys (+3 REF, +7 MARK) stated in transmission and briefing
    'M-15', // regex capture-group formulas given in the transmission Note
    'M-16', // arithmetic/regex formulas given in the transmission Note
    'R-19', // exact `:%s` command with capture-group order named in the briefing
    'KATA-01', // typo repairs — `ATIVE`/`NORHT`/`CIPER`/`ONLIE`
    'KATA-10', // date reformat — `\3.\2.\1` order stated in the kata's own Skills header
  ]);

  function tokenize(s: string): string[] {
    return (s.match(/[A-Za-z0-9][A-Za-z0-9._-]*/g) ?? []).map((t) => t.toLowerCase());
  }

  function orphanTokens(source: string, solution: string): string[] {
    const known = tokenize(source);
    const knownSet = new Set(known);
    return [...new Set(tokenize(solution))].filter(
      (tok) => !knownSet.has(tok) && !known.some((k) => similarity(k, tok) > 0.5),
    );
  }

  it('every solution token has a source in the transmission or briefing, or is explained (see audit)', () => {
    const unexplained = listMissions()
      .filter((m) => !EXPLAINED_TOKENS.has(m.mission_id))
      .map((m) => ({ id: m.mission_id, doc: getMission(m.mission_id) }))
      .filter(({ doc }) => doc.solution != null)
      .map(({ id, doc }) => ({
        id,
        tokens: orphanTokens(`${doc.transmissionBody}\n${doc.briefingBody}`, doc.solution!),
      }))
      .filter(({ tokens }) => tokens.length > 0)
      .map(({ id, tokens }) => `${id}: ${tokens.join(' ')}`);
    expect(unexplained).toEqual([]);
  });
});
