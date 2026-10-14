import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  spreadAttributes
} from "./chunk-C33D7DX5.js";
import "./chunk-AKUOIC2D.js";
import "./chunk-L472YQS2.js";
import "./chunk-VURVHRW5.js";
import "./chunk-BVIQUZKK.js";
import "./chunk-F6Z4K3FU.js";
import "./chunk-JB6KJWD7.js";
import {
  renderTemplate
} from "./chunk-KY6USHSR.js";
import "./chunk-V27M4QV7.js";
import {
  generateCspDigest
} from "./chunk-LCELFPLE.js";
import "./chunk-XVEAZ4XI.js";
import "./chunk-WAIB77DI.js";
import "./chunk-FLGKNVGH.js";
import "./chunk-VIWFKXLK.js";
import "./chunk-64ZDNMF6.js";
import "./chunk-5FUOLBI2.js";
import "./chunk-NHETUDSO.js";
import "./chunk-I5NBNXIQ.js";
import "./chunk-Z7TTKSTQ.js";
import "./chunk-UJL66D2M.js";
import "./chunk-V2BFQXJF.js";
import "./chunk-NPI3L3SJ.js";
import "./chunk-BGIPM2VB.js";
import "./chunk-RZUPUHH6.js";
import "./chunk-OIPFE3EH.js";
import "./chunk-F3TIPEJZ.js";
import "./chunk-VQKOTPFT.js";
import "./chunk-QZII376I.js";
import {
  unescapeHTML
} from "./chunk-M2Q52ZGU.js";
import "./chunk-6QQ5WPQJ.js";
import "./chunk-DC2IXCQX.js";
import "./chunk-SLXZAAKE.js";
import "./chunk-Y6EWT2OD.js";
import {
  createComponent
} from "./chunk-FXOFAG73.js";
import "./chunk-JGEFHKSF.js";
import "./chunk-ULKKSWDQ.js";
import "./chunk-3Q6YGEKV.js";
import "./chunk-WHJZQVMP.js";
import "./chunk-6ROVVSDV.js";

// node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  if (import.meta.env.DEV) {
    makeNonEnumerable(Component);
    Object.defineProperty(Component, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), {
      value: (_, opts, inspect) => inspect(meta, opts)
    });
  }
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}
function makeNonEnumerable(object) {
  for (const property in object) {
    Object.defineProperty(object, property, { enumerable: false });
  }
}
export {
  createSvgComponent,
  dropAttributes
};
//# sourceMappingURL=astro_assets_runtime.js.map
