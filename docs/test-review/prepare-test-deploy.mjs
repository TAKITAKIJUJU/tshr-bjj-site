import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as parse5 from 'parse5';
import { translations, localePaths, localeNames, htmlLang } from '../../src/data/test/translations.js';
const stage='docs/test-review/deploy-assets';
const buildRoot=process.argv[2]||'dist/client';
fs.mkdirSync(stage+'/test/_astro',{recursive:true});
function sharedAsset(url) {
 if(!url.startsWith('/')||url.startsWith('/test/'))return url;
 const pathname=url.split(/[?#]/)[0];
 const input=path.resolve(buildRoot,'.'+pathname);
 if(!input.startsWith(path.resolve(buildRoot)+path.sep)||!fs.existsSync(input)||!fs.statSync(input).isFile())return url;
 if(!/\.(?:webp|png|jpe?g|mp4|svg|woff2?)$/i.test(input))return url;
 const target=stage+'/test/shared'+pathname;
 fs.mkdirSync(path.dirname(target),{recursive:true});
 fs.copyFileSync(input,target);
 return '/test/shared'+url;
}
const testPaths=['test/index.html','test/contact/index.html'];
function localize(html, locale, contact) {
 const document=parse5.parse(html,{scriptingEnabled:false});
 const suffix=contact?'contact/':'';
 const localeBase=target=>'/test/'+(localePaths[target]?localePaths[target]+'/':'');
 const get=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
 const set=(node,key,value)=>{const attr=node.attrs?.find(a=>a.name===key);if(attr)attr.value=value;else (node.attrs??=[]).push({name:key,value});};
 const hasClass=(node,name)=>get(node,'class')?.split(/\s+/).includes(name);
 function visit(node,skip=false) {
  const tag=node.tagName;
  if(tag==='html')set(node,'lang',htmlLang[locale]);
  if(tag==='meta'&&get(node,'property')==='og:locale')set(node,'content',locale==='pt'?'pt_BR':locale==='en'?'en_US':'ja_JP');
  if(tag==='meta'&&get(node,'property')==='og:url')set(node,'content','https://tshr-bjj.com'+localeBase(locale)+suffix);
  if(tag==='link'&&get(node,'rel')==='canonical')set(node,'href','https://tshr-bjj.com'+localeBase(locale)+suffix);
  for(const attr of node.attrs??[])if(['alt','aria-label','title','placeholder','content'].includes(attr.name))attr.value=translations[attr.value]?.[locale]??attr.value;
  if(tag==='a'){
   const target=get(node,'data-language');
   if(target){set(node,'href',localeBase(target)+suffix);node.attrs=node.attrs.filter(a=>a.name!=='aria-current');if(target===locale)set(node,'aria-current','page');}
   else {const href=get(node,'href');if(href?.startsWith('/test/')&&!href.startsWith('/test/_astro/')&&!href.startsWith('/test/shared/'))set(node,'href',localeBase(locale)+href.slice('/test/'.length));}
  }
  if(hasClass(node,'language-current'))node.childNodes=[{nodeName:'#text',value:localeNames[locale],parentNode:node}];
  if(hasClass(node,'hero__vert-text')){
   if(locale==='gunma'){
    // 群馬弁のファーストビューはオリジナルの縦書きのままにする（変更しない）
    return;
   }
   else if(locale==='en'||locale==='pt'){
    const lines=locale==='en'?['Enrich your life through','jiu-jitsu in Honjo.']:['Transforme sua vida com o','jiu-jitsu em Honjo.'];
    const text=value=>({nodeName:'#text',value,parentNode:node});
    const chars=lines.flatMap((line,index)=>[...line].map(char=>({nodeName:'span',tagName:'span',attrs:[{name:'class',value:'hero__char'},...(char===' '?[{name:'style',value:'white-space:pre-wrap'}]:[])],namespaceURI:'http://www.w3.org/1999/xhtml',childNodes:[text(char)],parentNode:node})).concat(index<lines.length-1?[{nodeName:'br',tagName:'br',attrs:[],namespaceURI:'http://www.w3.org/1999/xhtml',childNodes:[],parentNode:node}]:[]));
    set(node,'class',get(node,'class')+' hero__translated');
    set(node,'aria-label',lines.join(' '));
    node.childNodes=chars;
   }
   return;
  }
  if(node.nodeName==='#text'&&!skip){
   const match=node.value.match(/^(\s*)([\s\S]*?)(\s*)$/);
   if(match){const translated=translations[match[2]]?.[locale];if(translated)node.value=match[1]+translated+match[3];}
  }
  const nextSkip=skip||['script','style','svg'].includes(tag)||hasClass(node,'language-picker');
  if(node.childNodes)node.childNodes=node.childNodes.filter(child=>!(child.tagName==='script'&&get(child,'type')==='application/ld+json'));
  for(const child of node.childNodes??[])visit(child,nextSkip);
 }
 visit(document);
 return parse5.serialize(document);
}
for(const file of testPaths){
 let html=fs.readFileSync(path.join(buildRoot,file),'utf8').replaceAll('/_astro/','/test/_astro/');
 html=html.replace(/(\b(?:src|href|poster)=")([^"\s]+)(")/g,(_,a,url,b)=>a+sharedAsset(url)+b);
 if(!html.includes('noindex, nofollow')||html.includes('formsubmit.co'))throw Error('Unsafe test page');
 fs.mkdirSync(path.dirname(stage+'/'+file),{recursive:true});
 fs.writeFileSync(stage+'/'+file,html);
 for(const locale of ['en','pt','gunma']){
  const contact=file.includes('/contact/');
  const target='test/'+localePaths[locale]+'/'+(contact?'contact/':'')+'index.html';
  fs.mkdirSync(path.dirname(stage+'/'+target),{recursive:true});
  fs.writeFileSync(stage+'/'+target,localize(html,locale,contact));
 }
}
fs.cpSync('public/test',stage+'/test',{recursive:true});
// Copy only the transitive JS/CSS graph referenced by the two test pages.
const queued=new Set(testPaths.flatMap(file=>[...fs.readFileSync(path.join(buildRoot,file),'utf8').matchAll(/\/_astro\/([^"\s<>]+)/g)].map(m=>m[1])));
const copied=[];
for(const name of queued){
 const input=path.resolve(buildRoot,'_astro',name);
 if(!input.startsWith(path.resolve(buildRoot,'_astro')+path.sep)||!fs.existsSync(input))throw Error('Invalid asset '+name);
 let content=fs.readFileSync(input,'utf8');
 for(const m of content.matchAll(/(?:from|import)\s*["']\.\/([^"']+)["']/g))queued.add(m[1]);
 content=content.replaceAll('/_astro/','/test/_astro/');
 if(name.endsWith('.css'))content=content.replace(/url\((["']?)(\/[^)"']+)\1\)/g,(_,quote,url)=>`url(${quote}${sharedAsset(url)}${quote})`);
 fs.writeFileSync(stage+'/test/_astro/'+name,content);
 copied.push(name);
}
// This directory contains only bundles generated by this packaging script.
for(const name of fs.readdirSync(stage+'/test/_astro')) {
 if(!copied.includes(name)) fs.unlinkSync(path.join(stage,'test/_astro',name));
}
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const files=walk(stage);
if(files.some(p=>!path.relative(stage,p).replaceAll('\\','/').startsWith('test/')))throw Error('Asset escaped test prefix');
fs.writeFileSync('docs/test-review/deploy-manifest.json',JSON.stringify({files:files.map(p=>({path:path.relative(stage,p).replaceAll('\\','/'),bytes:fs.statSync(p).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')})),bundles:copied},null,2));
console.log({files:files.length,bundles:copied});
