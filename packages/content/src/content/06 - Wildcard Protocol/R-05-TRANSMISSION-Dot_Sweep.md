---
mission_id: R-05
title: "Dot Sweep"
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
  - vim/wildcards
  - arc2
  - arc2-ch6
sticker: lucide//circle-dot
color: "#ff6600"
summary: "[LOCKED] CORP rotates agent IDs with varying suffixes. Match and replace all variants using the dot wildcard."
why: "The dot matches anything CORP rotates into a suffix — one pattern, every variant, no exceptions."
objective:
  - "Replace every `AGENT-` plus the one character after it with `OPERATIVE` (8×): the seven roster IDs `AGENT-A`, `AGENT-B`, `AGENT-1`, `AGENT-K`, `AGENT-X`, `AGENT-9`, `AGENT-Q`, and `AGENT-*` in the `Summary:` line."
  - "Example: `AGENT-A   — Zone-Alpha, field surveillance` becomes `OPERATIVE   — Zone-Alpha, field surveillance`. Keep the spaces and everything after each ID as it is."
  - "Change nothing else: the header box, the CIPHER note and the `FIELD ROSTER — ACTIVE ASSETS` line stay untouched."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP FIELD ROSTER — SECTOR 3 SURVEILLANCE                       ║
║  Document       : Active agent registry // rotating identifiers  ║
║  Timestamp      : 2047-05-10 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Intelligence note
> CORP rotates the suffix after each relay. `.` in regex matches any single character. One pattern covers them all.

---

FIELD ROSTER — ACTIVE ASSETS

AGENT-A   — Zone-Alpha, field surveillance
AGENT-B   — Zone-Alpha, communications intercept
AGENT-1   — Zone-Beta, logistics
AGENT-K   — Zone-Beta, extraction support
AGENT-X   — Zone-Gamma, technical
AGENT-9   — Zone-Gamma, analysis
AGENT-Q   — Zone-Delta, field lead

Summary: 7 AGENT-* assets confirmed active.
