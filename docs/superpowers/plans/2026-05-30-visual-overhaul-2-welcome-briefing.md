# Visual Overhaul — Plan 2: Welcome + Briefing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Re-skin the Welcome screen (VT323 hero wordmark, CRT frame, a tasteful boot/typing intro) and the Briefing screen (CRT frame, semantic-palette callouts) to the cinematic-CRT direction, building on Plan 1's token system + CRT primitives.

**Architecture:** Plain CSS + small Preact markup in `@neurovim/adapter-web`. Reuse Plan 1's primitives (`.nv-crt`/`.nv-hud-frame`/`.nv-label`/`.nv-text-glow`), tokens (`--nv-*`), and the `--nv-display` (VT323) font. One new self-contained component (`BootIntro.tsx`). Callouts already emit `<span class="nv-co nv-co-TYPE">` (markdown.ts) and have `:has()` rules — this plan aligns their colors to the semantic palette.

**Tech Stack:** Preact 10, Vite, plain CSS, VT323 (already self-hosted from Plan 1).

**Spec:** `docs/superpowers/specs/2026-05-29-visual-overhaul-design.md` (§3 Welcome, §3 Briefing). **Plan 1 (merged):** `docs/superpowers/plans/2026-05-29-visual-overhaul-1-foundation-nexus.md`.

---

## Verification model (same as Plan 1)

