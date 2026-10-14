import { createRequire } from 'module';const require = createRequire(import.meta.url);

// node_modules/astro/dist/runtime/server/render/instruction.js
var RenderInstructionSymbol = /* @__PURE__ */ Symbol.for("astro:render");
function createRenderInstruction(instruction) {
  return Object.defineProperty(instruction, RenderInstructionSymbol, {
    value: true
  });
}
function isRenderInstruction(chunk) {
  return chunk && typeof chunk === "object" && chunk[RenderInstructionSymbol];
}

export {
  createRenderInstruction,
  isRenderInstruction
};
//# sourceMappingURL=chunk-I5NBNXIQ.js.map
