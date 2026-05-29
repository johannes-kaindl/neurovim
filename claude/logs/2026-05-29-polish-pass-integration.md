---
title: Polish-Pass Integration (adapter-web) + Design-Source einsortiert
date: 2026-05-29
status: abgeschlossen
---

## Was erledigt wurde

Das Design-Delivery aus `neurovim-design/` (jetzt `docs/design-source/`) wurde voll
in `@neurovim/adapter-web` integriert. Das `port/`-Subpackage war ein token-treues,
shippbares Drop-in — passte 1:1 auf den aktuellen Code.

**Übernommen aus `docs/design-source/port/`:**
- `styles.css` → `src/styles.css` ersetzt (Superset: neue `--nv-*` Tokens, Welcome-Hero
  mit Blink-Cursor + pulsende CTA, NEXUS-Tier-Header-Divider, Result-Modal Corner-Brackets
  + Glow + Level-Up-Beat, tokenisierte Status-Farben, Sandbox-HARD-Auto-Eskalation,
  Focus-Rings, themed Scrollbars, reduced-motion + Mobile ≤560px).
- `cm6-theme.ts` → `src/ui/cm6-theme.ts` (neu): Phosphor-CM6-Theme + `vimModeIndicator()`.
  **Fix:** `Extension` wird aus `@codemirror/state` importiert, nicht `@codemirror/view`
  (Port-Import war falsch → TS2459).
- `MissionEditor.tsx` → ersetzt: gleicher `onSubmit`-Contract, zusätzlich Vim-Mode-Chip
  (NORMAL/INSERT/VISUAL) + Run-HUD (Timer + Keystrokes).
- `markdown.ts` (Patch, D25): Callout-Typ als `<span class="nv-co nv-co-TYPE">`
  durchgereicht → styles.css färbt via `:has()` type-aware ein.

**`[needs markup]`-Änderungen:**
- `App.tsx`: Missions-State-Klassen `nv-active`/`nv-done-row`/`nv-locked` auf `<li>`;
  **Lock-Gating** — locked Buttons sind `disabled` und nicht klickbar. Web respektiert
  damit erstmals `data.unlocked` (seed M-01–M-04+KATA-01) + `UNLOCK_MAP` (vorher war das
  Unlock-System auf Web toter Code). XP-Gain-Flash (`.nv-gained` ~700ms) bei NEXUS-Rückkehr
  nach Clear.
- `SandboxView.tsx`: Run-HUD `.nv-sandbox-hud` (Live-Elapsed + Glitches-left); nutzt jetzt
  ebenfalls das geteilte `neurovimTheme` statt Inline-Theme.

**Ordner:** `neurovim-design/` → `docs/design-source/` (tracked), `.DS_Store` entfernt,
kurze `README.md` mit Integrations-Mapping ergänzt. README-Statuszeile (war „Skelett
Phase 2") auf Phase-3-Stand korrigiert.

## Verifikation (alles grün)

- `npm run typecheck` — 4 Workspaces
- `npm test` — 150 Tests (core 136 / content 8 / adapter-obsidian 6)
- `npm run build:content` + `npm run build:web` — 65 Module, Code-Splitting intakt
  (initial 311 KB, CM6 410 KB lazy, markdown 43 KB lazy, CSS 16.9 KB)

## Verhaltens-Änderung (bewusst, transparent)

Locked Missionen sind auf Web jetzt **nicht mehr spielbar** (vorher konnte man jede
anklicken). Das macht die Level-/XP-Progression wirksam und matcht den Obsidian-Adapter.
Falls unerwünscht: Gating in `App.tsx` (`disabled={locked}` + `if (!locked)`) entfernen.

## Nachtrag — User-Feedback umgesetzt + Codeberg-Push (selbe Session)

- **Web = alle Missionen unlocked** (Lock-Gating aus App.tsx-Picker entfernt; Locks bleiben Obsidian-only).
- **CRT-Scanline an** (`--nv-scan: 0.14`).
- **ASCII-Box-Fix:** doppelter `pre`-Rahmen entfernt (flacher dunkler Canvas) + **JetBrains Mono
  selbst-gehostet** (`src/fonts/`, OFL, ~42 KB, `--nv-mono`-Token) → Box-Zeichen + em-dash
  cell-aligned. CM6 nutzt denselben Stack.
- **Gepusht:** `codeberg.org/jkaindl/NeuroVIM`, `main`. Drei Commits (scaffolding, polish, font).
  Token NICHT in `.git/config` persistiert; ⚠ Token war im Chat → rotieren.

## Offen für nächste Session

- [ ] **Visuelles Review** über `npm run dev` (http://localhost:5173) — Scanline-Stärke
      (`--nv-scan`) + ASCII-Box-Alignment final eyeballen, Screenshots `docs/screenshots/` neu (Spec §10).
- [ ] **GitHub-Mirror** anlegen (ADR-001 D5) + Forgejo-CI-Stub `.gitea/workflows/`.
- [ ] **Rest der DESIGN-SPEC**: Audio-Toggle + visuelle Pendants (§6), OG-Image/Favicon-`>_` (§8),
      Mobile-Stance (§7), Designer-Fragen §9.
