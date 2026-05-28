# neurovim-standalone

Monorepo für **NeuroVim** — ein Vim-Lernspiel mit Spy-Thriller-Narrativ. Eine Codebase, zwei Auslieferungs-Targets: Obsidian-Plugin + Standalone-Web-App.

> **Status: Skelett (Phase 2).** Noch kein portierter Code — die Packages sind Stubs mit dokumentiertem Intent. Das eigentliche Refactoring (Phase 3) folgt nach Architektur-Freigabe.

## Architektur

Plattform-neutraler Core + dünne Adapter über vier Port-Interfaces (`VimModeSource`, `StateStore`, `ContentSource`, `UiHost`). Vollständige Begründung im ADR:

→ `/Users/Shared/20_Claude/neurovim-standalone-prep/40_deliverables/ADR-001-Adapter-Architektur.md`

## Packages

| Package | Rolle |
|---|---|
| [`@neurovim/core`](packages/core) | Game-Logic, Web-Audio, Preact-UI, Port-Interfaces, NEXUS-Dashboard |
| [`@neurovim/content`](packages/content) | Missionen, Katas, Loot, Story-Bible als versionierte Daten |
| [`@neurovim/adapter-obsidian`](packages/adapter-obsidian) | Obsidian-Plugin-Implementierung der Port-Interfaces |
| [`@neurovim/adapter-web`](packages/adapter-web) | Web-App (Vite-SPA) — NEU für Standalone |

## Herkunft

Abgeleitet aus dem Obsidian-Plugin `neurovim-trainer` v1.0.0 (Source: `32_NeuroVim/_dev/plugin-src/`). Scan + Coupling-Analyse: siehe Prep-Habitat `20_Claude/neurovim-standalone-prep/`.

## Tooling

- **npm workspaces** (kein pnpm — nicht installiert; siehe Decision-Log D1)
- **TypeScript** project references (`tsconfig.base.json`)
- Build: esbuild (Lib-Packages) / Vite (adapter-web) — siehe Decision-Log D4
