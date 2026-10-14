# How-to — Measure par from key sequences

> **Diátaxis: How-to.** Play a key sequence in real Neovim against this repo's current content and read off how many keys it costs, with `npm run par`. The measured count is what par is built from.

## What par is

Par is a measured reference run: you solve the mission once with the fewest keys you can, count them, and round up to the next multiple of 5. The rounded number is the gold threshold. Silver is 1.5 times par and bronze 2.5 times par ([`ParTier.ts`](../../../packages/core/src/engine/ParTier.ts)). A mission without an authored par falls back to the difficulty formula `20 + difficulty × 20` ([content format](../reference/content-format.md)), which is a guess; a measured par replaces the guess with a fact.

## Prerequisites

- `npm install` done and `npm run build:content` run, so the export reflects the current content. The tool reads `packages/content/export/neurovim-data.json`; a stale export measures stale missions.
- Neovim 0.10 or newer on the `PATH` (`nvim`).
- A clone of `neurovim.nvim`, the Neovim port, next to this repo's workspace. The default location is `../../nvim-plugins/neurovim.nvim` relative to the repo root; anywhere else, pass `--plugin <dir>`.

The tool never touches the plugin clone or your own save. It plays a throwaway copy of the plugin (without `.git`) with this repo's export swapped in, under a temporary `XDG_DATA_HOME`, and deletes the copy afterwards. All missions are unlocked in that temporary save, so any id can be played.

## 1 · Check the setup

```bash
npm run par -- --self-test
```

It replays the known 19-key solution of `M-01` from the plugin's own tests and a 4-key run that must fail, and prints `par self-test: ok (19 keys solved, 4 keys unsolved)`. Anything else exits with 1 and prints both measurements. Exit 2 means the plugin was not found.

## 2 · Write the runs file

A JSON array with one object per run. `keys` is in Vim notation: special keys as `<CR>`, `<Esc>`, `<C-v>`, and a backslash doubled because it is JSON.

```json
[
  { "id": "M-01", "keys": "gg0qa/\\C[XZ]<CR>xq29@a" },
  { "id": "M-01", "keys": "gg0x" }
]
```

The same id may appear in several runs, for example to compare two approaches. Each run starts the mission fresh. A briefing, if the mission has one, is dismissed for you and costs nothing, so the keys start at the transmission.

## 3 · Run it

```bash
npm run par -- runs.json out.json
```

One line per run goes to the terminal: id, `solved` or `UNSOLVED (<n> lines off)`, the key count, and the error if the sequence raised one. The full result is written to `out.json`:

```json
[
  { "id": "M-01", "solved": true, "keys": 19, "lines_off": 0, "error": null, "text": null }
]
```

| Field | Meaning |
|---|---|
| `solved` | the buffer matches the mission's solution after the keys |
| `keys` | the count by the plugin's rules, below |
| `lines_off` | lines that still differ from the solution; `0` when solved |
| `error` | the message if playing the keys failed, otherwise `null` |
| `text` | the buffer after the run, only when unsolved — read it to see where the sequence went wrong |

## What counts as a key

The count is the plugin's own, so a measurement equals what a player sees in the winbar. A macro costs the keys that record and start it, not what it replays; a search or Ex command costs all its keys; a briefing dismissal is free. The full rules are in the plugin's help, `:help neurovim-keys`.

## Where reference runs are kept

The runs that par values were measured from live in `packages/content/par/reference-runs.json`, in the format of step 2. Keeping them in the repo means a par can be re-measured whenever a mission's text or objective changes, instead of being trusted.

## Why it is not part of `npm test`

`par` needs the neighbouring plugin repo and a Neovim, which a fresh clone of this repo does not have. It is authoring tooling in the same way `npm run generate:kata` is, which needs a local model server: run it by hand when a mission's par is set or revisited.
