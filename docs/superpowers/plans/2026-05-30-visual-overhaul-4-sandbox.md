# Visual Overhaul — Plan 4: Sandbox + audio-cue pendants

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Bring THE RAVEN sandbox to the cinematic-CRT direction (VT323 header + CRT frame on the pick screen, token-aligned tiles, run/result polish), and add the missing **visual pendant** for the sandbox's failed-submit feedback so the game stays fully playable muted.

**Architecture:** Plain CSS + small Preact markup in `@neurovim/adapter-web`. Reuse Plan-1 primitives (`.nv-crt`/`.nv-hud-frame`/`.nv-wordmark`/`.nv-text-glow`) + tokens. The sandbox active/result already use `.nv-editor` (which got HUD brackets in Plan 3) and the run HUD `.nv-sandbox-hud`. One small state addition (`missKey`) drives a CSS flash on a failed submit.

**Tech Stack:** Preact 10, Vite, plain CSS, CodeMirror (untouched).

**Spec:** `docs/superpowers/specs/2026-05-29-visual-overhaul-design.md` (§3 Sandbox, §6 audio pendants).

> **Audio-pendant status (context):** mission complete / level-up / wrong-attempt already have visual pendants (Result modal lock-in / level-up beat / fail glitch — Plans 1+3). The remaining gap is the **sandbox failed-submit feedback** — this plan adds it. (The one-time "audio exists" first-run hint is deferred to Plan 6.)

---

## Verification model (same as prior plans)

`adapter-web` has no unit suite. Per task: `npm run typecheck` green · `npm test` still **153 passed** · `npm run build:web` green · reason from types/build. Motion: confirm reduced-motion collapses animations to a clean end state. Branch: `feat/visual-overhaul-4` off `main` before Task 1.

---

## File structure

| File | Responsibility (after Plan 4) |
|---|---|
| `packages/adapter-web/src/ui/SandboxView.tsx` | pick-screen CRT frame + VT323 header; failed-submit flash (`missKey`) |
| `packages/adapter-web/src/styles.css` | sandbox header reuse + result celebration + `.nv-flash` keyframe; remove orphaned `.nv-nexus-head h1` |

---

## Task 1: Sandbox pick screen — CRT frame + VT323 header

**Files:** Modify `packages/adapter-web/src/ui/SandboxView.tsx`, `packages/adapter-web/src/styles.css`.

- [ ] **Step 1: Re-skin the pick-phase markup.** In `SandboxView.tsx`, replace the `if (phase === 'pick')` return's outer structure: wrap in the CRT frame and use the shared `.nv-wordmark` header (drop the old `.nv-nexus-head`). Replace:

```tsx
  if (phase === 'pick') {
    return (
      <div class="nv-app nv-crt nv-hud-frame">
        <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
        <div class="nv-statusstrip"><span class="nv-label">Kuro Signal Protocol // Sandbox</span><span class="nv-label nv-link">◢ THE RAVEN</span></div>
        <h1 class="nv-wordmark nv-text-glow">&gt;_ RAVEN<span class="nv-caret">_</span></h1>
        <p class="nv-sandbox-intro">CORP injected noise into the transmission. Restore it with Vim. Beat the clock.</p>
        <div class="nv-sandbox-diffs">
          {DIFFS.map((d) => (
            <button key={d} class="nv-sandbox-diff" onClick={() => begin(d)}>
              <span class="nv-sandbox-diff-name">{d.toUpperCase()}</span>
              <span class="nv-sandbox-diff-count">{GlitchEngine.countForDifficulty(d)} glitches</span>
              {bests[d] !== null && <span class="nv-sandbox-diff-pb">PB {fmtTime(bests[d]!)}</span>}
            </button>
          ))}
        </div>
        <button class="nv-sandbox-back" onClick={onExit}>← NEXUS</button>
      </div>
    );
  }
```

- [ ] **Step 2:** In `styles.css`, the `.nv-app` needs the frame anchor — `.nv-crt` already provides `position: relative`, so no change needed. **Remove the now-orphaned `.nv-nexus-head h1` rule** (and its `/* kept: SandboxView … */` comment) — SandboxView no longer uses `.nv-nexus-head`. Confirm via grep that no `.tsx` references `nv-nexus-head` anymore.
- [ ] **Step 3:** Give the sandbox a touch of breathing room: ensure `.nv-sandbox-intro` sits under the wordmark (it already has `margin`); add `.nv-sandbox-diffs { margin-top: var(--nv-s4); }` if the spacing looks tight (optional, keep if it reads better). Tiles + HARD escalation already exist — leave them.
- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Grep: zero `nv-nexus-head` references in `src/**/*.tsx`; the `.nv-nexus-head h1` CSS rule removed.
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/SandboxView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Sandbox pick — CRT frame + VT323 RAVEN header"
```

---

## Task 2: Sandbox run/result — failed-submit flash pendant + restored celebration

**Files:** Modify `packages/adapter-web/src/ui/SandboxView.tsx`, `packages/adapter-web/src/styles.css`.

- [ ] **Step 1: Add a `missKey` to drive the flash.** In `SandboxView.tsx`, add state and bump it on a failed submit:

```tsx
  const [missKey, setMissKey] = useState(0);
