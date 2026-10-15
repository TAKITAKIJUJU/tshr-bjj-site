// The Assets binding can return 200 for Range requests. Stream only the requested
// bytes to the browser without buffering the full video in Worker memory.
export function videoRangeResponse(request, response, assetLength) {
  if(response.status!==200||!response.body)return response;
  const headers=new Headers(response.headers);
  headers.set('accept-ranges','bytes');
  const range=request.headers.get('range');
  const ifRange=request.headers.get('if-range');
  const length=assetLength??Number(headers.get('content-length'));
  const match=range?.match(/^bytes=(\d*)-(\d*)$/);
  if(request.method!=='GET'||!match||(!match[1]&&!match[2])||!Number.isSafeInteger(length)||length<=0||
    (ifRange&&ifRange!==headers.get('etag')&&ifRange!==headers.get('last-modified'))) {
    return new Response(response.body,{status:200,headers});
  }
  const start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));
  const end=match[1]?(match[2]?Math.min(Number(match[2]),length-1):length-1):length-1;
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=length||end<start||(!match[1]&&Number(match[2])===0)) {
    response.body.cancel().catch(()=>{});
    headers.set('content-range',`bytes */${length}`);
    headers.set('content-length','0');
    return new Response(null,{status:416,headers});
  }
  const reader=response.body.getReader();
  let offset=0;
  const stream=new ReadableStream({
    async pull(controller) {
      try {
        while(true) {
          const {done,value}=await reader.read();
          if(done){controller.close();return;}
          const chunkStart=offset;
          offset+=value.byteLength;
          const from=Math.max(0,start-chunkStart),to=Math.min(value.byteLength,end+1-chunkStart);
          if(to>from)controller.enqueue(value.subarray(from,to));
          if(offset>end){controller.close();await reader.cancel();return;}
          if(to>from)return;
        }
      } catch(error){controller.error(error);}
    },
    cancel(reason){return reader.cancel(reason);}
  });
  headers.set('content-range',`bytes ${start}-${end}/${length}`);
  headers.set('content-length',String(end-start+1));
  return new Response(stream,{status:206,headers});
}
