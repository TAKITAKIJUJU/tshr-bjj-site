// Home and locale routes only. The existing production Worker continues serving /contact/.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (/^\/(english|portugues|gunma)\/contact\/?$/.test(url.pathname)) {
      url.pathname='/contact/';
      return Response.redirect(url,308);
    }
    if (/^\/(english|portugues|gunma)$/.test(url.pathname)) {
      url.pathname+='/';
      return Response.redirect(url,308);
    }
    return env.ASSETS.fetch(request);
  }
};
