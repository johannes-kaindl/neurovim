/**
 * Obsidian Markdown → HTML for the Welcome and Briefing views.
 *
 * `marked` renders the standard part (headings, bold/italic, lists,
 * nested blockquotes, ```ascii fences → <pre>). Two pre-process steps
 * bridge Obsidian specifics:
 *  - Wikilinks `[[path|label]]` / `[[path]]` → plain label/basename text
 *    (there are no vault routes on the web, hence no real links).
 *  - Callout headers `> [!type] Title` → `> <span class="nv-co nv-co-type"></span>**Title**`.
 *    The type is passed through as an inline marker span; styles.css colors
 *    the whole callout type-aware via `:has()` + sets a leading glyph (D25 restored).
 *
 * The source is bundled, build-time-trusted content (no user input),
 * so dangerouslySetInnerHTML in the views is acceptable.
 */
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Box-drawing "terminal boxes" (```ascii framed with ╔═╗ ║ ╚═╝) → a CSS-drawn box.
 * The borders are NOT rendered as glyphs (box-drawing chars render at a different
 * advance width than Latin text in the bundled font, so a glyph frame never aligns).
 * Instead the inner text rows are extracted and the frame is drawn with CSS (.nv-termbox),
 * which always aligns and themes via --nv-* tokens. Non-box ``` blocks are left untouched.
 */
function termBoxes(md: string): string {
  return md.replace(/```(?:ascii)?[ \t]*\r?\n([\s\S]*?)\r?\n```/g, (m, body: string) => {
    const lines = body.split('\n');
    if (!lines[0] || !lines[0].trimStart().startsWith('╔')) return m; // not a box → leave as code
    const inner = lines.slice(1, -1).map((l) =>
      l.replace(/^\s*║\s?/, '').replace(/\s*║\s*$/, '').trimEnd());
    const rows = inner
      .map((t, i) => `<div class="nv-termbox-row${i === 0 ? ' nv-termbox-head' : ''}">${escapeHtml(t) || '&nbsp;'}</div>`)
      .join('');
    return `<div class="nv-termbox">${rows}</div>`;
  });
}

function preprocess(md: string): string {
  return termBoxes(md)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, (_m, p: string) => p.split('/').pop() ?? p)
    .replace(/^((?:>\s*)+)\[!(\w+)\]([+-]?)\s*(.*)$/gm, (_m, quote: string, type: string, _fold: string, title: string) => {
      const label = title && title.trim() ? title.trim() : type.toUpperCase();
      const t = type.toLowerCase();
      return `${quote}<span class="nv-co nv-co-${t}"></span>**${label}**`;
    });
}

export function renderMarkdown(md: string): string {
  return marked.parse(preprocess(md), { async: false }) as string;
}
