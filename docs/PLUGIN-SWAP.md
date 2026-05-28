# Obsidian-Plugin-Swap — HOWTO (5 Min, für Jay)

Tauscht den **refaktorierten** `@neurovim/adapter-obsidian`-Build gegen das
Bestand-Plugin `neurovim-trainer` im NeuroVim-Vault. Reversibel via Backup.

> **Warum manuell?** Cowork kann Obsidian nicht visuell prüfen und arbeitet
> READ-ONLY auf dem Vault. Der Swap schreibt in den Vault — das machst Du.
> Cowork hält nur den Build aktuell + liefert Script & Checkliste.

## Was passiert

- Getauscht wird **nur `main.js`** (Monorepo liefert kein eigenes manifest/styles).
- **Unangetastet:** `manifest.json`, `styles.css` und `data.json` (= Dein Spielstand!).
- Vorher wird der ganze Plugin-Ordner nach `…neurovim-trainer.backup-<timestamp>` kopiert.

## Schritte

1. Build frisch ziehen:
   ```bash
   cd /Users/Shared/code/neurovim-standalone
   npm run build:plugin
   ```
2. Swap + Backup (ein Befehl):
   ```bash
   bash scripts/swap-obsidian-plugin.sh
   ```
3. In Obsidian neu laden: **Settings → Community Plugins → NeuroVim Trainer** aus- und wieder einschalten (oder `Cmd+R` / „Reload app without saving").

## Smoke-Test-Checkliste

Nach dem Reload der Reihe nach prüfen — bei *irgendeinem* ✗ → Rollback (unten):

- [ ] Plugin lädt ohne Fehler (Console `Cmd+Opt+I` → keine roten NeuroVim-Errors)
- [ ] `00-NEXUS.md` öffnen → Sidebar-HUD/Dashboard erscheint, XP/Level stimmen (Spielstand aus `data.json` da)
- [ ] Eine Mission öffnen (z.B. M-01) → Timer/HUD startet, Vim-Mode aktiv
- [ ] Vim-Editing funktioniert (`i`/`Esc`/`x`), Mission lösen → Submit → XP/Completion bucht
- [ ] Highscore/Metrics werden angezeigt und persistiert (Reload → bleiben erhalten)
- [ ] `99-THE_RAVEN.md` (Sandbox) öffnen → Difficulty wählbar, Glitches injizieren, Submit zählt
- [ ] ASCII-Art-Fences (CORP-Dokumente) rendern wie gewohnt

## Rollback (falls etwas ✗ ist)

Das Script gibt am Ende den genauen Befehl mit dem Backup-Pfad aus. Generisch:

```bash
PLUGIN="/Users/Shared/10_ObsidianVaults/32_NeuroVim/.obsidian/plugins/neurovim-trainer"
cp "${PLUGIN}.backup-<timestamp>/main.js" "${PLUGIN}/main.js"
# dann Plugin in Obsidian neu laden
```

`data.json` wurde nie angefasst — der Spielstand ist in jedem Fall sicher.

## Bekanntes Risiko

Phase 3 war „extract package, keep behavior" — die CSS-Klassen sollten unverändert
sein, also passt die Bestand-`styles.css` zum neuen `main.js`. Falls Styling kaputt
aussieht: das ist der wahrscheinlichste Bruchpunkt → Rollback + an Cowork melden
(dann braucht der Swap auch eine neue `styles.css` aus dem Monorepo).
