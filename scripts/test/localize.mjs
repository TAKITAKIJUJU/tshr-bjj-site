import * as parse5 from 'parse5';
import {translations, localePaths, localeNames, htmlLang} from '../../src/data/test/translations.js';
import {faqByLocale} from '../../src/data/test/faq-content.js';

export const locales = ['ja', 'en', 'pt', 'gunma'];
export const localeBase = locale => '/test/' + (localePaths[locale] ? localePaths[locale] + '/' : '');
const get = (node, key) => node.attrs?.find(attr => attr.name === key)?.value;
const set = (node, key, value) => {
  const attr = node.attrs?.find(item => item.name === key);
  if (attr) attr.value = value;
  else (node.attrs ??= []).push({name:key, value});
};
const remove = (node, key) => { node.attrs = node.attrs?.filter(attr => attr.name !== key); };
const hasClass = (node, name) => get(node, 'class')?.split(/\s+/).includes(name);
const text = (value, parentNode) => ({nodeName:'#text', value, parentNode});

// Shared by the normal build and the test-only asset packager.
// Only DOM text and supported metadata are translated; executable scripts/styles are opaque.
export function localizeTestHtml(html, locale, {contact = false, dictionary = translations, faqData = faqByLocale} = {}) {
  if (!locales.includes(locale)) throw new Error('Unknown test locale: ' + locale);
  const doc = parse5.parse(html, {scriptingEnabled:false});
  const t = value => locale === 'ja' ? value : dictionary[value]?.[locale] ?? value;
  const base = localeBase(locale);
  const canonical = 'https://tshr-bjj.com' + base + (contact ? 'contact/' : '');
  const pageHref = href => {
    if (!href?.startsWith('/test/')) return href;
    const match = href.match(/^\/test\/(?:(?:english|portugues|gunma)\/)?(contact\/?)?([?#].*)?$/);
    return match ? base + (match[1] ? 'contact/' : '') + (match[2] ?? '') : href;
  };
  function schema(node) {
    const value = JSON.parse(node.childNodes.map(item => item.value ?? '').join(''));
    for (const entity of value['@graph'] ?? []) {
      if (entity['@type'] === 'WebSite') {
        entity['@id'] = 'https://tshr-bjj.com' + base + '#website';
        entity.url = 'https://tshr-bjj.com' + base;
        entity.name = t(entity.name);
      }
      if (['WebPage', 'ContactPage'].includes(entity['@type'])) {
        entity['@id'] = canonical + '#webpage'; entity.url = canonical;
        entity.name = t(entity.name); entity.description = t(entity.description);
        entity.inLanguage = htmlLang[locale];
        entity.isPartOf = {'@id':'https://tshr-bjj.com' + base + '#website'};
      }
      if (entity['@type'] === 'FAQPage') {
        entity['@id'] = canonical + '#faq'; entity.inLanguage = htmlLang[locale];
        entity.mainEntity = faqData[locale].map(item => ({'@type':'Question', name:item.question,
          acceptedAnswer:{'@type':'Answer', text:item.answer}}));
      }
      if (entity['@type'] === 'BreadcrumbList') {
        for (const item of entity.itemListElement) {
          item.name = t(item.name);
          if (item.item?.startsWith('https://tshr-bjj.com/test/')) item.item = 'https://tshr-bjj.com' + pageHref(new URL(item.item).pathname);
        }
      }
    }
    // Contact never receives the home FAQ.
    if (contact) value['@graph'] = value['@graph'].filter(entity => entity['@type'] !== 'FAQPage');
    node.childNodes = [text(JSON.stringify(value).replace(/</g, '\\u003c'), node)];
  }
  function visit(node, skip = false) {
    const tag = node.tagName;
    if (tag === 'script') {
      if (get(node, 'type') === 'application/ld+json') schema(node);
      return;
    }
    if (tag === 'style') return;
    if (tag === 'html') set(node, 'lang', htmlLang[locale]);
    if (tag === 'link' && get(node, 'rel') === 'canonical') set(node, 'href', canonical);
    if (tag === 'meta') {
      const property = get(node, 'property');
      if (property === 'og:url') set(node, 'content', canonical);
      if (property === 'og:locale') set(node, 'content', locale === 'pt' ? 'pt_BR' : locale === 'en' ? 'en_US' : 'ja_JP');
      if (['description','twitter:title','twitter:description','twitter:image:alt'].includes(get(node,'name')) ||
          ['og:title','og:description','og:site_name','og:image:alt'].includes(property)) set(node, 'content', t(get(node,'content')));
    }
    if (!skip) for (const attr of node.attrs ?? []) {
      if (['alt','aria-label','title','placeholder'].includes(attr.name)) attr.value = t(attr.value);
    }
    if (tag === 'a') {
      const target = get(node,'data-language');
      if (target && locales.includes(target)) {
        set(node, 'href', localeBase(target) + (contact ? 'contact/' : ''));
        remove(node,'aria-current');
        if (target === locale) set(node,'aria-current','page');
      } else if (get(node,'href')) set(node,'href',pageHref(get(node,'href')));
    }
    if (tag === 'form' && get(node,'action')) set(node,'action',pageHref(get(node,'action')));
    if (hasClass(node,'language-current')) { node.childNodes = [text(localeNames[locale],node)]; return; }
    if (get(node,'data-review-source')) {
      const source = get(node,'data-review-source');
      const same = source === locale || source === 'ja' && locale === 'gunma';
      if (same) set(node,'hidden',''); else remove(node,'hidden');
      const label = locale === 'en' ? `Translated from ${source === 'ja' ? 'Japanese' : 'Portuguese'}` :
        locale === 'pt' ? 'Tradução do japonês' : '※ポルトガル語からの翻訳';
      node.childNodes = [text(label,node)]; return;
    }
    if (hasClass(node,'hero__vert-text')) {
      if (locale === 'en' || locale === 'pt') {
        const lines = locale === 'en' ? ['Enrich your life through','jiu-jitsu in Honjo.'] : ['Transforme sua vida com o','jiu-jitsu em Honjo.'];
        set(node,'class',(get(node,'class') ?? '').split(/\s+/).filter(c=>c !== 'hero__translated').concat('hero__translated').join(' '));
        set(node,'aria-label',lines.join(' '));
        node.childNodes = lines.flatMap((line,index) => [...line].map(char => {
          const span = {nodeName:'span', tagName:'span', attrs:[{name:'class',value:'hero__char'},{name:'aria-hidden',value:'true'}], namespaceURI:'http://www.w3.org/1999/xhtml', childNodes:[],parentNode:node};
          if (char === ' ') span.attrs.push({name:'style', value:'white-space:pre-wrap'});
          span.childNodes = [text(char,span)]; return span;
        }).concat(index === 0 ? [{nodeName:'br',tagName:'br',attrs:[],namespaceURI:'http://www.w3.org/1999/xhtml',childNodes:[],parentNode:node}] : []));
      }
      return;
    }
    if (node.nodeName === '#text' && !skip) {
      const match = node.value.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (match) node.value = match[1] + t(match[2].replace(/\r\n/g,'\n')) + match[3];
    }
    const nextSkip = skip || tag === 'svg' || hasClass(node,'language-picker') || locale === 'gunma' && hasClass(node,'review-body');
    for (const child of node.childNodes ?? []) visit(child,nextSkip);
  }
  visit(doc);
  return parse5.serialize(doc);
}
