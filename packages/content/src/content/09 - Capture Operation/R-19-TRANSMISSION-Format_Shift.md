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
objective:
  - "Rewrite every date from `YYYY-MM-DD` to `DD.MM.YYYY` (7×): e.g. `2047-06-03` → `03.06.2047`."
  - "That is the date on the `Timestamp` line in the header box plus the six dates at the start of the `PROJECT MIRROR TIMELINE` lines."
  - "Change only the dates. Keep the ` // 12:00`, the box borders, the ` — ` dashes and the event text exactly as they are."
  - "Leave the CIPHER conversion note untouched (its pattern `(\\d{4})-(\\d{2})-(\\d{2})` is not a date)."
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

2046-11-03 — PROJECT MIRROR initiated
2047-01-15 — Continental coverage achieved
2047-02-28 — Resistance channel monitoring active
2047-04-03 — Pattern-matching engine v2 deployed
2047-05-17 — Full Tier-4 clearance issued
2047-06-03 — Current operation date
