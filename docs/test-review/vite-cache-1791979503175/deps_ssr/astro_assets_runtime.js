import {
  spreadAttributes
} from "./chunk-W33XYA4D.js";
import "./chunk-NBK6WQWH.js";
import "./chunk-4Y2RXR2S.js";
import "./chunk-7UDXSGXE.js";
import "./chunk-ZC7PT6IH.js";
import "./chunk-RJEP4CXK.js";
import "./chunk-NBARY4P4.js";
import {
  renderTemplate
} from "./chunk-PA3V3SGF.js";
import "./chunk-S7AOVLG7.js";
import {
  generateCspDigest
} from "./chunk-3C433ACU.js";
import "./chunk-YYJMEM5O.js";
import "./chunk-MGLWYME2.js";
import "./chunk-7OY2JPCH.js";
import "./chunk-4NNIHIYU.js";
import "./chunk-YIFORJOH.js";
import "./chunk-LVSXM33L.js";
import "./chunk-BOBOXSTA.js";
import "./chunk-OIKQAWUL.js";
import "./chunk-CU3XQVQH.js";
import "./chunk-SGB44JKK.js";
import "./chunk-7PBTDHXN.js";
import "./chunk-N47CRN2R.js";
import "./chunk-TBXAAYTX.js";
import "./chunk-TQOJIZTD.js";
import "./chunk-QLVHKMJC.js";
import "./chunk-Z3LL2UKI.js";
import "./chunk-SGJ6KXAT.js";
import "./chunk-D3PLMWCT.js";
import {
  unescapeHTML
} from "./chunk-TKAJ2U4O.js";
import "./chunk-T3XDT7XS.js";
import {
  createComponent
} from "./chunk-WCU2ERWB.js";
import "./chunk-4Y5LE7TF.js";
import "./chunk-WUMPRUNK.js";
import "./chunk-HVNS5OQR.js";
import "./chunk-F2ZIT37G.js";
import "./chunk-CRB4AVPI.js";
import "./chunk-LHS7OVUF.js";
import "./chunk-O2CEHRFY.js";
import {
  init_define_globalThis_process_env,
  init_define_global_process_env,
  init_define_process_env
} from "./chunk-3EZRQDAS.js";

// node_modules/astro/dist/assets/runtime.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();
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
