'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, X, RefreshCw, Zap, Shield, Palette, Ruler, Star, MessageSquare } from 'lucide-react';
import { FluidSimulation } from '../components/FluidSimulationNew';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Selections {
  size:  string;
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const SIZES = ['7', '8', '9', '10', '11', '12'];
const BASE_PRICE = 15000;

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Style',       desc: 'Pick your size and share any customization details you have in mind.' },
  { step: '02', title: 'Upload a Reference',      desc: 'Add an image for extra inspiration — a mood board, a design sketch, anything.' },
  { step: '03', title: 'We Handcraft Your Pair',  desc: 'Our artisans build your shoes individually. No assembly line.' },
  { step: '04', title: 'Ships to Your Door',      desc: 'Packed in a signature ShoeStopper box. Yours within 5–7 business days.' },
];

const FEATURES = [
  { Icon: Palette, title: 'Total Color Control',  desc: 'Request any colorway or bespoke shade — our team will match your vision.' },
  { Icon: Ruler,   title: 'Sizes 7–12',           desc: 'Full range available. Reach out for a custom fit consultation.' },
  { Icon: Shield,  title: '14-Day Fit Guarantee', desc: 'If the fit is off, we fix it. No questions.' },
  { Icon: Zap,     title: '5–7 Day Turnaround',   desc: 'From order confirmation to your door.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const Customize = () => {
  const defaultShoeImage = 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=450&fit=crop';

  const { addToCart } = useCart();
  const { toast } = useToast();

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [selections, setSelections] = useState<Selections>({ size: '', notes: '' });
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Refs for GSAP
  const heroH1Ref       = useRef<HTMLHeadingElement>(null);
  const heroParaRef     = useRef<HTMLParagraphElement>(null);
  const floatingEls     = useRef<HTMLElement[]>([]);
  const addFlt = (el: HTMLElement | null) => { if (el && !floatingEls.current.includes(el)) floatingEls.current.push(el); };

  const builderRef      = useRef<HTMLElement>(null);
  const previewColRef   = useRef<HTMLDivElement>(null);
  const optionsColRef   = useRef<HTMLDivElement>(null);

  const howItWorksRef   = useRef<HTMLElement>(null);
  const howStepRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const featuresRef     = useRef<HTMLElement>(null);
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ctaRef          = useRef<HTMLElement>(null);
  const ctaInner        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroH1Ref.current,   { y: 100, opacity: 0, duration: 1 })
        .from(heroParaRef.current, { y: 40,  opacity: 0, duration: 0.8 }, '-=0.5')
        .from(floatingEls.current.filter(Boolean), { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.07 }, '-=0.4');

      gsap.from(previewColRef.current, {
        scrollTrigger: { trigger: builderRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        x: -80, opacity: 0, duration: 0.9, ease: 'power3.out',
      });
      gsap.from(optionsColRef.current, {
        scrollTrigger: { trigger: builderRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        x: 80, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
      });

      howStepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'back.out(1.4)', delay: i * 0.12,
            scrollTrigger: { trigger: howItWorksRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } }
        );
      });

      featureCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.09,
            scrollTrigger: { trigger: featuresRef.current, start: 'top 84%', toggleActions: 'play none none reverse' } }
        );
      });

      gsap.from(ctaInner.current, {
        scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  // ── Image handlers ──────────────────────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReplaceImage = () => fileInputRef.current?.click();

  // ── Add to cart ─────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!selections.size) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }

    addToCart({
      id: 'custom-pair',
      name: 'Custom Handcrafted Pair',
      image: uploadedImage || defaultShoeImage,
      price: BASE_PRICE,
      size: selections.size,
      quantity: 1,
    });

    toast({
      title: 'Added to Cart',
      description: `Custom Pair (Size ${selections.size}) was added to your cart.`,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="color-drop color-drop-1" />
      <div className="color-drop color-drop-2" />
      <div className="color-drop color-drop-3" />
      <div className="fixed top-[-8%] left-[-6%] w-[520px] h-[520px] rounded-full bg-primary/8 blur-[130px] pointer-events-none" />
      <div className="fixed top-[28%] right-[-8%] w-[440px] h-[440px] rounded-full bg-secondary/10 blur-[110px] pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,hsl(var(--primary)) 0px,transparent 1px,transparent 60px,hsl(var(--primary)) 61px)', backgroundSize: '120px 120px' }} />

      {/* ════════════ HERO ════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
          <FluidSimulation autoSplat={true} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

        <div className="container mx-auto px-4 text-center relative z-10 py-28 sm:py-36">
          <h1 ref={heroH1Ref} className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="tech-text-gradient">BUILD YOUR</span>
            <br />
            <span className="tech-text-gradient">PERFECT PAIR</span>
          </h1>
          <p ref={heroParaRef} className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Choose your size. Upload a reference if you have one.
            Tell us your vision we build it by hand and ship it straight to you.
          </p>
        </div>

        <span ref={addFlt} className="absolute top-24 left-10 w-5 h-5 bg-primary rounded-full opacity-50 animate-ping hidden sm:block" />
        <span ref={addFlt} className="absolute bottom-20 right-16 w-4 h-4 bg-secondary rounded-full opacity-40 animate-bounce-slow" />
        <span ref={addFlt} className="absolute top-48 right-24 w-8 h-8 bg-accent rounded-full opacity-40 animate-float hidden sm:block" />
        <span ref={addFlt} className="absolute top-72 left-1/4 w-3 h-3 bg-primary rounded-full opacity-70 animate-pulse" />
        <span ref={addFlt} className="absolute top-56 right-1/4 w-10 h-10 border border-primary/30 rounded-full animate-spin-slow hidden sm:block" />
      </section>

      {/* ════════════ BUILDER ═════════════════════════════════════════════ */}
      <section ref={builderRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black tech-text-gradient mb-3">Customize Your Pair</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Every choice is yours. No compromise.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* ── Preview column ── */}
            <div ref={previewColRef} className="flex flex-col gap-6">

              {/* Main shoe preview */}
              <div className="glass-effect rounded-2xl p-4 sm:p-6 relative overflow-hidden" style={{ borderTop: '3px solid hsl(var(--primary))' }}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={uploadedImage || defaultShoeImage}
                    alt="Shoe Preview"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute top-3 left-3 glass-effect rounded-lg px-3 py-1.5 text-xs font-semibold text-primary">
                    Custom Build
                  </div>
                </div>
              </div>

              {/* Upload area */}
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="glass-effect rounded-2xl p-7 border-2 border-dashed border-primary/40 hover:border-primary cursor-pointer hover-scale transition-all text-center group"
                >
                  <Upload className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" size={40} />
                  <p className="font-bold text-base mb-1">Upload Your Reference</p>
                  <p className="text-muted-foreground text-sm">PNG, JPG, GIF — mood boards, sketches, anything</p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              ) : (
                <div className="glass-effect rounded-2xl p-5 flex items-center gap-4">
                  <img src={uploadedImage} alt="Uploaded reference" className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Reference Uploaded</p>
                    <p className="font-semibold text-sm truncate">{uploadedFileName || 'Custom design'}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={handleReplaceImage} title="Replace image"
                      className="w-9 h-9 rounded-xl glass-effect border border-border flex items-center justify-center hover:border-primary transition-colors">
                      <RefreshCw size={14} className="text-muted-foreground" />
                    </button>
                    <button onClick={handleRemoveImage} title="Remove image"
                      className="w-9 h-9 rounded-xl glass-effect border border-red-400/30 flex items-center justify-center hover:border-red-400 hover:bg-red-400/10 transition-colors">
                      <X size={14} className="text-red-400" />
                    </button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              )}

              {/* Price summary */}
              <div className="glass-effect rounded-2xl p-6 relative overflow-hidden" style={{ border: '1px solid rgba(var(--primary-rgb,124,58,237),0.22)' }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-base">Your Build Summary</p>
                  <div className="text-2xl font-black tech-text-gradient">Rs. {BASE_PRICE.toLocaleString()}+</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Base price</span><span>Rs. {BASE_PRICE.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Size</span><span className="text-foreground">{selections.size ? `UK ${selections.size}` : '—'}</span></div>
                  {selections.notes && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="flex-shrink-0">Custom requests</span>
                      <span className="text-foreground text-right line-clamp-2">{selections.notes.length > 40 ? selections.notes.slice(0, 40) + '…' : selections.notes}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Final price may vary based on customization complexity. Our team will confirm before processing.</p>
                </div>
                <div className="mt-3 flex justify-between font-black">
                  <span>Starting from</span>
                  <span className="tech-text-gradient">Rs. {BASE_PRICE.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* ── Options column ── */}
            <div ref={optionsColRef} className="flex flex-col gap-6">

              {/* Size */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-black text-base mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">1</span>
                  Size
                  <span className="text-red-400 text-xs font-normal ml-1">* required</span>
                </h3>

                {sizeError && (
                  <p className="text-red-400 text-xs mb-3 mt-1 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
                    Please select a size to continue
                  </p>
                )}
                

                <div className="grid grid-cols-6 gap-3">
                  {SIZES.map((s) => {
                    const active = selections.size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => { setSelections((p) => ({ ...p, size: s })); setSizeError(false); }}
                        className={`py-3 rounded-xl font-bold text-sm transition-all hover-scale ${
                          active
                            ? 'bg-primary text-primary-foreground neon-glow'
                            : sizeError
                              ? 'glass-effect border border-red-400/40 text-foreground/70 hover:border-primary/50 hover:text-foreground'
                              : 'glass-effect border border-white/20 text-foreground/70 hover:border-primary/50 hover:text-foreground hover:bg-primary/10'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3">UK sizing</p>
              </div>

              {/* Custom notes */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-black text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">2</span>
                  Customization Notes
                  <span className="text-muted-foreground text-xs font-normal ml-1">(optional)</span>
                </h3>
                <div className="relative">
                  <MessageSquare size={16} className="absolute top-3.5 left-3.5 text-muted-foreground pointer-events-none" />
                  <textarea
                    value={selections.notes}
                    onChange={(e) => setSelections((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="Describe your vision — materials, patterns, colors, embroidery, special requests, anything at all. Our team will reach out to discuss the details."
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/25 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/5 text-foreground outline-none text-sm resize-none placeholder:text-muted-foreground/50"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Complex customizations may affect the final price. We'll confirm with you before processing.
                </p>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-5 rounded-2xl font-black text-base transition-all relative overflow-hidden ${
                  addedToCart
                    ? 'bg-primary text-white'
                    : 'bg-primary text-primary-foreground neon-glow hover-scale animate-pulse-glow'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Star size={18} className="fill-white" /> Added to Cart!
                  </span>
                ) : (
                  `Add Custom Pair to Cart — Rs. ${BASE_PRICE.toLocaleString()}+`
                )}
              </button>

              {!selections.size && !sizeError && (
                <p className="text-center text-xs text-muted-foreground -mt-3">Select a size above to continue</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════════════════════════════════ */}
      <section ref={howItWorksRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">The Process</span>
            <h2 className="text-3xl sm:text-5xl font-black tech-text-gradient">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">Four steps from configuration to your door. Every pair built one at a time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} ref={(el) => { howStepRefs.current[i] = el; }}
                className="glass-effect rounded-2xl p-6 relative overflow-hidden group hover-scale transition-all">
                <div className="text-5xl font-black text-white/80 mb-4 select-none leading-none">{step.step}</div>
                <h3 className="font-black text-base mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════════════════════════════════════ */}
      <section ref={featuresRef} className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Why Customize With Us</span>
            <h2 className="text-3xl sm:text-5xl font-black tech-text-gradient">Built Different</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={title} ref={(el) => { featureCardRefs.current[i] = el; }}
                className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden group hover-scale transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 neon-glow">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-black text-base mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.18) 0%, hsl(var(--secondary)/0.12) 50%, hsl(var(--primary)/0.10) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid hsl(var(--primary)/0.25)',
              boxShadow: '0 0 80px hsl(var(--primary)/0.15)',
            }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-primary/20 blur-[70px] animate-pulse" />
              <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-secondary/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-8 right-8 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block opacity-80">Not Sure Where to Start?</span>
              <h2 className="text-3xl sm:text-5xl font-black mb-6 tech-text-gradient">Talk to Our Team</h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-xl mx-auto">
                Have a specific vision? Share a reference image or describe what you want and we will guide you through every decision — material, color, fit, everything.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover-scale neon-glow transition-all text-base">Talk to a Designer</a>
                <a href="/products" className="px-10 py-4 glass-effect rounded-2xl font-bold hover-scale transition-all border-2 border-secondary text-base animate-float">Browse Catalogue</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customize;