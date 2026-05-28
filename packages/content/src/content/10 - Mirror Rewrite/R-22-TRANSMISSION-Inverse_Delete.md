---
mission_id: R-22
title: "Inverse Delete"
tier: "🔵 ARC II"
xp_reward: 40
completed: false
difficulty: 3
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 9"
tags:
  - vim/regex
  - vim/global
  - arc2
  - arc2-ch10
sticker: lucide//eraser
color: "#ff4444"
summary: "[LOCKED] A full surveillance log. Keep only the MIRROR-related lines. Everything else goes."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP SURVEILLANCE LOG — FULL FEED                               ║
║  Document       : Mixed content // MIRROR lines embedded         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Filter note
> `:v/MIRROR/d` — keep only MIRROR lines. The full scope will be visible once the noise is gone.

---

PROJECT MIRROR — SCOPE SUMMARY

PROJECT MIRROR covers all seven Resistance sectors.
PROJECT MIRROR monitoring: 24/7, automated.
PROJECT MIRROR database: distributed, redundant.
PROJECT MIRROR exposure risk: currently ZERO.
PROJECT MIRROR operational lifespan: indefinite.
