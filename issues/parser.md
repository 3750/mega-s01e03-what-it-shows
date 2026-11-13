# Shared parser reads day-first dates month-first — 379 classifier-assigned reports

## Coverage and diagnostic status

The **2026-10-04 export** contains **379 unique report IDs assigned to `parser`**, across **11 tenants**: app **204**, email **150**, booking-v2 form **25**. These are filed/assigned reports, **not 379 independently reproduced diagnoses**.

Machine-readable coverage: [`../evidence/coverage.json`](../evidence/coverage.json), `groups[0]` where `cause == "parser"`; JSON Pointer **`/groups/0/reportIds`** is this issue's complete report-ID coverage. The two cause groups are disjoint and reconcile to 412 unique IDs. The manifest records input hashes and the original export's SHA-256. Verify with:

```sh
node scripts/verify.mjs
```

Fifteen overlapping export rows are excluded by ID before classification. Do not count raw rows, subject matches, or intake tags as reports or diagnoses. This snapshot is not the live desk queue.

## Observed evidence

- [`R-41200` in the report export](../src/lib/data/reports-4471.json): Harbour Dental, `en-GB`, `app`; body describes **7 April becoming 4 July**. Expected calendar date is April 7; observed invite date is July 4.
- `R-41203`: Lantern Row, `cs-CZ`, `app`; **2 December becomes 12 February**.
- `R-41239`: Kettle Books, `nl-NL`, `form` on `booking-v2`; **8 November becomes 11 August**. Thus form channel alone does not identify the other bug.
- The actual classifier and mechanism are in [`causes.ts`](../src/lib/kb/causes.ts), especially `dayFirst` and `causeOf`. Tenant locale and form come from [`src/lib/data/tenants/`](../src/lib/data/tenants/), not the reporter's browser locale.
- Unique parser-group reports were received **2026-04-01 through 2026-10-04**. Their intake tags are parser **356**, hint **23**; the latter must not be discarded.

## Reproduction to run against the scheduling product

The export contains reports and KB classification logic, **not the production booking/parser implementation**. The following is a concrete regression scenario to execute when that product is available, not a claim that production was run here.

1. Configure a known day-first tenant, such as Harbour Dental (`en-GB`). Use its app date-entry path, not a booking-v3 form.
2. Enter **`07/04/2026`**, intending **7 April 2026**, and create the booking/invite.
3. Inspect the displayed booking date, persisted calendar-date value, and invite date in the tenant's intended calendar-date semantics.
4. Expected: **2026-04-07** throughout. Reported failure: month-first parsing produces **2026-07-04**.
5. Repeat via email intake and a booking-v2 form; use distinct report IDs and record the actual path, payload, locale and outputs. Do not assume this app reproduction proves every channel's implementation.

## Fix boundary

Make accepted input and parsing agree with the tenant's supported date convention, validate impossible dates rather than silently normalizing them, and preserve the intended date through storage and invite generation. Do not change only browser-locale detection or intake tags. This issue does **not** cover the **33 booking-v3 hint assignments** in [`hint.md`](hint.md), whose displayed hint and actual interpretation need their own correction and verification.

## Unresolved evidence already included in the 379

[`coverage.json#/unresolvedSubset`](../evidence/coverage.json) and [`desk-notes.json`](../src/lib/data/desk-notes.json) identify these **five included IDs**:

| ID | Body-level conflict requiring investigation |
|---|---|
| R-41202 | Invite Tuesday 12 May versus calendar Monday 11 May |
| R-41209 | June bookings one day off |
| R-41236 | Invite reportedly arrived before booking |
| R-41344 | Same meeting Tuesday in Lisbon, Monday in Toronto |
| R-41620 | Tuesday 6 October showed as Monday |

The tenant/channel classifier assigns them to parser without reading their bodies. **No common timezone or DST cause is established.** Obtain original input, booking/invite timestamps, offsets, recipient display context, and the meaning of “arrived before”; reproduce or reassign each individually. The remaining parser-assigned subset has **374 IDs**, but that is not a claim of 374 confirmed diagnoses either. Never add these five to the 379 and double-count them.

## Acceptance tests

- [ ] Run product-level ambiguous-date regressions for `07/04/2026` and `02/12/2026` in day-first tenants; intended dates survive entry, storage, booking display and invite generation.
- [ ] Cover app, email and booking-v2 form paths, including a booking-v3 tenant's app/email paths. Record actual results, not just classifier outputs.
- [ ] Test a valid unambiguous day-first date such as `23/04/2026`; reject invalid dates such as `31/04/2026` and non-leap `29/02/2026` with clear validation, without silent rollover.
- [ ] Verify supported month-first tenants still work under their documented convention; unknown locale/tenant evidence is not automatically diagnosed or merged.
- [ ] Resolve or explicitly retain open each of the five body exceptions, with ID-linked evidence; do not close them merely because the shared parser fix passes.
- [ ] Keep booking-v3 hint behavior under its separate issue and run its cross-boundary tests before closing either fix.
- [ ] `node scripts/verify.mjs` passes: snapshot counts, all report-ID coverage, repeated-copy identity, cause fixtures, unchanged accepted decision 0001, and the rendered review/stamp when present.
- [ ] Update source data, coverage, issue counts and the rendered KB together when fresh desk evidence arrives. Investigate changed copies before deduplication; this snapshot test should fail on unexplained drift.

## KB and policy context

Source review: [`4471-review/+page.svx`](../src/routes/kb/incidents/4471-review/+page.svx). Rendered review: [`kb--incidents--4471-review.html`](../rendered/kb--incidents--4471-review.html). The original incident's “one issue” prose conflicts with its computed two-cause table. Decision 0001 remains immutable; proposed successor 0002 is **not claimed to be desk-approved**.
