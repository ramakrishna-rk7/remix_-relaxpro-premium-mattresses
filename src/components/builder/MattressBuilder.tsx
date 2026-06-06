import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, ArrowRight, Check, ShoppingCart } from 'lucide-react';
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
    color: 'bg-zinc-700',
    description: 'Ultra-firm orthopedic foundation engineered by Century. Excellent support and durability.'
  },
  {
    id: 'b2',
    name: 'Eco-Dense Latex Rebonded Base',
    type: 'base',
    material: 'latex_rebonded',
    thickness: 4,
    priceFactor: { king: 16000, queen: 13500, double: 11000, single: 8500 },
    color: 'bg-amber-800',
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
    color: 'bg-amber-100',
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
    color: 'bg-amber-50',
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
  const [addedToast, setAddedToast] = useState(false);

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
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onNavigate('cart');
    }, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative font-sans">
      {addedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-brand-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-medium animate-[fadeIn_0.2s_ease-out]"
        >
          <Check size={18} className="text-green-300" />
          <span>Custom mattress added to cart</span>
        </div>
      )}
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs tracking-wider font-semibold text-amber-600 uppercase mb-2 block">
          Direct From Kerala Factory
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-gray-900 leading-tight">
          Mattress Configurator
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed text-base md:text-lg">
          Craft the mattress you've always deserved. Customize support, comfort layers, external fabric density, and watch your model calculate in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual 2D Stack Mock (Sticky) */}
        <div className="lg:col-span-5 order-1 lg:order-1 relative lg:sticky lg:top-24">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="font-bold text-xl text-gray-900 mb-2 flex items-center justify-between">
                <span>Live Visualizer</span>
                <span className="text-xs font-bold text-amber-600 px-3 py-1 bg-amber-50 rounded-full">{totalThickness}" Overall Profile</span>
              </h3>
              <p className="text-sm text-gray-500 mb-8">Dynamic representation of your selections</p>

              {/* 2D Layer Cake Stack */}
              <div className="relative py-8 flex flex-col items-center justify-center min-h-[300px] gap-3">
                
                {/* Comfort Top Layer */}
                <AnimatePresence>
                  {selectedTop.thickness > 0 && (
                    <motion.div
                      key={selectedTop.id}
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: Math.max(60, selectedTop.thickness * 20) }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className={`${selectedTop.color} w-full shadow-sm rounded-xl flex flex-col justify-center items-center px-4 border border-gray-200/50 transition-all`}
                    >
                      <span className="font-bold text-sm text-gray-800">{selectedTop.name.split(' ').slice(0, 3).join(' ')} Topper</span>
                      <span className="text-xs text-gray-500 font-semibold">{selectedTop.thickness}"</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Transition Layer */}
                <AnimatePresence>
                  {selectedTransition.thickness > 0 && (
                    <motion.div
                      key={selectedTransition.id}
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: Math.max(50, selectedTransition.thickness * 20) }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className={`${selectedTransition.color} w-full shadow-sm rounded-xl flex flex-col justify-center items-center px-4 border border-gray-200/50 transition-all`}
                    >
                      <span className="font-bold text-sm text-gray-800">{selectedTransition.name.substring(0, 24)}...</span>
                      <span className="text-xs text-gray-500 font-semibold">{selectedTransition.thickness}"</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Base Layer */}
                <motion.div
                  layout
                  className={`${selectedBase.color} w-full shadow-md rounded-xl flex flex-col justify-center items-center px-4 transition-all`}
                  style={{ height: `${Math.max(80, selectedBase.thickness * 20)}px` }}
                >
                  <span className="font-bold text-sm text-white">{selectedBase.name.substring(0, 32)}</span>
                  <span className="text-xs text-white/70 font-semibold">{selectedBase.thickness}"</span>
                </motion.div>
                
                {/* Wrapper indication box */}
                <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-3xl pointer-events-none z-[-1] flex items-end justify-center pb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedFabric.name.substring(0, 15)} Wrapper</span>
                </div>
              </div>
            </div>

            {/* Pricing summary inside sticky panel */}
            <div className="border-t border-gray-100 pt-8 mt-4 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-gray-500 text-xs font-semibold tracking-wider uppercase block mb-1">Total Value</span>
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Free Delivery & 10-Year Warranty
                  </p>
                </div>
              </div>

              {includeAccessories && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    <strong className="font-bold text-amber-900 block text-sm mb-0.5">Bonus Pack Attached</strong>
                    Includes 2 Ergonomic Latex Pillows & 1 Premium Waterproof Protector.
                  </p>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-xl font-semibold tracking-wide transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart — Secure Checkout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Choices Configurator Form */}
        <div className="lg:col-span-7 order-2 lg:order-2">
          
          {/* Step 1: Mattress Size */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 1: Mattress Size</h2>
            <p className="text-sm text-gray-500 mb-6">Standard Indian bed dimensions.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(SIZE_LABELS) as MattressSize[]).map((sz) => (
                <div
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`p-4 rounded-xl text-center border cursor-pointer transition-colors duration-200 ${
                    size === sz
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500 text-amber-900'
                      : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <span className="font-bold text-sm capitalize block mb-1">{sz}</span>
                  <span className={`text-[11px] font-medium ${size === sz ? 'text-amber-700' : 'text-gray-500'}`}>
                    {sz === 'king' ? '72"x78"' : sz === 'queen' ? '60"x78"' : sz === 'double' ? '48"x75"' : '36"x75"'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Foundation Support Base */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 2: Foundation Base (4")</h2>
            <p className="text-sm text-gray-500 mb-6">The backbone of your orthopedic bedding system.</p>
            
            <div className="space-y-4">
              {BASE_LAYERS.map((base) => (
                <div
                  key={base.id}
                  onClick={() => setSelectedBase(base)}
                  className={`p-5 rounded-2xl cursor-pointer transition-colors duration-200 relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    selectedBase.id === base.id
                      ? 'bg-amber-50 ring-2 ring-amber-500 border-transparent text-amber-900'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4 pr-8">
                    <span className={`w-4 h-4 rounded-full mt-1 shrink-0 border border-black/10 ${base.color}`}></span>
                    <div>
                      <h4 className="font-bold text-base mb-1">{base.name}</h4>
                      <p className={`text-sm leading-relaxed ${selectedBase.id === base.id ? 'text-amber-800/80' : 'text-gray-500'}`}>{base.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className={`font-semibold text-sm px-3 py-1.5 rounded-lg border ${selectedBase.id === base.id ? 'bg-amber-100/50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-900'}`}>
                      ₹{base.priceFactor[size].toLocaleString('en-IN')}
                    </span>
                  </div>
                  {selectedBase.id === base.id && (
                    <div className="absolute top-4 right-4 text-amber-500">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Transition Cushion Layer */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 3: Transition Layer</h2>
            <p className="text-sm text-gray-500 mb-6">Acts as a damper to prevent pressure points.</p>
            
            <div className="space-y-4">
              {TRANSITION_LAYERS.map((trans) => (
                <div
                  key={trans.id}
                  onClick={() => setSelectedTransition(trans)}
                  className={`p-5 rounded-2xl cursor-pointer transition-colors duration-200 relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    selectedTransition.id === trans.id
                      ? 'bg-amber-50 ring-2 ring-amber-500 border-transparent text-amber-900'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4 pr-8">
                    {trans.thickness > 0 ? (
                      <span className={`w-4 h-4 rounded-full mt-1 shrink-0 border border-black/10 ${trans.color}`}></span>
                    ) : (
                      <div className="w-4 h-4 mt-1 shrink-0 flex items-center justify-center"><Trash2 className="w-4 h-4 text-gray-400" /></div>
                    )}
                    <div>
                      <h4 className="font-bold text-base mb-1">
                        {trans.name} {trans.thickness > 0 && <span className="text-xs font-semibold uppercase ml-1 opacity-70">({trans.thickness}")</span>}
                      </h4>
                      <p className={`text-sm leading-relaxed ${selectedTransition.id === trans.id ? 'text-amber-800/80' : 'text-gray-500'}`}>{trans.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className={`font-semibold text-sm px-3 py-1.5 rounded-lg border ${selectedTransition.id === trans.id ? 'bg-amber-100/50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-900'}`}>
                      {trans.priceFactor[size] === 0 ? 'INCLUDED' : `+ ₹${trans.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {selectedTransition.id === trans.id && (
                    <div className="absolute top-4 right-4 text-amber-500">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Top Luxury Comfort Layer */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 4: Top Comfort Topper</h2>
            <p className="text-sm text-gray-500 mb-6">100% natural, providing ultimate surface comfort and cooling.</p>
            
            <div className="space-y-4">
              {COMFORT_TOPPER_LAYERS.map((top) => (
                <div
                  key={top.id}
                  onClick={() => setSelectedTop(top)}
                  className={`p-5 rounded-2xl cursor-pointer transition-colors duration-200 relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    selectedTop.id === top.id
                      ? 'bg-amber-50 ring-2 ring-amber-500 border-transparent text-amber-900'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4 pr-8">
                    {top.thickness > 0 ? (
                      <span className={`w-4 h-4 rounded-full mt-1 shrink-0 border border-black/10 ${top.color}`}></span>
                    ) : (
                      <div className="w-4 h-4 mt-1 shrink-0 flex items-center justify-center"><Trash2 className="w-4 h-4 text-gray-400" /></div>
                    )}
                    <div>
                      <h4 className="font-bold text-base mb-1">
                        {top.name} {top.thickness > 0 && <span className="text-xs font-semibold uppercase ml-1 opacity-70">({top.thickness}")</span>}
                      </h4>
                      <p className={`text-sm leading-relaxed ${selectedTop.id === top.id ? 'text-amber-800/80' : 'text-gray-500'}`}>{top.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className={`font-semibold text-sm px-3 py-1.5 rounded-lg border ${selectedTop.id === top.id ? 'bg-amber-100/50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-900'}`}>
                      {top.priceFactor[size] === 0 ? 'INCLUDED' : `+ ₹${top.priceFactor[size].toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {selectedTop.id === top.id && (
                    <div className="absolute top-4 right-4 text-amber-500">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 5: Premium Quilted Weave Wrapper */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 5: Outer Cover</h2>
            <p className="text-sm text-gray-500 mb-6">Direct touch point of your rest with active sweat absorption.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FABRICS.map((fabric) => (
                <div
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`p-5 rounded-2xl cursor-pointer transition-colors duration-200 relative ${
                    selectedFabric.id === fabric.id
                      ? 'bg-amber-50 ring-2 ring-amber-500 border-transparent text-amber-900'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3 pr-6">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded ${selectedFabric.id === fabric.id ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                      {fabric.id === 'f1' ? 'Standard Core' : 'Premium Air-Flow'}
                    </span>
                  </div>
                  <h4 className="font-bold text-base mb-1">{fabric.name}</h4>
                  <p className={`text-sm mb-4 leading-relaxed ${selectedFabric.id === fabric.id ? 'text-amber-800/80' : 'text-gray-500'}`}>{fabric.description}</p>
                  <span className={`font-semibold text-sm ${selectedFabric.id === fabric.id ? 'text-amber-800' : 'text-gray-900'}`}>
                    + ₹{fabric.price[size].toLocaleString('en-IN')}
                  </span>
                  
                  {selectedFabric.id === fabric.id && (
                    <div className="absolute top-4 right-4 text-amber-500">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 6: Accessories */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Step 6: Accessories Bundle</h2>
            <p className="text-sm text-gray-500 mb-6">Complete your sleep system.</p>
            
            <div
              onClick={() => setIncludeAccessories(!includeAccessories)}
              className={`p-6 rounded-2xl cursor-pointer transition-colors duration-200 relative flex items-center justify-between gap-4 ${
                includeAccessories
                  ? 'bg-amber-50 ring-2 ring-amber-500 border-transparent text-amber-900'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex-1 pr-8">
                <h4 className="font-bold text-lg mb-1">Premium Bundle Pack</h4>
                <p className={`text-sm leading-relaxed ${includeAccessories ? 'text-amber-800/80' : 'text-gray-500'}`}>
                  Add 2 luxury Talalay natural rubber latex pillows & 1 Premium 100% Breathable Waterproof Mattress Protector.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className={`font-semibold text-sm px-3 py-1.5 rounded-lg border ${includeAccessories ? 'bg-amber-100/50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-900'}`}>
                  + ₹{includeAccessories ? { king: 5000, queen: 4000, double: 3000, single: 2500 }[size] : 0}
                </span>
              </div>
              {includeAccessories && (
                <div className="absolute top-4 right-4 text-amber-500">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
