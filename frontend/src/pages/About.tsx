import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FluidSimulation } from '../components/FluidSimulationNew';

gsap.registerPlugin(ScrollTrigger);

// ── Animated counter ──────────────────────────────────────────────────────────
function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1.8) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target, duration, ease: 'power2.out',
    onUpdate() { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reset' },
  });
}
const timeline = [
  {
    label: 'The Gap We Saw',
    title: 'Every Shoe Looked the Same',
    body: 'Walking through Lahore\'s markets, we kept noticing the same thing that is racks of identical shoes, zero personality, zero choice. Anime fans, artists, and sneakerheads all wanted something that actually reflected who they were. That shelf did not exist. We decided to build it.',
  },
  {
    label: 'Figuring It Out',
    title: 'Could We Actually Do This?',
    body: 'We spent months talking to craftspeople, testing materials, and asking one question: can a shoe be fully customised without sacrificing quality? The answer was yes but only if the process was rebuilt from scratch. So we scrapped the standard playbook and started over.',
  },
  {
    label: 'First Pairs Out the Door',
    title: 'Started Small, Online Only',
    body: 'No storefront, no ads just a WhatsApp catalogue and a genuine product. The first batch sold out entirely through friends and local communities. People started posting their pairs online without being asked, and the orders that followed came from their posts, not from us.',
  },
  {
    label: 'The Tool That Changed Everything',
    title: 'Design It Before We Make It',
    body: 'We built a real-time 3D customiser so customers could see exactly what they were getting every colour panel, every lace, every sole — before a single stitch was placed. Designing your shoes started feeling less like placing an order and more like playing a game.',
  },
  {
    label: 'Still Going',
    title: 'Growing, Without Losing What Works',
    body: 'More designs, more materials, more orders but the same hands-on craft for every pair. The community kept growing organically: anime builds, truck-art prints, cosplay colourways. We are still the same operation that started with a gap on a shelf and a stubborn refusal to fill it with more of the same.',
  },
];
const testimonials = [
  {
    name: 'Sneakerhead · DHA, Lahore',
    text: 'I got myself a full One Piece themed pair Luffy\'s straw hat pattern on the heel, Going Merry on the sole. Shipped perfectly, stitching is immaculate. Everyone at uni asks where I got them.',
    avatar: '⚡',
    rating: 5,
  },
  {
    name: 'Cosplayer · Gulberg, Lahore',
    text: 'I needed shoes for a convention cosplay and had a very specific vision. The customizer let me get the exact colour match I needed. Wore them on stage, got stopped for photos the whole day.',
    avatar: '🎭',
    rating: 5,
  },
  {
    name: 'Artist · Model Town, Lahore',
    text: 'As a visual artist I\'m critical about colour accuracy. The print quality on the custom panels is genuinely impressive rich, clean edges, no bleed. Bought three pairs in a row after the first.',
    avatar: '🎨',
    rating: 5,
  },
];

const team = [
  {
    title: 'Design Studio',
    initials: '✦',
    desc: 'Our in-house designers collaborate with local artists, illustrators, and the community to keep the design library fresh — from traditional Lahori art to the latest anime drops.',
    color: 'from-primary to-secondary',
  },
  {
    title: 'Craft Workshop',
    initials: '◈',
    desc: 'Every pair is hand-assembled by skilled artisans in our Lahore workshop. No conveyor belts. No shortcuts. Real hands, real craft, every stitch checked before it leaves.',
    color: 'from-secondary to-accent',
  },
  {
    title: 'Tech Team',
    initials: '⬡',
    desc: 'The team behind the 3D configurator, print matching engine, and everything that makes designing a shoe online feel like playing a game in the best way.',
    color: 'from-accent to-primary',
  },
];

const values = [
  { title: 'Your Vision, Your Pair', desc: 'Anime characters, street art, cultural motifs, solid minimalism — if you can imagine it, we can build it. No template is final, every design is yours to own.', icon: '✦' },
  { title: 'Made in Lahore', desc: 'Every pair is crafted locally. Supporting local artisans, local material suppliers, and local talent is not a marketing line — it is how we operate, day one to today.', icon: '◈' },
  { title: 'Quality Without Compromise', desc: 'Custom does not mean cutting corners. We use the same sole compounds, stitching standards, and material checks on every order, whether it is one pair or a hundred.', icon: '⬡' },
];

