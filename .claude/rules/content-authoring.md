---
paths:
  - "packages/content/src/**"
  - "packages/content/build.mjs"
  - "scripts/generate-kata.mjs"
  - "scripts/gen-manual.mjs"
  - "packages/core/src/data/**"
  - "docs/manual/reference/**"
  - "docs/dev/how-to/write-a-mission.md"
  - "docs/dev/how-to/generate-kata-draft.md"
  - "docs/dev/how-to/regenerate-generated-docs.md"
  - "docs/dev/reference/content-format.md"
---

# Content authoring, generated files and the game's Vim

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

- **Every mission states its target (`objective`):** the transmission frontmatter carries a
  YAML list of concrete steps that, with the transmission text, determine the solution
  character for character — exact strings in backticks, counts, order, what stays. It is the
  only guidance on screen during play (the briefing shows once, KATAs have none). No absolute
  line numbers (host frontmatter shifts them), no characters a keyboard cannot type. Gate:
  `content.test.ts` § mission objective. Proof of sufficiency is a blind replay (text +
  objective only, no solution), not the gate: `CONTENT-AUDIT-solution-derivability.md`.

- **Stale generated content:** after editing anything under `packages/content/src/`,
  run `npm run build:content` first — otherwise typecheck/tests run against a stale
  `src/generated/*` and the failure messages point at the wrong place.
- **Generated manual reference:** `docs/manual/reference/{vim-keymap,progression}.md`
  are produced by `npm run build:manual` from `packages/core/src/data/{cheatsheet,levels}.ts`.
  After changing the cheatsheet or the level/unlock tables, rerun it and commit the
  regenerated Markdown (those two files carry a DO-NOT-EDIT banner).

- **Generated drafts are not content:** `npm run generate:kata` writes into
  `packages/content/src/_drafts/` (git-ignored, not scanned by `build.mjs`). A draft
  becomes content only when a human moves it into `src/content/KATAS/` + `src/solutions/`,
  where the three content gates then apply unchanged. The `generated_by` frontmatter stamp
  is what still says so afterwards.

- **The game's Vim is codemirror-vim, not Vim:** `Ctrl+a`/`Ctrl+x` change only the number at
  the cursor (no visual-block increment) and read `REF-4217` as minus 4217. Content that
  teaches a key must be checked against `node_modules/@replit/codemirror-vim`, not against
  Vim's manual.
