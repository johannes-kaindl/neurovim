# Vim-Regex-Parität — Findings (Phase-3-Schritt-0)

> Empirischer Test: deckt `@replit/codemirror-vim` den Vim-Regex-Flavor ab, den ARC II unterrichtet?
> Harness: `experiments/vim-regex-harness/` — `npm install && npm run harness` → Browser öffnet, drei `:%s`-Kommandos manuell tippen.
> Spalte **Prediction** = statische Analyse (CM6-Vim-Domänenwissen). Spalte **Befund** = nach echtem Run von Jay/CC auszufüllen.

## Test-Cases (aus dem ARC-II-Curriculum)

| # | Mission | Kommando | Erwartetes Vim-Verhalten | Prediction (statisch) | Befund (nach Run) |
|---|---|---|---|---|---|
| 1 | **R-08** Magic Mode | `:%s/\v(ALPHA\|BETA\|GAMMA)-TIER/TIER-1/g` | Alle drei Tier-Labels → `TIER-1`. `\v` = very-magic, `(` und `\|` ohne Backslash-Magie. | ✅ wahrscheinlich OK — CM-vim übersetzt `\v` + Gruppen/Alternation. **Verify:** funktioniert `\v` ohne `\(`/`\|`-Escapes? | _(ausfüllen)_ |
| 2 | **R-07** Lazy Trace | `:%s/<.\{-}>//g` | Tags entfernt, Payload bleibt (lazy `.\{-}` ≠ greedy `.*`). | ⚠️ Risiko-Item — `\{-}` muss zu JS `*?` übersetzt werden. CM-vim *sollte* das können. **Verify:** wird wirklich lazy gematcht (nicht alles bis zum letzten `>`)? | _(ausfüllen)_ |
| 3 | **R-10** Capture+Backref | `:%s/\(\w\+\): \(\w\+\)/\2 = \1/` | `KEY: value` → `value = KEY` (Magic-Mode-Default `\(` Gruppen, `\2 \1` Backrefs im Replacement). | ✅ wahrscheinlich OK — Backref-Syntax `\1`/`\2` im Replacement. **Verify:** `\1`-Syntax (Vim) vs. `$1` (JS) — akzeptiert CM-vim `\1`? | _(ausfüllen)_ |

## Klassifikation pro Befund (nach Run ausfüllen)
- **a (out-of-the-box):** funktioniert wie Vim, keine Maßnahme.
- **b (Übersetzungs-Schicht):** weicht ab, aber durch dünne Regex-Translate-Extension fixbar.
- **c (genuiner Gap):** nicht reproduzierbar → Curriculum-Anpassung oder Custom-CM-Extension nötig.

## Entscheidung (nach Run)
> _Hier eintragen: pure codemirror-vim ausreichend, oder + Translation-Extension nötig, oder Curriculum-Anpassung._

**Wichtig:** Egal welcher Befund — die Adapter-Boundary bleibt identisch. Der Spike betrifft nur die **Web-`VimModeSource`-Implementierung** in `@neurovim/adapter-web`, nicht den Core oder das ADR. (ADR-001 D1.)

## Notizen zum Harness
- `vim()` steht in `main.ts` VOR den anderen Keymaps (Vim muss Tasten zuerst sehen).
- Drei Fixtures in einem Buffer mit Kommentar-Headern; `:%s` wirkt auf alle Zeilen — beim Testen ggf. Range einschränken (z.B. `:2,4s/...`) um Fixtures isoliert zu prüfen.
- Browser-Konsole offen lassen für etwaige CM-vim-Fehlermeldungen bei nicht-übersetzbaren Pattern.
