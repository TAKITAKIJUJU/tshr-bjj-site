import fs from 'node:fs';
import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
fs.mkdirSync('public/test',{recursive:true});
const report=[];
for(const name of ['mulheres-new','kids-new']){
 const input=`public/${name}.jpg`, meta=await sharp(input).metadata();
 for(const width of [480,800,1200]){
  const target=`public/test/${name}-${width}.webp`;
  await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(target);
  report.push({file:target,bytes:fs.statSync(target).size,...await sharp(target).metadata()});
 }
 report.push({file:input,bytes:fs.statSync(input).size,width:meta.width,height:meta.height});
 const p='src/components/test/v2/Concept.astro';
 const source=fs.readFileSync(p,'utf8').replace(`src="/${name}.jpg"`,`src="/test/${name}-800.webp" srcset="/test/${name}-480.webp 480w, /test/${name}-800.webp 800w, /test/${name}-1200.webp 1200w" sizes="(max-width:700px) calc(100vw - 32px), (max-width:1150px) 46vw, 380px" width="${meta.width}" height="${meta.height}"`);
 fs.writeFileSync(p,source);
}
execFileSync(ffmpeg,['-y','-ss','1','-i','public/hero_video.mp4','-frames:v','1','-vf','scale=1440:-2','-quality','82','public/test/hero-poster.webp'],{stdio:'pipe'});
report.push({file:'public/test/hero-poster.webp',bytes:fs.statSync('public/test/hero-poster.webp').size,...await sharp('public/test/hero-poster.webp').metadata()});
// Set intrinsic dimensions for existing shared images, without rewriting files.
for(const p of ['src/components/test/Hero.astro','src/components/test/Footer.astro',...fs.readdirSync('src/components/test/v2').filter(n=>n!=='Facility.astro').map(n=>'src/components/test/v2/'+n)]){
 let s=fs.readFileSync(p,'utf8');
 const matches=[...s.matchAll(/<img\s[^>]*src="(\/[^\"]+)"[^>]*>/g)];
 for(const m of matches){
  if(m[0].includes('width=')||!fs.existsSync('public'+m[1]))continue;
  const meta=await sharp('public'+m[1]).metadata();
  s=s.replace(m[0],m[0].replace('<img ',`<img width="${meta.width}" height="${meta.height}" decoding="async" `));
 }
 fs.writeFileSync(p,s);
}
report.push({file:'public/LOGO.png',...await sharp('public/LOGO.png').metadata()});
fs.writeFileSync('docs/test-review/assets.json',JSON.stringify(report,null,2));
console.log(report.map(({file,bytes,width,height})=>({file,bytes,width,height})));
