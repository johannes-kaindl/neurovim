# AGENTS.md — neurovim-standalone

> **Workspace-Standards (maintainer-lokal):** Die verbindliche Leitkonvention steht in `_docs/CONVENTIONS.md`
> im Multi-Projekt-Workspace des Maintainers, `../_docs` relativ zu diesem Repo — nicht Teil dieses Repos,
> ignorieren falls im Klon nicht vorhanden. Modell comply-or-explain. Offene Punkte fuer
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
over five port interfaces. Target 1 = Obsidian plugin (origin), target 2 =
standalone web app, target 3 = native desktop app (Tauri wrapper around the web app).

> **Status (2026-08-19) — v0.2.6 released.** Seven signed installers + the web app are
> live; the Obsidian consumer `vim-dojo` ships 0.8.0 in the community store. The core now
> carries **five ports**: `LlmPort` arrived with Slice A, together with `CipherUplink` as
> its in-core caller. Two capabilities have made the back-flow trip up from the consumer —
> keystroke tracing and the LLM uplink's game-facing half.
>
> Newest addition (unreleased): **`MissionGenerator`** — authoring-side generation of KATA
> drills, the second `LlmPort` consumer. It does not ask a model for an exercise; it asks
> for a clean document plus reversible corruptions and lets `GlitchEngine` derive the
> exercise, so solvability is constructed rather than checked. Drafts land in
> `packages/content/src/_drafts/` and never reach the SSOT unaided.
>
> **The release history lives in [`CHANGELOG.md`](CHANGELOG.md), not here.** This file used
> to carry a per-version log; it drifted two months behind while the changelog stayed
> correct (CORE-META-16 — one truth in two places drifts, the only question is how quietly).

## Architecture — adapter pattern (ADR-001)

A platform-neutral **core** + **adapters**, decoupled through **five port
interfaces**. The core **never** depends on `obsidian` or the browser DOM —
platform specifics come exclusively through the ports the adapters implement.

One adapter lives here (`adapter-web`, which also drives the Tauri desktop build).
The Obsidian target is a **separate repo** — `obsidian-plugins/vim-dojo`, in the
community store — which consumes this core by vendoring it. See § Upstream contract.

```
@neurovim/content ──┐
                    ├──> @neurovim/core <──implements── @neurovim/adapter-web
(Markdown SSOT      │    (game logic,                   (Vite SPA, browser + Tauri)
 → typed JSON)      │     Web Audio,
                    │     Preact UI,        <──vendors───── vim-dojo (separate repo)
                    │     ports)                            (Obsidian plugin, main.js)
                    └──> (web bundles content directly)
```

### The five ports (`packages/core/src/ports/`)

