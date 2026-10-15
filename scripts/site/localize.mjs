import * as parse5 from 'parse5';
import {localizeTestHtml, locales} from '../test/localize.mjs';
import {localePaths, translations} from '../../src/data/site/translations.js';
import {faqByLocale} from '../../src/data/site/faq-content.js';
export {locales};
export const siteBase = locale => '/' + (localePaths[locale] ? localePaths[locale] + '/' : '');
const titles = {
  ja:'本庄市のブラジリアン柔術ジム｜Over Limit 本庄',
  en:'Brazilian Jiu-Jitsu in Honjo | Over Limit Honjo',
  pt:'Jiu-Jitsu Brasileiro em Honjo | Over Limit Honjo',
  gunma:'本庄の柔術道場｜Over Limit 本庄'
};
const descriptions = {
  ja:'本庄駅徒歩6分・無料駐車場完備のブラジリアン柔術ジム「Over Limit 本庄」。世界大会王者が直接指導。未経験・初心者・女性・キッズ大歓迎！クラス・料金・見学無料体験をご案内。',
  en:'Over Limit Honjo is a Brazilian Jiu-Jitsu academy in Honjo, Saitama (6 min walk from Honjo Station, free parking). Led by a world champion black belt. Beginners, women, and kids welcome! Free trial available.',
  pt:'Over Limit Honjo: academia de Jiu-Jitsu Brasileiro em Honjo, Saitama (a 6 min da estação de Honjo, estacionamento gratuito). Sob a liderança de um campeão mundial faixa-preta. Iniciantes, mulheres e crianças são bem-vindos! Aula experimental gratuita.',
  gunma:'本庄駅徒歩6分・無料駐車場完備のブラジリアン柔術道場「Over Limit 本庄」。世界王者が直々に教えるで！初心者も子どもも大歓迎。まずは無料体験してみるんべ！'
};
const locationDescriptions = {
  ja:'本庄駅徒歩6分・無料駐車場完備。本庄市のブラジリアン柔術道場「Over Limit 本庄」。初心者・女性・キッズ大歓迎。世界大会王者（黒帯3段）が直接指導。見学・無料体験受付中。',
  en:'Brazilian Jiu-Jitsu academy in Honjo, Saitama (6 min walk from Honjo Station, free parking). Led by a world champion black belt. Beginners, women, and kids welcome! Free trials available.',
  pt:'Academia de Jiu-Jitsu Brasileiro em Honjo, Saitama (a 6 min da estação de Honjo, estacionamento gratuito). Sob a liderança de um campeão mundial faixa-preta. Iniciantes, mulheres e crianças são bem-vindos! Aulas experimentais disponíveis.',
  gunma:'本庄駅徒歩6分・無料駐車場完備。本庄市のブラジリアン柔術道場「Over Limit 本庄」。初心者・女性・キッズ大歓迎。世界王者が直接指導するで！見学・無料体験受付中。'
};
const get = (n,k) => n.attrs?.find(a=>a.name===k)?.value;
const set = (n,k,v) => {const a=n.attrs?.find(a=>a.name===k);if(a)a.value=v;else(n.attrs??=[]).push({name:k,value:v});};
const walk = n => [n,...(n.childNodes??[]).flatMap(walk)];

