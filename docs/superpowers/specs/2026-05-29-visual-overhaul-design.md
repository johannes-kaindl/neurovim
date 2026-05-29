# NeuroVim Web — Visual Overhaul (Design Spec)

> **Audience:** a designer or a Claude-as-designer instance executing a full
> visual/UX overhaul of the standalone web app (`@neurovim/adapter-web`). This is a
> **standalone brief** — you should not need to ask follow-up questions to start.
> Code lives in `packages/adapter-web/src/`. Tokens live in `styles.css :root`.
>
> **Relationship to the earlier spec:** `docs/DESIGN-SPEC.md` was the *polish pass*
> (now implemented). **This spec supersedes it** and sets a higher bar: the current
> UI is competent but reads amateurish. The goal is a deliberately art-directed,
> **cinematic CRT/HUD** look that feels like a real product — without sacrificing
> legibility or performance.
>
> **North-star mockup:** open `docs/design-source/redesign/nexus-northstar.html` in a
> browser — it shows the target NEXUS at full fidelity. The look below should match
> its spirit across every screen.

---

## 1 · Direction (ratified)

**Cinematic CRT / HUD, full intensity, applied with discipline.** Descends from the
original "Kuro" terminal theme and the `docs/design-source/NeuroVim - Operative
Console.html` mockup. The single most important principle:

> **A disciplined type scale + generous spacing carry the design. Effects (glow,
> scanline) are seasoning, not the meal.** The amateur tell is glow everywhere; the
> pro move is restraint over a strong typographic skeleton.

**Anti-goals:** neon soup, glow on every element, motion that distracts while the
player is reading or editing, illegible retro type for body copy, SaaS-dashboard
blandness.

---

## 2 · Design system

### 2.1 Type — exactly two faces, self-hosted

| Face | Role | Notes |
|---|---|---|
| **VT323** (retro CRT) | **Display only** — wordmarks, big screen titles | Heavy character; never below ~28px; never for body or runs of text |
| **JetBrains Mono** | **Everything else** — body, mission IDs, HUD labels, editor, buttons, stats | HUD/section labels = JetBrains Mono **uppercase + letter-spacing ~2–3px**, not a third font |

- Self-host both as subsetted `woff2` under `packages/adapter-web/src/fonts/` (JetBrains
  Mono already there; add VT323, OFL — include its license). `font-display: swap`.
- **Do NOT introduce a third font** (Share Tech Mono etc. was considered and rejected).
- Define a real **type scale** (suggested, tune to taste): display 56–72 (VT323),
  h1 28, h2 20, body 15/16 (line-height 1.6), small 13, micro 11 (uppercase labels).
  No ad-hoc font sizes — everything maps to a scale step.

### 2.2 Color — semantic, story-coupled (tokens, never inline hex)

Small, intentional palette tied to the fiction. Extend `:root` in `styles.css`:

| Meaning | Token | Value (tune) |
|---|---|---|
| Resistance / you / primary | `--nv-accent` | `#39ff7a` (phosphor green) |
| Hot accent (success lock-in, hero, active) | `--nv-accent-hot` | `#9dffc2` |
| **CORP / locked / caution** | `--nv-amber` | `~#ffb02e` |
| **Fail / glitch / corruption** | `--nv-fail` | `~#ff5b5b` |
| Background / panel / border / text / muted | `--nv-bg` `--nv-panel` `--nv-border` `--nv-text` `--nv-muted` | dark, near-black with green cast |

- Green = the player/Resistance. **Amber = CORP and everything locked/gated/caution**
  (locked missions, level gates, `[!warning]` callouts). **Red = failure/glitch/corruption.**
- Muted text MUST clear **4.5:1** on its background (verify; the current muted green is borderline).

### 2.3 Effects — with a budget

- **Frame the experience, don't coat it.** Scanline overlay + vignette + HUD corner
  brackets establish the CRT frame at the screen level.
- **Glow is reserved** for hero/state moments only: the wordmark, the **active** mission
  row, success / level-up, XP-gain. Not on every row, label, or border.
- Tokenize the dials: `--nv-glow` (multiplier, `0` = flat) and `--nv-scan` (scanline
  opacity, `0` = off). These already exist — keep them and make them the lever for the
  "reduce effects" toggle (§5) and reduced-motion.
- Scanline/vignette via cheap CSS overlays; glow via `text-shadow`/`box-shadow`. No
  canvas/WebGL, no JS animation libraries.

### 2.4 Motion

