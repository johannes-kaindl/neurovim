# Explanation — The CIPHER uplink in the web app

> **Diátaxis: Explanation.** Why the web app's connection to a local language model
> is built the way it is, and what the browser measurements behind it showed. The
> player-facing steps are in the manual's
> [How-to → Connect the CIPHER uplink](../../manual/how-to/index.md#connect-the-cipher-uplink);
> the port itself is in [Reference → Ports](../reference/ports.md).

## Where it stands

`WebLlm` implements `LlmPort` over the vendored `code-kit` `llm-stream` (fetch +
SSE). `src/uplink.ts` holds the settings and wiring; `ui/UplinkPanel.tsx` is the
surface in the NEXUS. The port is wired, **the caller is not**: `CipherUplink` needs
a chat surface in the web app, which does not exist yet, so nothing calls
`complete()` today.

## Can a public HTTPS page reach `http://localhost` at all?

The uplink talks to a model server on the player's own machine — LM Studio on
`:1234`, Ollama on `:11434`. The obvious worry is mixed content: an HTTPS page
requesting plain HTTP. It was measured on 2026-08-21 against the live deploy
(`pages.jkaindl.de`, Chrome 151.0.7922.170, fresh profile, both servers).

**Mixed content is not the blocker.** Chrome still treats loopback as trustworthy —
starting it with `--disable-features=LocalNetworkAccessChecks` let every request
through unchanged. What blocks is **Local Network Access** (LNA), in Chrome's own
words: *"blocked by CORS policy: Permission was denied for this request to access the
`loopback` address space"*.

One click on "Allow" clears the **whole** loopback space — ports 1234, 11434 and 8123
and `127.0.0.1` alike, GET and streaming POST (real SSE chunks arrived). The grant
survives a browser restart; Chrome stores it per origin as the `loopback_network`
content setting.

Two traps turned up along the way:

- **The `Access-Control-Allow-Private-Network` response header is dead here.** Two
  control servers, one sending it and one not, behaved identically in every run. A
  server-side header is not the fix.
- **CDP `Browser.grantPermissions` lies to tests.** It flips the Permissions API to
  `granted` *without* satisfying the network check, so an automated test that trusts
  it measures a false negative.

A parallel measurement the same day covered the other engines: **Firefox prompts like
Chrome; Safari has no path at all** — WebKit blocks the request as mixed content with
no prompt to grant, so a Safari player can never reach a local server.

A measurement trap for whoever repeats this: the app under `/neurovim-standalone/`
sends **no** CSP, but the deploy root `pages.jkaindl.de/` does (`default-src 'none'`,
Caddy's generated index page). Measuring against the root reports a CSP block that
does not apply to the app.

## Why every failure gets a browser-specific message

All of those refusals surface identically in page code: `TypeError: Failed to fetch`.
A retry only ever helps one case — a Chromium or Firefox player who has not answered
the prompt yet. So `WebLlm` answers the error with a hint for the browser at hand
(`refusalHint`) instead of retrying blindly.

## Why the uplink is off by default and has no "try again"

The decisive fact is that **an LNA refusal is stored per origin, permanently**. A
permission prompt that appears unasked, on page load, gets dismissed by reflex — and
that one reflex costs the feature for that player forever.

So the uplink connects only after a deliberate press. Four properties follow, each
measured in a real Chrome rather than argued:

- no request leaves before the click (0 requests to the configured host on load);
- the switch stays disabled until endpoint and model are both filled in;
- endpoint and model survive a reload;
- there is **no retry button**. After a refusal the next attempt fails instantly, so a
  retry would only repeat the failure. The hint names the browser's own site settings
  instead — the only place the refusal can be undone.

## Why the settings are device-local

Endpoint and model live in `localStorage` under `neurovim:uplink`, beside the display
preferences — never in `PluginData`. An endpoint address describes this machine's
network, not the player's progress; it has no business travelling in a save file or a
score export.

## Why `/models` is the only probe

Connect fetches the server's model catalogue rather than pinging with a completion.
It is the cheaper round trip, and it cannot fail for the second reason a completion
can — a model the player has not chosen yet. One request answers both questions: is
the server there, and what does it serve.

What the model field shows is decided by `resolveModelChoice` (vendored from
`code-kit`). Its invariant is the point: a `<select>` whose value is missing from its
options silently falls back to the first option, and the next save would write that
foreign value. Three modes come out of it — a dropdown, free text when the server
publishes no catalogue, and `locked` when the server did not answer at all, in which
case the panel offers no model choice and shows only the error.

## Why `normalizeEndpoint` is not used

The kit-first rule says to check `code-kit` before writing anything, and it has a
`normalizeEndpoint`. It is the wrong tool here. It *strips* a trailing `/v1` — correctly
for the `obsidian-kit` clients, which append `/v1` themselves. The vendored
`web/llm-stream` requests `${base}/chat/completions` and appends nothing, so the base
must *carry* `/v1`. `uplink.ts` therefore does the inverse — `baseUrlFrom` appends
`/v1` when the player leaves it out. Same name, opposite direction: a vendored helper
is only right inside its own contract.
