---
mission_id: R-18
title: "Mirror Word"
tier: "🔵 ARC II"
xp_reward: 35
completed: false
difficulty: 4
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 8"
tags:
  - vim/regex
  - vim/capture-groups
  - arc2
  - arc2-ch9
sticker: lucide//copy-x
color: "#00ff88"
summary: "[LOCKED] CORP transcription stutters duplicate words. Backreference finds them. Remove the echo."
why: "A back-reference catches a word repeating itself — find the stutter, then cut the echo."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TRANSCRIPTION — STUTTER DETECTED                           ║
║  Document       : Automated comm log // duplicate words present  ║
║  Timestamp      : 2047-06-02 // 14:20                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Stutter note
> The transcription system echoes words. `\(\w\+\) \1` finds the echo. `\1` in replacement keeps one.

---

COMM LOG — STUTTER CORRECTED

PROJECT MIRROR is the primary surveillance system.
All Resistance channels are monitored continuously.
NODE-7 confirmed as the extraction point.
Asset WRAITH departed at 22:00 hours.
Channel closed after the handoff.
No signal loss detected during the operation.
