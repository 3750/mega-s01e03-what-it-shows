# kb — the support knowledge base

## S01E03 review deliverables

The course accepted this challenge on 2026-11-13. [Saved debrief](https://hq.mega.dev/challenges/what-it-shows#debrief).

- [Parser issue: 379 assigned reports, including five unresolved body exceptions](https://github.com/3750/mega-s01e03-what-it-shows/issues/1).
- [booking-v3 hint issue: 33 assigned reports](https://github.com/3750/mega-s01e03-what-it-shows/issues/2).
- [Signed review source](src/routes/kb/incidents/4471-review/+page.svx).
- [Component-rendered review HTML, including CSS](rendered/kb--incidents--4471-review.html); download and open locally to view it.
- [Browser screenshot](evidence/4471-review.png), [report-ID coverage](evidence/coverage.json), and [browser checks](evidence/browser-check.md).
- [Proposed successor decision 0002](src/routes/kb/decisions/0002-evidence-before-merge/+page.svx); accepted decision 0001 is unchanged.
- [Reproducible build, tests, and interactive preview](BUILD.md).

This review covers the export dated 2026-10-04, not a live queue. The two issue groups
reconcile to 412 unique report IDs; the five unresolved exceptions are already included
in parser coverage, not five additional reports or a confirmed third cause.

The course's later engineering update reports #4471 closed on 2026-10-05: parser fixed;
booking-v3 hint will not be fixed because that form was retired. Our issues are closed
with the corresponding completed/not-planned reasons. This is reported disposition,
not an independently verified production fix or a diagnosis of the five body exceptions.

## Original export context

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
