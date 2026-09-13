# How-to — Vendor the core into a consumer

> **Diátaxis: How-to.** Build a new NeuroVim target on this repo's core, keep the copy
> verifiable, and move a capability up from a consumer. The rules behind it are in
> [Explanation → Upstream contract](../explanation/upstream-contract.md).

- [Vendor the core into a new consumer](#vendor-the-core-into-a-new-consumer)
- [Register the consumer with the contract gate](#register-the-consumer-with-the-contract-gate)
- [Declare a provenance header](#declare-a-provenance-header)
- [Check the consumers](#check-the-consumers)
- [Move a capability up into the core](#move-a-capability-up-into-the-core)

---

## Vendor the core into a new consumer

The vendor surface is `packages/core/src` and `packages/content/src`.

1. In this repo, pick the commit to pin: `git rev-parse HEAD` (and the tag, if it is a
   release).
2. In the consumer repo, copy the parts you need under `src/vendor/neurovim/`. The existing
   consumer `vim-dojo` copies:

   | Source (this repo) | Copy (consumer) |
   |---|---|
   | `packages/core/src/` | `src/vendor/neurovim/core/` |
   | `packages/content/src/generated/` | `src/vendor/neurovim/content/generated/` |
   | `packages/content/src/index.ts` | `src/vendor/neurovim/content/index.ts` |
   | `packages/content/src/frontmatter.ts` | `src/vendor/neurovim/content/frontmatter.ts` |

3. Next to the copy, write `src/vendor/neurovim/VENDOR.json`:

   ```json
   {
     "source": "https://git.jkaindl.de/jkaindl/NeuroVIM",
     "tag": "v0.2.6",
     "sha": "<full commit sha>",
     "version": "0.2.6"
   }
   ```

   `sha` is required — the gate refuses a `VENDOR.json` without it. `tag` and `version` are
   optional and only shown in `CONSUMERS.md`.
4. Carry the `react`/`react-dom` → `preact/compat` alias into the consumer's build and test
   configs.
5. **Never edit the copy.** Change the source here, commit, and copy again from the new pin.

## Register the consumer with the contract gate

1. Add an entry to `consumers.json` in this repo:

   ```json
   {
     "name": "my-consumer",
     "what": "one-line description",
     "path": "../my-consumer",
     "vendorJson": "src/vendor/neurovim/VENDOR.json",
     "dirs":  [["packages/core/src", "src/vendor/neurovim/core"]],
     "files": [["packages/content/src/index.ts", "src/vendor/neurovim/content/index.ts"]]
   }
   ```

   - `path` is relative to this repo's root; a consumer not found there is **skipped**, not
     failed.
   - `dirs` compares whole trees (missing, extra and changed files all count); `files`
     compares single files. Each pair is `[source in this repo, copy in the consumer]`.
2. `npm run check:consumers` — writes `CONSUMERS.md`.
3. Commit `consumers.json` and `CONSUMERS.md`.

## Declare a provenance header

Only if the consumer's sync script stamps every copied file with an origin line.

1. Add to the consumer's entry in `consumers.json`:

   ```json
   "provenanceHeader": { "lines": 1, "mustMatch": "^// vendored from neurovim-standalone@" }
   ```

   Both keys are required. `mustMatch` is a regular expression tested against each of the
   first `lines` lines.
2. Make sure **every** copied file carries the stamp — one unstamped file is reported as a
   broken header.
3. `npm run check:consumers`.

## Check the consumers

1. Check out the consumer repos at their `path` from `consumers.json`.
2. Run `npm test` (reports only) or `npm run check:consumers` (also rewrites `CONSUMERS.md`).
3. Read the status per consumer:

   | Status | Meaning | Exit code |
   |---|---|---|
   | ✅ `ok` | pin is current, copy verbatim | 0 |
   | 🟡 `stale` | commits to the surface since the pin; copy verbatim at the pin | 0 |
   | ❌ `violated` | copy differs from its pin, or a declared header is broken | **1** |
   | ⚪ `skipped` | consumer not on disk, or its pin is not reachable in this clone | 0 |

4. On `violated`: find the edited file named in the message, move the change into this repo,
   and have the consumer re-vendor. Do not "fix" the copy in place.

## Move a capability up into the core

For a capability that started in a consumer and belongs in the core.

1. Here: implement it platform-neutrally in `packages/core/src`, test first.
2. Here: `npm run typecheck && npm test`, commit to `main`.
3. In the consumer: re-vendor from the new commit and update the pin (in `vim-dojo`:
   `npm run vendor`).
4. In the consumer: replace the local implementation with the core call, delete the old file,
   run its tests.
5. Cross-check: behaviour unchanged, and the total test count has risen rather than merely
   shifted between repos.
