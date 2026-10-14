import fs from 'node:fs';
import crypto from 'node:crypto';
const paths=['/','/contact/','/demo/','/robots.txt','/sitemap.xml'];
const results=[];
for(const pathname of paths){
 const response=await fetch('https://tshr-bjj.com'+pathname);
 const text=await response.text();
 results.push({path:pathname,status:response.status,url:response.url,sha256:crypto.createHash('sha256').update(text).digest('hex'),title:text.match(/<title>(.*?)<\/title>/)?.[1],bytes:Buffer.byteLength(text)});
}
fs.writeFileSync(process.argv[2]||'docs/test-review/live-before.json',JSON.stringify(results,null,2));
console.log(results);
