---
name: neurovim-standalone — Projektstand
description: Vim-Lernspiel-Monorepo — Vision, aktueller Stand, nächster Schritt
type: project
---

**neurovim-standalone** ist ein Monorepo unter `/Users/Shared/code/neurovim-standalone`
(Branch `main`). NeuroVim = Vim-Lernspiel im Cyberpunk-Spy-Thriller-Gewand. Eine
Codebase, zwei Targets: Obsidian-Plugin (Herkunft) + Standalone-Web-App (neu).

**Stand 2026-05-29 (Phase 3 quasi abgeschlossen):**
- `@neurovim/core` voll portiert aus Bestand-Plugin `neurovim-trainer` v1.0.0 — Engines (reine Logik), Web-Audio, Preact-UI, 4 Ports.
- `@neurovim/content` — Markdown-SSOT → typed-JSON-Build (`build.mjs`, gray-matter). 27 Missionen, KATAS, LOOT, FRAGMENTS.
- `@neurovim/adapter-obsidian` — esbuild → `dist/main.js`, funktional.
- `@neurovim/adapter-web` — Vite-SPA, **feature-complete**: Welcome → NEXUS → Briefing → Editor (CM6 + vim) → Result + Sandbox.
- **Gates grün:** 150 Tests (core 136 / content 8 / adapter-obsidian 6), 4-Workspace-Typecheck.

**Polish-Pass `adapter-web` — INTEGRIERT (2026-05-29):** Das Port-Package aus
`docs/design-source/port/` wurde voll übernommen: `styles.css` ersetzt (neue `--nv-*`
Tokens, Welcome-Hero, NEXUS-Tier-Header, Modal-Glow, Sandbox-HARD-Eskalation,
reduced-motion, mobile), neues `cm6-theme.ts` (Phosphor-CM6 + `vimModeIndicator`),
`MissionEditor.tsx` mit Mode-Chip + Run-HUD, `markdown.ts`-Callout-Patch (D25,
type-aware via `:has()`). Markup-Änderungen: App.tsx Missions-State-Klassen
(`nv-active`/`nv-done-row`/`nv-locked`) **inkl. Lock-Gating** (Web respektiert jetzt
`data.unlocked`/`UNLOCK_MAP` — vorher toter Code), XP-Gain-Flash, SandboxView-Run-HUD
(Live-Timer + Glitches-left) + geteiltes `neurovimTheme`. Verifiziert: typecheck +
150 Tests + `build:web` (65 Module, Code-Splitting intakt) grün. README-Status
korrigiert (war fälschlich „Skelett Phase 2").

**Web-Demo-Entscheidungen (2026-05-29, nach User-Feedback):**
- **Alle Missionen unlocked auf Web** — kein Progression-Gating im offenen Demo-Build
  (Locks bleiben Obsidian-only). WebStorage persistiert zwar via IndexedDB, ist aber egal.
- **CRT-Scanline an** (`--nv-scan: 0.14`).
- **ASCII-Boxen:** doppelter `pre`-Rahmen entfernt + **JetBrains Mono selbst-gehostet**
  (OFL, latin-subset Regular+Bold ~42 KB, `--nv-mono`-Token) — System-Mono verzerrte
  Box-Zeichen/em-dash. Token `--nv-mono` ist jetzt der Mono-Stack überall (CSS + CM6).

**Remote:** live auf `codeberg.org/jkaindl/NeuroVIM` (git remote `codeberg`, `main`).
⚠ Der initiale Codeberg-Token wurde im Chat geteilt → sollte rotiert werden.

**Noch offen aus der DESIGN-SPEC (nicht im Port-Package):** Audio-Toggle + visuelle
Audio-Pendants (§6), OG-Image/Favicon-Mark (§8), echte Mobile-Entscheidung (§7), die
6 offenen Designer-Fragen (§9, z.B. Welcome-Boot-Typing-Intro, Result-Celebration-Tone).

**Offen / TODO (ADR-001 D5):** Codeberg-primary + GitHub-mirror Remotes anlegen
(`scripts/setup-remotes.sh`), Forgejo-CI-Stub, Plugin-Swap-Verifikation durch Jay
(`docs/PLUGIN-SWAP.md`).

**Why:** Phase 3 hat den Bestand erfolgreich in die Adapter-Architektur überführt;
die Web-App ist der neue Distributions-Hebel (itch.io / Codeberg-Pages). Polish ist
jetzt der Wert-Multiplikator, kein neues Feature-Bauen.
**How to apply:** Polish-Session über `npm run dev` + `docs/DESIGN-SPEC.md`; kleine
reviewbare CSS-Patches pro View, Tests/Typecheck grün halten, Logik nicht anfassen.
