# Visual Overhaul — Plan 6: A11y sign-off + states + audio hint + cleanup

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Close out the visual overhaul: record the (passing) WCAG contrast audit + remove dead tokens, raise sub-44px tap targets for mobile, add the two missing player-state cues (one-time first-run audio hint + an Arc-I-complete badge), and refresh the screenshots — so the web app is deploy-ready.

**Architecture:** Plain Preact + CSS in `@neurovim/adapter-web`. **No core/engine/port/content changes.** The `onboarded` flag already exists in `PluginData` + `DEFAULT_PLUGIN_DATA` (used by the Obsidian adapter, unused on web) and is persisted for free through the existing `WebStorage` IndexedDB path — the audio hint reuses it. The contrast audit (run during planning) found **all 13 token pairs pass WCAG 2.1 AA** (min 6.02:1; the scanline overlay is contrast-neutral because it sits behind content and darkens an already-near-black background), so **no color values change** — only a stale guidance comment and one dead token are removed. Motion is already complete (the global `prefers-reduced-motion` block neutralizes every keyframe incl. Plan-5's `nv-sheet-in`), so §5 needs no work. The remaining mobile gap is purely tap-target sizing, handled by extending the existing `@media (max-width: 560px)` block.

**Tech Stack:** Preact 10, Vite, plain CSS (`--nv-*` tokens).

**Spec:** `docs/superpowers/specs/2026-05-29-visual-overhaul-design.md` (§3 audio toggle/first-run hint; §5 a11y contrast 4.5:1 + focus; §6 mobile ≤560px, tap targets ≥44px; §4 make-the-game-legible → all-cleared state).

**Audit results baked into this plan (computed during planning, sRGB WCAG 2.1):**
- Every foreground/background pair passes: text/bg 14.5, text/panel 13.3, **muted/bg 7.51, muted/panel 6.90**, accent/bg 15.0, accent/panel 13.8, accent-hot/panel 15.3, amber/bg 10.9, amber/panel 10.0, **fail/panel 6.02 (system floor)**. All ≥4.5:1. → **no token color change.**
- Dead token: `--nv-co-success` (styles.css:79) has **zero `var()` consumers** (the live `.nv-co-success` *class* uses `var(--nv-accent-hot)` directly) → safe to delete.
- Sub-44px tap targets: `.nv-ctl` (~19px, worst), `.nv-row` (~40px), `.nv-card` (~39px), `.nv-sheet-x`/`.nv-editor-keys` (~28px), `.nv-doc-bar button` (~32px), `.nv-sandbox-back` (~36px).
- `onboarded`: `types.ts` PluginData + `DEFAULT_PLUGIN_DATA` (=false), unused on web; persisted via WebStorage.

**Resolved decisions:** first-run audio hint persists via `data.onboarded` (IndexedDB, the spec-intended field — *not* settings.ts localStorage); dismissed on its × **or** on first audio toggle. All-cleared shows an additive "Arc I complete" badge (no nag, gentle nudge to RAVEN). Out of scope (noted, not done): CM6 editor syntax-color audit (separate editor-theme concern); an intermediate tablet breakpoint; `data-fx=off` suppressing entrance animations (reduced-motion already covers the a11y need).

---

## Verification model (same as prior plans)

`adapter-web` has **no** unit suite. Per task: `npm run typecheck` green · `npm test` (153: core 139 / content 8 / obsidian 6) green · `npm run build:web` green · reason from types/build. No content rebuild (no `.md`/generated changes). Branch: `feat/visual-overhaul-6` off `main` before Task 1. **Anti-revert discipline:** all edits to `styles.css`, `App.tsx`, `Chrome.tsx` are TARGETED Edits — never full-file Write of an existing file (a Plan-4 subagent silently reverted prior work that way; the Plan-6 final review re-checks the full `main...HEAD` diff).

---

## File structure

| File | Responsibility (after Plan 6) |
|---|---|
| `packages/adapter-web/src/styles.css` | drop dead `--nv-co-success`; fix `--nv-muted` audit comment; generalize `.nv-link`; mobile tap-targets in the `@media` block; `.nv-audiohint`/`.nv-allclear` rules |
| `packages/adapter-web/src/ui/Chrome.tsx` | new `AudioHint` presentational component |
| `packages/adapter-web/src/ui/App.tsx` | `markOnboarded()` helper; render `AudioHint` when `!data.onboarded`; call it from `toggleAudio`; all-cleared badge |
| `docs/screenshots/*` | refreshed (incl. a first-run-hint + all-cleared capture) |

---

## Task 1: A11y sign-off — token cleanup (no color changes)

**Files:** Modify `packages/adapter-web/src/styles.css`.

- [ ] **Step 1: Delete the orphaned `--nv-co-success` token.** Remove line 79 entirely:

```css
  --nv-co-success: var(--nv-accent-hot);  /* callout success marker colour */
```

First confirm it is dead: `grep -rn "var(--nv-co-success)" packages/adapter-web/src` → expect **zero** matches. (The `.nv-co-success` *class* — the success-callout rule — does NOT use the token and must remain untouched.)

- [ ] **Step 2: Resolve the stale `--nv-muted` guidance comment** (line 41). Replace:

```css
  --nv-muted: #8aa68a;          /* verify ≥4.5:1 on --nv-bg; bump toward #9bb39b if it fails */
```
with:
```css
  --nv-muted: #8aa68a;          /* AA-verified: 7.51:1 on --nv-bg, 6.90:1 on --nv-panel (worst case) */
```

- [ ] **Step 3: Generalize `.nv-link`** so non-statusstrip surfaces can use it (currently scoped to `.nv-statusstrip .nv-link`). Replace line 143:

```css
.nv-statusstrip .nv-link { color: var(--nv-accent); }
```
with:
```css
.nv-link { color: var(--nv-accent); }
```

(Broadens the selector — every existing `nv-label nv-link` inside a statusstrip keeps its color; no markup change needed.)

- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Grep confirms `--nv-co-success` is gone from `:root` and still has zero `var()` consumers; the `.nv-co-success` class rule (callout) is intact (`grep -n "\.nv-co-success" styles.css` still present).
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "chore(adapter-web): a11y contrast sign-off — drop dead --nv-co-success token, resolve audit comment, generalize .nv-link"
```

---

## Task 2: Mobile tap targets (≥44px) — extend the existing breakpoint

**Files:** Modify `packages/adapter-web/src/styles.css`.

The app already has an `@media (max-width: 560px)` block (currently ending at line ~500). **Extend it** — do not add a second breakpoint. The audit found these interactive elements below the 44px minimum.

- [ ] **Step 1: Add tap-target rules** inside the existing `@media (max-width: 560px) { … }` block (insert before its closing `}`):

```css
  /* tap targets ≥44px (a11y §6) */
  .nv-ctl { min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 3px 10px; }
  .nv-row { min-height: 44px; }
  .nv-card { min-height: 44px; }
  .nv-sheet-x, .nv-editor-keys, .nv-doc-bar button, .nv-sandbox-back { min-height: 44px; }
  /* cheatsheet drawer goes full-screen on a phone; hint clears the now-taller controls */
  .nv-sheet { width: 100%; }
  .nv-audiohint { top: 64px; right: 12px; left: 12px; max-width: none; }
