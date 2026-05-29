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
npm test             # 150 tests (core/content/adapter-obsidian)
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

Primary remote: Codeberg (`codeberg`); mirror: GitHub (`github`). Open issues/PRs
on whichever you prefer.
