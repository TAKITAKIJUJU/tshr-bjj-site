import fs from 'node:fs';
import crypto from 'node:crypto';
const original=JSON.parse(fs.readFileSync('docs/test-review/production-before.json','utf8'));
const changed=Object.entries(original).filter(([p,hash])=>!fs.existsSync(p)||crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')!==hash).map(([p])=>p);
const refs=JSON.parse(fs.readFileSync('docs/test-review/reference-shas.json','utf8'));
const comparison=Object.entries(refs).map(([p,expected])=>{
 const content=Buffer.from(fs.readFileSync(p,'utf8').replaceAll('\r\n','\n'));
 const sha=crypto.createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex');
 const referencePath='docs/test-review/reference/'+p.replaceAll('/','__')+'.txt';
 const equivalent=sha===expected || (fs.existsSync(referencePath)&&fs.readFileSync(p,'utf8').replaceAll('\r\n','\n').trimEnd()===fs.readFileSync(referencePath,'utf8').replaceAll('\r\n','\n').trimEnd());
 return {path:p,match:sha===expected,equivalentIgnoringLineEndingsAndEndWhitespace:equivalent,localBlob:sha,referenceBlob:expected};
});
const report={originalFileCount:Object.keys(original).length,changed,reference:'5375d25ba6053847e23e28a46ef26933dd089adc',comparison,facilityCopyIdentical:fs.readFileSync('src/components/test/v2/Facility.astro','utf8')===fs.readFileSync('src/components/v2/Facility.astro','utf8')};
fs.writeFileSync('docs/test-review/source-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(changed.length)process.exitCode=1;
