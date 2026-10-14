import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
const selectors = '.motion-up, .motion-fade, .motion-left, .motion-right, .motion-scale';
let dispose: (() => void) | undefined;

function initMotion(home: boolean) {
  dispose?.();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) {
    document.documentElement.classList.remove('test-motion-pending');
    return;
  }
  let lenis: Lenis | undefined;
  let context: gsap.Context | undefined;
  const tick = (time: number) => lenis?.raf(time * 1000);
  const menuState = (event: Event) => (event as CustomEvent<boolean>).detail ? lenis?.stop() : lenis?.start();
  const cleanup = () => {
    document.documentElement.classList.remove('hero-reveal-pending');
    document.documentElement.classList.remove('test-motion-pending');
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
        opacity:0,
        y:element.classList.contains('motion-up') ? 48 : element.classList.contains('motion-scale') ? 24 : 0,
        x:element.classList.contains('motion-left') ? -48 : element.classList.contains('motion-right') ? 48 : 0,
        scale:element.classList.contains('motion-scale') ? .975 : 1,
        filter:element.classList.contains('motion-fade') ? 'blur(0px)' : element.classList.contains('motion-scale') ? 'blur(4px)' : 'blur(6px)'
      });
      gsap.utils.toArray<HTMLElement>(selectors).filter(el=>!el.closest('#hero')).forEach(el=> {
        const fade = el.classList.contains('motion-fade');
        const horizontal = el.classList.contains('motion-left') || el.classList.contains('motion-right');
        // Apply the starting state now, so entering the viewport never hides an already-visible element.
        gsap.fromTo(el, revealPreset(el), {
          opacity:1, x:0, y:0, scale:1, filter:'blur(0px)',
          duration:fade ? .75 : horizontal ? .92 : el.classList.contains('motion-scale') ? .95 : .9,
          ease:fade ? 'power2.out' : 'power3.out', immediateRender:true,
          delay:Number(el.dataset.motionDelay)||0,
          scrollTrigger:{trigger:el,start:'top 88%',once:true,invalidateOnRefresh:true} });
      });
      if (home) {
        const translatedHero = document.documentElement.lang === 'en' || document.documentElement.lang === 'pt-BR';
        const heroChars = document.querySelectorAll('.hero__char').length;
        const heroStagger = translatedHero ? .03 : .08;
        const actionStart = translatedHero ? .3 + Math.max(0, heroChars - 1) * heroStagger + .7 : 1.3;
        gsap.timeline({defaults:{ease:'power3.out'}})
          .from('.hero__video',{scale:1.05,duration:3,immediateRender:false},0)
          .fromTo('.hero__char',
            {opacity:0,y:16,filter:'blur(3px)'},
            {opacity:1,y:0,filter:'blur(0px)',duration:.65,ease:'power2.out',stagger:heroStagger,immediateRender:true},.3)
          .from('.hero__action',{opacity:0,y:48,duration:.9,immediateRender:false},actionStart);
        document.documentElement.classList.remove('hero-reveal-pending');
        gsap.fromTo('.hero__image-wrapper',{clipPath:'inset(0% 0% 0% 0% round 0px)'},{clipPath:'inset(7% 3% 9% 3% round 36px)',ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1.25}});
        for (const {selector,y} of [{selector:'.hero__bg',y:9},{selector:'.flow-image img',y:6},{selector:'.map',y:5}]) {
          gsap.utils.toArray<HTMLElement>(selector).forEach(el=>gsap.fromTo(el,{yPercent:-y},{yPercent:y,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.2}}));
        }
        gsap.utils.toArray<HTMLElement>('.section-index').forEach(el=>gsap.fromTo(el,{y:-15,opacity:.6},{y:15,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}}));
        gsap.utils.toArray<HTMLElement>('.section-head h2').forEach(heading=>gsap.fromTo(heading,
          {y:26,opacity:.75},
          {y:0,opacity:1,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 88%',once:true}}));
      }
    });
    document.documentElement.classList.remove('test-motion-pending');
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
