import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  getPropagationHint,
  isPropagatingHint
} from "./chunk-V2BFQXJF.js";

// node_modules/astro/dist/runtime/server/render/astro/factory.js
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
function isAPropagatingComponent(result, factory) {
  return isPropagatingHint(getPropagationHint2(result, factory));
}
function getPropagationHint2(result, factory) {
  return getPropagationHint(result, factory);
}

export {
  isAstroComponentFactory,
  isAPropagatingComponent,
  getPropagationHint2 as getPropagationHint
};
//# sourceMappingURL=chunk-UJL66D2M.js.map
