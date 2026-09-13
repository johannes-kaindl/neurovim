# Reference — Commands

> **Diátaxis: Reference.** Every npm script in the monorepo, what it runs, what it needs
> and what it writes. For step-by-step recipes see the [How-to guides](../how-to/);
> for a first guided run, the [contributor tutorial](../tutorial.md).

All root scripts run from the repository root. The repo uses **npm workspaces** — three
of them: `packages/core`, `packages/content`, `packages/adapter-web`.

## Root scripts (`package.json`)

| Script | Runs | Prerequisites | Writes |
|---|---|---|---|
| `npm install` | installs all workspaces | Node + npm | `node_modules/` |
| `npm run dev` | `vite` in `@neurovim/adapter-web` (HMR) — <http://localhost:5173/> | `build:content` run at least once | — |
| `npm run build:content` | `node build.mjs` in `@neurovim/content` | — | `packages/content/src/generated/{content,sandbox,welcome}.ts` |
| `npm run build:web` | `vite build` in `@neurovim/adapter-web` | current `src/generated/*` | `packages/adapter-web/dist/` |
| `npm run build` | `build:content` → `build:web` | — | both of the above |
| `npm run build:manual` | `node scripts/gen-manual.mjs` | root devDependency `esbuild` | `docs/manual/reference/vim-keymap.md`, `docs/manual/reference/progression.md` |
| `npm run generate:kata` | `node scripts/generate-kata.mjs` | a local OpenAI-compatible server with an instruct model | `packages/content/src/_drafts/KATA-NN-{TRANSMISSION,SOLUTION}-<Title>.md` (git-ignored) |
| `npm run capture:screenshots` | `node scripts/capture-screenshots.mjs` | installed Google Chrome (`playwright-core`, `channel: 'chrome'`) | `docs/screenshots/*.png` |
| `npm run desktop:dev` | `build:content` → `tauri dev` in `@neurovim/adapter-web` | Rust toolchain; platform WebView deps | — |
| `npm run build:dmg` | `build:content` → `tauri build` in `@neurovim/adapter-web` | Rust toolchain; on macOS the Xcode Command Line Tools | `packages/adapter-web/src-tauri/target/release/` (binary + bundles) |
| `npm run typecheck` | `tsc -p tsconfig.build.json --noEmit` in core → content → adapter-web | current `src/generated/*` | — |
| `npm run lint` | `eslint . --max-warnings 0` | — | — (fails on any warning) |
| `npm test` | see [Test pipeline](#test-pipeline) | current `src/generated/*` | — |
| `npm run check:consumers` | `node scripts/check-consumers.mjs --write` | consumer repos checked out next to this one (optional) | `CONSUMERS.md` |

## Test pipeline

`npm test` runs these steps in order and stops at the first failure:

| # | Step | Checks |
|---|---|---|
| 1 | `node scripts/check-no-abs-paths.mjs` | no absolute paths outside the repo in tracked files |
| 2 | `node --test scripts/lib/*.test.mjs` | the pure helpers behind the consumer gate |
| 3 | `node scripts/check-consumers.mjs` | pin lag + verbatim status per consumer; exit 1 only on a verbatim violation; does **not** rewrite `CONSUMERS.md` |
| 4 | `npm test --workspaces --if-present` | `jest` in core, content and adapter-web |

## Workspace scripts

Run with `npm run <script> --workspace <name>` or from inside the package directory.

| Workspace | Script | Runs |
|---|---|---|
| `@neurovim/core` | `typecheck` | `tsc -p tsconfig.build.json --noEmit` |
| `@neurovim/core` | `test` | `jest` |
| `@neurovim/content` | `build` | `node build.mjs` |
| `@neurovim/content` | `typecheck` | `tsc -p tsconfig.build.json --noEmit` |
| `@neurovim/content` | `test` | `jest` (manifest counts + the content gates) |
| `@neurovim/adapter-web` | `dev` | `vite` |
| `@neurovim/adapter-web` | `build` | `vite build` (`base: './'`, output `dist/`) |
| `@neurovim/adapter-web` | `preview` | `vite preview` — serves `dist/` |
| `@neurovim/adapter-web` | `typecheck` | `tsc -p tsconfig.build.json --noEmit` |
| `@neurovim/adapter-web` | `test` | `jest` |
| `@neurovim/adapter-web` | `tauri` | the Tauri CLI, e.g. `npx tauri build --no-bundle` |
| `@neurovim/adapter-web` | `desktop:dev` | `tauri dev` |
| `@neurovim/adapter-web` | `desktop:build` | `tauri build` |

Tauri's `beforeDevCommand` is `npm run dev` and its `beforeBuildCommand` is `npm run build`
(both resolved inside `@neurovim/adapter-web`), so a Tauri build always rebuilds `dist/` —
but **not** the content manifest. The root `desktop:dev` / `build:dmg` scripts add
`build:content` for that reason.

## Shell scripts (not wired to npm)

| Script | Does | Notes |
|---|---|---|
| `bash scripts/bump-version.sh <v>` | syncs the version across `package.json` files, `tauri.conf.json`, `Cargo.toml`, `Cargo.lock` | uses BSD `sed -i ''` — fails at `Cargo.toml` under GNU sed; see [release](../how-to/release.md) |
| `bash scripts/deploy-page.sh` | builds the web app and rsyncs `dist/` to pages.jkaindl.de | clean tree, rsync 3.x (`RSYNC` env), `pages-deploy` SSH alias |
| `bash scripts/setup-remotes.sh` | sets the Forgejo + GitHub remotes | placeholders `FORGEJO_USER` / `GITHUB_USER` must be filled in; repo name inside is `neurovim-standalone` |

## CI workflows

| Workflow | Trigger | Does |
|---|---|---|
| `.github/workflows/desktop.yml` | tag `v*`, manual | builds installers into a draft release — [Desktop CI](desktop-ci.md) |
| `.github/workflows/pages.yml` | push to `main`, manual | `npm ci` → `build:content` → `build:web` → deploys `dist/` to GitHub Pages |

Both run only on GitHub Actions (the `github` mirror).

## Script flags

| Script | Flag | Default | Effect |
|---|---|---|---|
| `generate-kata.mjs` | `--category <name>` | `text-objects` | content category; see [generate a KATA draft](../how-to/generate-kata-draft.md) |
| | `--difficulty <n>` | `2` | difficulty written into the draft |
| | `--glitches <n>` | `6` | number of corruptions requested |
| | `--theme <text>` | — | optional theme hint for the model |
| | `--tries <n>` | `3` | attempts before giving up |
| | `--timeout <s>` | `180` | per-request deadline in seconds |
| | `--max-tokens <n>` | `3000` | completion token ceiling |
| | `--endpoint <url>` | `$NEUROVIM_LLM_ENDPOINT` or `http://127.0.0.1:1234/v1` | base URL, **including** `/v1` |
| | `--model <id>` | `$NEUROVIM_LLM_MODEL` or the first entry of `<endpoint>/models` | model id |
| `capture-screenshots.mjs` | `--no-build` | build first | reuse the existing `dist/` |
| | `--only <a,b>` | all shots | comma-separated shot names, e.g. `05-result-modal,06-sandbox` |
| | env `NV_SHOT_OUT` | `docs/screenshots` | output directory |
| `check-consumers.mjs` | `--write` | off | regenerate `CONSUMERS.md` |
| `bump-version.sh` | `<X.Y.Z \| patch \| minor \| major>` | required | see [release](../how-to/release.md) |
