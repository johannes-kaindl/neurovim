/**
 * Obsidian-Markdown → HTML für Welcome- + Briefing-Views.
 *
 * `marked` rendert den Standard-Teil (Überschriften, bold/italic, Listen,
 * verschachtelte Blockquotes, ```ascii-Fences → <pre>). Zwei Pre-Process-Schritte
 * überbrücken Obsidian-Spezifika:
 *  - Wikilinks `[[pfad|label]]` / `[[pfad]]` → reiner Label-/Basename-Text
 *    (im Web gibt es keine Vault-Routen, also keine echten Links).
 *  - Callout-Header `> [!type] Titel` → `> <span class="nv-co nv-co-type"></span>**Titel**`.
 *    Der Typ wird als Inline-Marker-Span durchgereicht; styles.css färbt via
 *    `:has()` das ganze Callout type-aware ein + setzt ein Leit-Glyph (D25 restored).
 *
 * Quelle ist gebündelter, build-time-vertrauenswürdiger Content (kein User-Input),
 * daher ist dangerouslySetInnerHTML in den Views vertretbar.
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
