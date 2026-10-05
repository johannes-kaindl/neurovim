# Content-Audit — Ableitbarkeit von Solutions aus Transmissions

> **Herkunft:** Geseedet aus der `vim-dojo`-Session am 2026-07-24. Beim Testen des
> Obsidian-Plugins fiel auf, dass **M-02 ohne Lösungskenntnis nicht lösbar ist** — die
> Solution verlangt Zeilen, die in der Transmission gar nicht existieren und mit den
> Mission-Skills (`hjkl`-Navigation) nicht erzeugbar sind. Dieser Audit gehört in die
> SSOT (`packages/content`), nicht ins vendored Plugin-Snapshot.
>
> **Kontext-Notiz:** Johannes spielt Missionen nicht selbst (siehe `claude/memory/feedback_no_playtest.md`) —
> Content ist per Design + Tests abgesichert. Genau deshalb ist ein **Ableitbarkeits-Invariant-Test**
> hier der eigentliche Fix, nicht nur die Einzelkorrektur.

## ✅ Behoben: M-02 (Basic Navigation — hjkl)

> **Fix (2026-07-24):** Weg 1 umgesetzt — die 3 fehlenden Zeilen korrupt in die Transmission
> eingebaut (`coordiantes`/`codewrod`/`codewor`, gleicher Transpositions-/Drop-Stil wie die
> restlichen Tippfehler). Zusätzlich gefundener **Grenzfall**: `Status: CORRUPTED IN TRANSIT` →
> `Status: RESTORED` in der Solution war ebenfalls nicht ableitbar (kein Typo desselben Worts,
> sondern ein unverwandtes Wort; kommt in keiner anderen Mission als Konvention vor). Dafür
> **Weg 2** (Solution angeglichen, Header bleibt `CORRUPTED IN TRANSIT`) — der Header ist nicht
> Teil der deklarierten Mission-Skills und ein erzwungener Flip auf ein arbiträres Wort hätte
> nichts geübt. Sweep bestätigt: M-02 taucht nicht mehr in der Orphan-Liste auf, Zeilenzahl
> Transmission==Solution (21/21), jede verbleibende Differenz ist eine In-Place-Wortkorrektur.
> Gate grün (204 Tests, 4-Workspace-Typecheck).

Datei: `packages/content/src/solutions/M-02-SOLUTION-Basic_Navigation.md`
Skills der Mission (aus Frontmatter/Briefing): **nur** `h j k l`, `0 $ ^` — reine Navigation,
keine Textänderung außer Cursorbewegung. Das Briefing sagt wörtlich: *"The coordinates in the
file are intact. Just in the wrong positions."*

Das stimmt nicht. Diese Solution-Zeilen existieren in der Transmission **überhaupt nicht** und
sind durch Navigation nicht erzeugbar:

```
Drill coordinates: 52.4N / 13.4W
Contact codeword: THE DIFF DOES NOT LIE
Response codeword: TRUST THE DIFF
```

Grenzfall (ebenfalls nicht durch Navigation lösbar): `Status: CORRUPTED IN TRANSIT` →
`Status: RESTORED` in der Solution.

**Zur Abgrenzung — diese Zeilen sind KEIN Defekt**, sondern legitime Tippfehler-Korrekturen
(die Transmission enthält die korrupte Variante, die Solution die saubere):
`entarnce→entrance`, `positiob→position`, `stairwel→stairwell`, `accesss→access`,
`exit→exfil`, `fiften→fifteen`, `la→late`, `befoer→before`, `restoirng→restoring`,
`corectly→correctly`. Diese bitte **nicht** anfassen.

### Zwei Lösungswege (Produktentscheidung offen)

1. **Transmission ergänzen:** die drei fehlenden Zeilen (Koordinaten + zwei Codewörter) korrupt
   in die Transmission einbauen, sodass sie durch Navigation/Positionskorrektur restaurierbar
   werden — passt zum Briefing-Versprechen „intact, just in the wrong positions".
2. **Solution kürzen:** die drei Zeilen aus der Solution entfernen — reduziert M-02 auf reine
   Tippfehler-Korrektur. Widerspricht aber dem Missionsnamen „Navigation".

