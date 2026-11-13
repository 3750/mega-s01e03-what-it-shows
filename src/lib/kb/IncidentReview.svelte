<script lang="ts">
  import rows from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import issues from '#lib/data/issue-links.json';
  import { causeOf, groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const unique = uniqueById(rows as Report[]);
  const reports = unique.filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(reports, tenantOf);
  const exceptions = reports.filter((r) => notes.oneDayMove.includes(r.id));
  const disagreements = reports.filter((r) => r.meta.intakeTag !== causeOf(r, tenantOf(r)));
  const received = reports.map((r) => r.receivedAt.slice(0, 10)).sort();
  const mergedOnJuly2 = reports.filter((r) => r.mergedAt?.startsWith('2026-07-02'));
  const receivedOnJuly2 = reports.filter((r) => r.receivedAt.startsWith('2026-07-02'));
  const descriptions: Record<string, string> = {
    parser: 'Shared parser reads day-first input month-first',
    hint: 'booking-v3 prints a month-first hint but interprets input day-first',
    unplaced: 'Unplaced: investigate before merging',
  };
</script>

<section aria-label="Recomputed report coverage">
  <p><strong>{reports.length} unique reports</strong> from {rows.length} export rows;
    {rows.length - unique.length} overlapping rows excluded by report ID.
    {#if unique.length !== reports.length}
      {unique.length - reports.length} unique reports for other tickets excluded from this review.
    {/if}
    Received {received[0]} through {received.at(-1)}.</p>
  <table>
    <thead><tr><th>Problem</th><th>Filed reports</th><th>Tenants</th><th>Issue</th></tr></thead>
    <tbody>
      {#each groups as group (group.cause)}
        <tr>
          <td>{descriptions[group.cause]}</td>
          <td>{group.reports.length}</td>
          <td>{group.tenants}</td>
          <td>
            {#if group.cause !== 'unplaced' && issues[group.cause]}
              <a href={issues[group.cause] ?? undefined}>{group.cause} issue</a>
            {:else}
              Not published yet
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p>{disagreements.length} intake tags disagree with the tenant/form/channel classifier.
    Tags and matching subjects are not evidence of a shared root cause.</p>
</section>

<section aria-label="Unresolved report bodies">
  <h2>Unresolved evidence, included in parser coverage</h2>
  <p>{exceptions.length} report bodies do not establish the expected month/day reversal.
    They remain included in the parser-assigned total above, not an additional cause count.
    A tenant lookup cannot diagnose their bodies. Do not mark these resolved by the parser fix without reproducing them.</p>
  <ul>
    {#each exceptions as report (report.id)}
      <li><code>{report.id}</code> — {report.body}</li>
    {/each}
  </ul>
  <p>Investigate original timestamps, timezone offsets, date-only conversion, invite generation,
    and the meaning of “arrived before” separately. The export does not prove that these reports share a timezone or DST bug.</p>
</section>

<section aria-label="Arrival and merge history">
  <h2>A merge spike is not an arrival spike</h2>
  <p>On 2026-07-02, {mergedOnJuly2.length} reports were merged, while
    {receivedOnJuly2.length} reports arrived. Keep receipt and merge timestamps separate;
    the chart does not explain why the older queue waited.</p>
</section>
