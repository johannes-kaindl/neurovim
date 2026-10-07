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
why: "A substitution doesn't have to touch the whole file — give it a line range and the rest stays untouched."
objective:
  - "Upper section (the eight lines `NODE-ALPHA` through `RELAY-03`, above the first `---`): replace `QUEUED` with `ACTIVE` on every line (8×)."
  - "Leave the `ARCHIVE SECTION — DO NOT MODIFY` block untouched: its three `QUEUED` lines stay `QUEUED`."
  - "Change nothing else: keep the column spacing, the header line and the CIPHER note exactly as they are."
---
CORP OPERATIONAL STATUS — SECTOR 3 // dual-section register // 2047-05-05 07:00

NODE-ALPHA  : QUEUED
NODE-BETA   : QUEUED
NODE-GAMMA  : QUEUED
NODE-DELTA  : QUEUED
NODE-EPSILON: QUEUED
RELAY-01    : QUEUED
RELAY-02    : QUEUED
RELAY-03    : QUEUED

---

ARCHIVE SECTION — DO NOT MODIFY

NODE-ALPHA  : QUEUED // historical — pre-activation
NODE-BETA   : QUEUED // historical — pre-activation
NODE-GAMMA  : QUEUED // historical — pre-activation

---

> [!note] CIPHER — Annotation
> Upper section: status codes wrong — should read ACTIVE. Lower section: correct as-is. Range your substitution.
