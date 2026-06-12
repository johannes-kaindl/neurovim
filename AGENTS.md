# AGENTS.md — neurovim-standalone

> **Workspace-Standards:** Die verbindliche Leitkonvention steht in `_docs/CONVENTIONS.md`
> (am Workspace-Root `/Users/Shared/code/`), Modell comply-or-explain. Offene Punkte fuer
> dieses Repo siehe Abschnitt "Offene Konventions-Punkte".

> **Role:** context for AI agents (Claude Code, Cursor, …) working in this repo.
> Humans start in [`README.md`](README.md), with the architecture rationale in
> ADR-001 and the design brief in [`docs/DESIGN-SPEC.md`](docs/DESIGN-SPEC.md).
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
over four port interfaces. Target 1 = Obsidian plugin (origin), target 2 =
standalone web app, target 3 = native desktop app (Tauri wrapper around the web app).

> **Status (2026-05-30):** v0.2.0 shipped — the cinematic-CRT **visual overhaul**
> is complete across every surface (Welcome → NEXUS → Briefing → Editor → Result →
> Sandbox) plus two new ones: a **Lore Archive** (index → reader) and a **Cheatsheet
> overlay**. Rounded out by an a11y pass (WCAG-AA contrast, ≥44px mobile tap targets,
> reduced-motion), a first-run audio hint, and CSS-drawn terminal boxes. 182 tests
> green, 4-workspace typecheck green. Live on Codeberg (primary) + GitHub (mirror).
>
> **Since v0.2.0 (2026-06-03 → 06-04), current release v0.2.3:** **v0.2.1** (hardening —
> Result-modal a11y, web↔Obsidian record parity, first adapter-web tests, CI content-gate),
> **v0.2.2** (**par-tiers** — keystroke gold/silver/bronze scoring), **Story-Mode** (the web
> now unlocks missions/KATAs/LOOT **progressively** as you level up — replaced the
> all-unlocked demo; NEXUS gates from `data.unlocked`, level-ups reveal content), **Arc-2
> rebalance** (monotonic 1→5 difficulty + 3 regex missions re-themed to visual-block/macro/
> register), and new **KATAs** (find-char, dot, `:g`). macOS desktop builds are now
> **Developer ID-signed + notarized** (`docs/DESKTOP.md`); v0.2.3 is the first signed release.
>
> **Since v0.2.3 (2026-06-06 → 06-12), unreleased on `main`:** **Guidance-Backbone P2**
> (diegetic CIPHER coaching, adaptive with level: Comms-Rail, unified Reference-Overlay
> replacing the Cheatsheet overlay, Briefing/NEXUS/Result guidance, Vim primer, pure
> `GuidanceEngine`; web-only). **Presolved-missions fix** — 23 missions (Arc-II + KATA-07–11)
> shipped with transmission == solution and were instantly winnable; corrupted start states
> authored + vim-verified, 3 more unsolvable missions fixed (R-02/R-03/R-22), content-gate
> test added. **Canon pass** (timeline, one 10-level rank table, clearance cleanup) and
> **8 new lore artifacts** (FRAGMENT-11–14, LOOT-07–09 incl. level-7/8/10 unlocks, REF
> `99-THE_RAVEN`). Conventions: ESLint flat config + `npm run lint`, tsconfig build/IDE
> split, `scripts/bump-version.sh`, `LICENSE-DOCS`. 204 tests green.

## Architecture — adapter pattern (ADR-001)

A platform-neutral **core** + two **adapters**, decoupled through **four port
interfaces**. The core **never** depends on `obsidian` or the browser DOM —
platform specifics come exclusively through the ports the adapters implement.

```
@neurovim/content ──┐
                    ├──> @neurovim/core <──implements── @neurovim/adapter-obsidian
(Markdown SSOT      │    (game logic,                   (Obsidian plugin, main.js)
 → typed JSON)      │     Web Audio,
                    │     Preact UI,        <──implements── @neurovim/adapter-web
                    │     ports)                           (Vite SPA, browser + Tauri)
                    └──> (web bundles content directly)
```

