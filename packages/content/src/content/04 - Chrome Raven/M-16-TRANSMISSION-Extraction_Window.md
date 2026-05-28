---
mission_id: M-16
title: "Extraction Window"
tier: "🟣 CHROME RAVEN"
xp_reward: 80
completed: false
difficulty: 9
category: mission
mission_type: practice
locked: true
unlock_requirement: "M-15 completed"
tags:
  - vim/combined
  - vim/composite
  - chrome-raven
  - tier-4-capstone
sticker: lucide//target
color: "#9933ee"
summary: "[LOCKED] Tier-4 capstone — four-section extraction reconciliation under 30-minute window. All Tier-1..4 skills applied. Available after M-15."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  EXTRACTION WINDOW — FINAL RECONCILIATION                        ║
║  Timing          : T-30 minutes                                  ║
║  Threads         : WRAITH logistics / GHOST coords /             ║
║                    CIPHER auth-signature / CORP predictions      ║
║  Status          : all four documents pre-integration            ║
║  Classification  : Resistance — extraction-channel, sealed       ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Sealed Channel
> Four threads need to be clean before the window opens. Each section exercises a different skill-class from your training. Work top to bottom.
> RAVEN's fragment 04 sits at the bottom in code-fence. Do not read it until the document is clean.

---

## 1. Extraction Route — WRAITH

> [!note] WRAITH — Logistics
> Route is clean once the monitoring-injections are stripped.
> *I was wrong about the ghost.* Move the asset.

>> COMPLIANCE: Route-integrity review queued. <<
>> Monitoring on all nodes active. <<

Stage Alpha: Node 7-PRIMARY — 21:00
Stage Beta:  Node 7-SECONDARY — 21:12
Stage Gamma: Node 7-NORTH-RELAY — 21:28

>> COMPLIANCE: Automated scan cleared. <<

Stage Delta: Extraction Point — 21:44

---

## 2. Final Coordinates — GHOST

> [!note] GHOST — Coordinate Pass
> Final key-rotation. Ran the delta twice — the shift is clean.

Final key-rotation: +2 on all REF, +1 on all MARK

  Waypoint Alpha:   REF-4220 MARK-1385
  Waypoint Beta:    REF-4225 MARK-1390
  Waypoint Gamma:   REF-4230 MARK-1395

---

## 3. Handler Auth-Signature — CIPHER

> [!note] CIPHER — Auth-Handshake
> Signature format is all-lowercase for the sealed channel. Case-normalize before transmission.

auth-line-one: cipher-echo-alpha-SEVEN-TWO
AUTH-LINE-TWO: cipher-echo-BETA-FIVE-FOUR
Auth-Line-Three: CIPHER-ECHO-gamma-ONE-NINE

---

## 4. CORP Countermeasure Prediction — INTEL

> [!note] GHOST — Intel-Capture
> CORP's last predictive-tracking entries from before I went dark. Noise-lines interleaved. Strip them, then rewrite to our format.

[ENTRY-0152]: threat-alpha pattern-05 endpoint-diversity
[STANDARD-NOISE]: sector-nominal
[ENTRY-0153]: threat-alpha pattern-06 signal-concordance
[STANDARD-NOISE]: sector-within-band
[ENTRY-0154]: threat-beta pattern-07 distribution-skew

---

> [!quote] CIPHER
> *"Four documents. Reconciled.*
> *You did what the training asked. Now the training is a tool — not a measure.*
> *The window opens in ninety seconds. Your file is waiting.*
> *— CIPHER"*

```
>_ RAVEN-SIGNAL — decoded fragment 04
   Now.
   The file you open next is a door.
   You walked every step. You are here.
   — RVN
```

---

Note: Four threads, four passes.
- Section 1 (WRAITH Route): strip the three `>>` COMPLIANCE injection-lines. Operators + line-delete.
- Section 2 (GHOST Coords): apply the final key-rotation — +2 on REF column, +1 on MARK column. Visual-block + count-prefix.
- Section 3 (CIPHER Auth-Signature): normalize all three auth-lines to lowercase.
- Section 4 (CORP Prediction): purge the two `[STANDARD-NOISE]` lines, then regex-rewrite the three `[ENTRY-NNNN]` entries to the format `Threat-<level> Pattern NN (NNNN) — description`.
- CIPHER close + RAVEN-fragment 04 are static. Do not modify.