```

(The `.nv-audiohint` selector is styled in Task 3; listing it here in the breakpoint is forward-compatible — the rule simply has no effect until Task 3 renders the element. Keep it here so all mobile rules live in one block.)

- [ ] **Step 2: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Reason: the rules only add `min-height`/`min-width`/layout inside the ≤560px media query; desktop is unchanged. `.nv-ctl` becomes a centered 44×44 hit target; NEXUS rows + archive cards clear 44px; the cheatsheet drawer fills the phone width; the doc-bar/editor-keys/sandbox-back buttons reach 44px. No logic touched.
- [ ] **Step 3: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "fix(adapter-web): raise sub-44px tap targets + full-width cheatsheet drawer on mobile (≤560px)"
```

---

## Task 3: First-run audio hint + Arc-I-complete badge

**Files:** Modify `packages/adapter-web/src/ui/Chrome.tsx`, `packages/adapter-web/src/ui/App.tsx`, `packages/adapter-web/src/styles.css`.

- [ ] **Step 1: Add the `AudioHint` component** to `Chrome.tsx` (append after `ControlCluster`):

```tsx
/** One-time first-run cue: audio is off by default; points at the ♪ control. Non-blocking (role=status). */
export function AudioHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div class="nv-audiohint" role="status" aria-live="polite">
      <span>Audio is off — click <b>♪</b> above to bring the signal online.</span>
      <button class="nv-audiohint-x" aria-label="Dismiss hint" onClick={onDismiss}>×</button>
    </div>
  );
}
```

