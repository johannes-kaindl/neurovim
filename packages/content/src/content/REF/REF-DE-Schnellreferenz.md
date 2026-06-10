---
title: "NEXUS // Vim Schnellreferenz"
type: 📋 Referenz
sticker: lucide//book-open
color: "#00ff41"
tags:
  - referenz
  - vim
summary: Alle wichtigen Vim-Befehle auf einen Blick. Navigation, Modi, Operatoren, Suche, Text-Objekte.
---

```ascii
╔══════════════════════════════════════════════════════════╗
║  NEXUS VIM-REFERENZ  //  FIELD MANUAL  //  v2.6          ║
║  "Kenne deine Werkzeuge besser als dich selbst."         ║
╚══════════════════════════════════════════════════════════╝
```

---

## MODI

| Befehl | Von → Nach | Beschreibung |
|--------|-----------|--------------|
| `ESC` / `Ctrl+c` | Irgendwo → Normal | Zurück zu Normal |
| `i` | Normal → Insert | Insert vor Cursor |
| `a` | Normal → Insert | Insert nach Cursor |
| `I` | Normal → Insert | Insert am Zeilenanfang |
| `A` | Normal → Insert | Insert am Zeilenende |
| `o` | Normal → Insert | Neue Zeile darunter |
| `O` | Normal → Insert | Neue Zeile darüber |
| `v` | Normal → Visual | Zeichenweise markieren |
| `V` | Normal → Visual | Zeilenweise markieren |
| `Ctrl+v` | Normal → Visual Block | Spaltenweise markieren |

---

## NAVIGATION

### Basis
| Befehl | Aktion |
|--------|--------|
| `h` `j` `k` `l` | ← ↓ ↑ → |
| `[n]j` | n Zeilen runter |

### Wörter
| Befehl | Aktion |
|--------|--------|
| `w` / `W` | Nächster Wortanfang |
| `b` / `B` | Vorheriger Wortanfang |
| `e` / `E` | Nächstes Wortende |
| `ge` | Vorheriges Wortende |

### Zeile
| Befehl | Aktion |
|--------|--------|
| `0` | Absoluter Zeilenanfang |
| `^` | Erstes Nicht-Leerzeichen |
| `$` | Zeilenende |

### Datei
| Befehl | Aktion |
|--------|--------|
| `gg` | Dateianfang |
| `G` | Dateiende |
| `[n]G` | Zeile n |
| `50%` | 50% durch Datei |
| `H` / `M` / `L` | Viewport: oben / mitte / unten |
| `Ctrl+d` / `Ctrl+u` | Halbe Seite scrollen |
| `Ctrl+o` / `Ctrl+i` | Sprung-Historie zurück / vor |

---

## OPERATOREN

> **Schema:** `[Operator][Motion]` oder `[Operator][Operator]` für ganze Zeile

| Operator | Aktion |
|----------|--------|
| `d` | Delete |
| `c` | Change (= delete + INSERT) |
| `y` | Yank (kopieren) |
| `p` / `P` | Paste nach / vor Cursor |
| `dd` / `cc` / `yy` | Ganze Zeile |
| `D` | Bis Zeilenende löschen |
| `C` | Bis Zeilenende ändern |
| `x` / `X` | Zeichen löschen unter / vor Cursor |
| `u` | Undo |
| `Ctrl+r` | Redo |

### Häufige Kombis
| Befehl | Aktion |
|--------|--------|
| `dw` | Wort löschen |
| `d$` | Bis Zeilenende löschen |
| `dG` | Bis Dateiende löschen |
| `cw` | Wort ändern |
| `3dd` | 3 Zeilen löschen |

---

## TEXT-OBJEKTE

> **Schema:** `[Operator][i/a][Objekt]`
> `i` = inner (ohne Begrenzer) · `a` = around (mit Begrenzer)

| Objekt | Beispiel | Beschreibung |
|--------|---------|--------------|
| `w` | `ciw` | Wort |
| `W` | `diW` | WORD |
| `s` | `dis` | Satz |
| `p` | `yip` | Absatz |
| `"` | `ci"` | Doppeltes Anführungszeichen |
| `'` | `di'` | Einfaches Anführungszeichen |
| `)` `b` | `ci)` | Runde Klammern |
| `]` | `da]` | Eckige Klammern |
| `}` `B` | `diB` | Geschweifte Klammern |
| `t` | `dit` | HTML-Tag |

---

## SUCHE

### Zeilen-Suche
| Befehl | Aktion |
|--------|--------|
| `f{c}` | Nächstes Zeichen c in Zeile |
| `F{c}` | Vorheriges Zeichen c |
| `t{c}` | Vor nächstem Zeichen c |
| `T{c}` | Nach vorherigem Zeichen c |
| `;` / `,` | Nächste / vorherige Fundstelle |

### Datei-Suche
| Befehl | Aktion |
|--------|--------|
| `/{pattern}` | Vorwärts suchen |
| `?{pattern}` | Rückwärts suchen |
| `n` / `N` | Nächste / vorherige Fundstelle |
| `*` / `#` | Wort unter Cursor suchen vor / zurück |

### Ersetzen
| Befehl | Aktion |
|--------|--------|
| `:s/alt/neu/` | In Zeile (erstes) |
| `:s/alt/neu/g` | In Zeile (alle) |
| `:%s/alt/neu/g` | In Datei (alle) |
| `:%s/alt/neu/gc` | In Datei (mit Bestätigung) |

---

## LEVEL-SYSTEM

| Lvl | Rang | XP | Freigeschaltet |
|-----|------|----|----------------|
| 1 | 🔴 SIGNAL LOST | 0 XP | Indoctrination |
| 2 | 🟡 GHOST OPERATOR | 66 XP | Field Training + LOOT-01 |
| 3 | 🔵 DEEP COVER | 186 XP | Deep Infiltration + LOOT-02 |
| 4 | 🟣 NEON WRAITH | 371 XP | Chrome Raven + LOOT-03 |
| 5 | 🟢 CHROME RAVEN | 601 XP | ARC II Kap. 5 + LOOT-04 |
| 6 | 🔵 SIGNAL HUNTER | 800 XP | Kap. 6 + LOOT-05 |
| 7 | 🟠 PROTOCOL READER | 1150 XP | Kap. 7–8 |
| 8 | 🟣 PATTERN BREAKER | 1550 XP | Kap. 9 |
| 9 | 🔴 CIPHER ANALYST | 2000 XP | Kap. 10 + LOOT-06 |
| 10 | ⚪ SIGNAL ARCHITECT | 2500 XP | — |

---

*→ [[00-NEXUS]] · Missionen: [[_dev/LOCALES/de/01 - Indoctrination/M-01-TRANSMISSION-Die_drei_Modi]]*
