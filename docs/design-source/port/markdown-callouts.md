# Type-aware briefing callouts — markdown renderer patch

Restores the Obsidian callout colours the web renderer currently drops (decision **D25**).
One change in `src/ui/markdown.ts`, then the CSS in `styles.css` does the rest.

## The change (`markdown.ts` → `preprocess`)

The current step flattens `> [!type] Title` to `> **Title**`, losing the type.
Carry the type through as an inline marker span (marked keeps inline HTML):

```diff
-    .replace(/^((?:>\s*)+)\[!(\w+)\]([+-]?)\s*(.*)$/gm, (_m, quote: string, type: string, _fold: string, title: string) => {
-      const label = title && title.trim() ? title.trim() : type.toUpperCase();
-      return `${quote}**${label}**`;
-    });
+    .replace(/^((?:>\s*)+)\[!(\w+)\]([+-]?)\s*(.*)$/gm, (_m, quote: string, type: string, _fold: string, title: string) => {
+      const label = title && title.trim() ? title.trim() : type.toUpperCase();
+      const t = type.toLowerCase();
+      return `${quote}<span class="nv-co nv-co-${t}"></span>**${label}**`;
+    });
```

That emits, e.g.:

```html
<blockquote>
  <p><span class="nv-co nv-co-warning"></span><strong>CLEARANCE</strong> SHADOW LINK is one-time…</p>
</blockquote>
```

## How it lights up

`styles.css` targets the marker with `:has()` (Baseline-supported) and styles the
whole callout by type, plus a small leading glyph:

| Obsidian type        | Token         | Border / accent | Glyph |
|----------------------|---------------|-----------------|-------|
| `quote`              | `--nv-co-quote`   | accent green   | `“` |
| `warning` / `caution`| `--nv-co-warning` | CORP amber     | `⚠` |
| `tip` / `hint`       | `--nv-co-tip`     | bright green   | `◆` |
| `success` / `check`  | `--nv-co-success` | hot green      | `✓` |
| anything else        | —             | default green   | — |

Add aliases by extending the `:has()` rules (e.g. map `danger` → `--nv-fail`,
`note`/`info` → `--nv-accent`). The marker `<span>` itself is harmless if a type
has no rule — it just renders its glyph (or nothing).

## Why `:has()` and not a renderer rewrite
Keeps the change to **two lines** and zero new logic in the views — the blockquote
structure marked already produces is untouched, so existing markdown tests stay green.
If you must support a browser without `:has()`, swap the `:has()` selectors for a
tiny post-render pass that copies the type class onto the parent `<blockquote>`.
