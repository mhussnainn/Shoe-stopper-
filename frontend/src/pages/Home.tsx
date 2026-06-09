'use client';

import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/product';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FluidSimulation } from '../components/FluidSimulationNew';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const featuredProducts = products.slice(0, 6);
  const col1Products = [featuredProducts[0], featuredProducts[3]];
  const col2Products = [featuredProducts[1], featuredProducts[4]];
  const col3Products = [featuredProducts[2], featuredProducts[5]];

  // hero refs
  const heroHeading1Ref  = useRef<HTMLHeadingElement>(null);
  const heroHeading2Ref  = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef  = useRef<HTMLDivElement>(null);
  const heroDescRef      = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef   = useRef<HTMLDivElement>(null);
  const floatingEls      = useRef<HTMLElement[]>([]);

  // featured refs
  const scrollSectionRef    = useRef<HTMLElement>(null);
  const col1Ref             = useRef<HTMLDivElement>(null);
  const col2Ref             = useRef<HTMLDivElement>(null);
  const col3Ref             = useRef<HTMLDivElement>(null);
  const featuredHeadingRef  = useRef<HTMLHeadingElement>(null);
  const featuredSubtitleRef = useRef<HTMLParagraphElement>(null);

  // bg shapes
  const bgShape1Ref = useRef<HTMLDivElement>(null);
  const bgShape2Ref = useRef<HTMLDivElement>(null);
  const bgShape3Ref = useRef<HTMLDivElement>(null);
  const bgShape4Ref = useRef<HTMLDivElement>(null);
  const bgShape5Ref = useRef<HTMLDivElement>(null);

  // categories
  const categoriesSectionRef = useRef<HTMLElement>(null);
  const categoryCardRefs     = useRef<(HTMLAnchorElement | null)[]>([]);

  // customize
  const customizeSectionRef = useRef<HTMLElement>(null);
  const customizeLineRef    = useRef<HTMLDivElement>(null);
  const headWord1Ref        = useRef<HTMLSpanElement>(null);
  const headWord2Ref        = useRef<HTMLSpanElement>(null);
  const headWord3Ref        = useRef<HTMLSpanElement>(null);
  const headWord4Ref        = useRef<HTMLSpanElement>(null);
  const headWord5Ref        = useRef<HTMLSpanElement>(null);
  const headWord6Ref        = useRef<HTMLSpanElement>(null);
  const customizeSubRef     = useRef<HTMLParagraphElement>(null);
  const customizeCardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const customizeBudgetRef  = useRef<HTMLDivElement>(null);
  const customizeCtaRef     = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ready = setTimeout(() => {
      const mm  = gsap.matchMedia();
      const ctx = gsap.context(() => {

        // ── Hero ─────────────────────────────────────────────────────────────
        gsap.from([heroHeading1Ref.current, heroHeading2Ref.current], {
          y: 80, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.25,
        });
        gsap.from(heroSubtitleRef.current, { x: -60, opacity: 0, duration: 0.9, ease: 'power2.out', delay: 0.6 });
        gsap.from(heroDescRef.current,     { y: 40,  opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.85 });
        gsap.from(heroButtonsRef.current,  { scale: 0.85, opacity: 0, duration: 0.7, ease: 'back.out(1.5)', delay: 1.1 });
        gsap.from(floatingEls.current.filter(Boolean), { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.08, delay: 1.3 });

        const bgShapes  = [bgShape1Ref, bgShape2Ref, bgShape3Ref, bgShape4Ref, bgShape5Ref];
        const speeds    = [-200, 150, -100, 180, -140];
        const rotations = [45, -30, 60, -45, 35];
        bgShapes.forEach((ref, i) => {
          if (!ref.current) return;
          gsap.to(ref.current, { y: speeds[i], rotation: rotations[i], ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 } });
        });

        // ── Customize section ─────────────────────────────────────────────────
        const cST = { trigger: customizeSectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' };

        if (customizeLineRef.current) {
          gsap.from(customizeLineRef.current.querySelectorAll('div'), {
            scaleX: 0, duration: 0.9, ease: 'power3.out', stagger: 0,
            scrollTrigger: { ...cST, start: 'top 82%' },
          });
        }

        [headWord1Ref, headWord2Ref, headWord3Ref, headWord4Ref, headWord5Ref, headWord6Ref].forEach((ref, i) => {
          if (!ref.current) return;
          gsap.fromTo(ref.current,
            { y: 70, opacity: 0, rotateX: -20, transformOrigin: 'bottom center' },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.75, ease: 'power3.out', delay: i * 0.09, scrollTrigger: cST },
          );
        });

        if (customizeSubRef.current) {
          gsap.fromTo(customizeSubRef.current, { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.55, scrollTrigger: cST });
        }

        customizeCardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(card,
            { x: i % 2 === 0 ? -50 : 50, y: 30, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.07,
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' } },
          );
        });

        if (customizeBudgetRef.current) {
          gsap.fromTo(customizeBudgetRef.current, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: customizeBudgetRef.current, start: 'top 90%', toggleActions: 'play none none reverse' } });
        }

        if (customizeCtaRef.current) {
          gsap.fromTo(customizeCtaRef.current,
            { y: 80, scale: 0.82, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: customizeCtaRef.current, start: 'top 95%', toggleActions: 'play none none reverse' } },
          );
        }

        gsap.to('.customize-bg-orb', { y: -80, ease: 'none',
          scrollTrigger: { trigger: customizeSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 } });

        // ── Featured heading ──────────────────────────────────────────────────
        if (featuredHeadingRef.current) {
          gsap.fromTo(featuredHeadingRef.current, { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: featuredHeadingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
        }
        if (featuredSubtitleRef.current) {
          gsap.fromTo(featuredSubtitleRef.current, { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
              scrollTrigger: { trigger: featuredSubtitleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
        }

        // ── Product columns ───────────────────────────────────────────────────
        const scrollSection = scrollSectionRef.current;
        mm.add('(min-width: 768px)', () => {
          if (!scrollSection) return;
          [col1Ref, col2Ref, col3Ref].forEach((r) => { if (r.current) r.current.style.willChange = 'transform'; });
          gsap.to(col1Ref.current, { y: -80, ease: 'none', scrollTrigger: { trigger: scrollSection, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
          gsap.to(col2Ref.current, { y:  80, ease: 'none', scrollTrigger: { trigger: scrollSection, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
          gsap.to(col3Ref.current, { y: -50, ease: 'none', scrollTrigger: { trigger: scrollSection, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
        });

        // smooth fade-in for all product cards (no scale/stroke jank)
        if (scrollSection) {
          scrollSection.querySelectorAll('.product-scroll-card').forEach((card) => {
            gsap.fromTo(card, { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 94%', toggleActions: 'play none none reverse' } });
          });
        }

        // ── Categories ────────────────────────────────────────────────────────
        if (categoryCardRefs.current[0]) {
          gsap.fromTo(categoryCardRefs.current[0], { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: categoriesSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
        }
        if (categoryCardRefs.current[1]) {
          gsap.fromTo(categoryCardRefs.current[1], { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.15,
              scrollTrigger: { trigger: categoriesSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
        }
      });

      return () => { ctx.revert(); mm.revert(); };
    }, 60);

    return () => clearTimeout(ready);
  }, []);

  const addFloating = (el: HTMLElement | null) => {
    if (el && !floatingEls.current.includes(el)) floatingEls.current.push(el);
  };

  const customizeFeatures = [
    { icon: '✦', title: 'Your Design, Your Rules',  desc: 'Choose every detail from upper material to sole type, lace color, and stitching pattern. No template, no compromise.' },
    { icon: '◈', title: 'Any Material, Any Finish',  desc: 'Full grain leather, breathable mesh, suede, vegan options. We source globally so you never settle.' },
    { icon: '◉', title: 'Flexible to Your Budget',   desc: 'Whether you want something understated or a premium statement piece, we tailor the build to fit your spend with no hidden costs.' },
    { icon: '◎', title: 'Built One at a Time',       desc: 'Every pair is handcrafted individually. Your shoes are never mass produced. They are made specifically for you.' },
    { icon: '⬡', title: 'Personal Consultation',     desc: 'Not sure where to start? Our team walks you through material selection, style guidance, and sizing step by step.' },
    { icon: '◇', title: 'From Idea to Doorstep',     desc: 'Share a reference image, a mood board, or just a description. We translate your idea into a finished shoe.' },
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="color-drop color-drop-1" />
      <div className="color-drop color-drop-2" />
      <div className="color-drop color-drop-3" />
      <div ref={bgShape1Ref} className="bg-scroll-shape bg-scroll-shape-1" />
      <div ref={bgShape2Ref} className="bg-scroll-shape bg-scroll-shape-2" />
      <div ref={bgShape3Ref} className="bg-scroll-shape bg-scroll-shape-3" />
      <div ref={bgShape4Ref} className="bg-scroll-shape bg-scroll-shape-4" />
      <div ref={bgShape5Ref} className="bg-scroll-shape bg-scroll-shape-5" />

      {/* ════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative min-h-screen py-20 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
          <FluidSimulation autoSplat={true} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <h1 ref={heroHeading1Ref} className="text-5xl sm:text-6xl md:text-8xl font-black mb-4">
              <span className="tech-text-gradient">WALK YOUR</span>
            </h1>
            <h1 ref={heroHeading2Ref} className="text-5xl sm:text-6xl md:text-8xl font-black mb-8">
              <span className="tech-text-gradient">OWN WAY</span>
            </h1>
          </div>
          <div className="relative mb-12" ref={heroSubtitleRef}>
            <p className="text-base sm:text-lg md:text-xl font-light text-secondary opacity-80">
              You Are Exactly Where Innovation Meets Style
            </p>
            <div className="absolute inset-0 tech-gradient opacity-20 blur-xl animate-pulse-glow" />
          </div>
          <p ref={heroDescRef} className="text-base sm:text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto px-2">
            Design your perfect footwear with cutting-edge technology.
            Express your unique style with limitless customization possibilities.
          </p>
          <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href="/products"  className="px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-2xl font-bold hover-scale neon-glow transition-all animate-pulse-glow text-base sm:text-lg">Explore Collection</a>
            <a href="/customize" className="px-8 sm:px-10 py-4 sm:py-5 glass-effect rounded-2xl font-bold hover-scale transition-all border-2 border-secondary text-base sm:text-lg animate-float">Start Customizing</a>
          </div>
        </div>

        <div ref={addFloating} className="absolute top-32 left-16 w-6 h-6 bg-primary rounded-full opacity-60 animate-ping hidden sm:block" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute bottom-32 right-20 w-4 h-4 bg-secondary rounded-full opacity-40 animate-bounce-slow" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute top-48 right-32 w-8 h-8 bg-accent rounded-full opacity-50 animate-float hidden sm:block" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute top-80 left-1/4 w-3 h-3 bg-primary rounded-full opacity-70 animate-pulse" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute bottom-48 left-32 w-5 h-5 bg-secondary rounded-full opacity-30 animate-spin-slow hidden sm:block" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute top-40 right-1/3 w-7 h-7 bg-accent rounded-full opacity-40 animate-wiggle" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute top-96 left-1/2 w-2 h-2 bg-primary rounded-full opacity-80 animate-ping" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute bottom-80 left-1/3 w-10 h-10 border-2 border-secondary rounded-full opacity-20 animate-spin hidden sm:block" style={{ zIndex: 10 }} />
        <div ref={addFloating} className="absolute top-60 right-1/4 w-12 h-12 border border-accent rounded-full opacity-25 animate-pulse hidden sm:block" style={{ zIndex: 10 }} />
      </section>

      {/* ════════════════════ CUSTOMIZATION SECTION ═══════════════════════ */}
      <section ref={customizeSectionRef} className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="customize-bg-orb"
          style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb,124,58,237),0.10) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}
        />

        <div className="container mx-auto px-4 relative z-10">

          {/* decorative lines */}
          <div ref={customizeLineRef} className="flex items-center gap-4 mb-10 justify-center">
            <div style={{ flex: 1, maxWidth: 100, height: 1, background: 'linear-gradient(90deg, transparent, var(--primary))', transformOrigin: 'right center' }} />
            <div style={{ flex: 1, maxWidth: 100, height: 1, background: 'linear-gradient(90deg, var(--primary), transparent)', transformOrigin: 'left center' }} />
          </div>

          {/* heading — word by word */}
          <div className="text-center mb-14 sm:mb-20" style={{ perspective: '800px' }}>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-0"
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.28em' }}
              aria-label="We Build the Shoes You Imagine"
            >
              <span ref={headWord1Ref} className="tech-text-gradient inline-block">We</span>
              <span ref={headWord2Ref} className="tech-text-gradient inline-block">Build</span>
              <span ref={headWord3Ref} className="tech-text-gradient inline-block">the</span>
              <span ref={headWord4Ref} className="tech-text-gradient inline-block">Shoes</span>
            </h2>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.28em' }}
            >
              <span ref={headWord5Ref} className="inline-block" style={{ color: 'var(--foreground)' }}>You</span>
              <span ref={headWord6Ref} className="tech-text-gradient inline-block">Imagine.</span>
            </h2>
            <p ref={customizeSubRef} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No catalogue. No compromise. Every pair we make is designed around one person you.
              Tell us what you want and we handle everything from materials to finishing.
            </p>
          </div>

          {/* feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {customizeFeatures.map((feat, i) => (
              <div
                key={feat.title}
                ref={(el) => { customizeCardRefs.current[i] = el; }}
                className="group glass-effect rounded-2xl p-6 sm:p-7 transition-all duration-300 hover-scale relative overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                <div className="text-2xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{feat.icon}</div>
                <h3 className="font-black text-base sm:text-lg mb-2 leading-snug">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* budget note */}
          <div
            ref={customizeBudgetRef}
            className="glass-effect rounded-2xl px-6 sm:px-10 py-6 mb-12 mx-auto max-w-3xl text-center"
            style={{ border: '1px solid rgba(var(--primary-rgb,124,58,237),0.22)', borderLeft: '3px solid var(--primary)' }}
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <span className="text-foreground font-bold">Every budget is welcome.</span>{' '}
              We work with you to find the right materials, construction method, and finish that
              delivers the best result within what makes sense for you. No minimum spend. No pressure.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a
              ref={customizeCtaRef}
              href="/customize"
              className="cta-customize-btn group relative inline-flex items-center justify-center gap-3 px-10 sm:px-16 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg text-white overflow-hidden"
              style={{ isolation: 'isolate', minWidth: 'min(300px, 90vw)' }}
            >
              <span aria-hidden="true" className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 60%, var(--primary) 100%)', backgroundSize: '200% 200%', animation: 'ctaGradient 3.5s ease infinite', zIndex: 0 }} />
              <span aria-hidden="true" className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 0 3px rgba(var(--primary-rgb,124,58,237),0.55), 0 0 40px 8px rgba(var(--primary-rgb,124,58,237),0.35)', zIndex: 0 }} />
              <span className="relative z-10 tracking-wide text-white">Customize Your Shoes</span>
              <span className="relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/25 group-hover:bg-white/40 group-hover:translate-x-1.5 transition-all duration-300 text-white font-bold text-sm">→</span>
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════════ FEATURED PRODUCTS ═══════════════════════════ */}
      <section ref={scrollSectionRef} className="py-10 sm:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 ref={featuredHeadingRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tech-text-gradient">
              Featured Collection
            </h2>
            <p ref={featuredSubtitleRef} className="text-lg sm:text-xl text-muted-foreground">
              Discover our most innovative and cutting-edge designs
            </p>
          </div>

          {/* Desktop — 3 parallax columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <div ref={col1Ref} className="flex flex-col gap-8">
              {col1Products.map((p) => p && <div key={p.id} className="product-scroll-card"><ProductCard {...p} /></div>)}
            </div>
            <div ref={col2Ref} className="flex flex-col gap-8 mt-24">
              {col2Products.map((p) => p && <div key={p.id} className="product-scroll-card"><ProductCard {...p} /></div>)}
            </div>
            <div ref={col3Ref} className="flex flex-col gap-8">
              {col3Products.map((p) => p && <div key={p.id} className="product-scroll-card"><ProductCard {...p} /></div>)}
            </div>
          </div>

          {/* Mobile — single column, one card at a time, no clustering */}
          <div className="flex flex-col gap-6 md:hidden">
            {featuredProducts.map((p) => p && (
              <div key={p.id} className="product-scroll-card w-full">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CATEGORIES ══════════════════════════════ */}
      <section ref={categoriesSectionRef} className="py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <a href="/products?category=men" className="group" ref={(el) => { categoryCardRefs.current[0] = el; }}>
              <div className="glass-effect rounded-2xl p-8 sm:p-12 hover-scale transition-all h-60 sm:h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <h3 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 tech-text-gradient">Men&apos;s</h3>
                  <p className="text-xl sm:text-2xl text-muted-foreground">Performance &amp; Innovation</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/40 transition-all animate-pulse" />
              </div>
            </a>
            <a href="/products?category=women" className="group" ref={(el) => { categoryCardRefs.current[1] = el; }}>
              <div className="glass-effect rounded-2xl p-8 sm:p-12 hover-scale transition-all h-60 sm:h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <h3 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 tech-text-gradient">Women&apos;s</h3>
                  <p className="text-xl sm:text-2xl text-muted-foreground">Style &amp; Sophistication</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent group-hover:from-secondary/40 transition-all animate-pulse" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ctaGradient {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @media (max-width: 480px) {
          .cta-customize-btn { width: 90vw; }
        }
      `}</style>
    </div>
  );
};

export default Home;