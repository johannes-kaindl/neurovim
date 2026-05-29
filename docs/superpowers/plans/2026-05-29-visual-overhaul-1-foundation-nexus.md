# Visual Overhaul — Plan 1: Design-System Foundation + NEXUS

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the cinematic-CRT/HUD design-system foundation (fonts, tokens, CRT frame primitives, effect/motion controls) and re-skin the flagship screen — NEXUS — to the north-star, including tier grouping and ARC II shown-but-locked.

**Architecture:** Pure CSS + Preact markup in `@neurovim/adapter-web`. All visuals funnel through `--nv-*` tokens in `styles.css`. A screen-level CRT frame (scanline/vignette/HUD brackets) plus a global `data-fx`/`prefers-reduced-motion` mechanism gates effects. NEXUS markup (`App.tsx`) gains tier grouping; ARC II missions render locked (their *engineering* enablement is out of scope — spec §4).

**Tech Stack:** Preact 10, Vite, plain CSS (`--nv-*` tokens), self-hosted woff2 (VT323 + JetBrains Mono), CodeMirror 6 (untouched here).

**Spec:** `docs/superpowers/specs/2026-05-29-visual-overhaul-design.md` · **North-star:** `docs/design-source/redesign/nexus-northstar.html`

---

## Verification model (read first)

`@neurovim/adapter-web` has **no unit-test suite** — visual/CSS work is verified differently than the spec's other packages. For every task, "verify" means:

1. `npm run typecheck` → green (all 4 workspaces).
2. `npm run build:web` → green.
3. `npm test` (from repo root) → still **150 passed** (core/content/adapter-obsidian must not regress).
4. **Visual check:** `npm run dev` → http://localhost:5173/ , compare against the north-star mockup.
5. **Reduced-motion check** (tasks that add motion/effects): Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" → confirm motion/glow/scanline are neutralized, layout intact.

There is no "write a failing test" step for CSS. Where this plan adds *logic* (settings persistence, tier grouping, ARC II classification), the logic is trivial and verified by build + visual; do not invent unit tests for `adapter-web`.

Each task ends with a commit. Work on a branch (not `main`).

---

## File structure

| File | Responsibility (after Plan 1) |
|---|---|
| `packages/adapter-web/src/styles.css` | All tokens (semantic colors, type scale, spacing, effect dials) + CRT frame primitives + NEXUS styles |
| `packages/adapter-web/src/fonts/` | `jetbrains-mono-{400,700}.woff2` (exists) + **new** `vt323-400.woff2` + `OFL.txt` (append VT323 license) |
| `packages/adapter-web/src/ui/settings.ts` | **new** — tiny persisted UI settings (`reduceEffects`, `audioOn`) + apply to `<html data-fx>` |
| `packages/adapter-web/src/ui/Chrome.tsx` | **new** — shared screen chrome: CRT frame wrapper + top-right control cluster (audio ♪ / effects toggle) |
| `packages/adapter-web/src/ui/App.tsx` | NEXUS markup: status strip, operator/XP/stats, **tier-grouped** picker, ARC I (playable) + ARC II (locked) |

---

## Task 1: Semantic tokens, type scale & spacing in `styles.css`

**Files:**
- Modify: `packages/adapter-web/src/styles.css` (the `:root` block near the top)

- [ ] **Step 1: Replace the `:root` token block** with the full token set below (keep the existing canonical six values; this adds the semantic/scale/effect tokens the overhaul needs). Find the current `:root { … }` and replace it with:

```css
:root {
  /* ---- canonical surface ---- */
  --nv-bg: #070908;
  --nv-panel: #11160f;
  --nv-border: #1f2a1c;
  --nv-line-hot: #2c4a2f;
  --nv-text: #cfe0cf;
  --nv-muted: #8aa68a;          /* verify ≥4.5:1 on --nv-bg; bump toward #9bb39b if it fails */

  /* ---- semantic accents (story-coupled) ---- */
  --nv-accent: #39ff7a;         /* Resistance / you / primary */
  --nv-accent-hot: #9dffc2;     /* hero / active / success lock-in */
  --nv-accent-dim: #2bbe5e;
  --nv-amber: #ffb02e;          /* CORP / locked / caution */
  --nv-fail: #ff5b5b;           /* fail / glitch / corruption */

  /* ---- type ---- */
  --nv-mono: 'JetBrains Mono', ui-monospace, monospace;
  --nv-display: 'VT323', var(--nv-mono);
  --nv-fs-display: clamp(44px, 8vw, 64px);
  --nv-fs-h1: 28px;
  --nv-fs-h2: 20px;
  --nv-fs-body: 15px;
  --nv-fs-sm: 13px;
  --nv-fs-micro: 11px;          /* uppercase HUD labels */
  --nv-ls-label: 3px;           /* letter-spacing for HUD labels */

  /* ---- spacing scale ---- */
  --nv-s1: 4px; --nv-s2: 8px; --nv-s3: 12px; --nv-s4: 16px; --nv-s5: 24px; --nv-s6: 32px;

  /* ---- effect dials (gated by data-fx + reduced-motion) ---- */
  --nv-glow: 1;                 /* glow multiplier; 0 = flat */
  --nv-scan: 0.12;              /* scanline opacity; 0 = off */
  --nv-vignette: 0.7;           /* inner vignette strength 0..1 */

  /* ---- existing add-ons kept ---- */
  --nv-backdrop: rgba(0,0,0,0.72);
  --nv-modal-shadow: rgba(0,0,0,0.6);
  --nv-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* "Reduce effects" user setting (settings.ts toggles this attribute). */
html[data-fx="off"] { --nv-glow: 0; --nv-scan: 0; --nv-vignette: 0; }
```

- [ ] **Step 2:** Replace the standalone `body { … font-family: ui-monospace, monospace; }` rule's font to use the token: `font-family: var(--nv-mono);` (if it already says `var(--nv-mono)` from the earlier polish pass, leave it).
- [ ] **Step 3: Verify** — `npm run typecheck && npm run build:web` green; `npm run dev` and confirm the app still renders (colors unchanged so far; `--nv-bg` darkened slightly to `#070908`).
- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): semantic token system (colors, type scale, spacing, effect dials)"
```

---

## Task 2: Self-host VT323 display font

**Files:**
- Create: `packages/adapter-web/src/fonts/vt323-400.woff2`
- Modify: `packages/adapter-web/src/fonts/OFL.txt`, `packages/adapter-web/src/styles.css`, `packages/adapter-web/src/fonts/README.md`

- [ ] **Step 1: Download the VT323 latin woff2** (OFL, same source as JetBrains Mono):

```bash
cd packages/adapter-web/src/fonts
curl -sS -L -o vt323-400.woff2 "https://cdn.jsdelivr.net/fontsource/fonts/vt323@latest/latin-400-normal.woff2"
file vt323-400.woff2   # expect: Web Open Font Format (Version 2)
```

- [ ] **Step 2: Append the VT323 OFL notice** to `src/fonts/OFL.txt` (VT323 is also OFL; add a separator + its copyright line):

```bash
printf '\n\n=== VT323 ===\nCopyright (c) 2011 The VT323 Project Authors (peter.hull@oikoi.com)\nLicensed under the SIL Open Font License, Version 1.1 (text above).\n' >> OFL.txt
```

- [ ] **Step 3: Add the `@font-face`** to `styles.css` next to the existing JetBrains Mono faces:

```css
@font-face {
  font-family: 'VT323';
  font-style: normal; font-weight: 400; font-display: swap;
  src: url('./fonts/vt323-400.woff2') format('woff2');
}
```

- [ ] **Step 4:** Update `src/fonts/README.md` — add a row noting `vt323-400.woff2` (display/wordmark only, OFL, exposed as `--nv-display`).
- [ ] **Step 5: Verify** — `npm run build:web`; confirm `dist/assets/vt323-*.woff2` is emitted; `npm run dev` and temporarily set a heading to `font-family: var(--nv-display)` to confirm it loads (then revert the temp change).
- [ ] **Step 6: Commit**

```bash
git add packages/adapter-web/src/fonts packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): self-host VT323 display font (OFL)"
```

---

## Task 3: CRT frame primitives + effect/motion gating

**Files:**
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Add the CRT frame + HUD-label primitives** to `styles.css` (reusable across screens):

```css
/* Screen-level CRT frame. Wrap a screen in .nv-crt to get scanline + vignette;
   add .nv-hud-frame for the corner brackets. Effects honor the --nv-scan/glow/vignette dials. */
