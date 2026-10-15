import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import * as parse5 from 'parse5';
import {generateTranslations} from '../../scripts/generate-translations.mjs';
import {locales,localeBase,localizeTestHtml} from '../../scripts/test/localize.mjs';
import {faqByLocale,faqSourceCommit} from '../../src/data/test/faq-content.js';
import {htmlLang,translations} from '../../src/data/test/translations.js';

const buildRoot=path.resolve(process.argv[2]);
const stageRoot=path.resolve(process.argv[3] || 'docs/test-review/deploy-assets');
const reportPath=process.argv[4] || 'docs/test-review/locale-validation.json';
const get=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
const cls=(node,name)=>get(node,'class')?.split(/\s+/).includes(name);
const walk=node=>[node,...(node.childNodes??[]).flatMap(walk)];
const content=node=>node.nodeName==='#text'?node.value:(node.childNodes??[]).map(content).join('');
const nodes=html=>walk(parse5.parse(html,{scriptingEnabled:false}));
const pairs=all=>all.filter(n=>cls(n,'faq-item')).map(n=>{
  const children=walk(n);const summary=children.find(c=>c.tagName==='summary');
  return {question:content(summary.childNodes.filter(c=>c.tagName==='span').at(-1)).trim(),answer:content(children.find(c=>c.tagName==='p')).trim()};
});
const fields=all=>all.filter(n=>['input','select','textarea'].includes(n.tagName)).map(n=>({
  tag:n.tagName, id:get(n,'id'), name:get(n,'name'), type:get(n,'type'),
  required:n.attrs.some(a=>a.name==='required'), maxlength:get(n,'maxlength')
}));
const originalForm=fields(nodes(execFileSync('git',['show','HEAD:src/pages/test/contact.astro'],{encoding:'utf8'})));
const reference=execFileSync('git',['show',`${faqSourceCommit}:src/components/v2/Faq.astro`],{encoding:'utf8'});
assert.deepEqual(faqByLocale.ja,pairs(nodes(reference)),'Japanese FAQ must match the designated production commit exactly.');
const livePath='local-assets/review-20261015/live-faq.json';
if(fs.existsSync(livePath))assert.deepEqual(faqByLocale.ja,JSON.parse(fs.readFileSync(livePath,'utf8')),'Public production FAQ differs.');

