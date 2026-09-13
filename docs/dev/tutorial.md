# Tutorial — Your first change

> **Diátaxis: Tutorial.** A guided first run for contributors. By the end you will have
> the game running from source, changed something you can see, and watched the quality
> gate pass. Nothing here is committed — you undo the change at the end. For specific
> tasks afterwards, see the [How-to guides](README.md#how-to-guides).

This takes about **fifteen minutes**, most of it `npm install`.

## Before you start

You need **git**, **Node.js with npm** (the CI builds with Node 20; newer works) and a
browser. No Rust, no Tauri — the desktop app comes later, if ever.

## Step 1 — Get the code

```bash
git clone https://git.jkaindl.de/jkaindl/NeuroVIM.git
cd NeuroVIM
npm install
```

The repo is an npm-workspaces monorepo with three packages — `core`, `content` and
`adapter-web`. One `npm install` at the root sets up all of them. (There is no pnpm
here; don't reach for it.)

## Step 2 — Build the content

```bash
npm run build:content
```

Missions and lore are written in Markdown. This step compiles them into
TypeScript under `packages/content/src/generated/`. The web app imports those
generated files, so **they must exist before the dev server starts**.

## Step 3 — Start the game

```bash
npm run dev
```

Open <http://localhost:5173/>. You see the **Welcome** screen: a large `>_ NEUROVIM`,
a quote from CIPHER, and the line *"Three modes. One tool. Begin."* Leave the server
running.

## Step 4 — Change the welcome text

Open `packages/content/src/welcome.md` in your editor. Find the last line:

```markdown
Three modes. One tool. Begin.
```

Change it to:

```markdown
Three modes. One tool. Begin, operator.
```

Save. Look at the browser — **nothing changed**. That is the lesson of this step: the
game does not read the Markdown, it reads the generated TypeScript.

In a second terminal, rebuild the content:

```bash
npm run build:content
```

Now the browser reloads and the Welcome screen reads *"Begin, operator."*

## Step 5 — Run the quality gate

Every commit in this repo has to pass the same two commands:

```bash
npm run typecheck
npm test
```

`typecheck` checks all three workspaces. `npm test` runs more than unit tests: a gate
against absolute paths, the consumer-contract check, the script tests, and then Jest
in every workspace. Both finish green — your change touched only prose.

## Step 6 — Undo it

```bash
git restore packages/content/src/welcome.md
npm run build:content
```

`git status` is clean again: the generated files are rebuilt from the original source.

## What you just did

You walked the loop every content change in this repo follows: **edit the Markdown
source → rebuild → check in the running app → gate green.** Code changes follow the
same shape, minus the rebuild step.

## Next steps

- Write a real mission: [How-to → Write a mission](how-to/write-a-mission.md).
- See every command in one table: [Reference → Commands](reference/commands.md).
- Understand why the code is split into core and adapters:
  [Explanation → Architecture](explanation/architecture.md).
- Before opening a pull request, read [`CONTRIBUTING.md`](../../CONTRIBUTING.md).
