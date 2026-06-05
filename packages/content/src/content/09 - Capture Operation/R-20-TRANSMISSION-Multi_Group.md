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

ASSET REGISTER — NAME FORMAT CORRECTED

WRAITH Ren       — field operative, Zone-Alpha
VOSS Ren         — technical analyst, Zone-Beta
GHOST Niko       — intelligence, Zone-Alpha
NOVA Vera        — field operative, Zone-Gamma
ECHO Soren       — logistics, Zone-Beta
SHADOW Yael      — extraction lead, Zone-Delta
CIPHER           — communications, all zones
