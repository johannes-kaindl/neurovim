---
mission_id: R-07
title: "Lazy Trace"
tier: "🔵 ARC II"
xp_reward: 25
completed: false
difficulty: 2
category: regex
mission_type: practice
locked: true
unlock_requirement: "Level 6"
tags:
  - vim/regex
  - vim/quantifiers
  - arc2
  - arc2-ch6
sticker: lucide//minimize-2
color: "#ff6600"
summary: "[LOCKED] CORP wraps payloads in XML-style tags. Strip the tags with a lazy quantifier — or you'll consume the content too."
why: "Greedy eats the whole line; the lazy quantifier stops at the first close-tag and spares the payload."
objective:
  - "Delete every tag: all 14 `<...>` and `</...>` markers on the 7 lines from `<HEADER>PAYLOAD EXTRACTION` down to `Channel:` (`HEADER`, `ENCRYPTED`, `NODE`, `ASSET`)."
  - "Keep the text between the tags exactly as it is, including the label before it (e.g. `Route: <ENCRYPTED>primary corridor, north passage</ENCRYPTED>` → `Route: primary corridor, north passage`)."
  - "Leave no extra spaces where a tag was. Do not touch the box header, the CIPHER note or the `---` line."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP ENCRYPTED PAYLOAD — SECTOR 3 RELAY                         ║
║  Document       : Wrapped transmission // tag-encoded            ║
║  Timestamp      : 2047-05-12 // 17:45                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Extraction note
> Tags wrap the payload. Content is valuable. Lazy match: `.\{-}` — not `.*`.

---

<HEADER>PAYLOAD EXTRACTION — UNWRAPPED</HEADER>

Route: <ENCRYPTED>primary corridor, north passage</ENCRYPTED>
Status: <ENCRYPTED>ACTIVE — all nodes clear</ENCRYPTED>
Rendezvous: <NODE>NODE-7 at 23:00</NODE>
Fallback: <NODE>south corridor, 23:30</NODE>
Asset: <ASSET>WRAITH — extraction confirmed</ASSET>
Channel: <ENCRYPTED>closed</ENCRYPTED>
