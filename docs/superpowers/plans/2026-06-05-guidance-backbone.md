# Guidance Backbone (P2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take a Vim-naive player by the hand — diegetic CIPHER guidance that orients at every step (what's next & why) with reference one click away — without breaking the disguise, fading adaptively by level.

**Architecture:** A pure `GuidanceEngine` in `@neurovim/core` derives per-mission guidance (skill-tag, hint keys, why, leads-to, debrief) and the fade tier from level. One authored `why:` line per mission flows through the content SSOT. All surfaces are web-only in `adapter-web`; the Obsidian adapter is untouched. The core stays DOM/obsidian-free.

**Tech Stack:** TypeScript (strict, project refs), Preact 10 (`preact/compat`), CodeMirror 6 + `@replit/codemirror-vim`, Jest + ts-jest, Vite, npm workspaces. Content = Markdown SSOT → `build.mjs` → generated TS.

**Spec:** `docs/superpowers/specs/2026-06-05-guidance-backbone-design.md`

---

## File Structure

**Core (`packages/core/src/`)** — pure, tested:
- `utils/diff.ts` (modify) — add `getDivergentLines()` for reveal highlighting.
- `data/cipher-quotes.ts` (modify) — add `guide_why` event + `guideWhyFor()` deterministic fallback.
- `engine/GuidanceEngine.ts` (create) — `verbosityTier`, `skillTagFor`, `deriveGuidance`, types.
- `types.ts` (modify) — `MissionFrontmatter.why?/summary?`; `PluginData.vimPrimerSeen/railPin` + defaults.
- `index.ts` (modify) — export `GuidanceEngine`.

**Content (`packages/content/src/`)**:
- `index.ts` (modify) — `toSummary` carries `summary`/`why`; add `getManual()`.
- `content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes.md` (modify) — author `why:` (worked example).
- (Task 10) author `why:` for the remaining missions.

**Web (`packages/adapter-web/src/ui/`)**:
- `ReferenceOverlay.tsx` (create) — Cheat-Sheet | Manual tabs (supersedes `CheatsheetOverlay.tsx` usage).
- `CommsRail.tsx` (create) — diegetic rail beside the editor (adaptive tiers + pin + reveal/manual triggers).
- `reveal.ts` (create) — CM6 line-decoration field for reveal-corruption.
- `VimPrimer.tsx` (create) — first-run "What is Vim & why" panel.
- `MissionEditor.tsx` (modify) — mount rail + reveal extension.
- `App.tsx` (modify) — derive guidance, wire rail/reference/primer/pin; NEXUS skill-tags + START HERE + legend.
- `BriefingView.tsx` (modify) — guidance panel + reference button.
- `MissionResult.tsx` (modify) — CIPHER debrief line.
- `styles.css` (modify) — tokens-driven rules for rail, tabs, reveal, legend, primer.

**Tests:**
- `packages/core/test/diff.test.ts` (modify), `GuidanceEngine.test.ts` (create), `cipher-quotes.test.ts` (create).
- `packages/adapter-web/test/guidance-wiring.test.ts` (create).

---

## Task 1: Core — `getDivergentLines` (diff helper for reveal)

**Files:**
- Modify: `packages/core/src/utils/diff.ts`
- Test: `packages/core/test/diff.test.ts`

- [ ] **Step 1: Write the failing tests** — append to `packages/core/test/diff.test.ts` (inside the file, after the existing `describe`):

```ts
import { getDivergentLines } from '../src/utils/diff';

describe('getDivergentLines', () => {
  it('returns [] for identical content', () => {
    expect(getDivergentLines('a\nb\nc', 'a\nb\nc')).toEqual([]);
  });
  it('returns every divergent 0-based line index', () => {
    expect(getDivergentLines('a\nX\nY', 'a\nb\nc')).toEqual([1, 2]);
  });
  it('reports extra lines in current as divergent', () => {
    expect(getDivergentLines('a\nb\nc', 'a\nb')).toEqual([2]);
  });
  it('ignores leading/trailing whitespace like getDiff', () => {
    expect(getDivergentLines('a\nb\n', 'a\nb')).toEqual([]);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test --workspace @neurovim/core -- diff.test.ts`
Expected: FAIL — `getDivergentLines is not a function` / no exported member.

- [ ] **Step 3: Implement** — append to `packages/core/src/utils/diff.ts`:

```ts
/**
 * All 0-based line indices where `current` differs from `solution`, after the same
 * trim getDiff uses. Empty array when they match. Drives reveal-corruption highlighting
 * (location to look at — not the fix).
 */
export function getDivergentLines(current: string, solution: string): number[] {
  if (current.trim() === solution.trim()) return [];
  const a = current.trim().split('\n');
  const b = solution.trim().split('\n');
  const max = Math.max(a.length, b.length);
  const out: number[] = [];
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) out.push(i);
  }
  return out;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test --workspace @neurovim/core -- diff.test.ts`
Expected: PASS (existing `getDiff` + new `getDivergentLines` blocks green).

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/utils/diff.ts packages/core/test/diff.test.ts
git commit -m "feat(core): getDivergentLines for reveal-corruption highlighting

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Core — `guide_why` cipher event + deterministic `guideWhyFor`

**Files:**
- Modify: `packages/core/src/data/cipher-quotes.ts`
- Test: `packages/core/test/cipher-quotes.test.ts` (create)

- [ ] **Step 1: Write the failing test** — create `packages/core/test/cipher-quotes.test.ts`:

```ts
import { getCipherQuote, guideWhyFor } from '../src/data/cipher-quotes';

describe('guideWhyFor', () => {
  it('returns a category-specific line when present', () => {
    expect(guideWhyFor('fundamentals')).toMatch(/mode/i);
  });
  it('falls back to a universal line for an unmapped category', () => {
    expect(guideWhyFor('totally-unknown')).toBe(guideWhyFor(null));
  });
  it('is deterministic (no random pick)', () => {
    expect(guideWhyFor('navigation')).toBe(guideWhyFor('navigation'));
  });
});

describe('getCipherQuote still works', () => {
  it('returns a string for a known category/event', () => {
    expect(typeof getCipherQuote('fundamentals', 'success')).toBe('string');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test --workspace @neurovim/core -- cipher-quotes.test.ts`
Expected: FAIL — `guideWhyFor is not a function`.

- [ ] **Step 3: Implement** — in `packages/core/src/data/cipher-quotes.ts`:

(a) Extend the event union on line 1:
```ts
export type QuoteEvent = 'success' | 'fast' | 'slow' | 'perfect_ks' | 'wrong_answer' | 'drill' | 'level_up' | 'streak' | 'guide_why';
```

(b) Add a `guide_why` array to the `universal` block and to two early categories. Inside `QUOTES.fundamentals` add:
```ts
    guide_why: ['Modes are the spine of everything you touch. Fight them and the tool fights back.'],
```
Inside `QUOTES.navigation` add:
```ts
    guide_why: ['Move without the mouse or you will never keep pace with CORP.'],
```
Inside `QUOTES.universal` add:
```ts
    guide_why: ['Master the tool. The story needs operatives who can.'],
```

