---
mission_type: briefing
links_to: "04 - Chrome Raven/M-16-TRANSMISSION-Extraction_Window"
locked: true
tags: [briefing, tier-4, tier-4-capstone]
sticker: lucide//target
color: "#cc66ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-16 // EXTRACTION WINDOW         ║
║  Clearance: CHROME RAVEN  //  CAPSTONE       ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Capstone. Four documents, four threads — WRAITH's route, GHOST's coordinates, my auth-signature, CORP's countermeasure prediction. All of them have to be clean before the extraction-window opens.*
> *You use everything. Operators to strip injections. Visual-block to shift coordinates. Case-conversion for the signature. Global + regex for the prediction cleanup.*
> *Four sections. Four passes. No new tools — only the ones you already have.*
> *RAVEN's fragment 04 is at the bottom. Don't read it until the document is clean. It's the last piece."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Reconcile four extraction-threads in a single mission-file before the window closes.
> > 1. WRAITH route: delete the three `>>` lines and the blank line below each `>>` block.
> > 2. GHOST coords: +2 on every `REF-`, +1 on every `MARK-` (`REF-4222 MARK-1386`, `REF-4227 MARK-1391`, `REF-4232 MARK-1396`).
> > 3. CIPHER auth: all three auth-lines fully lowercase.
> > 4. CORP intel: delete both `[STANDARD-NOISE]` lines, rewrite each entry to `Threat-alpha Pattern 05 (0152) - endpoint-diversity` form.
>
> > [!tip] SKILLS
> > All Tier-1..4 composite — `dd`/`3dd` (operators), `Ctrl+v` + `N<C-a>` (visual-block + numeric), `guu`/`viwu` (case-conversion), `:g/X/d` + `:%s/\v.../.../` with capture-groups (Ex + regex)
>
> > [!success] +80 XP
>
> → **[[_content/04 - Chrome Raven/M-16-TRANSMISSION-Extraction_Window|M-16-TRANSMISSION-Extraction_Window]]** — open to begin. Timer starts on file open.
