// Generate production-only assets. Original media and /test/ stay untouched.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const output = path.resolve('public/site/media');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'over-limit-media-'));
fs.mkdirSync(output, {recursive:true});
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12);
function publish(name, extension, bytes) {
  const filename = `${name}-${hash(bytes)}.${extension}`;
  fs.writeFileSync(path.join(output,filename),bytes);
  return '/site/media/'+filename;
}
function run(args) {
  return new Promise((resolve,reject) => {
    const child=spawn(ffmpeg,['-hide_banner','-loglevel','error',...args]);
    let errors=''; child.stderr.on('data',chunk=>errors+=chunk);
    child.on('error',reject);
    child.on('close',code=>code===0?resolve():reject(new Error(errors)));
  });
}
const manifest={video:{},images:{}};
const report={video:{originalBytes:fs.statSync('public/hero_video.mp4').size,variants:{}},images:[]};
for(const [name,width] of [['desktop',720],['mobile',540]]) {
  const target=path.join(temporary,`hero-${name}.webm`);
  const encoding=['-i','public/hero_video.mp4','-map','0:v:0','-an','-vf',`scale=${width}:-2`,
    '-c:v','libvpx-vp9','-b:v',name==='desktop'?'625k':'425k','-crf','32','-deadline','good','-cpu-used','4',
    '-row-mt','1','-pix_fmt','yuv420p','-threads','2','-g','120',
    '-passlogfile',path.join(temporary,`pass-${name}`)];
  await run([...encoding,'-pass','1','-f','null','-']);
  await run([...encoding,'-pass','2',target]);
  const bytes=fs.readFileSync(target);
  if(bytes.length>=report.video.originalBytes)throw new Error('Video variant must be smaller than the original: '+name);
  manifest.video[name]=publish(`hero-${name}`,'webm',bytes);
  report.video.variants[name]={bytes:bytes.length,width,src:manifest.video[name]};
}
const fallback=path.join(temporary,'hero-fallback.mp4');
await run(['-i','public/hero_video.mp4','-map','0:v:0','-an','-c:v','copy','-movflags','+faststart',fallback]);
manifest.video.fallback=publish('hero-fallback','mp4',fs.readFileSync(fallback));
report.video.fallbackBytes=fs.statSync(fallback).size;
const imageNames=['what1','what2','what3','flow1','flow2','flow3','new-ins',
  'processed-16A4994D-E073-48E0-A49C-89AF5897EAE1',
  'processed-3BFA741D-A026-4EB4-B9BF-1992C5195C35',
  'processed-8E9EA17C-03F5-4922-8835-CA5BCC9157A0',
  'processed-99EE1602-384F-4E8E-967D-BECE71CB9431',
  'processed-9EB7D774-131B-4FB1-8FCC-D00036F7257A',
  'processed-AA442933-C10A-41AE-81AB-B86057D3678A',
  'processed-C46A2648-B6DD-4D42-9573-D11E32E9083D',
  'processed-E1AC7486-1624-4F7D-ACF8-536A9FC6F0DA'];
for(const name of imageNames) {
  const original=`public/${name}.webp`;
  const metadata=await sharp(original).metadata();
  const widths=[400,800,metadata.width].filter((w,i,a)=>w<=metadata.width&&a.indexOf(w)===i);
  const variants=[];
  for(const width of widths) {
    // Reuse the original full-resolution image for enlargement, avoiding generational loss.
    const bytes=width===metadata.width?fs.readFileSync(original):await sharp(original)
      .resize({width,withoutEnlargement:true}).webp({quality:86,effort:6}).toBuffer();
    variants.push({width,src:publish(`${name}-${width}`,'webp',bytes),bytes:bytes.length});
  }
  manifest.images[name]={width:metadata.width,height:metadata.height,
    src:variants.find(v=>v.width===800)?.src??variants.at(-1).src,
    srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', '),full:variants.at(-1).src};
  report.images.push({name,originalBytes:fs.statSync(original).size,variants});
}
fs.writeFileSync('src/data/site/media.json',JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync('docs/production/video-assets.json',JSON.stringify({
  ...Object.fromEntries(Object.values(report.video.variants).map(v=>[v.src,v.bytes])),
  [manifest.video.fallback]:report.video.fallbackBytes
},null,2)+'\n');
fs.writeFileSync('docs/production/media-optimization.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.video,null,2));
console.log('Generated responsive variants for',imageNames.length,'images.');
