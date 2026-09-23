import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, '..', 'dist');
const ssrAssets = join(root, '..', '.ssr', 'assets');
const ssrFile = (await readdir(ssrAssets)).find((file) => file.startsWith('ssr-') && file.endsWith('.js'));
if (!ssrFile) throw new Error('SSR bundle was not generated');
const domNode = () => ({ getContext: () => ({}), appendChild: () => undefined, setAttribute: () => undefined });
globalThis.document = { createElement: domNode, createTextNode: () => ({}), getElementsByTagName: () => [domNode()], head: domNode(), body: domNode() };
globalThis.window = globalThis;
await import(pathToFileURL(join(ssrAssets, ssrFile)).href);
const { renderRoute, routeMetadata } = globalThis.__handsReadySSR;
const template = await readFile(join(dist, 'index.html'), 'utf8');
const routes = Object.keys(routeMetadata);
const siteUrl = 'https://hr.1994.link';
for (const route of routes) {
  const title = routeMetadata[route].title;
  const description = routeMetadata[route].description;
  const body = renderRoute(route);
  const canonical = new URL(route === '/' ? '/' : route, siteUrl).toString();
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace('<title>Hands Ready</title>', `<title>${title} - Hands Ready</title>\n    <meta name="description" content="${description}">\n    <link rel="canonical" href="${canonical}">`);
  const output = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}
const sitemap = routes.map((route) => `  <url><loc>${new URL(route === '/' ? '/' : route, siteUrl)}</loc></url>`).join('\n');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
process.exit(0);
