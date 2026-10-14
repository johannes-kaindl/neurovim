# How-to — Measure par from key sequences

> **Diátaxis: How-to.** Play a key sequence in real Neovim against this repo's current content and read off how many keys it costs, with `npm run par`. The measured count is what par is built from.

## What par is

Par is a measured reference run: a good solution to the mission, worked out blind (from the transmission, the briefing and the objective, never the solution file) with only the keys taught up to that mission, along the route its briefing teaches rather than the shortest one there is ([why](../explanation/decisions.md#par-comes-from-blind-reference-runs)). You count its keys and round up to the next multiple of 5. The rounded number is the gold threshold. Silver is 1.5 times par and bronze 2.5 times par ([`ParTier.ts`](../../../packages/core/src/engine/ParTier.ts)). A mission without an authored par falls back to the difficulty formula `20 + difficulty × 20` ([content format](../reference/content-format.md)), which is a guess; a measured par replaces the guess with a fact.

## Prerequisites

- `npm install` done and `npm run build:content` run, so the export reflects the current content. The tool reads `packages/content/export/neurovim-data.json`; a stale export measures stale missions.
- Neovim 0.10 or newer on the `PATH` (`nvim`).
- A clone of `neurovim.nvim`, the Neovim port, next to this repo's workspace. The default location is `../../nvim-plugins/neurovim.nvim` relative to the repo root; anywhere else, pass `--plugin <dir>`.

The tool never touches the plugin clone or your own save. It plays a throwaway copy of the plugin (without `.git`) with this repo's export swapped in, under a temporary `XDG_DATA_HOME`, and deletes the copy afterwards. All missions are unlocked in that temporary save, so any id can be played. Every run gets its own Neovim process, so registers, macros, the last search, marks and history from one run never reach the next: a run costs what a fresh player pays.

## 1 · Check the setup

```bash
npm run par -- --self-test
```

It plays four runs of `M-01`, each in its own Neovim: the known 19-key solution from the plugin's own tests (must solve), a 4-key run that must fail, and a replay of `gg029@a` next to an untouched baseline (empty `keys`). Register `a` is what the 19-key solution recorded, so a Neovim shared between runs would run that macro in the replay; in a fresh one the register is empty and the replay must end exactly where the untouched mission ends (same `lines_off`, not solved). That is the isolation check. Success prints `par self-test: ok (19 keys solved, 4 keys unsolved)` and exits 0. Anything else exits 1 and prints `par self-test: FAILED` with all four measurements as JSON. Exit 2 means the tool could not start: there is no `neurovim.nvim` at the plugin path (pass `--plugin <dir>`) or no export (run `npm run build:content`).

## 2 · Write the runs file

A JSON array with one object per run. `keys` is in Vim notation: special keys as `<CR>`, `<Esc>`, `<C-v>`, and a backslash doubled because it is JSON.

```json
[
  { "id": "M-01", "keys": "gg0qa/\\C[XZ]<CR>xq29@a" },
  { "id": "M-01", "keys": "gg0x" }
]
```

The same id may appear in several runs, for example to compare two approaches. Each run starts in a fresh Neovim with the mission freshly opened. A briefing, if the mission has one, is dismissed for you and costs nothing, so the keys start at the transmission. An id that is not in the export, `keys` that is not a string, or a file that is not a JSON array rejects the whole file before anything is played (exit 2), so a typo does not cost a half-finished measurement.

## 3 · Run it

```bash
npm run par -- runs.json out.json
```

One line per run goes to the terminal: id, `solved`, `UNSOLVED (<n> lines off)` or `NO RESULT` (the run timed out or Neovim died), the key count, and the error if there was one. A failed run does not stop the others; the exit code stays 0 and the `error` field in `out.json` carries the news. The full result is written to `out.json`:

```json
[
  { "id": "M-01", "solved": true, "keys": 19, "lines_off": 0, "error": null, "text": null }
]
```

| Field | Meaning |
|---|---|
| `solved` | the buffer matches the mission's solution after the keys |
| `keys` | the count by the plugin's rules, below; `null` when the run produced no result |
| `lines_off` | lines that still differ from the solution; `0` when solved; `null` when the run produced no result |
| `error` | `null`, or why the run has no clean result: the message if playing the keys raised one, `timeout` if Neovim ran longer than 60 seconds (it is killed), `nvim failed (<status>)` if the process died |
| `text` | the buffer after the run, only when unsolved — read it to see where the sequence went wrong |

## What counts as a key

The count is the plugin's own, so a measurement equals what a player sees in the winbar. A macro costs the keys that record and start it, not what it replays; a search or Ex command costs all its keys; a briefing dismissal is free. The full rules are in the plugin's help, `:help neurovim-keys`.

## Where reference runs are kept

The runs that par values were measured from live in `packages/content/par/reference-runs.json`. It is an object, not the bare array of step 2: the header fields `measured`, `plugin` (the `neurovim.nvim` commit the runs were measured on) and `rule`, and `runs`, one entry per mission with `id` and `keys` as in step 2 plus `count` (the key count `npm run par` reported), `par` (the number the mission carries) and `taught` (the keys the run assumed).

The content gate (`describe('par')` in `packages/content/test/content.test.ts`) ties every mission's par to its run: `par_keystrokes` must be `count` rounded up to a multiple of 5 (R-06 and R-14, listed in `PAR_APPROVED`, are the approved exceptions), and the `par` recorded in the run must equal what the mission carries. The gate does not replay the runs. `npm test` has no Neovim, so a mission whose text changed while its reference run was not re-measured still passes. Re-measuring is therefore a step of changing a mission, not something the tests do for you.

## Re-measure a reference run

When a mission's transmission, solution, objective or the route its briefing teaches changes, its reference run may no longer solve it or may cost a different count. Replay the recorded run (put the ids you changed into the array):

```bash
node -e "const r=JSON.parse(require('fs').readFileSync('packages/content/par/reference-runs.json','utf8')).runs.filter((x)=>['M-04'].includes(x.id));console.log(JSON.stringify(r))" > runs.json
npm run par -- runs.json out.json
```

The first command extracts the recorded runs into a runs file; the extra fields (`count`, `par`, `taught`) are ignored by the tool. If a run still solves with the same count, nothing changes. If it no longer solves, work out a new route from the changed text, blind as above. Once a run solves, set its `keys`, `count` and `par` in `reference-runs.json` and the mission's `par_keystrokes` from it (`par` is `count` rounded up to a multiple of 5).

## Why it is not part of `npm test`

`par` needs the neighbouring plugin repo and a Neovim, which a fresh clone of this repo does not have. It is authoring tooling in the same way `npm run generate:kata` is, which needs a local model server: run it by hand when a mission's par is set or revisited.
