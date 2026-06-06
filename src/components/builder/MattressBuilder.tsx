import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Plus, Trash2, ArrowRight, CornerDownRight, Check, HelpCircle } from 'lucide-react';
import { MattressSize, CartItem } from '../../types';

interface LayerOption {
  id: string;
  name: string;
  type: 'base' | 'transition' | 'top';
  material: 'rebonded_foam' | 'latex_rebonded' | 'hr_softy_foam' | 'latex' | 'hr_foam';
  thickness: number; // in inches
  priceFactor: { king: number; queen: number; double: number; single: number; };
  color: string;
  description: string;
}

const BASE_LAYERS: LayerOption[] = [
  {
    id: 'b1',
    name: 'Century 95-Density Rebonded Base',
    type: 'base',
    material: 'rebonded_foam',
    thickness: 4,
    priceFactor: { king: 12000, queen: 10000, double: 8000, single: 6000 },
    color: 'bg-zinc-600',
    description: 'Ultra-firm orthopedic foundation engineered by Century. Excellent support and durability.'
  },
  {
    id: 'b2',
    name: 'Eco-Dense Latex Rebonded Base',
    type: 'base',
    material: 'latex_rebonded',
    thickness: 4,
    priceFactor: { king: 16000, queen: 13500, double: 11000, single: 8500 },
    color: 'bg-amber-700/60',
    description: 'Premium bonded latex shreds. Zero synthetic foam, higher elasticity, and great air circulation.'
  }
];

const TRANSITION_LAYERS: LayerOption[] = [
  {
    id: 't-none',
    name: 'No Transition Layer (Direct Support)',
    type: 'transition',
    material: 'hr_foam',
    thickness: 0,
    priceFactor: { king: 0, queen: 0, double: 0, single: 0 },
    color: '',
    description: 'Top cover sits directly on the support block.'
  },
  {
    id: 't1',
    name: '2" Century HR AirFlow Softy Cushion',
    type: 'transition',
    material: 'hr_softy_foam',
    thickness: 2,
    priceFactor: { king: 5000, queen: 4000, double: 3200, single: 2400 },
    color: 'bg-orange-100',
    description: 'Highly resilient soft feel. Relieves bone friction from the hard base.'
  },
  {
    id: 't2',
    name: '2" Natural Kerala Latex transition',
    type: 'transition',
    material: 'latex',
    thickness: 2,
    priceFactor: { king: 10000, queen: 8500, double: 6800, single: 5000 },
    color: 'bg-amber-50',
    description: 'Pure elastic responsive transition for active springiness and motion isolation.'
  }
];

const COMFORT_TOPPER_LAYERS: LayerOption[] = [
  {
    id: 'top-none',
    name: 'No Additional Topper (Firmer Feel)',
    type: 'top',
    material: 'hr_foam',
    thickness: 0,
    priceFactor: { king: 0, queen: 0, double: 0, single: 0 },
    color: '',
    description: 'Minimalist sleep structure.'
  },
  {
    id: 'top1',
    name: '2" Pure GOLS Natural Latex Topper',
    type: 'top',
    material: 'latex',
    thickness: 2,
    priceFactor: { king: 11000, queen: 9000, double: 7200, single: 5500 },
    color: 'bg-yellow-50',
    description: 'Perfect natural cradling. Soft-medium comfort for pain-free shoulders.'
  },
  {
    id: 'top2',
    name: '4" Pure GOLS 7-Zone Therapeutic Latex Topper',
    type: 'top',
    material: 'latex',
    thickness: 4,
    priceFactor: { king: 21000, queen: 18000, double: 14500, single: 11000 },
    color: 'bg-amber-100/40 border-dashed border-2 border-accent/20',
    description: '7 segmented density zones targeted precisely for head, shoulders, back, and hips.'
  }
];

const FABRICS = [
  {
    id: 'f1',
    name: '300 GSM Premium Micro-Knit Knit Weave',
    price: { king: 2500, queen: 2000, double: 1600, single: 1200 },
    description: 'Super soft breathable stretch wrapper with mild quilted backing.'
  },
  {
    id: 'f2',
    name: '450 GSM Luxurious Quilted Bamboo Organic Knit',
    price: { king: 4500, queen: 3800, double: 3000, single: 2200 },
    description: 'Ultra-plush high premium cover. Natural cooling with heavy quilted clouds.'
  }
];

interface MattressBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onNavigate: (page: string) => void;
}

