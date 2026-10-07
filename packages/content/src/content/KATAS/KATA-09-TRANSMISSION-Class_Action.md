---
mission_id: KATA-09
title: "Class Action"
tier: "⬛ KATA"
xp_reward: 15
completed: false
difficulty: 3
category: regex
tags:
  - kata
  - vim/regex
  - vim/character-classes
sticker: lucide//list-filter
color: "#444444"
summary: Purge noise lines. Keep only CLEARANCE entries. Character class or :g! — your call.
why: "A character class is your filter — keep the CLEARANCE lines, drop the noise, your call which tool."
mission_type: practice
locked: true
objective:
  - "Keep only the 6 lines that contain `CLEARANCE`: the `CLEARANCE REGISTER` title and the five agent lines from `WRAITH` to `ECHO SOREN`."
  - "Delete every other line: the whole ascii banner box at the top (including its two code-fence lines), every blank line, and the 4 noise lines (`0x7F1 …`, `[buffer spill] …`, `::: checksum residue …`, `EOF fragment …`)."
  - "Do not edit the kept lines or change their order. The result is 6 lines with no blank line between them."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-09 // CLASS ACTION                 ║
║  Skills: :g!/PATTERN/d  [A-Z]  \d        ║
╚══════════════════════════════════════════╝
```

CLEARANCE REGISTER

WRAITH     : CLEARANCE LEVEL 4
0x7F1 :: relay static :: discard
GHOST      : CLEARANCE LEVEL 4
[buffer spill] sector hum — no payload
REN VOSS   : CLEARANCE LEVEL 3
NOVA VERA  : CLEARANCE LEVEL 3
::: checksum residue ::: dead channel :::
ECHO SOREN : CLEARANCE LEVEL 2
EOF fragment — unparsed
