# Visual Overhaul — Plan 3: Editor + Result

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Give the mission Editor a light cinematic HUD frame while keeping the editing canvas calm/legible, and turn the Result modal into a proper reward/fail beat (success lock-in + fail glitch), all token-driven and reduced-motion safe.

**Architecture:** Plain CSS + minimal Preact markup in `@neurovim/adapter-web`. Reuse Plan-1 primitives + tokens. The CodeMirror canvas (`cm6-theme.ts`) is **not** touched — the editor stays calm by design (spec §3 Editor). Result animations are pure CSS that play on the modal's mount (the modal re-mounts each time `result` is set), so no JS/markup logic is needed.

**Tech Stack:** Preact 10, Vite, plain CSS.

**Spec:** `docs/superpowers/specs/2026-05-29-visual-overhaul-design.md` (§3 Editor, §3 Result, §2.4 Motion, §5 reduced-motion).

---

## Verification model (same as prior plans)

`adapter-web` has no unit suite. Per task: `npm run typecheck` green · `npm test` still **153 passed** · `npm run build:web` green · reason from types/build. Motion tasks: confirm the animations live and that the global `@media (prefers-reduced-motion: reduce)` block (which sets `animation-duration: .001ms`) collapses each animation to its END state cleanly (so the resting look is correct under reduced motion). Commit each task on branch `feat/visual-overhaul-3` (created off `main` before Task 1).

---

## File structure

| File | Responsibility (after Plan 3) |
|---|---|
| `packages/adapter-web/src/styles.css` | `--nv-visual` token; `.nv-editor` HUD frame anchor; Result modal entrance + lock-in + glitch animations |
| `packages/adapter-web/src/ui/MissionEditor.tsx` | `.nv-hud-frame` brackets on the editor shell (canvas stays calm) |

---

## Task 1: Editor shell — HUD brackets + token cleanup (canvas stays calm)

**Files:** Modify `packages/adapter-web/src/ui/MissionEditor.tsx`, `packages/adapter-web/src/styles.css`.

The editor was themed in Plan 1 (CM6 phosphor theme, mode chip, run HUD). This task adds only a subtle **corner-bracket frame** around the editor shell — **no scanline/glow over the CodeMirror content** (legibility first) — and tokenizes the one hardcoded chip color.

- [ ] **Step 1: Add the HUD frame to the editor shell** in `MissionEditor.tsx`. Find the root `<div class="nv-editor">` and change it to `<div class="nv-editor nv-hud-frame">`, then add the two bottom-corner spans as the first children (top corners are `::before`/`::after`, no markup):

```tsx
    <div class="nv-editor nv-hud-frame">
      <span class="nv-br-bl" /><span class="nv-br-br" />
      {/* ...existing editor-bar, cm-host, editor-status unchanged... */}
```

(Do NOT add `.nv-crt` — the editor gets brackets only, never scanline/vignette over the text. Leave the rest of the component, the CM6 host, and `cm6-theme.ts` untouched.)

- [ ] **Step 2: Anchor the brackets + tokenize the VISUAL chip** in `styles.css`.
  - Add `position: relative;` to the `.nv-editor` rule (so the absolutely-positioned brackets anchor to it). Change `.nv-editor { max-width: 900px; margin: 0 auto; padding: 16px; }` → add `position: relative;`.
  - Add a token in `:root`: `--nv-visual: #b388ff;` (Vim VISUAL mode — a violet, the one non-palette hue, now a named token).
  - Change `.nv-mode-chip[data-mode="VISUAL"] { background: #b388ff; }` → `background: var(--nv-visual);`.

- [ ] **Step 3: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Reason: the brackets sit at the editor's corners; the CM6 content has its own opaque dark background from `cm6-theme.ts`, unaffected. Grep confirms no remaining `#b388ff` literal in `styles.css`.
- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/ui/MissionEditor.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): editor HUD frame (calm canvas) + tokenize VISUAL chip"
```

---

## Task 2: Result modal — entrance + success lock-in + fail glitch

**Files:** Modify `packages/adapter-web/src/styles.css`.

Pure-CSS animations that play once when the modal mounts (the modal re-mounts each submit). No markup change — `MissionResult.tsx` already emits `.nv-modal`, `.nv-modal-title.nv-ok` / `.nv-modal-title.nv-fail`, `.nv-modal-xp`.

- [ ] **Step 1: Add the animations** to `styles.css` (near the modal rules). Append:

```css
/* modal entrance (both states) */
.nv-modal { animation: nv-modal-in .25s var(--nv-ease) both; }
@keyframes nv-modal-in { from { opacity: 0; transform: translateY(8px) scale(.985); } to { opacity: 1; transform: none; } }

