import { createRequire } from 'module';const require = createRequire(import.meta.url);
import "./chunk-6ROVVSDV.js";

// node_modules/astro/dist/runtime/client/load.js
var loadDirective = async (load) => {
  const hydrate = await load();
  await hydrate();
};
var load_default = loadDirective;
export {
  load_default as default
};
//# sourceMappingURL=astro_runtime_client_load__js.js.map
