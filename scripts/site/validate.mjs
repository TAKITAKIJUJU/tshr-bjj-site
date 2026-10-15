import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as parse5 from 'parse5';
import {locales,siteBase} from './localize.mjs';
import {faqByLocale} from '../../src/data/site/faq-content.js';
const root=path.resolve(process.argv[2]||'local-assets/production-release');
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
 assert.equal(get(select('meta','name','robots'),'content'),locale==='gunma'?'noindex, follow':'index, follow');
 const alternates=all.filter(n=>n.tagName==='link'&&get(n,'rel')==='alternate'&&get(n,'hreflang'));
 assert.deepEqual(alternates.map(n=>get(n,'hreflang')),locale==='gunma'?[]:['ja','en','pt-BR','x-default']);
 assert.deepEqual(alternates.map(n=>get(n,'href')),locale==='gunma'?[]:['/','/english/','/portugues/','/'].map(url=>'https://tshr-bjj.com'+url));
 assert.equal(select('meta','http-equiv','Content-Security-Policy'),undefined);
 assert.equal(get(select('link','rel','canonical'),'href'),'https://tshr-bjj.com'+base);
 assert.equal(get(select('meta','property','og:site_name'),'content'),['en','pt'].includes(locale)?'Over Limit Honjo':'Over Limit 本庄');
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
  for(const a of n.attrs??[])if(['src','href','poster','data-full-src'].includes(a.name)){
   assert.ok(!a.value.startsWith('/test/'),'Production must not link into /test');
   if(a.value.startsWith('/site/'))assert.ok(fs.existsSync(path.join(root,a.value)),a.value);
  }
  if(n.tagName==='img'&&get(n,'srcset'))for(const candidate of get(n,'srcset').split(',')) {
    const url=candidate.trim().split(/\s+/)[0];
    if(url.startsWith('/site/'))assert.ok(fs.existsSync(path.join(root,url)),url);
  }
 }
 assert.ok(contacts>=5);
 const graph=JSON.parse(text(select('script','type','application/ld+json')))['@graph'];
 assert.equal(graph.find(n=>n['@type']==='WebSite').name,['en','pt'].includes(locale)?'Over Limit Honjo':'Over Limit 本庄');
 assert.equal(graph.find(n=>n['@type']==='WebPage').url,'https://tshr-bjj.com'+base);
 assert.equal(graph.find(n=>n['@type']==='WebPage').inLanguage,locale==='pt'?'pt-BR':locale==='gunma'?'ja':locale);
 assert.equal(graph.find(n=>n['@type']==='WebPage').mainEntity['@id'],'https://tshr-bjj.com/#sportsactivitylocation');
 const video=all.find(n=>n.tagName==='video');
 for(const attr of ['autoplay','muted','playsinline','loop'])assert.notEqual(get(video,attr),undefined);
 const sources=walk(video).filter(n=>n.tagName==='source');
 assert.equal(sources.length,3);
 assert.equal(get(sources[0],'media'),'(max-width: 767px)');
 assert.equal(get(sources[2],'type'),'video/mp4');
 assert.ok(get(all.find(n=>cls(n,'video-toggle')),'data-pause-label'));
 assert.deepEqual(graph.find(n=>n['@type']==='FAQPage').mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),faqByLocale[locale]);
 assert.ok(!JSON.stringify(graph).includes('/test/'));
 assert.equal(all.filter(n=>cls(n,'faq-item')).length,7);
 assert.equal(all.filter(n=>cls(n,'avatar-img')).length,3);
 assert.ok(all.filter(n=>cls(n,'strip-item')).every(n=>!cls(n,'motion-up')));
 report.push({path:base,contacts,faq:7,title:text(all.find(n=>n.tagName==='title'))});
}
const contact=walk(parse5.parse(fs.readFileSync(path.join(root,'contact/index.html'),'utf8')));
assert.equal(contact.filter(n=>n.tagName==='title').length,1);
assert.equal(get(contact.find(n=>n.tagName==='link'&&get(n,'rel')==='canonical'),'href'),'https://tshr-bjj.com/contact/');
assert.ok(contact.some(n=>n.tagName==='dialog'&&get(n,'id')==='mobile-menu'));
const form=contact.find(n=>n.tagName==='form');
assert.equal(get(form,'action'),'https://formsubmit.co/tashas.natura@hotmail.com');
assert.equal(get(form,'method'),'POST');
assert.deepEqual(walk(form).filter(n=>['input','select','textarea'].includes(n.tagName)).map(n=>get(n,'name')),['_honey','_next','_subject','name','email','tel','type','trial_date','class_preference','message']);
for(const node of contact)for(const attr of node.attrs??[]){
 if(['src','href','poster'].includes(attr.name)&&attr.value.startsWith('/site/'))assert.ok(fs.existsSync(path.join(root,attr.value)),attr.value);
}
assert.ok(fs.existsSync(path.join(root,'privacy/index.html')),'Missing privacy page');
assert.ok(fs.existsSync(path.join(root,'thanks/index.html')),'Missing thanks page');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]),['/','/english/','/portugues/','/contact/','/privacy/'].map(url=>'https://tshr-bjj.com'+url));
report.push({path:'/contact/',header:'modern',form:'POST',sitemap:true,privacy:true});
fs.mkdirSync('docs/production',{recursive:true});
fs.writeFileSync('docs/production/validation.json',JSON.stringify(report,null,2));
console.log(report);