### The four ports (`packages/core/src/ports/`)

| Port | Responsibility | Obsidian impl | Web impl |
|---|---|---|---|
| `VimModeSource` | Vim mode + classified actions (push/pull) | `vim-mode-change` via `MarkdownView.editor.cm` + `CommandListener` | CodeMirror 6 + `@replit/codemirror-vim` (same event) |
| `StoragePort` | Persistence of `PluginData` (generic `<T>`) | `plugin.loadData/saveData` → `data.json` | IndexedDB |
| `ContentPort` | Load missions + lore artifacts | Vault file API + `data/chapters.ts` | bundled `@neurovim/content` |
| `UiHost` | Mount container for Preact trees | `ItemView` / `Modal` / MarkdownPostProcessor | DOM `<div>` overlays / routes |

**Important (D17/D19e):** the engines are **pure functions** and do **not**
consume the ports directly — the adapters wire ports ↔ engines. An `AudioPort`
once existed but was removed: `AudioEngine` is already platform-neutral +
injectable, so the wrapper was redundant.

→ Full rationale: ADR-001 and the decision log (D1–D26) live in the separate
design-prep workspace, not in this repo.

## File layout

```
.
├── package.json            # npm workspaces (no pnpm — D1) + root scripts
├── tsconfig.base.json      # TS project references, strict, jsx=preact
├── README.md               # human entry point
├── AGENTS.md               # this file
├── .github/workflows/      # desktop.yml — Tauri multi-OS build CI (GitHub only)
├── docs/
│   ├── DESIGN-SPEC.md      # polish-pass brief for adapter-web (tokens, views, motion)
│   ├── DESKTOP.md          # Tauri desktop build (local DMG, CI, Gatekeeper)
│   ├── PLUGIN-SWAP.md      # HOWTO: swap the refactored plugin build into the vault
│   ├── design-source/      # design delivery snapshot (mockups + port package + brand SVGs)
│   └── screenshots/        # headless captures of the web views (for DESIGN-SPEC)
├── scripts/
│   ├── setup-remotes.sh    # Codeberg-primary + GitHub-mirror remotes (ADR-001 D5)
│   └── swap-obsidian-plugin.sh  # main.js swap + backup (run manually against the vault)
├── experiments/
│   ├── vim-regex-findings.md    # regex-flavor parity Obsidian↔CM6 (D1)
│   └── vim-regex-harness/
└── packages/
    ├── core/               # @neurovim/core — platform-neutral core
    │   └── src/
    │       ├── ports/      # VimModeSource, StoragePort, ContentPort, UiHost
    │       ├── engine/     # MissionEngine, ProgressionEngine, GlitchEngine, MetricsTracker (pure logic)
    │       ├── audio/      # AudioEngine, SoundCues, AmbientLayer, CommandListener (Web Audio)
    │       ├── views/      # Preact UI: FloatHUD, SandboxHUD, modules/*, components/*
    │       ├── data/       # chapters, levels, cheatsheet, cipher-quotes
    │       ├── utils/      # diff, time, hints, chapterNav
    │       ├── types.ts    # canonical state schema (PluginData = StoragePort payload)
    │       └── index.ts    # barrel — re-exports everything, never imports obsidian
    ├── content/            # @neurovim/content — Markdown SSOT → typed JSON
    │   ├── src/content/    # missions (BRIEFING/TRANSMISSION), KATAS, LOOT, FRAGMENTS, REF
    │   ├── src/solutions/  # dev SOLUTIONS (target text for diff validation)
    │   ├── src/generated/  # content.ts / sandbox.ts / welcome.ts — produced by build.mjs
    │   ├── src/welcome.md   # welcome intro source
    │   └── build.mjs       # gray-matter → typed TS manifest (D15, bundler-friendly)
    ├── adapter-obsidian/   # @neurovim/adapter-obsidian — esbuild → dist/main.js
    │   └── src/            # main.ts, views/ (SidebarView, AsciiCodeBlockProcessor),
    │                       #   modals/, ports/ObsidianContent.ts, audio/VimModeWatcher.ts
    └── adapter-web/        # @neurovim/adapter-web — Vite SPA + Tauri desktop
        ├── src/            # main.tsx, ui/ (App=NEXUS, Welcome/Briefing/Mission/Sandbox/Result),
        │                   #   ports/WebStorage.ts, cm6-theme.ts, styles.css, fonts/ (JetBrains Mono)
        ├── public/         # og.png, favicon PNGs (static, copied to dist root)
        └── src-tauri/      # Tauri v2 desktop project (Rust + tauri.conf.json + icons)
```

