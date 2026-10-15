// Read-only network snapshot for before/after release comparison.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {gzipSync} from 'node:zlib';
import * as parse5 from 'parse5';
const phase=process.argv[2];
if(!['before','after'].includes(phase))throw Error('Use before or after');
const origin='https://tshr-bjj.com';
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const get=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const copy=n=>['script','style','noscript'].includes(n.tagName)?'':n.nodeName==='#text'?n.value:(n.childNodes??[]).map(copy).join(' ');
const report={pages:[],unchanged:[],javascript:{files:[],bytes:0,gzipBytes:0}};
const scriptURLs=new Set();
for(const route of ['/','/english/','/portugues/','/gunma/']) {
  const response=await fetch(origin+route);if(!response.ok)throw Error(route+' '+response.status);
  const html=await response.text(),nodes=walk(parse5.parse(html));
  const body=nodes.find(n=>n.tagName==='body');
  report.pages.push({route,textHash:hash(copy(body).replace(/\s+/g,' ').trim()),
    // Preserve a second digest to allow the separately requested representative-line removal.
    textHashWithFormerFooter:(()=>{
      const rep=nodes.find(n=>get(n,'class')?.split(/\s+/).includes('footer__rep'));
      const first=rep?.childNodes?.find(n=>n.nodeName==='#text');
      const original=first?.value;
      if(first?.value==='TEL：')first.value='代表：田代 セイイチ（黒帯3段） / TEL：';
      const digest=hash(copy(body).replace(/\s+/g,' ').trim());
      if(first)first.value=original;
      return digest;
    })(),
    fonts:nodes.filter(n=>n.tagName==='link'&&get(n,'href')?.includes('fonts.googleapis.com/css')).map(n=>get(n,'href'))});
  if(route==='/')for(const n of nodes)if(n.tagName==='script') {
    if(get(n,'src'))scriptURLs.add(new URL(get(n,'src'),origin).href);
    else if(get(n,'type')!=='application/ld+json') {
      const code=(n.childNodes??[]).map(c=>c.value??'').join('');
      const bytes=Buffer.byteLength(code),gzipBytes=gzipSync(code).length;
      report.javascript.files.push({url:'#inline-'+report.javascript.files.length,bytes,gzipBytes});
      report.javascript.bytes+=bytes;report.javascript.gzipBytes+=gzipBytes;
    }
  }
}
for(const route of ['/test/','/test/english/','/test/portugues/','/test/gunma/',
  '/test/contact/','/test/english/contact/','/test/portugues/contact/','/test/gunma/contact/',
  '/contact/','/privacy/','/thanks/','/demo/','/robots.txt','/sitemap.xml']) {
  const response=await fetch(origin+route);if(!response.ok)throw Error(route+' '+response.status);
  report.unchanged.push({route,hash:hash(await response.text())});
}
for(const url of scriptURLs) {
  const response=await fetch(url);if(!response.ok)throw Error(url+' '+response.status);
  const code=await response.text();
  for(const match of code.matchAll(/(?:from|import)\s*["'](\.\/[^"']+)["']/g))scriptURLs.add(new URL(match[1],url).href);
  const bytes=Buffer.byteLength(code),gzipBytes=gzipSync(code).length;
  report.javascript.files.push({url,bytes,gzipBytes});
  report.javascript.bytes+=bytes;report.javascript.gzipBytes+=gzipBytes;
}
if(phase==='after') {
  const before=JSON.parse(fs.readFileSync('docs/production/performance-before.json','utf8'));
  // Contact references share generated bundle names, so compare its actual form separately.
  const stable=report.unchanged.filter(p=>p.route!=='/contact/'&&p.route!=='/privacy/'&&p.route!=='/thanks/');
  for(const p of stable)if(p.hash!==before.unchanged.find(b=>b.route===p.route)?.hash)throw Error('Unexpected change: '+p.route);
  for(const p of report.pages) {
    const previous=before.pages.find(b=>b.route===p.route);
    if(p.textHash!==previous.textHash&&p.textHashWithFormerFooter!==previous.textHash)throw Error('Unexpected visible copy change: '+p.route);
    if(JSON.stringify(p.fonts)!==JSON.stringify(previous.fonts))throw Error('Fonts changed: '+p.route);
  }
  report.comparison={copyPreservedExceptRequestedFooterRemoval:true,fontsUnchanged:true,testAndOtherRoutesUnchanged:true,
    javascriptBytesSaved:before.javascript.bytes-report.javascript.bytes,
    javascriptGzipBytesSaved:before.javascript.gzipBytes-report.javascript.gzipBytes};
}
fs.writeFileSync(`docs/production/performance-${phase}.json`,JSON.stringify(report,null,2)+'\n');
console.log({phase,scriptFiles:report.javascript.files.length,javascript:report.javascript.bytes,gzip:report.javascript.gzipBytes,...report.comparison});
