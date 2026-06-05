import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Check, Shield, Star, RefreshCw, ShoppingCart, Info, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { Product, MattressSize, Tier } from '../../types';
import { PRODUCTS } from '../../data/products';
import ShineBorder from '../ui/ShineBorder';

interface ProductListProps {
  onAddToCartDirect: (product: Product, size: MattressSize, includeAcc: boolean) => void;
  onNavigateToPdp: (slug: string) => void;
  onNavigate: (page: string) => void;
  selectedTier: Tier | 'all';
  setSelectedTier: (tier: Tier | 'all') => void;
}

export default function ProductList({ 
  onAddToCartDirect, 
  onNavigateToPdp, 
  onNavigate,
  selectedTier,
  setSelectedTier
}: ProductListProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComfort, setSelectedComfort] = useState<'all' | 'soft' | 'medium' | 'firm'>('all');
  const [onlyLatex, setOnlyLatex] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'priceDesc' | 'thickness'>('popular');
  
  // Card-specific size selectors (state mapped by slug)
  const [cardSizes, setCardSizes] = useState<Record<string, MattressSize>>({});

  // Helper: get selected size for a specific product
  const getProductSize = (slug: string): MattressSize => {
    return cardSizes[slug] || 'king';
  };

  // Helper: set selected size for a specific product
  const setProductSize = (slug: string, size: MattressSize) => {
    setCardSizes(prev => ({ ...prev, [slug]: size }));
  };

  // Helper check for latex in layers
  const hasLatex = (product: Product) => {
    return product.layers.some(l => l.material === 'latex' || l.material === 'latex_rebonded');
  };

  // Helper to extract baseline starting price
  const getProductStartingPrice = (product: Product, size: MattressSize) => {
    if (product.pricingModel === 'with_without_accessories') {
      return product.pricing.withoutAccessories?.[size] || 0;
    } else {
      return product.pricing.fabric300Gsm?.[size] || 0;
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.tagline.toLowerCase().includes(q) ||
             p.keyBenefit.toLowerCase().includes(q) ||
             p.layers.some(l => l.description.toLowerCase().includes(q))
      );
    }

    // Tier filter
    if (selectedTier !== 'all') {
      result = result.filter(p => p.tier === selectedTier);
    }

    // Comfort filter
    if (selectedComfort !== 'all') {
      result = result.filter(p => {
        if (selectedComfort === 'soft') return p.comfortLevel.includes('soft') || p.comfortLevel === 'plush';
        if (selectedComfort === 'medium') return p.comfortLevel.includes('medium') || p.comfortLevel === 'plush';
        if (selectedComfort === 'firm') return p.comfortLevel.includes('firm');
        return true;
      });
    }

    // Latex Filter
    if (onlyLatex) {
      result = result.filter(p => hasLatex(p));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'priceAsc') {
        return getProductStartingPrice(a, 'king') - getProductStartingPrice(b, 'king');
      }
      if (sortBy === 'priceDesc') {
        return getProductStartingPrice(b, 'king') - getProductStartingPrice(a, 'king');
      }
      if (sortBy === 'thickness') {
        return b.totalThickness - a.totalThickness;
      }
      // 'popular' keeps order
      return 0;
    });

    return result;
  }, [searchTerm, selectedTier, selectedComfort, onlyLatex, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Title block */}
      <div className="mb-12 border-b border-zinc-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
            REAL NATURAL LATEX & ORTHO HEALTH MODULES
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight mt-3 text-brand-950">
            Explore Mattress Collections
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl font-sans">
            Direct-from-factory pricing with absolute transparency. Tap any product image for comprehensive layered specifications and custom warranties.
          </p>
        </div>
        
        {/* Dynamic counter */}
        <div className="font-mono text-xs text-zinc-500 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200 shrink-0 select-none">
          Showing <span className="font-bold text-brand-950">{filteredProducts.length}</span> of 13 Models Available
        </div>
      </div>

      {/* FILTER CONTROLLER DASHBOARD */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-zinc-200/80 shadow-md mb-8 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Search */}
        <div className="md:col-span-3 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search mattress name or materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 text-xs font-sans placeholder-gray-400"
          />
        </div>

        {/* Tier filter */}
        <div className="md:col-span-9 flex flex-wrap gap-3 items-center justify-start md:justify-end">
          {/* Collection tabs */}
          <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-semibold">
            {(['all', 'luxury', 'premium', 'comfort'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-3 py-1.5 rounded-lg font-display capitalize transition-all cursor-pointer ${
                  selectedTier === t
                    ? 'bg-brand-950 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-brand-950 hover:bg-zinc-200/50'
                }`}
              >
                {t === 'all' ? 'All Tiers' : t}
              </button>
            ))}
          </div>

          {/* Comfort levels dropdown */}
          <select
            value={selectedComfort}
            onChange={(e) => setSelectedComfort(e.target.value as any)}
            className="bg-white border border-zinc-200 text-xs font-medium font-display px-3.5 py-2 rounded-xl text-zinc-700 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Any Comfort/Firmness</option>
            <option value="soft">Soft & Plush Feel</option>
            <option value="medium">Medium Support</option>
            <option value="firm">Firm Orthopedic Feel</option>
          </select>

          {/* Sort selection */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-zinc-200 text-xs font-medium font-display px-3.5 py-2 rounded-xl text-zinc-700 focus:outline-hidden cursor-pointer"
          >
            <option value="popular">Sorted by Recommendation</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="thickness">Thickness Profile: Deepest First</option>
          </select>

          {/* Checkbox: natural latex */}
          <label className="flex items-center gap-2 text-xs font-display font-semibold text-zinc-700 bg-brand-50/50 border border-brand-200/60 px-3 py-2 rounded-xl hover:bg-brand-50 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyLatex}
              onChange={(e) => setOnlyLatex(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500/20 w-3.5 h-3.5 border-zinc-300"
            />
            <span>Pure Kerala Latex Only</span>
          </label>
        </div>
      </div>

      {/* PRODUCT GRID BLOCKS */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((p, index) => {
              const activeSize = getProductSize(p.slug);
              const price = getProductStartingPrice(p, activeSize);
              const isLatex = hasLatex(p);
              const isBestSeller = p.slug === 'nirvana' || (p.badge && p.badge.toLowerCase().includes('best seller'));

              const cardInner = (
                <>
                  {/* Luxury Gold/Silver Border for Luxury Tier */}
                  {p.tier === 'luxury' && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-luxury-gold to-yellow-500 z-10"></div>
                  )}

                  {/* Header metadata display */}
                  <div className="p-4 bg-zinc-50/50 border-b border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none">
                    <span className="uppercase tracking-wider font-bold text-brand-600">{p.tier} collection</span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> {p.warranty}Y Warranty
                    </span>
                  </div>

                  {/* Product Image block */}
                  <div className="h-48 md:h-52 relative overflow-hidden bg-zinc-100 cursor-pointer" onClick={() => onNavigateToPdp(p.slug)}>
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-brand-950/90 text-white font-mono text-[9px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-sm z-10 max-w-[80%] truncate">
                        {p.badge}
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Tiny visual hover card overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-display font-medium inline-flex items-center gap-1 bg-brand-950/80 px-3 py-1.5 rounded-lg border border-white/10">
                        Explore Full Specifications <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Core Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Comfort rating line */}
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-brand-950 flex flex-wrap items-center gap-1">
                            {p.name}
                            {isBestSeller && (
                              <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-center">Hand-Crafted</span>
                            )}
                          </h3>
                          <span className="text-[10px] text-gray-400 font-mono italic block">{p.tagline}</span>
                        </div>
                        
                        {/* Comfort label */}
                        <div className="text-right">
                          <span className="inline-block text-[10px] font-bold tracking-wider font-mono uppercase bg-neutral-100 text-zinc-700 px-2 py-0.5 rounded-full capitalize">
                            {p.comfortLevel}
                          </span>
                          <div className="flex items-center justify-end gap-0.5 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < p.comfortRating ? 'bg-amber-400' : 'bg-gray-200'
                                }`}
                              ></span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Brief description */}
                      <p className="text-xs text-stone-600 mt-4 leading-relaxed line-clamp-2">
                        {p.keyBenefit}
                      </p>

                      {/* Details specs bullets checklist */}
                      <div className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-[11px] text-zinc-500 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0"></span>
                          <span>Thickness Profile: <strong className="text-brand-950 font-semibold">{p.totalThickness} Inches</strong> composite layers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0"></span>
                          <span>Cover Shell: <strong className="text-brand-950 font-semibold">{p.fabricGsm} GSM {p.fabricType.split(' ')[0]}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0"></span>
                          <span>Natural Rubber India: <strong className="text-brand-950 font-semibold">{isLatex ? 'Yes, Organically Sourced' : 'Ortho Spine Foams'}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Mattress Size Configurator inside each block */}
                    <div className="mt-4 pt-4 border-t border-zinc-100">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-zinc-100 px-2 py-0.5 rounded whitespace-nowrap">
                          Active Size pricing
                        </span>
                        
                        {/* Size button triggers */}
                        <div className="flex gap-1">
                          {(['king', 'queen', 'double', 'single'] as MattressSize[]).map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductSize(p.slug, sz);
                              }}
                              className={`w-7 h-6 rounded-md font-mono text-[9px] font-bold transition-all uppercase select-none cursor-pointer ${
                                activeSize === sz
                                  ? 'bg-brand-950 text-white'
                                  : 'bg-zinc-100 text-zinc-500 hover:text-brand-950 hover:bg-zinc-200'
                              }`}
                            >
                              {sz[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price indicator + Access premium note */}
                      <div className="flex justify-between items-end bg-brand-50/40 p-2.5 rounded-xl border border-brand-200/30">
                        <div>
                          <span className="text-[10px] font-mono text-brand-800 tracking-wider font-semibold block uppercase">DIRECT FOR {activeSize}</span>
                          <span className="text-xl font-bold font-display text-brand-950">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        
                        {p.pricingModel === 'with_without_accessories' && (
                          <div className="text-right text-[9px] text-gray-400 font-mono max-w-[120px] leading-tight">
                            *Excludes pillow set pricing. Accessories options at cart checkout step.
                          </div>
                        )}
                        {p.pricingModel === 'fabric_options' && (
                          <div className="text-right text-[9px] text-gray-400 font-mono max-w-[120px] leading-tight">
                            *Reflects base 300 GSM model cover wrap.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="p-4 bg-zinc-50 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs">
                    <button
                      id={`btn-details-${p.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToPdp(p.slug);
                      }}
                      className="py-2.5 px-3 rounded-lg border border-zinc-200 hover:border-brand-500 bg-white hover:bg-zinc-50 font-display font-semibold text-zinc-800 flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <Info className="w-3.5 h-3.5" /> Detail Specs
                    </button>
                    <button
                      id={`btn-shop-${p.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartDirect(p, activeSize, false);
                      }}
                      className="py-2.5 px-3 rounded-lg bg-brand-950 hover:bg-brand-800 active:bg-black text-white font-display font-semibold flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Buy Direct
                    </button>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
                  className="h-full cursor-pointer"
                  onClick={() => onNavigateToPdp(p.slug)}
                >
                  {isBestSeller ? (
                    <ShineBorder className="h-full flex flex-col justify-between group">
                      {cardInner}
                    </ShineBorder>
                  ) : (
                    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col justify-between group h-full relative hover:shadow-lg hover:border-brand-200/50 transition-all duration-300">
                      {cardInner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
            <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-brand-950">No Mattresses Match Filters</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto leading-relaxed">
              Try updating search queries, clearing "Kerala Latex Only" parameters, or choosing another collection tier to discover RelaxPro models.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTier('all');
                setSelectedComfort('all');
                setOnlyLatex(false);
              }}
              className="mt-5 inline-flex items-center gap-1.5 bg-brand-950 hover:bg-brand-800 text-white font-display text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filter Matrix
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Trust Callout */}
      <section className="bg-linear-to-r from-brand-100 via-brand-50 to-brand-100 mt-20 p-8 rounded-3xl border border-brand-200/50 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="max-w-xl">
          <span className="text-[10px] tracking-wider font-mono text-brand-600 uppercase bg-amber-200/70 py-0.5 px-2 rounded font-bold">ORTHOPEDIC CONFIDENCE</span>
          <h3 className="text-xl md:text-2xl font-display font-medium text-brand-950 mt-2">Can't decide on structural layers?</h3>
          <p className="text-gray-600 text-xs mt-2 leading-relaxed">
            Every spinal structure has unique density requirements. RelaxPro allows you to custom engineer density blends, accessories, and outer quilted weaves. Open our 3D interactive builder.
          </p>
        </div>
        <button
          onClick={() => onNavigate('builder')}
          className="bg-brand-950 hover:bg-brand-800 text-white text-xs font-semibold font-display tracking-wider uppercase py-3.5 px-5 rounded-xl flex items-center gap-1.5 shrink-0 group transition-all shadow-md shadow-brand-950/20 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-brand-500" /> Start 3D Customizer
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>
    </div>
  );
}
