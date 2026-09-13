# Reference — Design tokens

> **Diátaxis: Reference.** The `--nv-*` custom properties declared on `:root` in
> `packages/adapter-web/src/styles.css`. For the design rationale and brief, start from the
> [contributor docs index](../README.md); design deliveries live under `docs/design-source/`.

## Rules

- All web styles live in `packages/adapter-web/src/styles.css` (plus the CodeMirror theme in
  `src/ui/cm6-theme.ts`).
- A new colour is added as a `:root` variable — never as an inline hex value in a rule.
- Monospace is self-hosted: JetBrains Mono (body) and VT323 (display/wordmark) under
  `src/fonts/` (see `src/fonts/README.md`).
- **Bundle budget:** the web build is code-split; CodeMirror and `marked` load lazily. New
  dependencies must justify their weight. Take current sizes from the output of
  `npm run build:web`, not from any document.

## Surface

| Token | Value | Use |
|---|---|---|
| `--nv-bg` | `#070908` | page background |
| `--nv-panel` | `#11160f` | panels |
| `--nv-border` | `#1f2a1c` | borders |
| `--nv-line-hot` | `#2c4a2f` | highlighted lines / active borders |
| `--nv-text` | `#cfe0cf` | body text |
| `--nv-muted` | `#8aa68a` | secondary text (7.51:1 on `--nv-bg`, 6.90:1 on `--nv-panel`) |

## Semantic accents

| Token | Value | Use |
|---|---|---|
| `--nv-visual` | `#b388ff` | Vim VISUAL mode |
| `--nv-accent` | `#39ff7a` | Resistance / player / primary |
| `--nv-accent-hot` | `#9dffc2` | hero, active, success lock-in |
| `--nv-accent-dim` | `#2bbe5e` | dimmed accent |
| `--nv-amber` | `#ffb02e` | CORP, locked, caution |
| `--nv-fail` | `#ff5b5b` | failure, glitch, corruption |
| `--nv-gold` | `#ffd24a` | par-tier gold |
| `--nv-silver` | `#c8d6c8` | par-tier silver |
| `--nv-bronze` | `#cd7f4f` | par-tier bronze |

## Type

| Token | Value |
|---|---|
| `--nv-mono` | `'JetBrains Mono', ui-monospace, monospace` |
| `--nv-display` | `'VT323', var(--nv-mono)` |
| `--nv-fs-display` | `clamp(44px, 8vw, 64px)` |
| `--nv-fs-h1` | `28px` |
| `--nv-fs-h2` | `20px` |
| `--nv-fs-body` | `15px` |
| `--nv-fs-sm` | `13px` |
| `--nv-fs-micro` | `11px` (uppercase HUD labels) |
| `--nv-ls-label` | `3px` (letter-spacing for HUD labels) |

## Spacing

| Token | `--nv-s1` | `--nv-s2` | `--nv-s3` | `--nv-s4` | `--nv-s5` | `--nv-s6` |
|---|---|---|---|---|---|---|
| Value | `4px` | `8px` | `12px` | `16px` | `24px` | `32px` |

## Effect dials

| Token | Default | Meaning | Set to `0` by |
|---|---|---|---|
| `--nv-glow` | `1` | glow multiplier; `0` = flat | `html[data-fx="off"]`, `prefers-reduced-motion: reduce` |
| `--nv-scan` | `0.12` | scanline opacity; `0` = off | `html[data-fx="off"]`, `prefers-reduced-motion: reduce` |
| `--nv-vignette` | `0.7` | inner vignette strength `0..1` | `html[data-fx="off"]` |

`data-fx` on `<html>` reflects the player's "reduce effects" setting (`src/ui/settings.ts`).

## Other

| Token | Value | Note |
|---|---|---|
| `--nv-backdrop` | `rgba(0,0,0,0.72)` | modal backdrop |
| `--nv-modal-shadow` | `rgba(0,0,0,0.6)` | modal shadow |
| `--nv-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | default easing |
| `--nv-warn` | `var(--nv-amber)` | legacy alias |
| `--nv-tip` | `#6dffa6` | legacy: tip / success callouts |
| `--nv-faint` | `#0f1810` | legacy: faint accent wash on panels |
