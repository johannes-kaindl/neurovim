---
mission_id: KATA-12
title: "Target Lock"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 1
category: navigation
par_keystrokes: 22
tags:
  - kata
  - vim/navigation
  - vim/find-char
sticker: lucide//crosshair
color: "#444444"
summary: CORP slipped stray markers into the grid. Jump straight to each one with f/t — no h/l crawling — and repeat with ;. No story. Just precision.
why: "Don't crawl with h and l — f and t snap the cursor to the mark, and ; repeats the jump."
mission_type: practice
locked: true
objective:
  - "Delete every stray `7` from the four `grid` lines (5×): `alpha7`, `bravo7`, `charlie7`, `delta7` and `secure7`."
  - "Target: `grid alpha clear`, `grid bravo clear`, `grid charlie clear`, `grid delta secure`."
  - "Change nothing else. The header box and the `SECTOR SCAN` line stay as they are."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-12 // TARGET LOCK                   ║
║  Skills: f  F  t  T  ;  ,                 ║
╚══════════════════════════════════════════╝
```

SECTOR SCAN — PURGE THE STRAY MARKERS

grid alpha7 clear
grid bravo7 clear
grid charlie7 clear
grid delta7 secure7
