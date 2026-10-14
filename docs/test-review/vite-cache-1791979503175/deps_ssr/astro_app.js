import {
  BaseApp,
  createAssetLink,
  createConsoleLogger,
  createModuleScriptElement,
  createStylesheetElementSet
} from "./chunk-DFX75V7S.js";
import {
  Pipeline,
  RedirectSinglePageBuiltModule,
  findRouteToRewrite
} from "./chunk-7A452WV7.js";
import "./chunk-DNHHXHQZ.js";
import "./chunk-ER2OQ25F.js";
import "./chunk-G7HZYZ3N.js";
import "./chunk-XWTYLBDF.js";
import "./chunk-CYE2NQMU.js";
import "./chunk-JLUGJAVZ.js";
import {
  deserializeManifest,
  deserializeRouteData,
  deserializeRouteInfo,
  serializeRouteData,
  serializeRouteInfo
} from "./chunk-MQYXNANY.js";
import "./chunk-XVCZVGHE.js";
import "./chunk-W33XYA4D.js";
import "./chunk-NBK6WQWH.js";
import "./chunk-4Y2RXR2S.js";
import "./chunk-7UDXSGXE.js";
import "./chunk-ZC7PT6IH.js";
import "./chunk-RJEP4CXK.js";
import "./chunk-NBARY4P4.js";
import "./chunk-PA3V3SGF.js";
import "./chunk-S7AOVLG7.js";
import "./chunk-3C433ACU.js";
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
import "./chunk-TKAJ2U4O.js";
import "./chunk-T3XDT7XS.js";
import "./chunk-WCU2ERWB.js";
import "./chunk-4Y5LE7TF.js";
import "./chunk-WUMPRUNK.js";
import "./chunk-HVNS5OQR.js";
import {
  getFallbackRoute,
  routeIsFallback,
  routeIsRedirect
} from "./chunk-KKU7Y5ZM.js";
import "./chunk-EMZXO6WD.js";
import "./chunk-7SLAHIFZ.js";
import "./chunk-F2ZIT37G.js";
import "./chunk-J7SVXC7J.js";
import "./chunk-CRB4AVPI.js";
import "./chunk-LHS7OVUF.js";
import "./chunk-O2CEHRFY.js";
import {
  init_define_globalThis_process_env,
  init_define_global_process_env,
  init_define_process_env
} from "./chunk-3EZRQDAS.js";

// node_modules/astro/dist/core/app/entrypoints/index.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();

// node_modules/astro/dist/core/app/app.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();

// node_modules/astro/dist/core/app/pipeline.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();
var AppPipeline = class _AppPipeline extends Pipeline {
  getName() {
    return "AppPipeline";
  }
  static create({ manifest, streaming }) {
    const resolve = async function resolve2(specifier) {
      if (!(specifier in manifest.entryModules)) {
        throw new Error(`Unable to resolve [${specifier}]`);
      }
      const bundlePath = manifest.entryModules[specifier];
      if (bundlePath.startsWith("data:") || bundlePath.length === 0) {
        return bundlePath;
      } else {
        return createAssetLink(bundlePath, manifest.base, manifest.assetsPrefix);
      }
    };
    const logger = createConsoleLogger(manifest.logLevel);
    const pipeline = new _AppPipeline(
      logger,
      manifest,
      "production",
      manifest.renderers,
      resolve,
      streaming,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0
    );
    return pipeline;
  }
  async headElements(routeData) {
    const { assetsPrefix, base } = this.manifest;
    const routeInfo = this.manifest.routes.find(
      (route) => route.routeData.route === routeData.route
    );
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script, base, assetsPrefix));
      }
    }
    return { links, styles, scripts };
  }
  componentMetadata() {
  }
  async getComponentByRoute(routeData) {
    const module = await this.getModuleForRoute(routeData);
    return module.page();
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance)
        };
      }
    }
    let routeToProcess = route;
    if (routeIsRedirect(route)) {
      if (route.redirectRoute) {
        routeToProcess = route.redirectRoute;
      } else {
        return RedirectSinglePageBuiltModule;
      }
    } else if (routeIsFallback(route)) {
      routeToProcess = getFallbackRoute(route, this.manifest.routes);
    }
    if (this.manifest.pageMap) {
      const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
      if (!importComponentInstance) {
        throw new Error(
          `Unexpectedly unable to find a component instance for route ${route.route}`
        );
      }
      return await importComponentInstance();
    } else if (this.manifest.pageModule) {
      return this.manifest.pageModule;
    }
    throw new Error(
      "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
    );
  }
  async tryRewrite(payload, request) {
    const { newUrl, pathname, routeData } = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r) => r.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base,
      outDir: this.manifest?.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
    });
    const componentInstance = await this.getComponentByRoute(routeData);
    return { newUrl, pathname, componentInstance, routeData };
  }
};

// node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
  createPipeline(streaming) {
    return AppPipeline.create({
      manifest: this.manifest,
      streaming
    });
  }
  isDev() {
    return false;
  }
  // Should we log something for our users?
  logRequest(_options) {
  }
};

// node_modules/astro/dist/core/app/common.js
init_define_global_process_env();
init_define_globalThis_process_env();
init_define_process_env();
function toRoutingStrategy(routing, domains) {
  let strategy;
  const hasDomains = domains ? Object.keys(domains).length > 0 : false;
  if (routing === "manual") {
    strategy = "manual";
  } else {
    if (!hasDomains) {
      if (routing?.prefixDefaultLocale === true) {
        if (routing.redirectToDefaultLocale) {
          strategy = "pathname-prefix-always";
        } else {
          strategy = "pathname-prefix-always-no-redirect";
        }
      } else {
        strategy = "pathname-prefix-other-locales";
      }
    } else {
      if (routing?.prefixDefaultLocale === true) {
        if (routing.redirectToDefaultLocale) {
          strategy = "domains-prefix-always";
        } else {
          strategy = "domains-prefix-always-no-redirect";
        }
      } else {
        strategy = "domains-prefix-other-locales";
      }
    }
  }
  return strategy;
}
var PREFIX_DEFAULT_LOCALE = /* @__PURE__ */ new Set([
  "pathname-prefix-always",
  "domains-prefix-always",
  "pathname-prefix-always-no-redirect",
  "domains-prefix-always-no-redirect"
]);
var REDIRECT_TO_DEFAULT_LOCALE = /* @__PURE__ */ new Set([
  "pathname-prefix-always-no-redirect",
  "domains-prefix-always-no-redirect"
]);
function fromRoutingStrategy(strategy, fallbackType) {
  let routing;
  if (strategy === "manual") {
    routing = "manual";
  } else {
    routing = {
      prefixDefaultLocale: PREFIX_DEFAULT_LOCALE.has(strategy),
      redirectToDefaultLocale: !REDIRECT_TO_DEFAULT_LOCALE.has(strategy),
      fallbackType
    };
  }
  return routing;
}
export {
  App,
  AppPipeline,
  BaseApp,
  createConsoleLogger,
  deserializeManifest,
  deserializeRouteData,
  deserializeRouteInfo,
  fromRoutingStrategy,
  serializeRouteData,
  serializeRouteInfo,
  toRoutingStrategy
};
//# sourceMappingURL=astro_app.js.map
