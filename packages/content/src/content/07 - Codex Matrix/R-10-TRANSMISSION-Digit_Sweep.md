---
mission_id: R-10
title: "Echo Chamber"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: marks-macros
par_keystrokes: 24
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/macros
  - arc2
  - arc2-ch7
sticker: lucide//repeat
color: "#ff6600"
summary: "[LOCKED] Five relay lines need the same two edits. Record the fix once as a macro, then echo it down the list."
why: "Five lines, the same two edits — record the change once and let the macro echo it down the list."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE RELAY ROSTER — BULK REFORMAT                         ║
║  Document       : Relay status list // same edit, every line     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Each line needs the same two edits: comment it with `# ` and flip `active` to `[OK]`. Record it once with `qa … q`, then replay with `@a` down the rest.

---

relay alpha active
relay bravo active
relay charlie active
relay delta active
relay echo active
