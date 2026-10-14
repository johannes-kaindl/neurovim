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

// Lines are aligned along a longest common subsequence: an inserted or deleted line costs one
// line, not the rest of the document (decided 2026-10-14 — 13 of 54 missions change their line
// count while being solved). Ties drop the current line before adding the solution line.
describe('line alignment', () => {
  it('an inserted line in the middle costs one line', () => {
    const r = getDiff('a\nNEW\nb\nc\nd', 'a\nb\nc\nd');
    expect(r).toEqual({ matches: false, first_divergent_line: 1, lines_off: 1 });
    expect(getDivergentLines('a\nNEW\nb\nc\nd', 'a\nb\nc\nd')).toEqual([1]);
  });
  it('a deleted line marks the line after the gap', () => {
    expect(getDiff('a\nc\nd', 'a\nb\nc\nd').lines_off).toBe(1);
    expect(getDivergentLines('a\nc\nd', 'a\nb\nc\nd')).toEqual([1]);
  });
  it('missing lines at the end mark the last line, never one past the document', () => {
    expect(getDiff('a', 'a\nb\nc')).toEqual({ matches: false, first_divergent_line: 1, lines_off: 2 });
    expect(getDivergentLines('a', 'a\nb\nc')).toEqual([0]);
  });
  it('an empty text differs but marks nothing', () => {
    expect(getDiff('', 'a')).toEqual({ matches: false, first_divergent_line: 0, lines_off: 1 });
    expect(getDivergentLines('', 'a')).toEqual([]);
  });
  it('a changed first line before an equal line marks only that line', () => {
    expect(getDivergentLines('a\nb', 'b\nb')).toEqual([0]);
  });
  it('a moved line costs one line and marks where it left and where it is missing', () => {
    expect(getDiff('b\nc\na', 'a\nb\nc').lines_off).toBe(1);
    expect(getDivergentLines('b\nc\na', 'a\nb\nc')).toEqual([0, 2]);
  });
  it('on a tie the current line is dropped before the solution line is added', () => {
    expect(getDivergentLines('a\na\nb', 'c\na')).toEqual([0, 2]);
  });
  it('a changed line next to a missing line', () => {
    expect(getDiff('a\nX\nc', 'a\nb\nc\nd').lines_off).toBe(2);
    expect(getDivergentLines('a\nX\nc', 'a\nb\nc\nd')).toEqual([1, 2]);
  });
  it('an inserted line behind host frontmatter reports its document index', () => {
    const fm = '---\ntitle: x\n---\n';
    expect(getDivergentLines(fm + 'a\nNEW\nb', 'a\nb')).toEqual([4]);
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

describe('host noise: hostile shapes', () => {
  it('stays linear on CRLF text that opens with --- and never closes it', () => {
    const text = '---\r\ntitle: x\r\n' + 'line\r\n'.repeat(40) + 'end';
    const t0 = Date.now();
    normalizeMissionText(text);
    expect(Date.now() - t0).toBeLessThan(200);
  });

  it('strips CRLF frontmatter like LF frontmatter', () => {
    expect(getDiff('---\r\ntitle: x\r\n---\r\nalpha\r\nbeta', 'alpha\nbeta').matches).toBe(true);
  });

  it('recognises frontmatter behind a UTF-8 BOM', () => {
    expect(getDiff('﻿---\ntitle: x\n---\nalpha', 'alpha').matches).toBe(true);
  });
});