- [ ] **Step 2: Wire `App.tsx`.** Four edits:

  1. Extend the Chrome import (line 18):
  ```tsx
  import { ControlCluster, AudioHint } from './Chrome';
  ```
  2. Add a `markOnboarded()` helper — place it next to `saveSandboxBest` (after the `toggleEffects` function, ~line 85):
  ```tsx
  async function markOnboarded() {
    if (data.onboarded) return;
    const next = { ...data, onboarded: true };
    setData(next);
    await storage.saveData(next);
  }
  ```
  3. Retire the hint when the player enables sound — append `markOnboarded();` to `toggleAudio` (lines 81-84):
  ```tsx
  function toggleAudio() {
    const next = { ...ui, audioOn: !ui.audioOn }; setUi(next); saveSettings(next);
    if (next.audioOn) { unlockAudio(); audio.setMuted(false); } else { audio.setMuted(true); }
    markOnboarded();
  }
  ```
  4. Render the hint in the NEXUS return, immediately after the `<ControlCluster … />` (line 221-222):
  ```tsx
      {!data.onboarded && <AudioHint onDismiss={markOnboarded} />}
  ```

- [ ] **Step 3: Add the all-cleared badge** in the NEXUS return, immediately after the `.nv-stats` div (after line 239, before the `arc1Groups.map`):

```tsx
      {arc1.length > 0 && cleared === arc1.length && (
        <div class="nv-allclear">✓ Arc I complete — every transmission restored. THE RAVEN awaits.</div>
      )}
```

- [ ] **Step 4: Add the CSS** to `styles.css` (append near the NEXUS rules, after the `.nv-ctl` block ~line 188):

```css
/* first-run audio hint — one-time, persisted via PluginData.onboarded; non-blocking, no backdrop */
.nv-audiohint {
  position: absolute; top: 48px; right: 36px; z-index: 4; max-width: 240px;
  display: flex; gap: var(--nv-s2); align-items: flex-start;
  background: color-mix(in oklab, var(--nv-panel) 92%, var(--nv-bg));
  border: 1px solid color-mix(in oklab, var(--nv-accent) 40%, var(--nv-border));
  border-radius: 4px; padding: var(--nv-s2) var(--nv-s3);
  color: var(--nv-text); font-size: var(--nv-fs-sm); line-height: 1.4;
  animation: nv-modal-in .18s var(--nv-ease) both;
}
.nv-audiohint b { color: var(--nv-accent); }
.nv-audiohint-x { background: none; border: none; color: var(--nv-muted); font-size: 16px; line-height: 1; cursor: pointer; padding: 0 2px; }
.nv-audiohint-x:hover, .nv-audiohint-x:focus-visible { color: var(--nv-accent); }

/* all-cleared badge — Arc I fully restored (additive, gentle) */
.nv-allclear {
  margin-top: var(--nv-s3); padding: var(--nv-s2) var(--nv-s3); border-radius: 4px;
  color: var(--nv-accent); font-size: var(--nv-fs-sm);
  border: 1px solid color-mix(in oklab, var(--nv-accent) 45%, var(--nv-border));
  background: color-mix(in oklab, var(--nv-accent) 8%, transparent);
}
```

