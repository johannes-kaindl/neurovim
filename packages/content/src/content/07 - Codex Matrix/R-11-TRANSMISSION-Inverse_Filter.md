---
mission_id: R-11
title: "Inverse Filter"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/regex
  - vim/global
  - arc2
  - arc2-ch7
sticker: lucide//filter-x
color: "#cc00ff"
summary: "[LOCKED] CORP embedded noise lines in a clearance log. Keep only what matters — delete everything without CLEARANCE using :g!."
why: ":g! is the inverse net — keep what matters, delete everything that doesn't say CLEARANCE."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ASSET REGISTER — NOISE EMBEDDED                            ║
║  Document       : Asset log // noise-injected                    ║
║  Timestamp      : 2047-05-20 // 14:00                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Filter note
> Every valid entry carries the clearance keyword. The rest is noise. `:g!` inverts the filter — strip the document down to what matters.

---

WRAITH       : CLEARANCE LEVEL 4 — approved
x91A :: relay echo :: unparsed burst
GHOST        : CLEARANCE LEVEL 4 — approved
[buffer dump] sector static — discard
0x44F1 checksum residue // no payload
REN VOSS     : CLEARANCE LEVEL 3 — approved
::: carrier hum ::: dead channel :::
CIPHER       : CLEARANCE LEVEL 5 — approved
relay-4 fragment — header only, no body
SHADOW-7     : CLEARANCE LEVEL 3 — approved
EOF marker corrupted — ignore
