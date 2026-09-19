import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import postDefaults from '../src/posts/posts.11tydata.cjs';
const root = path.resolve('dist');
const prefix = process.env.SITE_PATH_PREFIX || '/';
let checked = 0;
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) { await walk(file); continue; }
    if (!e.name.endsWith('.html')) continue;
    const html = await readFile(file, 'utf8');
    if (!html.includes('<html lang="ja">') || !html.includes('<title>')) throw new Error(`Missing metadata: ${file}`);
    for (const [, url] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
      const pathname = url.split(/[?#]/)[0];
      assert.ok(pathname.startsWith(prefix), `Missing deployment prefix: ${file} -> ${url}`);
      const clean = decodeURIComponent('/' + pathname.slice(prefix.length));
      const target = path.join(root, clean, clean.endsWith('/') ? 'index.html' : '');
      await access(target).catch(() => { throw new Error(`Broken local link: ${file} -> ${url}`); });
    }
    checked++;
  }
}
await walk(root);
for (const entry of ['index.html', '404.html', 'contribute/index.html', 'articles/welcome/index.html', '_headers']) await access(path.join(root, entry));
if (checked < 5) throw new Error('Expected homepage, article, guide, topic and 404');
console.log(`Verified ${checked} HTML pages and local links.`);
assert.equal(postDefaults.eleventyComputed.permalink({ draft: true }), false);
assert.equal(postDefaults.eleventyComputed.permalink({ draft: false, page: { fileSlug: 'hello' } }), '/articles/hello/');
assert.equal(postDefaults.eleventyComputed.eleventyExcludeFromCollections({ draft: true }), true);
console.log('Verified draft exclusion and article URL rules.');
