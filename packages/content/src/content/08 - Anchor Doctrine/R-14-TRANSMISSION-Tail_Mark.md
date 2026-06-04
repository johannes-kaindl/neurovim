---
mission_id: R-14
title: "Dead Drop"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: registers
par_keystrokes: 30
mission_type: practice
locked: true
unlock_requirement: "Level 8"
tags:
  - vim/registers
  - arc2
  - arc2-ch8
sticker: lucide//clipboard-copy
color: "#ff6600"
summary: "[LOCKED] One master key, four empty slots. Yank the key into a named register once, then drop it into every slot."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE KEY DISTRIBUTION — DEAD DROP                         ║
║  Document       : Master key + empty slots // fill all slots     ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Yank the key into a named register so later edits can't clobber it: `"ayiw` on the key, then `"ap` to drop it into each slot. The unnamed register would be overwritten the moment you delete a placeholder — a named register survives.

---

MASTER KEY: K7741

slot one: ____
slot two: ____
slot three: ____
slot four: ____