`adapter-web` has **no unit suite**. Per task: `npm run typecheck` green · `npm test` still **153 passed** · `npm run build:web` green · reason about correctness from types/build (you can't see the browser). Reduced-motion tasks: confirm the motion is wrapped in `@media (prefers-reduced-motion: reduce)`. Commit each task on a branch (NOT main).

Branch: create `feat/visual-overhaul-2` off `main` before Task 1.

---

## File structure

| File | Responsibility (after Plan 2) |
|---|---|
| `packages/adapter-web/src/styles.css` | Welcome hero + boot-intro + doc/briefing CRT styles; callout palette aligned to tokens |
| `packages/adapter-web/src/ui/WelcomeView.tsx` | CRT frame wrapper + mounts the boot intro (once per session) |
| `packages/adapter-web/src/ui/BootIntro.tsx` | **new** — self-contained typing boot overlay (reduced-motion/once-per-session safe) |
| `packages/adapter-web/src/ui/BriefingView.tsx` | CRT frame wrapper |

---

## Task 1: Welcome hero — VT323 wordmark + CRT frame

**Files:** Modify `packages/adapter-web/src/ui/WelcomeView.tsx`, `packages/adapter-web/src/styles.css`.

The welcome wordmark `>_ NEUROVIM` is the markdown `<h1>` inside `.nv-welcome .nv-md`. We restyle it to VT323 + reserved glow and wrap the screen in the CRT frame.

- [ ] **Step 1: Wrap WelcomeView in the CRT frame.** Replace the WelcomeView return with:

```tsx
  return (
    <div class="nv-doc nv-welcome nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
      </div>
    </div>
  );
```

- [ ] **Step 2: Restyle the welcome wordmark to VT323** in `styles.css`. Find the existing `.nv-welcome .nv-md h1 { … }` rule (and its `::after` blink) and replace with:

```css
.nv-welcome .nv-md h1 {
  font-family: var(--nv-display); font-weight: 400;
  font-size: clamp(56px, 12vw, 110px); line-height: .9; letter-spacing: 2px;
  color: var(--nv-accent-hot); margin: 0 0 var(--nv-s4);
  text-shadow: 0 0 calc(18px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 80%, transparent),
               0 0 calc(48px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 30%, transparent);
}
.nv-welcome .nv-md h1::after { content: '_'; margin-left: .06em; color: var(--nv-accent-hot); animation: nv-blink 1.1s steps(1) infinite; }
```

(The `@keyframes nv-blink` already exists from Plan 1 — reuse it. Do NOT add a duplicate.)

- [ ] **Step 3:** Ensure `.nv-welcome` keeps its centered layout and gets a little breathing room for the frame. If the existing `.nv-welcome { min-height: 78vh; … }` lacks horizontal padding for the frame brackets, add `padding: 0 var(--nv-s4);` (don't remove the flex centering).
- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. The reduced-motion block already neutralizes the blink + flattens glow (Plan 1).
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/WelcomeView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Welcome hero — VT323 wordmark + CRT frame"
```

---

## Task 2: Welcome boot/typing intro

**Files:** Create `packages/adapter-web/src/ui/BootIntro.tsx`, modify `packages/adapter-web/src/ui/WelcomeView.tsx`, `packages/adapter-web/src/styles.css`.

A short, tasteful boot sequence: a few system lines type out, then the overlay fades and reveals the welcome content. Plays **once per browser session** (sessionStorage) and is **skipped entirely under reduced-motion**.

- [ ] **Step 1: Create `BootIntro.tsx`:**

```tsx
import { useEffect, useRef, useState } from 'preact/hooks';

const LINES = [
  '> ESTABLISHING UPLINK ........ OK',
  '> DECRYPTING CHANNEL ......... OK',
  '> CIPHER // GUARDIAN ONLINE',
];

interface Props { onDone: () => void; }

/** One-shot typing boot overlay. Calls onDone when finished (or immediately when skipped). */
export function BootIntro({ onDone }: Props) {
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let i = 0; let acc: string[] = [];
    const step = () => {
      if (i >= LINES.length) {
        const t = window.setTimeout(() => { setDone(true); window.setTimeout(onDone, 450); }, 350);
        timers.current.push(t);
        return;
      }
      acc = [...acc, LINES[i]]; setShown(acc); i++;
      const t = window.setTimeout(step, 420);
      timers.current.push(t);
    };
    step();
    return () => { timers.current.forEach(clearTimeout); };
  }, []);

  return (
    <div class={`nv-boot${done ? ' nv-boot-out' : ''}`} aria-hidden="true">
      <div class="nv-boot-lines">
        {shown.map((l, k) => <div key={k} class="nv-boot-line">{l}</div>)}
        <div class="nv-boot-cursor">_</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Mount it in `WelcomeView.tsx`** — play once per session, skip under reduced-motion. Update WelcomeView:

```tsx
import { useState } from 'preact/hooks';
import { getWelcome } from '@neurovim/content';
import { renderMarkdown } from './markdown';
import { BootIntro } from './BootIntro';

interface Props { onEnter: () => void; }

function shouldBoot(): boolean {
  if (typeof window === 'undefined') return false;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return false;
  try { if (sessionStorage.getItem('nv-booted')) return false; } catch { /* ignore */ }
  return true;
}

export function WelcomeView({ onEnter }: Props) {
  const html = renderMarkdown(getWelcome());
  const [booting, setBooting] = useState(shouldBoot());
  function finishBoot() {
    try { sessionStorage.setItem('nv-booted', '1'); } catch { /* ignore */ }
    setBooting(false);
  }
  return (
    <div class="nv-doc nv-welcome nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      {booting && <BootIntro onDone={finishBoot} />}
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add boot styles** to `styles.css`:

```css
.nv-boot { position: absolute; inset: 0; z-index: 6; display: flex; align-items: center; justify-content: center;
  background: var(--nv-bg); transition: opacity .45s var(--nv-ease); }
.nv-boot-out { opacity: 0; pointer-events: none; }
.nv-boot-lines { font-family: var(--nv-mono); font-size: var(--nv-fs-sm); color: var(--nv-accent);
  line-height: 1.9; text-shadow: 0 0 calc(6px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 50%, transparent); }
.nv-boot-line { white-space: pre; }
.nv-boot-cursor { display: inline-block; animation: nv-blink 1.1s steps(1) infinite; }
```

- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Reason: under reduced-motion `shouldBoot()` returns false → no overlay (content shows immediately); on a second visit within the session, sessionStorage skips it. The overlay sits inside `.nv-crt` (position:relative) and is absolutely positioned with z-index 6 (above content z-2 and controls z-4). `aria-hidden` keeps it out of the a11y tree.
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/BootIntro.tsx packages/adapter-web/src/ui/WelcomeView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Welcome boot/typing intro (once-per-session, reduced-motion safe)"
```

---

## Task 3: Briefing — CRT frame + semantic callout alignment

**Files:** Modify `packages/adapter-web/src/ui/BriefingView.tsx`, `packages/adapter-web/src/styles.css`.

- [ ] **Step 1: Wrap BriefingView in the CRT frame.** In `BriefingView.tsx`, change the root `<div class="nv-doc">` to `<div class="nv-doc nv-crt nv-hud-frame">` and add the overlay children as the first children:

```tsx
    <div class="nv-doc nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-doc-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-doc-title">{missionId} · {title}</span>
        <button class="nv-submit" onClick={onBegin}>Begin Mission →</button>
      </div>
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary" onClick={onBegin}>Begin Mission →</button>
        <button onClick={onBack}>← Back to NEXUS</button>
      </div>
    </div>
```

Note: `.nv-doc-bar` is `position: sticky; z-index: 5` — that's above the scan/vig (z-1) and fine. The CRT `.nv-crt > *` sets content to z-2; the sticky bar's explicit z-5 still wins. Leave the bar as-is.

- [ ] **Step 2: Align callout colors to the semantic palette** in `styles.css`. The `:has()` callout rules exist from the polish pass but reference `--nv-warn`/`--nv-tip`/`--nv-co-success`. Make them explicit + on-palette. Replace the callout color rules with:

```css
/* type-aware callouts (D25) — semantic palette: CORP/warning=amber, tip=green, success=hot, quote/CIPHER=accent */
.nv-md blockquote:has(.nv-co-warning), .nv-md blockquote:has(.nv-co-caution) {
  border-left-color: var(--nv-amber);
  background: linear-gradient(90deg, color-mix(in oklab, var(--nv-amber) 8%, transparent), transparent 90%); }
.nv-md blockquote:has(.nv-co-warning) strong:first-of-type, .nv-md blockquote:has(.nv-co-caution) strong:first-of-type { color: var(--nv-amber); }
.nv-md blockquote:has(.nv-co-tip), .nv-md blockquote:has(.nv-co-hint) { border-left-color: var(--nv-accent); }
.nv-md blockquote:has(.nv-co-tip) strong:first-of-type, .nv-md blockquote:has(.nv-co-hint) strong:first-of-type { color: var(--nv-accent); }
.nv-md blockquote:has(.nv-co-success), .nv-md blockquote:has(.nv-co-check) { border-left-color: var(--nv-accent-hot); }
.nv-md blockquote:has(.nv-co-success) strong:first-of-type { color: var(--nv-accent-hot); }
.nv-md blockquote:has(.nv-co-quote) { background: linear-gradient(90deg, var(--nv-faint), transparent 90%); }
.nv-md blockquote:has(.nv-co-quote) em, .nv-md blockquote:has(.nv-co-quote) { font-style: italic; }
```

And the leading glyphs:

```css
.nv-co { display: inline; }
.nv-co-warning::before, .nv-co-caution::before { content: '⚠ '; color: var(--nv-amber); }
.nv-co-tip::before, .nv-co-hint::before { content: '◆ '; color: var(--nv-accent); }
.nv-co-success::before, .nv-co-check::before { content: '✓ '; color: var(--nv-accent-hot); }
.nv-co-quote::before { content: '“'; color: var(--nv-accent); }
```

Remove any now-duplicated/old `.nv-co*` color rules so each selector is defined once. (Keep `.nv-co { display: none/inline }` logic consistent — a marker span should render its glyph; ensure the final state is `.nv-co { display: inline; }`.)

- [ ] **Step 3:** Keep the ASCII `<pre>` calm — it already has its own dark panel + accent text from the polish pass. Do NOT add scanline/glow over `.nv-md pre`. (No change needed unless a prior rule conflicts; verify the `<pre>` still reads cleanly.)
- [ ] **Step 4: Verify** — `npm run typecheck` + `npm test` (153) + `npm run build:web` green. Grep `styles.css` to confirm no duplicate `.nv-co-*::before` or `:has(.nv-co-*)` rules remain.
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/BriefingView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): Briefing CRT frame + semantic-palette callouts"
```

---

## Task 4: Screenshots (Welcome + Briefing) + full gate

**Files:** Modify `docs/screenshots/01-welcome.png`, `docs/screenshots/03-briefing.png`.

- [ ] **Step 1: Full gate** — `npm run typecheck && npm test && npm run build:web` (153) all green.
- [ ] **Step 2: Recapture** `01-welcome.png` and `03-briefing.png` from a local dev build via Playwright. For Welcome, set `sessionStorage['nv-booted']='1'` before navigating (so the screenshot shows the settled content, not mid-boot) OR wait for the boot to finish (~1.6s) then move the mouse away and capture. For Briefing: click `.nv-welcome-enter` → click the first `.nv-row` → wait `.nv-doc .nv-md` → capture. 1280×860 @2×, `await page.evaluate(() => document.fonts.ready)` before each shot.
- [ ] **Step 3: Commit**

```bash
git add docs/screenshots/01-welcome.png docs/screenshots/03-briefing.png
git commit -m "docs: refresh Welcome + Briefing screenshots (plan 2)"
```

---

## Self-review (plan author)

- **Spec coverage:** §3 Welcome (VT323 hero T1, boot intro T2, CRT frame T1/T2) · §3 Briefing (CRT frame T3, type-aware semantic callouts T3, calm ASCII pre T3) · §5 reduced-motion (T2 skips boot; blink/glow already gated) · §7 tokens/CSS-first (all). **Out of scope (later plans):** Editor, Result, Sandbox, lore reader, cheatsheet, full a11y audit, mobile.
- **Placeholder scan:** none — concrete code in every step.
- **Type consistency:** `BootIntro` props `{onDone}` ↔ WelcomeView `finishBoot`; `shouldBoot()` returns boolean; `.nv-boot*` classes consistent between BootIntro/WelcomeView (T2) and styles (T2).

## Remaining plans
3. Editor (calm canvas + HUD bars) + Result (success/level-up/fail-glitch) · 4. Sandbox + full audio-cue pendants · 5. Lore reader + Cheatsheet · 6. A11y audit + states + full screenshot refresh.
