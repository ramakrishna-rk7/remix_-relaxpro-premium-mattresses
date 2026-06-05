import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Sparkles, HelpCircle, Shield, RefreshCw, PenTool, CheckCircle, Info } from 'lucide-react';
import BlurFade from '../ui/BlurFade';

interface FAQItem {
  id: string;
  category: 'care' | 'durability' | 'customization';
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function SleepFAQs() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'care' | 'durability' | 'customization'>('all');

  const faqs = useMemo<FAQItem[]>(() => [
    {
      id: 'faq-1',
      category: 'durability',
      question: 'How durable is natural organic latex compared to memory foam or spring mattresses?',
      answer: '100% natural organic latex is exceptionally durable, regularly lasting 15 to 20 years without sagging or developing body impressions. In comparison, synthetic memory foam is made of polyurethane chemicals that chemically fatigue and sag within 5 to 7 years. Pocket springs also suffer from mechanical fatigue and structural weakening over time. Because pure GOLS-certified rubber sap is inherently resilient and rubberized, it maintains its supportive structural shape and elastic resilience for decades.',
      icon: <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
    },
    {
      id: 'faq-2',
      category: 'care',
      question: 'How do I clean and care for my RelaxPro 100% natural latex mattress?',
      answer: 'Caring for your organic mattress is simple: (1) Use a breathable organic cotton mattress protector to guard against liquid spills and perspiration. (2) Keep the mattress core dry. If you need to spot-clean, use a damp cloth with mild soap, and let it dry completely in a well-ventilated shade. (3) Strictly avoid exposing the natural rubber core to direct, harsh UV sunlight, as sunlight breaks down natural rubber polymer chains. (4) No flipping is required! RelaxPro mattresses are built layer-optimized, but we do recommend rotating the mattress 180 degrees once every 6 months to ensure even long-term compression.',
      icon: <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
    },
    {
      id: 'faq-3',
      category: 'customization',
      question: 'Can I request custom sizes, custom thickness profiles, or side-by-side customization?',
      answer: 'Absolutely! Since RelaxPro owns its organic harvesting farms in Kerala and custom formats mattresses factory-direct, we can craft any custom dimensions (length x width) and composite thickness profiles (4″, 6″, 8″, or 10″) you require to fit non-standard cots or imported bed frames. We also offer Split Dual-Comfort customization: we can construct a single mattress where one half is orthopedic medium-firm for back support, and the other half is soft-plush for a luxurious, pressure-relieving feel.',
      icon: <PenTool className="w-4 h-4 text-indigo-600 shrink-0" />
    },
    {
      id: 'faq-4',
      category: 'durability',
      question: 'Does natural latex trap body heat or run hot in summer?',
      answer: 'Unlike synthetic foam mattresses (which lock in heat due to a closed-cell chemical skin), 100% natural latex is highly breathable. It features an open-cell matrix structured natively during the Dunlop milk frothing process. Additionally, all our cores are manufactured with vertical pincore ventilation holes. This open channel network naturally circulates air, pulling heat away from your skin, and is wrapped in heavy 300-600 GSM organic cotton quilting for a cool, sweat-free sleep all year round.',
      icon: <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
    },
    {
      id: 'faq-5',
      category: 'care',
      question: 'What kind of bed base or frame is ideal for a natural latex mattress?',
      answer: 'Natural latex is heavy and highly flexible, so it requires a strong, stable, and flat foundation. The ideal setup is a solid flat wooden board or a high-quality slatted wooden frame where the slats are no wider than 2.5 to 3 inches apart to prevent the premium latex from bowing. Ensure there is adequate bottom ventilation so moisture does not get trapped. Avoid saggy metal spring bases or rusty iron frames which fail to provide the solid skeletal support necessary for spinal alignment.',
      icon: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
    },
    {
      id: 'faq-6',
      category: 'customization',
      question: 'What is the structural difference between GOLS-certified rubber and GOTS-certified textiles?',
      answer: 'They signify the ultimate international organic benchmarks: GOLS (Global Organic Latex Standard) certifies that the core of your mattress contains at least 95% pure, certified organic farm rubber, verifying that no chemical fillers, heavy clay powders, or hazardous polymers have been blended in. GOTS (Global Organic Textile Standard) certifies the external casing layers, confirming that our heavy quilted cover fabrics are made from certified biological organic cotton without chemical pesticides, formaldehyde, or heavy-metal dyes.',
      icon: <Info className="w-4 h-4 text-blue-600 shrink-0" />
    }
  ], []);

