---
mission_id: KATA-07
title: "Literal Burn"
tier: "⬛ KATA"
xp_reward: 15
completed: false
difficulty: 2
category: regex
tags:
  - kata
  - vim/regex
  - vim/substitute
sticker: lucide//flame
color: "#444444"
summary: A code name was injected across this intercept. Replace all instances in one global substitution.
why: "One global :%s burns the injected name out of the whole intercept in a single command."
mission_type: practice
locked: true
objective:
  - "Replace every `PHANTOM` with `NEXUS` (7×, all in the lines below the `Registry` line)."
  - "Change nothing else: the ASCII banner, the `INTERCEPT LOG` heading, the `Registry` line and all other words stay exactly as they are."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-07 // LITERAL BURN                 ║
║  Skills: :%s/old/new/g                   ║
╚══════════════════════════════════════════╝
```

INTERCEPT LOG — CODENAME INJECTION

Registry    : authentic codename on file — NEXUS

Origin      : PHANTOM
Status      : ACTIVE
Cell-alpha  : PHANTOM handshake confirmed
Cell-beta   : PHANTOM handshake confirmed
Cell-gamma  : awaiting PHANTOM
Relay       : PHANTOM signal nominal
Fallback    : PHANTOM secondary active
Archive     : PHANTOM — channel closed
