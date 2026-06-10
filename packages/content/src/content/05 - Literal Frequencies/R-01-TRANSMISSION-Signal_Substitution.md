---
mission_id: R-01
title: "Signal Substitution"
tier: "🔵 ARC II"
xp_reward: 20
completed: false
difficulty: 1
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 5"
tags:
  - vim/regex
  - vim/substitute
  - arc2
  - arc2-ch5
sticker: lucide//replace
color: "#00ccff"
summary: "[LOCKED] CORP relay garbled a codename across a full intercept log. Fix all nine instances in one command."
why: ":%s — the most powerful line in any file. Garble it nine times, fix it once."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  COMM INTERCEPT — RESISTANCE INTERNAL                            ║
║  Channel        : CIPHER-DIRECT // encrypted                    ║
║  Timestamp      : 2047-05-03 // 04:17                           ║
║  Subject        : Relay log fragment — garbled in transit        ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Direct Channel
> Codename substitution detected. CORP relay swapped NEXUS for a dead-drop alias across this intercept. Fix all nine before it gets archived.

---

COMMUNICATION LOG — SECTOR 3 RELAY NODE

Origin      : PHANTOM
Destination : Field agents — all channels
Status      : ACTIVE

PHANTOM confirms asset extraction at 23:00.
Route verified. PHANTOM logistics intact.

Cell-alpha checks in: PHANTOM handshake received.
Cell-beta checks in: PHANTOM handshake received.
Cell-gamma: awaiting PHANTOM confirmation.

PHANTOM fallback activated — secondary route clear.
PHANTOM signal strength: nominal.

Archive marker: PHANTOM — close of channel.
