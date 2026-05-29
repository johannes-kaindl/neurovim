# NeuroVim — Polish-Pass Port Package

A drop-in port of the *Operative Console* mockup onto the **real** `@neurovim/adapter-web`
codebase. It honours the spec's hard constraints: everything funnels through the six
`--nv-*` tokens, **monospace-only (no web-font load)**, no new dependencies, and changes
are CSS-first so the flow + 150 tests stay green.

> The standalone HTML mockup (`NeuroVim — Operative Console.html`) is the *cinematic*
> reference (web fonts, brighter green, CRT/HUD). This package is the **restrained Kuro
> port** — the same structure and states, expressed through the real tokens, that's
> actually safe to ship into the bundle.

## Files

| File | Replaces / adds | Notes |
|---|---|---|
| `styles.css` | **replaces** `src/styles.css` | Superset of the original — every existing selector preserved + enhanced. New `:root` tokens added. |
| `cm6-theme.ts` | **add** `src/ui/cm6-theme.ts` | Full CodeMirror 6 phosphor theme + `vimModeIndicator()`. |
| `MissionEditor.tsx` | **replaces** `src/ui/MissionEditor.tsx` | Same props/onSubmit contract; adds theme + mode chip + run HUD. |
| `markdown-callouts.md` | patch for `src/ui/markdown.ts` | 2-line change to restore type-aware callouts (D25). |

## What works with **zero markup changes** (pure CSS, on `styles.css` swap alone)
- Welcome hero scale-up + blinking `_` cursor + pulsing `Enter NEXUS` CTA.
- NEXUS tier headers become labelled dividers; mission rows get hover/focus polish; `✓` done state glows.
- Tokenised status colours (`#ff6b6b`, backdrop, shadow are now `--nv-fail` / `--nv-backdrop` / `--nv-modal-shadow`).
- Result modal: corner brackets, bigger glowing `+XP`, themed metrics row.
- Sandbox: hover lift; the **last** difficulty tile (HARD) auto-escalates (amber→red) — no markup.
- Briefing ASCII `<pre>` inset frame + accent glow; focus rings; themed scrollbars; reduced-motion + mobile handling.

## What needs a **small, additive** markup change (marked `[needs markup]` in CSS)

1. **Mission states** — add a class to the `<li>` (or button) in `App.tsx`'s picker:
   `nv-active` (current mission), `nv-done-row` (dim completed), `nv-locked` (locked tier).
   The data already carries `locked`/`unlocked` and completion, so it's a className map.
2. **Editor mode chip + HUD** — already wired in the provided `MissionEditor.tsx`
   (`.nv-editor-status` / `.nv-mode-chip`). No work beyond using the new file.
3. **XP gain flash** — when returning to NEXUS after a fresh clear, toggle
   `.nv-gained` on `.nv-xpbar-fill` for ~700ms.
4. **Sandbox run timer** — render a `.nv-sandbox-hud` (markup sketch below) during an
   active RAVEN run for the prominent countdown the spec asks for (§9.5).
5. **Callout types** — apply the `markdown.ts` patch (see `markdown-callouts.md`).

### Sandbox run HUD markup sketch
```html
<div class="nv-sandbox-hud" aria-live="polite">
  <div class="nv-cell"><div class="nv-v">{elapsed}s</div><div class="nv-k">Elapsed</div></div>
  <div class="nv-cell nv-rem"><div class="nv-v">{remaining}</div><div class="nv-k">Glitches left</div></div>
</div>
```

## New `:root` tokens (added to `styles.css`)
`--nv-accent-hot`, `--nv-accent-dim`, `--nv-faint`, `--nv-line-hot`,
`--nv-fail`, `--nv-warn`, `--nv-tip`, `--nv-co-*` (callout accents),
`--nv-glow` (glow multiplier, set `0` to flatten), `--nv-backdrop`,
`--nv-modal-shadow`, `--nv-scan` (CRT scanline opacity, default `0`).

All derive from or sit alongside the canonical six — retheming is still "edit the tokens."
`color-mix()` is used for tints/glows so you never hand-mix hex.

## Editor (CM6) before → after
- **Before:** inline `EditorView.theme({ '&': fontSize/height/border, '.cm-content': fontFamily })`
  → default light gutter, default cursor/selection, no mode feedback.
- **After:** `neurovimTheme` (dark gutter, muted line numbers, accent active-line + gutter,
  phosphor caret, vim block cursor via `.cm-fat-cursor`, accent selection, themed search /
  vim command line / scrollbars) + `vimModeIndicator(setMode)` driving the NORMAL/INSERT/VISUAL chip.

## Guardrails honoured
- **Tokens, not hex** — new colours added as `:root` vars.
- **No web fonts / no deps** — `ui-monospace, monospace` throughout; CM theme adds nothing to the bundle.
- **Reduced motion** — all non-essential motion (incl. the XP-bar transition) is neutralised under `prefers-reduced-motion`.
- **Flow/tests** — CSS-first; the editor keeps its exact `onSubmit(content, metrics)` contract and `vim()`-first extension order.
