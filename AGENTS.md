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

> **Status (2026-10-08) — v0.2.7 released.** The web app is live; the desktop installers wait for macOS notarization. The Obsidian consumer is `neurovim-obsidian` (store id `neurovim`, called `vim-dojo` until its rename), which ships 0.12.1 in the community store and vendors v0.2.7. The core carries **five ports**: `LlmPort` arrived with Slice A, together with `CipherUplink` as its in-core caller. Two capabilities have made the back-flow trip up from the consumer — keystroke tracing and the LLM uplink's game-facing half.
>
> v0.2.7 gave every mission an `objective` and shipped **`MissionGenerator`** — authoring-side generation of KATA drills, the second `LlmPort` consumer. It does not ask a model for an exercise; it asks for a clean document plus reversible corruptions and lets `GlitchEngine` derive the exercise, so solvability is constructed rather than checked. Drafts land in `packages/content/src/_drafts/` and never reach the SSOT unaided.
>
> **The release history lives in [`CHANGELOG.md`](CHANGELOG.md), not here.** This file used
> to carry a per-version log; it drifted two months behind while the changelog stayed
> correct (CORE-META-16 — one truth in two places drifts, the only question is how quietly).

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

### The five ports (`packages/core/src/ports/`)

| Port | Responsibility | Obsidian impl (`neurovim-obsidian`) | Web impl |
|---|---|---|---|
| `VimModeSource` | Vim mode + classified actions (push/pull) | no class — `keystrokeCounter.ts` counts keydowns inside `.cm-editor` via the core's `countsAsKeystroke`; no mode listener | no class — `ui/cm6-theme.ts` listens to `vim-mode-change` directly |
| `StoragePort` | Persistence of `PluginData` (generic `<T>`) | `ObsidianStorage` over `loadData/saveData` → `data.json` | `WebStorage` (IndexedDB) |
| `ContentPort` | Load missions + lore artifacts | `BundledContent` — the vendored `@neurovim/content`, not the vault | no class — UI imports `@neurovim/content` helpers directly |
| `UiHost` | Mount container for Preact trees | no class — `HubView` (`ItemView`) + `ResultModal` (`Modal`) | no class — `main.tsx` calls Preact `render()` |
| `LlmPort` | One streaming LLM completion (transport-neutral) | `CorePortAdapter` over `CipherClient` (obsidian-kit chat client) + `EndpointResolver` | `WebLlm` over the vendored code-kit `llm-stream` (fetch + SSE) |

**Important (D17/D19e):** the engines are **pure functions** and do **not**
consume the ports directly — the adapters wire ports ↔ engines. An `AudioPort`
once existed but was removed: `AudioEngine` is already platform-neutral +
injectable, so the wrapper was redundant. In `adapter-web` only `StoragePort` and
`LlmPort` exist as classes; the other three are satisfied by direct wiring.

→ Why it is cut this way: [`docs/dev/explanation/architecture.md`](docs/dev/explanation/architecture.md).
Port signatures: [`docs/dev/reference/ports.md`](docs/dev/reference/ports.md). ADR-001 and the
decision log (D1–D26) live in the separate design-prep workspace, not in this repo.

## File layout

