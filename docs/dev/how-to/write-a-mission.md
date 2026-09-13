# How-to — Write a mission or KATA

> **Diátaxis: How-to.** Add a new story mission or drill to the Markdown source of truth and
> get it through the gates. Every field and rule used here is listed in
> [Reference → Content format](../reference/content-format.md).

**Prerequisites:** `npm install` done; `npm run dev` works.

- [Add a story mission](#add-a-story-mission)
- [Add a KATA](#add-a-kata)
- [Make it unlock](#make-it-unlock)
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
   Add `par_keystrokes` only for a hand-tuned gold threshold.
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

## Check it and commit

1. `npm run build:content` — regenerates `src/generated/content.ts`. Never edit that file.
2. `npm run typecheck && npm test`. The content tests fail on:
   - a mission that is already solved on open (transmission = solution),
   - a solution line with no source in the transmission,
   - a solution token with no source in transmission or briefing.

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
