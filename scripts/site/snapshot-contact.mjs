import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const hash=body=>crypto.createHash('sha256').update(body).digest('hex');
const file=process.argv[2] || 'local-assets/production-contact-before.json';
const result={};
const contact=await fetch('https://tshr-bjj.com/contact/');
assert.equal(contact.status,200);
const html=await contact.text();
const urls=['https://tshr-bjj.com/contact/',...new Set([...html.matchAll(/(?:href|src)="(\/_astro\/[^"?#]+)/g)].map(m=>'https://tshr-bjj.com'+m[1]))];
for(const url of urls){const response=await fetch(url);assert.equal(response.status,200);result[url]=hash(Buffer.from(await response.arrayBuffer()));}
result.sourceHash=hash(fs.readFileSync('src/pages/contact.astro'));
result.layoutHash=hash(fs.readFileSync('src/layouts/Layout.astro'));
if(process.argv.includes('--verify'))assert.deepEqual(result,JSON.parse(fs.readFileSync(file,'utf8')),'Existing contact HTML, assets and sources must remain identical.');
else{fs.mkdirSync('local-assets',{recursive:true});fs.writeFileSync(file,JSON.stringify(result,null,2));}
console.log({contactUnchanged:process.argv.includes('--verify'),checked:urls.length,sha256:result[urls[0]]});
