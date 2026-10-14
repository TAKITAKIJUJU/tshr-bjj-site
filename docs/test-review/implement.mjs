import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,s)=>fs.writeFileSync(p,s);
const edit=(p,fn)=>write(p,fn(read(p)));
const dir='src/components/test/';

// Native modal dialog keeps the background inert and out of sequential focus.
edit(dir+'Header.astro',s=>{
 s=s.replace('aria-label="Menu"','type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="mobile-menu" hidden');
 s=s.replace('<div class="mobile-menu" id="mobile-menu" aria-hidden="true">','<dialog class="mobile-menu" id="mobile-menu" aria-label="サイトメニュー" aria-modal="true" data-lenis-prevent>\n  <button type="button" class="menu-close" autofocus>閉じる ×</button>');
 const pos=s.indexOf('<script>');
 s=s.slice(0,pos).replace(/<\/div>\s*$/, '</dialog>\n<noscript><nav class="fallback-nav" aria-label="サイト内案内"><a href="/test/#concept">道場について</a><a href="/test/#system">料金</a><a href="/test/#schedule">予定</a><a href="/test/contact/">無料体験・見学</a></nav></noscript>\n')+s.slice(pos);
 s=s.replace(/<script>[\s\S]*?<\/script>/,`<script>
  const burger = document.querySelector<HTMLButtonElement>('#burger-btn');
  const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
  const header = document.querySelector<HTMLElement>('#header');
  if (burger && menu) {
    burger.hidden = false;
    let savedOverflow = '';
    const close = () => menu.close();
    burger.addEventListener('click', () => {
      savedOverflow = document.body.style.overflow;
      menu.showModal();
      menu.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('test-menu-state', { detail: true }));
      menu.querySelector<HTMLButtonElement>('.menu-close')?.focus();
    });
    menu.querySelector('.menu-close')?.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    menu.addEventListener('cancel', event => { event.preventDefault(); close(); });
    menu.addEventListener('close', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = savedOverflow;
      window.dispatchEvent(new CustomEvent('test-menu-state', { detail: false }));
      burger.focus({ preventScroll: true });
    });
    menu.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const items = Array.from(menu.querySelectorAll<HTMLElement>('button, a[href]'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 100);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
</script>`);
 s=s.replace('Contact</a>','Contact / 無料体験</a>');
 return s+`\n<style>
 .header__burger { min-width:44px; min-height:44px; justify-content:center; background:#141613b3; border-radius:4px; }
 .header__burger[hidden] { display:none; }
 .header.scrolled .header__burger span { background:#fff; }
 .mobile-menu { margin:0; padding:72px 24px 32px; width:100%; height:100dvh; max-width:none; max-height:none; border:0; overflow-y:auto; overscroll-behavior:contain; background:#ff6a00; color:#141613; justify-content:flex-start; gap:28px; }
 .mobile-menu:not([open]) { display:none; }
 .mobile-menu::backdrop { background:#ff6a00; }
 .mobile-menu__curtain { display:none; }
 .mobile-menu__nav { gap:8px; margin-block:auto; flex-shrink:0; }
 .mobile-menu__link, .mobile-menu__link--cta, .mobile-menu__footer a { color:#141613; }
 .mobile-menu__link { min-height:44px; display:flex; align-items:center; }
 .mobile-menu__link:hover, .mobile-menu__link:focus-visible, .mobile-menu__footer a:hover { color:#141613; text-decoration:underline; text-underline-offset:6px; }
 .mobile-menu__footer { position:relative; bottom:auto; flex-shrink:0; }
 .mobile-menu__footer a { font-size:13px; min-height:44px; display:flex; align-items:center; }
 .menu-close { position:absolute; right:24px; top:16px; border:1px solid currentColor; padding:8px 14px; min-height:44px; background:#ff6a00; color:#141613; z-index:2; cursor:pointer; }
 .fallback-nav { position:relative; display:flex; flex-wrap:wrap; gap:16px; padding:16px; background:#ff6a00; color:#141613; }
 .fallback-nav a { min-height:44px; display:flex; align-items:center; }
 @media (prefers-reduced-motion:reduce) { .mobile-menu__nav, .mobile-menu__link, .mobile-menu__footer { transition:none!important; transform:none!important; } }
</style>`;
});

