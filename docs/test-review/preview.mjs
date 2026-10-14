// Local-only QA server. Serves the build; never proxies forms or external APIs.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2] || 'dist/client');
const basePort=Number(process.argv[3] || 4322);
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.mp4':'video/mp4','.svg':'image/svg+xml','.json':'application/json'};
const requests=[];
for(const [port,mode] of [[basePort,'normal'],[basePort+1,'scripts-blocked'],[basePort+2,'reduced-motion-simulation']]) {
 http.createServer((req,res)=>{
  const url=new URL(req.url,`http://127.0.0.1:${port}`);
  requests.push({mode,method:req.method,path:url.pathname});
  if(url.pathname==='/__qa/requests'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(requests));return;}
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end('No form submission is supported.');return;}
  let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404);res.end('Not found');return;}
  const ext=path.extname(file);
  res.setHeader('Content-Type',types[ext]||'application/octet-stream');
  res.setHeader('Cache-Control','no-store');
  let content=fs.readFileSync(file);
  if(mode==='scripts-blocked') res.setHeader('Content-Security-Policy',"script-src 'none'; form-action 'none'; connect-src 'none'");
  if(mode==='reduced-motion-simulation'&&ext==='.html')content=Buffer.from(content.toString().replace('<head>',`<head><script>const nativeMatchMedia=window.matchMedia.bind(window);window.matchMedia=(q)=>q.includes('prefers-reduced-motion')?{matches:q.includes('reduce'),media:q,onchange:null,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){},dispatchEvent(){return true}}:nativeMatchMedia(q);</script>`));
  if(mode==='reduced-motion-simulation'&&ext==='.css')content=Buffer.from(content.toString().replaceAll(/prefers-reduced-motion:\s*reduce/g,'min-width:0px'));
  res.setHeader('Content-Length',content.length);
  res.end(req.method==='HEAD'?undefined:content);
 }).listen(port,'0.0.0.0',()=>console.log(`Preview server running: http://localhost:${port}/test/ (LAN: http://192.168.1.7:${port}/test/) [${mode}]`));
}
