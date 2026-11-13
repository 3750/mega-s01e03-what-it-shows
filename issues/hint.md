# booking-v3 date hint contradicts day-first interpretation — 33 classifier-assigned reports

## Coverage and diagnostic status

The **2026-10-04 export** contains **33 unique report IDs assigned to `hint`**, all from the **form** channel: **Alder Physio 12**, **Copper Studio 11**, **Pale Harbour 10**. These are classifier assignments based on tenant locale, form version and channel, not independent diagnoses established from every report body.

Machine-readable coverage: [`evidence/coverage.json`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/evidence/coverage.json), `groups[1]` where `cause == "hint"`; JSON Pointer **`/groups/1/reportIds`** is this issue's complete report-ID coverage. It is disjoint from the 379 parser-assigned reports. The manifest records input hashes and deduplication provenance. Verify with:

```sh
node scripts/verify.mjs
```

Deduplicate overlapping export rows by `id` first. Neither the raw row count nor an intake tag is authoritative coverage. This is a dated export, not a live queue.

## Observed evidence

- [`causes.ts`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/lib/kb/causes.ts) declares `booking-v3`'s displayed hint as **`MM/DD/YYYY`** and describes the form interpreting values in the day-first tenant's order. `causeOf` assigns `hint` only when a known day-first tenant runs booking-v3 and the report channel is `form`.
- [`copper.studio.json`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/lib/data/tenants/copper.studio.json): `es-ES`, `booking-v3`. `R-41230` is a form report describing **6 January becoming 1 June**; it is tagged parser at intake but assigned hint by the tenant/form/channel classifier.
- [`alder.physio.json`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/lib/data/tenants/alder.physio.json): `de-DE`, `booking-v3`. `R-41241` describes **6 August becoming 8 June**.
- [`pale.harbour.json`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/lib/data/tenants/pale.harbour.json): `pt-PT`, `booking-v3`. `R-41251` describes **7 January becoming 1 July**; its repeated export copy is counted only once.
- The 33 IDs were received **2026-04-17 through 2026-09-22**. Intake tagged **18 hint / 15 parser**; neither tag changes the coverage.

## Reproduction to run against the scheduling product

The export includes KB code and reported behavior, **not the running product or production form implementation**. Execute these scenarios against that product and attach results; these are not claims that production was reproduced here.

1. Configure Copper Studio (`es-ES`) with `booking-v3` and open its booking form.
2. Observe the date-field hint. The exported configuration says it displays **`MM/DD/YYYY`**, contrary to the tenant's day-first interpretation.
3. To book **6 January 2026**, follow that displayed hint and enter **`01/06/2026`**.
4. Expected: the displayed format and accepted input agree, and the booking/invite represents **2026-01-06**. Reported failure: day-first interpretation produces **2026-06-01**.
5. Repeat under Alder Physio/de-DE and Pale Harbour/pt-PT. Capture the hint, exact input, submitted value, parsed date, storage and invite output.

## Fix boundary and non-goals

Make the displayed hint, input validation and actual form interpretation agree with the supported tenant convention. If standardizing these tenants on day-first input, show `DD/MM/YYYY` and parse it consistently; reject ambiguous migration cases explicitly rather than silently changing meaning. The fix must include the visible guidance, not just a shared-parser change.

The **same booking-v3 tenant's app and email reports remain parser assignments**. A **booking-v2 form** report can also be parser. These are not this issue merely because subjects match or the channel is form. See [issue #1](https://github.com/3750/mega-s01e03-what-it-shows/issues/1). Unknown tenants or conflicting evidence require investigation, not a forced hint classification.

## Acceptance tests

- [ ] For all three affected tenants, inspect the visible hint and submit an intended January 6 and August 6 using the displayed convention. Verify entry, submitted value, parsed date, storage, displayed booking and invite agree.
- [ ] Include both ambiguous dates and a valid day-greater-than-12 date such as April 23 under the final displayed format. No supported valid date is silently reinterpreted or rejected because hint and parser disagree.
- [ ] Invalid dates, including April 31 and non-leap February 29, produce clear validation instead of normalization or month/day guessing.
- [ ] Verify changing the shared parser alone cannot leave the misleading hint in place. Verify changing only the hint does not conceal a remaining parser defect on app/email paths.
- [ ] Re-run the cause fixtures: Alder form/app with identical subjects stays separate; Copper form/Morrow form stays separate; Pale form/Alder form can share this cause despite different subjects.
- [ ] Booking-v2 form, booking-v3 app/email, supported month-first and unknown-tenant cases remain outside this hint assignment unless new evidence justifies a revised model.
- [ ] `node scripts/verify.mjs` confirms all 33 IDs, disjoint coverage, the three tenant counts, identical repeated copies, unchanged accepted decision 0001, and the rendered review/stamp when present.
- [ ] Keep the five unresolved body exceptions in the parser issue visible; do not count them again here or claim a diagnosed timezone/DST bug.
- [ ] Reconcile new desk evidence by ID, investigate conflicting copies, then update coverage, issue counts, source and rendered KB together.

## KB evidence

Full reports: [`reports-4471.json`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/lib/data/reports-4471.json). Source review: [`4471-review/+page.svx`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/src/routes/kb/incidents/4471-review/+page.svx). Rendered review: [`kb--incidents--4471-review.html`](https://github.com/3750/mega-s01e03-what-it-shows/blob/main/rendered/kb--incidents--4471-review.html). The original rendered table already distinguishes this cause but says it has no ticket of its own; this draft supplies that separate fix boundary without claiming the desk accepted proposed decision 0002.
