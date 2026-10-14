import { createRequire } from 'module';const require = createRequire(import.meta.url);
import "./chunk-6ROVVSDV.js";

// node_modules/astro/dist/runtime/client/only.js
var onlyDirective = async (load) => {
  const hydrate = await load();
  await hydrate();
};
var only_default = onlyDirective;
export {
  only_default as default
};
//# sourceMappingURL=astro_runtime_client_only__js.js.map
