import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Award, HelpCircle, ShoppingCart, MessageSquare, ArrowLeft, Heart, Star, Sparkles, BookOpen, VolumeX, Mail } from 'lucide-react';
import { Product, MattressSize, CartItem } from '../../types';

interface ProductDetailProps {
  product: Product;
  onAddToCartDirect: (product: Product, size: MattressSize, includeAcc: boolean, fabricOption?: '300GSM' | '450GSM') => void;
  onNavigateBack: () => void;
  onNavigate: (page: string) => void;
}

export default function ProductDetail({ product, onAddToCartDirect, onNavigateBack, onNavigate }: ProductDetailProps) {
  const [activeSize, setActiveSize] = useState<MattressSize>('king');
  const [includeAccessories, setIncludeAccessories] = useState<boolean>(true);
  const [selectedFabric, setSelectedFabric] = useState<'300GSM' | '450GSM'>('300GSM');

  const SIZE_LABELS = {
    king: 'King Size (72" x 78")',
    queen: 'Queen Size (60" x 78")',
    double: 'Double Size (48" x 75")',
    single: 'Single Size (36" x 75")'
  };

  // Pricing math calculator
  const activePrice = useMemo(() => {
    if (product.pricingModel === 'with_without_accessories') {
      const pricingObj = product.pricing;
      if (includeAccessories) {
        return pricingObj.withAccessories?.[activeSize] || 0;
      } else {
        return pricingObj.withoutAccessories?.[activeSize] || 0;
      }
    } else {
      const pricingObj = product.pricing;
      if (selectedFabric === '450GSM') {
        return pricingObj.fabric450Gsm?.[activeSize] || 0;
      } else {
        return pricingObj.fabric300Gsm?.[activeSize] || 0;
      }
    }
  }, [product, activeSize, includeAccessories, selectedFabric]);

  const handleAddToCart = () => {
    onAddToCartDirect(
      product,
      activeSize,
      product.pricingModel === 'with_without_accessories' ? includeAccessories : false,
      product.pricingModel === 'fabric_options' ? selectedFabric : undefined
    );
    onNavigate('cart');
  };

  const handleContactSuresh = () => {
    const message = `Hello Suresh, I am interested in purchasing the RelaxPro ${product.name} Mattress (${activeSize}). Could you please guide me on pricing, delivery timelines, and orthopedic support suitability?`;
    window.open(`https://wa.me/918977024494?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10"
    >
      {/* Navigation & Back Link */}
      <button
        onClick={onNavigateBack}
        className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-brand-950 text-xs font-display font-semibold mb-8 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Mattress Collections
      </button>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Images & Core Specs */}
        <div className="lg:col-span-6 space-y-8">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/50 shadow-md">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-brand-950/90 text-white font-mono text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full z-10 border border-white/20">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[320px] md:h-[450px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Core Spec Badges Section */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xs grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">STIFFNESS</span>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < product.comfortRating ? 'bg-amber-400' : 'bg-gray-200'
                    }`}
                  ></span>
                ))}
              </div>
              <span className="text-xs font-display font-medium text-brand-950 capitalize mt-1 block">
                {product.comfortLevel} ({product.comfortRating}/5)
              </span>
            </div>
            
            <div className="border-x border-zinc-100">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">DEPTH PROFILE</span>
              <span className="text-lg font-bold font-display text-brand-950 mt-1 block">{product.totalThickness}"</span>
              <span className="text-xs text-zinc-500 font-sans block">Inches Composite</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">WARRANTY</span>
              <span className="text-lg font-bold font-display text-brand-950 mt-1 block">{product.warranty}-Year</span>
              <span className="text-xs text-zinc-500 font-sans block">Direct Replacement</span>
            </div>
          </div>

          {/* Stacked Layer Breakdown with descriptions */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-200/50 shadow-md">
            <h3 className="font-display font-semibold text-lg text-brand-950 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-500" />
              <span>Internal Cross-Section Architecture</span>
            </h3>
            
            <div className="space-y-4">
              {product.layers.map((layer, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-zinc-50 rounded-xl border border-zinc-100 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-mono font-bold flex items-center justify-center shrink-0 border border-brand-200 text-sm">
                    {layer.thickness}"
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display font-bold text-[13px] text-brand-950 uppercase tracking-wider">
                        {layer.material.replace('_', ' ')}
                      </h4>
                      {layer.brand && (
                        <span className="font-mono text-[10px] bg-brand-200/50 text-brand-800 px-1.5 py-0.5 rounded">
                          {layer.brand}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {layer.description}
                    </p>
                    {layer.certification && (
                      <div className="flex gap-1.5 mt-2">
                        {layer.certification.map((c) => (
                          <span key={c} className="text-[9px] font-bold font-mono bg-yellow-100 text-yellow-800 px-1 py-0.2 rounded">
                            {c} Certified
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pricing, Configurations and Add To Cart */}
        <div className="lg:col-span-6 space-y-8">
          {/* Header titles */}
          <div>
            <span className="text-[10px] tracking-widest font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
              {product.tier === 'luxury' ? '🏆 Luxury Spine Care' : '🌟 Ortho Certified'}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight mt-4 text-brand-950">
              {product.name} Latex Mattress
            </h1>
            <p className="text-zinc-500 text-sm font-sans italic mt-1.5">
              "{product.tagline}"
            </p>
            <p className="text-stone-700 text-xs leading-relaxed mt-4 font-sans border-l-2 border-brand-500 pl-4 bg-brand-50/30 py-2.5">
              {product.keyBenefit}
            </p>
          </div>

          {/* Size Selectors Section */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xs">
            <h3 className="font-display font-medium text-brand-950 text-sm mb-4">
              Select Bed Size Specifications:
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(SIZE_LABELS) as MattressSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setActiveSize(sz)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    activeSize === sz
                      ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/25'
                      : 'border-zinc-200 hover:border-brand-300 hover:bg-zinc-50'
                  }`}
                >
                  <span className="font-display font-semibold text-xs text-brand-950 capitalize block">{sz} Size</span>
                  <span className="font-mono text-[10px] text-zinc-400 mt-1 block">
                    {sz === 'king' ? '72"x78" (Suite)' : sz === 'queen' ? '60"x78" (Standard)' : sz === 'double' ? '48"x75" (Compact)' : '36"x75" (Single)'}
                  </span>
                  {activeSize === sz && (
                    <span className="absolute top-3 right-3 text-brand-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Model configuration boxes */}
          {product.pricingModel === 'with_without_accessories' ? (
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-medium text-brand-950 text-sm">
                  Accessories Factory Bundle:
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">SAVINGS ₹3,700</span>
              </div>
              
              <div
                onClick={() => setIncludeAccessories(true)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  includeAccessories
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-zinc-200 hover:border-brand-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${includeAccessories ? 'border-brand-500 bg-brand-500 text-white' : 'border-zinc-300'}`}>
                    {includeAccessories && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <strong className="font-display font-semibold text-[13px] text-brand-950 block">Include Premium Accessory Pack (Recommended)</strong>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Adds 2 Ergonomic Premium Latex Pillows + 1 Elasticated Waterproof Mattress Protector. Delivered pre-compressed.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setIncludeAccessories(false)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  !includeAccessories
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-zinc-200 hover:border-brand-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${!includeAccessories ? 'border-brand-500 bg-brand-500 text-white' : 'border-zinc-300'}`}>
                    {!includeAccessories && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <strong className="font-display font-semibold text-[13px] text-brand-950 block">Mattress Only</strong>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Deduct accessories. Delivered packaged flat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xs space-y-4">
              <h3 className="font-display font-medium text-brand-950 text-sm">
                Upgraded Outer Fabric Options:
              </h3>

              <div
                onClick={() => setSelectedFabric('300GSM')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedFabric === '300GSM'
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-zinc-200 hover:border-brand-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${selectedFabric === '300GSM' ? 'border-brand-500 bg-brand-500 text-white' : 'border-zinc-300'}`}>
                    {selectedFabric === '300GSM' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <strong className="font-display font-semibold text-[13px] text-brand-950 block">300 GSM Premium Micro-Knit Knit Weave</strong>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Standard luxury cover, lightweight, hyper breathable. Holds Oeko-Tex certification.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedFabric('450GSM')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedFabric === '450GSM'
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-zinc-200 hover:border-brand-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${selectedFabric === '450GSM' ? 'border-brand-500 bg-brand-500 text-white' : 'border-zinc-300'}`}>
                    {selectedFabric === '450GSM' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <strong className="font-display font-semibold text-[13px] text-brand-950 block">450 GSM Luxurious Quilted Bamboo Organic Knit</strong>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                      Upgraded luxurious thickness with stitched cloud padding. Bamboo fibers maintain high-end coolness natively.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Box & Add to Cart */}
          <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-[10px] tracking-wider font-mono text-zinc-400 block uppercase mb-1">DIRECT-TO-CONSUMER VALUE</span>
              <div className="text-3xl font-display font-bold text-luxury-gold">
                ₹{activePrice.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-zinc-400 font-mono mt-1">
                Tax Included • Free Kerala-Sourced Home Shipping
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-luxury-gold hover:bg-yellow-600 active:bg-yellow-700 text-zinc-950 font-display font-semibold text-xs tracking-wider uppercase py-4 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-luxury-gold/10 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Now
            </button>
          </div>

          {/* Ask Suresh / Personal Consultation CTA */}
          <div className="bg-brand-100/50 p-6 rounded-2xl border border-brand-200/50 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 text-brand-600 border border-brand-200 shadow-xs">
              <MessageSquare className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-brand-950 text-sm">Need a Clinical Posture Audit?</h4>
              <p className="text-zinc-600 text-xs mt-1 leading-relaxed">
                Connect directly with Suresh (the RelaxPro founder). He will analyze your current mattress hardness, sleep postures, and medical back histories to recommend the ideal model.
              </p>
              <button
                onClick={handleContactSuresh}
                className="inline-flex items-center gap-1.5 text-xs text-brand-800 font-semibold font-mono underline hover:text-brand-950 mt-3 hover:scale-101 transition-all cursor-pointer"
              >
                Chat on WhatsApp with Suresh (+91 89770 24494)
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
