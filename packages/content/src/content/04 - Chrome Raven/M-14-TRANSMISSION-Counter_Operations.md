---
mission_id: M-14
title: "Counter-Operations"
tier: "🟣 CHROME RAVEN"
xp_reward: 60
completed: false
difficulty: 7
category: advanced
mission_type: practice
locked: true
unlock_requirement: "M-13 completed"
tags:
  - vim/numeric
  - vim/visual-block
  - vim/increment
  - chrome-raven
sticker: lucide//hash
color: "#9933ee"
summary: "[LOCKED] Numeric increment + visual-block — apply offset-keys to a Resistance extraction-coordinate-matrix. Available after M-13."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — EXTRACTION-MATRIX DRAFT // WORKING                     ║
║  Sector          : 7 North                                       ║
║  Source          : GHOST-decoder-chain (Signal-01 + 02 merged)   ║
║  Status          : coordinates pre-offset, signal-fragment clean ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain produced the coordinate-matrix below. Raw values are relative to CORP's sector-grid — the offset-keys at the column-headers give the shift required to read absolute coordinates.
> Apply the shifts in-place. Don't touch the signal-fragment at the bottom — that came through clean from RAVEN's channel.

---

Extraction Matrix — Sector 7 North
Per-column offset-keys: +3 (REF), +7 (MARK)

  Waypoint Alpha:   REF-4217 MARK-1378
  Waypoint Beta:    REF-4222 MARK-1383
  Waypoint Gamma:   REF-4227 MARK-1388
  Waypoint Delta:   REF-4232 MARK-1393
  Waypoint Epsilon: REF-4237 MARK-1398

```
>_ RAVEN-SIGNAL — decoded fragment 02
   The count is my language. They read words.
   They do not count.
   You increment what I whispered. The sum is the message.
   — RVN
```

---

Note: CIPHER's draft-matrix. Offset-keys declared at the top but not yet applied to the numeric columns.
Apply the offsets:
- REF column: all five waypoint-values take +3.
- MARK column: all five waypoint-values take +7.
- The RAVEN-signal fragment is already clean. Do not modify.
