# Contributing

Thanks for your interest in NeuroVim. This is a small monorepo; the conventions
below keep it consistent. `AGENTS.md` has the deeper architecture notes.

## Setup

```bash
npm install
npm run dev          # web app → http://localhost:5173/
```

## Before you open a PR

The quality gate must stay green:

```bash
npm run typecheck    # all 4 workspaces
npm test             # runs the full suite across all workspaces
npm run build        # content → plugin → web
```

For content changes, also run `npm run build:content` (it regenerates
`packages/content/src/generated/*`; never hand-edit those).

## Conventions

- **English everywhere** — docs, code comments, identifiers, UI strings, commit
  messages (Conventional Commits, e.g. `feat(adapter-web): …`).
- **Core stays pure** — `@neurovim/core` never imports `obsidian` or touches the
  DOM. Platform specifics go through the four ports (see `AGENTS.md`).
- **Content is SSOT in Markdown** — edit `packages/content/src/content/*.md`, then
  rebuild; don't edit generated files.
- **CSS via tokens** — web styles funnel through the `--nv-*` variables in
  `packages/adapter-web/src/styles.css`; no inline hex.
- **No tooling migration** (Webpack, Tailwind, CSS-in-JS, UI kit) without discussion.
- Keep the bundle lean — new web deps must justify their weight and ideally be lazy.

## Branches & remotes

Primary remote: `git.jkaindl.de` (`origin`); mirror: GitHub (`github`). Open issues/PRs
on whichever you prefer.

## License of contributions

By opening a PR you agree to the [Contributor License Agreement](CLA.md): you
keep your copyright, your contribution stays available under the project's
open-source license, **and** you grant the maintainer the right to also license
it under other terms — which keeps the project's
[dual-licensing model](LICENSING.md) (AGPL + an optional commercial license)
possible. To accept, add this line to your PR description (or as a
`Signed-off-by:` trailer on your commits):

> I have read and agree to the Contributor License Agreement (CLA.md).

Under the open-source license, your contribution is published under the same
license as the overall project: [AGPL-3.0-only](LICENSE).
