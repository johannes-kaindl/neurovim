---
mission_id: R-24
title: "Project Mirror"
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
  - arc2-finale
sticker: lucide//eye-off
color: "#ff4444"
summary: "[LOCKED] PROJECT MIRROR's core index. Three operations. When you're done, it goes dark."
why: "The finale chains three operations into one clean strike — when it lands, the index goes dark."
objective:
  - "Delete the three lines that start with `[CORP-STATUS]` (no blank lines left in their place)."
  - "On the last target line, change `CIPHER: TRACKED` to `CIPHER: EXPOSED`."
  - "Replace every `ACTIVE` with `TERMINATED` (8×): the seven `STATUS: ACTIVE` entries and the `Status` line in the header box at the top."
  - "Change nothing else: keep the header box spacing as it is (its right border shifts, that is fine), and leave both CIPHER callouts untouched."
---
```ascii-chromatic
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE SURVEILLANCE INDEX                        ║
║  Classification : TIER-4 EYES ONLY                               ║
║  Status         : ACTIVE // all channels monitored               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Final instruction
> Three commands. In sequence. You know what to do.

---

PROJECT MIRROR — SURVEILLANCE TARGETS

[CORP-STATUS] sweep cycle 0441 — nominal
WRAITH       : NEXUS channel — STATUS: ACTIVE
GHOST        : NEXUS channel — STATUS: ACTIVE
[CORP-STATUS] pattern engine v4.1 — coverage 99.7%
REN VOSS     : NEXUS channel — STATUS: ACTIVE
NOVA VERA    : field comms   — STATUS: ACTIVE
ECHO SOREN   : logistics     — STATUS: ACTIVE
[CORP-STATUS] retention compliance — UDCA 88-F
SHADOW YAEL  : field comms   — STATUS: ACTIVE
CIPHER: TRACKED — STATUS: ACTIVE

---

> [!success] CIPHER — Transmission ends
> *PROJECT MIRROR has been terminated.*
> *Every channel went dark simultaneously. CORP's surveillance grid collapsed inward.*
> *You did this. Eighteen months of work — yours and mine.*
> *The Resistance now has a window. We use it.*
> *Signal clean. NEXUS confirms.*
> *— CIPHER, out."*