## Build & test — commands (all from the repo root)

```bash
npm install                  # install workspaces
npm run typecheck            # all 4 workspaces (tsc --noEmit) — must stay green
npm test                     # jest across all 4 workspaces (203 tests)

npm run dev                  # adapter-web Vite dev server → http://localhost:5173/ (HMR)
npm run build:content        # content/build.mjs — ALWAYS first (produces src/generated/*)
npm run build:plugin         # esbuild → packages/adapter-obsidian/dist/main.js
npm run build:web            # vite build → packages/adapter-web/dist/
npm run build                # content → plugin → web (in this order)

npm run desktop:dev          # Tauri desktop app with HMR (needs Rust + Xcode CLT)
npm run build:dmg            # native app + macOS DMG (Tauri v2)
```

**Desktop (Tauri v2):** `packages/adapter-web/src-tauri/` wraps the Vite build as a
native app (OS WebView, DMG ~3 MB). Multi-OS installers via
`.github/workflows/desktop.yml` (GitHub Actions only). Details: `docs/DESKTOP.md`.

**Test distribution:** `core` 176, `content` 10, `adapter-obsidian` 6, `adapter-web` 11
(= 203). `adapter-web` covers the WebStorage persistence layer + the submit-flow
progression contract (fake-indexeddb, no UI/CM6 rendering — those stay verified via
dev server + typecheck).

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
- **CSS via tokens:** all web styles in `adapter-web/src/styles.css`, driven by the
  `--nv-*` variables (six canonical + additive tokens). New colors as a `:root`
  variable, never inline hex (see DESIGN-SPEC §3/§11). The bundled monospace is
  self-hosted JetBrains Mono (`src/fonts/`, exposed as `--nv-mono`).
- **Bundle budget (web):** code-split (initial ~310 KB; CM6 ~410 KB lazy; `marked`
  ~43 KB lazy). No heavy visual deps; prefer CSS motion over JS libs. Any new
  dependency must justify its weight and ideally be lazy-loaded.
- **Original untouched:** the origin is the Obsidian plugin `neurovim-trainer`
  v1.0.0. The original stays unchanged; this monorepo is the contract. The
  plugin swap into the vault is run manually (the repo never writes into the
  vault) — see `docs/PLUGIN-SWAP.md`.
- **Obsidian posture — web-first, logic-parity only:** the Obsidian adapter is kept
  at *functional* parity by routing game logic through the shared pure core (engines,
  `ProgressionEngine`, etc.) — it is **not** a visual-parity target. The v0.2.0
  cinematic-CRT overhaul was deliberately web-only (its spec scopes it to
  `adapter-web`; `core/src/views` and `adapter-obsidian` were untouched). New UI/UX
  work lands web-first and is **not** back-ported unless explicitly decided, so don't
  "fix" the Obsidian UI to match the web app — that divergence is intentional. The
  live vault still runs the original v1.0.0; the refactored build is built-but-unverified
  pending a manual swap (`docs/PLUGIN-SWAP.md`).

## Gotchas

- **Stale generated content:** after editing anything under `packages/content/src/`,
  run `npm run build:content` first — otherwise typecheck/tests run against a stale
  `src/generated/*` and the failure messages point at the wrong place.
