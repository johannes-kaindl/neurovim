# NeuroVim — Contributor Docs

> For **contributors and maintainers**. Players start in the
> [Player Manual](../manual/README.md). AI agents start in [`AGENTS.md`](../../AGENTS.md),
> which holds the binding rules and links back here for the reasoning.

Organised by [Diátaxis](https://diataxis.fr/) — four kinds of documentation, each for
a different need:

| If you want to… | Go to | Kind |
|---|---|---|
| **Make your first change**, guided | [Tutorial](tutorial.md) | Learning |
| **Get a specific job done** | [How-to guides](#how-to-guides) | Task |
| **Look up** a command, a port, a frontmatter field | [Reference](#reference) | Information |
| **Understand why** something is built this way | [Explanation](#explanation) | Understanding |

## How-to guides

- [Write a mission or KATA](how-to/write-a-mission.md)
- [Generate a KATA draft with a local model](how-to/generate-kata-draft.md)
- [Regenerate the manual reference and screenshots](how-to/regenerate-generated-docs.md)
- [Build the desktop app](how-to/build-desktop-app.md) — macOS and Linux
- [Cut a release](how-to/release.md)
- [Vendor the core into a consumer](how-to/vendor-the-core.md)

## Reference

- [Commands](reference/commands.md) — every npm script
- [Ports](reference/ports.md) — the five interfaces an adapter implements
- [Content format](reference/content-format.md) — mission files, frontmatter, solutions
- [Design tokens](reference/design-tokens.md) — the `--nv-*` variables
- [Desktop CI](reference/desktop-ci.md) — the build matrix, artefacts and secrets

## Explanation

- [Architecture](explanation/architecture.md) — one core, thin adapters, pure engines
- [The upstream contract](explanation/upstream-contract.md) — vendoring, back-flow, the contract gate
- [The CIPHER uplink](explanation/cipher-uplink.md) — reaching a local model from a web page
- [Decisions and observations](explanation/decisions.md) — settled questions and what shaped them
- [Design brief: polish pass](explanation/design-brief-polish-pass.md) — historical, 2026-05

## Other directories in `docs/`

- `lore/` — in-world documents (diegetic source text, not documentation)
- `brand/`, `design-source/`, `screenshots/` — assets
- `superpowers/` — frozen design specs and plans up to v0.2.4; nothing new goes there
