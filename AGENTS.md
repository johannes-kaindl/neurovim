# AGENTS.md — neurovim-standalone

> **Workspace-Standards (maintainer-lokal):** Die verbindliche Leitkonvention steht in `_docs/CONVENTIONS.md`
> im Multi-Projekt-Workspace des Maintainers, `../_docs` relativ zu diesem Repo — nicht Teil dieses Repos,
> ignorieren falls im Klon nicht vorhanden. Modell comply-or-explain. Offene Punkte fuer
> dieses Repo siehe Abschnitt "Offene Konventions-Punkte".

> **Role:** context for AI agents (Claude Code, Cursor, …) working in this repo.
> Humans start in [`README.md`](README.md); contributor docs (Diátaxis — tutorial,
> how-to, reference, explanation) live in [`docs/dev/`](docs/dev/README.md). This file
> holds the **rules**; the *why* behind them is linked, not repeated.
>
> **Language:** everything is **English** — docs, code comments, identifiers,
> UI strings, commit messages (Conventional Commits, e.g. `feat(adapter-web): …`).
> Vim/technical terms keep their standard form.

## TL;DR

**NeuroVim** is a Vim-learning game in cyberpunk spy-thriller clothing: a
handler, **CIPHER**, hands out "missions" that are really Vim exercises (restore
corrupted CORP documents, fix glitched transmissions, beat the clock). Learning
Vim is the disguised core loop; the story is the motivation layer.

**One codebase, three delivery targets:** a platform-neutral core + thin adapters
over five port interfaces. Target 1 = Obsidian plugin (origin), target 2 =
standalone web app, target 3 = native desktop app (Tauri wrapper around the web app).

## Architecture — adapter pattern (ADR-001)

A platform-neutral **core** + **adapters**, decoupled through **five port
interfaces**. The core **never** depends on `obsidian` or the browser DOM —
platform specifics come exclusively through the ports the adapters implement.

One adapter lives here (`adapter-web`, which also drives the Tauri desktop build).
The Obsidian target is a **separate repo** — `obsidian-plugins/neurovim-obsidian`, in the community store — which consumes this core by vendoring it. See § Upstream contract.

```
@neurovim/content ──┐
                    ├──> @neurovim/core <──implements── @neurovim/adapter-web
(Markdown SSOT      │    (game logic,                   (Vite SPA, browser + Tauri)
 → typed JSON)      │     Web Audio,
                    │     Preact UI,        <──vendors───── neurovim-obsidian (separate repo)
                    │     ports)                            (Obsidian plugin, main.js)
                    └──> (web bundles content directly)
```

## Build & test — commands (all from the repo root)

```bash
npm install                  # install workspaces
npm run typecheck            # all 4 workspaces (tsc --noEmit) — must stay green
npm test                     # contract gate + script tests + jest across all workspaces

npm run dev                  # adapter-web Vite dev server → http://localhost:5173/ (HMR)
npm run build:content        # content/build.mjs — ALWAYS first (produces src/generated/*), then
                             #   scripts/gen-export.mjs → packages/content/export/neurovim-data.json
npm run build:conformance    # scripts/gen-conformance.mjs → packages/core/conformance/*.json
npm run build:web            # vite build → packages/adapter-web/dist/
npm run build                # content → web (in this order)
npm run build:manual         # scripts/gen-manual.mjs → docs/manual/reference/{vim-keymap,progression}.md
npm run generate:kata        # generate a KATA draft into packages/content/src/_drafts/
                             #   needs a local OpenAI-compatible server (LM Studio / Ollama / MLX).
                             #   Server setup, the /v1 pitfall and mobile access: the central guide at
                             #   jkaindl.de/uplink/llm-setup (CORE-META-13) — repo-specific is only
                             #   --endpoint / --model, and that an instruct model is required: a base
                             #   model without a chat template echoes the prompt back.
npm run capture:screenshots  # scripts/capture-screenshots.mjs → docs/screenshots/* (playwright-core + system Chrome)

npm run desktop:dev          # Tauri desktop app with HMR (needs Rust + Xcode CLT)
npm run build:dmg            # native app + macOS DMG (Tauri v2)
```