| Port | Responsibility | Obsidian impl (`vim-dojo`) | Web impl |
|---|---|---|---|
| `VimModeSource` | Vim mode + classified actions (push/pull) | `vim-mode-change` via `MarkdownView.editor.cm` + `CommandListener` | CodeMirror 6 + `@replit/codemirror-vim` (same event) |
| `StoragePort` | Persistence of `PluginData` (generic `<T>`) | `plugin.loadData/saveData` → `data.json` | IndexedDB |
| `ContentPort` | Load missions + lore artifacts | Vault file API + `data/chapters.ts` | bundled `@neurovim/content` |
| `UiHost` | Mount container for Preact trees | `ItemView` / `Modal` / MarkdownPostProcessor | DOM `<div>` overlays / routes |
| `LlmPort` | One streaming LLM completion (transport-neutral) | `CipherClient` + `endpointResolver` + `XhrSseTransport` | `WebLlm` over the vendored code-kit `llm-stream` (fetch + SSE) |

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
│   ├── design-source/      # design delivery snapshot (mockups + port package + brand SVGs)
│   └── screenshots/        # headless captures of the web views (for DESIGN-SPEC)
├── consumers.json          # who vendors this core (input to the contract gate)
├── CONSUMERS.md            # generated — pin lag + verbatim status per consumer
├── scripts/
│   ├── setup-remotes.sh    # Forgejo-primary + GitHub-mirror remotes (ADR-001 D5)
│   ├── check-consumers.mjs # upstream-contract gate (pin lag + verbatim check)
│   ├── generate-kata.mjs   # authoring driver for the core's MissionGenerator (LlmPort impl)
│   └── lib/consumers.mjs   # pure helpers for the gate (parse/classify/diff/render)
├── experiments/
│   ├── vim-regex-findings.md    # regex-flavor parity Obsidian↔CM6 (D1)
│   └── vim-regex-harness/
└── packages/
    ├── core/               # @neurovim/core — platform-neutral core
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
    │   └── build.mjs       # gray-matter → typed TS manifest (D15, bundler-friendly)
    └── adapter-web/        # @neurovim/adapter-web — Vite SPA + Tauri desktop
        ├── src/            # main.tsx, ui/ (App=NEXUS, Welcome/Briefing/Mission/Sandbox/Result),
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
npm run build:content        # content/build.mjs — ALWAYS first (produces src/generated/*)
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
`.github/workflows/desktop.yml` (GitHub Actions only). Details: `docs/DESKTOP.md`.

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
- **CSS via tokens:** all web styles in `adapter-web/src/styles.css`, driven by the
  `--nv-*` variables (six canonical + additive tokens). New colors as a `:root`
  variable, never inline hex (see DESIGN-SPEC §3/§11). The bundled monospace is
  self-hosted JetBrains Mono (`src/fonts/`, exposed as `--nv-mono`).
- **Bundle budget (web):** code-split (initial ~310 KB; CM6 ~410 KB lazy; `marked`
  ~43 KB lazy). No heavy visual deps; prefer CSS motion over JS libs. Any new
  dependency must justify its weight and ideally be lazy-loaded.
- **The Obsidian target lives elsewhere:** it is `obsidian-plugins/vim-dojo`, a
  separate repo in the community store that vendors this core. Its version lives in the
  status block above and is deliberately **not** repeated here — this line carried a stale
  `v0.7.5` while that block already said 0.8.0 (CORE-META-16, again). This repo
  builds no plugin bundle and never writes into a vault. How capabilities travel
  between the two: § Upstream contract.
- **Obsidian posture — web-first, logic-parity only:** `vim-dojo` is kept
  at *functional* parity by routing game logic through the shared pure core (engines,
  `ProgressionEngine`, etc.) — it is **not** a visual-parity target. The v0.2.0
  cinematic-CRT overhaul was deliberately web-only (its spec scopes it to
  `adapter-web`; `core/src/views` was untouched). New UI/UX work lands web-first and
  is **not** back-ported unless explicitly decided, so don't "fix" the Obsidian UI to
  match the web app — that divergence is intentional. Note the traffic runs both ways:
  `vim-dojo` was ahead on the LLM uplink and keystroke tracing, and those capabilities
  move up into the core under the back-flow rule. **Both have now made the trip**:
  tracing (`MetricsTracker` records as well as counts, alongside `RunTrace` and
  `TraceStore`) and the uplink's game-facing half (`LlmPort` + `CipherUplink`, carrying
  CIPHER's chat and debrief). What stayed below is `obsidian-kit` material — transport,
  SSE, endpoint resolution, model choice — which the consumer wires into `LlmPort`.

## Upstream contract

This repo is the upstream for every NeuroVim target. The **vendor surface** is
`packages/core/src` + `packages/content/src`; `adapter-web` is a consumer of that
surface like any other, not a privileged insider. Game logic that passes the test
below does not belong in `adapter-web` just because the web app is the faster route.

**Back-flow rule.** A capability that originates in a consumer stays there while it is
**platform-bound**. If it concerns the **game** — rules, content, CIPHER's voice,
progression, scoring — it belongs in the core, and it moves *before* a second consumer
needs it, not after.

Apply this test to every new capability, in this order:

