---
mission_id: KATA-02
title: "Operator Strike"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 2
category: operators
tags:
  - kata
  - vim/operators
  - vim/delete
sticker: lucide//zap
color: "#444444"
summary: CORP injected noise into each log line. Strike it clean with operators. No story. Just precision.
why: "An operator plus a motion strikes the noise clean — drill d until the verb is reflex."
mission_type: practice
locked: true
objective:
  - "In the five log lines, delete the one word that starts with `CORP` (5×): `CORP`, `CORP_TAG`, `CORP_INJECT`, `CORP_BLOCK`, `CORP_FILLER`."
  - "Delete it together with one adjacent space, so a single space remains: `Operative_ID CORP verified` → `Operative_ID verified`."
  - "Keep `Operative_ID` (no `CORP` in it). Do not touch the `[OK]`/`[ERR]` tags, their column spacing, the header box or the `ACCESS LOG` line."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-02 // OPERATOR STRIKE              ║
║  Skills: dw  dd  D  x  cw               ║
╚══════════════════════════════════════════╝
```

ACCESS LOG — RELAY ALPHA

[OK]   AUTH    Operative_ID CORP verified
[OK]   UPLOAD  Package CORP_TAG delivered
[OK]   LINK    Channel CORP_INJECT active
[ERR]  AUTH    Identity CORP_BLOCK check failed
[OK]   SYNC    Data CORP_FILLER synced
