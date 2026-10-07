---
mission_id: M-07
title: "Search and Replace — f / ?"
tier: "🟡 FIELD TRAINING"
xp_reward: 30
completed: false
difficulty: 4
category: search
tags:
  - vim/search
  - vim/replace
  - field-training
sticker: lucide//search
color: "#ffaa00"
summary: Find targets in seconds. f, F, /, ?, n, N, * and :s/old/new/ — tracking like a Ghost.
why: "f, /, n — you don't read a file looking for the mark, you tell the tool to put the cursor on it."
mission_type: practice
locked: true
objective:
  - "Replace every `ZONE-7-CLUSTER` with `RELAY-CLUSTER-7` (9×): the six `CELL-DELTA-0x` lines plus the `Rendezvous:`, `Fallback:` and `Abort signal:` lines."
  - "Change nothing else: the header box, the rest of each line and the GHOST note at the bottom stay exactly as they are."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  [RESISTANCE — INTERNAL]                                         ║
║  Sector 7 — Personnel Matrix Fragment                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Source         : GHOST pull // Workforce Optimization extract   ║
║  Period         : 2047-03-15                                     ║
║  Distribution   : Cell-delta training use only                   ║
╚══════════════════════════════════════════════════════════════════╝
```

CELL-DELTA-01 — ZONE-7-CLUSTER, field operative, rotation A
CELL-DELTA-02 — ZONE-7-CLUSTER, intelligence, rotation B
CELL-DELTA-03 — ZONE-7-CLUSTER, logistics, rotation A
CELL-DELTA-04 — ZONE-7-CLUSTER, security, rotation C
CELL-DELTA-05 — ZONE-7-CLUSTER, communications, rotation B
CELL-DELTA-06 — ZONE-7-CLUSTER, medical, rotation A

Rendezvous: ZONE-7-CLUSTER at 23:00
Fallback: ZONE-7-CLUSTER sub-level, 23:30
Abort signal: ZONE-7-CLUSTER code broadcast on 441.7

> [!note] GHOST — Intercepted
> That cluster tag is not the location.
> I ran the delta on the handoff records twice. The substring appears nine times. CORP's substitution tool points teams to their surveillance checkpoint.
> Correct term: RELAY-CLUSTER-7.
> There are 9 substitutions to replace.
