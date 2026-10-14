import {
  baseService
} from "./chunk-K3AZALEZ.js";
import "./chunk-EMZXO6WD.js";
import "./chunk-7SLAHIFZ.js";
import "./chunk-F2ZIT37G.js";
import "./chunk-J7SVXC7J.js";
import "./chunk-CRB4AVPI.js";
import "./chunk-LHS7OVUF.js";
import {
  init_define_globalThis_process_env,
  init_define_global_process_env,
  init_define_process_env
} from "./chunk-3EZRQDAS.js";

// node_modules/@astrojs/cloudflare/dist/entrypoints/image-service-workerd.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();
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