**Quality gate before every commit:** `npm run typecheck && npm test` must be
green. For content changes also run `npm run build:content`, otherwise
`src/generated/*` is stale.

## Conventions

- **Tooling stability:** npm workspaces (no pnpm — not installed, D1), TS project
  references, esbuild (lib/plugin) / Vite (web), Preact 10, Tauri v2 (desktop).
  **No tooling migration** (Webpack, Tailwind, CSS-in-JS, UI kit) without discussion.
- **React → Preact alias:** everywhere `react`/`react-dom` → `preact/compat` (in
  esbuild.config, vite preset, jest moduleNameMapper, tsconfig `jsxImportSource`).
  Carry the alias along when adding new build/test configs.
- **Core stays pure:** no `import 'obsidian'`, no direct DOM access in the core.
  New platform needs go through a port, not hard-wired into the core.
  `packages/core/src/index.ts` is the only barrel.
- **Content = SSOT in Markdown:** missions/lore are written as `.md` with
  frontmatter; `build.mjs` generates `src/generated/*`. **Never hand-edit generated
  files** — change the source and rebuild.

A new gotcha goes into the matching rule file under `.claude/rules/` (or a new one with `paths:`), never into this core; the core stays under 12,000 units (`kontext_lint` in the `_docs` repo measures it).

## Upstream contract

This repo is the upstream for every NeuroVim target. The **vendor surface** is
`packages/core/src` + `packages/content/src`; `adapter-web` is a consumer of that
surface like any other, not a privileged insider. Game logic that passes the test
below does not belong in `adapter-web` just because the web app is the faster route.

## Gotchas

- **Subagents must never `git checkout`/`git switch`:** agents share one working
  tree — a branch switch inside a subagent moves the controller's HEAD mid-task.
  Branch changes are done only by the top-level session.

## Memory

- **SDD-Artefakte (seit 2026-07-16): Cockpit, nicht Repo** — Specs/Plans/Task-Reports leben im
  Coding-Cockpit des Maintainers (`$VAULT/25_Coding/neurovim/_SDD/`, CORE-META-14, maintainer-lokal).
  Sie tragen Arbeitskontext (Vault-Pfade, Schwester-Repo-Interna), der in einem public Repo niemandem nützt.
  Das Repo behält die Design-Essenz in dieser Datei + `CHANGELOG.md`.
- **Alt-Bestand:** `docs/superpowers/{specs,plans}/` ist eingefroren — nichts Neues dort ablegen.
- **Nie im Repo:** absolute Pfade außerhalb des Repos (`/Users/…`, Vault-Pfade) — Platzhalter nutzen
  (`$VAULT/…`, `~/…`, repo-relativ). Herkunftsnachweise als Repo-Name + `Datei:Zeile` sind dagegen erwünscht.
  Gate: `scripts/check-no-abs-paths.mjs` (Teil von `npm test`).
- **Project memory (global):** `~/.claude/projects/-Users-Shared-code-neurovim-standalone/memory/`
  with `MEMORY.md` as index (CORE-AGENT-02) — durable facts, feedback, project state.
- **Vault-local working memory:** `claude/memory/MEMORY.md` + session logs in
  `claude/logs/` (git-ignored, see Note below).
- **Session handoff:** `.remember/` (`remember.md` = handoff, `now.md`,
  `today-YYYY-MM-DD.md`, `recent.md`, `archive.md`, `logs/`, `tmp/`) per
  CORE-AGENT-03 — git-ignored.

## Remotes & distribution (ADR-001 D5)

- **Primary:** `git.jkaindl.de/jkaindl/neurovim` (live; git remote `origin`, `main` tracked)
- **Mirror:** `github.com/johannes-kaindl/neurovim` (live; git remote `github`) — runs the desktop CI
- **Tokens are not stored** in `.git/config`; pushes use inline credentials.

> **Note:** `claude/` (working memory + session logs) and `.claude/` (local agent
> state) are git-ignored and intentionally not part of the public repo.

## Abweichungen von der Leitkonvention

- CORE-GIT-01 — keine Abweichung mehr: das primäre Remote heißt `origin` und zeigt
  auf `git.jkaindl.de` (Stand 2026-07-30, Codeberg-Ausstieg). Der frühere Remote-Name
  `codeberg` ist Geschichte.
