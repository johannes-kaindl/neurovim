<p align="center">
  <img src="docs/brand/og.png" alt="NeuroVim — a Vim-learning game wrapped in a cyberpunk spy-thriller" width="680">
</p>

<h1 align="center">neurovim-standalone</h1>

<p align="center">
  <b>▶ <a href="https://jkaindl.codeberg.page/neurovim/">Play in the browser</a></b>
  <sub>(<a href="https://johannes-kaindl.github.io/NeuroVIM/">GitHub Pages mirror</a>)</sub>
  &nbsp;·&nbsp;
  <a href="https://github.com/johannes-kaindl/NeuroVIM/releases">Desktop downloads</a> (macOS / Windows / Linux)
</p>

Monorepo for **NeuroVim** — a Vim-learning game with a spy-thriller narrative.
One codebase, three delivery targets: an Obsidian plugin + a standalone web app
+ a native desktop app via Tauri.

> **Status: Phase 3 (working).** Core fully ported, both adapters functional, web
> app feature-complete (Welcome → NEXUS → Briefing → Editor → Result + Sandbox)
> including the polish pass from `docs/DESIGN-SPEC.md`. 150 tests green,
> 4-workspace typecheck green. Build: `npm run build`.

## Screenshots

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/01-welcome.png" width="380" alt="Welcome"><br><sub>Welcome — CIPHER intro</sub></td>
    <td align="center"><img src="docs/screenshots/02-nexus-picker.png" width="380" alt="NEXUS"><br><sub>NEXUS — mission picker + status</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/03-briefing.png" width="380" alt="Briefing"><br><sub>Briefing — story before each mission</sub></td>
    <td align="center"><img src="docs/screenshots/04-editor.png" width="380" alt="Editor"><br><sub>Editor — CodeMirror 6 + Vim</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/05-result-modal.png" width="380" alt="Result"><br><sub>Result — mission complete</sub></td>
    <td align="center"><img src="docs/screenshots/06-sandbox.png" width="380" alt="Sandbox"><br><sub>THE RAVEN — free-play sandbox</sub></td>
  </tr>
</table>

## Architecture

Platform-neutral core + thin adapters over four port interfaces (`VimModeSource`,
`StoragePort`, `ContentPort`, `UiHost`). The core never depends on `obsidian` or
the browser DOM — platform specifics come in through the ports. Full rationale
lives in ADR-001 (in the separate design-prep workspace, not in this repo);
`AGENTS.md` has the working summary.

## Packages

| Package | Role |
|---|---|
| [`@neurovim/core`](packages/core) | Game logic, Web Audio, Preact UI, port interfaces, NEXUS dashboard |
| [`@neurovim/content`](packages/content) | Missions, katas, loot, story bible as versioned data |
| [`@neurovim/adapter-obsidian`](packages/adapter-obsidian) | Obsidian-plugin implementation of the port interfaces |
| [`@neurovim/adapter-web`](packages/adapter-web) | Web app (Vite SPA) + Tauri desktop wrapper |

## Origin

Derived from the Obsidian plugin `neurovim-trainer` v1.0.0. The original plugin is
left untouched; this monorepo is the contract. See `docs/PLUGIN-SWAP.md` for
swapping the refactored build into the original vault.

## Tooling

- **npm workspaces** (no pnpm — not installed; see decision log D1)
- **TypeScript** project references (`tsconfig.base.json`)
- Build: esbuild (library packages) / Vite (adapter-web); Tauri v2 for desktop
- Bundled monospace: self-hosted JetBrains Mono (`packages/adapter-web/src/fonts/`)

## Quickstart (dev)

```bash
npm install
npm run dev          # → http://localhost:5173/
```

`npm run dev` from the repo **root** is an alias for the `adapter-web` workspace —
no `--workspace` flag needed.

### Root convenience scripts

All callable from the repo root (`npm run <script>`):

