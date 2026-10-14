import { createRequire } from 'module';const require = createRequire(import.meta.url);

// node_modules/astro/dist/runtime/server/render/astro/head-and-content.js
var headAndContentSym = /* @__PURE__ */ Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
  return typeof obj === "object" && obj !== null && !!obj[headAndContentSym];
}
function createHeadAndContent(head, content) {
  return {
    [headAndContentSym]: true,
    head,
    content
  };
}
function createThinHead() {
  return {
    [headAndContentSym]: true
  };
}

export {
  isHeadAndContent,
  createHeadAndContent,
  createThinHead
};
//# sourceMappingURL=chunk-NPI3L3SJ.js.map