(`nv-modal-in` is the existing entrance keyframe; it auto-collapses under the global reduced-motion block. The mobile reposition of `.nv-audiohint` was already added in Task 2's media block.)

- [ ] **Step 5: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Reason: `AudioHint` renders only when `!data.onboarded`; clicking its × **or** toggling audio calls `markOnboarded()` → `setData({…onboarded:true})` + `storage.saveData` → the hint re-renders away and stays gone across sessions (IndexedDB). The all-cleared badge appears only when every Arc I mission is in `completed_missions`. Both are additive JSX in the NEXUS branch; no engine/routing change. **Manual dev check:** fresh profile shows the hint; clicking ♪ or × dismisses it; reload → gone. (To re-test, clear IndexedDB in devtools.)
- [ ] **Step 6: Commit**

```bash
git add packages/adapter-web/src/ui/Chrome.tsx packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): first-run audio hint (persisted via onboarded) + Arc-I-complete badge"
```

---

## Task 4: Screenshot refresh + final gate

**Files:** Refresh `docs/screenshots/*`.

> Controller note: executed outside the implementation workflow (needs a dev server + Playwright + IndexedDB profile control + visual verification).

- [ ] **Step 1: Full gate** — `npm run typecheck && npm test && npm run build:web` (153) green.
- [ ] **Step 2: Start dev cleanly** — `pkill -9 -f vite; lsof -ti :5173 | xargs kill -9 2>/dev/null; npm run dev &`, wait for HTTP 200.
- [ ] **Step 3: Recapture** (1280×860 @2×, `document.fonts.ready`, `sessionStorage['nv-booted']='1'`, `mouse.move(0,0)` before each shot):
  - **02-nexus-picker.png** — clean NEXUS: set `data.onboarded=true` (via an IndexedDB seed in an init script, or click the ♪ then × to dismiss) so the hint is absent; recapture the canonical NEXUS.
  - **10-first-run-hint.png** — fresh profile (default `onboarded:false`): NEXUS showing the audio hint anchored under the ♪ control.
  - Refresh any other screen whose look shifted (the `.nv-link` generalization + token cleanup are visually inert, so 01/03-09 likely need no change — spot-check 07-archive-index for the muted summaries and re-shoot only if different).
  - (All-cleared badge: optional capture if an all-completed profile can be seeded; otherwise note it as verified via dev.)
- [ ] **Step 4: Kill dev** (`pkill -9 -f vite`).
- [ ] **Step 5: Commit**

```bash
git add docs/screenshots
git commit -m "docs: refresh screenshots — clean NEXUS + first-run hint (plan 6)"
```

---

## Self-review (plan author)

- **Spec coverage:** §5 a11y contrast (audited — all pairs pass AA; recorded + dead token removed — T1) · §5 focus (already shipped: `:focus-visible` rings, CheatsheetOverlay focus-trap — Plan 5; no new work) · §5 reduced-motion (already complete — confirmed in planning, no work) · §6 mobile tap targets ≥44px + full-width drawer (T2) · §3 audio toggle first-run hint (T3, persisted via the spec-intended `onboarded`) · §4 make-the-game-legible all-cleared state (T3 badge). **Out of scope (recorded):** CM6 syntax-color audit, tablet breakpoint, `data-fx=off`-gated entrance animations.
- **Placeholder scan:** none — exact line replacements, full component + CSS code, concrete copy strings.
- **Type consistency:** `AudioHint` (Chrome.tsx) imported + rendered in App.tsx; `markOnboarded` defined once and referenced by both the hint `onDismiss` and `toggleAudio`; `data.onboarded` is a real `PluginData` field (types.ts) already in `DEFAULT_PLUGIN_DATA`; `.nv-audiohint`/`.nv-audiohint-x`/`.nv-allclear` classes defined in CSS (T3) match the markup; the `.nv-audiohint` mobile rule (T2) and base rule (T3) target the same class.

## Remaining plans
None — this completes the visual overhaul (Plans 1-6). After merge, the deploy step (push to both remotes → Codeberg Pages + GitHub Pages auto-deploy) is the user's call.
