---
mission_id: KATA-08
title: "Wildcard Hunt"
tier: "⬛ KATA"
xp_reward: 15
completed: false
difficulty: 2
category: regex
tags:
  - kata
  - vim/regex
  - vim/wildcards
sticker: lucide//crosshair
color: "#444444"
summary: CORP rotates node IDs with varying numeric suffixes. Match and redact all with a dot-wildcard pattern.
why: "The dot wildcard catches every numeric suffix CORP rotates in — one pattern, all the IDs."
mission_type: practice
locked: true
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-08 // WILDCARD HUNT                ║
║  Skills: . [0-9]\+  :%s/pattern/rep/g   ║
╚══════════════════════════════════════════╝
```

NODE REGISTRY — REDACTED

NODE-7741  : Zone-Alpha active
NODE-083  : Zone-Beta active
NODE-90215  : Zone-Gamma active
NODE-3308  : Zone-Delta active
NODE-441  : Zone-Alpha fallback
NODE-66102  : Zone-Beta fallback

Summary: 6 NODE-REDACTED entries confirmed.