```
In `begin()`, reset it: add `setMissKey(0);` alongside the other resets.
In `submit()`, in the `if (left > 0)` branch, after `setRemaining(left);` add `setMissKey((k) => k + 1);`.

- [ ] **Step 2: Apply the flash to the run-HUD remaining cell.** In the active-phase markup, change the remaining cell to remount + flash on each miss:

```tsx
        <div class={`nv-cell nv-rem${missKey ? ' nv-flash' : ''}`} key={missKey}>
          <div class="nv-v">{remaining ?? injected}</div><div class="nv-k">Glitches left</div>
        </div>
```

(The `key={missKey}` forces a remount each miss so the CSS animation re-runs; `missKey ? ' nv-flash'` keeps the very first mount — run start, `missKey===0` — un-animated.)

- [ ] **Step 3: Add the flash + a restrained result celebration** to `styles.css` (near the sandbox rules):

```css
/* failed-submit pendant — a brief red jolt on the glitches-left cell (visual cue when muted) */
.nv-sandbox-hud .nv-cell.nv-flash { animation: nv-miss .5s ease; }
@keyframes nv-miss {
  0%, 100% { background: transparent; }
  10% { background: color-mix(in oklab, var(--nv-fail) 28%, transparent); transform: translateX(-3px); }
  30% { transform: translateX(3px); }
  55% { transform: translateX(-1px); background: color-mix(in oklab, var(--nv-fail) 12%, transparent); }
}
.nv-sandbox-hud .nv-cell.nv-flash .nv-v { color: var(--nv-fail); }

/* "transmission restored" — a restrained signal-lock celebration (grim satisfaction, not confetti) */
.nv-sandbox-result { animation: nv-restore .5s var(--nv-ease) both; }
@keyframes nv-restore { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: none; } }
.nv-sandbox-result-msg { animation: nv-restore-glow 1.1s var(--nv-ease) 1; }
@keyframes nv-restore-glow {
  0% { text-shadow: 0 0 2px var(--nv-accent); }
  35% { text-shadow: 0 0 calc(18px * var(--nv-glow)) var(--nv-accent), 0 0 calc(40px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 50%, transparent); }
  100% { text-shadow: 0 0 calc(10px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 40%, transparent); }
}
```

Note: the `.nv-sandbox-result-msg` base rule already has a resting `text-shadow`; the `nv-restore-glow` `100%` lands on an equivalent resting glow. The `.nv-cell.nv-flash .nv-v` color override only applies during the brief animation (the cell remounts cleanly after).

- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Reason: on a failed submit `missKey` bumps → the `.nv-rem` cell remounts with `.nv-flash` → red jolt; on a clean submit the result banner slides in + the message glows once and settles. Reduced-motion collapses all to end states (cell shows count, result visible, message at resting glow). Confirm no leftover transform on the cell after animation (`nv-miss` ends at `0%,100%` = no transform).
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/SandboxView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Sandbox — failed-submit flash pendant + restored celebration"
```

---

## Task 3: Screenshots (Sandbox pick + active) + full gate

**Files:** Modify `docs/screenshots/06-sandbox.png` (pick screen).

- [ ] **Step 1: Full gate** — `npm run typecheck && npm test && npm run build:web` (153) green.
- [ ] **Step 2: Recapture** `06-sandbox.png` via Playwright (1280×860 @2×, `document.fonts.ready`, `sessionStorage['nv-booted']='1'`): Welcome → `.nv-welcome-enter` → click the Sandbox RAVEN row in NEXUS (`page.locator('section.nv-tier').last().locator('.nv-row')` — the Sandbox tier's row; or find the `.nv-row` whose `.nv-row-id` text is "RAVEN") → wait `.nv-sandbox-diff` → move mouse away → shot. (Optionally also capture an active run as a new `docs/screenshots/06b-sandbox-active.png` if useful — optional.)
- [ ] **Step 3: Commit**

```bash
git add docs/screenshots/06-sandbox.png
git commit -m "docs: refresh Sandbox screenshot (plan 4)"
```

---

## Self-review (plan author)

- **Spec coverage:** §3 Sandbox (VT323 header + CRT frame T1, tiles/HARD escalation already present, run HUD present, restrained restored celebration T2) · §6 audio pendant (sandbox failed-submit flash T2 — the remaining gap; complete/level-up/fail already covered earlier). **Out of scope (later plans):** lore reader, cheatsheet, audio first-run hint, a11y audit, states.
- **Placeholder scan:** none — concrete code/keyframes throughout.
- **Type consistency:** `missKey` state + its uses; `.nv-flash`/`nv-miss`/`nv-restore`/`nv-restore-glow` consistent between SandboxView (T2) and styles (T2); `.nv-wordmark`/`.nv-caret` reused from NEXUS.

## Remaining plans
5. Lore/Loot reader + Cheatsheet panel · 6. A11y audit + states (first-run/all-cleared/mobile) + audio first-run hint + full screenshot refresh + token cleanup (orphaned `--nv-co-success`).