(c) Add the deterministic accessor at the end of the file (after `getCipherQuote`):
```ts
/**
 * Deterministic per-category "why this skill matters" line — the fallback used by
 * GuidanceEngine when a mission has no authored `why:`. Index 0 (not random) so guidance
 * derivation stays pure/testable.
 */
export function guideWhyFor(category: string | null): string {
  const cat = category ?? 'universal';
  return (
    QUOTES[cat]?.guide_why?.[0] ??
    QUOTES.universal.guide_why?.[0] ??
    'Master the tool. The story needs operatives who can.'
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test --workspace @neurovim/core -- cipher-quotes.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/data/cipher-quotes.ts packages/core/test/cipher-quotes.test.ts
git commit -m "feat(core): guide_why cipher event + deterministic guideWhyFor fallback

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Core — `GuidanceEngine` (verbosityTier, skillTagFor, deriveGuidance)

**Files:**
- Create: `packages/core/src/engine/GuidanceEngine.ts`
- Modify: `packages/core/src/index.ts`
- Test: `packages/core/test/GuidanceEngine.test.ts` (create)

- [ ] **Step 1: Write the failing test** — create `packages/core/test/GuidanceEngine.test.ts`:

```ts
import { verbosityTier, skillTagFor, deriveGuidance } from '../src/engine/GuidanceEngine';
import { CHEATSHEET } from '../src/data/cheatsheet';

const base = {
  category: 'fundamentals',
  summary: 'Learn the three modes.',
  why: undefined as string | undefined,
  next: { mission_id: 'M-02', title: 'Basic Navigation', category: 'navigation' },
  cheatsheet: CHEATSHEET,
  level: 1,
  pin: null as 'open' | 'quiet' | null,
};

describe('verbosityTier', () => {
  it('maps levels to tiers at the boundaries', () => {
    expect(verbosityTier(1)).toBe(0);
    expect(verbosityTier(2)).toBe(0);
    expect(verbosityTier(3)).toBe(1);
    expect(verbosityTier(5)).toBe(1);
    expect(verbosityTier(6)).toBe(2);
    expect(verbosityTier(99)).toBe(2);
  });
});

describe('skillTagFor', () => {
  it('maps a known category to a friendly label', () => {
    expect(skillTagFor('navigation')).toMatch(/hjkl/i);
  });
  it('falls back to the raw category, then a generic for null', () => {
    expect(skillTagFor('made-up')).toBe('made-up');
    expect(skillTagFor(null)).toBe('Vim practice');
  });
});

