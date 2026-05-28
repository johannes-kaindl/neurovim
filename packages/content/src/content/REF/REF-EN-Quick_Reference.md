---
title: "NEXUS // Vim Quick Reference"
type: 📋 Reference
sticker: lucide//book-open
color: "#00ff41"
tags:
  - reference
  - vim
summary: All essential Vim commands at a glance. Navigation, modes, operators, search, text objects.
---

```ascii
╔══════════════════════════════════════════════════════════╗
║  NEXUS VIM REFERENCE  //  FIELD MANUAL  //  v2.6         ║
║  "Know your tools better than yourself."                 ║
╚══════════════════════════════════════════════════════════╝
```

---

## MODES

| Command | From → To | Description |
|---------|-----------|------------|
| `ESC` / `Ctrl+c` | Anywhere → Normal | Return to Normal |
| `i` | Normal → Insert | Insert before cursor |
| `a` | Normal → Insert | Insert after cursor |
| `I` | Normal → Insert | Insert at line start |
| `A` | Normal → Insert | Insert at line end |
| `o` | Normal → Insert | New line below |
| `O` | Normal → Insert | New line above |
| `v` | Normal → Visual | Select by character |
| `V` | Normal → Visual | Select by line |
| `Ctrl+v` | Normal → Visual Block | Select by column |

---

## NAVIGATION

### Basic
| Command | Action |
|---------|--------|
| `h` `j` `k` `l` | ← ↓ ↑ → |
| `[n]j` | n lines down |

### Words
| Command | Action |
|---------|--------|
| `w` / `W` | Next word start |
| `b` / `B` | Previous word start |
| `e` / `E` | Next word end |
| `ge` | Previous word end |

### Line
| Command | Action |
|---------|--------|
| `0` | Absolute line start |
| `^` | First non-whitespace |
| `$` | Line end |

### File
| Command | Action |
|---------|--------|
| `gg` | File start |
| `G` | File end |
| `[n]G` | Line n |
| `50%` | 50% through file |
| `H` / `M` / `L` | Viewport: top / middle / bottom |
| `Ctrl+d` / `Ctrl+u` | Scroll half page |
| `Ctrl+o` / `Ctrl+i` | Jump history back / forward |

---

## OPERATORS

> **Pattern:** `[Operator][Motion]` or `[Operator][Operator]` for whole line

| Operator | Action |
|----------|--------|
| `d` | Delete |
| `c` | Change (delete + INSERT) |
| `y` | Yank (copy) |
| `p` / `P` | Paste after / before |
| `dd` / `cc` / `yy` | Whole line |
| `D` | Delete to line end |
| `C` | Change to line end |
| `x` / `X` | Delete char under / before |
| `u` | Undo |
| `Ctrl+r` | Redo |

### Common Combos
| Command | Action |
|---------|--------|
| `dw` | Delete word |
| `d$` | Delete to line end |
| `dG` | Delete to file end |
| `cw` | Change word |
| `3dd` | Delete 3 lines |

---

## TEXT OBJECTS

> **Pattern:** `[Operator][i/a][Object]`
> `i` = inner (no delimiters) · `a` = around (with delimiters)

| Object | Example | Description |
|--------|---------|--------------|
| `w` | `ciw` | Word |
| `W` | `diW` | WORD |
| `s` | `dis` | Sentence |
| `p` | `yip` | Paragraph |
| `"` | `ci"` | Double quotes |
| `'` | `di'` | Single quotes |
| `)` `b` | `ci)` | Parentheses |
| `]` | `da]` | Square brackets |
| `}` `B` | `diB` | Curly braces |
| `t` | `dit` | HTML tag |

---

## SEARCH

### Line Search
| Command | Action |
|---------|--------|
| `f{c}` | Next char c in line |
| `F{c}` | Previous char c |
| `t{c}` | Before next char c |
| `T{c}` | After previous char c |
| `;` / `,` | Next / previous match |

### File Search
| Command | Action |
|---------|--------|
| `/{pattern}` | Search forward |
| `?{pattern}` | Search backward |
| `n` / `N` | Next / previous match |
| `*` / `#` | Search word under cursor |

