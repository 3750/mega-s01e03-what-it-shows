import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build, transform } from 'esbuild';
import { compile, preprocess } from 'svelte/compiler';
import { mdsvex } from 'mdsvex';

const tooling = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] ?? path.join(tooling, '..'));
const outdir = path.join(root, 'rendered');
const styles = new Map();
const files = (await fs.readdir(path.join(root, 'src/routes'), { recursive: true }))
  .filter((name) => name.endsWith('+page.svx')).sort();
const entries = files.map((name, index) => ({
  name: `Page${index}`,
  filename: path.join(root, 'src/routes', name),
  route: `/${path.dirname(name)}`,
}));
const markdown = mdsvex({
  extensions: ['.svx'],
  layout: { runbook: path.join(root, 'src/lib/layouts/runbook.svelte') },
});

function components(generate) {
  return {
    name: `kb-svelte-${generate}`,
    setup(builder) {
      builder.onResolve({ filter: /^#lib\// }, async (args) => {
        const base = path.join(root, 'src/lib', args.path.slice('#lib/'.length));
        for (const suffix of ['', '.ts', '.js', '.json']) {
          try { await fs.access(base + suffix); return { path: base + suffix }; } catch {}
        }
        throw new Error(`Missing KB import: ${args.path}`);
      });
      builder.onLoad({ filter: /\.ts$/ }, async ({ path: filename }) => {
        let source = await fs.readFile(filename, 'utf8');
        if (source.includes('import.meta.glob')) {
          const directory = path.join(root, 'src/lib/data/tenants');
          const tenants = (await fs.readdir(directory)).filter((name) => name.endsWith('.json')).sort();
          const imports = tenants.map((name, i) =>
            `import Tenant${i} from ${JSON.stringify(path.join(directory, name))};`).join('\n');
          const values = tenants.map((name, i) =>
            `${JSON.stringify('/src/lib/data/tenants/' + name)}: Tenant${i}`).join(',');
          source = imports + '\n' + source.replace(/import\.meta\.glob<Tenant>\([^)]*\)/, `{${values}}`);
        }
        return { contents: source, loader: 'ts', resolveDir: path.dirname(filename) };
      });
      builder.onLoad({ filter: /\.(svelte|svx)$/ }, async ({ path: filename }) => {
        let source = await fs.readFile(filename, 'utf8');
        if (source.includes('import.meta.glob')) {
          const nested = entries.filter((entry) => entry.route !== '/kb');
          const imports = nested.map((entry, i) =>
            `import * as Glob${i} from ${JSON.stringify(entry.filename)};`).join('\n');
          const values = nested.map((entry, i) =>
            `${JSON.stringify('/src/routes/' + path.relative(path.join(root, 'src/routes'), entry.filename))}: Glob${i}`).join(',');
          source = source.replace('<script lang="ts">', `<script lang="ts">\n${imports}`)
            .replace(/^\s*const pages = import\.meta\.glob.*$/m, `const pages = {${values}};`);
        }
        const processed = await preprocess(source, [
          ...(filename.endsWith('.svx') ? [markdown] : []),
          { script: async ({ content, attributes }) => attributes.lang === 'ts'
            ? { code: (await transform(content, { loader: 'ts', target: 'es2022', tsconfigRaw: { compilerOptions: { verbatimModuleSyntax: true } } })).code }
            : undefined },
        ], { filename });
        const result = compile(processed.code, {
          filename,
          generate,
          css: generate === 'client' ? 'injected' : 'external',
          dev: false,
        });
        if (generate === 'server' && result.css?.code) styles.set(filename, result.css.code);
        return { contents: result.js.code, loader: 'js', resolveDir: path.dirname(filename) };
      });
    },
  };
}

await fs.mkdir(outdir, { recursive: true });
const imports = entries.map((entry) => `import ${entry.name} from ${JSON.stringify(entry.filename)};`).join('\n');
const routes = entries.map((entry) => `${JSON.stringify(entry.route)}: ${entry.name}`).join(',\n');
const common = {
  bundle: true,
  absWorkingDir: root,
  nodePaths: [path.join(root, 'node_modules')],
  logLevel: 'warning',
};
await build({
  ...common,
  stdin: { contents: `import { render } from 'svelte/server';\n${imports}\nexport const pages = {${routes}};\nexport const renderPage = (route) => render(pages[route]);`, resolveDir: root },
  platform: 'node', format: 'esm', outfile: path.join(outdir, 'pages.mjs'),
  conditions: ['svelte', 'node'], plugins: [components('server')],
  external: ['node:*'],
});
await build({
  ...common,
  stdin: {
    contents: `import { mount } from 'svelte';\n${imports}\nconst pages = {${routes}};\nconst Page = pages[location.pathname.replace(/\\/$/, '')];\nif (Page) mount(Page, {target: document.getElementById('app')});`,
    resolveDir: root,
  },
  platform: 'browser', format: 'esm', outfile: path.join(outdir, 'app.js'),
  conditions: ['svelte', 'browser'], plugins: [components('client')],
});
const { pages, renderPage } = await import(pathToFileURL(path.join(outdir, 'pages.mjs')));
const manifest = {};
const style = `<style>${[...styles.values()].join('\n')}</style>`;
for (const route of Object.keys(pages)) {
  const result = renderPage(route);
  const document = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${result.head}${style}</head><body><div id="app"></div><script type="module" src="/app.js"></script><noscript>${result.body}</noscript></body></html>`;
  const staticDocument = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${result.head}${style}</head><body>${result.body}</body></html>`;
  const slug = route.replace(/^\//, '').replaceAll('/', '--');
  await fs.writeFile(path.join(outdir, `${slug}.html`), staticDocument);
  await fs.writeFile(path.join(outdir, `${slug}.interactive.html`), document);
  manifest[route] = `${slug}.interactive.html`;
}
await fs.writeFile(path.join(outdir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Rendered ${entries.length} KB pages into ${outdir}`);
