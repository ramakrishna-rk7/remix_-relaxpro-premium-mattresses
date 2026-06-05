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
    color: 'bg-amber-100/40 border-dashed border-2 border-brand-500/20',
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full">
          DIRECT FROM KERALA FACTORY
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight mt-4 text-brand-950">
          3D Mattress Configurator
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed font-sans text-md">
          Don't settle for fixed standards. Craft the mattress you've always deserved. Customize support, comfort layers, external fabric density, and watch your model calculate in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Visual 3D Stack Mock */}
        <div id="builder-preview" className="lg:col-span-5 bg-brand-100/50 p-6 md:p-8 rounded-3xl border border-brand-200/60 relative lg:sticky lg:top-24 lg:self-start flex flex-col justify-between">
          <div>
            <h3 className="font-display font-medium text-lg text-brand-950 mb-6 flex items-center justify-between">
              <span>Live Visual Cross-Section</span>
              <span className="font-mono text-xs text-brand-600 px-2 py-0.5 bg-brand-200 rounded">{totalThickness}" Overall Profile</span>
            </h3>

            {/* Simulated 3D Stack */}
            <div className="relative py-12 flex flex-col items-center justify-center min-h-[320px]">
              {/* Perspective outer frame */}
              <div className="w-full max-w-xs space-y-1 transform -rotate-6 rotate-x-12 skew-x-6 relative">
                {/* 450 GSM Outer fabric wrapper representation */}
                <div className="absolute -inset-4 border border-brand-500/30 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center pointer-events-none transition-all duration-300">
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-brand-600 bg-white/90 px-1.5 py-0.5 rounded border border-brand-200 uppercase tracking-widest">
                    {selectedFabric.id === 'f2' ? '450 GSM Organic Bamboo' : '300 GSM Premium'}
                  </div>
                </div>

                {/* Comfort Top Layer */}
                {selectedTop.thickness > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${selectedTop.color} border border-brand-500/20 text-brand-950 shadow-md h-20 rounded-lg flex flex-col justify-center items-center px-4 transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent"></div>
                    <div className="absolute top-1 left-2 font-mono text-[9px] text-brand-800 tracking-wider">TOP COMFORT LAYER</div>
                    <span className="font-display text-sm font-semibold mt-2">{selectedTop.name.split(' ')[1]} {selectedTop.name.split(' ')[2]}</span>
                    <span className="font-mono text-[11px] text-brand-600 mt-0.5">{selectedTop.thickness}" Pure Kerala Latex</span>
                  </motion.div>
                )}

                {/* Transition Layer */}
                {selectedTransition.thickness > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${selectedTransition.color} border-t border-b border-brand-500/10 text-brand-900 shadow-sm h-16 rounded-lg flex flex-col justify-center items-center px-4 transition-all duration-300 relative`}
                  >
                    <div className="absolute top-1 left-2 font-mono text-[9px] text-brand-700 tracking-wider">TRANSITION LAYER</div>
                    <span className="font-display text-xs font-medium mt-1">{selectedTransition.name.substring(0, 24)}...</span>
                    <span className="font-mono text-[10px] text-brand-500">{selectedTransition.thickness}" Cushion Foam</span>
                  </motion.div>
                )}

                {/* Base Layer */}
                <motion.div
                  className={`${selectedBase.color} border-t-2 border-dashed border-white/20 text-white shadow-xl h-24 rounded-lg flex flex-col justify-center items-center px-4 transition-all duration-300 relative`}
                >
                  <div className="absolute top-1 left-3 font-mono text-[9px] text-white/60 tracking-wider">FOUNDATION BASE</div>
                  <span className="font-display text-xs font-semibold mt-2 text-center text-white/95">{selectedBase.name.substring(0, 32)}</span>
                  <span className="font-mono text-[10px] text-white/70 mt-0.5">{selectedBase.thickness}" Deep Density Support</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="border-t border-brand-200/80 pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">SPECIFIED VALUE</span>
                <div className="text-2xl font-bold font-display text-brand-950 mt-1">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-700 font-mono mt-0.5 flex items-center">
                  <Check id="icon-green-check" className="w-3.5 h-3.5 mr-1" /> Custom Delivery Free + 10-Year Warranty
                </p>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-[10px] font-mono block uppercase">LAYER BREAKDOWN</span>
                <span className="text-brand-800 text-xs font-medium font-mono">{totalThickness}" Composite</span>
              </div>
            </div>

            {includeAccessories && (
              <div className="bg-brand-100 p-3 rounded-xl border border-brand-200/50 mb-4 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <p className="text-xs text-brand-800 leading-tight">
                  <strong className="font-medium">Bonus Pack Attached</strong>: Includes 2 Ergonomic Latex Pillows & 1 Elastic Waterproof Protector (Value ₹6,200, packaged at factories).
                </p>
              </div>
            )}

            <button
              id="btn-addToCart"
              onClick={handleAddToCart}
              className="w-full bg-brand-950 hover:bg-brand-800 active:bg-black text-white py-4 px-6 rounded-xl font-display font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-brand-950/20"
            >
              Add Custom Built Mattress
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Choices Configurator */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: Mattress Size */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-mono flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-xl font-display font-medium text-brand-950">Select Mattress Size</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(SIZE_LABELS) as MattressSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`p-4 rounded-2xl text-center border transition-all cursor-pointer ${
                    size === sz
                      ? 'border-brand-500 bg-brand-50 border-2'
                      : 'border-gray-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <span className="font-display font-medium text-sm text-brand-950 capitalize block">{sz}</span>
                  <span className="font-mono text-[10px] text-gray-500 mt-1 block">
                    {sz === 'king' ? '72"x78"' : sz === 'queen' ? '60"x78"' : sz === 'double' ? '48"x75"' : '36"x75"'}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Foundation Support Base */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-xs">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-mono flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-xl font-display font-medium text-brand-950">Primary Posture Support Base (4")</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6 ml-11">The backbone of your orthopedic bedding system, determining longevity and sagging resistance.</p>
            
            <div className="space-y-3">
              {BASE_LAYERS.map((base) => (
                <div
                  key={base.id}
                  onClick={() => setSelectedBase(base)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-start ${
                    selectedBase.id === base.id
                      ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                      : 'border-zinc-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${base.color}`}></span>
                    <div>
                      <h4 className="font-display font-medium text-brand-950 text-sm">{base.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-lg">{base.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-mono font-semibold text-brand-800 text-xs">
                      ₹{base.priceFactor[size].toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 3: Transition Cushion Layer */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-xs">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-mono flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-xl font-display font-medium text-brand-950">Add Active Transition Layer</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6 ml-11">Acts as a damper that prevents bottoming out and prevents joint pressure points during deep sleep cycles.</p>
            
            <div className="space-y-3">
              {TRANSITION_LAYERS.map((trans) => (
                <div
                  key={trans.id}
                  onClick={() => setSelectedTransition(trans)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-start ${
                    selectedTransition.id === trans.id
                      ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                      : 'border-zinc-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {trans.thickness > 0 ? (
                      <span className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${trans.color}`}></span>
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400 mt-1 shrink-0" />
                    )}
                    <div>
                      <h4 className="font-display font-medium text-brand-950 text-sm">
                        {trans.name} {trans.thickness > 0 && `(${trans.thickness}")`}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-lg">{trans.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-mono font-semibold text-brand-800 text-xs">
                      {trans.priceFactor[size] === 0 ? 'FREE' : `+ ₹${trans.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 4: Top Luxury Comfort Layer */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-xs">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-mono flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-xl font-display font-medium text-brand-950">Add Pure Kerala Latex Top Comfort Topper</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6 ml-11">100% natural, harvested from latex trees in Kerala, conferring maximum elasticity, hygiene, and cooling performance.</p>
            
            <div className="space-y-3">
              {COMFORT_TOPPER_LAYERS.map((top) => (
                <div
                  key={top.id}
                  onClick={() => setSelectedTop(top)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-start ${
                    selectedTop.id === top.id
                      ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                      : 'border-zinc-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {top.thickness > 0 ? (
                      <span className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${top.color}`}></span>
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400 mt-1 shrink-0" />
                    )}
                    <div>
                      <h4 className="font-display font-medium text-brand-950 text-sm">
                        {top.name} {top.thickness > 0 && `(${top.thickness}")`}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-lg">{top.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-mono font-semibold text-brand-800 text-xs">
                      {top.priceFactor[size] === 0 ? 'FREE' : `+ ₹${top.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 5: Premium Quilted Weave Wrapper */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-xs">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-mono flex items-center justify-center font-bold text-sm">
                5
              </span>
              <h2 className="text-xl font-display font-medium text-brand-950">Select Outer Quilted Wrapper Fabric</h2>
            </div>
            <p className="text-xs text-gray-500 mb-6 ml-11">Direct touch point of your rest. Eco-certified threads crafted with active sweat absorption properties.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FABRICS.map((fabric) => (
                <div
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedFabric.id === fabric.id
                      ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                      : 'border-zinc-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-display font-semibold text-brand-950 text-xs leading-snug uppercase tracking-wider">
                        {fabric.id === 'f1' ? 'Standard Core' : 'Premium Air-Flow'}
                      </h4>
                      <span className="font-mono font-bold text-brand-8s text-xs">
                        ₹{fabric.price[size].toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="font-display font-semibold text-sm text-brand-950 block">{fabric.name}</span>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{fabric.description}</p>
                  </div>
                  {selectedFabric.id === fabric.id && (
                    <span className="text-[10px] text-brand-600 font-bold tracking-widest mt-4 uppercase flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected Covering
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Accessorising Section */}
          <section className="bg-linear-to-br from-brand-950 to-stone-900 text-white p-6 md:p-8 rounded-3xl border border-transparent shadow-md flex items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[10px] tracking-wider font-mono text-brand-500 block uppercase mb-1">
                EXCLUSIVELY VALUE PACKED AT OUR UNIT
              </span>
              <h3 className="text-lg md:text-xl font-display font-medium text-white">
                Include RelaxPro Direct Accessory Bundle?
              </h3>
              <p className="text-stone-300 text-xs mt-2 leading-relaxed">
                Unlock 2 luxury Talalay natural rubber latex pillows & 1 Premium 100% Breathable Waterproof Mattress Protector at a massively discounted factory rate (Normally ₹6,200).
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setIncludeAccessories(!includeAccessories)}
                className={`px-5 py-3 rounded-xl font-display font-medium text-xs tracking-wider transition-all cursor-pointer select-none ${
                  includeAccessories
                    ? 'bg-brand-500 text-brand-950 hover:bg-brand-600'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                {includeAccessories ? '✓ Accessories Included' : '+ Add to Layout'}
              </button>
              <span className="font-mono text-[10px] text-stone-400">
                {includeAccessories ? `Added at factory pricing` : 'Click to save ₹3,700'}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
