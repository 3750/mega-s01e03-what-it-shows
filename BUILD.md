# Build and preview

This exported knowledge base uses a small, pinned Svelte 5 / MDsveX toolchain. From the repository root:

```sh
npm ci
npm run build
npm test
npm run preview
```

Then open <http://127.0.0.1:4173/kb>. The preview server binds to localhost. The build writes into `rendered/`; do not run it when another process is updating those snapshots.

`npm test` checks snapshot coverage, duplicate-copy integrity, classifier fixtures, the unchanged accepted decision, and the source-derived signature in both rendered review copies. Snapshot assertions intentionally fail when the evidence changes; inspect fresh data before updating the manifest or its expected counts.

## What the renderer does

- Discovers `+page.svx` files under `src/routes`, preprocesses them with MDsveX and the shared `runbook.svelte` layout, then compiles Svelte 5 components for server rendering and for the browser.
- Resolves `#lib/…` against `src/lib` (trying the bare path, `.ts`, `.js`, and `.json`) to preserve the KB's root alias.
- Replaces the tenant-data `import.meta.glob<Tenant>(…)` with sorted imports of `src/lib/data/tenants/*.json`, preserving the `/src/lib/data/tenants/<file>` keys. It also expands the route-page `import.meta.glob(…)` to the discovered nested `.svx` pages, preserving the `/src/routes/<relative page>` keys.
- Transforms TypeScript in Svelte scripts with esbuild, targeting ES2022 and retaining verbatim module syntax. The page/component code is otherwise compiled through Svelte, so metadata in frontmatter/head and locale-aware `Intl` formatting continue to run through the same SSR and client-component paths.
- Emits standalone static HTML (`<route>.html`) containing the SSR body, metadata, and compiled CSS, with no JavaScript bundle reference. It also emits interactive HTML (`<route>.interactive.html`) with the same SSR metadata/CSS, an app mount point, and `/app.js`; the browser bundle mounts the Svelte page. `rendered/manifest.json` maps routes to interactive documents, and the preview server serves those routes plus the client bundle.

The dependency versions are exact in `package.json` and `package-lock.json`. `node_modules/` is local and ignored; remove it to discard the installed dependencies.