export default function MattressBuilder({ onAddToCart, onNavigate }: MattressBuilderProps) {
  const [size, setSize] = useState<MattressSize>('king');
  const [selectedBase, setSelectedBase] = useState<LayerOption>(BASE_LAYERS[0]);
  const [selectedTransition, setSelectedTransition] = useState<LayerOption>(TRANSITION_LAYERS[1]);
  const [selectedTop, setSelectedTop] = useState<LayerOption>(COMFORT_TOPPER_LAYERS[1]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[1]);
  const [includeAccessories, setIncludeAccessories] = useState<boolean>(true);

  const SIZE_LABELS = {
    king: 'King Size (72" x 78")',
    queen: 'Queen Size (60" x 78")',
    double: 'Double Size (48" x 75")',
    single: 'Single Size (36" x 75")'
  };

  // Math calculated price
  const totalPrice = useMemo(() => {
    const basePrice = selectedBase.priceFactor[size];
    const transPrice = selectedTransition.priceFactor[size];
    const topPrice = selectedTop.priceFactor[size];
    const fabricPrice = selectedFabric.price[size];
    const accessoryPremium = includeAccessories ? { king: 5000, queen: 4000, double: 3000, single: 2500 }[size] : 0;
    
    return basePrice + transPrice + topPrice + fabricPrice + accessoryPremium;
  }, [size, selectedBase, selectedTransition, selectedTop, selectedFabric, includeAccessories]);

  // Overall thickness
  const totalThickness = useMemo(() => {
    return selectedBase.thickness + selectedTransition.thickness + selectedTop.thickness;
  }, [selectedBase, selectedTransition, selectedTop]);

  // Handle Add To Cart
  const handleAddToCart = () => {
    const customLayers = [
      { material: selectedBase.name, thickness: selectedBase.thickness },
      ...(selectedTransition.thickness > 0 ? [{ material: selectedTransition.name, thickness: selectedTransition.thickness }] : []),
      ...(selectedTop.thickness > 0 ? [{ material: selectedTop.name, thickness: selectedTop.thickness }] : [])
    ];

    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      slug: 'custom-mattress',
      name: `Custom Tailored Mattress (${totalThickness}")`,
      size,
      price: totalPrice,
      quantity: 1,
      includeAccessories,
      fabricOption: selectedFabric.id === 'f1' ? '300GSM' : '450GSM',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      type: 'custom',
      customLayers
    };

    onAddToCart(newItem);
    alert('🎉 Your custom mattress layout has been built and added to the cart successfully!');
    onNavigate('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <span className="text-[11px] tracking-widest font-accent text-accent uppercase bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full font-bold shadow-sm inline-block">
          DIRECT FROM KERALA FACTORY
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mt-6 text-primary leading-tight">
          3D Mattress Configurator
        </h1>
        <p className="text-neutral-dark/80 mt-6 leading-relaxed font-body text-base md:text-lg">
          Don't settle for fixed standards. Craft the mattress you've always deserved. Customize support, comfort layers, external fabric density, and watch your model calculate in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visual 3D Stack Mock */}
        <div id="builder-preview" className="lg:col-span-5 bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-xl shadow-brand-500/5 relative lg:sticky lg:top-32 lg:self-start flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="font-heading font-bold text-xl text-primary mb-8 flex items-center justify-between">
              <span>Live Visual Cross-Section</span>
              <span className="font-accent text-[11px] font-bold text-accent px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">{totalThickness}" Overall Profile</span>
            </h3>

            {/* Simulated 3D Stack */}
            <div className="relative py-16 flex flex-col items-center justify-center min-h-[360px]">
              {/* Perspective outer frame */}
              <div className="w-full max-w-xs space-y-1.5 transform -rotate-6 rotate-x-12 skew-x-6 relative group">
                {/* 450 GSM Outer fabric wrapper representation */}
                <div className="absolute -inset-5 border border-brand-200/60 rounded-2xl bg-white/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none transition-all duration-500 group-hover:bg-white/10">
                  <div className="absolute top-3 right-3 text-[9px] font-accent font-bold text-primary/60 bg-white px-2 py-1 rounded shadow-sm border border-brand-200 uppercase tracking-widest">
                    {selectedFabric.id === 'f2' ? '450 GSM Organic Bamboo' : '300 GSM Premium'}
                  </div>
                </div>

                {/* Comfort Top Layer */}
                {selectedTop.thickness > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`${selectedTop.color.split(' ')[0]} border border-brand-200/50 text-primary shadow-lg h-24 rounded-xl flex flex-col justify-center items-center px-4 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                    <div className="absolute top-2 left-3 font-accent text-[9px] font-bold text-primary/50 tracking-widest uppercase">TOP COMFORT</div>
                    <span className="font-heading text-sm font-bold mt-2 text-center">{selectedTop.name.split(' ')[1]} {selectedTop.name.split(' ')[2]}</span>
                    <span className="font-accent font-bold text-[10px] text-accent mt-1">{selectedTop.thickness}" Pure Kerala Latex</span>
                  </motion.div>
                )}

                {/* Transition Layer */}
                {selectedTransition.thickness > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${selectedTransition.color} border-t border-b border-brand-200/40 text-primary shadow-md h-16 rounded-xl flex flex-col justify-center items-center px-4 transition-all duration-300 relative group-hover:-translate-y-1`}
                  >
                    <div className="absolute top-2 left-3 font-accent text-[9px] font-bold text-primary/50 tracking-widest uppercase">TRANSITION</div>
                    <span className="font-heading text-xs font-bold mt-2">{selectedTransition.name.substring(0, 24)}...</span>
                    <span className="font-accent font-bold text-[10px] text-accent/80 mt-0.5">{selectedTransition.thickness}" Cushion Foam</span>
                  </motion.div>
                )}

                {/* Base Layer */}
                <motion.div
                  className={`${selectedBase.color} border-t-2 border-dashed border-white/20 text-white shadow-2xl h-28 rounded-xl flex flex-col justify-center items-center px-4 transition-all duration-300 relative group-hover:translate-y-1`}
                >
                  <div className="absolute top-2 left-3 font-accent text-[9px] font-bold text-white/50 tracking-widest uppercase">FOUNDATION BASE</div>
                  <span className="font-heading text-sm font-bold mt-2 text-center text-white/95">{selectedBase.name.substring(0, 32)}</span>
                  <span className="font-accent font-bold text-[10px] text-white/70 mt-1">{selectedBase.thickness}" Deep Density Support</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="border-t border-brand-200/60 pt-8 mt-8 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-neutral-dark/60 text-[10px] uppercase tracking-widest font-accent font-bold block mb-1">SPECIFIED VALUE</span>
                <div className="text-3xl md:text-4xl font-bold font-heading text-primary">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-600 font-accent font-bold mt-2 flex items-center bg-emerald-50 w-max px-2 py-1 rounded">
                  <Check id="icon-green-check" className="w-3.5 h-3.5 mr-1" /> Custom Delivery Free + 10-Year Warranty
                </p>
              </div>
              <div className="text-right">
                <span className="text-neutral-dark/50 text-[10px] font-accent font-bold block uppercase tracking-wider mb-1">LAYER BREAKDOWN</span>
                <span className="text-primary text-sm font-bold font-accent bg-neutral-light px-3 py-1.5 rounded-lg inline-block border border-brand-200/40">{totalThickness}" Composite</span>
              </div>
            </div>

            {includeAccessories && (
              <div className="bg-gradient-to-r from-accent/10 to-transparent p-4 rounded-2xl border border-accent/20 mb-6 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-accent/10">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-primary/80 leading-relaxed font-body">
                  <strong className="font-heading font-bold text-primary block text-sm mb-0.5">Bonus Pack Attached</strong>
                  Includes 2 Ergonomic Latex Pillows & 1 Elastic Waterproof Protector (Value ₹6,200, packaged at factories).
                </p>
              </div>
            )}

            <button
              id="btn-addToCart"
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white py-5 px-6 rounded-2xl font-accent font-bold tracking-widest uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-primary/20 active:scale-[0.98]"
            >
              Add Custom Built Mattress
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Choices Configurator */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Mattress Size */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 rounded-xl bg-neutral-light border border-brand-200/60 text-primary font-accent flex items-center justify-center font-bold text-base shadow-sm">
                1
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">Select Mattress Size</h2>
                <p className="text-sm text-neutral-dark/60 font-body mt-1">Standard Indian bed dimensions.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(SIZE_LABELS) as MattressSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`p-5 rounded-2xl text-center border transition-all duration-300 cursor-pointer ${
                    size === sz
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md transform scale-[1.02]'
                      : 'border-brand-200/60 hover:border-accent/40 hover:bg-neutral-light/50'
                  }`}
                >
                  <span className="font-heading font-bold text-sm md:text-base text-primary capitalize block">{sz}</span>
                  <span className="font-accent font-bold text-[10px] tracking-wider text-neutral-dark/50 mt-1.5 block">
                    {sz === 'king' ? '72"x78"' : sz === 'queen' ? '60"x78"' : sz === 'double' ? '48"x75"' : '36"x75"'}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Foundation Support Base */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-xl bg-neutral-light border border-brand-200/60 text-primary font-accent flex items-center justify-center font-bold text-base shadow-sm">
                2
              </span>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">Primary Posture Support Base (4")</h2>
            </div>
            <p className="text-sm text-neutral-dark/70 mb-8 ml-14 font-body leading-relaxed max-w-xl">The backbone of your orthopedic bedding system, determining longevity and sagging resistance.</p>
            
            <div className="space-y-4 ml-2 md:ml-14">
              {BASE_LAYERS.map((base) => (
                <div
                  key={base.id}
                  onClick={() => setSelectedBase(base)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row justify-between items-start gap-4 ${
                    selectedBase.id === base.id
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md scale-[1.01]'
                      : 'border-brand-200/60 hover:border-accent/40 hover:bg-neutral-light/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-4 h-4 rounded-full mt-1.5 shrink-0 shadow-sm border border-black/10 ${base.color}`}></span>
                    <div>
                      <h4 className="font-heading font-bold text-primary text-base md:text-lg">{base.name}</h4>
                      <p className="text-sm text-neutral-dark/70 mt-2 font-body leading-relaxed max-w-md">{base.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 ml-8 sm:ml-0">
                    <span className="font-accent font-bold tracking-wider text-primary text-sm bg-white px-3 py-1.5 rounded-lg border border-brand-200/50 shadow-sm inline-block">
                      ₹{base.priceFactor[size].toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 3: Transition Cushion Layer */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-xl bg-neutral-light border border-brand-200/60 text-primary font-accent flex items-center justify-center font-bold text-base shadow-sm">
                3
              </span>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">Add Active Transition Layer</h2>
            </div>
            <p className="text-sm text-neutral-dark/70 mb-8 ml-14 font-body leading-relaxed max-w-xl">Acts as a damper that prevents bottoming out and prevents joint pressure points during deep sleep cycles.</p>
            
            <div className="space-y-4 ml-2 md:ml-14">
              {TRANSITION_LAYERS.map((trans) => (
                <div
                  key={trans.id}
                  onClick={() => setSelectedTransition(trans)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row justify-between items-start gap-4 ${
                    selectedTransition.id === trans.id
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md scale-[1.01]'
                      : 'border-brand-200/60 hover:border-accent/40 hover:bg-neutral-light/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {trans.thickness > 0 ? (
                      <span className={`w-4 h-4 rounded-full mt-1.5 shrink-0 shadow-sm border border-black/10 ${trans.color}`}></span>
                    ) : (
                      <div className="w-4 h-4 mt-1.5 shrink-0 flex items-center justify-center"><Trash2 className="w-4 h-4 text-neutral-dark/40" /></div>
                    )}
                    <div>
                      <h4 className="font-heading font-bold text-primary text-base md:text-lg">
                        {trans.name} {trans.thickness > 0 && <span className="text-accent text-sm font-accent tracking-widest uppercase ml-2">({trans.thickness}")</span>}
                      </h4>
                      <p className="text-sm text-neutral-dark/70 mt-2 font-body leading-relaxed max-w-md">{trans.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 ml-8 sm:ml-0">
                    <span className={`font-accent font-bold tracking-wider text-sm px-3 py-1.5 rounded-lg border shadow-sm inline-block ${trans.priceFactor[size] === 0 ? 'bg-neutral-light text-neutral-dark/60 border-brand-200/40' : 'bg-white text-primary border-brand-200/50'}`}>
                      {trans.priceFactor[size] === 0 ? 'INCLUDED' : `+ ₹${trans.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 4: Top Luxury Comfort Layer */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-xl bg-neutral-light border border-brand-200/60 text-primary font-accent flex items-center justify-center font-bold text-base shadow-sm">
                4
              </span>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">Add Pure Kerala Latex Top Topper</h2>
            </div>
            <p className="text-sm text-neutral-dark/70 mb-8 ml-14 font-body leading-relaxed max-w-xl">100% natural, harvested from latex trees in Kerala, conferring maximum elasticity, hygiene, and cooling performance.</p>
            
            <div className="space-y-4 ml-2 md:ml-14">
              {COMFORT_TOPPER_LAYERS.map((top) => (
                <div
                  key={top.id}
                  onClick={() => setSelectedTop(top)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row justify-between items-start gap-4 ${
                    selectedTop.id === top.id
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md scale-[1.01]'
                      : 'border-brand-200/60 hover:border-accent/40 hover:bg-neutral-light/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {top.thickness > 0 ? (
                      <span className={`w-4 h-4 rounded-full mt-1.5 shrink-0 shadow-sm border border-black/10 ${top.color.split(' ')[0]}`}></span>
                    ) : (
                      <div className="w-4 h-4 mt-1.5 shrink-0 flex items-center justify-center"><Trash2 className="w-4 h-4 text-neutral-dark/40" /></div>
                    )}
                    <div>
                      <h4 className="font-heading font-bold text-primary text-base md:text-lg">
                        {top.name} {top.thickness > 0 && <span className="text-accent text-sm font-accent tracking-widest uppercase ml-2">({top.thickness}")</span>}
                      </h4>
                      <p className="text-sm text-neutral-dark/70 mt-2 font-body leading-relaxed max-w-md">{top.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 ml-8 sm:ml-0">
                    <span className={`font-accent font-bold tracking-wider text-sm px-3 py-1.5 rounded-lg border shadow-sm inline-block ${top.priceFactor[size] === 0 ? 'bg-neutral-light text-neutral-dark/60 border-brand-200/40' : 'bg-white text-primary border-brand-200/50'}`}>
                      {top.priceFactor[size] === 0 ? 'INCLUDED' : `+ ₹${top.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 5: Premium Quilted Weave Wrapper */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-brand-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-xl bg-neutral-light border border-brand-200/60 text-primary font-accent flex items-center justify-center font-bold text-base shadow-sm">
                5
              </span>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-primary">Select Outer Quilted Wrapper Fabric</h2>
            </div>
            <p className="text-sm text-neutral-dark/70 mb-8 ml-14 font-body leading-relaxed max-w-xl">Direct touch point of your rest. Eco-certified threads crafted with active sweat absorption properties.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-2 md:ml-14">
              {FABRICS.map((fabric) => (
                <div
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`p-6 md:p-8 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                    selectedFabric.id === fabric.id
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/20 shadow-md scale-[1.02]'
                      : 'border-brand-200/60 hover:border-accent/40 hover:bg-neutral-light/50'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-accent font-bold text-accent text-[11px] tracking-widest uppercase bg-white px-2 py-1 rounded shadow-sm border border-brand-200/40">
                        {fabric.id === 'f1' ? 'Standard Core' : 'Premium Air-Flow'}
                      </h4>
                      <span className="font-accent font-bold text-primary text-sm bg-white px-2 py-1 rounded shadow-sm border border-brand-200/40">
                        ₹{fabric.price[size].toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="font-heading font-bold text-lg text-primary block">{fabric.name}</span>
                    <p className="text-sm text-neutral-dark/70 mt-3 font-body leading-relaxed">{fabric.description}</p>
                  </div>
                  {selectedFabric.id === fabric.id && (
                    <span className="text-[11px] text-accent font-accent font-bold tracking-widest mt-6 uppercase flex items-center gap-1.5">
                      <Check className="w-4 h-4 bg-accent text-white rounded-full p-0.5" /> Selected Covering
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Accessorising Section */}
          <section className="bg-primary text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-0 group-hover:bg-accent/30 transition-colors duration-700" />
            <div className="max-w-md relative z-10">
              <span className="text-[11px] tracking-widest font-accent font-bold text-accent block uppercase mb-3">
                EXCLUSIVELY VALUE PACKED
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                Include RelaxPro Accessory Bundle?
              </h3>
              <p className="text-white/80 text-sm mt-4 leading-relaxed font-body">
                Unlock 2 luxury Talalay natural rubber latex pillows & 1 Premium 100% Breathable Waterproof Mattress Protector at a massively discounted factory rate (Normally ₹6,200).
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 relative z-10 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setIncludeAccessories(!includeAccessories)}
                className={`w-full md:w-auto px-8 py-4.5 rounded-2xl font-accent font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                  includeAccessories
                    ? 'bg-white text-primary hover:bg-neutral-light'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm'
                }`}
              >
                {includeAccessories ? '✓ Bundle Included' : '+ Add to Layout'}
              </button>
              <span className="font-accent font-bold text-[10px] tracking-wider text-white/60 uppercase">
                {includeAccessories ? `Added at factory pricing` : 'Click to save ₹3,700'}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
