---
mission_id: R-17
title: "First Capture"
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
sticker: lucide//parentheses
color: "#00ff88"
summary: "[LOCKED] CORP ordered sector before node. Resistance protocol requires node before sector. Capture both and swap."
why: "Capture two halves, swap their order — node before sector, rewritten without retyping a thing."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE FIELD MAP — ORDER CORRECTION REQUIRED                ║
║  Document       : Sector-node designation log // wrong order     ║
║  Timestamp      : 2047-06-01 // 08:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Capture note
> CORP puts SECTOR first. Resistance protocol: NODE first. Capture both. Swap with `\2 \1`.

---

FIELD MAP — CORRECTED DESIGNATION ORDER

SECTOR-A NODE-1 — extraction point alpha
SECTOR-B NODE-2 — relay station beta
SECTOR-A NODE-3 — surveillance post gamma
SECTOR-C NODE-4 — comm tower delta
SECTOR-B NODE-5 — fallback route epsilon
SECTOR-A NODE-7 — primary rendezvous