Empfehlung: **Weg 1** — er hält das narrative Versprechen und übt tatsächlich Navigation.

## ✅ Verdachtsliste — vollständig trianiert (2026-07-24)

Char-Bigram-Ähnlichkeit < 0.5 gegen jede Transmission-Zeile. Alle 10 Fälle einzeln gegen
Transmission **und** Briefing geprüft (der ursprüngliche Sweep verglich nur Transmission↔
Solution und hat Briefing-Inhalt nicht gesehen — u. a. deshalb wirkten R-16/R-24 zunächst wie
Verdachtsfälle, obwohl das Briefing den exakten Zielwert bzw. Befehl bereits nennt).

**9 von 10 legitim** — Zielwert/-formel steht explizit in Transmission-CIPHER-Note oder Briefing:

| Mission | Orphan-Zeilen | Befund |
|---|---|---|
| M-13 Case Cipher | 4 (Prosa) | legitim — reine Case-Konvertierung, identische Wörter; Bigram-Check ist case-sensitiv (Fehlalarm) |
| M-15 Pattern Rewriting | 2 | legitim — Regex-Capture-Group-Formel steht in der Transmission-Note |
| M-16 Extraction Window | 1 | legitim — Arithmetik-/Regex-Formeln stehen in der Transmission-Note |
| R-01 Signal Substitution | 1 | legitim — Zielwort „NEXUS" steht explizit in der CIPHER-Note |
| R-04 Range Strike | 3 | legitim — Zielwort „ACTIVE" steht explizit in der CIPHER-Note |
| R-07 Lazy Trace | 1 | legitim — reines Tag-Stripping, Payload-Inhalt bleibt wortwörtlich erhalten |
| R-10 Digit Sweep | 4 | legitim — Zieltext „[OK]" steht explizit in der CIPHER-Note |
| R-16 Full Anchor | 3 (`[REDACTED]`) | legitim — Zieltext + exakter `:%s`-Befehl stehen im **Briefing** (`R-16-BRIEFING-Full_Anchor.md`) |
| R-24 Project Mirror | 1 | legitim — alle drei Operationen + Zieltext stehen wörtlich im **Briefing** |

**1 von 10 bestätigt defekt (gleiche Fehlerklasse wie M-02):**

> **M-06 Text Objects** — 11 arbiträre Zielwerte (u. a. `CELL-DELTA-01`, `sector-7-north`,
> und — Wiederverwendung aus M-02! — die Codewörter `THE DIFF DOES NOT LIE`/`TRUST THE DIFF`)
> tauchten weder in Transmission noch Briefing auf. **Fix:** Briefing-DIRECTIVE um die
> vollständige Ersetzungsliste ergänzt (analog zum bereits etablierten Muster in R-16/R-24 —
> Zielwerte gehören ins Briefing, nicht in die gescorte Transmission).

**+2 zusätzliche Funde beim Schreiben des Invariant-Tests** (der Test deckt auch KATAs ab,
die der ursprüngliche Sweep nicht erfasste):

- **KATA-07 Literal Burn** — legitim: das Zielwort „NEXUS" steht bereits diegetisch in der
  Transmission selbst (`Registry : authentic codename on file — NEXUS`).
- **KATA-03 Object Infiltration** — bestätigt defekt, gleiche Klasse wie M-02/M-06 (u. a.
  Koordinaten `52.4, 13.4` — wieder dieselbe Zahl wie M-02, drittes Vorkommen desselben
  Copy-Paste-Templates). KATAs haben **kein** separates Briefing-File (Single-Screen-Format) —
  Fix daher als statische, in Transmission **und** Solution identische Referenzzeile direkt im
  Config-Block: `Field reference (memorize, then patch below): OPERATIVE_7734 · LEVEL-4 · …`.

## ✅ Bleibender Fix: Ableitbarkeits-Invariant-Test (umgesetzt 2026-07-24)

