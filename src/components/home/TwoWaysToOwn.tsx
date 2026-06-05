import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, PenTool, ShoppingBag, ArrowRight } from 'lucide-react';
import BlurFade from '../ui/BlurFade';

interface TwoWaysToOwnProps {
  onStartBuilding: () => void;
  onSeeAllModels: () => void;
}

export default function TwoWaysToOwn({ onStartBuilding, onSeeAllModels }: TwoWaysToOwnProps) {
  return (
    <section id="two-ways-section" className="py-20 bg-stone-50 border-y border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Centered Heading */}
        <BlurFade delay={0.05}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs tracking-widest font-mono text-zinc-500 uppercase bg-zinc-200/50 px-3 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-3xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Tailored Pure Organic Sleep
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mt-4 text-brand-950">
              Two Ways to Own a RelaxPro
            </h2>
            <p className="text-stone-500 text-xs mt-2 leading-relaxed font-sans max-w-lg mx-auto">
              Whether you want to orchestrate your custom orthopedic configuration layer by layer or choose from our plantation-tested pre-built formulations.
            </p>
          </div>
        </BlurFade>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Option 1: Build Your Own */}
          <BlurFade delay={0.1}>
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-xs hover:shadow-lg transition-shadow p-8 lg:p-10 flex flex-col justify-between h-full relative overflow-hidden group"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-100/50 rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-110 duration-500 ease-out z-0" />
              
              <div className="relative z-10 space-y-6">
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-amber-100 flex items-center justify-center shrink-0 shadow-md">
                  <PenTool className="w-5 h-5 text-sky-400" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-brand-950 tracking-tight">
                    Build your own
                  </h3>
                  <p className="font-serif italic text-zinc-500 text-xs mt-1">
                    Customize your mattress, layer by layer.
                  </p>
                  <p className="text-stone-600 text-xs mt-4 leading-relaxed font-sans">
                    Pick the cover fabric, choose each comfort layer, dial in the thickness. We craft it to your spec in 5–7 days.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 relative z-10">
                <button
                  onClick={onStartBuilding}
                  className="w-full bg-brand-950 hover:bg-zinc-800 text-white font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Start building <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </BlurFade>

          {/* Option 2: Shop Pre-built */}
          <BlurFade delay={0.15}>
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-xs hover:shadow-lg transition-shadow p-8 lg:p-10 flex flex-col justify-between h-full relative overflow-hidden group/card"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-sky-50 rounded-bl-full -mr-6 -mt-6 transition-all group-hover/card:scale-110 duration-500 ease-out z-0" />

              <div className="relative z-10 space-y-6">
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-sky-600 flex items-center justify-center shrink-0 shadow-md border border-sky-100">
                  <ShoppingBag className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-brand-950 tracking-tight">
                    Shop pre-built
                  </h3>
                  <p className="font-serif italic text-zinc-500 text-xs mt-1">
                    Our mattresses, ready to ship.
                  </p>
                  <p className="text-stone-600 text-xs mt-4 leading-relaxed font-sans">
                    Thirteen hand-crafted models across three collections. Pick the one that fits, and we'll deliver it to your door in 5–7 days.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 relative z-10">
                <button
                  onClick={onSeeAllModels}
                  className="w-full bg-zinc-100 hover:bg-zinc-250 hover:text-brand-950 text-stone-700 font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 group-hover/card:gap-3 border border-zinc-200"
                >
                  See all models <ArrowRight className="w-3.5 h-3.5 text-brand-900 group-hover/card:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
