# Vim regex parity — findings (Phase 3 step 0)

> Empirical test: does `@replit/codemirror-vim` cover the Vim regex flavor that ARC II teaches?
> Harness: `experiments/vim-regex-harness/` — `npm install && npm run harness` → the browser opens, type the three `:%s` commands manually.
> The **Prediction** column = static analysis (CM6-vim domain knowledge). The **Finding** column = filled in after a real run.

## Test cases (from the ARC II curriculum)

| # | Mission | Command | Expected Vim behavior | Prediction (static) | Finding (run 2026-05-28, CC headless browser) |
|---|---|---|---|---|---|
| 1 | **R-08** Magic Mode | `:%s/\v(ALPHA\|BETA\|GAMMA)-TIER/TIER-1/g` | All three tier labels → `TIER-1`. `\v` = very-magic, `(` and `\|` without backslash magic. | ✅ likely OK — CM-vim translates `\v` + groups/alternation. **Verify:** does `\v` work without `\(`/`\|` escapes? | **Class b (config).** Default (`pcre` on): `No matches for /\v(ALPHA\|BETA\|GAMMA)-TIER/m (set nopcre to use vim regexps)` — `\v` is interpreted as a JS regex (`\v` = vertical tab), no match. After `:set nopcre`: **3 matches, all three → `TIER-1`** ✅. |
| 2 | **R-07** Lazy Trace | `:%s/<.\{-}>//g` | Tags removed, payload stays (lazy `.\{-}` ≠ greedy `.*`). | ⚠️ risk item — `\{-}` must be translated to JS `*?`. CM-vim *should* handle this. **Verify:** is it really matched lazily (not everything up to the last `>`)? | **Class c / hard-b (gap).** Even under `nopcre`: `No matches for /<.{-}>/m` — CM-vim does NOT translate `\{-}` (it only strips the backslash → literal `{-}`, no lazy quantifier). The only real gap of the three. Fix = translate extension (`\{-}` → lazy) **or** curriculum adjustment. |
| 3 | **R-10** Capture+backref | `:%s/\(\w\+\): \(\w\+\)/\2 = \1/` | `KEY: value` → `value = KEY` (magic-mode-default `\(` groups, `\2 \1` backrefs in the replacement). | ✅ likely OK — backref syntax `\1`/`\2` in the replacement. **Verify:** `\1` syntax (Vim) vs. `$1` (JS) — does CM-vim accept `\1`? | **Class a (after nopcre).** Under `nopcre`: `CHANNEL: encrypted` → `encrypted = CHANNEL`, `TIMESTAMP: 0417` → `0417 = TIMESTAMP`, `OPERATOR: raven` → `raven = OPERATOR` ✅. `\(\)` groups + `\1`/`\2` backrefs in the replacement work. |

## Classification per finding

- **a (out-of-the-box):** works like Vim, no action needed.
- **b (translation layer):** deviates, but fixable with a thin regex-translate extension.
- **c (genuine gap):** not reproducible → curriculum adjustment or custom CM extension required.

## Decision (run 2026-05-28)

**codemirror-vim needs `nopcre` as the default + a small translate extension for `\{-}`.**

1. **`pcre` off (`:set nopcre` / `Vim.setOption('pcre', false)` at editor setup) is mandatory for ARC II.** Default `pcre` interprets Vim magic (`\v`, `\(`, `\1`) as a JS regex → R-08 breaks. With `nopcre`, R-08 (very-magic) **and** R-10 (groups + backrefs) are class a/b — correct out-of-the-box.
2. **The only real gap: `\{-}` lazy (R-07).** Not translated even under `nopcre`. Options:
   - **(a) Translate extension** in the web `VimModeSource`: pre-process the search pattern before handing it over, `\{-}` → lazy equivalent. Thin, isolated to adapter-web.
   - **(b) Curriculum adjustment:** R-07 teaches `\{-}` with an explicit note or an alternative exercise. Cheaper, but didactically poorer (lazy is a core Vim concept).
   → Recommendation: (a) as a TODO at ARC II web enablement; no code change until then.
3. **⚠️ `nopcre` also changes `/search` interpretation** (not just `:%s`). ARC I M-07 (`Search and Replace — f / ?`) uses search patterns → **regression-test against the ARC I search missions before making `nopcre` the default**, otherwise there's a regression risk. That's why `nopcre` was NOT blindly wired into the editor in this spike.

**No class-c showstopper** — all three patterns are reachable via config + a thin extension. ARC II on the web stays feasible.

**Action items (for ARC II web enablement, not now):**
- [ ] Default `nopcre` in the web editor setup (after the ARC I search regression test)
- [ ] `\{-}` translate extension or an R-07 curriculum decision
- [ ] Play through the remaining ARC II substitution missions (M-11…M-16) the same way

**Important:** whatever the finding — the adapter boundary stays identical. The spike only affects the **web `VimModeSource` implementation** in `@neurovim/adapter-web`, not the core or the ADR. (ADR-001 D1.)

## Notes on the harness

- `vim()` comes BEFORE the other keymaps in `main.ts` (Vim must see the keys first).
- Three fixtures in one buffer with comment headers; `:%s` acts on all lines — when testing, narrow the range (e.g. `:2,4s/...`) to check fixtures in isolation.
- Keep the browser console open for any CM-vim error messages on untranslatable patterns.
