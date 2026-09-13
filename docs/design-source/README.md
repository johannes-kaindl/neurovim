# Design Source — NeuroVim Web Polish Pass

Delivery snapshot of the visual/UX polish pass for `@neurovim/adapter-web`. Source
for the integration that was merged into `packages/adapter-web/src/` on 2026-05-29.

## Contents

| Path | What |
|---|---|
| `NeuroVim - Operative Console.html` | **Cinematic mockup** (web fonts, brighter CRT/HUD variant) — reference, not shippable |
| `Boot Sequence.html` / `Login.html` / `Background.html` | further mockup screens (boot/login/background studies) |
| `console/` | CSS/JS of the console mockup |
| `uploads/` | original DESIGN-SPEC + paste screens, `retro-maximum-demo-v3.html` |
| `port/` | **The restrained Kuro port** — token-faithful, shippable variant (source of the integration) |

## Integration status (in `packages/adapter-web/src/`)

| `port/` file | merged into | Type |
|---|---|---|
| `styles.css` | `src/styles.css` | replaced (superset, new `--nv-*` tokens) |
| `cm6-theme.ts` | `src/ui/cm6-theme.ts` | new (phosphor CM6 theme + `vimModeIndicator`); import fix: `Extension` from `@codemirror/state` |
| `MissionEditor.tsx` | `src/ui/MissionEditor.tsx` | replaced (mode chip + run HUD, same `onSubmit` contract) |
| `markdown-callouts.md` | patch in `src/ui/markdown.ts` | type-aware callouts (D25) |
| `[needs markup]` | `src/ui/App.tsx`, `src/ui/SandboxView.tsx` | mission state classes + lock gating, XP flash, sandbox run HUD; SandboxView now uses `neurovimTheme` |

Details + rationale: `port/README.md`. Design brief (historical): `../dev/explanation/design-brief-polish-pass.md`
(`uploads/DESIGN-SPEC.md` is an identical copy from the delivery).
