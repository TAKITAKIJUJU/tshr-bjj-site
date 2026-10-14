import {
  a11y
} from "./chunk-CEI3HFNQ.js";
import {
  perf
} from "./chunk-ABZAUEOF.js";
import {
  settings
} from "./chunk-TAU37ZTE.js";
import {
  init_define_globalThis_process_env,
  init_define_global_process_env,
  init_define_process_env
} from "./chunk-3EZRQDAS.js";

// node_modules/astro/dist/runtime/client/dev-toolbar/apps/audit/rules/index.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();
var rulesCategories = [
  { code: "a11y", name: "Accessibility", icon: "person-arms-spread", rules: a11y },
  { code: "perf", name: "Performance", icon: "gauge", rules: perf }
];
var dynamicAuditRuleKeys = ["title", "message", "description"];
function resolveAuditRule(rule, element) {
  let resolved = { ...rule };
  for (const key of dynamicAuditRuleKeys) {
    const value = rule[key];
    if (typeof value === "string") continue;
    try {
      if (!value) {
        resolved[key] = "";
        continue;
      }
      resolved[key] = value(element);
    } catch (err) {
      settings.logger.error(`Error resolving dynamic audit rule ${rule.code}'s ${key}: ${err}`);
      resolved[key] = "Error resolving dynamic rule";
    }
  }
  return resolved;
}
function getAuditCategory(rule) {
  return rule.code.split("-")[0];
}
var categoryLabel = {
  perf: "performance",
  a11y: "accessibility"
};

export {
  rulesCategories,
  resolveAuditRule,
  getAuditCategory,
  categoryLabel
};
//# sourceMappingURL=chunk-ND6PSKWC.js.map
