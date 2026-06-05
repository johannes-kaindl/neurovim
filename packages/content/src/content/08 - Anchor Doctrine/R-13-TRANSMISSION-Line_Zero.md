---
mission_id: R-13
title: "Line Zero"
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
  - vim/anchors
  - arc2
  - arc2-ch8
sticker: lucide//arrow-right-to-line
color: "#ff0066"
summary: "[LOCKED] CORP prepends a tracking prefix to every line. Strip it precisely — only from the line start."
why: "Anchor to ^ and the prefix dies only at the line start — never mid-text where it would do damage."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — PREFIX STRIPPED                          ║
║  Source         : CORP Sector-3 relay // prefixed feed           ║
║  Timestamp      : 2047-05-25 // 03:17                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Strip note
> `^` anchors to line start. `[TRACK] ` only appears there. One command, all prefixes gone.

---

Asset WRAITH departed Sector 3 at 22:00.
Route: primary corridor, north passage.
Rendezvous confirmed at NODE-7.
Extraction window opens at 23:00.
Fallback route: south corridor if primary compromised.
Asset secured. Channel closed.