describe('deriveGuidance', () => {
  it('uses the authored why when present', () => {
    const g = deriveGuidance({ ...base, why: 'Custom reason.' });
    expect(g.why).toBe('Custom reason.');
  });
  it('falls back to guideWhyFor when why is absent/blank', () => {
    const g = deriveGuidance({ ...base, why: '   ' });
    expect(g.why).toMatch(/mode/i);
  });
  it('derives keys from the category', () => {
    const g = deriveGuidance(base);
    expect(g.keys.map((k) => k.key)).toContain('i');
  });
  it('builds leadsTo from next, null at arc end', () => {
    expect(deriveGuidance(base).leadsTo).toBe('Basic Navigation (M-02)');
    expect(deriveGuidance({ ...base, next: null }).leadsTo).toBeNull();
  });
  it('debrief names the next step, or THE RAVEN at the end', () => {
    expect(deriveGuidance(base).debrief).toMatch(/M-02/);
    expect(deriveGuidance({ ...base, next: null }).debrief).toMatch(/RAVEN/);
  });
  it('tier follows level by default and the pin override wins', () => {
    expect(deriveGuidance({ ...base, level: 7 }).tier).toBe(2);
    expect(deriveGuidance({ ...base, level: 7, pin: 'open' }).tier).toBe(0);
    expect(deriveGuidance({ ...base, level: 1, pin: 'quiet' }).tier).toBe(2);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test --workspace @neurovim/core -- GuidanceEngine.test.ts`
Expected: FAIL — cannot find module `../src/engine/GuidanceEngine`.

- [ ] **Step 3: Implement** — create `packages/core/src/engine/GuidanceEngine.ts`:

```ts
/**
 * GuidanceEngine — pure derivation of the diegetic guidance shown across the journey
 * (rail, briefing, NEXUS, result). No DOM/obsidian. The single hand-authored input is
 * a mission's `why:` line; everything else is derived from category, the cheatsheet,
 * the next mission, and the player's level. Adaptive visibility = verbosityTier(level),
 * overridable by a user pin.
 */
import { CheatsheetCategory, Keybinding } from '../data/cheatsheet';
import { getHintKeys } from '../utils/hints';
import { guideWhyFor } from '../data/cipher-quotes';

export type VerbosityTier = 0 | 1 | 2; // 0 full · 1 compact · 2 spine-only

export interface GuidanceInput {
  category: string | null;
  summary?: string;
  why?: string;
  /** Next mission in the same arc, or null at an arc's end. */
  next: { mission_id: string; title: string; category: string } | null;
  cheatsheet: CheatsheetCategory[];
  level: number;
  /** User override of the adaptive default. */
  pin?: 'open' | 'quiet' | null;
}

export interface GuidanceModel {
  skillTag: string;
  keys: Keybinding[];
  why: string;
  leadsTo: string | null;
  debrief: string;
  tier: VerbosityTier;
}

const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: 'Modes & editing',
  navigation: 'Navigation (hjkl)',
  'word-movement': 'Word movement',
  operators: 'Operators (d, c, y)',
  'text-objects': 'Text objects',
  'search-replace': 'Search & replace',
  'marks-macros': 'Marks & macros',
  registers: 'Registers',
  case: 'Case operators',
  'visual-block': 'Visual block',
  'ex-commands': 'Ex commands',
  'pane-nav': 'Window panes',
  regex: 'Regex',
  combined: 'Combined skills',
};

export function skillTagFor(category: string | null): string {
  if (!category) return 'Vim practice';
  return CATEGORY_LABELS[category] ?? category;
}

export function verbosityTier(level: number): VerbosityTier {
  if (level <= 2) return 0;
  if (level <= 5) return 1;
  return 2;
}

export function deriveGuidance(input: GuidanceInput): GuidanceModel {
  const tier: VerbosityTier =
    input.pin === 'open' ? 0 : input.pin === 'quiet' ? 2 : verbosityTier(input.level);
  const skillTag = skillTagFor(input.category);
  const leadsTo = input.next ? `${input.next.title} (${input.next.mission_id})` : null;
  const debrief = input.next
    ? `You can use ${skillTag.toLowerCase()} now. Next: ${skillTagFor(input.next.category).toLowerCase()} — ${input.next.mission_id}.`
    : `You can use ${skillTag.toLowerCase()} now. Arc clear — THE RAVEN awaits.`;
  return {
    skillTag,
    keys: getHintKeys(input.category, input.cheatsheet),
    why: input.why?.trim() || guideWhyFor(input.category),
    leadsTo,
    debrief,
    tier,
  };
}
```

- [ ] **Step 4: Export from the barrel** — in `packages/core/src/index.ts`, add under the `// ── Engine` block (after the `ParTier` line):

```ts
export * from './engine/GuidanceEngine';
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm test --workspace @neurovim/core -- GuidanceEngine.test.ts`
Expected: PASS (all `deriveGuidance` / `verbosityTier` / `skillTagFor` assertions green).

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/engine/GuidanceEngine.ts packages/core/src/index.ts packages/core/test/GuidanceEngine.test.ts
git commit -m "feat(core): GuidanceEngine — derive skill-tag/keys/why/leads-to/debrief + verbosity tier

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Content + types — surface `why`/`summary`, add `getManual()`, author M-01

**Files:**
- Modify: `packages/core/src/types.ts`
- Modify: `packages/content/src/index.ts`
- Modify: `packages/content/src/content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes.md`
- Create: `packages/adapter-web/test/guidance-wiring.test.ts`

- [ ] **Step 1: Extend `MissionFrontmatter`** — in `packages/core/src/types.ts`, inside `interface MissionFrontmatter` (after `par_keystrokes?`):

```ts
  /** One-line mission summary (existing in markdown; now typed). */
  summary?: string;
  /** Authored CIPHER "why this skill matters" line. Optional; GuidanceEngine falls back to guideWhyFor. */
  why?: string;
```

- [ ] **Step 2: Add persistence flags** — in `packages/core/src/types.ts`, inside `interface PluginData` (after `ambient_enabled: boolean;`):

```ts
  /** First-run "What is Vim" primer gate. */
  vimPrimerSeen: boolean;
  /** Comms-Rail user override of the adaptive default. */
  railPin: 'open' | 'quiet' | null;
```

And in `DEFAULT_PLUGIN_DATA` (after `ambient_enabled: false,`):

```ts
  vimPrimerSeen: false,
  railPin: null,
```

- [ ] **Step 3: Carry `summary`/`why` through `toSummary`** — in `packages/content/src/index.ts`, inside `toSummary`'s returned object (after the `par_keystrokes:` line):

```ts
    summary: fm.summary != null ? String(fm.summary) : undefined,
    why: fm.why != null ? String(fm.why) : undefined,
```

- [ ] **Step 4: Add `getManual()`** — in `packages/content/src/index.ts`, after `getWelcome()`:

```ts
/** The comprehensive Vim reference manual (EN) body — for the Reference overlay's Manual tab. */
export function getManual(): string {
  const e = ENTRIES.find((x) => x.role === 'ref' && x.id.includes('EN'));
  return e ? e.body : '';
}
```

- [ ] **Step 5: Author M-01's `why:`** — in `packages/content/src/content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes.md`, add a `why:` line to the frontmatter (after the `summary:` line, line 14):

```yaml
why: "Modes are the spine of everything you'll touch. Get them wrong and the tool fights you."
```

- [ ] **Step 6: Rebuild generated content**

Run: `npm run build:content`
Expected: `[content build] N entries → …` printed; `packages/content/src/generated/content.ts` now contains `"why": "Modes are the spine…"` and `"summary"` for M-01.

- [ ] **Step 7: Write the wiring test** — create `packages/adapter-web/test/guidance-wiring.test.ts`:

```ts
/**
 * Wiring contract: the content manifest feeds the pure GuidanceEngine, and the Reference
 * manual is reachable — without rendering any UI/CM6 (the brittle part). Guards the data
 * path App.tsx uses to build the Comms-Rail / briefing / result guidance.
 */
import { CHEATSHEET, deriveGuidance } from '@neurovim/core';
import { getMission, getManual, listMissions } from '@neurovim/content';

function nextSummary(id: string) {
  const list = listMissions(id.startsWith('R-') ? 'II' : 'I');
  const i = list.findIndex((m) => m.mission_id === id);
  if (i < 0 || i >= list.length - 1) return null;
  const n = list[i + 1];
  return { mission_id: n.mission_id, title: n.title, category: n.category };
}

describe('guidance wiring', () => {
  it('M-01 carries summary + authored why through the manifest', () => {
    const m = getMission('M-01');
    expect(m.summary).toMatch(/modes/i);
    expect(m.why).toMatch(/spine/i);
  });

  it('deriveGuidance builds a usable model from a real mission', () => {
    const m = getMission('M-01');
    const g = deriveGuidance({
      category: m.category, summary: m.summary, why: m.why,
      next: nextSummary('M-01'), cheatsheet: CHEATSHEET, level: 1, pin: null,
    });
    expect(g.skillTag).toBeTruthy();
    expect(g.keys.length).toBeGreaterThan(0);
    expect(g.why).toMatch(/spine/i);
    expect(g.leadsTo).toMatch(/M-02/);
    expect(g.tier).toBe(0);
  });

  it('getManual returns the comprehensive reference body', () => {
    expect(getManual().length).toBeGreaterThan(200);
  });
});
```

- [ ] **Step 8: Run the wiring test + typecheck**

Run: `npm test --workspace @neurovim/adapter-web -- guidance-wiring.test.ts`
Expected: PASS.
Run: `npm run typecheck`
Expected: all 4 workspaces green (new `MissionFrontmatter`/`PluginData` fields compile).

- [ ] **Step 9: Commit**

```bash
git add packages/core/src/types.ts packages/content/src/index.ts \
  "packages/content/src/content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes.md" \
  packages/content/src/generated/content.ts \
  packages/adapter-web/test/guidance-wiring.test.ts
git commit -m "feat(content): surface why/summary + getManual; type guidance flags; author M-01 why

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Web — unified `ReferenceOverlay` (Cheat-Sheet | Manual)

**Files:**
- Create: `packages/adapter-web/src/ui/ReferenceOverlay.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Modify: `packages/adapter-web/src/ui/BriefingView.tsx`
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Create the overlay** — `packages/adapter-web/src/ui/ReferenceOverlay.tsx`:

```tsx
/**
 * ReferenceOverlay — one reference surface, two tabs: Cheat-Sheet (categorized keymap,
 * active mission category floated to top) and Manual (the comprehensive REF doc). Replaces
 * the old CheatsheetOverlay as the single reference entry, reachable from NEXUS, Briefing and
 * Mission. role=dialog + Escape + Tab focus-trap (mirrors the former overlay).
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { CHEATSHEET, getOrderedCategories } from '@neurovim/core';
import { getManual } from '@neurovim/content';
import { renderMarkdown } from './markdown';

interface Props {
  onClose: () => void;
  /** Active mission category (from the editor/briefing) — floated to the top. null from NEXUS. */
  activeCategory?: string | null;
}

export function ReferenceOverlay({ onClose, activeCategory = null }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'keys' | 'manual'>('keys');
  const cats = getOrderedCategories(CHEATSHEET.map((c) => c.id), activeCategory);
  const manualHtml = renderMarkdown(getManual());

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'));
        if (f.length === 0) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [onClose]);

  return (
    <div class="nv-sheet-backdrop" onClick={onClose}>
      <div ref={panel} class="nv-sheet" role="dialog" aria-modal="true" aria-label="Vim reference"
           onClick={(e) => e.stopPropagation()}>
        <div class="nv-sheet-bar">
          <div class="nv-ref-tabs" role="tablist">
            <button class={`nv-ref-tab${tab === 'keys' ? ' nv-ref-tab-on' : ''}`} role="tab"
                    aria-selected={tab === 'keys'} onClick={() => setTab('keys')}>&gt;_ CHEAT-SHEET</button>
            <button class={`nv-ref-tab${tab === 'manual' ? ' nv-ref-tab-on' : ''}`} role="tab"
                    aria-selected={tab === 'manual'} onClick={() => setTab('manual')}>&gt;_ MANUAL</button>
          </div>
          <button class="nv-sheet-x" onClick={onClose} aria-label="Close reference">✕ Esc</button>
        </div>
        {tab === 'keys' ? (
          <div class="nv-sheet-body">
            {cats.map((c) => (
              <section class="nv-sheet-cat" key={c.id}>
                <div class="nv-sheet-cat-label nv-label">{c.label}</div>
                {c.groups.map((g) => (
                  <div class="nv-sheet-group" key={g.label}>
                    <div class="nv-sheet-group-label">{g.label}</div>
                    {g.keys.map((k) => (
                      <div class="nv-kv" key={k.key}>
                        <code class="nv-kv-k">{k.key}</code>
                        <span class="nv-kv-d">{k.description}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <article class="nv-sheet-body nv-md" dangerouslySetInnerHTML={{ __html: manualHtml }} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Swap App's overlay** — in `packages/adapter-web/src/ui/App.tsx`:

(a) Replace the lazy import (lines 38–40):
```tsx
const ReferenceOverlay = lazy(() =>
  import('./ReferenceOverlay').then((m) => ({ default: m.ReferenceOverlay })),
);
```

(b) Mission-view usage (the `cheatOpen` block, ~lines 191–195):
```tsx
        {cheatOpen && (
          <Suspense fallback={null}>
            <ReferenceOverlay activeCategory={mission.category} onClose={() => setCheatOpen(false)} />
          </Suspense>
        )}
```

(c) NEXUS-view usage (the `cheatOpen` block, ~lines 335–339):
```tsx
      {cheatOpen && (
        <Suspense fallback={null}>
          <ReferenceOverlay onClose={() => setCheatOpen(false)} />
        </Suspense>
      )}
```

- [ ] **Step 3: Make reference reachable from the Briefing** — in `App.tsx`, replace the `briefing` branch (lines 161–173) with:

```tsx
  if (view === 'briefing' && mission) {
    return (
      <>
        <Suspense fallback={<div class="nv-loading">loading briefing…</div>}>
          <BriefingView
            missionId={mission.mission_id}
            title={mission.title}
            briefingBody={mission.briefingBody}
            onBegin={() => setView('mission')}
            onBack={() => setView('nexus')}
            onReference={() => setCheatOpen(true)}
          />
        </Suspense>
        {cheatOpen && (
          <Suspense fallback={null}>
            <ReferenceOverlay activeCategory={mission.category} onClose={() => setCheatOpen(false)} />
          </Suspense>
        )}
      </>
    );
  }
```

- [ ] **Step 4: Add the Briefing reference button** — in `packages/adapter-web/src/ui/BriefingView.tsx`:

(a) Extend `Props`:
```tsx
interface Props {
  missionId: string;
  title: string;
  briefingBody: string;
  onBegin: () => void;
  onBack: () => void;
  onReference?: () => void;
}
```

(b) Update the signature + the bar (the `nv-doc-bar` block):
```tsx
export function BriefingView({ missionId, title, briefingBody, onBegin, onBack, onReference }: Props) {
  const html = renderMarkdown(briefingBody?.trim() || '_No briefing on file for this mission._');
  return (
    <div class="nv-doc nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-doc-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-doc-title">{missionId} · {title}</span>
        {onReference && (
          <button class="nv-editor-keys" onClick={onReference} aria-label="Vim reference" title="Vim reference">⌨ Reference</button>
        )}
        <button class="nv-submit" onClick={onBegin}>Begin Mission →</button>
      </div>
```
(leave the rest of the component unchanged.)

- [ ] **Step 5: Add overlay tab styles** — append to `packages/adapter-web/src/styles.css`:

```css
/* Reference overlay — tabbed Cheat-Sheet | Manual */
.nv-ref-tabs { display: flex; gap: 0.5rem; }
.nv-ref-tab {
  background: transparent; border: 1px solid var(--nv-border); color: var(--nv-dim);
  font: inherit; padding: 0.2rem 0.7rem; border-radius: 4px; cursor: pointer;
}
.nv-ref-tab-on { color: var(--nv-fg); border-color: var(--nv-accent); box-shadow: 0 0 8px var(--nv-glow); }
```

(If `--nv-dim`/`--nv-glow` are not defined tokens, use the nearest existing ones — check `:root` in styles.css; `--nv-accent`, `--nv-fg`, `--nv-border` are canonical.)

- [ ] **Step 6: Typecheck + dev verify**

Run: `npm run typecheck`
Expected: 4 workspaces green.
Run: `npm run dev` → open http://localhost:5173/ → NEXUS ⌨ opens the overlay; tabs switch Cheat-Sheet ↔ Manual; open a briefing → ⌨ Reference works; open a mission → ⌨ Keys works. Esc closes; focus returns.

- [ ] **Step 7: Commit**

```bash
git add packages/adapter-web/src/ui/ReferenceOverlay.tsx packages/adapter-web/src/ui/App.tsx \
  packages/adapter-web/src/ui/BriefingView.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): unified Reference overlay (Cheat-Sheet | Manual), reachable from briefing too

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Web — `CommsRail` + editor integration + pin persistence

**Files:**
- Create: `packages/adapter-web/src/ui/CommsRail.tsx`
- Modify: `packages/adapter-web/src/ui/MissionEditor.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Create the rail** — `packages/adapter-web/src/ui/CommsRail.tsx`:

```tsx
/**
 * CommsRail — diegetic CIPHER channel beside the editor. Carries Objective · Why · Keys ·
 * ↳ Manual · ↳ reveal, in the CIPHER voice. Adaptive by guidance.tier: 0 full · 1 compact
 * (keys inline, objective/why on tap) · 2 spine-only (everything on tap). A pin toggle
 * overrides the level default. Presentational — all data comes from GuidanceModel.
 */
import { useState } from 'preact/hooks';
import type { GuidanceModel } from '@neurovim/core';

interface Props {
  guidance: GuidanceModel;
  objective: string;
  pin: 'open' | 'quiet' | null;
  onPin: (p: 'open' | 'quiet' | null) => void;
  onManual: () => void;
  onReveal: () => void;
  revealed: boolean;
}

export function CommsRail({ guidance, objective, pin, onPin, onManual, onReveal, revealed }: Props) {
  const spine = guidance.tier === 2;
  const [open, setOpen] = useState(false);
  const showFull = !spine || open;

  if (spine && !open) {
    return (
      <aside class="nv-rail nv-rail-spine" aria-label="CIPHER guidance">
        <button class="nv-rail-glyph" title="Expand CIPHER guidance" onClick={() => setOpen(true)}>◢</button>
      </aside>
    );
  }

  return (
    <aside class="nv-rail" aria-label="CIPHER guidance">
      <div class="nv-rail-head">
        <span class="nv-rail-cipher">◢ CIPHER</span>
        <div class="nv-rail-ctl">
          <button class="nv-rail-pin" title="Pin open" aria-pressed={pin === 'open'}
                  onClick={() => onPin(pin === 'open' ? null : 'open')}>📌</button>
          <button class="nv-rail-pin" title="Quiet" aria-pressed={pin === 'quiet'}
                  onClick={() => onPin(pin === 'quiet' ? null : 'quiet')}>—</button>
          {spine && <button class="nv-rail-pin" title="Collapse" onClick={() => setOpen(false)}>×</button>}
        </div>
      </div>

      {showFull && guidance.tier === 0 && (
        <>
          <div class="nv-rail-k">Objective</div>
          <div class="nv-rail-v">{objective}</div>
          <div class="nv-rail-k">Why</div>
          <div class="nv-rail-v nv-rail-why">{guidance.why}</div>
        </>
      )}

      <div class="nv-rail-k">Keys</div>
      <div class="nv-rail-keys">
        {guidance.keys.map((k) => <span key={k.key} title={k.description}>{k.key}</span>)}
      </div>

      <div class="nv-rail-actions">
        <button class="nv-rail-link" onClick={onManual}>↳ Manual</button>
        <button class={`nv-rail-link${revealed ? ' nv-rail-link-on' : ''}`} onClick={onReveal}>
          {revealed ? '↳ hide corruption' : '↳ reveal corruption'}
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Add the reveal CM6 field** — create `packages/adapter-web/src/ui/reveal.ts`:

```ts
/**
 * Reveal-corruption — a CM6 line-decoration field driven by a StateEffect. Highlights the
 * lines that still differ from the solution (location to look at — never the fix). The host
 * computes the divergent line indices (core getDivergentLines) and dispatches them.
 */
import { StateEffect, StateField, RangeSetBuilder } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';

export const setRevealLines = StateEffect.define<number[]>();

const lineMark = Decoration.line({ class: 'nv-reveal-line' });

export const revealField = StateField.define<DecorationSet>({
  create() { return Decoration.none; },
  update(deco, tr) {
    deco = deco.map(tr.changes);
    for (const e of tr.effects) {
      if (e.is(setRevealLines)) {
        const builder = new RangeSetBuilder<Decoration>();
        for (const idx of e.value) {
          if (idx >= 0 && idx < tr.state.doc.lines) {
            const line = tr.state.doc.line(idx + 1); // CM lines are 1-based
            builder.add(line.from, line.from, lineMark);
          }
        }
        deco = builder.finish();
      }
    }
    return deco;
  },
  provide: (f) => EditorView.decorations.from(f),
});
```

- [ ] **Step 3: Integrate rail + reveal into the editor** — rewrite `packages/adapter-web/src/ui/MissionEditor.tsx`:

```tsx
/**
 * MissionEditor — CodeMirror-6 editor with Vim-Mode. Now hosts the CIPHER Comms-Rail
 * (guidance) beside the buffer and a reveal-corruption affordance (highlights lines still
 * differing from the solution). The submit/metrics contract is unchanged.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { MetricsTracker, getDivergentLines, type MetricsResult, type MissionDoc, type GuidanceModel } from '@neurovim/core';
import { neurovimTheme, vimModeIndicator, type VimMode } from './cm6-theme';
import { revealField, setRevealLines } from './reveal';
import { CommsRail } from './CommsRail';

interface Props {
  mission: MissionDoc;
  guidance: GuidanceModel;
  pin: 'open' | 'quiet' | null;
  onPin: (p: 'open' | 'quiet' | null) => void;
  onSubmit: (content: string, metrics: MetricsResult) => void;
  onBack: () => void;
  onCheatsheet?: () => void;
}

export function MissionEditor({ mission, guidance, pin, onPin, onSubmit, onBack, onCheatsheet }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const metrics = useRef(new MetricsTracker());
  const [mode, setMode] = useState<VimMode>('NORMAL');
  const [keys, setKeys] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    const tracker = metrics.current;
    tracker.reset();
    tracker.start();
    setKeys(0);
    setRevealed(false);
    const t0 = performance.now();
    const timer = window.setInterval(() => setElapsed((performance.now() - t0) / 1000), 100);

    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: mission.transmissionBody,
        extensions: [
          vim(),
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.lineWrapping,
          EditorView.domEventHandlers({
            keydown() { tracker.addKeystroke(); setKeys((k) => k + 1); return false; },
          }),
          neurovimTheme,
          vimModeIndicator(setMode),
          revealField,
        ],
      }),
    });
    view.current = v;
    return () => { window.clearInterval(timer); v.destroy(); };
  }, [mission.mission_id]);

  function toggleReveal() {
    const v = view.current;
    if (!v) return;
    if (revealed) {
      v.dispatch({ effects: setRevealLines.of([]) });
      setRevealed(false);
    } else {
      const lines = getDivergentLines(v.state.doc.toString(), mission.solution ?? '');
      v.dispatch({ effects: setRevealLines.of(lines) });
      setRevealed(true);
    }
  }

  return (
    <div class="nv-editor nv-hud-frame">
      <span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-editor-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-editor-title">{mission.mission_id} · {mission.title}</span>
        {onCheatsheet && (
          <button class="nv-editor-keys" onClick={onCheatsheet} aria-label="Vim reference" title="Vim reference (keys)">⌨ Keys</button>
        )}
        <button class="nv-submit"
                onClick={() => onSubmit(view.current?.state.doc.toString() ?? '', metrics.current.getResult())}>
          Submit (verify)
        </button>
      </div>

      <div class="nv-editor-main">
        <div ref={host} class="nv-cm-host" />
        <CommsRail
          guidance={guidance}
          objective={mission.summary ?? 'Restore the transmission.'}
          pin={pin}
          onPin={onPin}
          onManual={() => onCheatsheet?.()}
          onReveal={toggleReveal}
          revealed={revealed}
        />
      </div>

      <div class="nv-editor-status">
        <span class="nv-mode-chip" data-mode={mode} aria-live="polite">{mode}</span>
        <span class="nv-file">{mission.mission_id}-TRANSMISSION</span>
        <span class="nv-hud">
          <span>⏱ <strong>{elapsed.toFixed(1)}s</strong></span>
          <span>⌁ <strong>{keys}</strong></span>
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Wire guidance + pin in App** — in `packages/adapter-web/src/ui/App.tsx`:

(a) Extend the core import (lines 8–13) to add `deriveGuidance, CHEATSHEET`:
```tsx
import {
  MissionEngine, ProgressionEngine, AudioEngine, SoundCues,
  resolvePar, tierFor, keystrokesToNextTier, unlockLevelFor,
  deriveGuidance, skillTagFor, verbosityTier, CHEATSHEET,
  DEFAULT_PLUGIN_DATA, type PluginData, type MissionDoc, type MetricsResult,
  type MissionSummary, type SandboxDifficulty,
} from '@neurovim/core';
```

(b) Add a `nextSummary` helper next to `nextMissionId` (after line 47):
```tsx
/** Next mission's id+title+category (for guidance "leads to"). */
function nextSummary(id: string): { mission_id: string; title: string; category: string } | null {
  const list = listMissions(id.startsWith('R-') ? 'II' : 'I');
  const i = list.findIndex((m) => m.mission_id === id);
  if (i < 0 || i >= list.length - 1) return null;
  const n = list[i + 1];
  return { mission_id: n.mission_id, title: n.title, category: n.category };
}
```

(c) Add a pin setter inside `App` (after `markOnboarded`, ~line 102):
```tsx
  async function setRailPin(p: 'open' | 'quiet' | null) {
    const next = { ...data, railPin: p };
    setData(next);
    await storage.saveData(next);
  }
```

(d) Replace the `mission` view branch (lines 175–198) so it derives guidance and passes it down:
```tsx
  if (view === 'mission' && mission) {
    const level = ProgressionEngine.getXpProgress(data.total_xp).level;
    const guidance = deriveGuidance({
      category: mission.category, summary: mission.summary, why: mission.why,
      next: nextSummary(mission.mission_id), cheatsheet: CHEATSHEET, level, pin: data.railPin ?? null,
    });
    return (
      <>
        <Suspense fallback={<div class="nv-loading">loading editor…</div>}>
          <MissionEditor mission={mission} guidance={guidance} pin={data.railPin ?? null} onPin={setRailPin}
                         onSubmit={submit} onBack={() => setView('nexus')} onCheatsheet={() => setCheatOpen(true)} />
        </Suspense>
        {result && (
          <MissionResult
            result={result}
            missionTitle={mission.title}
            hasNext={result.status === 'complete' && (() => { const n = nextMissionId(mission.mission_id); return n != null && data.unlocked.includes(n); })()}
            onRetry={() => setResult(null)}
            onNext={() => { const n = nextMissionId(mission.mission_id); if (n) selectMission(n); }}
            onNexus={() => { const gained = result.status === 'complete'; const ju = result.unlocked ?? []; setResult(null); setView('nexus'); if (gained) flashXp(); if (ju.length) markJustUnlocked(ju); }}
          />
        )}
        {cheatOpen && (
          <Suspense fallback={null}>
            <ReferenceOverlay activeCategory={mission.category} onClose={() => setCheatOpen(false)} />
          </Suspense>
        )}
      </>
    );
  }
```

- [ ] **Step 5: Add rail + reveal styles** — append to `packages/adapter-web/src/styles.css`:

```css
/* Comms-Rail (CIPHER guidance beside the editor) */
.nv-editor-main { display: flex; gap: 0; align-items: stretch; }
.nv-editor-main .nv-cm-host { flex: 1; min-width: 0; }
.nv-rail {
  flex: 0 0 11rem; border-left: 1px solid var(--nv-accent);
  background: color-mix(in srgb, var(--nv-bg) 88%, var(--nv-accent));
  padding: 0.5rem 0.6rem; font-size: 0.72rem; color: var(--nv-fg);
}
.nv-rail-spine { flex-basis: 1.6rem; padding: 0.4rem 0; text-align: center; }
.nv-rail-glyph, .nv-rail-pin, .nv-rail-link {
  background: transparent; border: none; color: var(--nv-accent); cursor: pointer; font: inherit;
}
.nv-rail-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.nv-rail-cipher { color: var(--nv-accent); font-weight: 700; }
.nv-rail-k { color: var(--nv-accent); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px; margin-top: 0.5rem; }
.nv-rail-v { color: var(--nv-fg); line-height: 1.35; }
.nv-rail-keys span {
  display: inline-block; border: 1px solid var(--nv-accent); border-radius: 3px;
  padding: 0 0.3rem; margin: 0.15rem 0.15rem 0 0; color: var(--nv-fg);
}
.nv-rail-actions { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.6rem; }
.nv-rail-link { text-align: left; }
.nv-rail-link-on { color: var(--nv-fg); text-decoration: underline; }
/* Reveal-corruption line highlight */
.nv-reveal-line { background: color-mix(in srgb, transparent 84%, #ff5a5a); }
@media (max-width: 720px) { .nv-rail { flex-basis: 8rem; } }
```

(If `color-mix` is not already used in styles.css, substitute a static `rgba()` matching the nearest `--nv-*` color — keep it token-aligned.)

- [ ] **Step 6: Typecheck + dev verify**

Run: `npm run typecheck`
Expected: 4 workspaces green.
Run: `npm run dev` → open a mission: the rail shows Objective/Why/Keys at level 1; 📌 pins open, — sets quiet (rail collapses to spine ◢, expandable); ↳ reveal corruption highlights the differing lines; ↳ Manual opens the overlay.

- [ ] **Step 7: Commit**

```bash
git add packages/adapter-web/src/ui/CommsRail.tsx packages/adapter-web/src/ui/reveal.ts \
  packages/adapter-web/src/ui/MissionEditor.tsx packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): CIPHER Comms-Rail + reveal-corruption + pin (adaptive in-mission guidance)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Web — Briefing guidance panel + Result debrief

**Files:**
- Modify: `packages/adapter-web/src/ui/BriefingView.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Modify: `packages/adapter-web/src/ui/MissionResult.tsx`
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Briefing guidance panel** — in `packages/adapter-web/src/ui/BriefingView.tsx`:

(a) Extend `Props` with the guidance fields:
```tsx
interface Props {
  missionId: string;
  title: string;
  briefingBody: string;
  skillTag?: string;
  why?: string;
  leadsTo?: string | null;
  onBegin: () => void;
  onBack: () => void;
  onReference?: () => void;
}
```

(b) Update the signature + insert a guidance panel above the markdown article:
```tsx
export function BriefingView({ missionId, title, briefingBody, skillTag, why, leadsTo, onBegin, onBack, onReference }: Props) {
  const html = renderMarkdown(briefingBody?.trim() || '_No briefing on file for this mission._');
  return (
    <div class="nv-doc nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-doc-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-doc-title">{missionId} · {title}</span>
        {onReference && (
          <button class="nv-editor-keys" onClick={onReference} aria-label="Vim reference" title="Vim reference">⌨ Reference</button>
        )}
        <button class="nv-submit" onClick={onBegin}>Begin Mission →</button>
      </div>
      {(skillTag || why || leadsTo) && (
        <div class="nv-brief-guide">
          {skillTag && (<><span class="nv-brief-k">What you'll learn</span><span class="nv-brief-v">{skillTag}</span></>)}
          {why && (<><span class="nv-brief-k">Why</span><span class="nv-brief-v">{why}</span></>)}
          {leadsTo && (<><span class="nv-brief-k">Leads to</span><span class="nv-brief-v">{leadsTo}</span></>)}
        </div>
      )}
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary" onClick={onBegin}>Begin Mission →</button>
        <button onClick={onBack}>← Back to NEXUS</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Pass guidance into the Briefing** — in `App.tsx`, update the `briefing` branch's `<BriefingView .../>` to derive + pass the fields:
```tsx
        <Suspense fallback={<div class="nv-loading">loading briefing…</div>}>
          {(() => {
            const g = deriveGuidance({
              category: mission.category, summary: mission.summary, why: mission.why,
              next: nextSummary(mission.mission_id), cheatsheet: CHEATSHEET,
              level: ProgressionEngine.getXpProgress(data.total_xp).level, pin: data.railPin ?? null,
            });
            return (
              <BriefingView
                missionId={mission.mission_id}
                title={mission.title}
                briefingBody={mission.briefingBody}
                skillTag={g.skillTag}
                why={g.why}
                leadsTo={g.leadsTo}
                onBegin={() => setView('mission')}
                onBack={() => setView('nexus')}
                onReference={() => setCheatOpen(true)}
              />
            );
          })()}
        </Suspense>
```

- [ ] **Step 3: Result debrief** — in `packages/adapter-web/src/ui/MissionResult.tsx`:

(a) Add to `MissionResultData` (after `unlocked?: string[];`):
```tsx
  /** CIPHER debrief: "you can use X now → next Y". */
  debrief?: string;
```

(b) Render it at the top of the complete body (immediately after `<div class="nv-modal-body">`, before `nv-modal-xp`):
```tsx
            {result.debrief && <div class="nv-modal-debrief">{result.debrief}</div>}
```

- [ ] **Step 4: Fill the debrief in App.submit()** — in `App.tsx` `submit()`, where `setResult({ status: 'complete', … })` is built, add the field. Just before that `setResult`, compute guidance and include `debrief`:
```tsx
    const guidance = deriveGuidance({
      category: mission.category, summary: mission.summary, why: mission.why,
      next: nextSummary(mission.mission_id), cheatsheet: CHEATSHEET,
      level: ProgressionEngine.getXpProgress(next.total_xp).level, pin: data.railPin ?? null,
    });
    setResult({
      status: 'complete',
      debrief: guidance.debrief,
      xp: mission.xp_reward,
```
(append `debrief: guidance.debrief,` as a field on the existing object; keep all other fields.)

- [ ] **Step 5: Styles** — append to `packages/adapter-web/src/styles.css`:
```css
/* Briefing guidance panel + result debrief */
.nv-brief-guide {
  display: grid; grid-template-columns: max-content 1fr; gap: 0.2rem 0.8rem;
  border: 1px solid var(--nv-border); border-left: 3px solid var(--nv-accent);
  padding: 0.6rem 0.8rem; margin: 0.6rem 0; font-size: 0.82rem;
}
.nv-brief-k { color: var(--nv-accent); text-transform: uppercase; font-size: 0.62rem; letter-spacing: 1px; align-self: center; }
.nv-brief-v { color: var(--nv-fg); }
.nv-modal-debrief { color: var(--nv-accent); font-style: italic; margin-bottom: 0.5rem; }
```

- [ ] **Step 6: Typecheck + dev verify**

Run: `npm run typecheck` → green.
Run: `npm run dev` → open a briefing: the "What you'll learn / Why / Leads to" panel renders; complete a mission → the result modal shows the CIPHER debrief line at the top.

- [ ] **Step 7: Commit**
```bash
git add packages/adapter-web/src/ui/BriefingView.tsx packages/adapter-web/src/ui/App.tsx \
  packages/adapter-web/src/ui/MissionResult.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): briefing guidance panel (learn/why/leads-to) + result debrief

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Web — NEXUS skill-tags, START HERE, content-type legend

**Files:**
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Add the skill-tag + START HERE to unlocked rows** — in `App.tsx` `missionRow`, replace the unlocked-row return (the block starting `const active = m.mission_id === activeId;` through its `</button>`) with:

```tsx
    const active = m.mission_id === activeId;
    const justUp = justUnlocked.includes(m.mission_id);
    const level = ProgressionEngine.getXpProgress(data.total_xp).level;
    const showTag = verbosityTier(level) < 2;
    const bestTier = done && (rec?.best_keystrokes ?? 0) > 0
      ? tierFor(rec!.best_keystrokes, resolvePar({ parOverride: m.par_keystrokes, difficulty: m.difficulty }))
      : null;
    const cls = ['nv-row', done && 'nv-row-done', active && 'nv-row-active', justUp && 'nv-just-unlocked'].filter(Boolean).join(' ');
    return (
      <button class={cls} key={m.mission_id} onClick={() => selectMission(m.mission_id)}>
        <span class="nv-row-id">{active ? '▸ ' : ''}{m.mission_id}</span>
        <span class="nv-row-t">
          {m.title}
          {showTag && !done && <span class="nv-row-skill">{skillTagFor(m.category)}</span>}
        </span>
        {active && <span class="nv-row-start">START HERE</span>}
        {justUp && <span class="nv-row-unlocked">▸ UNLOCKED</span>}
        {bestTier && <span class={`nv-row-tier nv-tier-${bestTier}`} title={`best: ${bestTier}`}>{bestTier === 'gold' ? '★' : bestTier === 'silver' ? '◆' : '▲'}</span>}
        {done && (rec?.best_time_ms ?? 0) > 0
          ? <span class="nv-row-meta">{fmtTime(rec!.best_time_ms)} · {rec!.best_keystrokes}ks</span>
          : <span class="nv-row-meta">{m.xp_reward} XP</span>}
        {done && <span class="nv-row-x">✓</span>}
      </button>
    );
```

- [ ] **Step 2: Add the content-type legend** — in `App.tsx`, insert directly after the `nv-stats` block (after line ~297, before the `nv-allclear` conditional):

```tsx
      <div class="nv-legend nv-label">
        <span><b>M</b> story mission</span>
        <span><b>KATA</b> free drill</span>
        <span><b>RAVEN</b> sandbox</span>
        <span><b>Archive</b> lore + reference</span>
      </div>
```

- [ ] **Step 3: Styles** — append to `packages/adapter-web/src/styles.css`:
```css
/* NEXUS guidance: skill-tags, START HERE, legend */
.nv-row-skill { color: var(--nv-dim, var(--nv-accent)); font-size: 0.68rem; margin-left: 0.5rem; opacity: 0.8; }
.nv-row-start {
  color: var(--nv-bg); background: var(--nv-accent); border-radius: 3px;
  font-size: 0.6rem; letter-spacing: 1px; padding: 0.05rem 0.35rem; margin-left: 0.4rem;
}
.nv-legend { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; margin: 0.5rem 0; opacity: 0.75; }
.nv-legend b { color: var(--nv-accent); }
```

- [ ] **Step 4: Typecheck + dev verify**

Run: `npm run typecheck` → green.
Run: `npm run dev` → NEXUS shows the active mission with a `START HERE` pill, unlocked-not-done rows show a skill-tag (hidden once you reach level 6+), and the legend explains M/KATA/RAVEN/Archive.

- [ ] **Step 5: Commit**
```bash
git add packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): NEXUS skill-tags + START HERE + content-type legend (adaptive)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Web — first-run "What is Vim" primer

**Files:**
- Create: `packages/adapter-web/src/ui/VimPrimer.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Modify: `packages/adapter-web/src/styles.css`
- Modify: `packages/adapter-web/test/guidance-wiring.test.ts`

- [ ] **Step 1: Create the primer** — `packages/adapter-web/src/ui/VimPrimer.tsx`:

```tsx
/**
 * VimPrimer — first-run "What is Vim & why" panel, in the CIPHER voice. Shown once
 * (data.vimPrimerSeen), skippable, re-readable later via the Manual. Static (no typing
 * animation) so it is reduced-motion-safe by construction. role=dialog + Escape = skip.
 */
import { useEffect, useRef } from 'preact/hooks';

interface Props { onDone: () => void; }

const LINES = [
  'Vim is the tool. A keyboard-only text editor — no mouse, no menus.',
  'Operatives use it because it is fast: you edit at the speed of thought.',
  'It has modes. NORMAL moves and commands; INSERT types; ESC returns.',
  'Here you will restore corrupted documents — every mission burns one skill into reflex.',
  'You do not need to know any of it yet. CIPHER will guide you. Begin.',
];

export function VimPrimer({ onDone }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') { e.preventDefault(); onDone(); } }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <div class="nv-modal-backdrop" onClick={onDone}>
      <div ref={panel} class="nv-modal nv-primer" role="dialog" aria-modal="true" aria-label="What is Vim"
           onClick={(e) => e.stopPropagation()}>
        <h2 class="nv-modal-title nv-ok">◢ CIPHER // ORIENTATION</h2>
        <div class="nv-modal-body nv-primer-body">
          {LINES.map((l, i) => <p key={i}>{l}</p>)}
        </div>
        <div class="nv-modal-actions">
          <button class="nv-modal-primary" onClick={onDone}>Begin →</button>
          <button onClick={onDone}>Skip</button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into App** — in `packages/adapter-web/src/ui/App.tsx`:

(a) Lazy import (next to the other lazies, ~line 40):
```tsx
const VimPrimer = lazy(() =>
  import('./VimPrimer').then((m) => ({ default: m.VimPrimer })),
);
```

(b) A persisted marker (after `markOnboarded`, ~line 102):
```tsx
  async function markPrimerSeen() {
    if (data.vimPrimerSeen) return;
    const next = { ...data, vimPrimerSeen: true };
    setData(next);
    await storage.saveData(next);
  }
```

(c) Show it over the Welcome view — replace the `welcome` branch (lines 153–159) with:
```tsx
  if (view === 'welcome') {
    return (
      <Suspense fallback={<div class="nv-loading">loading…</div>}>
        <WelcomeView onEnter={() => { unlockAudio(); setView('nexus'); }} />
        {!data.vimPrimerSeen && (
          <Suspense fallback={null}>
            <VimPrimer onDone={markPrimerSeen} />
          </Suspense>
        )}
      </Suspense>
    );
  }
```

- [ ] **Step 3: Styles** — append to `packages/adapter-web/src/styles.css`:
```css
/* First-run Vim primer */
.nv-primer-body p { margin: 0.35rem 0; line-height: 1.45; }
.nv-primer .nv-modal-title { letter-spacing: 1px; }
```

- [ ] **Step 4: Add the flags round-trip to the wiring test** — append to `packages/adapter-web/test/guidance-wiring.test.ts`:
```ts
import 'fake-indexeddb/auto';
import { DEFAULT_PLUGIN_DATA, type PluginData } from '@neurovim/core';
import { WebStorage } from '../src/ports/WebStorage';

describe('guidance persistence flags', () => {
  it('round-trips vimPrimerSeen + railPin through IndexedDB', async () => {
    const storage = new WebStorage();
    const data: PluginData = { ...DEFAULT_PLUGIN_DATA, vimPrimerSeen: true, railPin: 'quiet' };
    await storage.saveData(data, 'guide-1');
    const loaded = await storage.loadData<PluginData>('guide-1');
    expect(loaded?.vimPrimerSeen).toBe(true);
    expect(loaded?.railPin).toBe('quiet');
  });
});
```

- [ ] **Step 5: Run the test + typecheck**

Run: `npm test --workspace @neurovim/adapter-web -- guidance-wiring.test.ts` → PASS.
Run: `npm run typecheck` → green.
Run: `npm run dev` → with fresh storage (or clear IndexedDB) the primer appears once over Welcome; Skip/Begin/Esc dismiss it and it does not return on reload.

- [ ] **Step 6: Commit**
```bash
git add packages/adapter-web/src/ui/VimPrimer.tsx packages/adapter-web/src/ui/App.tsx \
  packages/adapter-web/src/styles.css packages/adapter-web/test/guidance-wiring.test.ts
git commit -m "feat(adapter-web): first-run What-is-Vim primer (once, skippable, reduced-motion-safe)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Content — author the remaining `why:` lines

**Files:**
- Modify: every `*-TRANSMISSION-*.md` under `packages/content/src/content/` that lacks a `why:` (and the KATA TRANSMISSIONs).
- Modify: `packages/content/src/generated/content.ts` (via rebuild)

> This is bounded content authoring, not code. Until a mission has `why:`, the deterministic
> `guideWhyFor(category)` fallback already covers it (shipped in Task 3) — so this task can be
> done in one pass or incrementally. Use M-01 as the template.

- [ ] **Step 1: List the missions still missing `why:`**

Run: `grep -rL '^why:' packages/content/src/content --include='*-TRANSMISSION-*.md'`
Expected: the missions not yet authored (M-02 … M-16, R-01 … R-24, KATA-01 … KATA-14).

- [ ] **Step 2: Author one `why:` line per mission**

For each file, read its `category` + `summary` and add a single in-world CIPHER line after `summary:` in the frontmatter, e.g.:
```yaml
why: "<one sentence: why this skill matters, in CIPHER's voice>"
```
Guidance: keep it to one sentence, second person or imperative, tied to the skill the mission teaches (mirror the tone of M-01's `why` and the `cipher-quotes` voice). Example for M-02 (navigation): `why: "Move without the mouse or you will never keep pace with CORP."`

- [ ] **Step 3: Rebuild + verify the gate**

Run: `npm run build:content`
Run: `npm run typecheck && npm test`
Expected: build prints entry counts; typecheck + tests green; `git status` shows the regenerated `content.ts`.

- [ ] **Step 4: Commit**
```bash
git add "packages/content/src/content" packages/content/src/generated/content.ts
git commit -m "content(guidance): author per-mission why: lines (CIPHER voice)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Full gate + branch wrap

**Files:** none (verification + integration).

- [ ] **Step 1: Run the full quality gate**

Run: `npm run typecheck && npm test && npm run build:web`
Expected: 4 workspaces typecheck green; all tests green (182 prior + new core/web tests); web build succeeds (watch the bundle-budget note — the rail/overlay/primer are small; the Manual reuses the already-lazy `marked`).

- [ ] **Step 2: Manual smoke pass (`npm run dev`)** — confirm the full journey end-to-end: first-run primer → NEXUS (START HERE + skill-tags + legend) → briefing (learn/why/leads-to + ⌨ Reference) → mission (Comms-Rail Objective/Why/Keys, pin open/quiet, ↳ reveal corruption, ↳ Manual) → submit → result debrief. Then level past 6 (or temporarily force `level`) and confirm the rail/tags recede (Tier 2).

- [ ] **Step 3: Finish the branch** — invoke `superpowers:finishing-a-development-branch` to choose merge/PR. Per project convention: fast-forward `feat/guidance-backbone` into `main` and push **both** remotes (`git push codeberg main` and `git push github main`).

---

## Self-Review (completed during planning)

**Spec coverage:** north-star diegetic guidance → CIPHER `why` + rail (Tasks 3,6); adaptive fade by level → `verbosityTier` + tier-gated rail/NEXUS (Tasks 3,6,8); Comms-Rail → Task 6; unified Reference (Cheat-Sheet|Manual, 1-click everywhere incl. briefing) → Task 5; hybrid per-mission copy (`why:` + derive) → Tasks 3,4,10; reveal-corruption (divergent lines / opt-in) → Tasks 1,6; first-run primer + `vimPrimerSeen` → Tasks 4,9; pin override + `railPin` → Tasks 4,6; Briefing+/NEXUS+/Result debrief → Tasks 7,8; persistence flags additive + default-merged → Task 4; Obsidian untouched → no obsidian tasks. All spec sections map to a task.

**Placeholder scan:** no TBD/TODO; every code step shows complete code; commands have expected output. Task 10 is genuine content authoring (M-01 template provided in Task 4) — flagged, with the fallback already shipped so the product works before it's done.

**Type consistency:** `GuidanceModel`/`GuidanceInput` (Task 3) are used verbatim in `CommsRail`/`MissionEditor`/`App` (Tasks 6–7); `deriveGuidance` signature is identical across App's three call sites; `setRevealLines`/`revealField` (Task 2-file `reveal.ts`) match the editor dispatch; `MissionFrontmatter.why?/summary?` (Task 4) feed `MissionDoc` via `toSummary` and are read as `mission.why`/`mission.summary`; `PluginData.vimPrimerSeen/railPin` defined once (Task 4), default-merged, read/written in Tasks 6,9.
