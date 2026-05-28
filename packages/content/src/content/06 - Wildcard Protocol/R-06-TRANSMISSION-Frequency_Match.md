---
mission_id: R-06
title: "Frequency Match"
tier: "🔵 ARC II"
xp_reward: 25
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 6"
tags:
  - vim/regex
  - vim/quantifiers
  - arc2
  - arc2-ch6
sticker: lucide//radio
color: "#ff6600"
summary: "[LOCKED] CORP numeric IDs vary in length from 1 to 4 digits. Redact all of them with a quantifier-based pattern."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP SURVEILLANCE LOG — ASSET TRACKING                          ║
║  Document       : Numeric ID register // variable length IDs     ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> CORP numeric IDs are 1–4 digits long. `[0-9]\+` matches all of them. Redact every ID before this log is shared.

---

SURVEILLANCE LOG — ASSET MOVEMENT

ID-REDACTED  departed Zone-Alpha at 06:00.
ID-REDACTED  entered restricted corridor at 06:14.
ID-REDACTED  flagged for secondary scan.
ID-REDACTED  cleared at checkpoint.
ID-REDACTED  reached rendezvous — Zone-Beta.
ID-REDACTED  signal lost at 07:01.
ID-REDACTED  signal restored at 07:44.

Total assets logged: 7. All IDs redacted per protocol.
