import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import * as parse5 from 'parse5';
import {locales,siteBase} from './localize.mjs';
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const get=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const report={pages:[],assets:0,contactUnchanged:false,testContactRetained:false};
for(const locale of locales){
 const base=siteBase(locale),response=await fetch('https://tshr-bjj.com'+base);
 assert.equal(response.status,200);assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'));
 const html=await response.text(),all=walk(parse5.parse(html));
 assert.equal(get(all.find(n=>n.tagName==='meta'&&get(n,'name')==='robots'),'content'),'index, follow');
 assert.equal(get(all.find(n=>n.tagName==='link'&&get(n,'rel')==='canonical'),'href'),'https://tshr-bjj.com'+base);
 assert.equal(all.filter(n=>n.tagName==='title').length,1);
 const contacts=all.filter(n=>n.tagName==='a'&&get(n,'href')?.includes('contact'));
 assert.ok(contacts.length>=5);assert.ok(contacts.every(n=>get(n,'href')==='/contact/'));
 report.pages.push({path:base,status:response.status,contactLinks:contacts.length});
 if(locale!=='ja'){
  const redirect=await fetch('https://tshr-bjj.com'+base+'contact/',{redirect:'manual'});
  assert.equal(redirect.status,308);assert.equal(new URL(redirect.headers.get('location')).pathname,'/contact/');
 }
}
const files=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(p,e.name)):[path.join(p,e.name)]);
const root=path.resolve('local-assets/production-deploy');
await Promise.all(files(root).map(async file=>{
 const relative=path.relative(root,file).replaceAll('\\','/');
 const response=await fetch('https://tshr-bjj.com/'+relative,{method:'HEAD'});
 assert.equal(response.status,200,relative);report.assets++;
}));
const baseline=JSON.parse(fs.readFileSync('local-assets/production-contact-before.json','utf8'));
for(const [url,expected] of Object.entries(baseline)){
 if(!url.startsWith('https://'))continue;
 const response=await fetch(url);assert.equal(response.status,200);
 assert.equal(crypto.createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex'),expected,url);
}
report.contactUnchanged=true;
for(const locale of locales){
 const base='/test'+siteBase(locale);
 const response=await fetch('https://tshr-bjj.com'+base+'contact/');
 assert.equal(response.status,200);
 const html=await response.text();assert.ok(html.includes('noindex, nofollow'));assert.ok(html.includes('method="dialog"'));assert.ok(!html.includes('formsubmit.co'));
}
report.testContactRetained=true;
fs.writeFileSync('docs/production/live-verification.json',JSON.stringify(report,null,2));
console.log(report);
