---
mission_id: KATA-10
title: "Capture Net"
tier: "⬛ KATA"
xp_reward: 15
completed: false
difficulty: 3
category: regex
tags:
  - kata
  - vim/regex
  - vim/capture-groups
sticker: lucide//network
color: "#444444"
summary: CORP date format to Resistance format. Three captured groups, reversed order in replacement.
why: "Three captured groups, reversed on output — the date reformats itself once you name the parts."
mission_type: practice
locked: true
objective:
  - "Rewrite the four dates under `TIMELINE` from `YYYY-MM-DD` to `DD.MM.YYYY`, e.g. `2046-11-03` → `03.11.2046` (4×)."
  - "Targets: `03.11.2046`, `15.01.2047`, `28.03.2047`, `10.06.2047`."
  - "Keep the ` — ` and the event text after each date exactly as they are. Do not touch the box at the top or the `TIMELINE — RESISTANCE FORMAT` heading."
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-10 // CAPTURE NET                  ║
║  Skills: \(\) \1 \v (\d{4}) \3.\2.\1    ║
╚══════════════════════════════════════════╝
```

TIMELINE — RESISTANCE FORMAT

2046-11-03 — PROJECT MIRROR initiated
2047-01-15 — Pattern engine activated
2047-03-28 — Full coverage achieved
2047-06-10 — Current date
