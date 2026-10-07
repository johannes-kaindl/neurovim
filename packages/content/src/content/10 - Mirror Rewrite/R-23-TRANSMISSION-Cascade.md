---
mission_id: R-23
title: "Cascade"
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
sticker: lucide//zap
color: "#ff4444"
summary: "[LOCKED] Two operations, in sequence. Delete the noise. Then terminate the MIRROR entries. Order matters."
why: "Two passes, in order: delete the noise first, terminate the targets second — sequence is the whole trick."
objective:
  - "Delete the four lines that start with `[NOISE]`. Delete only those lines; every blank line stays where it is."
  - "Change every `PENDING` in the text to `TERMINATED` (7×): in the heading `MIRROR OPERATIONS — PENDING`, in all five `MIRROR-OP-0n : STATUS: PENDING` lines, and in the closing line `Cascade complete. PROJECT MIRROR operations: PENDING.`"
  - "Leave everything else unchanged: the header box, the CIPHER note and the `---` divider."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — OPERATIONS REGISTER                            ║
║  Document       : Two-phase cleanup required                     ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Cascade note
> Two commands. Sequence matters. Delete noise first — then the second pass only sees what remains.

---

MIRROR OPERATIONS — PENDING

[NOISE] 0x91 carrier residue — discard
MIRROR-OP-01 : STATUS: PENDING
[NOISE] checksum spill // sector static
MIRROR-OP-02 : STATUS: PENDING
MIRROR-OP-03 : STATUS: PENDING
[NOISE] relay echo — no payload
MIRROR-OP-04 : STATUS: PENDING
MIRROR-OP-05 : STATUS: PENDING
[NOISE] EOF fragment — unparsed

Cascade complete. PROJECT MIRROR operations: PENDING.
