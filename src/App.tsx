import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Check, 
  ChevronRight, 
  Heart, 
  Star, 
  BookOpen, 
  ShoppingCart, 
  Sparkle,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';

// Subcomponents
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import MattressBuilder from './components/builder/MattressBuilder';
import CompareTable from './components/product/CompareTable';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import SleepScience from './components/sleepscience/SleepScience';
import ConsultationForm from './components/home/ConsultationForm';
import SleepFAQs from './components/home/SleepFAQs';
import TwoWaysToOwn from './components/home/TwoWaysToOwn';
import CartPage from './components/cart/CartPage';

// Premium Visual UI / Micro-Animations
import NumberTicker from './components/ui/NumberTicker';
import Marquee from './components/ui/Marquee';
import BlurFade from './components/ui/BlurFade';
import Confetti from './components/ui/Confetti';
import ShineBorder from './components/ui/ShineBorder';

// Data types & products
import { CartItem, Product, MattressSize } from './types';
import { PRODUCTS, TESTIMONIALS, LOCATIONS } from './data/products';
import HeroSlider from './components/home/HeroSlider';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('nirvana');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderReceipt, setOrderReceipt] = useState<any | null>(null);
  const [selectedTier, setSelectedTier] = useState<'all' | 'luxury' | 'premium' | 'comfort'>('all');

  // Sync Cart with LocalStorage on init
  useEffect(() => {
    try {
      const stored = localStorage.getItem('relaxpro_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse cart local storage:', e);
    }
  }, []);

  // Save Cart to LocalStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('relaxpro_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Failed to write cart local storage:', e);
    }
  };

  // Cart Handlers
  const handleAddToCartDirect = (
    product: Product,
    size: MattressSize,
    includeAccessories: boolean,
    fabricOption?: '300GSM' | '450GSM'
  ) => {
    // Determine price
    let basePrice = 0;
    if (product.pricingModel === 'with_without_accessories') {
      basePrice = includeAccessories 
        ? product.pricing.withAccessories?.[size] || 0
        : product.pricing.withoutAccessories?.[size] || 0;
    } else {
      basePrice = fabricOption === '450GSM'
        ? product.pricing.fabric450Gsm?.[size] || 0
        : product.pricing.fabric300Gsm?.[size] || 0;
    }

    const itemKey = `${product.slug}-${size}-${includeAccessories ? 'acc' : 'no_acc'}-${fabricOption || 'std'}`;
    
    const existingIdx = cart.findIndex(item => item.id === itemKey);
    
    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemKey,
        slug: product.slug,
        name: `${product.name} Mattress`,
        size,
        price: basePrice,
        quantity: 1,
        includeAccessories,
        fabricOption,
        image: product.image,
        type: 'prebuilt'
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    const updated = cart.map(item => item.id === id ? { ...item, quantity: qty } : item);
    saveCart(updated);
  };

  const handleRemoveCartItem = (id: string) => {
    const filtered = cart.filter(item => item.id !== id);
    saveCart(filtered);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Checkout submission success handler
  const handleCheckoutSuccess = (orderId: string, orderSummary: any) => {
    setOrderReceipt(orderSummary);
    saveCart([]);
    setActivePage('success');
  };

  // Navigate directly to dynamic PDP page
  const handleNavigateToPdp = (slug: string) => {
    setSelectedProductSlug(slug);
    setActivePage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageNavigation = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Active PDP product binding
  const activePdpProduct = PRODUCTS.find(p => p.slug === selectedProductSlug) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between selection:bg-brand-500 selection:text-brand-950">
      {/* Universal header layout */}
      <Header 
        activePage={activePage} 
        cartCount={cartTotalCount} 
        onNavigate={handlePageNavigation} 
      />

      {/* Main Content Render */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hero Slider */}
              <HeroSlider 
                onNavigate={handlePageNavigation}
                onNavigateToPdp={handleNavigateToPdp}
              />

              {/* Infinite scrolling certifications and trust indicators marquee */}
              <Marquee />

              {/* Two Ways To Own Section */}
              <TwoWaysToOwn 
                onStartBuilding={() => handlePageNavigation('builder')}
                onSeeAllModels={() => handlePageNavigation('catalog')}
              />

              {/* Hook recommended product row */}
              <section className="bg-zinc-100/50 border-y border-zinc-250/20 py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                      <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-white px-2.5 py-1 rounded border border-zinc-200 font-bold">TOP THREE SELLING SLEEP SYSTEMS</span>
                      <h2 className="text-3xl font-display font-medium text-brand-950 mt-3">Bestselling Products</h2>
                    </div>
                    <button
                      onClick={() => handlePageNavigation('catalog')}
                      className="text-xs font-bold font-display uppercase tracking-widest text-brand-950 bg-white border border-zinc-250 hover:border-brand-500 py-3.5 px-5 rounded-xl cursor-pointer"
                    >
                      View All Products
                    </button>
                  </div>

                  {/* Card rows */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.slice(0, 3).map((item) => {
                      const isBestSeller = item.slug === 'nirvana';
                      const cardContent = (
                        <>
                          <div className="relative h-48 bg-zinc-100 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            {isBestSeller ? (
                              <span className="absolute top-3 left-3 bg-amber-500 text-brand-950 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md z-10 animate-pulse">
                                <Sparkles className="w-3 h-3 text-brand-950 fill-brand-950" /> Best Seller
                              </span>
                            ) : (
                              <span className="absolute top-3 left-3 bg-brand-950/90 text-white font-mono text-[9px] px-2.5 py-1 rounded-full uppercase z-10">
                                {item.comfortLevel} Feel
                              </span>
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-baseline mb-2 gap-2">
                                <h3 className="font-display font-bold text-lg text-brand-950 flex flex-wrap items-center gap-1">
                                  {item.name}
                                  {isBestSeller && (
                                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-center">Hand-Crafted</span>
                                  )}
                                </h3>
                                <span className="font-mono text-xs font-bold text-brand-800 shrink-0">
                                  ₹{item.pricingModel === 'with_without_accessories' 
                                    ? item.pricing.withoutAccessories?.king?.toLocaleString('en-IN') 
                                    : item.pricing.fabric300Gsm?.king?.toLocaleString('en-IN')} starting *
                                </span>
                              </div>
                              <p className="text-xs text-stone-600 mt-2 leading-relaxed">{item.keyBenefit}</p>
                              
                              <div className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-[11.5px] text-zinc-500">
                                <div>• Depth Profile: {item.totalThickness} inches composite</div>
                                <div>• Construction support core: Pure GOLS certified rubber</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-zinc-50 border-t border-zinc-100 grid grid-cols-2 gap-2 mt-auto">
                            <button onClick={() => handleNavigateToPdp(item.slug)} className="py-2.5 px-3 rounded-lg border border-zinc-200 hover:border-brand-500 bg-white font-display font-semibold text-xs text-center cursor-pointer text-brand-950 transition-all">
                              Detailed Layers
                            </button>
                            <button onClick={() => handleAddToCartDirect(item, 'king', false)} className="py-2.5 px-3 rounded-lg bg-brand-950 hover:bg-brand-800 active:bg-black text-white text-xs font-semibold text-center cursor-pointer transition-all">
                              Add King Size
                            </button>
                          </div>
                        </>
                      );

                      if (isBestSeller) {
                        return (
                          <ShineBorder key={item.slug} className="group flex flex-col justify-between h-full">
                            {cardContent}
                          </ShineBorder>
                        );
                      }

                      return (
                        <div key={item.slug} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden flex flex-col justify-between group shadow-xs">
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>

                </div>
              </section>

              {/* Tiers overview section */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 bg-brand-100 rounded-full font-bold">
                    THREE CURATED CATEGORIES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-medium mt-4 text-brand-950">
                    Engineered to Match Every Posture Need
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Luxury */}
                  <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 inset-x-0 h-1 bg-luxury-gold rounded-t-3xl"></div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded">LUXURY ORGANIC LATEX</span>
                    <h3 className="text-xl font-display font-semibold text-zinc-950">Pure Organic Latex Blocks</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Denser solid GOLS latex sheets harvested in Kerala. Includes dual monozone and orthopedic 7-Zone configurations for premium weight wellness.
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-500 pt-2 font-display">
                      <li className="flex items-center gap-1.5">✓ Nirvana (8" Dual Zone)</li>
                      <li className="flex items-center gap-1.5">✓ Amrita (10" Reversible Hybrid)</li>
                      <li className="flex items-center gap-1.5">✓ Ananda (6" Classic Pure core)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('luxury'); handlePageNavigation('catalog'); }} className="text-brand-900 hover:text-brand-950 text-xs font-semibold underline block pt-3 cursor-pointer">
                      Browse Luxury Series →
                    </button>
                  </div>

                  {/* Premium */}
                  <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-brand-800 bg-brand-100 px-2.5 py-1 rounded">PREMIUM SPINE HYBRIDS</span>
                    <h3 className="text-xl font-display font-semibold text-zinc-950">Orthopedic Support Cores</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Balanced structures blending solid responsive organic latex with high density rebound posture matrices. Recommended for bone corrective support.
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-500 pt-2 font-display">
                      <li className="flex items-center gap-1.5">✓ Arogya (8" Doctor recommendation)</li>
                      <li className="flex items-center gap-1.5">✓ Sthira (6" Ultimate firm alignment)</li>
                      <li className="flex items-center gap-1.5">✓ Somya (10" Extra softy adaptive)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('premium'); handlePageNavigation('catalog'); }} className="text-brand-900 hover:text-brand-950 text-xs font-semibold underline block pt-3 cursor-pointer">
                      Browse Premium Series →
                    </button>
                  </div>

                  {/* Comfort */}
                  <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-800 bg-blue-50 px-2.5 py-1 rounded">COMFORT HIGH-RESILIENCE</span>
                    <h3 className="text-xl font-display font-semibold text-zinc-950">Spine Transition Foams</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Accessible comfort mattresses powered by custom density transitions, Oeko-Tex wrappers, and lightweight fabric options. No natural latex overhead.
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-500 pt-2 font-display">
                      <li className="flex items-center gap-1.5">✓ Sunidra (8" Universal sleeper)</li>
                      <li className="flex items-center gap-1.5">✓ Ojas (6' Standard micro-weave)</li>
                      <li className="flex items-center gap-1.5">✓ AyushRest (8" Triple ortho firmness)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('comfort'); handlePageNavigation('catalog'); }} className="text-brand-900 hover:text-brand-950 text-xs font-semibold underline block pt-3 cursor-pointer">
                      Browse Comfort Series →
                    </button>
                  </div>
                </div>
              </section>

              {/* Testimonials Slider */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full font-bold">
                    TRUST AND HONEST FEEDBACK
                  </span>
                  <h2 className="text-3xl font-display font-medium mt-4 text-brand-950">
                    Trusted by Ortho Patients Across Southern Hubs
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-2xl border border-zinc-150/60 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-0.5 text-amber-500 mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed italic">
                          " {t.comment} "
                        </p>
                      </div>
                      <div className="border-t border-zinc-100 pt-3 mt-4">
                        <span className="font-display font-bold text-xs text-brand-950 block">{t.name}</span>
                        <span className="text-[10px] text-zinc-500 block">{t.city} • Verified user for {t.product}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Showrooms address block */}
              <section id="locations" className="bg-zinc-100 border-t border-zinc-200 py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="max-w-2xl mb-12">
                    <span className="text-[10px] tracking-wider font-mono text-brand-600 uppercase font-bold">EXPERIENCE BEFORE BUYING</span>
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-brand-950 mt-1">Our Showrooms and Kerala Factory Outlets</h2>
                    <p className="text-gray-500 text-xs mt-1">Walk in, test firmness profiles, lay down, and speak with Suresh's trained team directly at the locations below.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {LOCATIONS.map((loc, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-6 border border-zinc-200/65 shadow-xs space-y-4">
                        <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2 py-0.5 rounded">
                          {loc.city} Store
                        </span>
                        
                        <p className="text-xs text-stone-700 leading-normal font-sans">
                          {loc.address}
                        </p>

                        <div className="text-xs space-y-1.5 pt-2 border-t border-zinc-100">
                          <div className="text-zinc-500"><strong className="text-zinc-900 font-medium">Outlets hours:</strong> {loc.hours}</div>
                          <div className="text-zinc-900 font-mono"><strong className="text-zinc-500 font-sans font-medium">Contact:</strong> {loc.phones.join(', ')}</div>
                        </div>

                        <a
                          href={`https://wa.me/918977024494?text=${encodeURIComponent(`Hello, I would like to visit the RelaxPro ${loc.city} Experience Showroom. Can you please guide me on directions?`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-brand-900 font-semibold font-mono underline hover:text-brand-950 pt-2 cursor-pointer"
                        >
                          Book Showroom Visit + Map Route
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Sleep FAQs Accordion Section */}
              <section className="py-20 bg-white border-t border-zinc-200/50">
                <SleepFAQs />
              </section>

              {/* Consultation Leads intake */}
              <section className="py-20 bg-linear-to-b from-zinc-150 to-brand-50/50 px-4">
                <ConsultationForm />
              </section>
            </motion.div>
          )}

          {activePage === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductList 
                onAddToCartDirect={handleAddToCartDirect} 
                onNavigateToPdp={handleNavigateToPdp}
                onNavigate={handlePageNavigation}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
              />
            </motion.div>
          )}

          {activePage === 'pdp' && (
            <motion.div
              key="pdp"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductDetail 
                product={activePdpProduct} 
                onAddToCartDirect={handleAddToCartDirect} 
                onNavigateBack={() => setActivePage('catalog')}
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          )}

          {activePage === 'builder' && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <MattressBuilder 
                onAddToCart={(item) => saveCart([...cart, item])} 
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center space-y-6">
                <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full font-bold">ABOUT RELAXPRO</span>
                <h1 className="text-4xl font-display font-medium text-brand-950 mt-4">
                  Telangana and AP 1st Pure Latex Mattress Company
                </h1>
                <p className="text-zinc-600 max-w-3xl mx-auto font-sans leading-relaxed">
                  With our deep roots in natural rubber harvesting, RelaxPro Mattresses pioneers 100% pure natural latex sleep solutions in South India. Our mission is to handcraft restorative, customized, and orthopedic mattresses free from harmful synthetics—delivering straight from our Kerala factory to your doorstep.
                </p>
                <div className="pt-8">
                  <h3 className="font-display font-bold text-xl text-brand-900 mb-4">Our Presence</h3>
                  <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-zinc-500 font-bold">
                    <span className="bg-zinc-100 px-4 py-2 rounded-lg">📍 Hyderabad</span>
                    <span className="bg-zinc-100 px-4 py-2 rounded-lg">📍 Rajahmundry</span>
                    <span className="bg-zinc-100 px-4 py-2 rounded-lg">📍 Bangalore</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'science' && (
            <motion.div
              key="science"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SleepScience />
            </motion.div>
          )}

          {activePage === 'locations' && (
            <motion.div
              key="locations"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Experience Showroom location directly panel render */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="max-w-2xl mb-12">
                  <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full font-bold">
                    GET METROPOLITAN ADDRESSES & DIRECTIONS
                  </span>
                  <h1 className="text-4xl font-display font-medium tracking-tight mt-4 text-brand-950">
                    Visit Our Experience Studios
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Test the mattresses yourself before ordering. Speak with support teams who compile orthopedic statistics.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {LOCATIONS.map((loc, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-md flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-800 bg-brand-100 px-3 py-1 rounded-md inline-block">
                          {loc.city} outlet
                        </span>
                        
                        <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
                          {loc.address}
                        </p>

                        <div className="text-xs space-y-2 border-t border-zinc-100 pt-4 text-zinc-650 font-sans">
                          <div>
                            <strong className="text-zinc-900 font-semibold block uppercase text-[9px] font-mono tracking-wider mb-0.5">OPEN HOURS:</strong>
                            {loc.hours}
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-semibold block uppercase text-[9px] font-mono tracking-wider mb-0.5">DIRECT PHONE:</strong>
                            <div className="font-mono">{loc.phones.join(' / ')}</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            window.open(`https://wa.me/918977024494?text=${encodeURIComponent(`Hi Suresh, I would like directions, phone triggers and appointment schedule for the RelaxPro ${loc.city} Mattress Outlet.`)}`, '_blank');
                          }}
                          className="w-full bg-brand-950 hover:bg-brand-800 text-white rounded-lg py-2.5 text-xs font-semibold uppercase font-display tracking-wider cursor-pointer text-center"
                        >
                          Book Visit Callback
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="max-w-2xl mb-12 text-zinc-950">
                  <span className="text-xs tracking-widest font-mono text-brand-600 uppercase bg-brand-100 px-3 py-1 rounded-full font-bold">
                    GET PROFESSIONAL RECOMMENDATIONS DIRECTLY
                  </span>
                  <h1 className="text-4xl font-display font-medium tracking-tight mt-4">
                    Submit Back Diagnostic Concern
                  </h1>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Suresh is a seasoned mattress engineer. He will analyze your vertebrae pain profiles, sizing needs, and formulate options with zero fees recursively.
                  </p>
                </div>
                
                <ConsultationForm />
              </div>
            </motion.div>
          )}

          {activePage === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <CartPage 
                cart={cart}
                onUpdateQty={handleUpdateCartQty}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onCheckoutSuccess={handleCheckoutSuccess}
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          )}

          {activePage === 'success' && orderReceipt && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto px-4 md:px-6 py-20 text-center space-y-8 text-zinc-950 relative"
            >
              {/* Joyful order success celebrating confetti rain */}
              <Confetti />
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs tracking-widest font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded font-bold uppercase">
                  Thank you.
                </span>
                <h1 className="text-3xl font-display font-medium mt-4 text-brand-950">
                  Your order is received.
                </h1>
                <p className="text-sm text-stone-600 mt-2 font-sans">
                  We'll confirm on WhatsApp within 1 hour.
                </p>
              </div>

              {/* Order specifications card */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 md:p-6 shadow-md text-left font-sans text-xs space-y-4">
                <strong className="font-display font-bold text-sm text-brand-950 border-b border-zinc-100 pb-3 block">
                  Delivery Coordination Details
                </strong>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">CONSIGNEE NAME</span>
                    <span className="text-brand-950 font-medium">{orderReceipt.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">DELIVERY ADDRESS BOOKED</span>
                    <span className="text-brand-950 font-medium">
                      {orderReceipt.address}, {orderReceipt.city} - {orderReceipt.zip}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">10-DIGIT MOBILE</span>
                    <span className="text-brand-950 font-mono font-medium">{orderReceipt.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">TOTAL GRAND COD BALANCE DUE AT DOORSTEP</span>
                    <span className="text-base font-bold font-display text-brand-950">
                      ₹{orderReceipt.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
                  *A delivery coordinator from Jeedimetla Factory will call inside 12 hours. Pay COD via cash or safe UPI unrolling.
                </div>
              </div>

              {/* WhatsApp direct trigger support */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    const orderStrObj = orderReceipt.cart.map((item: any) => `- ${item.name} [Size: ${item.size} x ${item.quantity}]`).join('%0A');
                    const text = `Hello Suresh! I have completed order booking ${orderReceipt.orderId} on the website. Final Amount: ₹${orderReceipt.grandTotal.toLocaleString('en-IN')}. items:%0A${orderStrObj}%0A%0AConisgnee Details: Name: ${orderReceipt.name}, phone: ${orderReceipt.phone}, address: ${orderReceipt.address}. Please verify and dispatch!`;
                    window.open(`https://wa.me/918977024494?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl py-3 text-xs font-semibold uppercase tracking-wider font-display flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/15 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Instantly Submit Order to Suresh on WhatsApp
                </button>
                
                <button
                  onClick={() => {
                    setOrderReceipt(null);
                    handlePageNavigation('catalog');
                  }}
                  className="w-full border border-zinc-200 bg-white hover:bg-zinc-50 rounded-xl py-3 text-xs text-brand-950 font-semibold font-display uppercase tracking-wider cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Universal footer */}
      <Footer onNavigate={handlePageNavigation} onNavigateToPdp={handleNavigateToPdp} />

      {/* Pulsing floating WhatsApp FAB helper */}
      <WhatsAppFAB />
    </div>
  );
}
