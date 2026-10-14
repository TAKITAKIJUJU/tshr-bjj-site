import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  baseService
} from "./chunk-DOA2EJFR.js";
import "./chunk-7WAXXR62.js";
import "./chunk-2LHQL2PB.js";
import "./chunk-JGEFHKSF.js";
import "./chunk-QBIV76BD.js";
import "./chunk-ULKKSWDQ.js";
import "./chunk-3Q6YGEKV.js";
import "./chunk-6ROVVSDV.js";

// node_modules/@astrojs/cloudflare/dist/entrypoints/image-service-workerd.js
var service = {
  ...baseService,
  async transform(inputBuffer, transform) {
    return { data: inputBuffer, format: transform.format };
  }
};
var image_service_workerd_default = service;
export {
  image_service_workerd_default as default
};
//# sourceMappingURL=@astrojs_cloudflare_image-service-workerd.js.map
