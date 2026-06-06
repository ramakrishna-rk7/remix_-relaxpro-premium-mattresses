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
    <section id="two-ways-section" className="py-24 md:py-32 bg-neutral-light border-y border-brand-200/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Centered Heading */}
        <BlurFade delay={0.05}>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-[11px] tracking-widest font-accent font-bold text-accent uppercase bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Tailored Pure Organic Sleep
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 text-primary leading-tight">
              Two Ways to Own a RelaxPro
            </h2>
            <p className="text-neutral-dark/70 text-sm md:text-base mt-4 leading-relaxed font-body max-w-lg mx-auto">
              Whether you want to orchestrate your custom orthopedic configuration layer by layer or choose from our plantation-tested pre-built formulations.
            </p>
          </div>
        </BlurFade>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Option 1: Build Your Own */}
          <BlurFade delay={0.1}>
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 p-8 lg:p-12 flex flex-col justify-between h-full relative overflow-hidden group"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 duration-700 ease-out z-0" />
              
              <div className="relative z-10 space-y-6">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  <PenTool className="w-6 h-6 text-accent" />
                </div>

                <div className="pt-2">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
                    Build your own
                  </h3>
                  <p className="font-heading italic text-accent text-sm mt-2">
                    &ldquo;Customize your mattress, layer by layer.&rdquo;
                  </p>
                  <p className="text-neutral-dark/70 text-sm mt-5 leading-relaxed font-body">
                    Pick the cover fabric, choose each comfort layer, dial in the thickness. We craft it to your spec in 5–7 days.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-brand-200/40 relative z-10">
                <button
                  onClick={onStartBuilding}
                  className="w-full btn-primary bg-primary hover:bg-neutral-dark text-white font-accent font-bold text-[13px] tracking-widest uppercase py-4.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 shadow-md"
                >
                  Start building <ArrowRight className="w-4 h-4 text-accent" />
                </button>
              </div>
            </motion.div>
          </BlurFade>

          {/* Option 2: Shop Pre-built */}
          <BlurFade delay={0.15}>
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 p-8 lg:p-12 flex flex-col justify-between h-full relative overflow-hidden group"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-100/50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 duration-700 ease-out z-0" />

              <div className="relative z-10 space-y-6">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-neutral-light text-primary flex items-center justify-center shrink-0 shadow-sm border border-brand-200/60 group-hover:scale-110 transition-transform duration-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>

                <div className="pt-2">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
                    Shop pre-built
                  </h3>
                  <p className="font-heading italic text-accent text-sm mt-2">
                    &ldquo;Our mattresses, ready to ship.&rdquo;
                  </p>
                  <p className="text-neutral-dark/70 text-sm mt-5 leading-relaxed font-body">
                    Thirteen hand-crafted models across three collections. Pick the one that fits, and we'll deliver it to your door in 5–7 days.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-brand-200/40 relative z-10">
                <button
                  onClick={onSeeAllModels}
                  className="w-full bg-neutral-light hover:bg-brand-100 text-primary font-accent font-bold text-[13px] tracking-widest uppercase py-4.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 border border-brand-200/60 shadow-sm"
                >
                  See all models <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </motion.div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