- Signature beats: cursor blink on `>_` prompts; a short **boot/typing intro** on
  Welcome; **glitch-in** (brief RGB-split/jitter) on fail/corruption; a clean
  **settle/lock-in pulse** + accent flash on success and XP-gain; XP-bar fill.
- Everything non-essential sits behind `@media (prefers-reduced-motion: reduce)` and is
  neutralized there (including the XP transition and the blink).
- No perpetual motion in reading/editing contexts — the editor canvas does not animate.

---

## 3 · Surfaces (apply the system to every screen)

All views are in `packages/adapter-web/src/ui/`. Styling funnels through
`styles.css`; the editor theme is `cm6-theme.ts`.

### Welcome (`WelcomeView.tsx`)
First impression. VT323 wordmark `>_ NEUROVIM` with reserved glow + blinking cursor.
A short **boot/typing intro** (reference `docs/design-source/Boot Sequence.html`) —
CIPHER's lines type in, then the `Enter NEXUS →` CTA pulses. Scanline + vignette frame.
Reduced-motion: render fully, no typing.

### NEXUS (`App.tsx`) — **biggest change**
Match `nexus-northstar.html`. Status strip (`KURO SIGNAL PROTOCOL // GUARDIAN · ◢ LINK
SECURE`), audio toggle (♪) top-right, operator line (LVL · title · `XP → next`), glowing
XP bar, stats strip. **Group missions by tier/chapter** with labelled dividers (the data
has tiers; the picker currently renders one flat ARC I list). Row states:
- **active** (next playable) — `▸`, accent border + reserved glow
- **done** — dimmed, `✓`, best time/keystrokes
- **locked** — amber, dashed, `🔒 LVL n` gate, **not clickable**
- **ARC II** rows appear here too, **visible but locked** (amber, "ARC II" tag) so the
  full campaign is legible even before web-enablement (see §4).

