# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/), and the project aims to follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **`LlmPort` — the fifth port**, plus `CipherUplink` as its caller in the core. The
  game-facing half of the CIPHER uplink now lives upstream: chat and debrief prompt
  building, the chat session, and the turn choreography that used to sit untested in
  the Obsidian consumer's `main.ts`. The port is streaming and transport-neutral —
  failures are `aborted`, `timeout`, `unavailable` or `failed`, deliberately not HTTP
  status codes, so a consumer over a socket or a local process fits it too. Endpoint
  resolution, retry, model choice, SSE and reasoning suppression stay in the consumer,
  behind `complete()`.

## [0.2.5] — 2026-08-13

Four missions that could not be solved without knowing the answer, and a pass over how loud the interface is.

### Fixed
- **Four unsolvable missions** — M-02, M-06 and KATA-03 asked for values (coordinates,
  codewords) that appeared nowhere in the transmission or briefing, and M-03 required three
  word replacements it never named. All four were only winnable by guessing. The missing
  anchors were authored into the briefings, and two invariant tests now guard the class:
  one comparing solution lines against the source, one checking every solution token.
- **Frontmatter values reaching the UI as `[object Object]`** — a YAML map or list in a field
  expecting a scalar (title, summary, tier) was stringified blindly. Scalars are now coerced
  only from the primitives YAML can legitimately produce.

### Changed
- **Feel pass over the guidance layer** — the CIPHER comms rail steps back beside the editor
  (dimmed edge, quieter key chips) so the text you are editing stays the loudest thing on
  screen, while the unlock reveal on NEXUS gains glow: it fires once per level-up and is the
  story mode's payoff. The Vim primer now waits for the Welcome screen to land instead of
  mounting on top of it, and the reveal-corruption highlight reads more clearly.
