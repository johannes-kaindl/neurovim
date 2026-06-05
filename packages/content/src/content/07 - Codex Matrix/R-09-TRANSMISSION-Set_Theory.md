---
mission_id: R-09
title: "Set Theory"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/character-classes
  - arc2
  - arc2-ch7
sticker: lucide//brackets
color: "#cc00ff"
summary: "[LOCKED] CORP status codes X, Y, Z encode threat level. Normalize all three to CLEAN using a character set."
why: "A character set folds X, Y and Z into one match — three threat codes normalized in a single rule."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP THREAT ASSESSMENT — SECTOR 3                               ║
║  Document       : Node status register // threat-coded           ║
║  Timestamp      : 2047-05-18 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Decoding note
> X = low risk. Y = medium. Z = high. All three mean the same thing to us: CLEAN. `[XYZ]` matches any one of them.

---

NODE STATUS — THREAT ASSESSMENT

NODE-ALPHA  : CLEAN
NODE-BETA   : CLEAN
NODE-GAMMA  : CLEAN
NODE-DELTA  : CLEAN
NODE-EPSILON: CLEAN
RELAY-01    : CLEAN
RELAY-02    : CLEAN
RELAY-03    : CLEAN

All nodes clear. No threat indicators active.
