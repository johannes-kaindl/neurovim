---
mission_id: KATA-06
title: "Visual Sweep"
tier: "⬛ KATA"
xp_reward: 15
completed: false
difficulty: 3
category: visual-block
tags:
  - kata
  - vim/visual
  - vim/delete
sticker: lucide//scan-line
color: "#444444"
summary: Dossier corrupted with null data injections. Select each line. Purge it.
why: "Mark the line in Visual, purge it — selection is how you act on a span instead of a single spot."
mission_type: practice
locked: true
objective:
  - "Delete the three `[NULL DATA — DISCARD]` lines (3×) completely — the whole line, so no blank line is left in their place."
  - "Keep every other line exactly as it is: the ASCII header box, the `OPERATIVE DOSSIER — VOSS` title, and the five fields `NAME`, `RANK`, `CLEARANCE`, `MISSION`, `STATUS` in their current order."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-06 // VISUAL SWEEP                 ║
║  Skills: V  d  v  y                      ║
╚══════════════════════════════════════════╝
```

OPERATIVE DOSSIER — VOSS

NAME      :  VOSS
RANK      :  FIELD OPERATIVE
[NULL DATA — DISCARD]
CLEARANCE :  DELTA
[NULL DATA — DISCARD]
MISSION   :  ACTIVE
STATUS    :  SECURED
[NULL DATA — DISCARD]