const About = () => {
  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroH1Ref     = useRef<HTMLHeadingElement>(null);
  const heroParaRef   = useRef<HTMLParagraphElement>(null);
  const floatingEls   = useRef<HTMLDivElement[]>([]);
  const addFlt = (el: HTMLDivElement | null) => { if (el && !floatingEls.current.includes(el)) floatingEls.current.push(el); };

  // story
  const storyRef      = useRef<HTMLElement>(null);
  const storyLabelRef = useRef<HTMLSpanElement>(null);
  const storyH2Ref    = useRef<HTMLHeadingElement>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyQuoteRef = useRef<HTMLBlockquoteElement>(null);

  // stats
  const statsRef   = useRef<HTMLElement>(null);
  const stat1Ref   = useRef<HTMLSpanElement>(null);
  const stat2Ref   = useRef<HTMLSpanElement>(null);
  const stat3Ref   = useRef<HTMLSpanElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // values
  const valuesRef   = useRef<HTMLElement>(null);
  const valLabelRef = useRef<HTMLSpanElement>(null);
  const valH2Ref    = useRef<HTMLHeadingElement>(null);
  const valCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // mission
  const missionRef   = useRef<HTMLElement>(null);
  const missionInner = useRef<HTMLDivElement>(null);

  // team
  const teamRef      = useRef<HTMLElement>(null);
  const teamLabelRef = useRef<HTMLSpanElement>(null);
  const teamH2Ref    = useRef<HTMLHeadingElement>(null);
  const teamCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // testimonials
  const testRef      = useRef<HTMLElement>(null);
  const testLabelRef = useRef<HTMLSpanElement>(null);
  const testH2Ref    = useRef<HTMLHeadingElement>(null);
  const testCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // cta
  const ctaRef   = useRef<HTMLElement>(null);
  const ctaInner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm  = gsap.matchMedia();
    const ctx = gsap.context(() => {

      // ── Hero ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroBadgeRef.current,  { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from(heroH1Ref.current,     { y: 100, opacity: 0, duration: 1 }, '-=0.2')
        .from(heroParaRef.current,   { y: 40,  opacity: 0, duration: 0.8 }, '-=0.5')
        .from(floatingEls.current,   { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.07 }, '-=0.4');

      // ── Story ─────────────────────────────────────────────────────────────
      const sT = { trigger: storyRef.current, start: 'top 80%', toggleActions: 'play none none reverse' };
      gsap.from(storyLabelRef.current, { ...sT, x: -50, opacity: 0, duration: 0.6, ease: 'power2.out' });
      gsap.from(storyH2Ref.current,    { ...sT, x: -80, opacity: 0, duration: 0.9, delay: 0.1 });

      timelineItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -70 : 70, opacity: 0, y: 20 },
          { x: 0, y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
        );
      });

      if (storyQuoteRef.current) {
        gsap.fromTo(storyQuoteRef.current,
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: storyQuoteRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } }
        );
      }

      // ── Stats ─────────────────────────────────────────────────────────────
      statCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: statsRef.current, start: 'top 86%', toggleActions: 'play none none reverse' },
          y: 70, opacity: 0, scale: 0.82, duration: 0.7, ease: 'back.out(1.5)', delay: i * 0.13,
        });
      });
      if (stat1Ref.current) animateCounter(stat1Ref.current, 50,  'K+');
      if (stat2Ref.current) animateCounter(stat2Ref.current, 200, '+');
      if (stat3Ref.current) animateCounter(stat3Ref.current, 98,  '%');

      // ── Values ────────────────────────────────────────────────────────────
      const vT = { trigger: valuesRef.current, start: 'top 83%', toggleActions: 'play none none reverse' };
      gsap.from(valLabelRef.current, { ...vT, y: -20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      gsap.from(valH2Ref.current,    { ...vT, y: 40,  opacity: 0, duration: 0.8, delay: 0.1 });
      valCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: valuesRef.current, start: 'top 83%', toggleActions: 'play none none reverse' },
          y: 60, opacity: 0, rotateX: 8, duration: 0.75, ease: 'power3.out', delay: 0.15 + i * 0.15,
        });
      });

      // ── Mission ───────────────────────────────────────────────────────────
      gsap.from(missionInner.current, {
        scrollTrigger: { trigger: missionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
      });

      // ── Team ──────────────────────────────────────────────────────────────
      const tmT = { trigger: teamRef.current, start: 'top 83%', toggleActions: 'play none none reverse' };
      gsap.from(teamLabelRef.current, { ...tmT, y: -20, opacity: 0, duration: 0.5 });
      gsap.from(teamH2Ref.current,    { ...tmT, y: 40,  opacity: 0, duration: 0.8, delay: 0.1 });
      teamCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: teamRef.current, start: 'top 83%', toggleActions: 'play none none reverse' },
          y: 50, opacity: 0, scale: 0.88, duration: 0.75, ease: 'back.out(1.4)', delay: 0.2 + i * 0.15,
        });
      });

      // ── Testimonials ──────────────────────────────────────────────────────
      const tT = { trigger: testRef.current, start: 'top 83%', toggleActions: 'play none none reverse' };
      gsap.from(testLabelRef.current, { ...tT, y: -20, opacity: 0, duration: 0.5 });
      gsap.from(testH2Ref.current,    { ...tT, y: 40,  opacity: 0, duration: 0.8, delay: 0.1 });
      testCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: testRef.current, start: 'top 83%', toggleActions: 'play none none reverse' },
          y: 80, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 + i * 0.15,
        });
      });

      // ── CTA ───────────────────────────────────────────────────────────────
      gsap.from(ctaInner.current, {
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
      });
    });

    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="color-drop color-drop-1" />
      <div className="color-drop color-drop-2" />
      <div className="color-drop color-drop-3" />

      {/* Background layer */}
      <div className="fixed top-[-8%] left-[-6%] w-[520px] h-[520px] rounded-full bg-primary/8 blur-[130px] pointer-events-none" />
      <div className="fixed top-[28%] right-[-8%] w-[440px] h-[440px] rounded-full bg-secondary/10 blur-[110px] pointer-events-none" />
      <div className="fixed bottom-[12%] left-[18%] w-[380px] h-[380px] rounded-full bg-accent/8 blur-[110px] pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,hsl(var(--primary)) 0px,transparent 1px,transparent 60px,hsl(var(--primary)) 61px)', backgroundSize: '120px 120px' }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle,hsl(var(--foreground)) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ════════════ HERO ════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
          <FluidSimulation autoSplat={true} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4 text-center relative z-10 py-28 sm:py-36">
          <h1 ref={heroH1Ref} className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="tech-text-gradient">OUR STORY</span>
          </h1>
          <p ref={heroParaRef} className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Born in Lahore. Built on the idea that your shoes should look exactly like what lives in your head — whether that's a street-art mural, a favourite anime character, or something no one has ever made before.
          </p>
        </div>

        <div ref={addFlt} className="absolute top-24 left-10 w-5 h-5 bg-primary rounded-full opacity-50 animate-ping hidden sm:block" />
        <div ref={addFlt} className="absolute top-36 left-24 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse hidden sm:block" />
        <div ref={addFlt} className="absolute bottom-20 right-16 w-4 h-4 bg-secondary rounded-full opacity-40 animate-bounce-slow" />
        <div ref={addFlt} className="absolute top-48 right-24 w-8 h-8 bg-accent rounded-full opacity-40 animate-float hidden sm:block" />
        <div ref={addFlt} className="absolute top-72 left-1/4 w-3 h-3 bg-primary rounded-full opacity-70 animate-pulse" />
        <div ref={addFlt} className="absolute top-32 right-1/3 w-7 h-7 bg-accent rounded-full opacity-30 animate-wiggle hidden sm:block" />
        <div ref={addFlt} className="absolute top-56 right-1/4 w-10 h-10 border border-primary/30 rounded-full animate-spin-slow hidden sm:block" />
      </section>

      {/* ════════════ STORY TIMELINE ══════════════════════════════════════ */}
      <section ref={storyRef} className="py-20 sm:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24">
            <span ref={storyLabelRef} className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">How It Happened</span>
            <h2 ref={storyH2Ref} className="text-4xl sm:text-5xl md:text-6xl font-black tech-text-gradient leading-tight">
              One Workshop.<br className="sm:hidden" /> One Obsession.
            </h2>
          </div>

          {/* Opening quote */}
          <blockquote ref={storyQuoteRef} className="glass-effect rounded-2xl px-8 sm:px-16 py-10 mb-16 max-w-3xl mx-auto text-center relative overflow-hidden" style={{ borderLeft: '4px solid var(--primary)' }}>
            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-foreground mb-4">
              &ldquo;We watched factories churn out identical product with zero soul. Someone had to stop it — so we did, right here in Lahore.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground font-semibold tracking-wide uppercase">
              — ShoeStopper, Founding Team
            </footer>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent pointer-events-none" />
          </blockquote>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2" />

            <div className="flex flex-col gap-10 sm:gap-16">
              {timeline.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => { timelineItemRefs.current[i] = el; }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`glass-effect rounded-2xl p-6 sm:p-8 md:w-[45%] relative overflow-hidden group hover-scale transition-all ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" />
                    <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">{item.label}</p>
                    <h3 className="text-lg sm:text-xl font-black mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                  </div>

                  {/* Dot — desktop */}
                  <div className="hidden md:flex w-[10%] items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary neon-glow ring-4 ring-primary/20 flex-shrink-0" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STATS ═══════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { ref: stat1Ref, init: '0K+', label: 'Custom Pairs Made',  cardRef: (el: HTMLDivElement | null) => { statCardRefs.current[0] = el; } },
              { ref: stat2Ref, init: '0+',  label: 'Unique Designs',     cardRef: (el: HTMLDivElement | null) => { statCardRefs.current[1] = el; } },
              { ref: stat3Ref, init: '0%',  label: 'Hand Quality Checked', cardRef: (el: HTMLDivElement | null) => { statCardRefs.current[2] = el; } },
            ].map(({ ref, init, label, cardRef }) => (
              <div key={label} ref={cardRef}
                className="glass-effect rounded-2xl p-5 sm:p-8 text-center hover-scale transition-all relative overflow-hidden group cursor-default">
                <div className="text-3xl sm:text-5xl font-black tech-text-gradient mb-2">
                  <span ref={ref}>{init}</span>
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm font-medium tracking-wide">{label}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ VALUES ══════════════════════════════════════════════ */}
      <section ref={valuesRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span ref={valLabelRef} className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">What We Stand For</span>
            <h2 ref={valH2Ref} className="text-3xl sm:text-5xl font-black tech-text-gradient">Built On Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} ref={(el) => { valCardRefs.current[i] = el; }}
                className="glass-effect rounded-2xl p-8 relative overflow-hidden group hover-scale transition-all">
                <div className="text-4xl font-black text-primary/30 mb-5 select-none">{v.icon}</div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MISSION ═════════════════════════════════════════════ */}
      <section ref={missionRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div ref={missionInner} className="glass-effect rounded-3xl p-10 sm:p-20 text-center relative overflow-hidden">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-6 block">Our Mission</span>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 tech-text-gradient leading-tight">
              Your Imagination.<br />Your Shoes.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Shoes are the last canvas of genuine self-expression in a world drowning in identical product. ShoeStopper exists to hand that canvas back to you — whether your vision is a Lahori truck-art masterpiece, your favourite anime character, or something no one has ever put on a shoe before. Your feet, your rules.
            </p>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 animate-pulse pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ════════════ TEAM (pillars) ══════════════════════════════════════ */}
      <section ref={teamRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span ref={teamLabelRef} className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Behind Every Pair</span>
            <h2 ref={teamH2Ref} className="text-3xl sm:text-5xl font-black tech-text-gradient">Who Makes It Happen</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={member.title} ref={(el) => { teamCardRefs.current[i] = el; }}
                className="glass-effect rounded-2xl p-8 text-center hover-scale transition-all relative overflow-hidden group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl mx-auto mb-5 neon-glow`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-lg mb-4">{member.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════════════════════════════════ */}
      <section ref={testRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span ref={testLabelRef} className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Real Customers</span>
            <h2 ref={testH2Ref} className="text-3xl sm:text-5xl font-black tech-text-gradient">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.name} ref={(el) => { testCardRefs.current[i] = el; }}
                className="glass-effect rounded-2xl p-8 relative overflow-hidden group hover-scale transition-all flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} className="text-primary text-sm">★</span>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-8 text-sm sm:text-base flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-lg flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">{t.name}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-secondary to-primary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ═════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="py-16 sm:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <div ref={ctaInner} className="rounded-3xl p-10 sm:p-20 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.18) 0%, hsl(var(--secondary)/0.12) 40%, hsl(var(--accent)/0.16) 70%, hsl(var(--primary)/0.10) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid hsl(var(--primary)/0.25)',
              boxShadow: '0 0 80px hsl(var(--primary)/0.15), inset 0 1px 0 hsl(var(--primary)/0.2)',
            }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-[80px] animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary/25 blur-[90px] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-8 right-8 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow" />
              <div className="absolute bottom-8 left-8 w-32 h-32 border border-accent/20 rounded-full animate-spin-slow" style={{ animationDelay: '2s' }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block opacity-80">Your Next Step</span>
              <h2 className="text-3xl sm:text-5xl font-black mb-6 tech-text-gradient">Ready to Walk Your Way?</h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-xl mx-auto">
                Browse the collection or open the 3D builder and design something entirely your own. Either way it will be unmistakably yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover-scale neon-glow transition-all text-base">Explore Collection</Link>
                <Link to="/customize" className="px-10 py-4 glass-effect rounded-2xl font-bold hover-scale transition-all border-2 border-secondary text-base animate-float">Start Customizing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;