# Architecture — layout, ports table, glossary

Moved verbatim from AGENTS.md (CORE-AGENT-15).

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
│   ├── par/                # par.mjs + run.lua — measure par from key sequences in real Neovim (npm run par)
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
    │   ├── par/            # reference-runs.json — the measured runs every par comes from (npm run par)
    │   └── build.mjs       # gray-matter → typed TS manifest (D15, bundler-friendly)
    └── adapter-web/        # @neurovim/adapter-web — Vite SPA + Tauri desktop
        ├── src/            # main.tsx, ui/ (App=NEXUS, Welcome/Briefing/Mission/Sandbox/Result,
        │                   #   UplinkPanel), uplink.ts (settings + wiring),
        │                   #   ports/{WebStorage,WebLlm}.ts, cm6-theme.ts, styles.css, fonts/
        │   └── vendor/code-kit/  # verbatim copies from code-kit (see § Vendored code-kit)
        ├── public/         # og.png, favicon PNGs (static, copied to dist root)
        └── src-tauri/      # Tauri v2 desktop project (Rust + tauri.conf.json + icons)
```


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