1. **Does the plugin roof already solve it?** (`obsidian-kit`, its `REGISTRY.md`) →
   take it from there, do not rebuild it. Building kit material into this core is the
   most expensive mistake available here.
2. **Does it work without the Obsidian API?** → yes: core. No: it stays in the consumer.
3. **Would an nvim or web consumer want the same thing?** → yes: core, even with only
   one consumer today.

**Moving a capability up** takes five steps, two of them in the consumer's repo:

1. Implement it in the core, platform-neutral, with tests (TDD).
2. Commit to `main` here.
3. *In the consumer:* `npm run vendor` — re-pin.
4. *In the consumer:* replace the local implementation with the core call, delete the
   old file, tests green.
5. Cross-check: behaviour unchanged, test count risen rather than shifted.

The pin makes this safe: until a consumer re-vendors, it does not see the change. There
is no window in which a consumer is broken.

`npm test` runs `scripts/check-consumers.mjs`, which measures both halves of the
contract per consumer — pin lag and verbatim status — and regenerates `CONSUMERS.md`
when called as `npm run check:consumers`.

**The one permitted deviation — a declared provenance header.** A consumer whose sync
script stamps each copied file with an origin line is not hand-editing it, but a gate
that hashes whole files cannot tell the two apart: it reports every copy as
`violated`, blaming the consumer for doing the right thing. (This is not hypothetical —
it happened in `code-kit`, which vendored this very script, on 2026-09-02; `vim-dojo`
already stamps its `obsidian-kit` tree.) A consumer may therefore declare its stamp in
`consumers.json`:

```json
"provenanceHeader": { "lines": 1, "mustMatch": "^// vendored from neurovim-standalone@" }
```

The declared lines are then **verified against the pattern and cut off**, and the body
below must still match the source byte for byte. They are never skipped unchecked — a
blind `slice(1)` would let any edit hide in line 1, which is precisely the change the
gate exists to catch (a line reading `export const BACKDOOR = 1; // as if it were a
header` is rejected). Three properties, all measured on 2026-09-02 against a stamped
copy of vim-dojo's tree:

- **It is all-or-none per consumer.** The declaration says *every* copied file carries
  the stamp; one unstamped file among stamped ones is a violation, and rightly so —
  a partially stamped tree means the sync script did not write it.
- **A broken preamble is its own breach,** reported as such rather than as an edit.
  Confusing the two is what sent the `code-kit` session hunting in the wrong repo.
- **Without a declaration nothing changes,** byte for byte, error message included.

## Vendored code-kit

The contract above also runs in the other direction: `adapter-web` is a **consumer of
`code-kit`**, the domain-free workspace kit. `packages/adapter-web/src/vendor/code-kit/`
holds verbatim copies of `web/llm-stream.ts`, `pure/sse.ts` and `pure/error_body.ts`,
pinned in `VENDOR.json`. Two rules, both the mirror image of the ones above:

- **Never hand-edit anything under `vendor/`.** A fix belongs upstream in code-kit,
  followed by a re-vendor from the new pin. code-kit's own `check-consumers` names this
  repo and fails on an edited copy — its verdict is the reason the copies stay trustworthy.
- **The `web/` + `pure/` split is mirrored on purpose,** so `llm-stream`'s `../pure/sse`
  import resolves unchanged and the copies stay byte-identical. Flattening the directories
  would force a rewrite, and a rewritten copy is no longer verifiable.