.nv-crt { position: relative; }
.nv-crt > .nv-scan, .nv-crt > .nv-vig { position: absolute; inset: 0; pointer-events: none; }
.nv-crt > .nv-scan {
  background: repeating-linear-gradient(180deg, transparent 0 2px, rgba(0,0,0,0.5) 3px);
  opacity: var(--nv-scan); z-index: 1;
}
.nv-crt > .nv-vig { box-shadow: inset 0 0 90px rgba(0,0,0,calc(var(--nv-vignette) * 1)); z-index: 1; }
.nv-crt > * { position: relative; z-index: 2; }   /* content above overlays */

.nv-hud-frame::before, .nv-hud-frame::after,
.nv-hud-frame > .nv-br-bl, .nv-hud-frame > .nv-br-br {
  content: ''; position: absolute; width: 15px; height: 15px; border: solid var(--nv-line-hot); z-index: 3;
}
.nv-hud-frame::before { top: 9px; left: 9px; border-width: 1px 0 0 1px; }
.nv-hud-frame::after  { top: 9px; right: 9px; border-width: 1px 1px 0 0; }
.nv-hud-frame > .nv-br-bl { bottom: 9px; left: 9px; border-width: 0 0 1px 1px; }
.nv-hud-frame > .nv-br-br { bottom: 9px; right: 9px; border-width: 0 1px 1px 0; }

/* HUD label = JetBrains Mono uppercase + letter-spaced (NOT a third font). */
.nv-label { font-size: var(--nv-fs-micro); letter-spacing: var(--nv-ls-label); text-transform: uppercase; color: var(--nv-muted); }

/* Glow helper (reserved for hero/state moments only). */
.nv-glow { text-shadow: 0 0 calc(16px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 70%, transparent); }
```

- [ ] **Step 2: Add the global reduced-motion baseline** at the end of `styles.css` (neutralizes motion AND flattens effects):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
  :root { --nv-scan: 0; --nv-glow: 0; }
}
```

