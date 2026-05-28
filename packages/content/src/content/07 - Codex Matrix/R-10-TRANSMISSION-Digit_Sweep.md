---
mission_id: R-10
title: "Digit Sweep"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/character-classes
  - arc2
  - arc2-ch7
sticker: lucide//hash
color: "#cc00ff"
summary: "[LOCKED] A surveillance log carries timestamps and IDs that must be redacted. One pass with \\d+ clears them all."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE INTELLIGENCE — REDACTION REQUIRED                    ║
║  Document       : Movement log // timestamps and IDs present     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Redaction note
> Every digit sequence is a potential identifier. `\d\+` catches all of them — timestamps, IDs, counts.

---

MOVEMENT LOG — REDACTED

Node [REDACTED] activated at [REDACTED]:[REDACTED].
Asset [REDACTED] cleared checkpoint at [REDACTED]:[REDACTED].
Relay [REDACTED] confirmed at [REDACTED]:[REDACTED].
[REDACTED] assets total. Channel [REDACTED] closed.
Duration: [REDACTED] minutes.
