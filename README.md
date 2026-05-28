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

## Remotes & Distribution (ADR-001 D5)

- **Primary remote:** `codeberg.org/jay/neurovim-standalone` *(TODO: Repo von Jay anlegen — Platzhalter-URL)*
- **Mirror:** `github.com/jay/neurovim-standalone` *(TODO: Repo + Mirror anlegen — Platzhalter-URL)*
- **Distribution:** Codeberg-Releases als primäre Source · GitHub-Mirror für Visibility · ggf. itch.io für Game-Audience-Reach
- **CI:** Codeberg/Forgejo-Actions-Stub unter `.gitea/workflows/` (Build + Typecheck)

> Passt zur 26-039-Migration auf Open-Source-Hosting (df.eu/Microsoft → mailbox.org/Codeberg).

## Setup (Jay copy-paste — Repos müssen vorher manuell angelegt werden)

```bash
# Repo ist bereits lokal git-initialisiert (scaffold-Commit liegt vor).
# 1. Auf codeberg.org + github.com je ein leeres Repo "neurovim-standalone" anlegen (Web-UI).
# 2. Remotes setzen (codeberg = origin, github = mirror):
git -C /Users/Shared/code/neurovim-standalone remote add origin   git@codeberg.org:jay/neurovim-standalone.git
git -C /Users/Shared/code/neurovim-standalone remote add github   git@github.com:jay/neurovim-standalone.git
# 3. Primary push:
git -C /Users/Shared/code/neurovim-standalone push -u origin main
# 4. Mirror push:
git -C /Users/Shared/code/neurovim-standalone push github main
# 5. (optional) Mirror automatisieren — entweder Codeberg "Repository Mirroring" (Settings → Mirror)
#    oder beide Remotes an origin koppeln: git remote set-url --add --push origin <github-url>
```

> ⚠️ URLs sind Platzhalter (`jay/...`) — vor dem Push durch die echten Account-/Org-Namen ersetzen. Branch heißt `main` (Default dieses Repos prüfen mit `git -C … branch`).
