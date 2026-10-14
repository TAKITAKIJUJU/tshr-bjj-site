import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const walk = p => fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const files=[...walk('src'),...walk('public'),'package.json','package-lock.json','astro.config.mjs','wrangler.jsonc','tsconfig.json'];
const hashes=Object.fromEntries(files.map(p=>[p.replaceAll('\\','/'),crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
fs.mkdirSync('docs/test-review',{recursive:true});
fs.writeFileSync('docs/test-review/production-before.json',JSON.stringify(hashes,null,2));
if(fs.existsSync('src/pages/test')) throw Error('Existing test directory: inspect before copying');
function copy(from,to){fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);}
for(const f of ['Header','Hero','Footer']) copy(`src/components/${f}.astro`,`src/components/test/${f}.astro`);
fs.cpSync('src/components/v2','src/components/test/v2',{recursive:true});
copy('src/styles/global.css','src/styles/test.css');
copy('src/layouts/Layout.astro','src/layouts/TestLayout.astro');
for(const f of ['index','contact']) copy(`src/pages/${f}.astro`,`src/pages/test/${f}.astro`);
for(const p of [...walk('src/components/test'),...walk('src/pages/test'),'src/layouts/TestLayout.astro']) {
 let s=fs.readFileSync(p,'utf8').replaceAll('href="/#','href="/test/#').replaceAll('href="/contact"','href="/test/contact/"');
 if(p.includes('pages'))s=s.replaceAll("'../layouts/Layout.astro'","'../../layouts/TestLayout.astro'").replaceAll("'../components/","'../../components/test/");
 if(p.includes('TestLayout')) s=s.replace("'../components/Header.astro'","'../components/test/Header.astro'").replace("'../styles/global.css'","'../styles/test.css'").replace('noindex = false','noindex = true').replace('<meta charset="UTF-8" />','<meta charset="UTF-8" /><meta http-equiv="Content-Security-Policy" content="form-action \'none\'" />');
 if(p.includes('pages')&&p.endsWith('contact.astro'))s=s.replace(/action="https:\/\/formsubmit[^\"]+" method="POST"/,'action="/test/contact/" method="dialog"').replace('type="submit"','type="button"');
 fs.writeFileSync(p,s);
}
fs.cpSync('src/pages/test','docs/test-review/baseline/pages',{recursive:true});
fs.cpSync('src/components/test','docs/test-review/baseline/components',{recursive:true});
copy('src/layouts/TestLayout.astro','docs/test-review/baseline/TestLayout.astro');
copy('src/styles/test.css','docs/test-review/baseline/test.css');
console.log(`Recorded ${files.length} existing files; isolated baseline created.`);
