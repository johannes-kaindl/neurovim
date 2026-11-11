# Offene Konventions-Punkte

Moved verbatim from AGENTS.md (CORE-AGENT-15).


- [x] CORE-META-08 — `LICENSE-DOCS` (CC BY-SA 4.0) ergänzt, im README verlinkt (2026-06-10).
- [x] CORE-AGENT-01 — Skelett-Sektionen `Gotchas` · `Memory` · `Abweichungen von der Leitkonvention` ergänzt (2026-06-10).
- [x] CORE-AGENT-03 — `.remember/` in `.gitignore` aufgenommen (2026-06-10).
- [x] PROF-NAT-01 — Tauri-Äquivalent dokumentiert (siehe Abweichungen) (2026-06-10).
- [x] PROF-NAT-02 — `scripts/bump-version.sh` synct package.json ↔ Tauri ↔ Cargo (2026-06-10).
- [x] CORE-META-03 — `scripts/capture-screenshots.mjs` (`npm run capture:screenshots`) regeneriert `docs/screenshots/*` reproduzierbar: playwright-core + `channel:'chrome'` (kein Browser-Download), `vite preview` auf Nicht-5173-Port, IndexedDB-Seed eines populierten Story-Mode-Stands (Level 6). Desktop 1280×860@2×, Mobile 390×844@3× (2026-06-15).
- [x] CORE-META-04 — User-Manual nach Diátaxis unter `docs/manual/` (Tutorial · How-to · Reference · Explanation), aus dem README verlinkt; Reference (Vim-Keymap + Levels/Unlock) wird via `npm run build:manual` aus `packages/core/src/data/` generiert (kein Drift) (2026-06-15).
- [x] PROF-TS-01 — ESLint 10 Flat-Config + Root-`npm run lint` ergänzt (2026-06-10).
- [x] PROF-TS-04 — tsconfig-Split: `tsconfig.build.json` (Gate/Produktion) vs. `tsconfig.json` (IDE/Tests, include `test/`) je Workspace; `typecheck` läuft auf den Build-Configs (2026-06-10).

**Audit 2026-08-19** (Leitkonvention war seit dem 10./15.06. nicht mehr gegengelesen; seither
sind CORE-META-11…20, CORE-GIT-06/07, CORE-AGENT-07…09, CORE-TEST-01…10, CORE-STATE-01,
CORE-DATA-01…03, CORE-OPS-01 und PROF-TS-05 hinzugekommen):

- [x] PROF-TS-05 **[MUST]** — `lint` schlägt jetzt auf Warnungen fehl (`eslint . --max-warnings 0`).
      Vorher `eslint .`: ESLint endet bei reinen Warnungen mit exit 0, das Gate behauptete also
      eine Sauberkeit, die es nie geprüft hatte. Die Verschärfung lief beim Einbau sofort grün
      durch — es gab keine offenen Warnungen, nur keine Absicherung dagegen (2026-08-19).
- [x] CORE-META-05/06/07/08 — alle Pflicht- und empfohlenen Meta-Dateien vorhanden: `README.md`,
      `LICENSE` (AGPL-3.0), `AGENTS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`,
      `LICENSING.md`, `CLA.md`, `LICENSE-DOCS`, `.editorconfig` (2026-08-19).
- [x] CORE-META-01/02 — `readme_lint.py` gegen dieses Repo: Tier `web-app`, **keine Befunde** (2026-08-19).
- [x] CORE-META-11 — Uplink-Schaufenster-Seite erreichbar (HTTP 200) (2026-08-19).
- [x] CORE-META-16 — Der Status-Block dieser Datei führte bis heute ein zweites Release-Log
      neben `CHANGELOG.md` und lag **zwei Monate zurück** (endete bei v0.2.4, während v0.2.5 und
      v0.2.6 draußen waren). Ersetzt durch einen Kurzstand + Zeiger auf den Changelog: eine
      Wahrheit, ein Ort (2026-08-19).
- [x] CORE-GIT-05 — keine Abweichung mehr: die Regel lautet inzwischen
      `Claude Opus <Version> (1M context)` und deckt die hiesige Praxis wörtlich ab. Der frühere
      Abweichungs-Eintrag ist gestrichen (2026-08-19).
- [ ] CORE-META-13 — `npm run generate:kata` setzt einen lokalen OpenAI-kompatiblen Server voraus
      und müsste auf `jkaindl.de/uplink/llm-setup` verweisen statt Endpoint-Wissen selbst zu
      tragen. Grenzfall: die Regel ist *(user-facing)* markiert, das Werkzeug ist aber reines
      Autoren-Tooling und im README zu Recht nicht erwähnt. Zeiger deshalb hier in `AGENTS.md`
      gesetzt; ob das der Regel genügt oder das Werkzeug in den Guide gehört, ist offen.
- [ ] CORE-META-09 — `README.de.md` (optional) existiert nicht. Bewusst offen, nicht vergessen.
- [ ] **Ungeprüft geblieben** (gelten nach CORE-META-15(c) als offen): CORE-TEST-01…10,
      CORE-STATE-01, CORE-DATA-01…03, CORE-OPS-01, CORE-GIT-06/07, CORE-AGENT-07…09,
      CORE-META-12/14/17/19/20. Sie berühren Verfahren, nicht Dateien, und brauchen je einen
      eigenen Durchgang statt eines Dateichecks.

