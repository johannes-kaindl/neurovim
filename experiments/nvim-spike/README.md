# Spike — NeuroVim as a Neovim plugin (2026-10-08)

> Question: can the core run unchanged next to Neovim, and does the content hold in real Vim? Answer: yes to both, measured below. This is a spike, not the plugin — no progression, storage, timer or briefing view.

## Shape

- `sidecar.ts` — the core as a Node process. Newline-delimited JSON on stdin/stdout: `list`, `get`, `verify`. It imports the pure modules directly (`content/src/index`, `core/src/engine/MissionEngine`, `core/src/utils/diff`), not the core barrel, because the barrel re-exports the Preact views a terminal host never needs. The solution never leaves the process; Lua only receives the verdict and the divergent line numbers.
- `lua/neurovim/init.lua` — the Neovim side. A mission is a plain scratch buffer; the objective sits above line 1 as virtual lines (visible, never scored); divergent lines get `DiffChange`. Commands: `:NeuroVim [id]` (without an id: `vim.ui.select`, which Telescope / fzf-lua take over if installed) and `:NeuroVimCheck`. Everything else — look, colours, statusline — is the player's own Neovim.
- `headless.lua` — the measurement.

## Run

```bash
cd experiments/nvim-spike
npx esbuild sidecar.ts --bundle --platform=node --format=esm --outfile=dist/sidecar.mjs
nvim --headless -u NONE -l headless.lua      # writes result.txt
# interactive:
nvim --cmd "set rtp^=$PWD" -c "lua require('neurovim').setup()" -c "NeuroVim"
```

Needs `npm run build:content` first (the sidecar bundles `src/generated/*`).

## Results (Neovim 0.12.5, Node 24.14)

**Architecture holds.** The bundle is 489 KB including all content. Node start plus the first request takes about 25 ms, a `verify` round trip well under 1 ms; the whole headless run takes 0.06 s.

**Real keystrokes solve a mission.** M-01 played as `gg0qa/\C[XZ]<CR>xq29@a` → `matches: true`. Counter-check: the untouched text → `matches: false`, 11 lines off. Harness pitfall: `nvim_feedkeys` needs the `t` flag, otherwise the keys do not count as typed and `q` records nothing — the first run reported the solved mission as unsolved for exactly that reason.

**The content is already written in Vim's regex dialect, so Neovim is its reference, not a target to translate for.** Every mission whose briefing names Ex commands under SKILLS was run in real Neovim against its transmission and scored by the core: **20 MATCH, 6 MISMATCH**. All 20 concrete commands solve their mission exactly — including R-07 (`\{-}`, lazy), which `@replit/codemirror-vim` cannot match even under `nopcre` (`../vim-regex-findings.md`), and R-08 (`\v`, which needs `nopcre` there). The six mismatches are not content defects: their SKILLS name a pattern rather than a solution (`:%s/old/new/g`, `:g/pattern/d`, `:{range}s/…`, `:norm`, `:#`) or depend on a visual selection (R-04 `'<,'>`).

## What the spike does not answer

- Node as a requirement for the plugin (most Neovim users have it for language servers, not all).
- Progression and storage (`StoragePort` → a JSON file under `stdpath('data')`), timer and keystroke trace (`vim.on_key`), the briefing view, the CIPHER uplink (the sidecar has `fetch`, so no Local Network Access prompt).
- Where the plugin lives and how it vendors the core — name proposal `neurovim.nvim`.
