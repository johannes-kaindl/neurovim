---
mission_id: R-21
title: "Global Strike"
tier: "🔵 ARC II"
xp_reward: 40
completed: false
difficulty: 3
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
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  PROJECT MIRROR — CORE REGISTRY FRAGMENT                         ║
║  Document       : Surveillance entry log // status field         ║
║  Classification : TIER-4 EYES ONLY                               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Strike note
> ENCRYPTED entries are the ones that matter. Change their status. `:g/ENCRYPTED/s/STATUS: ACTIVE/STATUS: EXPOSED/`

---

MIRROR REGISTRY — EXPOSURE LOG

CHANNEL-01 : CLEAR     : STATUS: ACTIVE
CHANNEL-02 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-03 : CLEAR     : STATUS: ACTIVE
CHANNEL-04 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-05 : ENCRYPTED : STATUS: EXPOSED
CHANNEL-06 : CLEAR     : STATUS: ACTIVE
CHANNEL-07 : ENCRYPTED : STATUS: EXPOSED

Encrypted channels: 4. Exposed: 4. Clear channels: 3.
