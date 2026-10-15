import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(process.argv[2]||'dist/client');
const checks=[];
for(const page of ['test/index.html','test/contact/index.html']){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 const title=[...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
 assert.equal(title.length,1);
 assert.match(html,/name="robots" content="noindex, nofollow"/);
 assert.match(html,/form-action &#39;none&#39;|form-action 'none'/);
 assert.ok(!html.includes('formsubmit.co'));
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 const home=page==='test/index.html';
 assert.equal(graph.filter(x=>x['@type']==='FAQPage').length,home?1:0);
 assert.ok(graph.some(x=>x['@type']===(home?'WebPage':'ContactPage')&&x.url==='https://tshr-bjj.com/'+(home?'test/':'test/contact/')));
 const broken=[];
 for(const m of html.matchAll(/(?:href|src|poster)="(\/[^\"]+)"/g)){
  const url=new URL(m[1],'http://local');
  let file=path.join(root,decodeURIComponent(url.pathname));
  if(!fs.existsSync(file))broken.push(url.pathname);
 }
 assert.deepEqual(broken,[]);
 if(home){
  const faqs=graph.find(x=>x['@type']==='FAQPage').mainEntity;
  assert.equal(faqs.length,7);
  for(const faq of faqs){assert.ok(html.includes(faq.name));assert.ok(html.includes(faq.acceptedAnswer.text));}
 }else{
  assert.match(html,/method="dialog"/);assert.match(html,/id="mock-submit" type="button"/);assert.match(html,/id="mock-submit"[^>]*disabled/);
 }
 checks.push({page,title:title[0][1],faqCount:graph.find(x=>x['@type']==='FAQPage')?.mainEntity.length??0,brokenLocalReferences:broken});
}
const files=['src/pages/test/index.astro','src/pages/test/contact.astro','src/layouts/TestLayout.astro'];
for(const file of files){const s=fs.readFileSync(file,'utf8');assert.ok(!/from ['"][^'"]*(?:components\/(?!test)|\/Layout\.astro|global\.css)/.test(s));}
assert.ok(!fs.readFileSync('public/sitemap.xml','utf8').includes('/test'));
const luminance=hex=>{
 const c=hex.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return c[0]*.2126+c[1]*.7152+c[2]*.0722;
};
const contrast=(luminance('ff6a00')+.05)/(luminance('141613')+.05);
assert.ok(contrast>=4.5);
const result={checks,menuContrast:contrast,productionSitemapHasTest:false};
fs.writeFileSync('docs/test-review/build-validation.json',JSON.stringify(result,null,2));
console.log(result);
