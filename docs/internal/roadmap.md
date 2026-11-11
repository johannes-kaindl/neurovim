# Status and roadmap

Moved verbatim from AGENTS.md (CORE-AGENT-15).

> **Status (2026-10-14) — v0.2.8 released.** The web app is live; the desktop installers wait for macOS notarization. The Obsidian consumer is `neurovim-obsidian` (store id `neurovim`, called `vim-dojo` until its rename), which ships 0.12.1 in the community store and vendors v0.2.7. The core carries **five ports**: `LlmPort` arrived with Slice A, together with `CipherUplink` as its in-core caller. Two capabilities have made the back-flow trip up from the consumer — keystroke tracing and the LLM uplink's game-facing half.
>
> v0.2.8 reworked how a run is measured and scored: one pass through every mission now reaches level 10 (levels 7–10 need 900/1150/1300/1500 XP), and mission lines align along a longest common subsequence, so one inserted or deleted line no longer marks the rest of the document — the conformance vectors changed, and the Lua port must follow them. The ASCII frames in solutions, briefings and lore are straight, with a content gate behind them. Every mission has a blind reference run in real Neovim (`npm run par`) and takes its par from it, and the web result shows a run without keystrokes as unverified. Both consumers still sit on the pre-0.2.8 core (`neurovim-obsidian` vendors v0.2.7, `neurovim.nvim` pins older vectors) and take v0.2.8 next — the pin lag is in [`CONSUMERS.md`](CONSUMERS.md).
>
> **The release history lives in [`CHANGELOG.md`](CHANGELOG.md), not here.** This file used
> to carry a per-version log; it drifted two months behind while the changelog stayed
> correct (CORE-META-16 — one truth in two places drifts, the only question is how quietly).


## Roadmap

- **Shipped:** v0.1.0 → **v0.2.8** (2026-10-14). Per-version detail lives in [`CHANGELOG.md`](CHANGELOG.md); the last three cycles were v0.2.6 (`LlmPort` + `CipherUplink`), v0.2.7 (`objective` per mission, `MissionGenerator`, `WebLlm`) and v0.2.8 (level thresholds, LCS line alignment, measured par). Cycles *up to v0.2.4* had a spec + plan under `docs/superpowers/{specs,plans}/` — that location is historical and frozen; new SDD artifacts live outside the repo (see the **Memory** section).
- **Release tags** `v0.1.0`…`v0.2.8` trigger the desktop CI (macOS/Windows/Linux installers
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

