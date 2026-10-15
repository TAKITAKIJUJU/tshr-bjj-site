import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as parse5 from 'parse5';
import {locales,siteBase} from './localize.mjs';
import {faqByLocale} from '../../src/data/site/faq-content.js';
const root=path.resolve(process.argv[2]||'local-assets/production-deploy');
const get=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const cls=(n,c)=>get(n,'class')?.split(/\s+/).includes(c);
const report=[];
for(const locale of locales){
 const base=siteBase(locale),html=fs.readFileSync(path.join(root,base,'index.html'),'utf8'),all=walk(parse5.parse(html));
 const select=(tag,key,value)=>all.find(n=>n.tagName===tag&&get(n,key)===value);
 assert.equal(all.filter(n=>n.tagName==='title').length,1);
 assert.ok(!/テスト版|Test Edition|Test Site|Versão Demonstração|Versão de Teste/.test(text(all.find(n=>n.tagName==='head'))));
 assert.equal(get(select('meta','name','robots'),'content'),'index, follow');
 assert.equal(select('meta','http-equiv','Content-Security-Policy'),undefined);
 assert.equal(get(select('link','rel','canonical'),'href'),'https://tshr-bjj.com'+base);
 assert.equal(get(select('meta','property','og:url'),'content'),'https://tshr-bjj.com'+base);
 assert.equal(all.filter(n=>n.tagName==='form').length,0);
 let contacts=0;
 for(const n of all){
  if(n.tagName==='a'){
   const href=get(n,'href'),language=get(n,'data-language');
   if(language)assert.equal(href,siteBase(language));
   if(href?.includes('contact')){assert.equal(href,'/contact/');contacts++;}
   if(href?.startsWith('/#')&&locale!=='ja')assert.fail('Nonlocalized home anchor '+href);
  }
  for(const a of n.attrs??[])if(['src','href','poster'].includes(a.name)){
   assert.ok(!a.value.startsWith('/test/'),'Production must not link into /test');
   if(a.value.startsWith('/site/'))assert.ok(fs.existsSync(path.join(root,a.value)),a.value);
  }
 }
 assert.ok(contacts>=5);
 const graph=JSON.parse(text(select('script','type','application/ld+json')))['@graph'];
 assert.equal(graph.find(n=>n['@type']==='WebPage').url,'https://tshr-bjj.com'+base);
 assert.deepEqual(graph.find(n=>n['@type']==='FAQPage').mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),faqByLocale[locale]);
 assert.ok(!JSON.stringify(graph).includes('/test/'));
 assert.equal(all.filter(n=>cls(n,'faq-item')).length,7);
 assert.equal(all.filter(n=>cls(n,'avatar-img')).length,3);
 assert.ok(all.filter(n=>cls(n,'strip-item')).every(n=>!cls(n,'motion-up')));
 report.push({path:base,contacts,faq:7,title:text(all.find(n=>n.tagName==='title'))});
}
fs.mkdirSync('docs/production',{recursive:true});
fs.writeFileSync('docs/production/validation.json',JSON.stringify(report,null,2));
console.log(report);
