---
mission_id: R-04
title: "Range Strike"
tier: "🔵 ARC II"
xp_reward: 20
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 5"
tags:
  - vim/regex
  - vim/substitute
  - arc2
  - arc2-ch5
sticker: lucide//scissors
color: "#00ccff"
summary: "[LOCKED] Only the first section of a two-part document needs correction. Range-limited substitution leaves the second half intact."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP OPERATIONAL STATUS — SECTOR 3                              ║
║  Document       : Asset status register // dual section          ║
║  Timestamp      : 2047-05-05 // 07:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Annotation
> Upper section: status codes wrong — should read ACTIVE. Lower section: correct as-is. Range your substitution.

---

NODE-ALPHA  : ACTIVE
NODE-BETA   : ACTIVE
NODE-GAMMA  : ACTIVE
NODE-DELTA  : ACTIVE
NODE-EPSILON: ACTIVE
RELAY-01    : ACTIVE
RELAY-02    : ACTIVE
RELAY-03    : ACTIVE

---

ARCHIVE SECTION — DO NOT MODIFY

NODE-ALPHA  : QUEUED // historical — pre-activation
NODE-BETA   : QUEUED // historical — pre-activation
NODE-GAMMA  : QUEUED // historical — pre-activation
