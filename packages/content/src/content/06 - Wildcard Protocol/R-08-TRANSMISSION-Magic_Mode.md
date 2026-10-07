---
mission_id: R-08
title: "Magic Mode"
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
  - vim/verymagic
  - arc2
  - arc2-ch6
sticker: lucide//wand-2
color: "#ff6600"
summary: "[LOCKED] Three CORP tier labels, one unified replacement. Use very magic mode for clean alternation syntax."
why: "Very magic mode drops the backslash noise — write alternation the way you actually think it."
objective:
  - "In the seven register lines under `ASSET CLEARANCE`, replace every tier label `ALPHA`, `BETA` and `GAMMA` with `TIER-1` (7×: 3× `ALPHA`, 2× `BETA`, 2× `GAMMA`)."
  - "Keep everything else as is: the agent names, the spacing before `:`, and the `// role` text after each label."
  - "Do not touch the header box or the CIPHER note above the register."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP INTERNAL — TIER CLASSIFICATION REGISTER                    ║
║  Document       : Legacy tier mapping // normalization pending    ║
║  Timestamp      : 2047-05-13 // 11:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Reclassification note
> Legacy CORP tier labels vary by division. Normalize all three to TIER-1. Use `\v` for clean alternation.

---

CLASSIFICATION REGISTER — ASSET CLEARANCE

WRAITH         : ALPHA // field operative
GHOST          : BETA // intelligence
REN VOSS       : GAMMA // technical analyst
CIPHER         : BETA // communications
SHADOW-7       : ALPHA // extraction lead
ECHO-3         : GAMMA // logistics
NOVA-2         : ALPHA // field operative
