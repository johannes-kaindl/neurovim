<!-- AUTO-GENERATED from packages/core/src/data — do not edit by hand. Run `npm run build:manual`. -->
# Reference — Vim keymap

> **Diátaxis: Reference.** The exact set of Vim commands NeuroVim teaches and
> recognises, grouped as the in-game cheatsheet shows them. This is the game's
> keymap, not a full Vim reference — but every key here is exercised by a mission
> or drill. Generated from the source of truth, so it always matches the build.

The in-game **Reference overlay** (CIPHER → `Reference`) shows these same
categories, revealing each as you unlock the matching missions.

**13 categories.** Jump to: [FUNDAMENTALS](#fundamentals) · [NAVIGATION](#navigation) · [WORD MOVEMENT](#word-movement) · [OPERATORS](#operators) · [TEXT OBJECTS](#text-objects) · [SEARCH & REPLACE](#search--replace) · [MARKS & MACROS](#marks--macros) · [REGISTERS](#registers) · [PANE NAVIGATION](#pane-navigation) · [EX COMMANDS](#ex-commands) · [CASE CONVERSION](#case-conversion) · [VISUAL BLOCK](#visual-block) · [REGEX](#regex)

## FUNDAMENTALS

### MODES

| Key | Action |
| --- | --- |
| `i` | insert before cursor |
| `a` | insert after cursor |
| `o` | new line below, insert |
| `O` | new line above, insert |
| `ESC` | back to normal |

### EDIT

| Key | Action |
| --- | --- |
| `x` | delete char under cursor |
| `X` | delete char before cursor |
| `r` | replace single char |
| `.` | repeat last change |
| `u` | undo |
| `Ctrl+r` | redo |

## NAVIGATION

### BASIC MOVE

| Key | Action |
| --- | --- |
| `h` | left |
| `j` | down |
| `k` | up |
| `l` | right |
| `0` | line start |
| `^` | first non-blank |
| `$` | line end |

### FILE JUMPS

| Key | Action |
| --- | --- |
| `gg` | file start |
| `G` | file end |
| `:#` | jump to line number |
| `H` | top of screen |
| `M` | middle of screen |
| `L` | bottom of screen |

### FIND CHAR

| Key | Action |
| --- | --- |
| `f` | jump to next <char> |
| `F` | jump to previous <char> |
| `t` | jump just before next <char> |
| `T` | jump just before previous <char> |
| `;` | repeat last f/F/t/T |
| `,` | repeat it, reversed |

### SCROLL

| Key | Action |
| --- | --- |
| `Ctrl+d` | half page down |
| `Ctrl+u` | half page up |
| `{` | prev paragraph |
| `}` | next paragraph |

## WORD MOVEMENT

### WORD JUMP

| Key | Action |
| --- | --- |
| `w` | next word start |
| `b` | prev word start |
| `e` | word end |
| `W` | next WORD start |
| `B` | prev WORD start |
| `E` | WORD end |

## OPERATORS

### DELETE

| Key | Action |
| --- | --- |
| `dw` | delete word |
| `dd` | delete line |
| `D` | delete to end of line |
| `diw` | delete inner word |
| `3dd` | delete 3 lines |

### CHANGE

| Key | Action |
| --- | --- |
| `cw` | change word |
| `cc` | change line |
| `C` | change to end of line |

### YANK/PUT

| Key | Action |
| --- | --- |
| `yy` | yank line |
| `yw` | yank word |
| `p` | put after |
| `P` | put before |
| `Vp` | select line, replace with yanked |

## TEXT OBJECTS

### INSIDE

| Key | Action |
| --- | --- |
| `ciw` | change inside word |
| `ci"` | change inside quotes |
| `ci(` | change inside parens |
| `ci{` | change inside braces |
| `ci[` | change inside brackets |
| `cit` | change inside tag |

### AROUND

| Key | Action |
| --- | --- |
| `daw` | delete around word |
| `ca"` | change around quotes |
| `da(` | delete around parens |
| `diw` | delete inner word |

## SEARCH & REPLACE

### SEARCH

| Key | Action |
| --- | --- |
| `/pattern` | search forward |
| `?pattern` | search backward |
| `n` | next match |
| `N` | prev match |
| `*` | search word under cursor |
| `cgn` | change next match |
| `.` | repeat last change |

### REPLACE

| Key | Action |
| --- | --- |
| `:%s/old/new/g` | replace all in file |
| `:s/old/new/g` | replace in line |
| `:%s/old/new/gc` | replace with confirm |

## MARKS & MACROS

### MARKS

| Key | Action |
| --- | --- |
| `ma` | set mark a |
| ``a` | jump to mark a (exact) |
| `'a` | jump to mark a (line) |
| `''` | jump back |

### MACROS

| Key | Action |
| --- | --- |
| `qa` | record macro into a |
| `q` | stop recording |
| `@a` | play macro a |
| `@@` | replay last macro |
| `12@a` | play macro 12 times |
| `:norm` | run normal cmd on range |

## REGISTERS

### NAMED REGISTERS

| Key | Action |
| --- | --- |
| `"ayy` | yank line into register a |
| `"ay` | yank motion into register a |
| `"add` | delete line into register a |
| `"ap` | paste from register a |
| `"aP` | paste before from register a |

### SPECIAL

| Key | Action |
| --- | --- |
| `"1p` | paste from numbered register 1 |
| `"+y` | yank to system clipboard |
| `"+p` | paste from system clipboard |
| `:reg` | show all registers |

## PANE NAVIGATION

### SWITCH

| Key | Action |
| --- | --- |
| `Ctrl+Tab` | next pane |
| `Ctrl+W h` | move to left pane |
| `Ctrl+W l` | move to right pane |
| `Ctrl+W j` | move to pane below |
| `Ctrl+W k` | move to pane above |

### SPLIT

| Key | Action |
| --- | --- |
| `:sp` | split horizontal |
| `:vsp` | split vertical |

## EX COMMANDS

### GLOBAL

| Key | Action |
| --- | --- |
| `:g/pattern/d` | delete all matching lines |
| `:v/pattern/d` | delete all non-matching lines |
| `:g/pattern/s/x/y/` | replace in matching lines |
| `:g/pattern/norm cmd` | run normal cmd on matches |

### RANGES

| Key | Action |
| --- | --- |
| `:'<,'>s/x/y/` | replace in visual selection |
| `:1,10s/x/y/` | replace in line range |
| `:.,$s/x/y/` | replace from cursor to end |

## CASE CONVERSION

### TOGGLE / UPPER / LOWER

| Key | Action |
| --- | --- |
| `~` | toggle case of char |
| `g~~` | toggle case of line |
| `gUU` | uppercase line |
| `guu` | lowercase line |
| `gU{motion}` | uppercase motion |
| `gu{motion}` | lowercase motion |

### VISUAL

| Key | Action |
| --- | --- |
| `viwU` | select word, uppercase |
| `viwu` | select word, lowercase |
| `U` | uppercase selection |
| `u` | lowercase selection |

## VISUAL BLOCK

### SELECT

| Key | Action |
| --- | --- |
| `Ctrl+v` | enter visual block mode |
| `V` | select whole line |
| `v` | character visual mode |
| `o` | toggle selection end |

### ACT ON SELECTION

| Key | Action |
| --- | --- |
| `d` | delete selection |
| `y` | yank selection |
| `c` | change selection |
| `I` | insert at block start |
| `A` | append at block end |
| `Ctrl+a` | increment number |
| `Ctrl+x` | decrement number |

## REGEX

### VERY MAGIC

| Key | Action |
| --- | --- |
| `\v` | very magic mode (ERE) |
| `(...)` | capture group |
| `\1 \2` | back-reference |
| `\d{N}` | N digits |
| `\w+` | one or more word chars |
| `.+` | one or more any char |

### CHAR CLASSES

| Key | Action |
| --- | --- |
| `\d` | digit |
| `\w` | word character |
| `\s` | whitespace |
| `\D` | non-digit |
| `[a-z]` | character range |