`packages/content/test/content.test.ts` → `describe('solution derivability', …)`. Der
Sweep-Reproduktions-Einzeiler ist als echter Jest-Test verankert: pro Mission werden
Solution-Zeilen ohne Entsprechung (verbatim oder Bigram-Ähnlichkeit > 0.5) in der Transmission
als „unexplained orphan" gemeldet, **außer** die Mission-ID steht in der kuratierten
`EXPLAINED_ORPHANS`-Allowlist — mit Ein-Zeilen-Begründung pro Eintrag (siehe Testcode).
Künftiger Content, der neue unerklärte Orphan-Zeilen einführt, macht den Gate rot und zwingt
zur selben bewussten Entscheidung wie bei M-02/M-06/KATA-03 (Transmission/Briefing ergänzen,
oder Mission-ID mit Begründung zur Allowlist hinzufügen).

Bewusst die **Zeilen-Orphan-Heuristik** verankert statt der ursprünglich skizzierten
schwachen Längen-Invariante (`solution.lines <= transmission.lines`) — Letztere hätte
M-06/KATA-03 gar nicht gefangen (keine Extra-Zeilen, nur Extra-*Werte* in bestehenden Zeilen).
Eine starke Invariante (Vim-Operationen pro Mission modellieren) bleibt möglich, ist aber groß;
die Orphan-Heuristik deckt den akuten Fall vollständig ab.

## ✅ M-03 Word Movement — dieselbe Klasse, vom Zeilen-Gate nicht sichtbar (2026-07-29)

Beim Spielen im Obsidian-Plugin aufgefallen: **M-03 nennt seine Zielwerte nirgends.** Die
Solution verlangt drei Token-Ersetzungen, die weder in der Transmission noch im Briefing
vorkommen:

| Transmission | Solution |
|---|---|
| `SCAN-7741` | `UNIT-7741` |
| `TRACE-3392` | `RELAY-3392` |
| `WATCH-0012` | `NODE-0012` |

Das Briefing sagt nur *„It replaced each token with a CORP-style surveillance code"* und als
Objective *„Replace CORP surveillance codes with correct practice tokens"* — ohne HINT ist die
Mission nur durch Raten lösbar. Fehlerklasse identisch zu M-02/M-06/KATA-03.

**Warum der Invariant-Test von 2026-07-24 das nicht fing:** `orphanLines` vergleicht
**zeilenweise** mit Bigram-Ähnlichkeit > 0.5. Eine In-Place-Wortersetzung lässt den Rest der
Zeile unangetastet — `SCAN-7741 — Field operative, northern sector` und
`UNIT-7741 — Field operative, northern sector` liegen weit über der Schwelle und sind damit
kein Orphan. M-06 rutschte nur deshalb ins Netz, weil dort ganze Zeilen unähnlich wurden.

**Fix:** Ersetzungsliste in die Briefing-DIRECTIVE (Muster R-16/R-24/M-06 — Zielwerte gehören
ins Briefing, nicht in die gescorte Transmission).

## ✅ Bleibender Fix ②: Token-Level-Invariante (umgesetzt 2026-07-29)

`content.test.ts` → zweiter Test im `solution derivability`-Block. Gleiche Bigram-Metrik, eine
Granularität tiefer: jedes Solution-**Token** braucht eine Quelle in Transmission **oder**
Briefing (verbatim oder ähnlich > 0.5), sonst rot. Die Zeilen-Heuristik bleibt daneben stehen —
sie fängt hinzugefügte Zeilen, die der Token-Check bei ähnlichem Vokabular durchlässt.

Erstlauf: 10 Missionen gemeldet, alle einzeln triagiert — **9 legitim**, 1 defekt (M-03):

| Mission | Befund |
|---|---|
| M-01, M-02, KATA-01 | Tippfehler-Korrekturen (`knwo`→`know`, `entarnce`→`entrance`, `ATIVE`→`ACTIVE`) — zu kurz für die Bigram-Schwelle |
| M-11 | Zielwerte stehen in `FRAGMENT-10`, im Briefing verlinkt — der Split-Pane-Diff **ist** die Mission |
| M-14 | Offset-Keys (`+3` REF, `+7` MARK) stehen in Transmission und Briefing |
| M-15, M-16 | Capture-Group-/Arithmetik-Formeln in der Transmission-Note |
| R-19, KATA-10 | Datums-Reformat, Gruppenreihenfolge `\3.\2.\1` explizit genannt |
| **M-03** | **defekt** → Briefing-DIRECTIVE ergänzt (siehe oben) |

