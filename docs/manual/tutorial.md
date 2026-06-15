# Tutorial — Your first mission

> **Diátaxis: Tutorial.** A guided, guaranteed-to-work first run. By the end you will
> have completed mission **M-01** and earned your first XP. You need **no prior Vim
> knowledge** — that is exactly the point. We will not explain everything; we will get
> you one win.

This takes about **five minutes**.

## Before you start

Open the game in your browser: **<https://jkaindl.codeberg.page/neurovim/>**.
Nothing to install, nothing to sign up for. Your progress is saved locally in the
browser.

A keyboard is required (NeuroVim teaches keyboard editing). A laptop or desktop is
best for your first run.

## Step 1 — Meet CIPHER

The first screen is the **Welcome**. CIPHER, your handler, introduces the premise:

> *"VIM is our tool. Master it, or die typing."*

Click **through** the intro to reach the **NEXUS** — your hub. The NEXUS shows your
operator status (rank, XP) on one side and a list of available missions on the other.
At the start, only the first chapter is unlocked.

## Step 2 — Open the briefing for M-01

In the mission list, pick **M-01 — The Three Modes**. You will see a **briefing**
first: a short story transmission from CIPHER. It tells you what happened (CORP
corrupted your induction document with character-level noise) and which skills you
will use:

- **Mode switching** — `i`, `a`, `o`, `ESC`
- **Character deletion** — `x`, `X`

Read it, then click the link at the bottom to open the **transmission** — the actual
task. **The timer starts when the file opens.** Don't worry about the clock on your
first run; you have all the time you want.

## Step 3 — Understand the goal

You are now in the **editor** — a real [CodeMirror](https://codemirror.net/) editor
with genuine Vim keybindings. The document is full of stray injected characters
(`X` and `Z` dropped mid-word), so it reads as garbage:

```
YoXur induction doZcument has been comprXomized in tranZsit.
```

Your job: **delete the injected characters** so the text reads cleanly:

```
Your induction document has been compromised in transit.
```

You win the moment the document matches the hidden solution — NeuroVim checks your
text against it automatically.

## Step 4 — The only three things you need

Vim starts in **Normal mode** — keys are commands, not text. That is the whole trick.

1. **Move** the cursor onto a stray character. Use the arrow keys if you like, or the
   Vim way: `h` `j` `k` `l` = left, down, up, right.
2. **Delete** the character under the cursor: press `x`.
3. Repeat until the line reads correctly.

That is it. No insert mode required for M-01 — just move and `x`. If you ever *do*
type letters and they appear in the text, you slipped into **Insert mode** (probably
by pressing `i`): press **`ESC`** to return to Normal mode, then `u` to undo any
accidental typing.

> **If you get stuck:** CIPHER coaches you from the side rail, and the **Reference
> overlay** (open it from CIPHER → `Reference`) lists every key. Both fade back as you
> level up — they are loud now on purpose.

## Step 5 — Finish and read your result

When the last stray character is gone, a **result** screen appears. It shows:

- **+15 XP** for completing M-01,
- your **time** and **keystroke count**,
- a **par-tier** — 🥇 gold / 🥈 silver / 🥉 bronze — scoring how economical your
  keystrokes were. M-01's gold "par" is 40 keystrokes; don't chase it yet.

You can **replay** any mission to beat your tier later.

## What you just did

You used a real Vim editor to restore a file using only Normal-mode motion and `x`.
That is the entire NeuroVim loop — *fix corrupted text, diff against the solution* —
and every later mission is a richer version of it.

## Next steps

- Play **M-02 → M-04** to finish chapter 1; a little more XP — clearing `KATA-01`, or
  replaying a mission — tips you into **Level 2**, which **unlocks the next chapter**.
  See [Reference → Levels & unlock](reference/progression.md).
- When you want to drill one technique without a story, try a **[KATA](how-to/index.md#do-a-quick-drill-kata)**.
- When you want open-ended practice against the clock, enter
  **[THE RAVEN sandbox](how-to/index.md#play-the-raven-sandbox)**.
- Keep the **[Vim keymap](reference/vim-keymap.md)** handy.
