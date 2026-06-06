import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle, ChevronRight, ChevronLeft, ChevronDown, Home, Users, Truck, Shield, Award } from 'lucide-react';
import NumberTicker from '../ui/NumberTicker';
import BlurFade from '../ui/BlurFade';

interface HeroSliderProps {
  onNavigate: (page: string) => void;
  onNavigateToPdp: (slug: string) => void;
}

export default function HeroSlider({ onNavigate, onNavigateToPdp }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  return (
    <section
      id="main-content"
      className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh] flex items-center noise-overlay"
      style={{
        background: 'linear-gradient(135deg, #1A2340 0%, #0F1729 50%, #1A2340 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Decorative SVG shape */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04] pointer-events-none hidden lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="#D4A853" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="140" stroke="#D4A853" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="100" stroke="#D4A853" strokeWidth="0.2" />
      </svg>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-16 md:py-0 relative z-10">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column — Text Content */}
              <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
                {/* Pre-headline badge */}
                <BlurFade delay={0.1}>
                  <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-4 py-2 rounded-full text-[11px] font-accent font-bold tracking-wider uppercase">
                    <span className="text-sm">⭐</span> #1 Rated Mattress Store 2025
                  </span>
                </BlurFade>

                {/* Main Headline */}
                <BlurFade delay={0.2}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-bold tracking-tight leading-[1.1]">
                    <span className="text-white block" style={{ animation: 'wordSlideUp 0.6s ease forwards', animationDelay: '0.1s', opacity: 0 }}>Sleep Like</span>
                    <span className="text-white block" style={{ animation: 'wordSlideUp 0.6s ease forwards', animationDelay: '0.25s', opacity: 0 }}>You've <span className="text-accent italic">Never</span></span>
                    <span className="text-white block" style={{ animation: 'wordSlideUp 0.6s ease forwards', animationDelay: '0.4s', opacity: 0 }}>Slept <span className="text-accent italic">Before.</span></span>
                  </h1>
                </BlurFade>

                {/* Subheadline */}
                <BlurFade delay={0.4}>
                  <p className="text-white/60 font-body text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Premium mattresses crafted for deep, restorative sleep. 100% natural GOLS certified latex, direct from Kerala to your bedroom.
                  </p>
                </BlurFade>

                {/* CTA Buttons */}
                <BlurFade delay={0.5}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="btn-primary bg-accent hover:bg-accent-dark text-primary py-4 px-8 sm:px-10 rounded-full shadow-lg shadow-accent/20 text-xs font-bold font-accent uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                    >
                      Shop Mattresses
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('builder')}
                      className="border border-white/25 hover:border-white/50 hover:bg-white/10 text-white py-4 px-8 sm:px-10 rounded-full text-xs font-bold font-accent uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      Build Your Own →
                    </button>
                  </div>
                </BlurFade>

                {/* Trust Row */}
                <BlurFade delay={0.6}>
                  <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 justify-center lg:justify-start overflow-x-auto">
                    {[
                      { icon: <Truck className="w-4 h-4" />, text: 'Free Delivery' },
                      { icon: <Shield className="w-4 h-4" />, text: '100-Night Trial' },
                      { icon: <Award className="w-4 h-4" />, text: '10-Year Warranty' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-white/50 text-xs font-accent whitespace-nowrap"
                      >
                        <span className="text-accent">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </BlurFade>
              </div>

              {/* Right Column — Product Showcase */}
              <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                {/* Halo glow behind card */}
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl opacity-50" />

                <div
                  onClick={() => onNavigateToPdp('nirvana')}
                  className="animate-float bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-6 relative cursor-pointer hover:border-accent/40 transition-all duration-500 group"
                >
                  <div className="absolute top-4 right-4 bg-accent/20 text-accent text-[9px] font-bold font-accent py-1 px-2.5 uppercase rounded-full z-10 tracking-wider">
                    Bestseller
                  </div>
                  <div className="img-zoom rounded-xl overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
                      alt="Nirvana 8-inch dual zone natural latex mattress in a bedroom setting"
                      className="w-full h-48 md:h-56 object-cover rounded-xl"
                      loading="eager"
                      width={800}
                      height={450}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-heading font-semibold text-white text-lg group-hover:text-accent transition-colors">
                    Nirvana 8" Zone Latex
                  </h4>
                  <p className="text-white/40 text-xs mt-1.5 leading-relaxed font-body">
                    7-zone orthopedic relief + monozone — handcrafted from Kerala organic latex
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/30 block uppercase font-accent tracking-wider font-bold">
                        Factory Direct
                      </span>
                      <span className="text-xl font-bold text-white font-body">₹24,500</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToPdp('nirvana');
                      }}
                      className="border border-accent/40 hover:bg-accent hover:text-primary text-accent rounded-full py-2.5 px-5 text-xs font-bold font-accent tracking-wider uppercase transition-all cursor-pointer"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center relative overflow-hidden py-8"
            >
              <BlurFade delay={0.1}>
                <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10 w-full">
                  <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-4 py-2 rounded-full text-[11px] font-accent font-bold tracking-wider uppercase">
                    <Home className="w-3.5 h-3.5" /> VIP Home Service
                  </span>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mt-4">
                    Door to Door Service for{' '}
                    <br className="hidden md:block" />
                    <span className="italic text-accent font-heading">Our Valuable Customers.</span>
                  </h2>
                  <p className="font-body text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
                    We bring the showroom to you. Our sleep executive visits your home with latex samples, measures your bed base, and customizes the perfect mattress.
                  </p>
                </div>
              </BlurFade>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-10 max-w-4xl mx-auto relative z-10 w-full px-4">
                {[
                  {
                    icon: <Home className="w-5 h-5 text-accent" />,
                    title: 'Home Visit',
                    desc: 'Schedule a free consultation and we\'ll come directly to your house.',
                  },
                  {
                    icon: <Users className="w-5 h-5 text-accent" />,
                    title: 'Expert Guidance',
                    desc: 'Our executive brings samples and guides you through firmness options.',
                  },
                  {
                    icon: <Truck className="w-5 h-5 text-accent" />,
                    title: 'Doorstep Delivery',
                    desc: 'Custom-crafted mattress delivered and set up in your bedroom.',
                  },
                ].map((feature, idx) => (
                  <BlurFade key={idx} delay={0.2 + idx * 0.1}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center space-y-3 hover:border-accent/30 transition-colors h-full">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        {feature.icon}
                      </div>
                      <h3 className="font-heading font-bold text-base md:text-lg text-white">{feature.title}</h3>
                      <p className="text-[11px] md:text-xs font-body text-white/40 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>

              <BlurFade delay={0.5}>
                <div className="mt-10 bg-accent/10 border border-accent/20 rounded-2xl p-5 md:p-6 text-center max-w-2xl mx-auto relative z-10 w-full">
                  <h3 className="font-heading font-bold text-lg md:text-xl text-accent mb-2">
                    "Akadaina konukune mundu mā daggara okasāri kanukondi"
                  </h3>
                  <p className="font-body text-[11px] md:text-xs text-white/50 font-medium tracking-wide uppercase">
                    👉 Before buying anywhere else, please check with us once.
                  </p>
                </div>
              </BlurFade>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20">
          <span className="text-white/30 text-[10px] font-accent uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/40 animate-bounce-arrow" />
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-20">
          <button
            onClick={prevSlide}
            className="p-1 md:p-1.5 rounded-full transition-colors cursor-pointer bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>

          <div className="flex gap-1.5 md:gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'bg-accent w-4 md:w-6'
                    : 'bg-white/20 w-1.5 md:w-2'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-1 md:p-1.5 rounded-full transition-colors cursor-pointer bg-white/10 text-white hover:bg-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
