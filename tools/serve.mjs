import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const tooling = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(tooling, '..');
const root = path.resolve(process.argv[2] ?? path.join(repo, 'rendered'));
const port = Number(process.argv[3] ?? 4173);
http.createServer(async (request, response) => {
  const routes = JSON.parse(await fs.readFile(path.join(root, 'manifest.json'), 'utf8'));
  const pathname = new URL(request.url, 'http://localhost').pathname.replace(/\/$/, '') || '/kb';
  const file = routes[pathname] ?? (pathname === '/app.js' ? 'app.js' : null);
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const content = await fs.readFile(path.join(root, file));
    response.writeHead(200, { 'Content-Type': file.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8' });
    response.end(content);
  } catch {
    response.writeHead(500); response.end('Could not render KB page');
  }
}).listen(port, '127.0.0.1', () => console.log(`KB preview: http://127.0.0.1:${port}/kb`));
