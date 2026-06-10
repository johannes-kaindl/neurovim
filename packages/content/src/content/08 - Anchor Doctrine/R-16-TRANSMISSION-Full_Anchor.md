---
mission_id: R-16
title: "Full Anchor"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 4
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/anchors
  - arc2
  - arc2-ch8
sticker: lucide//anchor
color: "#ff0066"
summary: "[LOCKED] CLASSIFIED appears both as full lines and within longer lines. Combined anchors target only the full-line markers."
why: "Pin both ends with ^ and $ and you hit only the full-line markers, never the word buried in a sentence."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — CLASSIFICATION MANIFEST                         ║
║  Document       : Mixed classification markers // anchor needed  ║
║  Timestamp      : 2047-05-28 // 16:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Anchor note
> `^CLASSIFIED$` — the whole line, nothing more. Inline occurrences stay.

---

CLASSIFICATION MANIFEST — PROJECT MIRROR

Distribution policy: CLASSIFIED material requires Tier-4 auth.
CLASSIFIED
Sector-3 data: CLASSIFIED at all distribution levels.
CLASSIFIED
Counter-Resistance protocols: CLASSIFIED above clearance level 3.
CLASSIFIED
External disclosure: prohibited. All data CLASSIFIED.
