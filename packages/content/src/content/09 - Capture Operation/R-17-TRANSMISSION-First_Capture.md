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

NODE-1 SECTOR-A — extraction point alpha
NODE-2 SECTOR-B — relay station beta
NODE-3 SECTOR-A — surveillance post gamma
NODE-4 SECTOR-C — comm tower delta
NODE-5 SECTOR-B — fallback route epsilon
NODE-7 SECTOR-A — primary rendezvous
