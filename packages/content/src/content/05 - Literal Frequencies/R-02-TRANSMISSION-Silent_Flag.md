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
objective:
  - "Replace every `mirror` in any casing (`MIRROR`, `Mirror`, `mirror`) with `PROJECT MIRROR` (7×) — one per line in the log below the second header."
  - "Nothing else changes: the boxed header, the CIPHER note and the `SURVEILLANCE DIVISION — PROJECT DESIGNATION LOG` line stay as they are."
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

MIRROR is classified at Tier-4 clearance.
All references to Mirror in external communications are prohibited.
Internal memos may reference mirror only in encrypted form.

Field teams: MIRROR scope is continental.
Analysts: mirror coverage extends to all Resistance channels.
Oversight: Mirror operational since 2046-11.

Summary: mirror = active. No external disclosure.