```
.
├── package.json            # npm workspaces (no pnpm — D1) + root scripts
├── tsconfig.base.json      # TS project references, strict, jsx=preact
├── README.md               # human entry point
├── AGENTS.md               # this file
├── .github/workflows/      # desktop.yml — Tauri multi-OS build CI (GitHub only)
├── docs/
│   ├── README.md           # wayfinder: player manual vs contributor docs
│   ├── manual/             # player manual (Diátaxis); reference/{vim-keymap,progression}.md generated
│   ├── dev/                # contributor docs (Diátaxis): tutorial, how-to/, reference/, explanation/
│   ├── lore/               # in-world source text (diegetic, not documentation)
│   ├── brand/              # brand kit (icons, og image) — source for src-tauri/icons
│   ├── design-source/      # design delivery snapshot (mockups + port package + brand SVGs)
│   ├── screenshots/        # headless captures of the web views (capture:screenshots)
│   └── superpowers/        # frozen specs/plans up to v0.2.4 — nothing new here
├── consumers.json          # who vendors this core (input to the contract gate)
├── CONSUMERS.md            # generated — pin lag + verbatim status per consumer
├── scripts/
│   ├── setup-remotes.sh    # Forgejo-primary + GitHub-mirror remotes (ADR-001 D5)
│   ├── check-consumers.mjs # upstream-contract gate (pin lag + verbatim check)
│   ├── generate-kata.mjs   # authoring driver for the core's MissionGenerator (LlmPort impl)
│   ├── gen-export.mjs      # writes packages/content/export/neurovim-data.json (part of build:content)
│   ├── gen-conformance.mjs # writes packages/core/conformance/*.json from the TS core
│   └── lib/                # consumers.mjs (gate helpers), load-ts.mjs (TS loader for scripts),
│                           #   export.mjs + conformance.mjs (builders), *.test.mjs (node --test)
├── experiments/
│   ├── nvim-spike/              # Neovim plugin spike: core in nvim, content vs real Vim (2026-10-08)
│   ├── vim-regex-findings.md    # regex-flavor parity Obsidian↔CM6 (D1)
│   └── vim-regex-harness/
└── packages/
    ├── core/               # @neurovim/core — platform-neutral core
    │   ├── conformance/    # generated JSON vectors for rule ports (data consumers) — npm run build:conformance
    │   └── src/
    │       ├── ports/      # VimModeSource, StoragePort, ContentPort, UiHost, LlmPort
    │       ├── engine/     # MissionEngine, ProgressionEngine, GlitchEngine, MetricsTracker (pure logic)
    │       ├── llm/        # cipherPrompt, debriefPrompt, ChatSession, CipherUplink (CIPHER uplink),
    │       │              #   kataPrompt + MissionGenerator (authoring-side drill generation)
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
    │   ├── export/         # generated neurovim-data.json for data consumers (written by build:content)
    │   └── build.mjs       # gray-matter → typed TS manifest (D15, bundler-friendly)
    └── adapter-web/        # @neurovim/adapter-web — Vite SPA + Tauri desktop
        ├── src/            # main.tsx, ui/ (App=NEXUS, Welcome/Briefing/Mission/Sandbox/Result,
        │                   #   UplinkPanel), uplink.ts (settings + wiring),
        │                   #   ports/{WebStorage,WebLlm}.ts, cm6-theme.ts, styles.css, fonts/
        │   └── vendor/code-kit/  # verbatim copies from code-kit (see § Vendored code-kit)
        ├── public/         # og.png, favicon PNGs (static, copied to dist root)
        └── src-tauri/      # Tauri v2 desktop project (Rust + tauri.conf.json + icons)
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
                             #   uplink.jkaindl.de/llm-setup (CORE-META-13) — repo-specific is only
                             #   --endpoint / --model, and that an instruct model is required: a base
                             #   model without a chat template echoes the prompt back.
npm run capture:screenshots  # scripts/capture-screenshots.mjs → docs/screenshots/* (playwright-core + system Chrome)

npm run desktop:dev          # Tauri desktop app with HMR (needs Rust + Xcode CLT)
npm run build:dmg            # native app + macOS DMG (Tauri v2)
```

**Desktop (Tauri v2):** `packages/adapter-web/src-tauri/` wraps the Vite build as a
native app (OS WebView, DMG ~3 MB). Multi-OS installers via
`.github/workflows/desktop.yml` (GitHub Actions only). Building: `docs/dev/how-to/build-desktop-app.md`
(macOS + Linux); CI matrix and secrets: `docs/dev/reference/desktop-ci.md`.

**Test distribution:** spread across `core` (by far the largest), `content`,
`adapter-web`, plus the `node --test` suite for `scripts/lib/` — exact counts drift,
read them off `npm test`.
`adapter-web` covers the WebStorage persistence layer + the submit-flow
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
- **Every mission states its target (`objective`):** the transmission frontmatter carries a
  YAML list of concrete steps that, with the transmission text, determine the solution
  character for character — exact strings in backticks, counts, order, what stays. It is the
  only guidance on screen during play (the briefing shows once, KATAs have none). No absolute
  line numbers (host frontmatter shifts them), no characters a keyboard cannot type. Gate:
  `content.test.ts` § mission objective. Proof of sufficiency is a blind replay (text +
  objective only, no solution), not the gate: `CONTENT-AUDIT-solution-derivability.md`.
- **CSS via tokens:** all web styles in `adapter-web/src/styles.css`, driven by the
  `--nv-*` variables (six canonical + additive tokens). New colors as a `:root`
  variable, never inline hex (see `docs/dev/reference/design-tokens.md`). The bundled monospace is
  self-hosted JetBrains Mono (`src/fonts/`, exposed as `--nv-mono`).
