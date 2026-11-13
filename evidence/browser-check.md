# Browser verification

Checked locally with Playwright on 2026-11-13. This is a preview of the exported snapshot, not a live-desk check or course acceptance.

- Actual MDsveX/Svelte render of the original incident: 412 reports, parser 379, hint 33, plus the five-report exception footnote.
- Actual render of `/kb/incidents/4471-review`: 412 unique reports from 427 rows, 15 duplicate rows excluded, parser 379, hint 33, 38 intake-tag disagreements.
- Frontmatter and final `RenderStamp` produced `desk ref DR-QEB3-KZXB`; no missing-signature warning.
- Initial explorer selection (Alder/form vs Kettle/form, matching subjects): “different causes — keep apart”.
- Changing A's channel to app: “same cause — merge”. This verifies client-side Svelte interaction, not only static output.
- At a 390 px viewport, document width was 390 px and both tables were 358 px: no horizontal page overflow.
- Links from the review to `/kb`, the original incident, accepted decision 0001, and proposed decision 0002 returned HTTP 200.
- The original incident's sole console error was a missing favicon; no component-runtime errors were observed on the review page.
- Accepted decision 0001 is byte-for-byte equal to the ZIP original. SHA-256: `41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9`.

`4471-review.png` is a full-page desktop capture regenerated after GitHub issues #1 and #2 were published. Both issue links and the source-derived desk stamp were checked again in the rendered page. Course acceptance is a separate check.