// Prove both entry points create the same eight pages, including metadata and script bodies.
const normalRoot=fs.mkdtempSync(path.join(os.tmpdir(),'over-limit-locale-comparison-'));
for(const suffix of ['','contact/']){
  const p=path.join(normalRoot,'test',suffix,'index.html');fs.mkdirSync(path.dirname(p),{recursive:true});
  fs.copyFileSync(path.join(buildRoot,'test',suffix,'index.html'),p);
}
generateTranslations(normalRoot);
const normalizeAssets=html=>{
  const doc=parse5.parse(html,{scriptingEnabled:false});
  for(const node of walk(doc))for(const attr of node.attrs??[])if(['src','href','poster'].includes(attr.name)){
    attr.value=attr.value.replace(/^\/test\/shared\//,'/').replace(/^\/test\/_astro\//,'/_astro/');
  }
  return parse5.serialize(doc);
};
// Literal Japanese strings in executable code and styles must remain untouched.
const fixture='<html><head><style>.x::after{content:"お問い合わせ"}</style></head><body><script>const label="お問い合わせ";</script><p>お問い合わせ</p></body></html>';
for(const locale of locales){
  const all=nodes(localizeTestHtml(fixture,locale));
  assert.equal(content(all.find(n=>n.tagName==='script')),'const label="お問い合わせ";');
  assert.equal(content(all.find(n=>n.tagName==='style')),'.x::after{content:"お問い合わせ"}');
}
const checks=[];const missing=[];
for(const locale of locales)for(const contact of [false,true]){
  const suffix=contact?'contact/':'';
  const relative=localeBase(locale).slice(1)+suffix+'index.html';
  const html=fs.readFileSync(path.join(stageRoot,relative),'utf8');
  const all=nodes(html);
  const select=(tag,key,value)=>all.find(n=>n.tagName===tag&&get(n,key)===value);
  const canonical='https://tshr-bjj.com'+localeBase(locale)+suffix;
  assert.equal(normalizeAssets(html),parse5.serialize(parse5.parse(fs.readFileSync(path.join(normalRoot,relative),'utf8'),{scriptingEnabled:false})),relative+': generation paths differ');
  assert.equal(all.filter(n=>n.tagName==='title').length,1);
  assert.equal(get(all.find(n=>n.tagName==='html'),'lang'),htmlLang[locale]);
  assert.equal(get(select('meta','name','robots'),'content'),'noindex, nofollow');
  assert.match(get(select('meta','http-equiv','Content-Security-Policy'),'content'),/form-action 'none'/);
  assert.equal(get(select('link','rel','canonical'),'href'),canonical);
  assert.equal(get(select('meta','property','og:url'),'content'),canonical);
  const title=content(all.find(n=>n.tagName==='title'));
  const description=get(select('meta','name','description'),'content');
  assert.ok(description?.length>30);
  assert.equal(get(select('meta','property','og:title'),'content'),title);
  assert.equal(get(select('meta','property','og:description'),'content'),description);
  assert.equal(get(select('meta','name','twitter:description'),'content'),description);
  const graph=JSON.parse(content(select('script','type','application/ld+json')))['@graph'];
  const page=graph.find(e=>e['@type']===(contact?'ContactPage':'WebPage'));
  assert.equal(page.url,canonical);assert.equal(page.name,title);assert.equal(page.description,description);
  const faq=graph.find(e=>e['@type']==='FAQPage');
  if(contact){
    assert.deepEqual(fields(all),originalForm,'Form fields and requirements must remain unchanged.');
    assert.ok(!faq);assert.equal(get(select('form','id','trial-form'),'method'),'dialog');
    const button=select('button','id','mock-submit');assert.equal(get(button,'type'),'button');assert.ok(button.attrs.some(a=>a.name==='disabled'));
    assert.equal(all.filter(n=>cls(n,'line-btn')).length,1);
  }else{
    assert.deepEqual(pairs(all),faqByLocale[locale]);assert.equal(faq.mainEntity.length,7);
    assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),pairs(all));
    assert.equal(all.filter(n=>cls(n,'review-card')).length,3);assert.equal(all.filter(n=>cls(n,'review-date')).length,0);
    assert.deepEqual(all.filter(n=>cls(n,'avatar-initials')).map(content),['IM','M','EP']);
    if(locale==='gunma'){
      const ja=nodes(fs.readFileSync(path.join(stageRoot,'test/index.html'),'utf8'));
      assert.deepEqual(all.filter(n=>cls(n,'review-body')).map(content),ja.filter(n=>cls(n,'review-body')).map(content),'Third-party reviews must not be dialectized.');
    }
    if(['en','pt'].includes(locale))assert.ok(all.some(n=>n.tagName==='h3'&&content(n)===translations['女性・中高生会員'][locale]));
    const h1=all.find(n=>n.tagName==='h1');const count=walk(h1).filter(n=>cls(n,'hero__char')).length;
    assert.equal(count,locale==='en'?43:locale==='pt'?44:14);
  }
  for(const anchor of all.filter(n=>n.tagName==='a'&&get(n,'data-language'))){
    const target=get(anchor,'data-language');assert.equal(get(anchor,'href'),localeBase(target)+suffix);
    assert.equal(get(anchor,'aria-current'),target===locale?'page':undefined);
  }
  const broken=[];
  for(const node of all)for(const attr of node.attrs??[])if(['href','src','poster'].includes(attr.name)&&attr.value.startsWith('/')){
    const url=new URL(attr.value,'https://local');let file=path.join(stageRoot,decodeURIComponent(url.pathname));
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file)){broken.push(attr.value);continue;}
    if(url.hash&&path.extname(file)==='.html')assert.ok(nodes(fs.readFileSync(file,'utf8')).some(n=>get(n,'id')===url.hash.slice(1)),`Missing anchor ${attr.value}`);
  }
  assert.deepEqual(broken,[],relative+': broken local links/assets');
  assert.ok(!/formsubmit\.co/.test(html));
  if(['en','pt'].includes(locale)){
    function findMissing(node,skip=false){
      skip=skip||['script','style','svg'].includes(node.tagName)||cls(node,'language-picker');
      if(!skip){
        if(node.nodeName==='#text'&&/[ぁ-んァ-ヶ一-龯]/.test(node.value))missing.push({page:relative,text:node.value.trim()});
        for(const a of node.attrs??[])if(['alt','title','placeholder','aria-label'].includes(a.name)&&/[ぁ-んァ-ヶ一-龯]/.test(a.value))missing.push({page:relative,text:a.value});
      }
      for(const child of node.childNodes??[])findMissing(child,skip);
    }
    findMissing(parse5.parse(html,{scriptingEnabled:false}));
    assert.ok(!/[ぁ-んァ-ヶ一-龯]/.test(description));
    const bodyText=all.filter(n=>n.nodeName==='#text'&&!['script','style'].includes(n.parentNode?.tagName)).map(content).join(' ');
    const altText=all.flatMap(n=>(n.attrs??[]).filter(a=>a.name==='alt').map(a=>a.value)).join(' ');
    assert.ok(!/minimal|total segurança|máxima segurança|total proteção|ensuring injury prevention|\$0/.test(bodyText+' '+altText));
  }
  checks.push({page:relative,title,faqCount:contact?0:7,generationPathsMatch:true});
}
const result={checks,faqReferenceMatches:true,scriptAndStylePreserved:true,missingTranslations:missing};
fs.writeFileSync(reportPath,JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
assert.equal(missing.length,0,'Untranslated text/attributes found; see report.');