- **Bundle budget (web):** code-split (initial **414 KB / 123 KB gzip**, measured 2026-10-08; CM6 ~411 KB lazy;
  `marked` ~43 KB lazy). No heavy visual deps; prefer CSS motion over JS libs. Any new
  dependency must justify its weight and ideally be lazy-loaded. **Read the number off a
  build, do not trust this line** — it has drifted before (`docs/dev/explanation/decisions.md`).
- **The Obsidian target lives elsewhere:** it is `obsidian-plugins/neurovim-obsidian`, a
  separate repo in the community store that vendors this core. Its version lives in the
  status block above and is deliberately **not** repeated here — this line carried a stale
  `v0.7.5` while that block already said 0.8.0 (CORE-META-16, again). This repo
  builds no plugin bundle and never writes into a vault. How capabilities travel
  between the two: § Upstream contract.
- **Obsidian posture — web-first, logic-parity only:** `neurovim-obsidian` is kept at *functional*
  parity through the shared pure core — it is **not** a visual-parity target. New UI/UX work
  lands web-first and is **not** back-ported unless explicitly decided; don't "fix" the
  Obsidian UI to match the web app. Capabilities that concern the game still move *up* from
  the consumer (back-flow rule below). Why: `docs/dev/explanation/architecture.md`.

## Upstream contract

This repo is the upstream for every NeuroVim target. The **vendor surface** is
`packages/core/src` + `packages/content/src`; `adapter-web` is a consumer of that
surface like any other, not a privileged insider. Game logic that passes the test
below does not belong in `adapter-web` just because the web app is the faster route.

**Back-flow rule.** A capability that originates in a consumer stays there while it is
**platform-bound**. If it concerns the **game** — rules, content, CIPHER's voice,
progression, scoring — it belongs in the core, and it moves *before* a second consumer
needs it. Apply this test in order:

1. **Does the plugin roof already solve it?** (`obsidian-kit`, its `REGISTRY.md`) → take it
   from there, do not rebuild it.
2. **Does it work without the Obsidian API?** → yes: core. No: it stays in the consumer.
3. **Would an nvim or web consumer want the same thing?** → yes: core, even with only one
   consumer today.

Passing the test is necessary, not sufficient — `RunTimer` passes and stays below
(`docs/dev/explanation/decisions.md`).

**Moving a capability up** takes five steps, two of them in the consumer's repo — see
`docs/dev/how-to/vendor-the-core.md`. `npm test` runs `scripts/check-consumers.mjs` (pin
lag + verbatim status per consumer); `npm run check:consumers` regenerates `CONSUMERS.md`.

**The one permitted deviation — a declared provenance header** in `consumers.json`
(`"provenanceHeader": { "lines": 1, "mustMatch": "^// vendored from neurovim-standalone@" }`).
The declared lines are **verified against the pattern, then cut off**; the body must still
match byte for byte. Never skip header lines unchecked. All-or-none per consumer; a broken
preamble is its own breach; without a declaration nothing changes. Reasoning and the
2026-09-02 measurements: `docs/dev/explanation/upstream-contract.md`.

**Two kinds of consumer** (`"kind"` in `consumers.json`): `source` consumers run the vendored core and content as is; `data` consumers vendor `packages/content/export/` and `packages/core/conformance/` and re-implement the rules in their own language, proven by the vectors. Both are checked verbatim against their pin; the pin lag counts only commits that touch what a consumer copies. Reasoning: `docs/dev/explanation/upstream-contract.md`.

## Vendored code-kit

The contract above also runs in the other direction: `adapter-web` is a **consumer of
`code-kit`**, the domain-free workspace kit. `packages/adapter-web/src/vendor/code-kit/`
holds verbatim copies of `web/llm-stream.ts`, `pure/sse.ts` and `pure/error_body.ts`,
pinned in `VENDOR.json`. Two rules, both the mirror image of the ones above:

- **Never hand-edit anything under `vendor/`.** A fix belongs upstream in code-kit,
  followed by a re-vendor from the new pin. code-kit's own `check-consumers` names this
  repo and fails on an edited copy.
- **The `web/` + `pure/` split is mirrored on purpose,** so imports resolve unchanged and
  the copies stay byte-identical. Don't flatten it.

Why vendored rather than depended on, and why the split matters:
`docs/dev/explanation/upstream-contract.md`.

## Gotchas

