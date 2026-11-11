# When you change something

Moved verbatim from AGENTS.md (CORE-AGENT-15).

## When you change something

1. **Keep the core pure** — new platform logic goes through a port, not the core.
2. **Content changes** → edit the Markdown source + `npm run build:content`.
3. **Keep the gate green** — `npm run typecheck && npm test` before every commit.
4. **Web styling** → only `styles.css` + the CM6 theme, via `--nv-*` tokens; don't
   touch routing/logic.
5. **Doc sync** — rules change here; reasoning goes to `docs/dev/explanation/`, procedures
   to `docs/dev/how-to/`, facts to `docs/dev/reference/`. One truth, one place (CORE-META-16).