- **Preact alias is load-bearing:** any *new* build/test config (jest project,
  esbuild target, vite preset) must map `react`/`react-dom` → `preact/compat`,
  or you get cryptic hook/JSX type errors far from the actual cause.
- **Subagents must never `git checkout`/`git switch`:** agents share one working
  tree — a branch switch inside a subagent moves the controller's HEAD mid-task.
  Branch changes are done only by the top-level session.
- **Desktop CI runs only on the GitHub mirror:** pushing a release tag to Codeberg
  alone never builds installers — the tag must reach the `github` remote.
- **`npm version` reformats `package.json`:** it normalizes JSON formatting
  (e.g. expands one-line objects); that churn is expected when using
  `scripts/bump-version.sh`.

## Memory

- **Project memory (global):** `~/.claude/projects/-Users-Shared-code-neurovim-standalone/memory/`
  with `MEMORY.md` as index (CORE-AGENT-02) — durable facts, feedback, project state.
- **Vault-local working memory:** `claude/memory/MEMORY.md` + session logs in
  `claude/logs/` (git-ignored, see Note below).
- **Session handoff:** `.remember/` (`remember.md` = handoff, `now.md`,
  `today-YYYY-MM-DD.md`, `recent.md`, `archive.md`, `logs/`, `tmp/`) per
  CORE-AGENT-03 — git-ignored.

## Glossary

| Term | Meaning |
|---|---|
| **CIPHER** | the handler character — a human (Ren Voss, revealed in LOOT-06), not an AI; the diegetic voice that assigns missions |
| **NEXUS** | hub/dashboard view (operator status + mission list) |
| **Mission** | a Vim exercise with a story briefing; types: `practice` / `briefing` / `loot` / `sandbox` |
| **BRIEFING / TRANSMISSION** | the two parts of a mission note: story lead-in + the actual task |
| **KATA** | a free drill exercise without a story arc |
| **THE RAVEN / Sandbox** | free play: fix N injected glitches against the clock (EASY/NORMAL/HARD) |
| **LOOT / FRAGMENT** | lore artifacts (story-bible notes), unlockable as rewards |
| **GlitchEngine** | injects/validates text corruptions (sandbox + correction missions) |
| **PluginData** | persistent player state (`types.ts`) = StoragePort payload |
| **Port** | interface an adapter implements (VimModeSource/Storage/Content/UiHost) |
| **Kuro theme** | the visual lineage: terminal/CRT, phosphor green `#39ff7a`, monospace |

## Remotes & distribution (ADR-001 D5)

- **Primary:** `codeberg.org/jkaindl/NeuroVIM` (live; git remote `codeberg`, `main` tracked)
- **Mirror:** `github.com/johannes-kaindl/NeuroVIM` (live; git remote `github`) — runs the desktop CI
- **Tokens are not stored** in `.git/config`; pushes use inline credentials.

## When you change something

1. **Keep the core pure** — new platform logic goes through a port, not the core.
2. **Content changes** → edit the Markdown source + `npm run build:content`.
3. **Keep the gate green** — `npm run typecheck && npm test` before every commit.
4. **Web styling** → only `styles.css` + the CM6 theme, via `--nv-*` tokens; don't
   touch routing/logic (DESIGN-SPEC §11).
5. **Doc sync** — reflect architecture/port changes here and in the decision log.

> **Note:** `claude/` (working memory + session logs) and `.claude/` (local agent
> state) are git-ignored and intentionally not part of the public repo.

## Roadmap

- **Shipped:** v0.2.0 (visual overhaul) → v0.2.1 (hardening) → v0.2.2 (par-tiers) →
  **v0.2.3** (Story-Mode progressive unlock, Arc-2 rebalance, find-char/dot/`:g` KATAs).
  Each cycle has a spec + plan under `docs/superpowers/{specs,plans}/`.
- **Release tags** `v0.1.0`…`v0.2.3` trigger the desktop CI (macOS/Windows/Linux installers
  via GitHub Actions → GitHub release); macOS builds are **signed + notarized** since the
  `APPLE_*` repo secrets were added (v0.2.3 onward).