- **Stale generated content:** after editing anything under `packages/content/src/`,
  run `npm run build:content` first — otherwise typecheck/tests run against a stale
  `src/generated/*` and the failure messages point at the wrong place.
- **Generated manual reference:** `docs/manual/reference/{vim-keymap,progression}.md`
  are produced by `npm run build:manual` from `packages/core/src/data/{cheatsheet,levels}.ts`.
  After changing the cheatsheet or the level/unlock tables, rerun it and commit the
  regenerated Markdown (those two files carry a DO-NOT-EDIT banner).
- **Preact alias is load-bearing:** any *new* build/test config (jest project,
  esbuild target, vite preset) must map `react`/`react-dom` → `preact/compat`,
  or you get cryptic hook/JSX type errors far from the actual cause.
- **Subagents must never `git checkout`/`git switch`:** agents share one working
  tree — a branch switch inside a subagent moves the controller's HEAD mid-task.
  Branch changes are done only by the top-level session.
- **Desktop CI runs only on the GitHub mirror:** a release tag pushed to git.jkaindl.de
  alone never builds installers — push it to the `github` remote explicitly. A
  Forgejo→GitHub push mirror carries **branches** with some lag; whether it carries tags is
  untested. If `git push github main` is rejected with `cannot lock ref … is at <your sha>`,
  the mirror got there first — that is success; verify with `git ls-remote`, never force.
  Observations: `docs/dev/explanation/decisions.md`; procedure: `docs/dev/how-to/release.md`.
- **`esbuild` is a *root* devDependency, and must stay one:** `gen-manual.mjs` and
  `generate-kata.mjs` transpile core TS for node, and neither is part of `npm test` — losing
  the dependency breaks them silently (it happened once; see `docs/dev/explanation/decisions.md`).
  Since 2026-10-08 `scripts/lib/load-ts.mjs` carries the loader, and the export and conformance tests load it, so `npm test` now fails loudly without esbuild; `generate-kata.mjs` still has its own transpile step.
- **Rule changes regenerate the conformance vectors:** after changing anything in `utils/diff.ts`, `ProgressionEngine` or `ParTier`, run `npm run build:conformance` and commit the changed JSON — `npm test` fails on stale vectors, and a data consumer (the Lua port) sees the change only through them. Never hand-edit an `expected` value; cases are inputs, the TS core computes the outputs.
- **Generated drafts are not content:** `npm run generate:kata` writes into
  `packages/content/src/_drafts/` (git-ignored, not scanned by `build.mjs`). A draft
  becomes content only when a human moves it into `src/content/KATAS/` + `src/solutions/`,
  where the three content gates then apply unchanged. The `generated_by` frontmatter stamp
  is what still says so afterwards.
- **Screenshot capture needs system Chrome:** `npm run capture:screenshots` drives the
  installed Google Chrome via `playwright-core` `channel:'chrome'` (no bundled browser).
  It overwrites `docs/screenshots/*` with a **seeded, populated** Story-Mode state (level
  6), not a fresh save — change the seed in `scripts/capture-screenshots.mjs` to alter
  what renders. Use `--no-build` to reuse the current `dist/` while iterating.
- **A deployed HTTPS page *can* reach `http://localhost` — but only past the browser's Local
  Network Access prompt** (Chrome, Firefox). Mixed content is not the blocker; Safari has no
  path at all. The `Access-Control-Allow-Private-Network` header is dead here, and CDP
  `Browser.grantPermissions` does **not** satisfy the network check — a test trusting it
  measures a false negative. Every refusal surfaces as `TypeError: Failed to fetch`, which
  `WebLlm` answers with `refusalHint` instead of a retry. Measure against the app path, not
  the deploy root (the root sends a CSP the app does not). Full measurements (2026-08-21):
  `docs/dev/explanation/cipher-uplink.md`.
- **The game's Vim is codemirror-vim, not Vim:** `Ctrl+a`/`Ctrl+x` change only the number at
  the cursor (no visual-block increment) and read `REF-4217` as minus 4217. Content that
  teaches a key must be checked against `node_modules/@replit/codemirror-vim`, not against
  Vim's manual.
- **`npm version` reformats `package.json`:** it normalizes JSON formatting
  (e.g. expands one-line objects); that churn is expected when using
  `scripts/bump-version.sh`.

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
| **Port** | interface an adapter implements (VimModeSource/Storage/Content/UiHost/Llm) |
| **Kuro theme** | the visual lineage: terminal/CRT, phosphor green `#39ff7a`, monospace |

