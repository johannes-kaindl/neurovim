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
objective:
  - "Collapse every doubled word to a single copy (7×): `STUTTER STUTTER` → `STUTTER`, `the the` → `the`, `are are` → `are`, `confirmed confirmed` → `confirmed`, `WRAITH WRAITH` → `WRAITH`, `closed closed` → `closed`, `signal signal` → `signal`."
  - "The heading `COMM LOG — STUTTER STUTTER CORRECTED` counts too: it becomes `COMM LOG — STUTTER CORRECTED`."
  - "Change nothing else: the ASCII box, the CIPHER note and the `---` line stay exactly as they are."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP TRANSCRIPTION — STUTTER DETECTED                           ║
║  Document       : Automated comm log // duplicate words present  ║
║  Timestamp      : 2047-06-02 // 14:20                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Stutter note
> The transcription system echoes words. `\(\w\+\) \1` finds each echo. `\1` in replacement keeps one.

---

COMM LOG — STUTTER STUTTER CORRECTED

PROJECT MIRROR is the the primary surveillance system.
All Resistance channels are are monitored continuously.
NODE-7 confirmed confirmed as our extraction point.
Asset WRAITH WRAITH departed at 22:00 hours.
Channel closed closed after the handoff.
No signal signal drop detected across the operation.
