---
mission_id: R-14
title: "Tail Mark"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/anchors
  - arc2
  - arc2-ch8
sticker: lucide//arrow-left-to-line
color: "#ff0066"
summary: "[LOCKED] CORP appends an auth signature to the end of every line. Strip it precisely using the end-of-line anchor."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — SIGNATURE STRIPPED                       ║
║  Source         : CORP Sector-3 directive // signed feed         ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Strip note
> `$` anchors to line end. ` [CORP-SIG]` only appears there. Exact match, clean removal.

---

PROJECT MIRROR scope: continental surveillance
All Resistance channels monitored
Pattern-matching engine active since 2046-11
No external disclosure authorized
Counter-Resistance protocol: standing
