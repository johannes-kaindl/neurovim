# How-to — Regenerate the generated docs and screenshots

> **Diátaxis: How-to.** Rebuild the two generated manual pages and the README screenshots
> after changing game data or UI. The scripts and their flags are listed in
> [Reference → Commands](../reference/commands.md).

- [Regenerate the manual reference pages](#regenerate-the-manual-reference-pages)
- [Recapture the screenshots](#recapture-the-screenshots)

---

## Regenerate the manual reference pages

**When:** after any change to `packages/core/src/data/cheatsheet.ts` (keymap) or
`packages/core/src/data/levels.ts` (ranks, XP thresholds, `UNLOCK_MAP`).

1. `npm run build:manual`
2. It rewrites exactly two files, both starting with a DO-NOT-EDIT banner:

   | Source | Output |
   |---|---|
   | `packages/core/src/data/cheatsheet.ts` | `docs/manual/reference/vim-keymap.md` |
   | `packages/core/src/data/levels.ts` | `docs/manual/reference/progression.md` |

3. Commit the regenerated Markdown together with the data change.

Everything else under `docs/manual/` is hand-written. The script is not part of `npm test`, so
nothing fails when you forget it — the page is simply stale.

## Recapture the screenshots

**Prerequisites:** Google Chrome installed (the script drives it via `playwright-core` with
`channel: 'chrome'`; no browser is downloaded). Port `4317` free.

1. Full run — builds content and web, serves `dist/` with `vite preview` on port 4317, shoots
   every view:

   ```bash
   npm run capture:screenshots
   ```

2. While iterating, reuse the existing build and limit the shots:

   ```bash
   node scripts/capture-screenshots.mjs --no-build --only 05-result-modal,06-sandbox
   ```

3. Output goes to `docs/screenshots/` (override with `NV_SHOT_OUT=<dir>`). Existing files are
   overwritten.
4. Check the images and commit them.

What the shots show:

- a **seeded** save, not a fresh one: level 6 (850 XP), `M-01`–`M-09` completed with
  personal bests, a streak and a sandbox best — except `10-first-run-hint`, which uses a
  first-run seed
- desktop at 1280×860 @2×, mobile at 390×844 @3×

To change what renders, edit the seed functions in `scripts/capture-screenshots.mjs`.
