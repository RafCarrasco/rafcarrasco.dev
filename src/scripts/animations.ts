import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Reveal de seções
  document.querySelectorAll<HTMLElement>('section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger de cards
  document.querySelectorAll<HTMLElement>('.expertise .grid, .projects .grid').forEach((grid) => {
    const cards = grid.children;
    gsap.from(cards, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Parallax sutil na foto do hero
  const heroPhoto = document.querySelector<HTMLElement>('.hero-photo');
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Glow do hero respira
  const glow = document.querySelector<HTMLElement>('.glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.55,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
}
