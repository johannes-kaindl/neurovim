---
mission_id: R-22
title: "Inverse Delete"
tier: "🔵 ARC II"
xp_reward: 40
completed: false
difficulty: 5
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
why: ":v keeps only what matches and burns the rest — the fastest way to isolate the signal in a flood."
objective:
  - "Delete every line that does not contain `MIRROR`: the ASCII header box including its two code-fence lines, the CIPHER filter note, the `---` divider, all blank lines and the five log lines (`0441 ::`, `relay maintenance`, `canteen rotation`, `0518 ::`, `transport manifest`)."
  - "Keep the six lines starting with `PROJECT MIRROR` exactly as they are, in their current order, with no blank lines between them."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP SURVEILLANCE LOG — FULL FEED                               ║
║  Document       : Mixed content // target lines embedded         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Filter note
> `:v` is the inverse delete — keep only the project's lines. The full scope will be visible once the noise is gone.

---

PROJECT MIRROR — SCOPE SUMMARY

0441 :: sector sweep alpha — nominal
PROJECT MIRROR covers all seven Resistance sectors.
relay maintenance window 03:00–03:30 — Sector 3
PROJECT MIRROR monitoring: 24/7, automated.
canteen rotation notice — Sector 3 staff
PROJECT MIRROR database: distributed, redundant.
0518 :: checksum audit — passed
PROJECT MIRROR exposure risk: currently ZERO.
transport manifest 7741 — cleared
PROJECT MIRROR operational lifespan: indefinite.
