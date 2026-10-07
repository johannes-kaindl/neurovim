---
mission_id: M-08
title: "Corrupted Transmission — Operation RAVEN"
tier: "🟡 FIELD TRAINING"
xp_reward: 35
completed: false
difficulty: 5
category: mission
tags:
  - vim/combined
  - field-training
  - story-mission
sticker: lucide//zap
color: "#ffaa00"
summary: First real mission. CORP corrupted a Resistance transmission. Repair it with everything you've learned.
why: "First live repair: CORP corrupted the signal, and only everything you've drilled puts it back together."
mission_type: practice
locked: true
objective:
  - "Fill the two █ runs: `██████████` → `midnight`, `████████` → `morrow`."
  - "In the line `REDACTED REDACTED REDACTED volume of REDACTED lore—`: the three leading `REDACTED` → `Over many a quaint and curious`, the last one → `forgotten`."
  - "In the `'Tis some` line: `SURVEILLANCE` → `visitor`, `MONITORING` → `tapping`. Keep the quotes and commas."
  - "Replace the whole line `[LINE REMOVED BY AUTOMATED CONTENT HARMONIZATION ENGINE v4.1]` with `Ah, distinctly I remember it was in the bleak December;`"
  - "In the second stanza: both `REDACTED` → `Lenore` (2×), and `EVERMORE.` → `evermore.` (lowercase)."
  - "Delete the two `>>` COMPLIANCE banner lines at the end of the poem block. Keep the blank line before the closing fence."
  - "Change nothing else: tab indentation, em dashes `—`, the `CORRUPTED TRANSMISSION` header line and all text outside the poem block stay as they are."
---

```ascii-glitch
╔══════════════════════════════════════════╗
║  MISSION M-08 // OPERATION RAVEN         ║
║  Tier: FIELD TRAINING  //  +35 XP        ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
```

> [!danger] WRAITH
> *"Archive transmission corrupted in transit. The original is a poem — our next handoff is encoded in it.*
> *Everything you've learned. All of it.*
> *Restore the poem. Vim only.*
> *Clock is running."*

> [!quote] CIPHER
> *"Poe's The Raven. Clean version in [[99-THE_RAVEN]] for reference.*
> *Both buried names are the same word: `Lenore`. The poem ends on `evermore`, lowercase.*
> *Work fast. Work clean."*

---

```
CORRUPTED TRANSMISSION // Source: Archive Relay // Classification: RESISTANCE EYES ONLY

Once upon a ██████████ dreary, while I pondered, weak and weary,
REDACTED REDACTED REDACTED volume of REDACTED lore—
	While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some SURVEILLANCE," I muttered, "MONITORING at my chamber door—
		Only this and nothing more."

[LINE REMOVED BY AUTOMATED CONTENT HARMONIZATION ENGINE v4.1]
And each separate dying ember wrought its ghost upon the floor;
Eagerly I wished the ████████;—vainly I had sought to borrow
	From my books surcease of sorrow—sorrow for the lost REDACTED—
For the rare and radiant maiden whom the angels name REDACTED—
Nameless here for EVERMORE.

>> COMPLIANCE: This transmission has been flagged under Directive §441. <<
>> Subversive literature references scheduled for automated reclassification. <<
```

---

Note: The corruption-signature follows the standard NEVERMORE profile — character-level injection (█ glyphs), word-substitution (REDACTED, SURVEILLANCE, MONITORING, EVERMORE), line-level deletion ([LINE REMOVED]), and embedded compliance-banners. Use the full Tier-2 toolkit.

Compare the restored words against [[99-THE_RAVEN]] — but keep this transmission's line breaks and tab indentation exactly as they are.
