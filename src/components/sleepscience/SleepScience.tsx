import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Shield, Check, Info, Heart, Airplay, Sparkles, Activity, FileText } from 'lucide-react';

export default function SleepScience() {
  const [activeTab, setActiveTab] = useState<'kerala' | 'postures' | 'certifications'>('kerala');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full font-bold">
          PHYSIOLOGICAL WELLNESS DATABASE
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight mt-4 text-brand-950">
          The Science of Sleep Orthopedics
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed font-sans text-md">
          Deep, restorative sleep is not mystical—it is mechanical and thermal. Explore how natural Dunlop rubber latex supports natural posture and thermoregulates your sleeping climate natively.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-zinc-100 p-1 rounded-2xl border border-zinc-200 text-sm font-semibold max-w-xl mx-auto mb-12">
        <button
          onClick={() => setActiveTab('kerala')}
          className={`flex-1 py-3 px-4 rounded-xl font-display transition-all cursor-pointer text-center ${
            activeTab === 'kerala' ? 'bg-brand-950 text-white shadow-md' : 'text-zinc-500 hover:text-brand-950'
          }`}
        >
          Dunlop Latex vs Foam
        </button>
        <button
          onClick={() => setActiveTab('postures')}
          className={`flex-1 py-3 px-4 rounded-xl font-display transition-all cursor-pointer text-center ${
            activeTab === 'postures' ? 'bg-brand-950 text-white shadow-md' : 'text-zinc-500 hover:text-brand-950'
          }`}
        >
          Spine Alignment Postures
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`flex-1 py-3 px-4 rounded-xl font-display transition-all cursor-pointer text-center ${
            activeTab === 'certifications' ? 'bg-brand-950 text-white shadow-md' : 'text-zinc-500 hover:text-brand-950'
          }`}
        >
          Certified Organic Audits
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 md:p-10 rounded-3xl border border-zinc-200/50 shadow-md"
        >
          {activeTab === 'kerala' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded font-bold">PHYSIOLOGY COMPARSION</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-brand-950 leading-tight">
                Why 100% Kerala Dunlop Rubber Latex Core Leads the World
              </h2>
              <p className="text-stone-600 text-xs leading-relaxed font-sans">
                Conventional polyurethane foams are petrochemical byproducts. They rely on gas-expanding polymers that sink and entrap heat, creating a "sleeping in a ditch" feeling that strains lumbar tendons over several hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <Activity className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-display font-semibold text-xs text-brand-950 block">Instantaneous Spring Back Reaction</strong>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                      Latex holds deep natural elasticity. Unlike memory foam which adapts slowly, Dunlop rubber pushes back dynamically according to the force applied, keeping hips afloat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <Airplay className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-display font-semibold text-xs text-brand-950 block">Open-Cell Honeycomb Microclimate</strong>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                      Liquid rubber sap is whipped before setting, resulting in millions of interconnected open micropores. Air flows naturally with your movements, lowering night sweating.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Card rendering comparisons directly */}
            <div className="bg-brand-50 p-6 md:p-8 rounded-2xl border border-brand-200/60 font-sans text-xs">
              <h3 className="font-display font-semibold text-stone-900 text-sm mb-4">Direct Science Comparison</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 font-semibold pb-2 border-b border-brand-200 font-mono text-[10px]">
                  <span>CRITERIA</span>
                  <span className="text-brand-800">DUNLOP LATEX</span>
                  <span className="text-zinc-500">MEMORY FOAM</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-brand-200/50">
                  <span className="font-medium text-stone-900">Push-Back Support</span>
                  <span className="text-emerald-700 font-medium">Excellent (Adaptive)</span>
                  <span className="text-rose-700">Poor (Sunken Sink-in)</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-brand-200/50">
                  <span className="font-medium text-stone-900">Heat Dispersion</span>
                  <span className="text-emerald-700 font-medium">95% (Open-Cell Matrix)</span>
                  <span className="text-rose-700">15% (Traps Body Heat)</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-brand-200/50">
                  <span className="font-medium text-stone-900">Life Span / Warranty</span>
                  <span className="text-emerald-700 font-medium">15+ Years (Dense Rubber)</span>
                  <span className="text-rose-700">3-5 Years (Polymers Sag)</span>
                </div>
                <div className="grid grid-cols-3 py-1.5 border-b border-brand-200/50">
                  <span className="font-medium text-stone-900">Off-Gassing / VOC</span>
                  <span className="text-emerald-700 font-medium">Zero (Food-Grade sap)</span>
                  <span className="text-rose-700">High (Chemical odor)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'postures' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Posture diagnostics */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded font-bold">ORTHOPEDIC DIAGNOSTICS</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-brand-950 leading-tight">
                Maintaining Natural Spine Alignment
              </h2>
              <p className="text-stone-600 text-xs leading-relaxed font-sans">
                Your spine holds an elongated "S" shaped profile when standing. When sleeping, a bad mattress bends this alignment, causing persistent trigger point pressures. RelaxPro models offer customized orthopedic zones:
              </p>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-900 text-white font-mono flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                  <div>
                    <h4 className="font-display font-bold text-stone-900">Side Sleeper Comfort Zone</h4>
                    <p className="text-zinc-500 text-[11px] mt-0.5">Requires local indentation for shoulders and pelvis while pushing back on your ribcage. Our Amrita & Nirvana models are optimal.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-900 text-white font-mono flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                  <div>
                    <h4 className="font-display font-bold text-stone-900">Back Sleeper Postures</h4>
                    <p className="text-zinc-500 text-[11px] mt-0.5">Requires robust resistance under the lower lumbar area to keep vertebrae floating. Our Arogya & Sthira models prevent back hyperextension.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific diagnostic checklist */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/60">
              <h4 className="font-display font-bold text-brand-950 text-sm mb-4">Did Suresh Direct You?</h4>
              <p className="text-xs text-zinc-650 leading-relaxed mb-4">
                Suresh coordinates personal back-care recommendations on physical mattress stiffness. He suggests:
              </p>
              
              <ul className="space-y-2 text-xs font-sans text-zinc-650">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Choose <strong className="text-zinc-950">Nirvana 8"</strong> if you have severe spine stiffness and want adjustable 7-Zone target realignment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Choose <strong className="text-zinc-950">Arogya / Sthira</strong> if doctors recommended a firm orthopedic surface for joint pain relief.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Choose <strong className="text-zinc-950">Amrita 10"</strong> if you prefer the thick, buoyant feel of standard hotel beds with natural elasticity.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-8">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded font-bold">SAFETY AUDITS</span>
              <h2 className="text-2xl font-display font-medium text-brand-950 leading-tight mt-2">
                Certified Safe For Sensitive Skin and Infants
              </h2>
              <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                Sleep products are direct contact points for open skin pores and night respiratory systems. RelaxPro raw rubber latex sap is audited and certified by leading global agencies:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cert 1 */}
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold mb-4 font-display text-sm">
                  GOLS
                </div>
                <h4 className="font-display font-semibold text-brand-950 text-sm">Global Organic Latex Standard</h4>
                <p className="text-[11px] text-zinc-550 leading-relaxed mt-2">
                  Mandates that 100% of latex sap must be grown under organic procedures without synthetic fertilizers or GMOs. Audited at Kerala plantations.
                </p>
              </div>

              {/* Cert 2 */}
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-4 font-display text-sm">
                  Oeko-Tex
                </div>
                <h4 className="font-display font-semibold text-brand-950 text-sm">Oeko-Tex Standard-100</h4>
                <p className="text-[11px] text-zinc-550 leading-relaxed mt-2">
                  Guarantees textiles are fully audited to be clear of harmful dyes, heavy heavy-metal residues, toxic formaldehyde, and pesticides. Safe for infants.
                </p>
              </div>

              {/* Cert 3 */}
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mb-4 font-display text-sm">
                  ECO
                </div>
                <h4 className="font-display font-semibold text-brand-950 text-sm">Eco-Institut Certified</h4>
                <p className="text-[11px] text-zinc-550 leading-relaxed mt-2">
                  Direct evaluation of chemical emissions and product purities conducted in Germany. Guarantees zero hazardous off-gassing issues.
                </p>
              </div>
            </div>
          </div>
        )}
        </motion.div>
      </AnimatePresence>

      {/* Mini CTA banner */}
      <section className="bg-linear-to-br from-brand-950 to-stone-900 text-white rounded-3xl p-8 md:p-10 font-sans mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-[10px] tracking-wider text-brand-500 font-mono font-bold block uppercase mb-1">FACTORY DIRECT ASSURANCE</span>
          <h3 className="text-2xl font-display font-medium text-white">Choose the mattress designed for your back</h3>
          <p className="text-stone-300 text-xs leading-normal mt-2">
            RelaxPro provides orthopedic clarity by eliminating retail agent costs. Start side-by-side spec comparison to select the exact alignment you need.
          </p>
        </div>
        <button
          onClick={() => {}}
          className="bg-white hover:bg-zinc-100 text-brand-950 px-6 py-3.5 rounded-xl text-xs font-semibold font-display tracking-wider uppercase shrink-0 transition-colors cursor-pointer"
        >
          Compare All 13 Models
        </button>
      </section>
    </div>
  );
}
