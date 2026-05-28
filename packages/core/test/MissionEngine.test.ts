import { MissionEngine } from '../src/engine/MissionEngine';

describe('MissionEngine', () => {
  it('verify returns true when content matches solution', () => {
    const result = MissionEngine.verify('hello world\n', 'hello world');
    expect(result.matches).toBe(true);
  });

  it('verify returns false and diff when content differs', () => {
    const result = MissionEngine.verify('wrong line\nhello', 'correct line\nhello');
    expect(result.matches).toBe(false);
    expect(result.lines_off).toBe(1);
    expect(result.first_divergent_line).toBe(0);
  });

  it('isMissionPracticeFile returns true for practice files', () => {
    expect(MissionEngine.isMissionPracticeFile({ mission_type: 'practice' })).toBe(true);
  });

  it('isMissionPracticeFile returns false for briefing files', () => {
    expect(MissionEngine.isMissionPracticeFile({ mission_type: 'briefing' })).toBe(false);
  });

  it('isMissionPracticeFile returns false for null frontmatter', () => {
    expect(MissionEngine.isMissionPracticeFile(null)).toBe(false);
  });

  it('buildPracticeFrontmatter leaves content with existing frontmatter unchanged', () => {
    const existing = '---\nmission_type: practice\n---\n\nContent';
    const result = MissionEngine.buildPracticeFrontmatter(existing, 'M-01', false);
    expect(result).toBe(existing);
  });

  it('buildPracticeFrontmatter adds frontmatter to plain content', () => {
    const result = MissionEngine.buildPracticeFrontmatter('Plain content', 'M-05', true);
    expect(result).toContain('mission_type: practice');
    expect(result).toContain('mission_id: M-05');
    expect(result).toContain('locked: true');
    expect(result).toContain('Plain content');
  });
});
