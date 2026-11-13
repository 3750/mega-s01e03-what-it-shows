# Browser verification

Checked locally with Playwright on 2026-11-13. Browser checks cover the exported snapshot and the separately attributed engineering update; they are not independent production-fix tests. The course subsequently accepted the challenge on the same date.

- Actual MDsveX/Svelte render of the original incident: 412 reports, parser 379, hint 33, plus the five-report exception footnote.
- Actual render of `/kb/incidents/4471-review`: 412 unique reports from 427 rows, 15 duplicate rows excluded, parser 379, hint 33, 38 intake-tag disagreements.
- Initial author-only frontmatter produced a stamp but was not the course-issued signature. After the course rejection, the issued signature replaced it; the actual component now produces `desk ref DR-9A7K-HH5R`, and verification derives that value from source rather than hardcoding it.
- Initial explorer selection (Alder/form vs Kettle/form, matching subjects): “different causes — keep apart”.
- Changing A's channel to app: “same cause — merge”. This verifies client-side Svelte interaction, not only static output.
- At a 390 px viewport, document width was 390 px and both tables were 358 px: no horizontal page overflow.
- Links from the review to `/kb`, the original incident, accepted decision 0001, and proposed decision 0002 returned HTTP 200.
- The original incident's sole console error was a missing favicon; no component-runtime errors were observed on the review page.
- Accepted decision 0001 is byte-for-byte equal to the ZIP original. SHA-256: `41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9`.

`4471-review.png` is a full-page desktop capture regenerated after course acceptance. It includes GitHub issues #1 and #2, the engineering disposition, and the course-issued signature's rendered stamp. Both issue links and the source-derived stamp were checked again in the rendered page.
