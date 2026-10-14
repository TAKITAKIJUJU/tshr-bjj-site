import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='https://tshr-bjj.com';
const report={pages:[],assets:[],scriptSources:[]};
for(const pathname of ['/test/','/test/contact/']){
 const response=await fetch(base+pathname);
 const html=await response.text();
 assert.equal(response.status,200);
 assert.match(response.headers.get('x-robots-tag'),/noindex/);
 assert.match(response.headers.get('content-security-policy'),/form-action 'none'/);
 assert.equal([...html.matchAll(/<title>/g)].length,1);
 assert.match(html,/name="robots" content="noindex, nofollow"/);
 assert.ok(!html.includes('formsubmit.co'));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 report.pages.push({path:pathname,status:response.status,title:html.match(/<title>(.*?)<\/title>/)[1],noindex:response.headers.get('x-robots-tag'),csp:response.headers.get('content-security-policy'),types:schema['@graph'].map(e=>e['@type']),bytes:Buffer.byteLength(html)});
 report.scriptSources.push(...[...html.matchAll(/<script[^>]*\bsrc="([^\"]+)"/g)].map(m=>m[1]));
}
const manifest=JSON.parse(fs.readFileSync('docs/test-review/deploy-manifest.json','utf8'));
for(const file of manifest.files){
 const response=await fetch(base+'/'+file.path,{method:'HEAD'});
 assert.equal(response.status,200,file.path);
 report.assets.push({path:file.path,status:response.status});
}
const bare=await fetch(base+'/test',{redirect:'manual'});
report.barePath={status:bare.status,location:bare.headers.get('location')};
assert.equal(bare.status,308);
report.checkedAt=new Date().toISOString();
fs.writeFileSync('docs/test-review/live-test-verification.json',JSON.stringify(report,null,2));
console.log({pages:report.pages,assetCount:report.assets.length,scriptSources:report.scriptSources,barePath:report.barePath});
