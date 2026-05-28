---
mission_id: R-12
title: "Combined Strike"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/character-classes
  - arc2
  - arc2-ch7
sticker: lucide//combine
color: "#cc00ff"
summary: "[LOCKED] CORP hex hashes tag every document. Redact all six with an exact-length character class pattern."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP DOCUMENT REGISTRY — HASH-TAGGED                            ║
║  Document       : Internal document manifest // hashes present   ║
║  Timestamp      : 2047-05-21 // 10:15                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Redaction note
> Six CORP hex hashes, each exactly 8 characters from `[0-9A-F]`. Redact all of them. `\{8\}` — exact count.

---

DOCUMENT MANIFEST — INTERNAL REGISTRY

PROJECT MIRROR core document    : [HASH-REDACTED]
Sector-3 surveillance log       : [HASH-REDACTED]
Asset movement register         : [HASH-REDACTED]
Comm intercept archive          : [HASH-REDACTED]
Clearance override protocol     : [HASH-REDACTED]
Counter-Resistance directive    : [HASH-REDACTED]

All hashes redacted per security protocol.