- [ ] **Step 3: Verify** — `npm run build:web` green. (No visual change yet; primitives are applied in Task 4.) Confirm no CSS parse errors in `npm run dev` console.
- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): CRT frame primitives + effect/reduced-motion gating"
```

---

## Task 4: NEXUS overhaul (`App.tsx` + styles)

**Files:**
- Modify: `packages/adapter-web/src/ui/App.tsx` (the NEXUS render branch, ~lines 164–230)
- Modify: `packages/adapter-web/src/styles.css`

**Behavior contract:** ARC I stays fully playable (no progression gating on web — prior product decision). ARC II rows render **locked** (amber, not clickable) — enabling them is separate engineering (spec §4). Missions group by `chapter`.

- [ ] **Step 1: Replace the NEXUS data prep + render** in `App.tsx`. Find the block starting `const progress = ProgressionEngine.getXpProgress(...)` through the end of the returned `<div class="nv-app">…</div>` and replace with:

```tsx
  const progress = ProgressionEngine.getXpProgress(data.total_xp);
  const levelData = ProgressionEngine.getLevelData(progress.level);
  const arc1 = listMissions('I');
  const arc2 = listMissions('II');
  const cleared = arc1.filter((m) => data.completed_missions.includes(m.mission_id)).length;
  const times = arc1.map((m) => data.missions[m.mission_id]?.best_time_ms ?? 0).filter((t) => t > 0);
  const fastest = times.length ? Math.min(...times) : null;
  const activeId = arc1.find((m) => !data.completed_missions.includes(m.mission_id))?.mission_id ?? null;

  // Group ARC I by chapter (e.g. "01 - Indoctrination" -> "Indoctrination"), preserving order.
  const chapterName = (c: string) => c.replace(/^\d+\s*[-–]\s*/, '');
  const arc1Groups: { name: string; items: typeof arc1 }[] = [];
  for (const m of arc1) {
    const name = chapterName(m.chapter);
    let g = arc1Groups.find((x) => x.name === name);
    if (!g) { g = { name, items: [] }; arc1Groups.push(g); }
    g.items.push(m);
  }

  return (
    <div class="nv-app nv-nexus nv-crt nv-hud-frame" onPointerDown={unlockAudio}>
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />

      <div class="nv-statusstrip">
        <span class="nv-label">Kuro Signal Protocol // Guardian</span>
        <span class="nv-label nv-link">◢ Link Secure</span>
      </div>

      <h1 class="nv-wordmark nv-glow">&gt;_ NEXUS<span class="nv-caret">_</span></h1>

      <div class="nv-ops">
        <span class="nv-label">LVL {progress.level} · {levelData.title}</span>
        <span class="nv-ops-xp">
          {progress.nextTitle
            ? `${data.total_xp} / ${progress.nextLevelXp} XP → ${progress.nextTitle}`
            : `${data.total_xp} XP · MAX`}
        </span>
      </div>
      <div class="nv-xpbar"><div class={`nv-xpbar-fill${xpFlash ? ' nv-gained' : ''}`} style={{ width: `${progress.pct}%` }} /></div>
      <div class="nv-stats">
        <span>Cleared <b>{cleared}</b>/{arc1.length}</span>
        <span>Streak <b>{data.streak_current}</b></span>
        {fastest != null && <span>Fastest <b>{fmtTime(fastest)}</b></span>}
      </div>

      {arc1Groups.map((g) => (
        <section class="nv-tier" key={g.name}>
          <div class="nv-tier-label nv-label">{g.name}</div>
          {g.items.map((m) => {
            const rec = data.missions[m.mission_id];
            const done = data.completed_missions.includes(m.mission_id);
            const active = m.mission_id === activeId;
            const cls = ['nv-row', done && 'nv-row-done', active && 'nv-row-active'].filter(Boolean).join(' ');
            return (
              <button class={cls} key={m.mission_id} onClick={() => selectMission(m.mission_id)}>
                <span class="nv-row-id">{active ? '▸ ' : ''}{m.mission_id}</span>
                <span class="nv-row-t">{m.title}</span>
                {done && (rec?.best_time_ms ?? 0) > 0
                  ? <span class="nv-row-meta">{fmtTime(rec!.best_time_ms)} · {rec!.best_keystrokes}ks</span>
                  : <span class="nv-row-meta">{m.xp_reward} XP</span>}
                {done && <span class="nv-row-x">✓</span>}
              </button>
            );
          })}
        </section>
      ))}

      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Arc II — Encrypted</div>
        {arc2.map((m) => (
          <button class="nv-row nv-row-locked" key={m.mission_id} disabled aria-disabled="true"
                  title="ARC II — not yet available on the web build">
            <span class="nv-row-id">{m.mission_id}</span>
            <span class="nv-row-t">{m.title} · ARC II</span>
            <span class="nv-row-meta nv-row-lock">🔒</span>
          </button>
        ))}
      </section>

      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Sandbox</div>
        <button class="nv-row" onClick={() => { unlockAudio(); setView('sandbox'); }}>
          <span class="nv-row-id">RAVEN</span>
          <span class="nv-row-t">Glitch Drill — restore the transmission</span>
          {data.sandbox_bests.normal != null
            ? <span class="nv-row-meta">PB {fmtTime(data.sandbox_bests.normal)}</span>
            : <span class="nv-row-meta">free play</span>}
        </button>
      </section>
    </div>
  );
```

- [ ] **Step 2: Add the NEXUS styles** to `styles.css` (lifted from the north-star; `.nv-row` is a full-width `button`):

```css
.nv-nexus { max-width: 820px; margin: 0 auto; padding: var(--nv-s6) var(--nv-s4) var(--nv-s6); }
.nv-statusstrip { display: flex; justify-content: space-between; gap: var(--nv-s3); }
.nv-statusstrip .nv-link { color: var(--nv-accent); }
.nv-wordmark { font-family: var(--nv-display); font-size: var(--nv-fs-display); line-height: .9;
  letter-spacing: 1px; color: var(--nv-accent-hot); margin: var(--nv-s2) 0 var(--nv-s1);
  text-shadow: 0 0 calc(16px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 80%, transparent),
               0 0 calc(40px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 30%, transparent); }