// Keep visible content as the default: animation modules opt in after loading.
edit('src/styles/test.css',s=>s.replace(/@import url\([^\n]+\);/,'')+`
/* Test-only usability; production CSS is unchanged. */
:focus-visible { outline:3px solid #0753a1; outline-offset:4px; }
[hidden] { display:none!important; }
section[id] { scroll-margin-top:80px; }
input, select, textarea { scroll-margin-block:100px; }
.btn--primary:hover { color:#141613; }
.btn:hover { transform:translateY(-2px); }
.footer__links a, .footer__copy { color:#c4c4c4!important; }
.faq-item p { font-size:14px!important; }
.form__input, .form__select, .form__textarea { font-size:16px!important; }
@media (prefers-reduced-motion:reduce) {
 html { scroll-behavior:auto; }
 *, *::before, *::after { animation:none!important; transition:none!important; }
}
`);

// Normalize safety and packing guidance without inventing operating rules.
edit(dir+'v2/Concept.astro',s=>s
 .replace('ブラジリアン柔術は打撃がなく安全性が高いため、老若男女問わず何歳からでも始められる生涯スポーツです。本庄市で運動不足解消や護身術を始めたい方にも最適です。','ブラジリアン柔術は、パンチやキックなどの打撃を使わず、組み技を学ぶスポーツです。年齢や運動経験に合わせて、自分のペースで取り組めます。')
 .replace('打撃がなく安全な練習風景','組み技を学ぶ練習風景').replace('高い安全性','打撃のない組み技')
 .replace('パンチやキックなどの打撃が一切ないため、怪我のリスクが極めて低く、翌日の仕事や学業にも支障なく楽しめます。','打撃はありませんが、接触を伴うため怪我の可能性はあります。クラスでは受け身や基本動作から練習します。気になることは体験前にご相談ください。')
 .replace('力に頼らない護身術として女性にも大人気。シェイプアップや運動不足解消として楽しく汗を流す女性会員様も多数在籍しています。','力だけに頼らず、体の使い方を学びます。運動不足解消を目的に始めたい方も、参加するクラスや練習についてフォームやLINEでご相談ください。'));
edit(dir+'v2/Contact.astro',s=>s.replace('動きやすい服装でお越しいただければ、初心者の方も手ぶらで参加いただけます。','体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でもご相談いただけます。'));

