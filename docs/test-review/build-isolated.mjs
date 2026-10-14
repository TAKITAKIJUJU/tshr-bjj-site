// Use the existing project configuration with isolated generated output/cache.
// No shared configuration or dependency manifest is changed.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import { build } from 'astro';
import config from '../../astro.config.mjs';
const stamp=Date.now();
const output=pathToFileURL(path.join(os.tmpdir(),`over-limit-test-build-${stamp}`)+path.sep);
await build({
 ...config,
 // /test is entirely static and is deployed by its own static-assets Worker.
 // Avoid the unrelated Cloudflare SSR prerender runtime for this QA build.
 adapter:undefined,
 output:'static',
 configFile:false,
 root:fileURLToPath(new URL('../../',import.meta.url)),
 outDir:fileURLToPath(output),
 cacheDir:path.join(os.tmpdir(),`over-limit-test-astro-${stamp}`),
 vite:{...config.vite,cacheDir:path.join(os.tmpdir(),`over-limit-test-vite-${stamp}`)}
});
const client=output;
fs.writeFileSync('docs/test-review/latest-build-path.txt',fileURLToPath(client));
console.log('Isolated build complete:',client.href);
