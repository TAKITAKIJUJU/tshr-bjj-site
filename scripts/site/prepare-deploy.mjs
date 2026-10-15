import fs from 'node:fs';
import path from 'node:path';
import {locales,siteBase,localizeSiteHtml} from './localize.mjs';
const build=path.resolve(process.argv[2] || 'dist/client');
const output=path.resolve(process.argv[3] || 'local-assets/production-release');
fs.mkdirSync(output,{recursive:true});
function sharedAsset(url) {
  if(!url.startsWith('/')||url.startsWith('/site/'))return url;
  const pathname=url.split(/[?#]/)[0],input=path.resolve(build,'.'+pathname);
  if(!input.startsWith(build+path.sep)||!fs.existsSync(input)||!fs.statSync(input).isFile()||! /\.(webp|png|jpe?g|mp4|svg|woff2?)$/i.test(input))return url;
  const target=path.join(output,'site/shared',pathname);
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(input,target);
  return '/site/shared'+url;
}
fs.cpSync(path.join(build,'site'),path.join(output,'site'),{recursive:true});
const home=fs.readFileSync(path.join(build,'index.html'),'utf8');
const contact=fs.readFileSync(path.join(build,'contact/index.html'),'utf8');
const privacy=fs.existsSync(path.join(build,'privacy/index.html')) ? fs.readFileSync(path.join(build,'privacy/index.html'),'utf8') : '';
const thanks=fs.existsSync(path.join(build,'thanks/index.html')) ? fs.readFileSync(path.join(build,'thanks/index.html'),'utf8') : '';

const rewrite=html=>html.replaceAll('/_astro/','/site/_astro/').replace(/(\b(?:src|href|poster)=")([^"\s]+)(")/g,(_,a,url,b)=>a+sharedAsset(url)+b);

let source=rewrite(home);
let contactHtml=rewrite(contact);
let privacyHtml=privacy ? rewrite(privacy) : '';
let thanksHtml=thanks ? rewrite(thanks) : '';

// Share the complete transitive bundle graph for home, contact, privacy, thanks under /site/.
const queued=new Set([home,contact,privacy,thanks].flatMap(html=>[...html.matchAll(/\/_astro\/([^"\s<>]+)/g)].map(m=>m[1])));
fs.mkdirSync(path.join(output,'site/_astro'),{recursive:true});

const renamedMap = new Map();
for(const name of queued){
  if (name.includes('@')) {
    renamedMap.set(name, name.replace(/@/g, '_'));
  }
}

for(const name of queued){
  let content=fs.readFileSync(path.join(build,'_astro',name),'utf8');
  for(const match of content.matchAll(/(?:from|import)\s*["']\.\/([^"']+)["']/g)) {
    queued.add(match[1]);
    if (match[1].includes('@')) renamedMap.set(match[1], match[1].replace(/@/g, '_'));
  }
  content=content.replaceAll('/_astro/','/site/_astro/');
  if(name.endsWith('.css'))content=content.replace(/url\((["']?)(\/[^)"']+)\1\)/g,(_,q,url)=>`url(${q}${sharedAsset(url)}${q})`);
  
  // Replace renamed references inside files
  for (const [orig, clean] of renamedMap) {
    content = content.replaceAll(orig, clean);
  }
  
  const finalName = renamedMap.get(name) || name;
  fs.writeFileSync(path.join(output,'site/_astro',finalName),content);
}

// Replace renamed references in HTMLs
for (const [orig, clean] of renamedMap) {
  source = source.replaceAll(orig, clean);
  contactHtml = contactHtml.replaceAll(orig, clean);
  if (privacyHtml) privacyHtml = privacyHtml.replaceAll(orig, clean);
  if (thanksHtml) thanksHtml = thanksHtml.replaceAll(orig, clean);
}

for(const locale of locales) {
  const target=path.join(output,siteBase(locale),'index.html');
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,localizeSiteHtml(source,locale));
}
fs.mkdirSync(path.join(output,'contact'),{recursive:true});
fs.writeFileSync(path.join(output,'contact/index.html'),contactHtml);

if (privacyHtml) {
  fs.mkdirSync(path.join(output,'privacy'),{recursive:true});
  fs.writeFileSync(path.join(output,'privacy/index.html'),privacyHtml);
}
if (thanksHtml) {
  fs.mkdirSync(path.join(output,'thanks'),{recursive:true});
  fs.writeFileSync(path.join(output,'thanks/index.html'),thanksHtml);
}

fs.copyFileSync(path.join(build,'sitemap.xml'),path.join(output,'sitemap.xml'));
console.log('Prepared four home pages, contact, privacy, thanks and sitemap; /test/ remains independent.');
