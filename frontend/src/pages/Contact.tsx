import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare, Users, Award, Globe } from 'lucide-react';
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

// ── SendGrid wire-up ──────────────────────────────────────────────────────────
// 1. npm install @sendgrid/mail express cors
// 2. .env: SENDGRID_API_KEY=SG.xxxx
// 3. server/contact.js — POST /api/contact → sgMail.send({ to, from, replyTo, subject, html })
const sendContactEmail = async (data: { name: string; email: string; subject: string; message: string }) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || 'Failed to send message');
  }
  return res.json();
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery is 3–6 business days within Pakistan, and 7–14 days internationally. Express options are available at checkout for most regions.' },
  { q: 'Can I return or exchange?', a: 'Yes — unused pairs in original packaging can be returned within 14 days of delivery. Custom-designed shoes are final sale since they are made specifically for you.' },
  { q: 'How does the 3D customizer work?', a: 'Pick a base model, choose your colours, materials, and sole type. Preview in real time, then place your order. We build your pair by hand and ship within 5–7 business days.' },
  { q: 'What sizes do you carry?', a: 'We carry EU 36–47 (US 4–13) across all styles. If you fall between sizes, our size guide will help — and you can reach out for a custom fit consultation.' },
  { q: 'Do you ship internationally?', a: 'Yes — we ship to 30+ countries. Shipping rates and estimated delivery times are calculated at checkout. Import duties may apply.' },
  { q: 'Are the materials sustainable?', a: 'We are transitioning toward more sustainable materials. Several sole options use recycled rubber, and we publish full material sourcing on our Transparency page.' },
  { q: 'Can I track my order?', a: 'Absolutely. Once shipped, you\'ll receive a tracking link via email and WhatsApp (if opted in). You can also check order status in your account at any time.' },
  { q: 'Do you do wholesale or partnerships?', a: 'We do — for the right fit. If you\'re a retailer, stylist, or brand, reach out via the form and select "Partnership / Collab" as your topic.' },
];