## Remotes & distribution (ADR-001 D5)

- **Primary:** `git.jkaindl.de/jkaindl/NeuroVIM` (live; git remote `origin`, `main` tracked)
- **Mirror:** `github.com/johannes-kaindl/NeuroVIM` (live; git remote `github`) — runs the desktop CI
- **Tokens are not stored** in `.git/config`; pushes use inline credentials.

## When you change something

1. **Keep the core pure** — new platform logic goes through a port, not the core.
2. **Content changes** → edit the Markdown source + `npm run build:content`.
3. **Keep the gate green** — `npm run typecheck && npm test` before every commit.
4. **Web styling** → only `styles.css` + the CM6 theme, via `--nv-*` tokens; don't
   touch routing/logic.
5. **Doc sync** — rules change here; reasoning goes to `docs/dev/explanation/`, procedures
   to `docs/dev/how-to/`, facts to `docs/dev/reference/`. One truth, one place (CORE-META-16).

> **Note:** `claude/` (working memory + session logs) and `.claude/` (local agent
> state) are git-ignored and intentionally not part of the public repo.

## Roadmap

- **Shipped:** v0.1.0 → **v0.2.7** (2026-10-08). Per-version detail lives in [`CHANGELOG.md`](CHANGELOG.md); the last three cycles were v0.2.5 (upstream contract + trace back-flow), v0.2.6 (`LlmPort` + `CipherUplink`) and v0.2.7 (`objective` per mission, `MissionGenerator`, `WebLlm`). Cycles *up to v0.2.4* had a spec + plan under `docs/superpowers/{specs,plans}/` — that location is historical and frozen; new SDD artifacts live outside the repo (see the **Memory** section).
- **Release tags** `v0.1.0`…`v0.2.7` trigger the desktop CI (macOS/Windows/Linux installers
  via GitHub Actions → GitHub release); macOS builds are **signed + notarized** since the
  `APPLE_*` repo secrets were added (v0.2.3 onward). Note the CI produces a **draft**, so a
  green run is not a published release (see Gotchas).
- **Done (2026-09-03): `WebLlm` is wired.** `src/uplink.ts` holds settings + wiring,
  `ui/UplinkPanel.tsx` the surface in the NEXUS. Rules that must survive any refactor:
  **off by default, connect only on a deliberate press** (an LNA refusal is stored per origin
  and permanently); **no "try again" button**; settings are **device-local** (localStorage
  `neurovim:uplink`, never `PluginData`); `/models` is the only probe; code-kit's
  `normalizeEndpoint` is deliberately **not** used. Why, for each: `docs/dev/explanation/cipher-uplink.md`.
  - Still open at this surface: nothing calls `complete()` yet. `CipherUplink` needs a chat
    surface in the web app, which does not exist — the port is wired, the caller is not.
- **Decided, not open — `RunTimer` stays in the consumer** (2026-09-02): pausing answers a
  platform property, not a game rule. Consequence: **best times are not comparable across
  targets** — score export (slice C) / tournaments (slice E) must normalise or keep
  leaderboards separate. The back-flow queue is **empty**. Reasoning: `docs/dev/explanation/decisions.md`.
- **Deferred — `MissionGenerator` stage 2 (runtime generation)** (2026-09-02). Precondition
  for revisiting: **new glitch types** (only five of ten are generatable; `regex`, 26 of 54
  missions, is not). Reasoning: `docs/dev/explanation/decisions.md`.
