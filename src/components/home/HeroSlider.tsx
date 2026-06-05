import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle, ChevronRight, ChevronLeft, Home, Users, Truck } from 'lucide-react';
import NumberTicker from '../ui/NumberTicker';
import BlurFade from '../ui/BlurFade';

interface HeroSliderProps {
  onNavigate: (page: string) => void;
  onNavigateToPdp: (slug: string) => void;
}

export default function HeroSlider({ onNavigate, onNavigateToPdp }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 2; // Architecture & VIP Home Service

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  return (
    <section className="relative bg-brand-50 border-b border-brand-200 pt-8 pb-20 md:py-20 px-4 md:px-8 overflow-hidden min-h-auto md:min-h-[600px] flex items-center">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 space-y-8">
                <BlurFade delay={0.1}>
                  <span className="text-[10px] tracking-widest font-mono text-brand-600 uppercase bg-brand-100 border border-brand-200 px-3.5 py-1.5 rounded-sm inline-flex items-center gap-1.5 font-bold">
                    <Sparkle className="w-3.5 h-3.5 text-brand-500" /> India's Finest Hand-Crafted Natural Latex
                  </span>
                </BlurFade>
                
                <BlurFade delay={0.2}>
                  <h1 className="text-5xl md:text-6xl font-display font-medium tracking-tight leading-tight">
                    <span className="text-black">Sleep</span> <span className="text-amber-800 italic font-serif">Better</span>, <br />
                    <span className="text-black">Wake</span> <span className="text-amber-800 italic font-serif">Better.</span>
                  </h1>
                </BlurFade>
                
                <BlurFade delay={0.3}>
                  <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed max-w-xl">
                    For three generations, RelaxPro has crafted natural latex mattresses by hand in Hyderabad. Honest materials. Real comfort.
                  </p>
                </BlurFade>

                {/* Highlights tags */}
                <BlurFade delay={0.4}>
                  <div className="flex gap-8 border-t border-brand-200 pt-8 text-xs font-mono text-zinc-650">
                    <div>
                      <div className="text-2xl font-bold font-sans text-brand-950 flex items-baseline">
                        <NumberTicker value={10} suffix="-Year" />
                      </div>
                      <p className="text-[9px] uppercase tracking-wider text-zinc-400 mt-1 font-bold">Warranty</p>
                    </div>
                    <div className="border-l border-brand-200 pl-8">
                      <div className="text-2xl font-bold font-sans text-brand-950 flex items-baseline">
                        GOLS
                      </div>
                      <p className="text-[9px] uppercase tracking-wider text-zinc-400 mt-1 font-bold">Certified Latex</p>
                    </div>
                  </div>
                </BlurFade>

                {/* CTAs */}
                <BlurFade delay={0.5}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 text-xs font-bold tracking-widest font-sans uppercase">
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="bg-brand-950 hover:bg-zinc-800 active:bg-black text-white py-4 px-10 rounded-full shadow-xs transition-opacity flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Shop Mattresses
                    </button>
                    <button
                      onClick={() => onNavigate('builder')}
                      className="border border-brand-200 hover:border-brand-500 text-brand-950 hover:bg-white bg-transparent py-4 px-10 rounded-full tracking-widest font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      Build Your Own <span>→</span>
                    </button>
                  </div>
                </BlurFade>
              </div>

              {/* Hero side layout - Visual Product showcase cards */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                <div className="absolute -inset-1 bg-brand-200/40 rounded-3xl blur-md opacity-30"></div>
                <div 
                  onClick={() => onNavigateToPdp('nirvana')}
                  className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow group"
                >
                  <div className="absolute top-4 right-4 bg-brand-800/10 text-brand-800 text-[9px] font-bold font-mono py-1 px-2.5 uppercase rounded z-10">
                    DTC PROMO: FACTORY5
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
                    alt="Nirvana mattress layout"
                    className="w-full h-56 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-display font-medium text-brand-950 text-lg group-hover:text-amber-700 transition-colors">Nirvana 8" Zone Latex</h4>
                  <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-sans">one side 7-zone target orthopedic relief + one side monozone</p>
                  <div className="mt-4 pt-4 border-t border-brand-200/50 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-zinc-400 block uppercase font-mono tracking-wider font-bold">DTC FACTORY PRICE</span>
                      <span className="text-xl font-bold text-brand-950 font-sans">₹24,500</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToPdp('nirvana');
                      }}
                      className="border border-brand-200 hover:border-brand-500 text-brand-950 hover:bg-brand-50 rounded-full py-2.5 px-5 text-xs font-bold font-sans tracking-widest uppercase transition-colors cursor-pointer"
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
              className="w-full flex flex-col items-center justify-center bg-brand-950 text-white rounded-[2rem] p-6 md:p-10 relative overflow-hidden"
            >
              {/* Dark mode background for slide 2 */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <BlurFade delay={0.1}>
                <div className="text-center max-w-2xl mx-auto space-y-3 md:space-y-4 relative z-10 w-full md:mt-2">
                  <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight mt-2">
                    Door to Door Service for <br className="hidden md:block"/>
                    <span className="italic text-zinc-400 font-serif">our valuable customers.</span>
                  </h2>
                  
                  <p className="font-sans text-xs md:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                    We bring the showroom to you. Our sleep executive will visit your home with physical latex samples, measure your bed base, and help you customize the perfect mattress—all in the comfort of your bedroom.
                  </p>
                </div>
              </BlurFade>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8 md:mt-10 max-w-4xl mx-auto relative z-10">
                {[
                  {
                    icon: <Home className="w-5 h-5 text-brand-500" />,
                    title: "Home Visit",
                    desc: "Schedule a free consultation and we'll come directly to your house."
                  },
                  {
                    icon: <Users className="w-5 h-5 text-brand-500" />,
                    title: "Expert Guidance",
                    desc: "Our executive will bring samples and guide you through firmness options."
                  },
                  {
                    icon: <Truck className="w-5 h-5 text-brand-500" />,
                    title: "Doorstep Delivery",
                    desc: "We take your order and deliver the custom-crafted mattress to your door."
                  }
                ].map((feature, idx) => (
                  <BlurFade key={idx} delay={0.2 + idx * 0.1}>
                    <div className="bg-brand-900/30 border border-brand-800/50 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center space-y-3 hover:border-brand-500/50 transition-colors h-full">
                      <div className="w-12 h-12 rounded-full bg-brand-950 border border-brand-800 shadow-inner flex items-center justify-center shrink-0">
                        {feature.icon}
                      </div>
                      <h3 className="font-display font-bold text-base md:text-lg">{feature.title}</h3>
                      <p className="text-[11px] md:text-xs font-sans text-zinc-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>

              <BlurFade delay={0.5}>
                <div className="mt-8 md:mt-10 bg-gradient-to-r from-amber-600/20 via-amber-600/40 to-amber-600/20 border border-brand-500/30 rounded-3xl p-5 md:p-6 text-center max-w-2xl mx-auto shadow-xl relative z-10 w-full overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-display font-bold text-lg md:text-xl text-amber-100 mb-2">
                    “Akadaina konukune mundu mā daggara okasāri kanukondi”
                  </h3>
                  <p className="font-sans text-[10px] md:text-xs text-zinc-300 font-medium tracking-wide uppercase">
                    👉 Before buying anywhere else, please check with us once. You get it right.
                  </p>
                </div>
              </BlurFade>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <button 
            onClick={prevSlide}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${currentSlide === 1 ? 'bg-brand-800 text-white hover:bg-brand-700' : 'bg-brand-200 text-brand-950 hover:bg-brand-300'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? (currentSlide === 1 ? 'bg-brand-400 w-6' : 'bg-brand-600 w-6') 
                    : (currentSlide === 1 ? 'bg-brand-800' : 'bg-brand-300')
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${currentSlide === 1 ? 'bg-brand-800 text-white hover:bg-brand-700' : 'bg-brand-200 text-brand-950 hover:bg-brand-300'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
