import Eleventy from '@11ty/eleventy';
import { rm, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Only remove this project's generated output, never a supplied path or source.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root)) throw new Error('Unexpected output path');
const stat = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; });
if (stat?.isSymbolicLink()) throw new Error('Refusing to clean a linked output directory');
await rm(output, { recursive: true, force: true });
process.chdir(root);
await new Eleventy('src', 'dist').write();
