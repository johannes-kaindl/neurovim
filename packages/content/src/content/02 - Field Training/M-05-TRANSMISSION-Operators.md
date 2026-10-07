---
mission_id: M-05
title: "Operators — d c y p"
tier: "🟡 FIELD TRAINING"
xp_reward: 25
completed: false
difficulty: 3
category: editing
tags:
  - vim/operators
  - vim/delete
  - vim/yank
  - field-training
sticker: lucide//scissors
color: "#ffaa00"
summary: Delete, copy, paste. The building blocks of text manipulation. Operators + Motions = Power.
why: "d, c, y — the three verbs. Pair them with a motion and you stop nudging text and start commanding it."
mission_type: practice
locked: true
objective:
  - "Delete all four `>> COMPLIANCE` blocks: every line that starts with `>>` (7 lines in total, two of them continuation lines without the word COMPLIANCE)."
  - "Delete the blank line that belonged to each block too, so exactly one blank line remains between the header box, each group of timestamped lines and `End of period log.`"
  - "Change nothing else: the two ascii boxes, all timestamped log lines and `End of period log.` stay exactly as they are."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Relay Division — Access Log Alpha                ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Access Log — Sector 7 Primary Node             ║
║  Period         : 2047-03-14T21:00 — 23:59                       ║
║  Classification : Internal — Sector Administration               ║
║  Audit Code     : ALA-2047-Q1-0271                               ║
║  Generator      : Relay Monitor v8.2 (Automated)                 ║
║  Reviewer       : None — No human review required                ║
╚══════════════════════════════════════════════════════════════════╝
```

>> COMPLIANCE: This log is monitored under Directive §441 of the UDCA. <<
>> Unauthorized access is subject to automated classification review. <<

21:04 — ASSET authenticated — clearance LEVEL-2
21:17 — File transfer initiated — 4.2MB encrypted packet
21:19 — Transfer complete — node 7-PRIMARY confirmed receipt

>> COMPLIANCE: All relay activity is logged. Flagged segments will be <<
>> cross-referenced against subsequent monitoring windows. <<

21:44 — Second authentication — same ASSET — flagged: pattern anomaly
21:45 — Query: infrastructure database — search term [REDACTED]
21:51 — Database access terminated — no match returned

>> COMPLIANCE: Operator pattern flagged for review. <<

22:13 — ASSET disconnects — session duration 69 minutes
22:14 — Automated sweep initiated by monitoring infrastructure

>> COMPLIANCE: Anomalous endpoint diversity logged. Cross-reference queued. <<
>> Audit Code ALA-2047-Q1-0271 scheduled. <<

End of period log.

```ascii
── END OF LOG ──────────────────────────────────────────────────────
   CORP — Infrastructure Relay Division
   ALA-2047-Q1-0271 — 2047-03-14T23:59:00Z
   Automated log. No operator input required.
────────────────────────────────────────────────────────────────────
```