- CORE-GIT-03 — Tags behalten den `v`-Prefix (`v0.1.0`…): `.github/workflows/desktop.yml`
  triggert auf `v*`, und die bestehende Tag-Reihe ist mit Prefix publiziert. Wechsel nur
  zusammen mit CI-Trigger-Migration.
- CORE-AGENT-04 — Keine Specs/Pläne unter `docs/superpowers/{specs,plans}/` mehr: das
  neuere CORE-META-14 verlagert SDD-Artefakte ins Coding-Cockpit des Maintainers, und dem
  folgt dieses Repo. Der Altbestand im Repo ist eingefroren. Die beiden Regeln
  widersprechen einander in der Leitkonvention selbst — hier gewinnt die jüngere.
- PROF-OBS-01/02 — Kein `manifest.json` und kein `npm run deploy` in diesem Repo:
  das Obsidian-Plugin ist ein eigenes Repo (`obsidian-plugins/neurovim-obsidian`), das diesen
  Kern vendoriert und dort seinen eigenen Release-Weg in den Community-Store hat.
  Dieses Repo baut kein Plugin-Bundle und schreibt nie ins Vault.
- PROF-NAT-01 — Kein `build-native-app.sh`/`package-native-app.sh`: Tauri v2 ersetzt
  die Skript-Kette. Build + Signing lokal via `npm run build:dmg`, Notarization +
  Multi-OS-Installer via `.github/workflows/desktop.yml`; Doku in `docs/dev/how-to/build-desktop-app.md`
  und `docs/dev/reference/desktop-ci.md`.
- PROF-NAT-02 — Der version-bump synct `tauri.conf.json` statt `Info.plist`
  (CFBundleShortVersionString): Tauri generiert die Info.plist beim Build aus
  `tauri.conf.json` — sie existiert nicht als committete Datei.
- PROF-NAT-03 — Gatekeeper-/Signing-Doku liegt in `docs/dev/how-to/build-desktop-app.md`
  (statt `docs/MACOS-APP.md`) — deckt Signing, Notarization und „Trotzdem öffnen" ab; die
  CI-Secrets stehen in `docs/dev/reference/desktop-ci.md` (Diátaxis-Aufteilung, 2026-09-13).

## Offene Konventions-Punkte

Der Bestand steht in `docs/internal/konventionspunkte.md` (CORE-AGENT-15: verschoben, nicht gelöscht).

## Context index

- Before you change the architecture, the ports or the file layout (or need the glossary): `docs/internal/architecture.md`, `docs/dev/reference/ports.md`, `docs/dev/explanation/architecture.md`.
- Before you plan new work or touch the roadmap, the Uplink wiring or a deferred decision: `docs/internal/roadmap.md`, `docs/dev/explanation/decisions.md`.
- Before you commit, close a change or sync docs (the checklist): `docs/internal/working-rules.md`.
- Before you work on an open convention point: `docs/internal/konventionspunkte.md`.
- Before you change the vendor surface, `consumers.json`, `CONSUMERS.md` or anything under `packages/adapter-web/src/vendor/`: `.claude/rules/upstream-contract.md`, `docs/dev/how-to/vendor-the-core.md`, `docs/dev/explanation/upstream-contract.md`.
- Before you edit missions, KATAs, lore, solutions, the cheatsheet or a generated file: `.claude/rules/content-authoring.md`, `docs/dev/how-to/write-a-mission.md`, `docs/dev/reference/content-format.md`.
- Before you change diff, progression, par, levels, `types.ts`, the conformance vectors or the export: `.claude/rules/scoring-and-conformance.md`, `docs/dev/how-to/measure-par.md`.
- Before you change `adapter-web` styles, the bundle, the Uplink or the screenshot capture: `.claude/rules/web-app.md`, `docs/dev/reference/design-tokens.md`, `docs/dev/explanation/cipher-uplink.md`.
- Before you add a build or test config, a dependency or a script: `.claude/rules/build-tooling.md`.
- Before you build the desktop app, bump a version, tag or mirror: `.claude/rules/desktop-and-release.md`, `docs/dev/how-to/release.md`, `docs/dev/how-to/build-desktop-app.md`.
