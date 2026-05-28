---
mission_id: R-05
title: "Dot Sweep"
tier: "🔵 ARC II"
xp_reward: 25
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 6"
tags:
  - vim/regex
  - vim/wildcards
  - arc2
  - arc2-ch6
sticker: lucide//circle-dot
color: "#ff6600"
summary: "[LOCKED] CORP rotates agent IDs with varying suffixes. Match and replace all variants using the dot wildcard."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP FIELD ROSTER — SECTOR 3 SURVEILLANCE                       ║
║  Document       : Active agent registry // rotating identifiers  ║
║  Timestamp      : 2047-05-10 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Intelligence note
> CORP rotates the suffix after each relay. `.` in regex matches any single character. One pattern covers them all.

---

FIELD ROSTER — ACTIVE ASSETS

OPERATIVE   — Zone-Alpha, field surveillance
OPERATIVE   — Zone-Alpha, communications intercept
OPERATIVE   — Zone-Beta, logistics
OPERATIVE   — Zone-Beta, extraction support
OPERATIVE   — Zone-Gamma, technical
OPERATIVE   — Zone-Gamma, analysis
OPERATIVE   — Zone-Delta, field lead

Summary: 7 OPERATIVE assets confirmed active.
