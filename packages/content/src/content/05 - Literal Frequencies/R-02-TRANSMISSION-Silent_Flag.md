---
mission_id: R-02
title: "Silent Flag"
tier: "🔵 ARC II"
xp_reward: 20
completed: false
difficulty: 1
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 5"
tags:
  - vim/regex
  - vim/substitute
  - arc2
  - arc2-ch5
sticker: lucide//flag
color: "#00ccff"
summary: "[LOCKED] A CORP log uses three different casings for the same designation. One case-insensitive substitution cleans all of them."
why: "Three casings, one designation — the /i flag stops you chasing every variant by hand."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — SURVEILLANCE DIVISION                           ║
║  Document       : Project designation log // auto-generated      ║
║  Timestamp      : 2047-05-03 // 09:44                           ║
║  Distribution   : Sector 3 analysts only                        ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Annotation
> Three case variants in one document. CORP's intake system doesn't normalize. Use the `i` flag — case does not matter when the pattern is clear.

---

SURVEILLANCE DIVISION — PROJECT DESIGNATION LOG

PROJECT MIRROR is classified at Tier-4 clearance.
All references to Project Mirror in external communications are prohibited.
Internal memos may reference mirror only in encrypted form.

Field teams: PROJECT MIRROR scope is continental.
Analysts: mirror coverage extends to all Resistance channels.
Oversight: PROJECT MIRROR operational since 2046-11.

Summary: mirror = active. No external disclosure.
