import fs from 'node:fs';
import path from 'node:path';
import {locales,siteBase,localizeSiteHtml} from './localize.mjs';
const build=path.resolve(process.argv[2] || 'dist/client');
const output=path.resolve(process.argv[3] || 'local-assets/production-deploy');
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
const original=fs.readFileSync(path.join(build,'index.html'),'utf8');
const source=original.replaceAll('/_astro/','/site/_astro/').replace(/(\b(?:src|href|poster)=")([^"\s]+)(")/g,(_,a,url,b)=>a+sharedAsset(url)+b);
// Copy just the transitive bundle graph used by the approved home.
const queued=new Set([...original.matchAll(/\/_astro\/([^"\s<>]+)/g)].map(m=>m[1]));
fs.mkdirSync(path.join(output,'site/_astro'),{recursive:true});
for(const name of queued){
  let content=fs.readFileSync(path.join(build,'_astro',name),'utf8');
  for(const match of content.matchAll(/(?:from|import)\s*["']\.\/([^"']+)["']/g))queued.add(match[1]);
  content=content.replaceAll('/_astro/','/site/_astro/');
  if(name.endsWith('.css'))content=content.replace(/url\((["']?)(\/[^)"']+)\1\)/g,(_,q,url)=>`url(${q}${sharedAsset(url)}${q})`);
  fs.writeFileSync(path.join(output,'site/_astro',name),content);
}
for(const locale of locales) {
  const target=path.join(output,siteBase(locale),'index.html');
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,localizeSiteHtml(source,locale));
}
if(fs.existsSync(path.join(output,'contact')))throw Error('Contact must not be deployed by the home Worker.');
console.log('Prepared four home pages; existing /contact/ and /test/ routes remain independent.');
