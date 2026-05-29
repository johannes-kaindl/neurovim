# Design-Source — NeuroVim Web Polish-Pass

Delivery-Snapshot des visuellen/UX-Polish-Pass für `@neurovim/adapter-web`. Quelle
für die Integration, die am 2026-05-29 in `packages/adapter-web/src/` übernommen wurde.

## Inhalt

| Pfad | Was |
|---|---|
| `NeuroVim - Operative Console.html` | **Cinematic-Mockup** (Web-Fonts, hellere CRT/HUD-Variante) — Referenz, nicht shippbar |
| `Boot Sequence.html` / `Login.html` / `Background.html` | weitere Mockup-Screens (Boot/Login/Hintergrund-Studien) |
| `console/` | CSS/JS des Console-Mockups |
| `uploads/` | Original-DESIGN-SPEC + Paste-Screens, `retro-maximum-demo-v3.html` |
| `port/` | **Der restrained Kuro-Port** — token-treue, shippbare Variante (Quelle der Integration) |

## Integrationsstand (in `packages/adapter-web/src/`)

| `port/`-Datei | übernommen nach | Art |
|---|---|---|
| `styles.css` | `src/styles.css` | ersetzt (Superset, neue `--nv-*` Tokens) |
| `cm6-theme.ts` | `src/ui/cm6-theme.ts` | neu (Phosphor-CM6-Theme + `vimModeIndicator`); Import-Fix: `Extension` aus `@codemirror/state` |
| `MissionEditor.tsx` | `src/ui/MissionEditor.tsx` | ersetzt (Mode-Chip + Run-HUD, gleicher `onSubmit`-Contract) |
| `markdown-callouts.md` | Patch in `src/ui/markdown.ts` | type-aware Callouts (D25) |
| `[needs markup]` | `src/ui/App.tsx`, `src/ui/SandboxView.tsx` | Missions-State-Klassen + Lock-Gating, XP-Flash, Sandbox-Run-HUD; SandboxView nutzt jetzt `neurovimTheme` |

Details + Begründung: `port/README.md`. Design-Brief (SSOT): `../DESIGN-SPEC.md`
(`uploads/DESIGN-SPEC.md` ist eine identische Kopie aus dem Delivery).
