# How-to guides

> **Diátaxis: How-to.** Task recipes for things you already know you want to do. These
> assume you have played at least the [Tutorial](../tutorial.md). For the full keymap
> see the [Reference](../reference/index.md).

- [Unlock more missions](#unlock-more-missions)
- [Do a quick drill (KATA)](#do-a-quick-drill-kata)
- [Play THE RAVEN sandbox](#play-the-raven-sandbox)
- [Read your par-tier and beat it](#read-your-par-tier-and-beat-it)
- [Find the in-game Vim reference](#find-the-in-game-vim-reference)
- [Reset your progress](#reset-your-progress)
- [Install the desktop app](#install-the-desktop-app)
- [Build the desktop app from source](#build-the-desktop-app-from-source)
- [Connect the CIPHER uplink](#connect-the-cipher-uplink)
- [Play comfortably (audio, motion, mobile)](#play-comfortably-audio-motion-mobile)

---

## Unlock more missions

Missions unlock by **ranking up**, not all at once.

1. Complete missions to earn **XP** (each mission's reward is shown in its briefing).
2. When your total XP crosses a rank threshold, you **level up**.
3. The level-up reveals that rank's missions and loot in the NEXUS.

You start at Level 1 with chapter 1 (`M-01`–`M-04`) and `KATA-01` unlocked. Chapter 1's
four missions are worth 65 XP — one short of Level 2 (66 XP) — so clearing `KATA-01` or
replaying any mission tips you over into Level 2 and the next chapter. The full table of
what each level unlocks is in
[Reference → Levels & progressive unlock](../reference/progression.md).

> Tip: if a mission looks locked, hover it — the NEXUS tells you which rank reveals it.

## Do a quick drill (KATA)

KATAs are short, story-free exercises that drill **one** technique (find-char, the dot
command, `:g`, …) with no briefing and no narrative.

1. In the NEXUS, open the **KATA** list.
2. Pick an unlocked KATA — `KATA-01` is available from the start.
3. Fix the text the same way you fix a mission; KATAs are scored with par-tiers too.

Use KATAs when you want reps on a single command without the story wrapper.

## Play THE RAVEN sandbox

THE RAVEN is free play: a passage of text (Poe's *The Raven*) seeded with **N CORP
glitches** that you race to remove.

1. Open **THE RAVEN** / sandbox from the NEXUS.
2. Choose a difficulty — **EASY**, **NORMAL**, or **HARD**. Higher difficulty injects
   more glitches.
3. Fix every glitch (delete the injected CORP lines, fix the corrupted words) before
   the clock runs out.
4. Your **best time per difficulty** is saved, so you always have a target to beat.

The sandbox is the place to practice once you have a few operators in muscle memory —
there is no par-tier, just you versus the clock.

## Read your par-tier and beat it

After every mission you get a **par-tier** that rates how *economical* your editing was,
measured in keystrokes:

- 🥇 **gold** — at or under par (the most efficient solution)
- 🥈 **silver** — up to 1.5× par
- 🥉 **bronze** — up to 2.5× par
- **completed** — finished, but above bronze (still counts, no medal)

To improve a tier:

1. **Replay** the mission from the NEXUS — your record is kept.
2. Aim for fewer, bigger edits: prefer `dw`/`diw`/`ciw` over deleting one char at a
   time, use `.` to repeat the last change, and counts like `3dd`.
3. The result screen tells you how many keystrokes you are from the next tier.

Exact par numbers and the formula are in
[Reference → Scoring](../reference/index.md#scoring-par-tiers).

## Find the in-game Vim reference

You do not have to leave the game to look up a key.

- Open **CIPHER → `Reference`** for the keymap overlay. It shows the same categories as
  the [Reference → Vim keymap](../reference/vim-keymap.md), revealing each as you unlock
  the matching missions.
- First-timers also get a short **Vim primer** the first time it is relevant.

## Reset your progress

Your progress (XP, unlocks, best times) lives **locally in your browser** via
IndexedDB — there is no account and nothing is uploaded.

To start over, clear the site's storage:

1. Open your browser's site-data settings for the NeuroVim origin
   (`pages.jkaindl.de`, or `localhost` if running from source).
2. **Clear site data / IndexedDB** for that origin.
3. Reload — you will be back at Level 1 with the intro.

> Because progress is per-browser and per-origin, it does not follow you across
> browsers or devices, and a private/incognito window starts fresh.

## Install the desktop app

NeuroVim also ships as a small native desktop app (a Tauri wrapper around the web app).

1. Open the [releases page](https://git.jkaindl.de/jkaindl/NeuroVIM/releases).
2. Pick the newest release and download the installer for your OS, if one is attached:
   - **macOS** — `.dmg` (Developer ID-signed + notarized; opens without a Gatekeeper
     warning).
   - **Windows** — `.exe` / `.msi` (currently **unsigned** — Windows SmartScreen may
     warn).
   - **Linux** — `.AppImage` / `.deb` / `.rpm`.
3. Install and launch. The desktop app plays like the web app; its progress is stored
   locally too, separately from any browser.

Installers are attached per release. If the release you want has none, play
[in the browser](https://pages.jkaindl.de/neurovim-standalone/) or
[build the desktop app from source](#build-the-desktop-app-from-source).

## Build the desktop app from source

Use this when no installer fits your system, or to run the newest unreleased state.

1. Install **Node + npm** and a **Rust** toolchain; on Linux also the WebKitGTK 4.1
   libraries.
2. Clone the [repository](https://git.jkaindl.de/jkaindl/NeuroVIM) and run
   `npm install` in it.
3. Build the app: `npm run build:content`, then `npx tauri build` inside
   `packages/adapter-web/`. On Linux without the packaging tools (`patchelf`), add
   `--no-bundle` to get the bare binary.
4. Launch the result from `packages/adapter-web/src-tauri/target/release/`.

Platform-specific details — macOS DMGs, a Linux build without root, a launcher entry —
are in the [desktop build guide](../../dev/how-to/build-desktop-app.md).

## Connect the CIPHER uplink

The uplink lets CIPHER talk through a language model running **on your own machine**.
You need a local OpenAI-compatible server (LM Studio, Ollama, MLX, …) with an instruct
model loaded — setting one up is covered by the
[LLM setup guide](https://uplink.jkaindl.de/llm-setup).

> **Current state:** the uplink only *connects* so far. The panel checks your server and
> remembers your model, but the web app has no CIPHER chat yet that would use it.

1. In the NEXUS, find the **Uplink** tier and click the **CIPHER — Handler uplink**
   row. It reads **OFF** until you connect.
2. Enter your server address in **Server**, e.g. `http://localhost:1234` for LM Studio
   or `http://localhost:11434` for Ollama. A trailing `/v1` is optional — NeuroVim adds
   it when it is missing. **Connect** stays disabled until the field is filled.
3. Press **Connect**. NeuroVim asks the server for its model list — nothing is contacted
   before this press.
4. Your browser asks whether this site may access your **local network**. Choose
   **Allow**.
5. Pick the model:
   - the server lists **several models** → choose one from the **Model** dropdown;
   - it lists **exactly one** → it is selected for you;
   - it publishes **no list** → type the model name the server expects.
6. The panel shows **Uplink online.** and the row switches to **ON**. Your server
   address and model survive a reload.

To switch the uplink off, press **Disconnect**. Changing the server address also
switches it off until you connect again.

**If connecting fails,** the panel shows the reason instead of a model field. Check
that the server is running at that address. If you clicked **Block** at step 4, the
browser remembers that for this site and every later attempt fails at once — pressing
Connect again does not bring the prompt back. Open the site information (the icon left
of the address bar), reset the local-network permission for this site, reload, and
connect again.

**Safari** cannot reach a local server from this page at all and offers no permission to
grant. Use Chrome, Firefox, or the desktop app. Why the uplink waits for your press:
[Explanation](../explanation/index.md#why-the-uplink-is-off-by-default).

## Play comfortably (audio, motion, mobile)

- **Audio** — NeuroVim has an optional ambient layer and sound cues. Audio is **off by
  default** and starts only after you interact; toggle it from the in-game controls.
- **Reduced motion** — if your OS is set to "reduce motion", NeuroVim honors it and
  tones down the CRT animation automatically.
- **Mobile** — the NEXUS and menus are usable on a phone (tap targets are ≥44 px), but
  the editor needs a physical keyboard, so missions are best on a laptop/desktop.
