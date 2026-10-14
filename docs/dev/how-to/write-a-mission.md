# How-to — Write a mission or KATA

> **Diátaxis: How-to.** Add a new story mission or drill to the Markdown source of truth and
> get it through the gates. Every field and rule used here is listed in
> [Reference → Content format](../reference/content-format.md).

**Prerequisites:** `npm install` done; `npm run dev` works.

- [Add a story mission](#add-a-story-mission)
- [Add a KATA](#add-a-kata)
- [Make it unlock](#make-it-unlock)
- [Set the par](#set-the-par)
- [Check it and commit](#check-it-and-commit)

---

## Add a story mission

1. Pick the next free ID: `M-NN` for arc I, `R-NN` for arc II. Check both
   `packages/content/src/content/` and `packages/content/src/solutions/`.
2. Choose the chapter directory, e.g. `packages/content/src/content/05 - Literal Frequencies/`.
3. Create the transmission `<ID>-TRANSMISSION-<Title>.md` — the corrupted text the player
   edits, with frontmatter:

   ```yaml
   ---
   mission_id: R-25
   title: "Example Title"
   tier: "…"
   xp_reward: 40
   difficulty: 3
   category: regex
   summary: One line that says what the player practises.
   why: "One CIPHER line on why this skill matters."
   mission_type: practice
   locked: false
   ---
   ```

   Copy `tier`, `tags`, `sticker` and `color` from a sibling mission in the same chapter.
   Leave `par_keystrokes` out for now: it is not hand-tuned, it comes from a measured reference run ([Set the par](#set-the-par)), and the content gate fails until it is set.
4. Create the briefing `<ID>-BRIEFING-<Slug>.md` in the same directory — story lead-in, no
   `mission_id`:

   ```yaml
   ---
   mission_type: briefing
   links_to: "05 - Literal Frequencies/R-25-TRANSMISSION-Example_Title"
   locked: false
   ---
   ```

5. Create the solution `packages/content/src/solutions/<ID>-SOLUTION-<Title>.md` — **no
   frontmatter**, only the exact clean text the transmission must become.
6. Make every target value derivable: anything in the solution that is not already in the
   transmission (a new word, a new line) must be named in the briefing or transmission — a
   CIPHER note, a directive, a formula.

## Add a KATA

1. Pick the next free `KATA-NN` (check `src/content/KATAS/`, `src/solutions/` and the
   git-ignored `src/_drafts/`).
2. Create `packages/content/src/content/KATAS/KATA-NN-TRANSMISSION-<Title>.md` with the same
   frontmatter as a transmission (`tier: "⬛ KATA"`). There is no briefing — put the skills
   header into the body, as the existing KATAs do.
3. Create `packages/content/src/solutions/KATA-NN-SOLUTION-<Title>.md` with the clean text.
4. Set its par like a mission's: [Set the par](#set-the-par).

To let a local model draft a KATA instead, see
[Generate a KATA draft](generate-kata-draft.md).

## Make it unlock

A mission that is not listed anywhere stays locked forever.

1. Open `packages/core/src/data/levels.ts`.
2. Add the ID to the `missions` array of the level that should reveal it in `UNLOCK_MAP`.
   Level-1 content goes into `DEFAULT_PLUGIN_DATA.unlocked` in `packages/core/src/types.ts`
   instead.
3. Regenerate the player reference: `npm run build:manual` (rewrites
   `docs/manual/reference/progression.md`).
4. For the Obsidian consumer's navigation, also add the mission to `CHAPTERS`,
   `ARC2_CHAPTERS` or `KATAS` in `packages/core/src/data/chapters.ts`.

## Set the par

Par is the gold threshold, and it is measured, not judged. The content gate (`describe('par')` in `packages/content/test/content.test.ts`) fails on a mission without `par_keystrokes`, and on one whose par is not `ceil(count / 5) * 5` of its run in `packages/content/par/reference-runs.json`. The only exceptions are the missions listed in `PAR_APPROVED` in that test, which keep an authored par the maintainer approved; the list is empty today.

1. `npm run build:content`, so the export holds the new mission. `npm run par` also needs Neovim and the `neurovim.nvim` clone ([prerequisites](measure-par.md#prerequisites)).
2. Work out a good solution **blind**: from the transmission, the briefing and the objective only, never the solution file, using only the keys taught up to that mission. Follow the route the briefing teaches, even when a shorter one exists: par prices the briefing's route, not the shortest ([why](../explanation/decisions.md#par-comes-from-blind-reference-runs)).
3. Measure it with `npm run par` ([how-to](measure-par.md)). The run must come out `solved`; its `keys` is the count.
4. Add the run to `packages/content/par/reference-runs.json` as `{ "id", "keys", "count", "par", "taught" }`, with `par` set to `ceil(count / 5) * 5` and `taught` naming the keys the run assumed.
5. Put the same number into the transmission as `par_keystrokes`.

The gate ties par to the recorded run but does not replay it. When you later change a mission's transmission, solution, objective or the route its briefing teaches, replay its reference run with `npm run par` and, if the count moved, update the entry and `par_keystrokes` ([how](measure-par.md#re-measure-a-reference-run)).

## Check it and commit

1. `npm run build:content` — regenerates `src/generated/content.ts`. Never edit that file.
2. `npm run typecheck && npm test`. The content tests fail on:
   - a mission that is already solved on open (transmission = solution),
   - a solution line with no source in the transmission,
   - a solution token with no source in transmission or briefing,
   - a mission without `par_keystrokes`, or whose par is not its reference run's count rounded up to a multiple of 5 ([Set the par](#set-the-par)),
   - a `╔…╗` frame in a solution, briefing or lore note with a line that is not as wide as the frame's top line (transmissions are not checked: a glitch may change a line's length on purpose),
   - a single pass through the curriculum, each mission once and always taking what is open, that does not unlock every mission and reach the top level (the progression gate).

   Fix the content. Add an entry to `EXPLAINED_ORPHANS` / `EXPLAINED_TOKENS` in
   `packages/content/test/content.test.ts` only when the value really is stated in the
   mission text — with a one-line reason.
3. The manifest-count assertions in the same test file (entries per role, playable missions)
   must be raised to match the new files.
4. `npm run dev`, open <http://localhost:5173/>, unlock the mission (or use a save at the
   right level) and solve it once in the editor.
5. Commit source, solution, the regenerated `packages/content/src/generated/content.ts`
   (tracked in git — consumers vendor it), `levels.ts` and the regenerated manual together,
   e.g. `feat(content): R-25 Example Title`.