Die neun stehen als `EXPLAINED_TOKENS` mit Ein-Zeilen-Begründung im Testcode. Faustregel für
künftige Einträge: **ein Tippfehler ist ableitbar** (die falsche Schreibung steht da), **ein
arbiträrer Zielwert nicht** — es sei denn, der Missionstext nennt ihn oder gibt eine Formel,
die ihn erzeugt.

## ✅ M-08 Corrupted Transmission — die Lösung fehlte ganz (2026-10-05)

Befund aus Plan C der Medienintegration (Aufnahme-Sequenz an M-08 in `neurovim-obsidian`): `MissionSession.start('M-08')` wirft `Mission M-08 has no solution — cannot play`. Gemessen: von 40 Transmissions hatte genau eine keine `solutions/`-Datei, M-08; der Manifest-Test zählte 53 Solutions und hielt das für vollständig, die Ableitbarkeits-Tests prüfen nur Missionen **mit** Solution. Eine Mission ohne Lösung ist im Plugin nicht startbar, im Hub aber sichtbar.

Fix: `solutions/M-08-SOLUTION-Corrupted_Transmission.md`, abgeleitet aus der Transmission selbst: Die Note nennt das NEVERMORE-Profil (█-Injektion, Wortersetzung REDACTED/SURVEILLANCE/MONITORING/EVERMORE, `[LINE REMOVED]`, Compliance-Banner), die CIPHER-Notiz und die Schlusszeile nennen `[[99-THE_RAVEN]]` als Referenz („first two stanzas should match exactly“). Die Lösung behält den Rahmen der Transmission (Box, Callouts, Kopfzeile des Codeblocks, Note) und das Whitespace der Transmission (Tabs), ersetzt nur die korrumpierten Stellen durch den Wortlaut aus REF und entfernt die zwei Compliance-Banner. Zehn geänderte Zeilen.

Ausnahmen: M-08 steht in `EXPLAINED_ORPHANS` und `EXPLAINED_TOKENS`, weil die wiederhergestellten Wörter (`midnight`, `Over many a quaint and curious`, `visitor`, `tapping`, `Ah, distinctly …`, `Lenore`) aus dem verlinkten REF-Dokument stammen, nicht aus Transmission oder Briefing — dieselbe Klasse wie M-11 (Zielwerte in einem verlinkten Fragment). Manifest-Zählung auf 174 Einträge, 54 Solutions.

Offen: ein Invariant-Test „jede Transmission hat eine Solution“ fehlt weiterhin; der Manifest-Test zählt Rollen, prüft aber keine Paarung. Nicht in diesem Commit, weil die Zählung dann an zwei Stellen stünde.

## Reproduktion des Sweeps

```bash
node -e '
const fs=require("fs");
let s=fs.readFileSync("packages/content/src/generated/content.ts","utf8");
const arr=JSON.parse(s.slice(s.indexOf("= [")+2, s.lastIndexOf("]")+1));
const tx={},sol={};
for(const e of arr){ if(e.role==="transmission")tx[e.id]=e.body; if(e.role==="solution")sol[e.id]=e.body; }
function sim(a,b){const bg=x=>{const s=new Set();for(let i=0;i<x.length-1;i++)s.add(x.slice(i,i+2));return s;};const A=bg(a),B=bg(b);if(!A.size||!B.size)return a===b?1:0;let n=0;for(const g of A)if(B.has(g))n++;return n/(A.size+B.size-n);}
for(const id of Object.keys(sol)){ if(!tx[id])continue;
  const t=tx[id].trim().split("\n"), so=sol[id].trim().split("\n");
  const orphan=so.filter(l=>l.trim() && !t.includes(l) && !t.some(x=>sim(x,l)>0.5));
  if(so.length>t.length||orphan.length) console.log(id, "solLen>txLen:", so.length>t.length, "orphans:", orphan.length);
}'
```
