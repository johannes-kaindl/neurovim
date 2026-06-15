# Reference

> **Diátaxis: Reference.** Precise, look-it-up facts about how NeuroVim works. Dry and
> complete. For step-by-step help use the [How-to guides](../how-to/index.md); to
> understand the design rationale, see [Explanation](../explanation/index.md).

## Pages

- **[Vim keymap](vim-keymap.md)** — every Vim command the game teaches and recognises,
  grouped by category. *(Auto-generated from the game data.)*
- **[Levels & progressive unlock](progression.md)** — the ten ranks, their XP
  thresholds, and what each level-up reveals. *(Auto-generated from the game data.)*

## Mission types

Every piece of content has a `mission_type`:

| Type | What it is |
|---|---|
| `practice` | A standard mission: restore corrupted text by diffing against a hidden solution. The core exercise. |
| `briefing` | The story lead-in shown before a practice mission. Narrative, not editing. |
| `loot` | A lore artifact (LOOT/FRAGMENT) unlocked as a reward — story-bible reading, not a task. |
| `sandbox` | THE RAVEN free-play mode — fix N injected glitches against the clock. |

Content IDs: **`M-xx`** story missions, **`R-xx`** later-arc operations, **`KATA-xx`**
free drills, **`LOOT-xx`** / **`FRAGMENT-xx`** lore artifacts, **`REF`** reference
artifacts. The campaign runs across **10 chapters** plus **14 KATAs**.

## How a mission is won

A practice mission ships as **corrupted text** plus a hidden **solution**. You edit the
text in the editor; NeuroVim continuously diffs your buffer against the solution and
completes the mission the instant they match. There is no "submit" button and no
partial credit — the file is either restored or it isn't.

## Scoring (par-tiers)

Each completed mission is graded on **keystroke economy** against a *par*:

| Tier | Condition |
|---|---|
| 🥇 gold | keystrokes ≤ par |
| 🥈 silver | keystrokes ≤ par × 1.5 |
| 🥉 bronze | keystrokes ≤ par × 2.5 |
| completed (no tier) | anything above bronze |

**Par** is the gold threshold. It is either a hand-tuned value set per mission, or, if
none is set, computed from the mission's difficulty:

```
par = 20 + (difficulty × 20)
```

So a difficulty-1 mission (like M-01) has par **40**; difficulty 3 (the fallback when a
mission has no difficulty) has par **80**. Lower keystrokes are always better; the
result screen shows how many keystrokes separate you from the next tier.

> Par values are deliberately generous baselines, tuned against the web keystroke
> counter — they reward economical editing without punishing learners.

## Progression & XP

- **XP** is awarded per mission (`xp_reward`, e.g. M-01 = 15 XP) and accumulates as
  `total_xp`.
- Crossing a rank's XP threshold **levels you up** and unlocks that rank's content.
  Full table: [Levels & progressive unlock](progression.md).
- **Streaks** track consecutive days on which you complete at least one mission.
- **Personal bests** per mission: best time, best keystrokes, best keystrokes-per-minute,
  and run count.

## THE RAVEN sandbox

| Setting | Detail |
|---|---|
| Goal | Remove every injected CORP glitch from the passage before time runs out. |
| Difficulties | `easy`, `normal`, `hard` — higher = more glitches. |
| Glitch kinds | inserted CORP line, capitalised word, CORP word-replacement, appended tag, joined lines. |
| Scoring | Best **time per difficulty** is saved; no par-tier. |

## Controls & editor

- The editor is **CodeMirror 6** with **[@replit/codemirror-vim](https://github.com/replit/codemirror-vim)** —
  real Vim keybindings (Normal / Insert / Visual modes, operators, text objects,
  search, macros, registers), not a simulated terminal.
- The complete set of keys the game uses is the **[Vim keymap](vim-keymap.md)**.
- An in-game **Reference overlay** (CIPHER → `Reference`) mirrors that keymap and
  reveals categories as you unlock them.

## Saving & data

- Progress is stored **locally**: **IndexedDB** in the browser build, the equivalent
  local store in the desktop build. No account, nothing uploaded.
- Data is **per-browser and per-origin** — it does not sync across browsers or devices.
- To wipe it, clear the site's storage — see
  [How-to: reset your progress](../how-to/index.md#reset-your-progress).

## Platforms

- **Browser:** <https://jkaindl.codeberg.page/neurovim/> (no install).
- **Desktop:** macOS `.dmg` (signed + notarized), Windows `.exe`/`.msi` (unsigned),
  Linux `.AppImage`/`.deb`/`.rpm` — from the
  [releases](https://github.com/johannes-kaindl/NeuroVIM/releases). Details in
  [`docs/DESKTOP.md`](../../DESKTOP.md).
