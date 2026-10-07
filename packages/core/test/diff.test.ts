import { getDiff, getDivergentLines, normalizeMissionText } from '../src/utils/diff';

describe('getDiff', () => {
  it('returns matches true for identical content', () => {
    const result = getDiff('hello\nworld', 'hello\nworld');
    expect(result.matches).toBe(true);
    expect(result.lines_off).toBe(0);
  });

  it('detects first divergent line', () => {
    const result = getDiff('hello\nworld', 'hello\nearth');
    expect(result.matches).toBe(false);
    expect(result.first_divergent_line).toBe(1);
    expect(result.lines_off).toBe(1);
  });

  it('counts multiple divergent lines', () => {
    const result = getDiff('a\nb\nc', 'a\nX\nY');
    expect(result.lines_off).toBe(2);
    expect(result.first_divergent_line).toBe(1);
  });

  it('ignores leading/trailing whitespace on full content', () => {
    const result = getDiff('hello\nworld\n', 'hello\nworld');
    expect(result.matches).toBe(true);
  });
});

describe('getDivergentLines', () => {
  it('returns [] for identical content', () => {
    expect(getDivergentLines('a\nb\nc', 'a\nb\nc')).toEqual([]);
  });
  it('returns every divergent 0-based line index', () => {
    expect(getDivergentLines('a\nX\nY', 'a\nb\nc')).toEqual([1, 2]);
  });
  it('reports extra lines in current as divergent', () => {
    expect(getDivergentLines('a\nb\nc', 'a\nb')).toEqual([2]);
  });
  it('ignores leading/trailing whitespace like getDiff', () => {
    expect(getDivergentLines('a\nb\n', 'a\nb')).toEqual([]);
  });
});

// Host noise: vault plugins (Obsidian Linter, timestamp/title plugins) add YAML frontmatter
// and strip trailing spaces in the mission note. None of that is a Vim skill, so none of it
// may fail a run — the only challenge is the motion.
describe('host noise is not a mistake', () => {
  const solution = 'alpha\nbeta\ngamma';
  const withFm = '---\ntitle: M-04-Lines-and-Jumps\ncreated: 2026-10-06T19:31:31\nupdated: 2026-10-06T19:53:47\n---\n\nalpha\nbeta\ngamma';

  it('getDiff ignores a leading YAML frontmatter block', () => {
    expect(getDiff(withFm, solution).matches).toBe(true);
  });

  it('getDiff ignores trailing whitespace at line ends', () => {
    expect(getDiff('alpha  \nbeta\t\ngamma', solution).matches).toBe(true);
  });

  it('getDiff still fails on a real difference behind frontmatter', () => {
    const r = getDiff(withFm.replace('beta', 'BETA'), solution);
    expect(r.matches).toBe(false);
    expect(r.lines_off).toBe(1);
  });

  it('getDivergentLines reports document line indices, frontmatter included', () => {
    // frontmatter occupies lines 0-4, blank line 5, alpha 6, beta 7
    expect(getDivergentLines(withFm.replace('beta', 'BETA'), solution)).toEqual([7]);
  });

  it('does not strip a --- that is mission content rather than frontmatter', () => {
    // a horizontal rule without a closing fence is content
    expect(getDiff('---\nalpha', 'alpha').matches).toBe(false);
  });

  it('normalizeMissionText exposes lines and the document offset', () => {
    const n = normalizeMissionText(withFm);
    expect(n.lines).toEqual(['alpha', 'beta', 'gamma']);
    expect(n.offset).toBe(6);
  });
});