.nv-caret { animation: nv-blink 1.1s steps(1) infinite; }
@keyframes nv-blink { 50% { opacity: 0; } }
.nv-ops { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--nv-s2); font-size: var(--nv-fs-sm); color: var(--nv-muted); }
.nv-ops-xp { color: var(--nv-accent); }
.nv-xpbar { height: 7px; background: #16201588; border: 1px solid var(--nv-border); border-radius: 99px; overflow: hidden; margin: var(--nv-s3) 0; }
.nv-xpbar-fill { height: 100%; background: linear-gradient(90deg, var(--nv-accent-dim), var(--nv-accent-hot)); box-shadow: 0 0 calc(10px * var(--nv-glow)) var(--nv-accent); transition: width .4s var(--nv-ease); }
.nv-xpbar-fill.nv-gained { animation: nv-xp-flash .6s ease; }
@keyframes nv-xp-flash { from { filter: brightness(2.2); } to { filter: none; } }
.nv-stats { display: flex; gap: 18px; font-size: var(--nv-fs-sm); color: var(--nv-muted); padding-bottom: var(--nv-s3); border-bottom: 1px solid var(--nv-border); }
.nv-stats b { color: var(--nv-accent); }
.nv-tier { margin-top: var(--nv-s5); }
.nv-tier-label { display: flex; align-items: center; gap: 10px; margin-bottom: var(--nv-s2); color: #8fae8f; }
.nv-tier-label::after { content: ''; flex: 1; height: 1px; background: var(--nv-border); }
.nv-row { display: flex; align-items: center; gap: var(--nv-s3); width: 100%; text-align: left;
  font-family: var(--nv-mono); font-size: var(--nv-fs-sm); color: var(--nv-text);
  padding: var(--nv-s3) 13px; margin: var(--nv-s2) 0; border-radius: 5px;
  background: var(--nv-panel); border: 1px solid var(--nv-border); cursor: pointer;
  transition: border-color .15s, background .15s; }
.nv-row:hover { border-color: var(--nv-accent); }
.nv-row-id { color: var(--nv-accent); min-width: 64px; letter-spacing: 1px; font-weight: 700; }
.nv-row-t { flex: 1; }
.nv-row-meta { font-size: var(--nv-fs-micro); color: var(--nv-muted); white-space: nowrap; }
.nv-row-x { color: var(--nv-accent-hot); }
.nv-row-active { border-color: var(--nv-accent); box-shadow: 0 0 0 1px color-mix(in oklab, var(--nv-accent) 30%, transparent), 0 0 calc(20px * var(--nv-glow)) -8px var(--nv-accent); }
.nv-row-active .nv-row-id { color: var(--nv-accent-hot); }
.nv-row-done { opacity: .55; }
.nv-row-locked { border-style: dashed; border-color: color-mix(in oklab, var(--nv-amber) 35%, var(--nv-border));
  background: linear-gradient(180deg, transparent, color-mix(in oklab, var(--nv-amber) 6%, transparent));
  cursor: not-allowed; }
.nv-row-locked .nv-row-id { color: var(--nv-amber); }
.nv-row-locked .nv-row-t { color: color-mix(in oklab, var(--nv-amber) 55%, var(--nv-muted)); }
.nv-row-locked:hover { border-color: color-mix(in oklab, var(--nv-amber) 35%, var(--nv-border)); }
```

- [ ] **Step 3:** Remove now-dead NEXUS CSS from the earlier polish pass that the new classes supersede (old selectors `.nv-nexus-head`, `.nv-lvl-row`, `.nv-lvl`, `.nv-lvl-next`, `.nv-arc-prog`, `.nv-picker`, `.nv-mid`, `.nv-mtitle`, `.nv-mxp`, `.nv-mbest`, `.nv-done`, and the `.nv-picker li.nv-active/.nv-done-row/.nv-locked` rules). Search `styles.css` for each and delete the rule if no remaining markup uses it (the new App.tsx no longer emits these). Keep `.nv-app`.
- [ ] **Step 4: Verify** — `npm run typecheck` (App.tsx types: `listMissions('II')` returns `MissionSummary[]`, `m.chapter` is a string ✓). `npm test` still 150. `npm run build:web` green. `npm run dev`: NEXUS matches the north-star — status strip, VT323 wordmark + blink, XP bar, tier groups, ARC I playable, active row glows, done rows dim with best-time, ARC II rows amber + locked + not clickable, sandbox row. Toggle DevTools reduced-motion → blink/glow stop, layout intact.
- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): NEXUS overhaul — tiered picker, CRT/HUD chrome, ARC II shown-locked"
```

---

## Task 5: UI settings + audio/effects control cluster

**Files:**
- Create: `packages/adapter-web/src/ui/settings.ts`
- Create: `packages/adapter-web/src/ui/Chrome.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx` (mount the control cluster in NEXUS; respect audio setting)
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Create `settings.ts`** — persisted UI settings (separate from game `PluginData`; these are device/display prefs):

```ts
/** Device-local UI prefs (display + audio), persisted in localStorage. Not game state. */
const KEY = 'neurovim:ui';
type UiSettings = { reduceEffects: boolean; audioOn: boolean };
const DEFAULTS: UiSettings = { reduceEffects: false, audioOn: false }; // audio OFF by default (D4)

export function loadSettings(): UiSettings {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; }
  catch { return { ...DEFAULTS }; }
}
export function saveSettings(s: UiSettings): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode: ignore */ }
}
/** Reflect reduceEffects onto <html data-fx> so the token overrides in styles.css apply. */
export function applyEffects(reduceEffects: boolean): void {
  document.documentElement.dataset.fx = reduceEffects ? 'off' : 'on';
}
```

- [ ] **Step 2: Create `Chrome.tsx`** — the top-right control cluster (audio + effects toggles):

```tsx
interface Props {
  audioOn: boolean; reduceEffects: boolean;
  onToggleAudio: () => void; onToggleEffects: () => void;
}
export function ControlCluster({ audioOn, reduceEffects, onToggleAudio, onToggleEffects }: Props) {
  return (
    <div class="nv-controls">
      <button class="nv-ctl" aria-pressed={audioOn} title={audioOn ? 'Sound on' : 'Sound off'} onClick={onToggleAudio}>
        {audioOn ? '♪' : '♪̶'}
      </button>
      <button class="nv-ctl" aria-pressed={!reduceEffects} title={reduceEffects ? 'Effects off' : 'Effects on'} onClick={onToggleEffects}>
        {reduceEffects ? '▢' : '▣'}
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Wire it in `App.tsx`.** Near the other module-level singletons add settings state; on mount apply effects; render `<ControlCluster>` inside the NEXUS `<div class="nv-app …">` (replace the bare `♪` placeholder area). Add imports + state:

```tsx
import { loadSettings, saveSettings, applyEffects } from './settings';
import { ControlCluster } from './Chrome';
// inside App(), with the other useState hooks:
const [ui, setUi] = useState(loadSettings());
useEffect(() => { applyEffects(ui.reduceEffects); }, [ui.reduceEffects]);
function toggleAudio() {
  const next = { ...ui, audioOn: !ui.audioOn }; setUi(next); saveSettings(next);
  if (next.audioOn) { unlockAudio(); audio.setMuted?.(false); } else { audio.setMuted?.(true); }
}
function toggleEffects() { const next = { ...ui, reduceEffects: !ui.reduceEffects }; setUi(next); saveSettings(next); }
```

Then inside the NEXUS markup (Task 4 Step 1 output), put the cluster right after the status strip:

```tsx
<ControlCluster audioOn={ui.audioOn} reduceEffects={ui.reduceEffects}
  onToggleAudio={toggleAudio} onToggleEffects={toggleEffects} />
```

- [ ] **Step 4: Add a no-op-safe `setMuted` to AudioEngine** if it doesn't exist. Check `packages/core/src/audio/AudioEngine.ts`; if there's no `setMuted`, add:

```ts
/** Mute/unmute all output without tearing down the context. */
setMuted(muted: boolean): void { this.muted = muted; /* gate playback in your cue methods on this.muted */ }
```

…and guard the cue entry points with `if (this.muted) return;`. If wiring mute into the engine is non-trivial, instead gate at the call sites in `App.tsx`/`SoundCues` on `ui.audioOn` and drop `setMuted?.()` — keep it simple. (The `?.` in Step 3 means the App compiles either way.)

- [ ] **Step 5: Add control styles** to `styles.css`:

```css
.nv-controls { position: absolute; top: 12px; right: 36px; display: flex; gap: 6px; z-index: 4; }
.nv-ctl { background: transparent; border: 1px solid var(--nv-border); color: var(--nv-muted);
  border-radius: 4px; padding: 3px 8px; font-size: 13px; line-height: 1; cursor: pointer; }
.nv-ctl[aria-pressed="true"] { color: var(--nv-accent); border-color: color-mix(in oklab, var(--nv-accent) 40%, var(--nv-border)); }
.nv-ctl:focus-visible { outline: 2px solid var(--nv-accent); outline-offset: 2px; }
```

- [ ] **Step 6: Verify** — `npm run typecheck` + `npm test` (150) + `npm run build:web` green. `npm run dev`: the effects toggle flips scanline/glow on/off live (via `html[data-fx]`); the audio toggle persists across reload (localStorage); reduced-motion still flattens regardless of the toggle.
- [ ] **Step 7: Commit**

```bash
git add packages/adapter-web/src/ui/settings.ts packages/adapter-web/src/ui/Chrome.tsx packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css packages/core/src/audio/AudioEngine.ts
git commit -m "feat(adapter-web): UI settings + audio/effects control cluster (persisted, a11y)"
```

---

## Task 6: Refresh NEXUS screenshot + verify full gate

**Files:**
- Modify: `docs/screenshots/02-nexus-picker.png`

- [ ] **Step 1: Full gate** — from repo root: `npm run typecheck && npm test && npm run build:web` all green (150 tests).
- [ ] **Step 2: Recapture the NEXUS screenshot** against a local build (reuse the established Playwright flow). Minimal:

```bash
npm run dev   # in one shell
# in another: point the existing capture script (see CHANGELOG / prior screenshots) at
# http://localhost:5173/ , click .nv-welcome-enter, wait for .nv-nexus, screenshot 02-nexus-picker.png
```

If the prior `/tmp/shotter/capture.mjs` is gone, recreate a 3-step Playwright snippet: goto → click `.nv-welcome-enter` → wait `.nv-row` → screenshot `docs/screenshots/02-nexus-picker.png` (1280×860 @2×).
- [ ] **Step 3: Commit**

```bash
git add docs/screenshots/02-nexus-picker.png
git commit -m "docs: refresh NEXUS screenshot after overhaul (plan 1)"
```

---

## Self-review (done by plan author)

- **Spec coverage (Plan 1 slice):** §2.1 type (T1/T2), §2.2 colors (T1), §2.3 effects budget + dials (T1/T3), §2.4 motion baseline (T3), §3 NEXUS incl. tier grouping + states (T4), §3 audio toggle + reduce-effects (T5), §4 ARC II shown-locked (T4), §5 reduced-motion + reduce-effects toggle + focus-visible (T3/T5), §7 tokens/fonts/CSS-first (all). **Out of this plan (later plans):** Welcome boot intro, Briefing callouts, Editor calm-canvas refinement, Result beats, Sandbox polish, Lore reader, Cheatsheet, full audio-cue visual pendants, full a11y contrast audit + first-run/all-cleared/mobile states, screenshot set beyond NEXUS.
- **Placeholder scan:** none — every step has concrete code/commands. (Task 5 Step 4 offers a documented fallback, not a TODO.)
- **Type consistency:** `loadSettings/saveSettings/applyEffects` and `ControlCluster` props match across T5; `listMissions('II')`/`m.chapter` match the verified core API; `nv-row*` classes consistent between App.tsx (T4) and styles.css (T4).

---

## Remaining plans (same spec, sequenced)

2. Welcome (boot/typing intro) + Briefing (semantic callouts)
3. Editor (calm canvas + HUD bars) + Result (success/level-up/fail-glitch)
4. Sandbox polish + full audio-cue visual pendants
5. New surfaces: Lore/Loot reader + Cheatsheet panel
6. A11y contrast audit + states (first-run / all-cleared / mobile) + full screenshot refresh
