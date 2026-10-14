import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const candidates=[path.join(os.homedir(),'AppData/Roaming/xdg.config/.wrangler/config/default.toml'),path.join(os.homedir(),'.config/.wrangler/config/default.toml')];
let token=process.env.CLOUDFLARE_API_TOKEN;
if(!token){for(const p of candidates){if(fs.existsSync(p)){token=fs.readFileSync(p,'utf8').match(/oauth_token\s*=\s*"([^\"]+)"/)?.[1];if(token)break;}}}
if(!token)throw Error('Wrangler authentication is unavailable');
const api=async endpoint=>{const response=await fetch('https://api.cloudflare.com/client/v4'+endpoint,{headers:{Authorization:`Bearer ${token}`}});const data=await response.json();if(!data.success)throw Error(JSON.stringify(data.errors));return data.result;};
const zones=await api('/zones?name=tshr-bjj.com');
if(zones.length!==1)throw Error('Expected one matching zone');
const zone=zones[0];
const routes=await api(`/zones/${zone.id}/workers/routes`);
const workers=await api(`/accounts/${zone.account.id}/workers/scripts`);
const production=await api(`/accounts/${zone.account.id}/workers/scripts/local-gym-site/deployments`);
const report={zone:{id:zone.id,name:zone.name,account:zone.account.id},routes,workers:workers.map(w=>({id:w.id,modified_on:w.modified_on})),productionDeployments:production};
const target=process.argv[2]||'docs/test-review/cloudflare-before.json';
fs.writeFileSync(target,JSON.stringify(report,null,2));
console.log(JSON.stringify({routes,workers:report.workers,productionCurrent:production.deployments?.[0]},null,2));
