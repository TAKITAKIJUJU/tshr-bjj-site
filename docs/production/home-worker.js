// Published home pages, contact and sitemap share their versioned static assets.
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
