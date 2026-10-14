import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  BaseApp,
  createAssetLink,
  createConsoleLogger,
  createModuleScriptElement,
  createStylesheetElementSet
} from "./chunk-I56HUCB7.js";
import {
  Pipeline,
  RedirectSinglePageBuiltModule,
  findRouteToRewrite
} from "./chunk-6ONT6VNK.js";
import "./chunk-OJL7ZSKZ.js";
import "./chunk-EIFJB3GY.js";
import "./chunk-RFFWJ2S2.js";
import "./chunk-ZPYSSXXP.js";
import {
  deserializeManifest,
  deserializeRouteData,
  deserializeRouteInfo,
  serializeRouteData,
  serializeRouteInfo
} from "./chunk-3DLDURHW.js";
import "./chunk-J3W2YEC4.js";
import "./chunk-C33D7DX5.js";
import "./chunk-AKUOIC2D.js";
import "./chunk-L472YQS2.js";
import "./chunk-VURVHRW5.js";
import "./chunk-BVIQUZKK.js";
import "./chunk-F6Z4K3FU.js";
import "./chunk-JB6KJWD7.js";
import "./chunk-KY6USHSR.js";
import "./chunk-V27M4QV7.js";
import "./chunk-LCELFPLE.js";
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
import "./chunk-M2Q52ZGU.js";
import "./chunk-6QQ5WPQJ.js";
import "./chunk-DC2IXCQX.js";
import "./chunk-SLXZAAKE.js";
import "./chunk-Y6EWT2OD.js";
import "./chunk-FXOFAG73.js";
import {
  getFallbackRoute,
  routeIsFallback,
  routeIsRedirect
} from "./chunk-A6YVJ4GZ.js";
import "./chunk-7WAXXR62.js";
import "./chunk-2LHQL2PB.js";
import "./chunk-JGEFHKSF.js";
import "./chunk-QBIV76BD.js";
import "./chunk-ULKKSWDQ.js";
import "./chunk-3Q6YGEKV.js";
import "./chunk-WHJZQVMP.js";
import "./chunk-6ROVVSDV.js";

// node_modules/astro/dist/core/app/pipeline.js
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
