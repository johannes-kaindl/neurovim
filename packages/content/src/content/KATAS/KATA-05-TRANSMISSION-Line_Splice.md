---
mission_id: KATA-05
title: "Line Splice"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 2
category: operators
tags:
  - kata
  - vim/operators
  - vim/yank
  - vim/paste
sticker: lucide//list-ordered
color: "#444444"
summary: Priority queue scrambled. Cut each line. Place it correctly. Sequence restored.
why: "Cut a line, drop it where it belongs — dd and p are how you reorder without retyping."
mission_type: practice
locked: true
objective:
  - "Sort the four `[P…]` queue lines by priority: `[P1] ENCRYPT`, `[P2] TRANSMIT`, `[P3] ARCHIVE`, `[P4] CLEANUP` (top to bottom)."
  - "Move whole lines only; do not change any text in them and add no blank lines between them."
  - "Leave the box header and the `PRIORITY QUEUE — SECTOR 7` line as they are."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-05 // LINE SPLICE                  ║
║  Skills: dd  p  P  yy                    ║
╚══════════════════════════════════════════╝
```

PRIORITY QUEUE — SECTOR 7

[P3] ARCHIVE   :  Package secured
[P1] ENCRYPT   :  Clearance verified
[P4] CLEANUP   :  Session terminated
[P2] TRANSMIT  :  Signal dispatched
