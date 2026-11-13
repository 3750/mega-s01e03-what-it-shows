import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only snapshot regression checks. Run from any working directory:
//   node scripts/verify.mjs
//   node scripts/verify.mjs --print-coverage
// Resolve installed repository dependencies normally. During local preparation only,
// S01E03_TOOLS_DIR may name an external package directory containing esbuild.
// No machine-specific path is embedded or required in the published script.
const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
let esbuild;
try {
  esbuild = require('esbuild');
} catch (error) {
  if (!process.env.S01E03_TOOLS_DIR) {
    throw new Error('Install the repository dependencies before verification: esbuild is required.', { cause: error });
  }
  esbuild = createRequire(path.resolve(process.env.S01E03_TOOLS_DIR, 'package.json'))('esbuild');
}

const read = (relative) => readFileSync(path.join(root, relative), 'utf8');
const json = (relative) => JSON.parse(read(relative));
const hash = (relative) => createHash('sha256').update(readFileSync(path.join(root, relative))).digest('hex');
const sorted = (values) => [...values].sort();
const ids = (reports) => sorted(reports.map((report) => report.id));
const countBy = (reports, key) => Object.fromEntries(sorted(new Set(reports.map(key))).map((value) => [value, reports.filter((report) => key(report) === value).length]));

async function compileModule(relative) {
  // Execute the actual exported TypeScript, not a reimplementation of its logic.
  const result = await esbuild.transform(read(relative), {
    loader: 'ts', format: 'esm', target: 'es2022', sourcefile: relative,
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.code).toString('base64')}`);
}

const [causes, { DEDUPE_CASES }, { deskRef }] = await Promise.all([
  compileModule('src/lib/kb/causes.ts'),
  compileModule('src/lib/kb/dedupe-cases.ts'),
  compileModule('src/lib/kb/desk-ref.ts'),
]);
const rows = json('src/lib/data/reports-4471.json');
const notes = json('src/lib/data/desk-notes.json');
const tenantPaths = readdirSync(path.join(root, 'src/lib/data/tenants'))
  .filter((name) => name.endsWith('.json')).sort().map((name) => `src/lib/data/tenants/${name}`);
const tenants = tenantPaths.map(json);
const tenantMap = new Map(tenants.map((tenant) => [tenant.handle, tenant]));
const tenantOf = (report) => tenantMap.get(report.tenant);
assert.equal(tenantMap.size, tenants.length, 'Tenant handles must be unique');
assert.equal(tenants.length, 11, 'Snapshot tenant-directory size changed');
for (const tenant of tenants) {
  assert.equal(causes.dayFirst(tenant.locale), true, `Expected day-first Intl order for ${tenant.locale}`);
}
for (const row of rows) assert.ok(tenantOf(row), `Missing tenant for ${row.id}`);

const firstCopy = new Map();
const repeatedIds = new Set();
for (const row of rows) {
  if (firstCopy.has(row.id)) {
    assert.deepEqual(row, firstCopy.get(row.id), `Conflicting copies of ${row.id}; inspect evidence before overwriting`);
    repeatedIds.add(row.id);
  } else firstCopy.set(row.id, row);
}
const unique = causes.uniqueById(rows);
assert.equal(rows.length, 427, 'Snapshot raw-row count changed');
assert.equal(unique.length, 412, 'Snapshot unique-report count changed');
assert.equal(new Set(unique.map((report) => report.id)).size, unique.length);
assert.deepEqual(ids(unique), sorted(firstCopy.keys()));
assert.equal(rows.length - unique.length, 15);
assert.equal(repeatedIds.size, 15);
// Exercise actual last-copy-wins behavior without mutating exported evidence.
assert.equal(causes.uniqueById([{ id: 'synthetic', revision: 1 }, { id: 'synthetic', revision: 2 }])[0].revision, 2);

const reports = unique.filter((report) => report.mergedInto === 4471);
assert.equal(reports.length, 412);
const groups = causes.groupByCause(reports, tenantOf);
assert.deepEqual(groups.map((group) => [group.cause, group.reports.length]), [['parser', 379], ['hint', 33]]);
assert.equal(causes.ticketCause(groups, 4471), 'parser');
assert.equal(groups.reduce((sum, group) => sum + group.reports.length, 0), reports.length);
const groupedIds = groups.flatMap((group) => ids(group.reports));
assert.equal(new Set(groupedIds).size, reports.length, 'Cause groups overlap');
assert.deepEqual(sorted(groupedIds), ids(reports), 'Cause groups do not cover the snapshot exactly once');
const parser = groups.find((group) => group.cause === 'parser');
const hint = groups.find((group) => group.cause === 'hint');
assert.deepEqual(countBy(parser.reports, (report) => report.channel), { app: 204, email: 150, form: 25 });
assert.deepEqual(countBy(hint.reports, (report) => report.tenant), { 'alder.physio': 12, 'copper.studio': 11, 'pale.harbour': 10 });
assert.ok(hint.reports.every((report) => report.channel === 'form' && tenantOf(report).form === 'booking-v3'));
assert.equal(parser.tenants, 11);
assert.equal(hint.tenants, 3);
assert.deepEqual(countBy(reports, (report) => report.meta.intakeTag), { hint: 41, parser: 371 });
const disagreements = reports.filter((report) => report.meta.intakeTag !== causes.causeOf(report, tenantOf(report)));
assert.equal(disagreements.length, 38);

const expectedUnresolved = ['R-41202', 'R-41209', 'R-41236', 'R-41344', 'R-41620'];
assert.deepEqual(sorted(notes.oneDayMove), expectedUnresolved);
assert.equal(new Set(notes.oneDayMove).size, 5);
const unresolved = reports.filter((report) => notes.oneDayMove.includes(report.id));
assert.deepEqual(ids(unresolved), expectedUnresolved);
assert.ok(unresolved.every((report) => causes.causeOf(report, tenantOf(report)) === 'parser'));
assert.equal(causes.readAs(parser, notes.oneDayMove), 5);
assert.equal(causes.readAs(hint, notes.oneDayMove), 0);
assert.equal(parser.reports.filter((report) => !notes.oneDayMove.includes(report.id)).length, 374);
assert.equal(374 + hint.reports.length + unresolved.length, reports.length);

const fixtureExpectations = [
  ['parser', 'parser', true], ['hint', 'parser', false],
  ['hint', 'parser', false], ['hint', 'hint', true], [null, null, false],
];
assert.equal(DEDUPE_CASES.length, fixtureExpectations.length);
DEDUPE_CASES.forEach((fixture, index) => {
  assert.deepEqual([
    causes.causeOf(fixture.a, tenantOf(fixture.a)),
    causes.causeOf(fixture.b, tenantOf(fixture.b)),
    causes.sameCause(fixture.a, tenantOf(fixture.a), fixture.b, tenantOf(fixture.b)),
  ], fixtureExpectations[index], fixture.why);
});
assert.equal(causes.causeOf({ channel: 'email' }, undefined), null);
assert.equal(causes.causeOf({ channel: 'app' }, { handle: 'synthetic.us', locale: 'en-US', form: 'booking-v2' }), null);
assert.equal(causes.causeOf({ channel: 'form' }, tenantMap.get('morrow.tax')), 'parser');
assert.equal(causes.causeOf({ channel: 'app' }, tenantMap.get('alder.physio')), 'parser');

// Hash extracted independently from the original export ZIP, before any changes.
const acceptedDecision = 'src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx';
const acceptedDecisionSha256 = '41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9';
assert.equal(hash(acceptedDecision), acceptedDecisionSha256, 'Accepted decision 0001 changed; write a successor instead');
assert.equal(sorted(reports.map((report) => report.receivedAt.slice(0, 10))).at(-1), '2026-10-04');
assert.equal(reports.filter((report) => report.mergedAt?.startsWith('2026-07-02')).length, 184);
assert.equal(reports.filter((report) => report.receivedAt.startsWith('2026-07-02')).length, 2);

const provenancePaths = sorted([
  'src/lib/data/reports-4471.json', 'src/lib/data/desk-notes.json',
  'src/lib/kb/causes.ts', 'src/lib/kb/dedupe-cases.ts', ...tenantPaths,
]);
const coverage = {
  schemaVersion: 1,
  ticket: 4471,
  provenance: {
    snapshotDate: '2026-10-04',
    snapshotDateBasis: 'Original export README; latest report receivedAt calendar date',
    originalExportArchive: { filename: 'kb-export-267efc5e.zip', sha256: '267efc5ea61aca6efaaca842160ac4d0377d56bcbf5123e61c604d6ae99597f2' },
    acceptedDecision: { path: acceptedDecision, sha256: acceptedDecisionSha256 },
    sourceSha256: Object.fromEntries(provenancePaths.map((relative) => [relative, hash(relative)])),
    classification: 'Executed src/lib/kb/causes.ts with tenant JSON directory; classifier assignments are not diagnoses of every body',
  },
  deduplication: {
    key: 'id', implementation: 'uniqueById; last copy wins after identical-copy verification',
    inputRowCount: rows.length, uniqueReportCount: unique.length, mergedReportCount: reports.length,
    excludedRepeatedRowCount: rows.length - unique.length, repeatedCopiesIdentical: true,
    repeatedReportIds: sorted(repeatedIds),
  },
  groups: groups.map((group) => ({
    cause: group.cause,
    issueDraft: `issues/${group.cause}.md`,
    reportCount: group.reports.length,
    tenantHandles: sorted(new Set(group.reports.map((report) => report.tenant))),
    firstReceivedDate: group.firstSeen, lastReceivedDate: group.lastSeen,
    reportIds: ids(group.reports),
  })),
  unresolvedSubset: {
    source: 'src/lib/data/desk-notes.json#/oneDayMove',
    classifiedUnder: 'parser', reportCount: unresolved.length, reportIds: ids(unresolved),
    includedInGroupCount: true, additionalCauseCount: false,
    diagnosticStatus: 'Unresolved body-level exceptions; no common timezone or DST cause established',
    parserAssignedRemainderExcludingSubset: parser.reports.length - unresolved.length,
  },
  intakeTagDisagreementCount: disagreements.length,
};
const serializedCoverage = `${JSON.stringify(coverage, null, 2)}\n`;
if (process.argv.includes('--print-coverage')) {
  process.stdout.write(serializedCoverage);
  process.exit(0);
}
assert.equal(read('evidence/coverage.json'), serializedCoverage, 'Coverage differs from deterministic recomputation; inspect changes before regenerating');

// Parse only the known single-line YAML scalar; require a proper YAML parser if
// the frontmatter format changes. The stamp algorithm itself is compiled above.
const reviewSource = read('src/routes/kb/incidents/4471-review/+page.svx');
const frontmatter = reviewSource.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
assert.ok(frontmatter, 'Review frontmatter missing');
const signatureLine = frontmatter.match(/^signature:\s*(.+)$/m)?.[1].trim();
assert.ok(signatureLine, 'Review signature missing');
let signature;
if (signatureLine.startsWith("'") && signatureLine.endsWith("'")) signature = signatureLine.slice(1, -1).replaceAll("''", "'");
else if (signatureLine.startsWith('"') && signatureLine.endsWith('"')) signature = JSON.parse(signatureLine);
else throw new Error('Use a quoted single-line frontmatter signature, or extend verification with a YAML parser');
assert.ok(signature.trim());
assert.match(reviewSource, /<RenderStamp\s+\{signature\}\s*\/>/);
const expectedRef = deskRef(signature);
assert.equal(deskRef(`  ${signature}  `), expectedRef);

const text = (html) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ')
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&#x([\da-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
  .replaceAll('&#39;', "'").replaceAll('&quot;', '"').replace(/\s+/g, ' ').trim();
const renderedPaths = [
  'rendered/kb--incidents--4471-review.html',
  'rendered/kb--incidents--4471-review.interactive.html',
].filter((relative) => existsSync(path.join(root, relative)));
for (const relative of renderedPaths) {
  const html = read(relative);
  const section = html.match(/<section\b[^>]*aria-label="Recomputed report coverage"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, `${relative}: computed coverage section missing`);
  assert.match(text(section), /412 unique reports from 427 export rows; 15 overlapping rows excluded by report ID/);
  const table = section.match(/<table\b[^>]*>([\s\S]*?)<\/table>/)?.[1];
  assert.ok(table, `${relative}: coverage table missing`);
  const tableRows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
    .map((match) => [...match[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/g)].map((cell) => text(cell[1])));
  assert.deepEqual(tableRows[0], ['Problem', 'Filed reports', 'Tenants', 'Issue']);
  assert.equal(tableRows.length, 3, `${relative}: expected exactly two problem rows`);
  assert.deepEqual(tableRows[1].slice(0, 3), ['Shared parser reads day-first input month-first', '379', '11']);
  assert.deepEqual(tableRows[2].slice(0, 3), ['booking-v3 prints a month-first hint but interprets input day-first', '33', '3']);
  assert.ok(tableRows[1][3] && tableRows[2][3], 'Issue cells must not be empty');
  const exceptionSection = html.match(/<section\b[^>]*aria-label="Unresolved report bodies"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(exceptionSection, `${relative}: unresolved-evidence section missing`);
  assert.deepEqual(sorted([...exceptionSection.matchAll(/<code\b[^>]*>(R-\d+)<\/code>/g)].map((match) => match[1])), expectedUnresolved);
  assert.match(text(exceptionSection), /5 report bodies do not establish/);
  const stamps = [...html.matchAll(/<p\b[^>]*class="[^"]*\bstamp\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g)];
  assert.equal(stamps.length, 1, `${relative}: expected one rendered signature stamp`);
  assert.equal(text(stamps[0][1]), `desk ref ${expectedRef}`, `${relative}: stamp does not match actual deskRef(signature)`);
}

console.log('PASS: 427 rows -> 412 unique report IDs -> parser 379 + hint 33.');
console.log('PASS: five unresolved parser-subset IDs; no double counting; fixture, copy-integrity, provenance and immutable-decision checks.');
console.log(renderedPaths.length
  ? `PASS: ${renderedPaths.length} rendered review copies have the expected table, exceptions and source-derived ${expectedRef}.`
  : 'SKIP: no rendered review copies exist; run the renderer and verify again before publication.');
