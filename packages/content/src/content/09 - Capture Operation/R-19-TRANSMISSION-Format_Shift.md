---
mission_id: R-19
title: "Format Shift"
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
sticker: lucide//calendar-arrow-right
color: "#00ff88"
summary: "[LOCKED] CORP dates are ISO format. Resistance protocol is day-first. Three captured groups, reversed in replacement."
why: "Three groups in, reordered out — ISO becomes day-first because capture remembers what you matched."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TIMELINE — FORMAT CONVERSION REQUIRED                      ║
║  Document       : Event log // CORP timestamp format             ║
║  Timestamp      : 2047-06-03 // 12:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Conversion note
> ISO to day-first. `(\d{4})-(\d{2})-(\d{2})` captures three groups. Replacement: `\3.\2.\1`.

---

PROJECT MIRROR TIMELINE

03.11.2046 — PROJECT MIRROR initiated
15.01.2047 — Continental coverage achieved
28.02.2047 — Resistance channel monitoring active
03.04.2047 — Pattern-matching engine v2 deployed
17.05.2047 — Full Tier-4 clearance issued
03.06.2047 — Current operation date