### Briefing (`BriefingView.tsx`, `markdown.ts`)
Type-aware callouts already wired via `:has()` (D25) — extend to the semantic palette:
`[!warning]`/CORP → amber, `[!tip]` → green, `[!success]` → hot green, `[!quote]`/CIPHER
→ accent. Lean into the ASCII-art header box (it's a highlight); keep the `<pre>` a calm
dark canvas (no scanline over code). Two CTA pairs (top + foot) with clear focus order.

### Editor (`MissionEditor.tsx`, `SandboxView.tsx`, `cm6-theme.ts`) — **keep calm**
The editor is the heart. **Cinematic frame around it, calm canvas inside.** The CM6 theme
(dark gutter, phosphor caret, accent selection, vim block cursor, mode chip) stays; do
**not** put scanline/vignette/glow over the editable text — legibility first. The
Vim-mode chip (NORMAL/INSERT/VISUAL) and run HUD (timer/keystrokes) carry the HUD flavor
in the surrounding bars.

### Result (`MissionResult.tsx`)
The reward beat. Success: clean **settle/lock-in pulse**, big glowing `+XP`, corner-bracket
modal, a proper **level-up** moment (more than one line). Fail: **glitch-in** on the title
+ red, diegetic ("transmission still corrupted"), encouraging Retry. Focus-trap,
`role="dialog"`, Escape-to-close, initial focus on primary action.

### Sandbox (`SandboxView.tsx`)
THE RAVEN. Difficulty tiles with escalating menace (EASY green → HARD amber/red, already
present). Prominent live run HUD (elapsed + glitches-left, present). Result banner gets a
restrained "signal restored" celebration. Glitch-fix → subtle accent flash on the counter.

### New surfaces (content exists in core/content, no UI yet)
- **Lore / Loot reader** — `getLore(id)` returns loot/fragments/characters/ref. Add a
  read view (modal or route) so the unlockable story layer (6 loot, 10 fragments) is
  actually viewable. Locked entries shown amber until unlocked.
- **Cheatsheet panel** — core has `CheatSheetModule` + `data/cheatsheet`; surface it as a
  toggle/overlay (keyboard reference), available from NEXUS and the editor.
- **Audio toggle** — persistent unobtrusive `♪`/mute glyph (top-right, every view).
  Audio defaults OFF, unlocks on first gesture (D4). **Every audio cue needs a visual
  pendant** so the game is fully playable muted (complete → modal; level-up → its beat;
  wrong → fail glitch; glitch-fix → counter flash). One-time first-run hint that audio
  exists (tie to the unused `onboarded` flag in `PluginData`).

---

## 4 · Content surfacing & ARC II (scope boundary)

The web app currently exposes **only ARC I** (`listMissions('I')`) + the RAVEN sandbox —
roughly 40% of the campaign. The design must make the **full game legible**: tiered NEXUS,
ARC II rows shown (locked), lore/cheatsheet surfaced.

> **Scope boundary:** *enabling* ARC II to be playable is **separate engineering**, not
> design. ARC II missions teach Vim regex substitution; CodeMirror-vim needs `nopcre` as
> default + a small `\{-}` lazy-quantifier translate extension in the web `VimModeSource`,
> after a regression test against ARC I search missions (see
> `experiments/vim-regex-findings.md`, ADR-001 D1). This spec only defines **how ARC II
> rows look** (visible, amber, locked, "ARC II" tag) and how they slot into the tiered
> NEXUS once enabled.

---

## 5 · Accessibility & "calm mode"

- **Contrast:** all text ≥ 4.5:1 against its background; verify muted/secondary text and
  accent-on-panel. Scanline/vignette must not push any text below threshold.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables blink, typing
  intro, glitch, pulses, and the XP transition.
- **Reduce-effects toggle:** an in-app control (persisted) that sets `--nv-scan: 0` and
  lowers `--nv-glow` for users who want a flat, calm UI regardless of OS setting.
- **Focus:** visible focus rings everywhere (`:focus-visible`), logical focus order,
  modal focus-trap, the Vim-mode chip announced via `aria-live`.

---

## 6 · States & responsive

- **First run:** level 1, nothing cleared, everything beyond M-01 locked (amber). The
  NEXUS must look intentional when almost everything is gated.
- **All cleared / max level:** a satisfying end state, not a dead screen.
- **Long lists:** tiered grouping + scroll; the active row should be easy to find.
- **Mobile (≤560px):** legible and navigable, tap targets ≥44px. Vim needs a physical
  keyboard, so a one-time honest "best on desktop" note is acceptable; the briefing/lore
  must still read well on a phone.

---

## 7 · Tech constraints (read before styling)

- **Stack:** Preact 10 + plain CSS. **No Tailwind, no CSS-in-JS, no UI kit, no JS
  animation libs.** Hand-written BEM-ish `nv-*` classes.
- **Tokens, not hex:** everything funnels through `--nv-*` in `styles.css :root`. New
  colors/effects become `:root` variables.
- **Fonts self-hosted** (`src/fonts/`), subsetted `woff2`, `font-display: swap`; ship the
  OFL license for VT323. No external font CDN at runtime.
- **Bundle budget:** the app is code-split (initial ~310 KB; CM6 ~410 KB lazy; `marked`
  ~43 KB lazy). New fonts add ~25 KB; keep effects CSS-only. Justify any new dependency.
- **Don't break the flow/tests:** routing `welcome → nexus → briefing → mission`
  (+ `nexus → sandbox`); the 150-test suite + 4-workspace typecheck must stay green.
  Styling/markup changes shouldn't touch game logic.

---

## 8 · Where things live (implementation map)

| Concern | File |
|---|---|
| Tokens, all web styles | `packages/adapter-web/src/styles.css` |
| Fonts | `packages/adapter-web/src/fonts/` (add VT323 + OFL) |
| Editor theme | `packages/adapter-web/src/ui/cm6-theme.ts` |
| Markdown / callouts | `packages/adapter-web/src/ui/markdown.ts` |
| Views | `packages/adapter-web/src/ui/{WelcomeView,App,BriefingView,MissionEditor,MissionResult,SandboxView}.tsx` |
| New: Lore reader, Cheatsheet | new components in `src/ui/`, consuming `getLore` / `data/cheatsheet` from core |
| Content API | `@neurovim/content` (`listMissions`, `getMission`, `getLore`, `getSandboxSource`, `getWelcome`) |

**Iteration unit:** small, reviewable CSS/markup patches per surface so each can be
checked against tests/build and screenshotted. Regenerate `docs/screenshots/` after the
overhaul (Playwright against the live build; the existing capture flow works).

---

## 9 · References

- North-star mockup: `docs/design-source/redesign/nexus-northstar.html`
- Cinematic reference: `docs/design-source/NeuroVim - Operative Console.html`, `Boot Sequence.html`
- Current state: `docs/screenshots/` (pre-overhaul)
- Brand: `docs/brand/` (Chrome Raven icon, OG card)
- Prior brief (polish pass, implemented): `docs/DESIGN-SPEC.md`
- Architecture & conventions: `AGENTS.md`