### Replace
| Command | Action |
|---------|--------|
| `:s/old/new/` | In line (first) |
| `:s/old/new/g` | In line (all) |
| `:%s/old/new/g` | In file (all) |
| `:%s/old/new/gc` | In file (confirm) |

---

## MARKS & MACROS

### Marks
| Command | Action |
|---------|--------|
| `m{a-z}` | Set mark at current position (buffer-local) |
| `m{A-Z}` | Set mark (global, across files) |
| `` `{a} `` | Jump to mark — exact cursor position |
| `'{a}` | Jump to mark — line start |
| `` `` `` | Jump back to position before last jump |
| `'.` | Jump to line of last edit |

### Macros
| Command | Action |
|---------|--------|
| `q{a}` | Start recording into register a |
| `q` | Stop recording |
| `@{a}` | Replay macro from register a |
| `@@` | Replay last macro |
| `[n]@{a}` | Replay macro n times |
| `:norm @a` | Apply macro to every line in range |

---

## REGISTERS

### Named Registers (Cut / Copy / Paste with explicit storage)
| Command | Action |
|---------|--------|
| `"{a}yy` | Yank line into register a |
| `"{a}dd` | Cut line into register a |
| `"{a}4dd` | Cut 4 lines into register a |
| `"{a}p` / `"{a}P` | Paste from register a (after / before) |

### Special Registers
| Register | Contents |
|----------|----------|
| `"0` | Last yank only (never overwritten by delete) |
| `"` | Unnamed — last cut/yank (default) |
| `"+` | System clipboard (paste: `"+p`) |
| `"*` | Selection clipboard |
| `":` | Last Ex command |
| `"/` | Last search pattern |

---

## SPLITS & PANES (Obsidian)

### Navigation between panes
| Command | Action |
|---------|--------|
| `Ctrl+W h` / `j` / `k` / `l` | Navigate panes ← ↓ ↑ → |
| `Ctrl+W w` | Cycle next pane |
| `Ctrl+Tab` | Obsidian: cycle pane |
| `Cmd+Option+Click` | Obsidian: open link in new split-right |

### Cross-pane transfer
| Command | Action |
|---------|--------|
| `yy` | Yank line (register shared across panes) |
| `Vp` | Visual-select line, paste — overwrites selected line |
| `V{motion}p` | Visual-select range, paste — overwrites |

---

## EX-MODE & GLOBAL COMMANDS

### Global Operators
> **Pattern:** `:[range]g/pattern/command`  ·  `:v/pattern/command` inverts match

| Command | Action |
|---------|--------|
| `:g/pattern/d` | Delete every line matching pattern |
| `:v/pattern/d` | Delete every line NOT matching pattern |
| `:g/X/s/Y/Z/` | On every line with X, substitute Y with Z |
| `:g/pattern/p` | Print every line matching (display only) |

### Ranges
| Range | Meaning |
|-------|---------|
| `:{n},{m}` | Absolute line range n to m |
| `:%` | Whole file |
| `:.` | Current line |
| `:+N` / `:-N` | N lines below / above cursor |
| `:'a,'b` | From mark a to mark b |
| `:'<,'>` | Visual selection (auto-filled after `V` + `:`) |

### Common Ex Commands
| Command | Action |
|---------|--------|
| `:sort` | Sort lines in range |
| `:sort u` | Sort + dedupe |
| `:{range}d` | Delete range |
| `:{range}y {reg}` | Yank range into register |
| `:{range}> ` / `<` | Indent / outdent range |

---

## CASE CONVERSION

### Toggle
| Command | Action |
|---------|--------|
| `~` | Toggle case of char under cursor (auto-moves right) |
| `g~{motion}` | Toggle case of motion-range |
| `g~~` / `V~` | Toggle case of entire line |

### Lowercase
| Command | Action |
|---------|--------|
| `gu{motion}` | Lowercase motion-range |
| `guu` | Lowercase entire line |
| `viwu` | Visual-word select, lowercase |
| `V{motion}u` | Visual-line-select, lowercase |