- **Open:** navigation skills (folding / jumps / marks) need a new gameplay verb to be
  teachable (the verb is "fix text, diff against solution"); Obsidian plugin-swap
  verification (`docs/PLUGIN-SWAP.md`); Windows code signing; itch.io distribution.

## Abweichungen von der Leitkonvention

- CORE-GIT-01 — Das primäre Remote heißt `codeberg` (nicht `origin`); URLs entsprechen
  der Konvention. Historisches Setup via `scripts/setup-remotes.sh`; ein Umbenennen
  bringt keinen Nutzen und bricht dokumentierte Push-Kommandos.
- CORE-GIT-03 — Tags behalten den `v`-Prefix (`v0.1.0`…): `.github/workflows/desktop.yml`
  triggert auf `v*`, und die bestehende Tag-Reihe ist mit Prefix publiziert. Wechsel nur
  zusammen mit CI-Trigger-Migration.
- CORE-GIT-05 — Der Commit-Trailer nennt das tatsächlich beteiligte Modell zum
  Commit-Zeitpunkt (z. B. `Claude Fable 5`), nicht wörtlich „Claude Opus".
- PROF-OBS-01/02 — Kein `manifest.json` und kein `npm run deploy` in diesem Repo:
  das Original-Plugin (`neurovim-trainer` v1.0.0) lebt unverändert im Vault; dieses
  Repo baut nur `dist/main.js` für den **manuellen** Swap
  (`scripts/swap-obsidian-plugin.sh`, `docs/PLUGIN-SWAP.md`). Das Repo schreibt nie
  ins Vault — bewusste Schutzentscheidung.
- PROF-NAT-01 — Kein `build-native-app.sh`/`package-native-app.sh`: Tauri v2 ersetzt
  die Skript-Kette. Build + Signing lokal via `npm run build:dmg`, Notarization +
  Multi-OS-Installer via `.github/workflows/desktop.yml`; Doku in `docs/DESKTOP.md`.
- PROF-NAT-02 — Der version-bump synct `tauri.conf.json` statt `Info.plist`
  (CFBundleShortVersionString): Tauri generiert die Info.plist beim Build aus
  `tauri.conf.json` — sie existiert nicht als committete Datei.
- PROF-NAT-03 — Gatekeeper-/Signing-Doku liegt in `docs/DESKTOP.md`
  (statt `docs/MACOS-APP.md`) — deckt Signing, Notarization und „Trotzdem öffnen" ab.

## Offene Konventions-Punkte

- [x] CORE-META-08 — `LICENSE-DOCS` (CC BY-SA 4.0) ergänzt, im README verlinkt (2026-06-10).
- [x] CORE-AGENT-01 — Skelett-Sektionen `Gotchas` · `Memory` · `Abweichungen von der Leitkonvention` ergänzt (2026-06-10).
- [x] CORE-AGENT-03 — `.remember/` in `.gitignore` aufgenommen (2026-06-10).
- [x] PROF-NAT-01 — Tauri-Äquivalent dokumentiert (siehe Abweichungen) (2026-06-10).
- [x] PROF-NAT-02 — `scripts/bump-version.sh` synct package.json ↔ Tauri ↔ Cargo (2026-06-10).
- [ ] CORE-META-03 — Screenshot-Generierung als committetes Skript reproduzierbar machen (`docs/screenshots/*` werden derzeit ohne im Repo abgelegtes Capture-Skript erzeugt).
- [ ] CORE-META-04 — User-Manual/Guides nach Diátaxis (Tutorial · How-to · Reference · Explanation) anlegen und aus dem README verlinken.
- [x] PROF-TS-01 — ESLint 10 Flat-Config + Root-`npm run lint` ergänzt (2026-06-10).
- [x] PROF-TS-04 — tsconfig-Split: `tsconfig.build.json` (Gate/Produktion) vs. `tsconfig.json` (IDE/Tests, include `test/`) je Workspace; `typecheck` läuft auf den Build-Configs (2026-06-10).
