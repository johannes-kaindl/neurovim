/**
 * Obsidian-Markdown → HTML für Welcome- + Briefing-Views.
 *
 * `marked` rendert den Standard-Teil (Überschriften, bold/italic, Listen,
 * verschachtelte Blockquotes, ```ascii-Fences → <pre>). Zwei Pre-Process-Schritte
 * überbrücken Obsidian-Spezifika:
 *  - Wikilinks `[[pfad|label]]` / `[[pfad]]` → reiner Label-/Basename-Text
 *    (im Web gibt es keine Vault-Routen, also keine echten Links).
 *  - Callout-Header `> [!type] Titel` → `> **Titel**` (Struktur als Blockquote
 *    bleibt, Typ-Farbe entfällt — siehe D25).
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
      return `${quote}**${label}**`;
    });
}

export function renderMarkdown(md: string): string {
  return marked.parse(preprocess(md), { async: false }) as string;
}
