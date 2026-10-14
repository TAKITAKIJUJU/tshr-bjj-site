// Use the existing project configuration with isolated generated output/cache.
// No shared configuration or dependency manifest is changed.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import { build } from 'astro';
import config from '../../astro.config.mjs';
const stamp=Date.now();
const projectRoot=fileURLToPath(new URL('../../',import.meta.url));
const runtime=fs.mkdtempSync(path.join(os.tmpdir(),'over-limit-test-runtime-'));
const output=pathToFileURL(path.join(runtime,'build')+path.sep);
// Prerender modules resolve the project's existing dependencies through this junction.
fs.symlinkSync(path.join(projectRoot,'node_modules'),path.join(runtime,'node_modules'),'junction');
// Astro falls back to cwd/.astro for prerender output outside cwd.
// Keep cwd in the temporary directory so prerender cleanup avoids Dropbox locks.
const originalCwd=process.cwd();
process.chdir(runtime);
try {
await build({
 ...config,
 // /test is entirely static and is deployed by its own static-assets Worker.
 // Avoid the unrelated Cloudflare SSR prerender runtime for this QA build.
 adapter:undefined,
 output:'static',
 configFile:false,
 root:projectRoot,
 outDir:fileURLToPath(output),
 cacheDir:path.join(os.tmpdir(),`over-limit-test-astro-${stamp}`),
 vite:{...config.vite,cacheDir:path.join(os.tmpdir(),`over-limit-test-vite-${stamp}`)}
});
} finally {
 process.chdir(originalCwd);
}
const client=output;
fs.writeFileSync(path.join(projectRoot,'docs/test-review/latest-build-path.txt'),fileURLToPath(client));
console.log('Isolated build complete:',client.href);
