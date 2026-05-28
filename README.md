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

## Quickstart (Dev)

```bash
cd /Users/Shared/code/neurovim-standalone
npm install
npm run dev          # → http://localhost:5173/
```

`npm run dev` im Repo-**Root** ist ein Alias auf den `adapter-web`-Workspace (`npm run dev --workspace @neurovim/adapter-web`) — kein `--workspace`-Flag nötig.

### Root-Convenience-Scripts

Alle vom Repo-Root aus aufrufbar (`npm run <script>`):

| Script | Wirkung |
|---|---|
| `dev` | Vite-Dev-Server für die Web-App (`adapter-web`), http://localhost:5173/ |
| `build` | Voller Build in Reihenfolge: `content` → `plugin` → `web` |
| `build:content` | Nur `@neurovim/content` (gray-matter → `src/generated/content.ts`) |
| `build:plugin` | Nur `@neurovim/adapter-obsidian` (esbuild → `dist/main.js`) |
| `build:web` | Nur `@neurovim/adapter-web` (Vite → `dist/`) |
| `typecheck` | `tsc --noEmit` über alle vier Workspaces (core → content → plugin → web) |
| `test` | `jest` über alle Workspaces mit Tests (`--if-present`) |

> Build-Reihenfolge ist nicht beliebig: `content` generiert `content.ts`, das `plugin` und `web` importieren — deshalb läuft `content` zuerst.

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

## Web-App lokal + Deploy (`@neurovim/adapter-web`)

```bash
cd /Users/Shared/code/neurovim-standalone
npm install
# Lokal entwickeln (öffnet localhost:5173):
npm run dev --workspace @neurovim/adapter-web
# Production-Build → packages/adapter-web/dist/ (statische Site, ~744KB / 228KB gzip):
npm run build --workspace @neurovim/adapter-web
```

`dist/` ist eine **statische Site** (relative `base: './'` → unter beliebigem Unterpfad deploybar).

**Codeberg Pages** (primär): den `dist/`-Inhalt in einen `pages`-Branch des Repos pushen.
```bash
cd /Users/Shared/code/neurovim-standalone/packages/adapter-web
npx vite build
# pages-Branch befüllen (orphan, nur dist-Inhalt):
git -C /Users/Shared/code/neurovim-standalone worktree add /tmp/nv-pages --orphan pages
cp -R dist/. /tmp/nv-pages/ && touch /tmp/nv-pages/.nojekyll
git -C /tmp/nv-pages add -A && git -C /tmp/nv-pages commit -m "deploy web app"
git -C /tmp/nv-pages push origin pages   # → https://<user>.codeberg.page/neurovim-standalone/
git -C /Users/Shared/code/neurovim-standalone worktree remove /tmp/nv-pages
```

**GitHub Pages** (Mirror): identisch, aber Push auf `github`-Remote `pages`-Branch + in den GitHub-Repo-Settings Pages-Source = `pages`-Branch setzen. Alternativ ein `.github/workflows/pages.yml` (Build + `actions/deploy-pages`) — TODO.

**itch.io** (Game-Audience, TODO): `dist/` als ZIP packen (`cd dist && zip -r ../neurovim-web.zip .`) → auf itch.io als HTML5-Game hochladen, „This file will be played in the browser" aktivieren. (Vorbereiten wenn Distribution-Channel bestätigt.)