const Contact = () => {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Hero
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroH1Ref    = useRef<HTMLHeadingElement>(null);
  const heroParaRef  = useRef<HTMLParagraphElement>(null);
  const floatingEls  = useRef<HTMLDivElement[]>([]);
  const addFlt = (el: HTMLDivElement | null) => { if (el && !floatingEls.current.includes(el)) floatingEls.current.push(el); };

  // Form + info
  const formSectionRef = useRef<HTMLElement>(null);
  const formCardRef    = useRef<HTMLDivElement>(null);
  const infoColRef     = useRef<HTMLDivElement>(null);
  const infoCard1Ref   = useRef<HTMLDivElement>(null);
  const infoCard2Ref   = useRef<HTMLDivElement>(null);
  const infoCard3Ref   = useRef<HTMLDivElement>(null);

  // About teaser
  const aboutTeaserRef  = useRef<HTMLElement>(null);
  const aboutTeaserInner = useRef<HTMLDivElement>(null);
  const aboutCardRefs   = useRef<HTMLDivElement[]>([]);
  const aboutStat1Ref   = useRef<HTMLSpanElement>(null);
  const aboutStat2Ref   = useRef<HTMLSpanElement>(null);
  const aboutStat3Ref   = useRef<HTMLSpanElement>(null);

  // FAQ
  const faqRef      = useRef<HTMLElement>(null);
  const faqLabelRef = useRef<HTMLSpanElement>(null);
  const faqH2Ref    = useRef<HTMLHeadingElement>(null);
  const faqItemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mm  = gsap.matchMedia();
    const ctx = gsap.context(() => {

      // ── Hero ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroBadgeRef.current, { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from(heroH1Ref.current,    { y: 100, opacity: 0, duration: 1 }, '-=0.2')
        .from(heroParaRef.current,  { y: 40,  opacity: 0, duration: 0.8 }, '-=0.5')
        .from(floatingEls.current,  { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.07 }, '-=0.4');

      // ── Form card ─────────────────────────────────────────────────────────
      gsap.from(formCardRef.current, {
        scrollTrigger: { trigger: formSectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        x: -80, opacity: 0, duration: 0.9, ease: 'power3.out',
      });

      // ── Info cards ────────────────────────────────────────────────────────
      [infoCard1Ref, infoCard2Ref, infoCard3Ref].forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: formSectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
          x: 80, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 0.1 + i * 0.13,
        });
      });

      // ── About teaser ──────────────────────────────────────────────────────
      gsap.from(aboutTeaserInner.current, {
        scrollTrigger: { trigger: aboutTeaserRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out',
      });
      aboutCardRefs.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: aboutTeaserRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 40, opacity: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.4)', delay: 0.2 + i * 0.12,
        });
      });

      // Animated counters in about teaser
      if (aboutStat1Ref.current) animateCounter(aboutStat1Ref.current, 50,  'K+');
      if (aboutStat2Ref.current) animateCounter(aboutStat2Ref.current, 200, '+');
      if (aboutStat3Ref.current) animateCounter(aboutStat3Ref.current, 30,  '+');

      // ── FAQ ───────────────────────────────────────────────────────────────
      const fT = { trigger: faqRef.current, start: 'top 84%', toggleActions: 'play none none reverse' };
      gsap.from(faqLabelRef.current, { ...fT, y: -20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      gsap.from(faqH2Ref.current,    { ...fT, y: 40,  opacity: 0, duration: 0.8, delay: 0.1 });
      faqItemRefs.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: faqRef.current, start: 'top 84%', toggleActions: 'play none none reverse' },
          y: 40, opacity: 0, duration: 0.65, ease: 'power2.out', delay: 0.15 + i * 0.08,
        });
      });
    });

    return () => { ctx.revert(); mm.revert(); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus('loading');
    setErrMsg('');
    try {
      await sendContactEmail(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrMsg((err as Error).message || 'Something went wrong. Please try again.');
    }
  };

  const ic = 'w-full px-4 py-3 rounded-xl glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm';

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="color-drop color-drop-1" />
      <div className="color-drop color-drop-2" />
      <div className="color-drop color-drop-3" />

      {/* Background */}
      <div className="fixed top-[-8%] left-[-6%] w-[520px] h-[520px] rounded-full bg-primary/8 blur-[130px] pointer-events-none" />
      <div className="fixed top-[28%] right-[-8%] w-[440px] h-[440px] rounded-full bg-secondary/10 blur-[110px] pointer-events-none" />
      <div className="fixed bottom-[12%] left-[18%] w-[380px] h-[380px] rounded-full bg-accent/8 blur-[110px] pointer-events-none" />
      <div className="fixed top-[14%] right-[4%] w-64 h-64 border border-primary/10 rounded-full pointer-events-none" />
      <div className="fixed bottom-[18%] left-[2%] w-56 h-56 border border-accent/10 rounded-full pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,hsl(var(--primary)) 0px,transparent 1px,transparent 60px,hsl(var(--primary)) 61px)', backgroundSize: '120px 120px' }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle,hsl(var(--foreground)) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ════════════ HERO ════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
          <FluidSimulation autoSplat={true} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4 text-center relative z-10 py-28 sm:py-36">
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-border text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            We reply within 24 hours
          </div>
          <h1 ref={heroH1Ref} className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="tech-text-gradient">GET IN TOUCH</span>
          </h1>
          <p ref={heroParaRef} className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Questions, custom order inquiries, feedback — we read every message ourselves and get back to you fast.
          </p>
        </div>

        <div ref={addFlt} className="absolute top-24 left-10 w-5 h-5 bg-primary rounded-full opacity-50 animate-ping hidden sm:block" />
        <div ref={addFlt} className="absolute bottom-20 right-16 w-4 h-4 bg-secondary rounded-full opacity-40 animate-bounce-slow" />
        <div ref={addFlt} className="absolute top-48 right-24 w-8 h-8 bg-accent rounded-full opacity-40 animate-float hidden sm:block" />
        <div ref={addFlt} className="absolute top-72 left-1/4 w-3 h-3 bg-primary rounded-full opacity-70 animate-pulse" />
        <div ref={addFlt} className="absolute top-32 right-1/3 w-7 h-7 bg-accent rounded-full opacity-30 animate-wiggle hidden sm:block" />
        <div ref={addFlt} className="absolute top-56 right-1/4 w-10 h-10 border border-primary/30 rounded-full animate-spin-slow hidden sm:block" />
        <div ref={addFlt} className="absolute bottom-16 left-1/3 w-2 h-2 bg-secondary rounded-full opacity-60 animate-ping" />
      </section>

      {/* ════════════ FORM + INFO ═════════════════════════════════════════ */}
      <section ref={formSectionRef} className="py-8 sm:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* Form */}
            <div ref={formCardRef} className="glass-effect rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Send a Message</h2>
              </div>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-72 text-center gap-4">
                  <CheckCircle size={56} className="text-primary animate-pulse" />
                  <h3 className="text-xl font-bold tech-text-gradient">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">Thanks for reaching out. We read every message and typically reply within a few hours during business days.</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover-scale transition-all neon-glow">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wide">Your Name</label>
                      <input name="name" type="text" placeholder="e.g. Ali Hassan" value={form.name} onChange={handleChange} required className={ic} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wide">Email Address</label>
                      <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required className={ic} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wide">What&apos;s this about?</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required className={ic}>
                      <option value="" disabled>Select a topic</option>
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Custom Design">Custom Design Help</option>
                      <option value="Return or Exchange">Return / Exchange</option>
                      <option value="Partnership">Partnership / Collab</option>
                      <option value="Press">Press Inquiry</option>
                      <option value="Feedback">General Feedback</option>
                      <option value="Other">Something Else</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wide">Message</label>
                    <textarea name="message" rows={5} placeholder="Tell us what's on your mind — the more detail, the faster we can help." value={form.message} onChange={handleChange} required className={`${ic} resize-none`} />
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">
                      <AlertCircle size={15} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <button type="submit" disabled={status === 'loading'}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover-scale neon-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                    ) : (
                      <><Send size={17} />Send Message</>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">We typically reply within 24 hours on business days.</p>
                </form>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            </div>

            {/* Info column */}
            <div ref={infoColRef} className="flex flex-col gap-5">
              <div ref={infoCard1Ref} className="glass-effect rounded-2xl p-6 flex items-start gap-4 hover-scale transition-all relative overflow-hidden group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 neon-glow">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Email</p>
                  <p className="font-bold">hello@shoestopper.com</p>
                  <p className="text-muted-foreground text-sm">For general enquiries and orders</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div ref={infoCard2Ref} className="glass-effect rounded-2xl p-6 flex items-start gap-4 hover-scale transition-all relative overflow-hidden group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Phone / WhatsApp</p>
                  <p className="font-bold">+92 300 1234567</p>
                  <p className="text-muted-foreground text-sm">Mon–Sat, 10 AM – 7 PM PKT</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div ref={infoCard3Ref} className="glass-effect rounded-2xl p-6 flex items-start gap-4 hover-scale transition-all relative overflow-hidden group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Studio / Showroom</p>
                  <p className="font-bold">12 Liberty Market, Gulberg</p>
                  <p className="text-muted-foreground text-sm">Lahore, Punjab · Pakistan</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Response time promise */}
              <div className="glass-effect rounded-2xl p-6 relative overflow-hidden" style={{ border: '1px solid rgba(var(--primary-rgb,124,58,237),0.22)', borderLeft: '3px solid var(--primary)' }}>
                <p className="text-sm font-bold mb-2">Our Promise</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every message is read by a real person. No bots, no canned replies.
                  Custom order queries get a dedicated response with pricing and timeline within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ABOUT TEASER ════════════════════════════════════════ */}
      <section ref={aboutTeaserRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div ref={aboutTeaserInner} className="glass-effect rounded-3xl p-8 sm:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-primary/8 pointer-events-none rounded-3xl" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Who We Are</span>
                <h2 className="text-3xl sm:text-4xl font-black tech-text-gradient mb-4">The People Behind the Shoes</h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                  Started in a Lahore workshop in 2018, ShoeStopper is built on a single obsession — footwear that performs and means something.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {[
                  { ref: (el: HTMLDivElement | null) => { if (el) aboutCardRefs.current[0] = el; }, statRef: aboutStat1Ref, init: '0K+', label: 'Happy Customers', Icon: Users, color: 'from-primary to-secondary' },
                  { ref: (el: HTMLDivElement | null) => { if (el) aboutCardRefs.current[1] = el; }, statRef: aboutStat2Ref, init: '0+',  label: 'Unique Designs',   Icon: Award, color: 'from-secondary to-accent' },
                  { ref: (el: HTMLDivElement | null) => { if (el) aboutCardRefs.current[2] = el; }, statRef: aboutStat3Ref, init: '0+',  label: 'Countries Shipped', Icon: Globe, color: 'from-accent to-primary' },
                ].map(({ ref, statRef, init, label, Icon, color }) => (
                  <div key={label} ref={ref}
                    className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden group hover-scale transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 neon-glow`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-3xl font-black tech-text-gradient mb-1">
                      <span ref={statRef}>{init}</span>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">{label}</p>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="/about" className="inline-flex items-center gap-2 px-8 py-4 glass-effect rounded-2xl font-bold hover-scale transition-all border border-primary/30 text-sm group">
                  Read Our Full Story
                  <span className="text-primary transition-transform group-hover:translate-x-1 duration-200">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ═════════════════════════════════════════════════ */}
      <section ref={faqRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span ref={faqLabelRef} className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Quick Answers</span>
            <h2 ref={faqH2Ref} className="text-3xl sm:text-5xl font-black tech-text-gradient">Common Questions</h2>
            <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto">Can&apos;t find your answer? Send us a message above.</p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={i} ref={(el) => { if (el) faqItemRefs.current[i] = el; }}
                className="glass-effect rounded-2xl overflow-hidden relative group">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base hover:text-primary transition-colors"
                >
                  {f.q}
                  <span className={`text-primary text-xl font-light transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {f.a}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;