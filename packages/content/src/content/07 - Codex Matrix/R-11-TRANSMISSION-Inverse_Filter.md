---
mission_id: R-11
title: "Inverse Filter"
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
  - vim/global
  - arc2
  - arc2-ch7
sticker: lucide//filter-x
color: "#cc00ff"
summary: "[LOCKED] CORP embedded noise lines in a clearance log. Keep only what matters — delete everything without CLEARANCE using :g!."
why: ":g! is the inverse net — keep what matters, delete everything that doesn't say CLEARANCE."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP CLEARANCE REGISTER — NOISE EMBEDDED                        ║
║  Document       : Asset clearance log // noise-injected          ║
║  Timestamp      : 2047-05-20 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Filter note
> Every valid entry contains CLEARANCE. The rest is noise. `:g!/CLEARANCE/d` — invert the filter.

---

WRAITH       : CLEARANCE LEVEL 4 — approved
GHOST        : CLEARANCE LEVEL 4 — approved
REN VOSS     : CLEARANCE LEVEL 3 — approved
CIPHER       : CLEARANCE LEVEL 5 — approved
SHADOW-7     : CLEARANCE LEVEL 3 — approved