Why vendored rather than depended on: same reason `vim-dojo` vendors this core — a pin the
consumer moves deliberately, with no npm publish in either project's way.

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
- **Desktop CI runs only on the GitHub mirror:** pushing a release tag to git.jkaindl.de
  alone never builds installers — the tag must reach the `github` remote.
  **Measured twice on 2026-08-19, and it complicates this:** after `git push origin main`,
  `github/main` was already current within seconds — a Forgejo→GitHub push mirror appears
  to be active, contrary to the note above and to the assumption that the auto-mirror died
  with the Codeberg exit. **A third time on 2026-08-21** (`a5d2e90`): `github/main` already
  carried the commit at the first possible query after `git push origin main`, and still did
  12 s later. **But it is not instant:** a fourth push the same day (`a9c34c8`) still showed
  `github/main` behind when checked right away, while the explicit `git push github main`
  then reported *Everything up-to-date*. A same-second check can therefore read as a dead
  mirror when it is only lag — push explicitly regardless. All four observations are about
  **branches**; whether the mirror
  carries **tags** is untested, and that is what the CI needs. So keep pushing the tag
  explicitly — and while doing it, check whether it was already there. That settles it.
  **A sixth observation on 2026-09-02 (`7b14d1f`) shows the failure mode to expect:**
  `git ls-remote github main` still reported the old sha, and the `git push github main`
  issued right after it was *rejected* — `cannot lock ref 'refs/heads/main': is at 7b14d1f
  but expected dd1cf2d`. The mirror had landed the commit in between. Read that message
  correctly: it names your own sha as what is already there, so it reports success, not a
  conflict. Verify with `git ls-remote` rather than re-pushing or forcing.