- Longer-standing: navigation skills (folding / jumps / marks) need a new gameplay verb to be
  teachable (today's verb is "fix text, diff against solution"); Windows code signing;
  itch.io distribution.

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

- [x] CORE-META-08 — `LICENSE-DOCS` (CC BY-SA 4.0) ergänzt, im README verlinkt (2026-06-10).
- [x] CORE-AGENT-01 — Skelett-Sektionen `Gotchas` · `Memory` · `Abweichungen von der Leitkonvention` ergänzt (2026-06-10).
- [x] CORE-AGENT-03 — `.remember/` in `.gitignore` aufgenommen (2026-06-10).
- [x] PROF-NAT-01 — Tauri-Äquivalent dokumentiert (siehe Abweichungen) (2026-06-10).
- [x] PROF-NAT-02 — `scripts/bump-version.sh` synct package.json ↔ Tauri ↔ Cargo (2026-06-10).
- [x] CORE-META-03 — `scripts/capture-screenshots.mjs` (`npm run capture:screenshots`) regeneriert `docs/screenshots/*` reproduzierbar: playwright-core + `channel:'chrome'` (kein Browser-Download), `vite preview` auf Nicht-5173-Port, IndexedDB-Seed eines populierten Story-Mode-Stands (Level 6). Desktop 1280×860@2×, Mobile 390×844@3× (2026-06-15).
- [x] CORE-META-04 — User-Manual nach Diátaxis unter `docs/manual/` (Tutorial · How-to · Reference · Explanation), aus dem README verlinkt; Reference (Vim-Keymap + Levels/Unlock) wird via `npm run build:manual` aus `packages/core/src/data/` generiert (kein Drift) (2026-06-15).
- [x] PROF-TS-01 — ESLint 10 Flat-Config + Root-`npm run lint` ergänzt (2026-06-10).
- [x] PROF-TS-04 — tsconfig-Split: `tsconfig.build.json` (Gate/Produktion) vs. `tsconfig.json` (IDE/Tests, include `test/`) je Workspace; `typecheck` läuft auf den Build-Configs (2026-06-10).

**Audit 2026-08-19** (Leitkonvention war seit dem 10./15.06. nicht mehr gegengelesen; seither
sind CORE-META-11…20, CORE-GIT-06/07, CORE-AGENT-07…09, CORE-TEST-01…10, CORE-STATE-01,
CORE-DATA-01…03, CORE-OPS-01 und PROF-TS-05 hinzugekommen):

- [x] PROF-TS-05 **[MUST]** — `lint` schlägt jetzt auf Warnungen fehl (`eslint . --max-warnings 0`).
      Vorher `eslint .`: ESLint endet bei reinen Warnungen mit exit 0, das Gate behauptete also
      eine Sauberkeit, die es nie geprüft hatte. Die Verschärfung lief beim Einbau sofort grün
      durch — es gab keine offenen Warnungen, nur keine Absicherung dagegen (2026-08-19).
- [x] CORE-META-05/06/07/08 — alle Pflicht- und empfohlenen Meta-Dateien vorhanden: `README.md`,
      `LICENSE` (AGPL-3.0), `AGENTS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`,
      `LICENSING.md`, `CLA.md`, `LICENSE-DOCS`, `.editorconfig` (2026-08-19).
- [x] CORE-META-01/02 — `readme_lint.py` gegen dieses Repo: Tier `web-app`, **keine Befunde** (2026-08-19).
- [x] CORE-META-11 — Uplink-Schaufenster-Seite erreichbar (HTTP 200) (2026-08-19).
- [x] CORE-META-16 — Der Status-Block dieser Datei führte bis heute ein zweites Release-Log
      neben `CHANGELOG.md` und lag **zwei Monate zurück** (endete bei v0.2.4, während v0.2.5 und
      v0.2.6 draußen waren). Ersetzt durch einen Kurzstand + Zeiger auf den Changelog: eine
      Wahrheit, ein Ort (2026-08-19).
- [x] CORE-GIT-05 — keine Abweichung mehr: die Regel lautet inzwischen
      `Claude Opus <Version> (1M context)` und deckt die hiesige Praxis wörtlich ab. Der frühere
      Abweichungs-Eintrag ist gestrichen (2026-08-19).
- [ ] CORE-META-13 — `npm run generate:kata` setzt einen lokalen OpenAI-kompatiblen Server voraus
      und müsste auf `uplink.jkaindl.de/llm-setup` verweisen statt Endpoint-Wissen selbst zu
      tragen. Grenzfall: die Regel ist *(user-facing)* markiert, das Werkzeug ist aber reines
      Autoren-Tooling und im README zu Recht nicht erwähnt. Zeiger deshalb hier in `AGENTS.md`
      gesetzt; ob das der Regel genügt oder das Werkzeug in den Guide gehört, ist offen.
- [ ] CORE-META-09 — `README.de.md` (optional) existiert nicht. Bewusst offen, nicht vergessen.
- [ ] **Ungeprüft geblieben** (gelten nach CORE-META-15(c) als offen): CORE-TEST-01…10,
      CORE-STATE-01, CORE-DATA-01…03, CORE-OPS-01, CORE-GIT-06/07, CORE-AGENT-07…09,
      CORE-META-12/14/17/19/20. Sie berühren Verfahren, nicht Dateien, und brauchen je einen
      eigenen Durchgang statt eines Dateichecks.
