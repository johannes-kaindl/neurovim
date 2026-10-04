---
repo: neurovim
stand: 2026-10-04
liefert:
  - id: web-fassung
    artefakt: die spielbare Web-Fassung unter fester URL, als Quelle fuer Oberflaechen-Capture und Markenwerte
    format: "URL https://pages.jkaindl.de/neurovim-standalone/ (gebaut aus packages/adapter-web)"
    deterministisch_aus: []
    befehl: "npx hyperframes capture https://pages.jkaindl.de/neurovim-standalone/ --json  (im Konsumenten)"
    lizenz: "AGPL-3.0-only; kommerzielle Lizenz auf Anfrage (LICENSING.md); Doku CC BY-SA 4.0"
  - id: lore
    artefakt: Missionen, Briefings, Loot, Fragmente, Referenz und CIPHERs Texte als Daten, woertlich zitierbar
    format: "Markdown unter packages/content/src/content/<kapitel>/, gebaut zu TypeScript unter packages/content/src/generated/"
    deterministisch_aus: [commit]
    befehl: "node packages/content/build.mjs"
    lizenz: "Texte CC BY-SA 4.0 (LICENSE-DOCS)"
nicht_geliefert:
  - was: Spielstand per URL-Parameter (eine Mission, ein Fortschritt, direkt aufrufbar)
    grund: "Spielstand liegt in IndexedDB des Browsers (Datenbank `neurovim`, Store `kv`, `packages/adapter-web/src/ports/WebStorage.ts`), nicht in der URL; für eine Aufnahme setzt der CDP-Treiber von neurovim-obsidian den Stand im Plugin, die Web-Fassung hat diesen Weg nicht"
  - was: Stimme von CIPHER
    grund: CIPHER hat nie gesprochen; eine Stimme entsteht in voicelab aus der Figurenbeschreibung und wird dort gefuehrt
---
# Angebot

NeuroVim liefert zwei Dinge an andere Repos: die **Web-Fassung**, die ein Video-Werkzeug einfangen kann, und die **Lore als Daten**, damit ein Clip CIPHER wörtlich zitiert statt ihn zu erfinden.

## Holen

Oberfläche: `npx hyperframes capture <URL>` im Konsumenten; das Ergebnis ist ein HyperFrames-Projekt mit Screenshots und heruntergeladenen Assets. Lore: `packages/content/src/content/` per Vendoring kopieren, `VENDOR.json` mit `source`, `commit`, `license` daneben (PROF-MEDIA-02); nichts umformulieren, Kürzungen kennzeichnen.

Die Web-Fassung unter `pages.jkaindl.de/neurovim-standalone/` wird von Hand mit `scripts/deploy-page.sh` aus einem sauberen Arbeitsbaum ausgeliefert (`docs/dev/how-to/release.md`) und trägt keinen Versionsstempel; ein Konsument stempelt deshalb das Datum des Captures, nicht einen Tag.

## Was es nicht ist

Kein Angebot an Aufnahmen aus Obsidian: die liefert das Plugin-Repo `neurovim-obsidian` über das Dach. Kein Angebot an Musik oder Klang: NeuroVim hat keine eigene Tonspur.

## Geprüft

Web-Fassung antwortet HTTP 200 (geprüft 2026-10-04); Content-Build läuft über `npm test` des Monorepos.
