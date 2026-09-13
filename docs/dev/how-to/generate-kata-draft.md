# How-to — Generate a KATA draft

> **Diátaxis: How-to.** Let a local language model draft a KATA drill with
> `npm run generate:kata`, then promote it by hand. Why the generator is built this way is in
> [Explanation → Decisions](../explanation/decisions.md).

**Prerequisites:**

- `npm install` done (the script transpiles the core with the root devDependency `esbuild`)
- a local OpenAI-compatible server (LM Studio, Ollama, MLX, …) serving an **instruct** model.
  A base model without a chat template echoes the prompt back. Server setup, the `/v1`
  pitfall and mobile access: <https://uplink.jkaindl.de/llm-setup>

## 1 · Pick a category

Only these categories can be generated:

| Category | Corruptions used |
|---|---|
| `navigation` | `corp_word_replace`, `caps_word` |
| `text-objects` | `caps_word`, `corp_word_replace` |
| `operators` | `insert_corp_line`, `tag_append` |
| `editing` | `join_lines`, `tag_append` |
| `fundamentals` | `corp_word_replace`, `insert_corp_line` |

`regex`, `visual-block`, `registers`, `marks-macros` and `ex-commands` are declined with
`unsupported-category` before any request is sent.

## 2 · Run the generator

```bash
npm run generate:kata -- --category operators --difficulty 2 \
  --endpoint http://127.0.0.1:1234/v1 --model <model-id>
```

- `--endpoint` must **include** `/v1`. Default: `$NEUROVIM_LLM_ENDPOINT`, else
  `http://127.0.0.1:1234/v1`.
- Without `--model` (or `$NEUROVIM_LLM_MODEL`) the first model listed by `<endpoint>/models`
  is used.
- Further flags: `--glitches <n>` (default 6), `--theme <text>`, `--tries <n>` (default 3),
  `--timeout <seconds>` (default 180), `--max-tokens <n>` (default 3000). Full table:
  [Reference → Commands](../reference/commands.md#script-flags).

On success the script prints the title, one line per corruption and two paths:

```
packages/content/src/_drafts/KATA-NN-TRANSMISSION-<Title>.md
packages/content/src/_drafts/KATA-NN-SOLUTION-<Title>.md
```

The ID is one above the highest `KATA-NN` in `src/content/KATAS/` and `src/_drafts/`.

## 3 · If it is refused

Each attempt prints `refused — <reason>: <detail>`. If the model returned any text, the last
raw answer is saved to `packages/content/src/_drafts/.last-refusal.txt`.

| Reason | What to try |
|---|---|
| `llm` (`detail` starts with `unavailable`, `timeout` or `failed`) | server reachable? model loaded? raise `--timeout` |
| `unparseable`, `schema` | read `.last-refusal.txt`; try a stronger instruct model |
| `unsupported-category` | pick a category from the table above |
| `skill-mismatch`, `glitch-shape`, `glitch-miss`, `presolved` | run again, or lower `--glitches` |

## 4 · Review the draft

1. Read the transmission: the corruptions must be fixable with the category's skill.
2. Check the frontmatter; it carries `generated_by: MissionGenerator/1` — leave that stamp in.
3. Compare transmission and solution: every difference must be one of the listed corruptions.

## 5 · Promote it to content

Drafts are git-ignored and not read by `build.mjs`; nothing reaches the game until you move it.

1. Move `KATA-NN-TRANSMISSION-<Title>.md` to `packages/content/src/content/KATAS/`.
2. Move `KATA-NN-SOLUTION-<Title>.md` to `packages/content/src/solutions/`.
3. Continue with [Write a mission → Make it unlock](write-a-mission.md#make-it-unlock) and
   [Check it and commit](write-a-mission.md#check-it-and-commit) — the content gates apply
   unchanged.
