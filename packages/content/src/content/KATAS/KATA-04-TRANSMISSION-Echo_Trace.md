---
mission_id: KATA-04
title: "Echo Trace"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 2
category: search-replace
tags:
  - kata
  - vim/search
  - vim/repeat
sticker: lucide//search
color: "#444444"
summary: Signal identifiers corrupted in transit. Find each instance. Fix once. Repeat.
why: "Find it once, fix it, then n and . carry the same edit to every other instance."
mission_type: practice
locked: true
objective:
  - "Replace every `GRHOST` with `GHOST` (4×: the `Source`, `Signal`, `Confirm` and `Origin` lines)."
  - "Change nothing else: the `Target` line already reads `GHOST`, and the header box, `Channel` and `Relay` lines stay as they are."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-04 // ECHO TRACE                   ║
║  Skills: /  n  N  *  cw  .               ║
╚══════════════════════════════════════════╝
```

INTERCEPT LOG — RELAY DELTA

Source   :  GRHOST
Target   :  GHOST
Channel  :  DELTA-9
Signal   :  GRHOST
Relay    :  ECHO
Confirm  :  GRHOST
Origin   :  GRHOST
