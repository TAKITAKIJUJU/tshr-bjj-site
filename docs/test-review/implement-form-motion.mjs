import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const edit=(p,fn)=>fs.writeFileSync(p,fn(read(p)));
const path='src/pages/test/contact.astro';
edit(path,s=>{
 s=s.replace('無料体験予約・お問い合わせ｜Over Limit 本庄（本庄市）','無料体験・見学の相談｜Over Limit 本庄【テスト版】').replace('手ぶら・動きやすい服装でお気軽にお越しください。','体験には動きやすい服装・タオル・飲み物をご用意ください。日程未定でも相談できます。このページでは実際の送信・予約は行いません。');
 s=s.replace('<h1 class="section-title">お問い合わせ</h1>','<h1 class="section-title">無料体験・見学の相談</h1>');
 s=s.replace(/<form [\s\S]*?<\/form>/,`<p class="test-notice" id="test-notice"><strong>テストフォーム</strong><br />この画面では実際の送信・予約は行いません。個人情報ではなく、架空の情報でお試しください。</p>
            <form id="trial-form" action="/test/contact/" method="dialog" class="form" novalidate aria-describedby="test-notice">
              <div class="form__group">
                <label for="name" class="form__label">お名前 <span class="form__required">必須</span></label>
                <input type="text" id="name" name="name" class="form__input" autocomplete="name" maxlength="100" required aria-describedby="name-error" />
                <p class="field-error" id="name-error"></p>
              </div>
              <div class="form__group">
                <label for="email" class="form__label">メールアドレス <span class="form__required">必須</span></label>
                <input type="email" id="email" name="email" class="form__input" autocomplete="email" inputmode="email" maxlength="254" required aria-describedby="email-error" />
                <p class="field-error" id="email-error"></p>
              </div>
              <div class="form__group">
                <label for="tel" class="form__label">電話番号（任意）</label>
                <input type="tel" id="tel" name="tel" class="form__input" autocomplete="tel" inputmode="tel" maxlength="30" />
              </div>
              <div class="form__group">
                <label for="type" class="form__label">お問い合わせ項目 <span class="form__required">必須</span></label>
                <select id="type" name="type" class="form__select" required aria-describedby="type-error">
                  <option value="trial">無料体験の相談</option>
                  <option value="visit">見学の相談</option>
                  <option value="join">入会に関する相談</option>
                  <option value="other">その他</option>
                </select>
                <p class="field-error" id="type-error"></p>
              </div>
              <fieldset id="trial-options">
                <legend>体験・見学のご希望（任意）</legend>
                <p class="form-help">日程未定のままでもご相談いただけます。希望日の入力だけでは予約は確定しません。</p>
                <div class="form__group">
                  <label for="preferred-date" class="form__label">希望日（任意）</label>
                  <input type="date" id="preferred-date" name="preferred-date" class="form__input" />
                </div>
                <div class="form__group">
                  <label for="participant" class="form__label">参加区分（任意）</label>
                  <select id="participant" name="participant" class="form__select">
                    <option value="">未定・相談したい</option><option>大人</option><option>中高生</option><option>キッズ（小学1〜6年生）</option>
                  </select>
                </div>
              </fieldset>
              <div class="form__group">
                <label for="message" class="form__label">ご質問・補足（任意）</label>
                <textarea id="message" name="message" class="form__textarea" rows="4" maxlength="2000" placeholder="希望する時間帯、運動経験、気になることなど。体験・見学は空欄でも進めます。"></textarea>
              </div>
              <div class="form__group">
                <label for="mock-result" class="form__label">テスト結果</label>
                <select id="mock-result" class="form__select"><option value="success">成功表示を試す</option><option value="failure">失敗表示を試す</option></select>
              </div>
              <div class="form__footer">
                <button id="mock-submit" type="button" class="btn btn--primary w-full" disabled>入力を確認してテストする</button>
                <p class="form__privacy">入力内容は送信・保存しません。実際のお申し込みではありません。</p>
                <noscript><p>JavaScriptが無効のためモック動作は利用できません。入力内容は送信されません。</p></noscript>
              </div>
              <p id="form-status" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"></p>
            </form>`);
 s=s.replace('友達追加後、メッセージをお送りください。','LINEリンクは実際の相談先につながります。テスト確認中はメッセージを送らないでください。');
 s=s.replace(/<img src="https:\/\/upload.wikimedia[^>]+\/>/,'<span aria-hidden="true">LINE</span>');
 s=s.replace(/<script>[\s\S]*?<\/script>/,`<script>
  import { initContactMotion } from '../../scripts/test/motion';
  initContactMotion();
  const form = document.querySelector<HTMLFormElement>('#trial-form');
  const button = document.querySelector<HTMLButtonElement>('#mock-submit');
  const status = document.querySelector<HTMLElement>('#form-status');
  const type = document.querySelector<HTMLSelectElement>('#type');
  const options = document.querySelector<HTMLFieldSetElement>('#trial-options');
  if (form && button && status && type && options) {
    button.disabled = false;
    const syncType = () => { options.hidden = !['trial', 'visit'].includes(type.value); options.disabled = options.hidden; };
    type.addEventListener('change', syncType);
    syncType();
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', event => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement) {
        field.removeAttribute('aria-invalid');
        const error = document.getElementById(field.id + '-error');
        if (error) error.textContent = '';
      }
      status.textContent = '';
    });
    button.addEventListener('click', () => {
      let firstInvalid: HTMLInputElement | HTMLSelectElement | undefined;
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[required]').forEach(field => {
        const invalid = !field.value.trim() || !field.validity.valid;
        field.setAttribute('aria-invalid', String(invalid));
        const error = document.getElementById(field.id + '-error');
        if (error) error.textContent = invalid ? (field.id === 'email' ? 'メールアドレスを正しい形式で入力してください。' : 'この項目を入力してください。') : '';
        if (invalid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { status.textContent = '入力に誤りがあります。表示された項目をご確認ください。送信は行っていません。'; firstInvalid.focus(); return; }
      const result = document.querySelector<HTMLSelectElement>('#mock-result')?.value;
      status.dataset.result = result;
      status.textContent = result === 'failure'
        ? 'テスト：送信失敗時の表示です。入力はこの画面に残っています。実際の送信・予約は行っていません。'
        : 'テスト：成功時の表示です。入力確認が完了しました。実際の送信・受信・予約は行っていません。';
      status.focus();
    });
  }
</script>`);
 // Pages are nested; scripts live under src/scripts/test.
 s=s.replace("'../../scripts/test/motion'","'../../scripts/test/motion'");
 return s+`\n<style>
  .test-notice { border-left:4px solid #ff6a00; padding:12px 16px; background:#fff4ec; margin-bottom:28px; font-size:14px; }
  .form__required { color:#141613; }
  .form-help { font-size:14px; color:#4a4a4a; margin-bottom:20px; }
  fieldset { border:0; padding:0; min-width:0; }
  legend { font-weight:700; margin-bottom:12px; }
  .field-error { color:#a11919; font-size:14px; margin-top:6px; }
  [aria-invalid="true"] { border:2px solid #a11919; }
  #form-status:not(:empty) { margin-top:24px; padding:16px; border:1px solid #58634c; background:#f4f4ee; }
  #form-status[data-result="failure"] { border-color:#a11919; }
  .line-btn { color:#141613; }
  .form__select { padding-right:42px; }
  button:disabled { opacity:.6; cursor:not-allowed; }
  @media(max-width:992px) { .info-wrapper { order:0; } }
</style>`;
});

// Original motion vocabulary retained; all initial content remains readable.
fs.mkdirSync('src/scripts/test',{recursive:true});
fs.writeFileSync('src/scripts/test/motion.ts',`import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
const selectors = '.motion-up, .motion-fade, .motion-left, .motion-right, .motion-scale';
let dispose: (() => void) | undefined;

function initMotion(home: boolean) {
  dispose?.();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  let lenis: Lenis | undefined;
  let context: gsap.Context | undefined;
  const tick = (time: number) => lenis?.raf(time * 1000);
  const menuState = (event: Event) => (event as CustomEvent<boolean>).detail ? lenis?.stop() : lenis?.start();
  const cleanup = () => {
    gsap.ticker.remove(tick);
    lenis?.off('scroll', ScrollTrigger.update);
    lenis?.destroy();
    context?.revert();
    window.removeEventListener('test-menu-state', menuState);
    window.removeEventListener('pagehide', cleanup);
    reduced.removeEventListener('change', onPreference);
    document.removeEventListener('astro:before-swap', cleanup);
  };
  const onPreference = () => { cleanup(); if (!reduced.matches) initMotion(home); };
  dispose = cleanup;
  try {
    if (home) {
      lenis = new Lenis({ duration:1.2, smoothWheel:true, syncTouch:false, touchMultiplier:1.1, anchors:true, easing:(t:number)=>1-Math.pow(1-t,3.4) });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      window.addEventListener('test-menu-state', menuState);
    }
    context = gsap.context(() => {
      const revealPreset = (element: HTMLElement): gsap.TweenVars => ({
        opacity:0, y:element.classList.contains('motion-fade') ? 0 : 40,
        x:element.classList.contains('motion-left') ? -48 : element.classList.contains('motion-right') ? 48 : 0,
        scale:element.classList.contains('motion-scale') ? .975 : 1, filter:'blur(6px)',
        duration:.9, ease:'power3.out', immediateRender:false
      });
      gsap.utils.toArray<HTMLElement>(selectors).filter(el=>!el.closest('#hero')).forEach(el=> {
        gsap.from(el, { ...revealPreset(el), delay:Number(el.dataset.motionDelay)||0,
          scrollTrigger:{trigger:el,start:'top 88%',once:true,invalidateOnRefresh:true} });
      });
      if (home) {
        gsap.timeline({defaults:{ease:'power3.out'}})
          .from('.hero__video',{scale:1.05,duration:3,immediateRender:false},0)
          .from('.hero__char',{opacity:0,y:40,filter:'blur(12px)',duration:.6,stagger:.08,immediateRender:false},.3)
          .from('.hero__action',{opacity:0,y:48,duration:.9,immediateRender:false},1.3);
        gsap.fromTo('.hero__image-wrapper',{clipPath:'inset(0% 0% 0% 0% round 0px)'},{clipPath:'inset(7% 3% 9% 3% round 36px)',ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1.25}});
        for (const {selector,y} of [{selector:'.hero__bg',y:9},{selector:'.flow-image img',y:6},{selector:'.map',y:5}]) {
          gsap.utils.toArray<HTMLElement>(selector).forEach(el=>gsap.fromTo(el,{yPercent:-y},{yPercent:y,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.2}}));
        }
        gsap.utils.toArray<HTMLElement>('.section-index').forEach(el=>gsap.fromTo(el,{y:-15,opacity:.6},{y:15,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}}));
      }
    });
    ScrollTrigger.refresh();
    window.addEventListener('pagehide', cleanup, {once:true});
    document.addEventListener('astro:before-swap', cleanup, {once:true});
    reduced.addEventListener('change', onPreference);
  } catch (error) {
    cleanup();
    // A partial initialization must not leave important content transparent.
    document.querySelectorAll<HTMLElement>(selectors + ', .hero__char').forEach(el=>{ el.style.opacity='1'; el.style.transform='none'; el.style.filter='none'; });
    console.warn('Test motion was skipped; content remains available.', error);
  }
}
export const initHomeMotion = () => initMotion(true);
export const initContactMotion = () => initMotion(false);
`);
edit('src/pages/test/index.astro',s=>s.replace('padding-bottom: 68px;','padding-bottom: var(--test-cta-height, calc(76px + env(safe-area-inset-bottom, 0px)));').replace(/<script>[\s\S]*?<\/script>/,`<script>
 import { initHomeMotion } from '../../scripts/test/motion';
 initHomeMotion();
 const bar = document.querySelector<HTMLElement>('.bottom-fixed-cta');
 if (bar) {
  const observer = new ResizeObserver(() => document.body.style.setProperty('--test-cta-height', bar.getBoundingClientRect().height + 'px'));
  observer.observe(bar);
  window.addEventListener('pagehide', () => observer.disconnect(), {once:true});
 }
</script>`));

edit('src/components/test/Hero.astro',s=>s.replace('autoplay','preload="metadata" poster="/test/hero-poster.webp"').replace('class="hero__video img-luxury"','class="hero__video img-luxury" aria-label="道場での練習映像"').replace('</section>','<button type="button" class="video-toggle" hidden>映像を再生</button>\n</section>')+`
<script>
 const video = document.querySelector<HTMLVideoElement>('.hero__video');
 const toggle = document.querySelector<HTMLButtonElement>('.video-toggle');
 if (video && toggle) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let requestedPlay = !preference.matches;
  let inView = true;
  const update = () => {
   if (requestedPlay && inView && !document.hidden) video.play().catch(() => { requestedPlay=false; toggle.textContent='映像を再生'; });
   else video.pause();
  };
  toggle.hidden=false;
  video.addEventListener('play',()=>toggle.textContent='映像を停止');
  video.addEventListener('pause',()=>toggle.textContent='映像を再生');
  toggle.addEventListener('click',()=>{ requestedPlay=video.paused; update(); });
  const observer = new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;update();});
  observer.observe(video);
  const change = () => { requestedPlay=!preference.matches; update(); };
  preference.addEventListener('change',change);
  document.addEventListener('visibilitychange',update);
  update();
  window.addEventListener('pagehide',()=>{ observer.disconnect(); video.pause(); preference.removeEventListener('change',change); document.removeEventListener('visibilitychange',update); },{once:true});
 }
</script>
<style>.video-toggle { position:absolute; bottom:20px; right:24px; z-index:11; min-height:44px; padding:8px 14px; background:#141613cc; border:1px solid #fff8; border-radius:4px; color:white; font-size:12px; cursor:pointer; }</style>
`);
console.log('Mock form and isolated motion implemented.');
