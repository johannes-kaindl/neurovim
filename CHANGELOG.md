# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/), and the project aims to follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- **Relicensed from MIT to GNU AGPL-3.0** (network copyleft), matching the project family.
- README rewritten reader-first (internal/maintainer detail moved to `AGENTS.md`).

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

[Unreleased]: https://codeberg.org/jkaindl/NeuroVIM/compare/v0.1.0...HEAD
[0.1.0]: https://codeberg.org/jkaindl/NeuroVIM/releases/tag/v0.1.0