/* success: a clean "lock-in" settle on the title + an XP pop */
.nv-modal-title.nv-ok { animation: nv-lockin .5s var(--nv-ease) both; }
@keyframes nv-lockin {
  0%   { opacity: 0; transform: scale(.92); letter-spacing: 7px; filter: brightness(2.2); }
  60%  { opacity: 1; }
  100% { opacity: 1; transform: none; letter-spacing: 2px; filter: none; }
}
.nv-modal-xp { animation: nv-xp-pop .55s var(--nv-ease) .12s both; }
@keyframes nv-xp-pop { 0% { opacity: 0; transform: translateY(8px) scale(.8); } 100% { opacity: 1; transform: none; } }

/* fail: brief RGB-split glitch-in on the title, settling to the resting red glow */
.nv-modal-title.nv-fail { animation: nv-glitch .45s steps(2, jump-end) both; }
@keyframes nv-glitch {
  0%   { transform: translateX(-3px); text-shadow: 2px 0 var(--nv-fail), -2px 0 var(--nv-accent); }
  25%  { transform: translateX(3px);  text-shadow: -2px 0 var(--nv-fail), 2px 0 var(--nv-accent); }
  50%  { transform: translateX(-1px); text-shadow: 1px 0 var(--nv-fail); }
  75%  { transform: translateX(1px);  text-shadow: -1px 0 var(--nv-accent); }
  100% { transform: none; text-shadow: 0 0 14px color-mix(in oklab, var(--nv-fail) 50%, transparent); }
}
```

Note: the `.nv-modal-title.nv-fail` already has a static `text-shadow` in its base rule; the animation's `100%` keyframe lands on an equivalent resting glow, so the post-animation state matches. The success `.nv-modal-title.nv-ok` base rule keeps its static shadow; `nv-lockin` ends at `filter:none`/`transform:none` so the base shadow shows through after.

- [ ] **Step 2: Verify** — `npm run typecheck` (no TS change) + `npm test` (153) + `npm run build:web` green. **Reduced-motion check (reason it through):** the global `@media (prefers-reduced-motion: reduce)` block sets `animation-duration: .001ms !important; animation-iteration-count: 1 !important` on `*` — so each of these animations snaps to its `100%`/`to` state instantly: modal visible, title settled (no glitch jitter), XP visible. Confirm each animation's END keyframe is the correct resting state (it is). No layout shift remains after animations finish (`transform: none`).
- [ ] **Step 3: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Result modal — entrance, success lock-in, fail glitch (reduced-motion safe)"
```

---

## Task 3: Screenshots (Editor + Result) + full gate

**Files:** Modify `docs/screenshots/04-editor.png`, `docs/screenshots/05-result-modal.png`.

- [ ] **Step 1: Full gate** — `npm run typecheck && npm test && npm run build:web` (153) green.
- [ ] **Step 2: Recapture** `04-editor.png` and `05-result-modal.png` via Playwright against a local dev build (1280×860 @2×, `document.fonts.ready` before each shot; set `sessionStorage['nv-booted']='1'` to skip the boot intro):
  - Editor: Welcome → click `.nv-welcome-enter` → click first `.nv-row` (M-01) → click `.nv-doc .nv-submit` (Begin Mission) → wait `.nv-cm-host .cm-content` → move mouse away → shot `04-editor.png`.
  - Result: in the editor, solve M-01 — focus `.cm-content`, `Escape`, select-all + delete (`ggVGd`), `i`, `insertText(<M-01 solution body>)`, `Escape`, click `.nv-editor .nv-submit` → wait `.nv-modal` → wait ~600ms (let the lock-in animation settle) → shot `05-result-modal.png`. (The M-01 solution body is `packages/content/src/solutions/M-01-SOLUTION-The_Three_Modes.md`.)
- [ ] **Step 3: Commit**

```bash
git add docs/screenshots/04-editor.png docs/screenshots/05-result-modal.png
git commit -m "docs: refresh Editor + Result screenshots (plan 3)"
```

---

## Self-review (plan author)

- **Spec coverage:** §3 Editor (cinematic frame via brackets, canvas stays calm — T1) · §3 Result (success lock-in + level-up beat already present + fail glitch — T2) · §2.4 Motion (settle pulse, glitch-in, XP pop — T2) · §5 reduced-motion (animations collapse to end-state — T2) · §2.2 token (VISUAL chip tokenized — T1). **Out of scope (later plans):** Sandbox, audio cue pendants, lore reader, cheatsheet, a11y audit, states.
- **Placeholder scan:** none — concrete code/keyframes in every step.
- **Type consistency:** no new types; class names (`.nv-modal*`, `.nv-mode-chip[data-mode]`, `.nv-editor`, `.nv-hud-frame`, `.nv-br-bl/br`) all pre-exist or are Plan-1 primitives.

## Remaining plans
4. Sandbox + full audio-cue pendants · 5. Lore reader + Cheatsheet · 6. A11y audit + states (first-run/all-cleared/mobile) + full screenshot refresh + token cleanup (orphaned `--nv-co-success`).
