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
why: "A fixed-length class counts the hex for you — six hashes redacted, none of the real text touched."
objective:
  - "In the six manifest lines below `DOCUMENT MANIFEST`, replace each 8-character hex hash after the colon with `[HASH-REDACTED]` (6×): `3F2A9B4C`, `7D0E4F19`, `A1C58E2B`, `90BD37FA`, `C4E6021D`, `5B8FD7E3`."
  - "Keep each line's label, spacing and `: ` exactly as they are; only the hash changes."
  - "Leave everything else untouched: the header box, the CIPHER note, the `DOCUMENT MANIFEST` title and the closing `Security protocol:` line."
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

PROJECT MIRROR core document    : 3F2A9B4C
Sector-3 surveillance log       : 7D0E4F19
Asset movement register         : A1C58E2B
Comm intercept archive          : 90BD37FA
Clearance override protocol     : C4E6021D
Counter-Resistance directive    : 5B8FD7E3

Security protocol: all hashes get redacted.