- **`esbuild` is a *root* devDependency, and must stay one:** `gen-manual.mjs` and
  `generate-kata.mjs` transpile core TS modules so node can import them. It used to be
  hoisted from `adapter-obsidian`; when that workspace was removed, `npm run build:manual`
  broke silently — neither script is part of `npm test`. A workspace package inherits its
  neighbours' dependencies only until the neighbour leaves.
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
- **A deployed HTTPS page *can* reach `http://localhost` — but only past Chrome's Local
  Network Access prompt.** Measured 2026-08-21 against the live deploy (`pages.jkaindl.de`,
  Chrome 151.0.7922.170, fresh profile, both LM Studio :1234 and Ollama :11434).
  **Mixed content is not the blocker** — Chrome still treats loopback as trustworthy, proven
  by `--disable-features=LocalNetworkAccessChecks` letting every request through unchanged.
  What blocks is LNA, in Chrome's own words: *"blocked by CORS policy: Permission was denied
  for this request to access the `loopback` address space"*. One click on "Allow" clears the
  **whole** loopback space — ports 1234/11434/8123 and `127.0.0.1` alike, GET and streaming
  POST (real SSE chunks arrived) — and it survives a browser restart, stored per origin as
  the `loopback_network` content setting. Two traps for whoever builds `WebLlm`: the
  `Access-Control-Allow-Private-Network` response header is **dead** here (two control
  servers, one with it and one without, behaved identically in every run), so a server-side
  header fix is not the answer; and CDP `Browser.grantPermissions` flips the Permissions API
  to `granted` **without** satisfying the network check — an automated test trusting it
  measures a false negative. **Safari has no path at all** — WebKit blocks this as mixed
  content with no prompt to grant, so a Safari player can never reach a local server; Firefox
  prompts like Chrome (both from a parallel measurement the same day, recorded in the
  maintainer's cockpit under `code-kit/_SDD/2026-08-21-mixed-content-messung.md`). Since every
  one of these surfaces as a plain `TypeError: Failed to fetch`, `WebLlm` answers it with a
  browser-specific message instead of a retry (`refusalHint`) — a retry only ever helps the
  Chromium/Firefox case. One more trap for whoever measures this again: the
  app at `/neurovim-standalone/` sends **no** CSP, but the deploy root `pages.jkaindl.de/`
  does (`default-src 'none'`, Caddy's generated index page) — measuring against the root
  reports a CSP block that does not apply to the app.
- **`npm version` reformats `package.json`:** it normalizes JSON formatting
  (e.g. expands one-line objects); that churn is expected when using
  `scripts/bump-version.sh`.

## Memory

- **SDD-Artefakte (seit 2026-07-16): Cockpit, nicht Repo** — Specs/Plans/Task-Reports leben im
  Coding-Cockpit des Maintainers (`$VAULT/25_Coding/neurovim-standalone/_SDD/`, CORE-META-14, maintainer-lokal).
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
   touch routing/logic (DESIGN-SPEC §11).
5. **Doc sync** — reflect architecture/port changes here and in the decision log.

> **Note:** `claude/` (working memory + session logs) and `.claude/` (local agent
> state) are git-ignored and intentionally not part of the public repo.

## Roadmap

- **Shipped:** v0.1.0 → **v0.2.6** (2026-08-19). Per-version detail lives in
  [`CHANGELOG.md`](CHANGELOG.md); the last three cycles were v0.2.4 (Guidance-Backbone P2,
  Diátaxis manual, presolved-missions fix), v0.2.5 (upstream contract + trace back-flow)
  and v0.2.6 (`LlmPort` + `CipherUplink`). Cycles *up to v0.2.4* had a spec + plan under
  `docs/superpowers/{specs,plans}/` — that location is historical and frozen; new SDD
  artifacts live outside the repo (see the **Memory** section).
- **Release tags** `v0.1.0`…`v0.2.6` trigger the desktop CI (macOS/Windows/Linux installers
  via GitHub Actions → GitHub release); macOS builds are **signed + notarized** since the
  `APPLE_*` repo secrets were added (v0.2.3 onward). Note the CI produces a **draft**, so a
  green run is not a published release (see Gotchas).
- **Open:** wiring `WebLlm` into the web app — endpoint choice, model choice, persistence.
  The transport exists (2026-08-22) and the UX question behind it is **decided** (2026-09-02):
  the uplink is **off by default** and connects only after the player switches it on, so the
  Local Network Access prompt is never a surprise. The reason is not politeness but mechanics:
  **an LNA refusal is stored per origin and permanent**, so a prompt that appears unasked gets
  dismissed by reflex, and that one reflex costs the feature forever. Consequences that are not
  optional: no connection attempt at startup (not even a preflight probe), the on/off state
  persists via `StoragePort`, the error text sits *at the switch* and is fed by `refusalHint`,
  and there is **no "try again" button** — it would promise what it cannot deliver. Check
  code-kit's `pure/endpoint*` + `model-choice` against test 1 before building any of it.
- **Decided, not open — `RunTimer` stays in the consumer** (2026-09-02). It passes the
  three-part test on its face (no Obsidian API, a second consumer would want it), and it is
  still the wrong move: **pausing answers a platform property, not a game rule.** In Obsidian
  the player necessarily navigates away from the mission note, which is why v0.7.0 built the
  pause lifecycle; in the web app the mission fills the page and the trigger does not exist.
  Hoisting it would install a mechanic in the web target that nothing there asks for. The
  price is explicit rather than silent: **best times are not comparable across targets.**
  Whoever builds score export (slice C) or tournaments (slice E) must normalise or keep the
  leaderboards separate — that is now a stated constraint, not a discovery waiting to happen.
  With this settled, the back-flow queue is **empty**.
- **Deferred — `MissionGenerator` stage 2 (runtime generation)** (2026-09-02). Not "needs a
  retry policy": the question came one step too early. At ~50 % per attempt and a cap of 3,
  roughly one player in eight would meet a refusal — for a feature that solves a problem
  nobody has, since 54 authored missions exist. Stage 1 already carries the value: the author
  tool runs, drafts land in `_drafts/`, and solvability is *constructed* rather than checked.
  **Precondition for revisiting: new glitch types.** Only five of ten categories can be
  generated today, and `regex` — 26 of the 54 missions — is not among them. Raise the ceiling
  first, then ask again what a player sees when generation fails.
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
  das Obsidian-Plugin ist ein eigenes Repo (`obsidian-plugins/vim-dojo`), das diesen
  Kern vendoriert und dort seinen eigenen Release-Weg in den Community-Store hat.
  Dieses Repo baut kein Plugin-Bundle und schreibt nie ins Vault.
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
