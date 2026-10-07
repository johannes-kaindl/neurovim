---
mission_id: KATA-03
title: "Object Infiltration"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 2
category: text-objects
tags:
  - kata
  - vim/text-objects
sticker: lucide//zap
color: "#444444"
summary: Config values are wrong. Infiltrate each delimiter and replace the payload. No story. Just objects.
why: "ci and di reach inside the delimiters — stop counting characters, name the object and replace it."
mission_type: practice
locked: true
objective:
  - "Replace only what sits inside the delimiters on the five config lines at the bottom; keep the quotes, parentheses and braces."
  - "`\"REDACTED\"` → `\"OPERATIVE_7734\"`"
  - "`\"UNKNOWN\"` → `\"LEVEL-4\"`"
  - "`(0.0, 0.0)` → `(52.4, 13.4)` (comma, then one space)"
  - "`\"OPEN\"` → `\"CIPHER_FREQ\"`"
  - "`{BLANK}` → `{NEVERMORE}`"
  - "Leave the banner, the `OPERATIVE CONFIG` heading and the `Field reference` line unchanged."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-03 // OBJECT INFILTRATION          ║
║  Skills: ci"  ci(  ci{  ca"  da(        ║
╚══════════════════════════════════════════╝
```

OPERATIVE CONFIG

Field reference (memorize, then patch below): OPERATIVE_7734 · LEVEL-4 · 52.4,13.4 · CIPHER_FREQ · NEVERMORE

agent_id   = "REDACTED"
clearance  = "UNKNOWN"
coords     = (0.0, 0.0)
channel    = "OPEN"
passphrase = {BLANK}
