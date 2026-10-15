import test from 'node:test';
import assert from 'node:assert/strict';
import {videoRangeResponse} from '../../docs/production/video-range.js';

const data=Uint8Array.from({length:1000},(_,i)=>i%256);
function serve(range,extra={}) {
  let offset=0;
  const stream=new ReadableStream({pull(controller){
    if(offset===data.length){controller.close();return;}
    const next=Math.min(offset+37,data.length);
    controller.enqueue(data.slice(offset,next));offset=next;
  }});
  return videoRangeResponse(new Request('https://tshr-bjj.com/site/media/video.webm',{
    headers:{...(range?{range}:{}),...extra}}),new Response(stream,{
    headers:{'content-type':'video/webm','content-length':String(data.length),etag:'"video"'}}));
}
for(const [range,start,end] of [['bytes=0-102',0,102],['bytes=38-150',38,150],
  ['bytes=900-',900,999],['bytes=-20',980,999],['bytes=990-2000',990,999]]) {
  test(range,async()=>{
    const r=serve(range);assert.equal(r.status,206);
    assert.equal(r.headers.get('content-range'),`bytes ${start}-${end}/1000`);
    assert.equal(r.headers.get('content-length'),String(end-start+1));
    assert.deepEqual(new Uint8Array(await r.arrayBuffer()),data.slice(start,end+1));
  });
}
for(const range of ['bytes=1000-','bytes=100-20','bytes=-0'])test('unsatisfiable '+range,async()=>{
  const r=serve(range);assert.equal(r.status,416);assert.equal(r.headers.get('content-range'),'bytes */1000');
});
for(const range of [undefined,'bytes=0-1,5-6','invalid'])test('full response '+range,async()=>{
  const r=serve(range);assert.equal(r.status,200);assert.deepEqual(new Uint8Array(await r.arrayBuffer()),data);
});
test('If-Range mismatch returns the full representation',async()=>{
  const r=serve('bytes=0-1',{'if-range':'"old-video"'});assert.equal(r.status,200);
  assert.deepEqual(new Uint8Array(await r.arrayBuffer()),data);
});
test('Assets binding without Content-Length uses the generated file size',async()=>{
  const response=videoRangeResponse(new Request('https://tshr-bjj.com/video.webm',{
    headers:{range:'bytes=0-9'}}),new Response(data),data.length);
  assert.equal(response.status,206);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()),data.slice(0,10));
});
