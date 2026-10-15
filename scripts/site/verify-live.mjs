import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as parse5 from 'parse5';
import {locales,siteBase} from './localize.mjs';
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const get=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const report={pages:[],assets:0,contactPublished:false,formMatchesPackage:false,sitemapPublished:false,testContactRetained:false};
for(const locale of locales){
 const base=siteBase(locale),response=await fetch('https://tshr-bjj.com'+base);
 assert.equal(response.status,200);assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'));
 const html=await response.text(),all=walk(parse5.parse(html));
 assert.equal(get(all.find(n=>n.tagName==='meta'&&get(n,'name')==='robots'),'content'),locale==='gunma'?'noindex, follow':'index, follow');
 const alternates=all.filter(n=>n.tagName==='link'&&get(n,'rel')==='alternate'&&get(n,'hreflang'));
 assert.deepEqual(alternates.map(n=>get(n,'hreflang')),locale==='gunma'?[]:['ja','en','pt-BR','x-default']);
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
const root=path.resolve('local-assets/production-release');
await Promise.all(files(root).map(async file=>{
 const relative=path.relative(root,file).replaceAll('\\','/');
 const response=await fetch('https://tshr-bjj.com/'+relative,{method:'HEAD'});
 assert.equal(response.status,200,relative);report.assets++;
}));
const contactResponse=await fetch('https://tshr-bjj.com/contact/');
assert.equal(contactResponse.status,200);
const contact=walk(parse5.parse(await contactResponse.text()));
const packaged=walk(parse5.parse(fs.readFileSync(path.join(root,'contact/index.html'),'utf8')));
assert.equal(contact.filter(n=>n.tagName==='title').length,1);
assert.equal(get(contact.find(n=>n.tagName==='link'&&get(n,'rel')==='canonical'),'href'),'https://tshr-bjj.com/contact/');
assert.ok(contact.some(n=>n.tagName==='dialog'&&get(n,'id')==='mobile-menu'));
const form=contact.find(n=>n.tagName==='form');
assert.equal(get(form,'action'),'https://formsubmit.co/tashas.natura@hotmail.com');
assert.equal(get(form,'method'),'POST');
assert.equal(parse5.serialize(form),parse5.serialize(packaged.find(n=>n.tagName==='form')));
report.contactPublished=true;report.formMatchesPackage=true;
const privacyResponse=await fetch('https://tshr-bjj.com/privacy/');
assert.equal(privacyResponse.status,200);
assert.ok(privacyResponse.headers.get('strict-transport-security'));
report.privacyPublished=true;
const thanksResponse=await fetch('https://tshr-bjj.com/thanks/');
assert.equal(thanksResponse.status,200);
report.thanksPublished=true;
const sitemapResponse=await fetch('https://tshr-bjj.com/sitemap.xml');
assert.equal(sitemapResponse.status,200);
assert.equal(await sitemapResponse.text(),fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'));
report.sitemapPublished=true;
for(const locale of locales){
 const base='/test'+siteBase(locale);
 const response=await fetch('https://tshr-bjj.com'+base+'contact/');
 assert.equal(response.status,200);
 const html=await response.text();assert.ok(html.includes('noindex, nofollow'));assert.ok(html.includes('method="dialog"'));assert.ok(!html.includes('formsubmit.co'));
}
report.testContactRetained=true;
fs.writeFileSync('docs/production/live-verification.json',JSON.stringify(report,null,2));
console.log(report);
