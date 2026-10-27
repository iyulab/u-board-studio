# Serving data to a board

A board reads its values through a data source an installation connects to — most often the HTTP
connector, pointed at an API another system already runs. This page is for whoever builds or shapes that
API: what the connector can read, and the form that makes a board easy to build and keeps it honest about
what it shows. Nothing here is specific to one product; a board reads any source the same way.

## What the HTTP connector reads

- **A `GET` that answers JSON.** Another format is shown as not connected, with the reason "the source
  answered in a form that cannot be read". A redirect is not followed.
- **A slow source.** A board waits up to 5 seconds for a read; a slower source is read on in the background, for up
  to 25 seconds, and its answer serves the next refresh. Meanwhile the board shows the last answer — or, the first
  time, "still reading" (reason `pending`). A request that takes over 25 seconds is a failed read.
- **Credentials** a server can hold: none, a bearer token, a header of your choice, a key in the query or
  in the path, or OAuth 2.0 client credentials (RFC 6749 §4.4 — form body or HTTP Basic; the token is
  reused until it expires and requested again once on a `401`).
- **A list anywhere in the answer**, by JSON Pointer (`"list": "/value"`), its **items named by a key field**
  (`"key": "id"` — a part reads `pumps[PR-01]`) so a reordered list still gives the same item, and kept to **the
  items whose fields match** (`"where": { "kind": "PM10" }`), the rows of one kind out of a list of all of them. An
  answer that is one object is read as one item. A table or a chart reads a list whole, as its rows; a part reads the
  fields of one item, each at its own name or where its field says (`"at": "/load/now"`).
- **When the value was observed**, from a field of the item (`time`) or of the answer (`answerTime`), and **how old
  it may normally be** (`fresh`). With both, a board shows each value's age and marks a source that has fallen behind.

A board asks again every 30 seconds while it is open. The server reads the same address once for any
number of open screens within 10 seconds — or, for a read that says how old its value may be, within an
eighth of that age. There is no push: a board is a status display, and polling is how it stays current.

## Values with no source yet: a static source

A data source of type `static` answers what is stored with it, by request path — `answers: { "/equipment": [ … ] }`,
at most 512 KiB written as JSON — the way an HTTP source would answer there. A board reads it as it reads any source
(`from` and `path`, and a list, key or field below it); a query in the path is ignored, and a path it has no answer
at reads as a wrong address. Use it for a reference table that lives nowhere else (equipment and where it stands),
or for example values while the real source is not there yet: with `sample: true`, a board that reads it says
«Example data» under it — in the editor and on a share link. When the live source arrives with the same paths,
changing each data read's `from` to it is all that changes; the example label goes with the static source.

It is made in the console's data sources page (stored answers), through the API (`type: "static"`), or by an
assistant with `create_source` — its answers are not a credential.

## The form that reads well

1. **One stable address per view of the data**, with the window or filter in the query
   (`/usage?window=1h`). A board that reads a few addresses costs the source a few requests, however many
   screens show it.
2. **A time on every answer** — when the values were observed, in ISO 8601 with its offset
   (`"updatedAt": "2026-10-15T14:30:00+09:00"`). Say in your documentation how often it changes; that is
   what a board's author sets as the value's normal age. A source that answers from live data and has no such field
   is not asked to invent one: the server reads when the response says it was made (its `Date` header, and `Age` when
   a cache or proxy in front served an older answer — RFC 9110 §6.6.1, RFC 9111 §4.2.3), so a board still shows the
   value's age and marks a source whose answer is old.
3. **Lists as objects with an identifying field** (`{ "id": "PR-01", ... }`), so a value is picked by what
   it is, not where it is. Time series as rows (`{ "t": ..., "value": ... }`) or as arrays of one length.
4. **States as a closed set of codes** (`ok | degraded | down | unknown`), listed in your documentation.
   The board maps codes to words and colors in its own language; do not send colors or display text.
5. **Numbers as JSON numbers**, with the unit in the field name or the documentation (`latencyP95Ms`).
6. **Figures computed at the source.** A board places and colors values; it does not sum, group or average
   them. Serve the totals, rates and percentiles a view needs.
7. **"No value" distinct from zero, and every field always there** — send `null` when there is no value
   and `0` only for a real zero. A field that disappears from the answer reads as "bound value not found at
   the source": the board takes it for an answer that changed shape, not for an empty value.
8. **Cheap to ask often** — answer from what you already hold. If you limit requests, answer `429`; the
   board shows the source as "rate limited" rather than unreachable.
9. **A read-only credential** for the board's server, scoped to what the views read. Prefer short-lived
   tokens (client credentials) to a key that never expires.
10. **Paths written down where the source is set up.** A data source carries a description (up to 2,000
    characters) its owner writes — the requests it answers and what each holds (`GET /line-1.json — the
    line; its stations under /stations, by "id"`). Whoever binds to it next reads it instead of guessing paths:
    a person in the console, or an assistant through `list_sources`. It is not shown with a shared board.
    A source that publishes a description of itself — an OData service's `$metadata`, an OpenAPI document — can name
    it, so that the written description need not hold what the source already says: a **description document**, a kind
    (`odata` or `openapi`) and a path under the source's base URL (`/$metadata`, `/openapi.json`; the console's «소스가 스스로 내는 설명 문서», `descriptionDocument`
    through the API — never an address of its own). The server reads it with the source's own credential, within the
    addresses the installation allows, and answers from it the paths the source offers, the fields of each with their
    types and key, what it relates to, and the query options it accepts (an OData service's capability restrictions
    included) — a page at a time, for a source of dozens of sets. An assistant reads it with `describe_source`. It is
    for finding what to bind: a board's data reads never go through it, and the written description stays the note
    for a person. An OData `$metadata` is read as XML or as JSON (CSDL JSON; most services answer XML), an OpenAPI
    document as JSON; a document larger than 4 MB is not read; what is read is kept for ten minutes.
11. **Errors as errors** — a refused key, a rejected query or a spent quota answered with `401`, `400` or `429`,
    not with `200`. A source that answers them with `200` and a status in the body can still be read: its data
    source says where that status is (the console's «응답 속 오류 위치», `sourceError` through the API), and its
    reads then fail with what the source said instead of reading as a value missing from the answer.

What a board does with the answer — the reasons it gives when a value is not current, and the types a
custom adapter returns instead of the HTTP connector — is in [`api-reference.md`](https://github.com/iyulab/U-Board/blob/main/docs/api-reference.md)
(`HttpRef`, `ResolvedBinding`, `QualityReason`). Which addresses the server may reach at all is an
installation setting: [`self-hosting.md`](self-hosting.md) (`UBOARD_CONNECTOR_ADDRESSES`).
