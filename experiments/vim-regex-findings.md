# Vim-Regex-Parität — Findings (Phase-3-Schritt-0)

> Empirischer Test: deckt `@replit/codemirror-vim` den Vim-Regex-Flavor ab, den ARC II unterrichtet?
> Harness: `experiments/vim-regex-harness/` — `npm install && npm run harness` → Browser öffnet, drei `:%s`-Kommandos manuell tippen.
> Spalte **Prediction** = statische Analyse (CM6-Vim-Domänenwissen). Spalte **Befund** = nach echtem Run von Jay/CC auszufüllen.

## Test-Cases (aus dem ARC-II-Curriculum)

| # | Mission | Kommando | Erwartetes Vim-Verhalten | Prediction (statisch) | Befund (Run 2026-05-28, CC headless-Browser) |
|---|---|---|---|---|---|
| 1 | **R-08** Magic Mode | `:%s/\v(ALPHA\|BETA\|GAMMA)-TIER/TIER-1/g` | Alle drei Tier-Labels → `TIER-1`. `\v` = very-magic, `(` und `\|` ohne Backslash-Magie. | ✅ wahrscheinlich OK — CM-vim übersetzt `\v` + Gruppen/Alternation. **Verify:** funktioniert `\v` ohne `\(`/`\|`-Escapes? | **Klasse b (Config).** Default (`pcre` an): `No matches for /\v(ALPHA\|BETA\|GAMMA)-TIER/m (set nopcre to use vim regexps)` — `\v` wird als JS-Regex interpretiert (`\v` = vertical tab), kein Match. Nach `:set nopcre`: **3 Matches, alle drei → `TIER-1`** ✅. |
| 2 | **R-07** Lazy Trace | `:%s/<.\{-}>//g` | Tags entfernt, Payload bleibt (lazy `.\{-}` ≠ greedy `.*`). | ⚠️ Risiko-Item — `\{-}` muss zu JS `*?` übersetzt werden. CM-vim *sollte* das können. **Verify:** wird wirklich lazy gematcht (nicht alles bis zum letzten `>`)? | **Klasse c / b-hart (Gap).** Auch unter `nopcre`: `No matches for /<.{-}>/m` — CM-vim übersetzt `\{-}` NICHT (strippt nur den Backslash → literales `{-}`, kein lazy-Quantor). Einziger echter Gap der drei. Fix = Translate-Extension (`\{-}` → lazy) **oder** Curriculum-Anpassung. |
| 3 | **R-10** Capture+Backref | `:%s/\(\w\+\): \(\w\+\)/\2 = \1/` | `KEY: value` → `value = KEY` (Magic-Mode-Default `\(` Gruppen, `\2 \1` Backrefs im Replacement). | ✅ wahrscheinlich OK — Backref-Syntax `\1`/`\2` im Replacement. **Verify:** `\1`-Syntax (Vim) vs. `$1` (JS) — akzeptiert CM-vim `\1`? | **Klasse a (nach nopcre).** Unter `nopcre`: `CHANNEL: encrypted` → `encrypted = CHANNEL`, `TIMESTAMP: 0417` → `0417 = TIMESTAMP`, `OPERATOR: raven` → `raven = OPERATOR` ✅. `\(\)`-Gruppen + `\1`/`\2`-Backrefs im Replacement funktionieren. |

## Klassifikation pro Befund (nach Run ausfüllen)
- **a (out-of-the-box):** funktioniert wie Vim, keine Maßnahme.
- **b (Übersetzungs-Schicht):** weicht ab, aber durch dünne Regex-Translate-Extension fixbar.
- **c (genuiner Gap):** nicht reproduzierbar → Curriculum-Anpassung oder Custom-CM-Extension nötig.

## Entscheidung (Run 2026-05-28)

**codemirror-vim braucht `nopcre` als Default + eine kleine Translate-Extension für `\{-}`.**

1. **`pcre` aus (`:set nopcre` bzw. `Vim.setOption('pcre', false)` beim Editor-Setup) ist Pflicht für ARC II.** Default-`pcre` interpretiert Vim-Magie (`\v`, `\(`, `\1`) als JS-Regex → R-08 bricht. Mit `nopcre` sind R-08 (very-magic) **und** R-10 (Gruppen + Backrefs) Klasse a/b — out-of-the-box korrekt.
2. **Einziger echter Gap: `\{-}` lazy (R-07).** Selbst unter `nopcre` nicht übersetzt. Optionen:
   - **(a) Translate-Extension** in der Web-`VimModeSource`: Such-Pattern vor der Übergabe pre-processen, `\{-}` → lazy-Äquivalent. Dünn, isoliert auf adapter-web.
   - **(b) Curriculum-Anpassung**: R-07 lehrt `\{-}` mit explizitem Hinweis oder alternativer Übung. Billiger, aber didaktisch ärmer (lazy ist ein Kern-Vim-Konzept).
   → Empfehlung: (a) als TODO bei ARC-II-Web-Enablement; bis dahin kein Code-Change.
3. **⚠️ `nopcre` ändert auch `/search`-Interpretation** (nicht nur `:%s`). ARC-I M-07 (`Search and Replace — f / ?`) nutzt Such-Pattern → **vor Default-Aktivierung von `nopcre` gegen ARC-I-Such-Missionen gegentesten**, sonst Regressionsgefahr. Deshalb wurde `nopcre` in diesem Spike NICHT blind in den Editor verdrahtet.

**Kein Klasse-c-Showstopper** — alle drei Pattern sind über Config + dünne Extension erreichbar. ARC-II-Web bleibt machbar.

**Aktion-Items (für ARC-II-Web-Enablement, nicht jetzt):**
- [ ] `nopcre` im Web-Editor-Setup default (nach ARC-I-Search-Regressionstest)
- [ ] `\{-}`-Translate-Extension oder R-07-Curriculum-Entscheidung
- [ ] Restliche ARC-II-Substitutions-Missionen (M-11…M-16) analog durchspielen

**Wichtig:** Egal welcher Befund — die Adapter-Boundary bleibt identisch. Der Spike betrifft nur die **Web-`VimModeSource`-Implementierung** in `@neurovim/adapter-web`, nicht den Core oder das ADR. (ADR-001 D1.)

## Notizen zum Harness
- `vim()` steht in `main.ts` VOR den anderen Keymaps (Vim muss Tasten zuerst sehen).
- Drei Fixtures in einem Buffer mit Kommentar-Headern; `:%s` wirkt auf alle Zeilen — beim Testen ggf. Range einschränken (z.B. `:2,4s/...`) um Fixtures isoliert zu prüfen.
- Browser-Konsole offen lassen für etwaige CM-vim-Fehlermeldungen bei nicht-übersetzbaren Pattern.