// Share the verified text translation, while keeping publication metadata and routes explicit.
export function localizeSiteHtml(html, locale) {
  const doc = parse5.parse(localizeTestHtml(html, locale, {dictionary:translations,faqData:faqByLocale}), {scriptingEnabled:false});
  const base=siteBase(locale), canonical='https://tshr-bjj.com'+base;
  const convert = value => value.replace(/https:\/\/tshr-bjj\.com\/test\//g,'https://tshr-bjj.com/');
  function schema(value) {
    if(Array.isArray(value))return value.map(schema);
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,schema(v)]));
    return typeof value==='string'?convert(value):value;
  }
  for(const node of walk(doc)) {
    if(node.tagName==='title')node.childNodes=[{nodeName:'#text',value:titles[locale],parentNode:node}];
    if(node.tagName==='meta') {
      const name=get(node,'name'), property=get(node,'property');
      if(name==='robots')set(node,'content',locale==='gunma'?'noindex, follow':'index, follow');
      if(name==='twitter:title'||property==='og:title')set(node,'content',titles[locale]);
      if(name==='description'||name==='twitter:description'||property==='og:description')set(node,'content',descriptions[locale]);
      if(property==='og:site_name')set(node,'content',locale==='en'||locale==='pt'?'Over Limit Honjo':'Over Limit 本庄');
      if(property==='og:url')set(node,'content',canonical);
      if(property==='og:locale')set(node,'content',locale==='en'?'en_US':locale==='pt'?'pt_BR':'ja_JP');
    }
    if(node.tagName==='link'&&get(node,'rel')==='canonical')set(node,'href',canonical);
    if(node.tagName==='a') {
      const language=get(node,'data-language'), href=get(node,'href');
      if(language)set(node,'href',siteBase(language));
      else if(href?.match(/^\/(?:test\/)?(?:(?:english|portugues|gunma)\/)?contact\/?(?:[?#].*)?$/))set(node,'href','/contact/');
      else if(href?.match(/^\/(?:test\/)?(?:[?#].*)?$/))set(node,'href',base+href.replace(/^\/(?:test\/)?/,''));
    }
    if(node.tagName==='script'&&get(node,'type')==='application/ld+json') {
      const graph=schema(JSON.parse(node.childNodes.map(n=>n.value??'').join('')));
      for(const entity of graph['@graph']??[]) {
        if(entity['@type']==='WebPage') {
          entity.name=titles[locale];
          entity.description=descriptions[locale];
          entity.url=canonical;
          entity.inLanguage=locale==='pt'?'pt-BR':locale;
        }
        if(entity['@type']==='WebSite')entity.name=locale==='en'||locale==='pt'?'Over Limit Honjo':'Over Limit 本庄';
        if(entity['@type']==='SportsActivityLocation') {
          if(locale==='en'||locale==='pt') {
            entity.name='Over Limit Honjo';
            entity.description=locationDescriptions[locale];
          }
        }
        if(entity['@type']==='BreadcrumbList')for(const item of entity.itemListElement)item.name=locale==='en'?'Home':locale==='pt'?'Início':'ホーム';
      }
      node.childNodes=[{nodeName:'#text',value:JSON.stringify(graph).replace(/</g,'\\u003c'),parentNode:node}];
    }
  }
  const head=walk(doc).find(n=>n.tagName==='head');
  head.childNodes=head.childNodes.filter(n=>!(n.tagName==='link'&&get(n,'rel')==='alternate'&&get(n,'hreflang')));
  if(locale!=='gunma') {
    for(const [language,code] of [['ja','ja'],['en','en'],['pt','pt-BR'],['ja','x-default']]) {
      head.childNodes.push({nodeName:'link',tagName:'link',namespaceURI:'http://www.w3.org/1999/xhtml',attrs:[{name:'rel',value:'alternate'},{name:'hreflang',value:code},{name:'href',value:'https://tshr-bjj.com'+siteBase(language)}],childNodes:[],parentNode:head});
    }
  }
  return parse5.serialize(doc);
}
export function generateSiteTranslations(buildRoot) {
  // Imported lazily by the build entry point; contact is deliberately never generated here.
  return import('node:fs').then(({default:fs})=>import('node:path').then(({default:path})=>{
    const source=path.join(buildRoot,'index.html');
    if(!fs.existsSync(source))return;
    const html=fs.readFileSync(source,'utf8');
    for(const locale of locales){const target=path.join(buildRoot,siteBase(locale),'index.html');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,localizeSiteHtml(html,locale));}
  }));
}
