import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  createRenderInstruction
} from "./chunk-I5NBNXIQ.js";

// node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

export {
  renderScript
};
//# sourceMappingURL=chunk-VURVHRW5.js.map
