---
mission_id: R-03
title: "Trace Purge"
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
  - vim/global
  - arc2
  - arc2-ch5
sticker: lucide//trash-2
color: "#00ccff"
summary: "[LOCKED] CORP tracking markers are interspersed through an intelligence document. Delete every marked line with one global command."
why: "When a marker tags the trash, :g/pattern/d takes out every line wearing it in a single pass."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTERCEPT — RAW FEED                                 ║
║  Source         : CORP Sector-3 comms // scraped                ║
║  Timestamp      : 2047-05-04 // 02:31                           ║
║  Note           : CORP trace markers injected — purge before use ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Purge every tracker line CORP injected. What remains is the actual intelligence.

---

Asset WRAITH departed Sector 3 at 22:00.
[TRACK] scan_id=0041 // node=ALPHA timestamp=2047-05-04T22:00
Route: primary corridor, north passage.
[TRACK] scan_id=0042 // node=BETA timestamp=2047-05-04T22:09
Rendezvous confirmed at NODE-7.
[TRACK] scan_id=0043 // node=GAMMA timestamp=2047-05-04T22:21
Extraction window opens at 23:00.
[TRACK] scan_id=0044 // node=DELTA timestamp=2047-05-04T22:44
Fallback route: south corridor if primary compromised.
[TRACK] scan_id=0045 // node=EPSILON timestamp=2047-05-04T22:58
Asset secured. Channel closed.