### Uppercase
| Command | Action |
|---------|--------|
| `gU{motion}` | Uppercase motion-range |
| `gUU` | Uppercase entire line |
| `viwU` | Visual-word select, uppercase |
| `V{motion}U` | Visual-line-select, uppercase |

---

## NUMERIC OPS

### Increment / Decrement
| Command | Action |
|---------|--------|
| `Ctrl+a` | Increment number at/after cursor by 1 |
| `Ctrl+x` | Decrement by 1 |
| `{N}<C-a>` / `{N}<C-x>` | By N (e.g., `5<C-a>` adds 5) |

### Visual-Block + Numeric (column ops)
| Command | Action |
|---------|--------|
| `Ctrl+v` | Enter visual-block mode (rectangular selection) |
| `<C-v>{motion}<C-a>` | Increment each line's number-at-cursor-column by 1 |
| `{N}<C-v>{motion}<C-a>` | Increment each by N |
| `<C-v>{motion}g<C-a>` | Staggered: line 1 +1, line 2 +2, ... |

---

## ADVANCED REGEX (Capture-Groups + Modifiers)

### Magic modes
| Prefix | Meaning |
|--------|---------|
| `\v` | Very-magic — regex-meta unescaped (`(`, `{`, `+`) |
| `\m` | Magic (default) — some meta escaped |
| `\V` | Very-nomagic — all literal except backslash-prefixed |

### Capture-groups + Back-references
| Syntax (very-magic `\v`) | Action |
|---|---|
| `(...)` | Capture-group |
| `\1` `\2` ... `\9` | Back-reference to Nth group in replacement |
| `&` | Entire matched text in replacement |

### Character-classes
| Class | Match |
|---|---|
| `\d` / `\D` | Digit / non-digit |
| `\w` / `\W` | Word-char `[A-Za-z0-9_]` / non-word |
| `\s` / `\S` | Whitespace / non-whitespace |

### Quantifiers (very-magic)
| Syntax | Match |
|---|---|
| `*` / `+` / `?` | Zero-or-more / one-or-more / zero-or-one |
| `{N}` / `{N,M}` | Exactly N / between N and M |
| `{-}` | Non-greedy zero-or-more |

### Anchors
| Anchor | Position |
|---|---|
| `^` / `$` | Start / end of line |
| `\zs` / `\ze` | Start / end of match (sub-match boundary) |
| `\<` / `\>` | Word-boundary start / end |

### Example
```
:%s/\v\[ENTRY-(\d+)\]: pattern-(\d{2}) (.+)/Pattern \2 (\1) — \3/
```
Transforms `[ENTRY-0147]: pattern-01 byte-position skew` → `Pattern 01 (0147) — byte-position skew`. Three capture-groups rearranged via back-references.

---

## OBSIDIAN-VIM NOTES

- **Most useful for Markdown-Editing:** `ci"` / `ci(` / `ci[` for value-swap in YAML-frontmatter and inline-code; `dap` / `dip` for paragraph-ops; `>>` / `<<` for list-indent; `:%s/old/new/g` for batch-rename across note.
- **Obsidian-specific shortcuts stack with Vim:** `Cmd+P` Command-Palette, `Cmd+O` Quick-Switcher, `Cmd+E` toggle edit/read-mode — these work alongside Vim without conflict.
- **Visual-line-selection + Ex-range** is your power-combo: `V{motion}:` auto-fills `'<,'>` so you can scope `:g/v/s/sort` to the exact section without counting lines.

---

## LEVEL SYSTEM

| Rank | XP | Unlocks |
|------|----|---------|
| 🔴 SIGNAL LOST | 0 XP | — |
| 🟡 SHADOW LINK | 66 XP | Tier 2 |
| 🔵 NEON WRAITH | 186 XP | Tier 3 |
| 🟣 CHROME RAVEN | 371 XP | — |
| ⚪ NEVERMORE PROTOCOL | 601+ XP | — |

---

*→ [[00-NEXUS]] · Missions: [[_content/01 - Indoctrination/M-01-TRANSMISSION-The_Three_Modes]]*
