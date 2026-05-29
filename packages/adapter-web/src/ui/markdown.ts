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

function preprocess(md: string): string {
  return md
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