// Shared test-only FAQ data prevents visible copy / JSON-LD drift.
const faq=[
 ['初めての柔術。どのクラスに参加すればよいですか？','ビギナー柔術の枠があります。クラスでは準備・マット運動、テクニック練習、実践練習を行います。初回に参加するクラスや内容は、運動経験とあわせてフォームやLINEでご相談ください。打撃はありませんが、接触を伴うため怪我の可能性はあります。'],
 ['仕事帰りに通える時間はありますか？','水・木曜19:00〜20:00、金曜18:00〜19:00にビギナー柔術があります。20:30〜22:00の夜間枠もあります。曜日ごとの内容は週間表をご覧ください。体験の参加枠は事前にご相談ください。'],
 ['キッズクラスの対象学年と、見学・送迎について教えてください。','キッズクラスは小学1〜6年生が対象です。挨拶や礼儀、基本動作も大切にしています。見学の希望、送迎時の出入りや保護者の待機については、お子さまの学年とあわせてお問い合わせください。'],
 ['体験の前に道着を購入する必要はありますか？','体験は動きやすい服装で参加できます。タオルと飲み物もご用意ください。道着の購入時期や選び方は入会時にご相談いただけます。'],
 ['女性が初めて参加するときは、どう相談できますか？','フォームまたはLINEから、参加したいクラスや練習で気になることをお知らせください。女性・中高生向けの料金区分があります。練習相手や初回の参加内容についても事前にご相談ください。'],
 ['車で通えますか？','無料駐車場があります。所在地は本庄市けや木1丁目1-16です。駐車位置や入口が分からない場合は、来場前にお問い合わせください。'],
 ['無料体験の持ち物は？日程が決まっていなくても相談できますか？','動きやすい服装・タオル・飲み物をご用意ください。希望日は任意なので、日程未定でも無料体験や見学についてご相談いただけます。'],
 ['経験者のビジター・出稽古はできますか？','ビジターは1回2,200円（税込）です。週間表にはオールレベル、NOGIなどのクラスがあります。出稽古の参加希望日や練習内容は、事前にフォームまたはLINEでご相談ください。']
];
fs.mkdirSync('src/data/test',{recursive:true});
write('src/data/test/faq.ts','export const faq = '+JSON.stringify(faq.map(([question,answer])=>({question,answer})),null,2)+' as const;\n');
edit(dir+'v2/Faq.astro',s=>s.replace(/---[\s\S]*?---/,"---\nimport { faq } from '../../../data/test/faq';\n---").replace(/<div class="faq-list[\s\S]*?\n    <\/div>/,`<div class="faq-list motion-up" data-motion-delay="0.1">
      {faq.map((item, index) => <details class="faq-item" open={index === 0}>
        <summary><span class="q-number">Q{index + 1}</span><span>{item.question}</span></summary>
        <p>{item.answer}</p>
      </details>)}
    </div>`));

// Build common entities from the current local schema; omit unconfirmed hours.
const old=read('src/layouts/Layout.astro');
const graph=JSON.parse(old.match(/<script is:inline type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const entities=graph.filter(e=>['SportsActivityLocation','Person','OfferCatalog','Course'].includes(e['@type']));
for(const e of entities){if(e['@type']==='SportsActivityLocation')delete e.openingHoursSpecification;}
write('src/data/test/entities.ts','// Snapshot of current local business information; Friday opening hours await confirmation.\nexport const entities = '+JSON.stringify(entities,null,2)+';\n');
write('src/layouts/TestLayout.astro',`---
import Header from '../components/test/Header.astro';
import { entities } from '../data/test/entities';
import { faq } from '../data/test/faq';
import '../styles/test.css';
interface Props { title?: string; description?: string; }
const { title = '本庄市のブラジリアン柔術ジム｜Over Limit 本庄【テスト版】', description = '本庄市の柔術道場 Over Limit 本庄。クラス・料金・週間スケジュールをご案内。体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でも相談できます。' } = Astro.props;
const home = Astro.url.pathname.replace(/\\/$/, '') === '/test';
const canonical = new URL(home ? '/test/' : '/test/contact/', Astro.site).href;
const base = new URL('/test/', Astro.site).href;
const webpage = { '@type': home ? 'WebPage' : 'ContactPage', '@id': canonical + '#webpage', url: canonical, name: title, description, inLanguage: 'ja', isPartOf: { '@id': base + '#website' }, about: { '@id': 'https://tshr-bjj.com/#sportsactivitylocation' } };
const schema = { '@context': 'https://schema.org', '@graph': [
 { '@type': 'WebSite', '@id': base + '#website', name: 'Over Limit 本庄 テスト版', url: base },
 ...entities.filter(e => home || ['SportsActivityLocation', 'Person'].includes(e['@type'])), webpage,
 ...(home ? [{ '@type': 'FAQPage', '@id': canonical + '#faq', mainEntity: faq.map(item=>({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] : []),
 { '@type': 'BreadcrumbList', itemListElement: [{ '@type':'ListItem', position:1, name:'テスト版ホーム', item:base }, ...(!home ? [{ '@type':'ListItem', position:2, name:'無料体験・お問い合わせ', item:canonical }] : [])] }
] };
---
<!doctype html>
<html lang="ja">
 <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="form-action 'none'; connect-src 'self' ws://127.0.0.1:* ws://localhost:*" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="format-detection" content="telephone=no" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <link rel="icon" type="image/png" href="/LOGO.png" />
  <meta property="og:site_name" content="Over Limit 本庄 テスト版" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content="https://tshr-bjj.com/LOGO.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="1200" />
  <meta property="og:image:alt" content="Over Limit 本庄 ロゴ" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://tshr-bjj.com/LOGO.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,800&amp;family=Inter:wght@400;600;700;800;900&amp;family=Inter+Tight:wght@600;700;800&amp;family=Noto+Sans+JP:wght@400;500;600;700;800;900&amp;family=Noto+Serif+JP:wght@900&amp;display=swap" rel="stylesheet" />
  {home && <link rel="preload" as="image" href="/test/hero-poster.webp" />}
  <script is:inline type="application/ld+json" set:html={JSON.stringify(schema).replace(/</g, '\\u003c')} />
 </head>
 <body>
  <a class="skip-link" href="#main-content">本文へ移動</a>
  <Header />
  <slot />
 </body>
</html>
<style>
 .skip-link { position:fixed; top:8px; left:8px; z-index:1005; padding:12px; background:white; color:#141613; transform:translateY(-160%); }
 .skip-link:focus { transform:none; }
</style>
`);
for(const f of ['index','contact'])edit('src/pages/test/'+f+'.astro',s=>s.replace('<main','<main id="main-content" tabindex="-1"'));
console.log('Test-only menu, copy, FAQ, styles and metadata implemented.');
