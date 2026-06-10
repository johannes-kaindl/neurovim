---
mission_id: R-21
title: "Global Strike"
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
sticker: lucide//target
color: "#ff4444"
summary: "[LOCKED] PROJECT MIRROR's encrypted entries are hidden as ACTIVE. Compose :g with :s to expose them all."
why: "Compose :g with :s and the global command becomes a scalpel — find the hidden lines, then rewrite each."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE REGISTRY FRAGMENT                         ║
║  Document       : Surveillance entry log // status field         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Strike note
> Encrypted entries are the ones that matter. Change their status — compose `:g` with `:s`. Exact command is in your briefing.

---

MIRROR REGISTRY — EXPOSURE LOG

CHANNEL-01 : CLEAR     : STATUS: ACTIVE
CHANNEL-02 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-03 : CLEAR     : STATUS: ACTIVE
CHANNEL-04 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-05 : ENCRYPTED : STATUS: ACTIVE
CHANNEL-06 : CLEAR     : STATUS: ACTIVE
CHANNEL-07 : ENCRYPTED : STATUS: ACTIVE

Encrypted channels: 4. Clear channels: 3. Target: all four read EXPOSED.
