---
mission_id: M-06
title: "Text Objects — ciw di( ya\""
tier: "🟡 FIELD TRAINING"
xp_reward: 30
completed: false
difficulty: 4
category: editing
tags:
  - vim/text-objects
  - vim/precision
  - field-training
sticker: lucide//target
color: "#ffaa00"
summary: Text objects are Vim's superpower. No matter where the cursor is — you hit the target. iw, aw, i(, a", is, as.
why: "ci( hits the target no matter where the cursor sits — stop aiming, start naming what you want."
mission_type: practice
locked: true
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Division — Endpoint Registry Extract             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Endpoint Registry Fragment — Serialized Export ║
║  Classification : Internal — Division Circulation                ║
║  Source         : Personnel Registry v2.3 (automated export)     ║
║  Audit Code     : ERX-2047-Q1-0143                               ║
║  Generator      : Registry Export Tool v1.8 (no human review)    ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Intercepted // Infrastructure Division
> GHOST pulled a serialized-export from the endpoint registry.
> CORP's export tool dumps records as structured data — dicts, lists, tuples. NEVERMORE hit the values inside the containers. Brackets, quotes, braces are intact. Values aren't.
> Fix what's inside. The containers stay.

---

endpoints = {
  "NCE-0091-A": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
  "NCE-0042-B": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
  "NCE-0017-C": {"sector": "ZONE-NULL", "clearance": "RESTRICTED", "status": "INACTIVE"},
}

access_codes = [
  ("NCE-0091-A", "ZONE-NULL", "0000"),
  ("NCE-0042-B", "ZONE-NULL", "0000"),
  ("NCE-0017-C", "ZONE-NULL", "0000"),
]

location = "ZONE-NULL"
frequency = "000.0"
window = "NCE-0091-A"
response = "NCE-0042-B"
