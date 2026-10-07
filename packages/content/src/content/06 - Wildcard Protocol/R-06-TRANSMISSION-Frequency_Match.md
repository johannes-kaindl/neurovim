---
mission_id: R-06
title: "Column Strike"
tier: "🔵 ARC II"
xp_reward: 25
completed: false
difficulty: 2
category: visual-block
par_keystrokes: 14
mission_type: practice
locked: true
unlock_requirement: "Level 6"
tags:
  - vim/visual-block
  - arc2
  - arc2-ch6
sticker: lucide//columns-3
color: "#ff6600"
summary: "[LOCKED] CORP wedged a status column into the relay grid. A pattern can't carve a column — drop into visual-block and strike it out."
why: "A pattern can't cut a column — drop into Ctrl-V, mark the block, and strike it out vertically."
objective:
  - "In the five `NODE | X | …` rows, delete the `X | ` column (the `X`, its space, the `|` and the space after it) so each row reads `NODE | <name> online`, e.g. `NODE | alpha online`."
  - "Leave the header box, the CIPHER note and the `---` line as they are. Change nothing else."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP RELAY GRID — COLUMN INJECTION                              ║
║  Document       : Aligned node table // bogus status column      ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> The `X | ` column is the same width on every row. `Ctrl-V` selects a block down the column, then `d` deletes it in one strike. No pattern needed.

---

NODE | X | alpha online
NODE | X | bravo online
NODE | X | charlie online
NODE | X | delta online
NODE | X | echo online
