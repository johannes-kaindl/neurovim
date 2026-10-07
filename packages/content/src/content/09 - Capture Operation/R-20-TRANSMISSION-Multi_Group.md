---
mission_id: R-20
title: "Multi Group"
tier: "🔵 ARC II"
xp_reward: 35
completed: false
difficulty: 4
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 8"
tags:
  - vim/regex
  - vim/capture-groups
  - arc2
  - arc2-ch9
sticker: lucide//group
color: "#00ff88"
summary: "[LOCKED] CORP name format is SURNAME, FIRSTNAME. Resistance is FIRSTNAME SURNAME. Two groups, comma stripped."
why: "Two captured names, comma dropped — SURNAME, FIRSTNAME becomes FIRSTNAME SURNAME in one rule."
objective:
  - "Every `word, word` pair below the `---` swaps its two words and loses the comma (8×): `A, B` → `B A`."
  - "The six roster names: `Ren, WRAITH` → `WRAITH Ren`, `Ren, VOSS` → `VOSS Ren`, `Niko, GHOST` → `GHOST Niko`, `Vera, NOVA` → `NOVA Vera`, `Soren, ECHO` → `ECHO Soren`, `Yael, SHADOW` → `SHADOW Yael`."
  - "Also the `ASSET REGISTER` line: `FORMAT, NAME` → `NAME FORMAT`, and the `CIPHER — communications` line: `zones, all` → `all zones`."
  - "Keep the spaces before each `—` exactly as they are (only the comma goes). Leave the box and the CIPHER note above the `---` untouched."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ASSET REGISTER — NAME FORMAT CORRECTION                    ║
║  Document       : Field personnel // CORP surname-first format   ║
║  Timestamp      : 2047-06-05 // 09:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Format note
> CORP puts surname first with a comma. `\(\w\+\), \(\w\+\)` — swap with `\2 \1`. Comma disappears.

---

ASSET REGISTER — FORMAT, NAME CORRECTED

Ren, WRAITH       — field operative // Zone-Alpha
Ren, VOSS         — technical analyst // Zone-Beta
Niko, GHOST       — intelligence // Zone-Alpha
Vera, NOVA        — field operative // Zone-Gamma
Soren, ECHO       — logistics // Zone-Beta
Yael, SHADOW      — extraction lead // Zone-Delta
CIPHER           — communications // zones, all
