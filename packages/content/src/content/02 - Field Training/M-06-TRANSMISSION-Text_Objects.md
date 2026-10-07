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
objective:
  - "In `endpoints` and `access_codes`, rename the IDs: `NCE-0091-A` → `CELL-DELTA-01`, `NCE-0042-B` → `CELL-DELTA-02`, `NCE-0017-C` → `GHOST`."
  - "Record `CELL-DELTA-01`: sector `sector-7-north`, clearance `field-ops`, status `active`, code `7741`."
  - "Record `CELL-DELTA-02`: sector `corp-adjacent`, clearance `intelligence`, status `active`, code `3392`."
  - "Record `GHOST`: sector `corp-internal`, clearance `deep-cover`, status `dark`, code `0012`."
  - "In both blocks, each row's `ZONE-NULL` becomes its sector, `RESTRICTED` its clearance, `INACTIVE` its status, `0000` its code."
  - "Last four lines: `location` = `relay-cluster-7`, `frequency` = `441.7`, `window` = `THE DIFF DOES NOT LIE`, `response` = `TRUST THE DIFF` (not record IDs)."
  - "Only the values inside the quotes change. Keys (`sector`, `clearance`, `status`), quotes, brackets, braces, commas and the note above stay as they are."
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