- **Moved off Codeberg** — the project now lives on [git.jkaindl.de](https://git.jkaindl.de/jkaindl/NeuroVIM)
  with GitHub as the mirror, and the web app is served from
  **https://pages.jkaindl.de/neurovim-standalone/**. The old Codeberg Pages URL is retired.

## [0.2.4] — 2026-06-15

Diegetic guidance: CIPHER now coaches you in character, adaptively, across the whole journey.

### Added
- **Diegetic guidance (Guidance-Backbone)** — CIPHER coaches you in character throughout: a
  **Comms-Rail** beside the editor (Objective · Why · Keys · reveal-corruption), guidance
  threaded through the Briefing, NEXUS, and Result screens, and a first-run **Vim primer**.
  Guidance is **adaptive** — verbose for new operators, receding as you rank up — with a pin
  to keep it open or quiet. A single unified **Reference overlay** replaces the former
  Cheatsheet overlay.
- **Player manual** — a [Diátaxis](https://diataxis.fr/)-structured guide under `docs/manual/`
  (tutorial · how-to · reference · explanation), linked from the README. Its Vim keymap and
  rank/unlock reference are generated from the game data, so they can't drift.
- **Eight new lore artifacts** — FRAGMENT-11–14, LOOT-07–09 (level 7/8/10 unlocks), and a
  `THE RAVEN` reference doc, closing open story threads.

### Changed
- **Canon pass** across all content — one unified timeline, a single 10-level rank table, and
  consistent clearance levels.
- NEXUS skill tags now use the muted secondary-text color instead of the full accent, so they
  read as quiet annotations beside the mission titles rather than competing with them.

### Fixed
- **26 presolved / unsolvable missions** — 23 missions (Arc II and several KATAs) shipped with
  the corrupted transmission already identical to the solution, so they could be "won" without
  editing; their corrupted start states were re-authored and Vim-verified. Three genuinely
  unsolvable missions were also fixed, and a content-gate test now guards against regressions.

## [0.2.3] — 2026-06-04

First **signed + notarized** desktop release (the macOS signing wired in 0.2.2 is now
active with credentials in place — the `.dmg` opens without a Gatekeeper warning).

### Added
- **Story-Mode** — the web app now unlocks missions, KATAs, and LOOT **progressively** as
  you level up, instead of everything being open. The NEXUS gates from your unlock state
  (locked rows show the level they need), level-ups reveal new content with a "mission
  unlocked" animation + an unlocked-list in the result modal, and LOOT artifacts unlock as
  rewards. Existing saves migrate cleanly.
- **Three new KATAs** closing curriculum gaps: find-char motions `f/F/t/T/;/,` (Target
  Lock), the dot command `.` (Echo), and the global command `:g` (Dragnet).
- Mission **par-tier badges** surface on the NEXUS list (best gold/silver/bronze per
  mission), not just in the result modal.

### Changed
- **Arc 2 rebalanced** — the 24 encrypted missions now ramp smoothly in difficulty (1→5)
  instead of plateauing, and three of them were re-themed away from regex into a
  **visual-block** drill (Column Strike), a **macro** drill (Echo Chamber), and a
  **named-register** drill (Dead Drop) to break the all-regex monoculture.

## [0.2.2] — 2026-06-03

### Added
- **Par-tiers** — successful runs are scored by keystrokes against a per-mission par and
  earn a **gold / silver / bronze** tier. Surfaced as a badge with an "almost there"
  nudge in the result modal and a best-tier chip in the NEXUS list. Par is a deliberately
  generous, difficulty-scaled default, overridable per mission via a `par_keystrokes`
  frontmatter field; mission `difficulty` is now surfaced to the app. Pure core logic
  (`ParTier`), web-only UI.

### Changed
- **macOS desktop builds are now Developer ID-signed + notarized** — the `.dmg` opens
  without a Gatekeeper warning. Wired into the desktop CI via the `APPLE_*` repository
  secrets (`docs/DESKTOP.md`). Windows installers remain unsigned.

## [0.2.1] — 2026-06-03

### Added
- adapter-web test suite — WebStorage IndexedDB round-trip + a progression-persistence
  contract test (the submit-flow's `addXp → recordCompletion → recordMissionRun` chain
  through a real round-trip), the web target's first automated coverage.
- CI gate that fails when `packages/content/src/generated` is stale (drifted from its
  Markdown source), replacing the manual "always rebuild content" discipline.
- Documented macOS Developer ID signing + notarization for the desktop build
  (`docs/DESKTOP.md`).

### Changed
- **Relicensed from MIT to GNU AGPL-3.0**, then established a **dual-licensing model**
  (open-source AGPL + a separate commercial license) with a Contributor License
  Agreement — see `LICENSING.md`.
- README rewritten reader-first (internal/maintainer detail moved to `AGENTS.md`).
- The Obsidian adapter now persists mission bests via the shared core
  `ProgressionEngine.recordMissionRun` instead of a hand-rolled copy. Both targets now
  store identical bests — notably `best_ks_per_min` is the max throughput across all
  runs, not the value tied to the fastest time (the two adapters could previously
  record a different "best" for the same run).
- Workspace package versions reconciled to a single source of truth (were `0.0.0`).

### Fixed
- The mission Result modal is now keyboard- and screen-reader-dismissable — Escape to
  close, a Tab focus-trap, focus restored on close, and initial focus on the primary
  action (it previously required a mouse click, against the design spec's a11y contract).
- Favicon and Apple touch-icon paths now resolve under the Pages sub-paths
  (`/neurovim/`, `/NeuroVIM/`); they were absolute and 404'd on both hosted deploys.

## [0.2.0] — 2026-05-30

Cinematic-CRT visual overhaul.

### Added
- Two new surfaces: a **Lore Archive** (index → reader) and a **Cheatsheet** overlay.
- First-run audio hint; audio + reduce-effects toggles with visual audio-cue pendants.

### Changed
- Full cinematic-CRT redesign across every surface (Welcome → NEXUS → Briefing →
  Editor → Result → Sandbox): VT323 display + JetBrains Mono body, disciplined glow,
  story-coupled colors (green = resistance, amber = CORP/locked, red = fail).
- Accessibility pass: WCAG-AA contrast, ≥44px mobile tap targets, reduced-motion.
- Header / terminal boxes drawn as CSS frames instead of box-drawing glyphs.

## [0.1.0] — 2026-05-29

First public release of the standalone monorepo.

### Added
- Platform-neutral `@neurovim/core` (game logic, Web Audio, Preact UI, four ports).
- `@neurovim/content` — Markdown SSOT → generated typed manifest.
- `@neurovim/adapter-obsidian` — Obsidian-plugin target (esbuild → `main.js`).
- `@neurovim/adapter-web` — standalone web app (Vite SPA), feature-complete flow
  Welcome → NEXUS → Briefing → Editor → Result + Sandbox.
- Visual/UX polish pass: phosphor CodeMirror 6 theme + Vim-mode indicator,
  type-aware briefing callouts, CRT scanline, self-hosted JetBrains Mono.
- Native desktop app via Tauri v2 (macOS DMG ~3 MB) + multi-OS build CI.
- Brand kit: Chrome Raven app icon, favicons, OpenGraph card.

[Unreleased]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.2.4...HEAD
[0.2.4]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.2.3...v0.2.4
[0.2.3]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.2.2...v0.2.3
[0.2.2]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.2.1...v0.2.2
[0.2.1]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.2.0...v0.2.1
[0.2.0]: https://git.jkaindl.de/jkaindl/NeuroVIM/compare/v0.1.0...v0.2.0
[0.1.0]: https://git.jkaindl.de/jkaindl/NeuroVIM/releases/tag/v0.1.0