| Script | Effect |
|---|---|
| `dev` | Vite dev server for the web app (`adapter-web`), http://localhost:5173/ |
| `build` | Full build in order: `content` → `plugin` → `web` |
| `build:content` | Only `@neurovim/content` (gray-matter → `src/generated/*.ts`) |
| `build:plugin` | Only `@neurovim/adapter-obsidian` (esbuild → `dist/main.js`) |
| `build:web` | Only `@neurovim/adapter-web` (Vite → `dist/`) |
| `build:dmg` | Native desktop app + macOS DMG (Tauri) — see `docs/DESKTOP.md` |
| `desktop:dev` | Tauri desktop app with HMR |
| `typecheck` | `tsc --noEmit` across all four workspaces |
| `test` | `jest` across all workspaces with tests (`--if-present`) |

> The build order matters: `content` generates the manifest that `plugin` and
> `web` import, so `content` runs first.

## Web-app flow (`@neurovim/adapter-web`)

```mermaid
flowchart LR
  welcome["Welcome<br/>(landing)"] -->|Enter NEXUS| nexus["NEXUS<br/>(picker + dashboard)"]
  nexus -->|pick mission| briefing["Briefing"]
  nexus -->|RAVEN| sandbox["Sandbox"]
  briefing -->|Begin Mission| editor["Mission editor<br/>(CM6 + vim)"]
  briefing -->|Back| nexus
  editor -->|"Submit → Complete → Next"| briefing
  editor -->|Back| nexus
  sandbox -->|Back| nexus
```

Launch shows **Welcome**; every mission goes through the **Briefing** page before
the editor. Welcome/Briefing/Editor/Sandbox are lazy-loaded chunks (code
splitting); the Markdown renderer (`marked`) sits in the shared Briefing/Welcome
chunk.

## Desktop app (Tauri)

Native app wrapping the web build via Tauri v2 — uses the OS WebView, so the macOS
DMG is ~3 MB. Build locally with `npm run build:dmg`; multi-OS installers
(macOS/Windows/Linux) are built in CI on a `v*` tag. Details, including the
unsigned-Gatekeeper note, in `docs/DESKTOP.md`.

## Remotes & distribution (ADR-001 D5)

- **Primary:** `codeberg.org/jkaindl/NeuroVIM` (git remote `codeberg`)
- **Mirror:** `github.com/johannes-kaindl/NeuroVIM` (git remote `github`) — runs the desktop CI
- **Distribution:** Codeberg releases as the primary source · GitHub mirror for visibility · possibly itch.io for game-audience reach

### Deploy the web app

`packages/adapter-web/dist/` is a **static site** (relative `base: './'`, so it
deploys under any sub-path).

- **GitHub Pages** → https://johannes-kaindl.github.io/NeuroVIM/ — **auto-deploys** on
  push to `main` via `.github/workflows/pages.yml` (requires repo Settings → Pages →
  Source = "GitHub Actions").
- **Codeberg Pages** → https://jkaindl.codeberg.page/neurovim/ — **auto-deploys** on push
  to main via `.forgejo/workflows/pages.yml` (runs on the Codeberg shared runner
  `codeberg-small`, force-pushes the `pages` branch). Codeberg lowercases the repo in the
  URL: `/neurovim/`, not `/NeuroVIM/`. The manual deploy below is a fallback.

Manual Codeberg deploy (refreshes the `pages` branch):

```bash
npm run build:content && npm run build:web
git worktree add --orphan -b pages /tmp/nv-pages
cp -R packages/adapter-web/dist/. /tmp/nv-pages/ && touch /tmp/nv-pages/.nojekyll
git -C /tmp/nv-pages add -A && git -C /tmp/nv-pages commit -m "deploy web app"
git -C /tmp/nv-pages push -f codeberg pages
git worktree remove /tmp/nv-pages --force
```

**itch.io** (game audience, TODO): zip `dist/` (`cd dist && zip -r ../neurovim-web.zip .`)
and upload as an HTML5 game with "This file will be played in the browser" enabled.

> Canonical host is **Codeberg Pages** — `og:url`/`og:image` and `<link rel="canonical">`
> in `packages/adapter-web/index.html` point there. GitHub Pages serves the same build as
> a backup mirror.