  // Filter FAQs based on category filter and search term
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, faqs]);

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div id="sleep-faqs-section" className="max-w-4xl mx-auto px-4 md:px-6">
      <BlurFade delay={0.1}>
        {/* Title and subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-amber-100 px-3 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-brand-800" /> FACTORY-DIRECT SLEEP EDUCATION
          </span>
          <h2 className="text-3xl font-display font-medium mt-4 text-brand-950">
            Sleep FAQs & Latexmax Care Guides
          </h2>
          <p className="text-stone-500 text-xs mt-2 leading-relaxed font-sans">
            Have questions about customized dimensions, long-term GOLS durability, or keeping your organic sleep core fresh? Suresh and the engineering team outline everything below.
          </p>
        </div>
      </BlurFade>

      {/* Interactive Toolbar: Search & Categories */}
      <BlurFade delay={0.15}>
        <div className="bg-white rounded-2xl border border-zinc-150 p-4 shadow-xs mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4 font-sans text-xs">
          {/* Categories Tab Group */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-brand-950 text-white font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              All Guides
            </button>
            <button
              onClick={() => setActiveCategory('durability')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeCategory === 'durability'
                  ? 'bg-brand-950 text-white font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              Durability & Cores
            </button>
            <button
              onClick={() => setActiveCategory('care')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeCategory === 'care'
                  ? 'bg-brand-950 text-white font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              Care & Setting Up
            </button>
            <button
              onClick={() => setActiveCategory('customization')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeCategory === 'customization'
                  ? 'bg-brand-950 text-white font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              Custom Sizing
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex items-center w-full md:max-w-xs">
            <Search className="absolute left-3 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search Sleep FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 hover:bg-zinc-100 focus:bg-white text-xs text-brand-950 border border-zinc-200 focus:border-brand-500 rounded-lg outline-none transition-all"
            />
          </div>
        </div>
      </BlurFade>

      {/* Accordion List Container */}
      <BlurFade delay={0.2}>
        <div className="space-y-3.5 min-h-[160px]">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-brand-300 shadow-md ring-2 ring-brand-500/5' 
                        : 'border-zinc-200/80 hover:border-zinc-300 shadow-xs'
                    }`}
                  >
                    {/* Header trigger button */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-5 py-4.5 text-left flex items-start gap-4 cursor-pointer focus:outline-none select-none group"
                    >
                      <div className={`p-2 rounded-lg transition-colors mt-0.5 ${isOpen ? 'bg-brand-100' : 'bg-zinc-50 group-hover:bg-zinc-100'}`}>
                        {faq.icon}
                      </div>

                      <div className="flex-1 pr-4">
                        <span className="font-mono text-[9px] tracking-widest font-bold uppercase text-brand-700 block mb-1">
                          {faq.category === 'durability' ? 'Durability Guides' : faq.category === 'care' ? 'Care & Lifespan' : 'Custom Tailoring'}
                        </span>
                        <h3 className="font-sans font-semibold text-xs py-0.5 md:text-sm text-brand-950 tracking-tight leading-snug group-hover:text-amber-800 transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      <div className="shrink-0 mt-2">
                        <ChevronDown 
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-in-out ${
                            isOpen ? 'transform rotate-180 text-brand-900' : ''
                          }`} 
                        />
                      </div>
                    </button>

                    {/* Animated accordion body content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1.5 ml-[52px] border-t border-zinc-100/55">
                            <p className="font-sans text-xs text-stone-600 leading-relaxed max-w-2xl">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                className="text-center py-12 px-4 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50"
              >
                <HelpCircle className="w-8 h-8 text-zinc-350 mx-auto mb-3" />
                <p className="text-zinc-500 font-sans text-xs">No matching question found in our knowledge base.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-3 text-[11px] font-medium text-brand-800 underline hover:text-brand-950 cursor-pointer"
                >
                  Clear search and categories
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BlurFade>
    </div>
  );
}
