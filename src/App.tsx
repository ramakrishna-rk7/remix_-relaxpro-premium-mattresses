import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import PriceText from './components/ui/PriceText';
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
  ArrowRight,
  Leaf
} from 'lucide-react';

// Subcomponents
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import CompareTable from './components/product/CompareTable';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import SleepScience from './components/sleepscience/SleepScience';
import ConsultationForm from './components/home/ConsultationForm';
import SleepFAQs from './components/home/SleepFAQs';
import TwoWaysToOwn from './components/home/TwoWaysToOwn';
import CartPage from './components/cart/CartPage';
import SEO from './components/seo/SEO';
import WhyChooseUs from './components/home/WhyChooseUs';
import ScrollToTop from './components/ui/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

// Code-split heavy route bundles
const MattressBuilder = lazy(() => import('./components/builder/MattressBuilder'));

// Hooks
import { useGlobalScrollAnimations } from './hooks/useIntersectionObserver';

// Premium Visual UI / Micro-Animations
import NumberTicker from './components/ui/NumberTicker';
import Marquee from './components/ui/Marquee';
import BlurFade from './components/ui/BlurFade';
import Confetti from './components/ui/Confetti';
import ShineBorder from './components/ui/ShineBorder';

// Data types & products
import { CartItem, Product, MattressSize, OrderReceipt } from './types';
import { PRODUCTS, TESTIMONIALS, LOCATIONS } from './data/products';
import HeroSlider from './components/home/HeroSlider';

function AppContent() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);
  const [selectedTier, setSelectedTier] = useState<'all' | 'luxury' | 'premium' | 'comfort'>('all');

  // Initialize global scroll animations
  useGlobalScrollAnimations();

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
  const handleCheckoutSuccess = (orderId: string, orderSummary: OrderReceipt) => {
    setOrderReceipt(orderSummary);
    saveCart([]);
    navigate('/success');
  };

  // Navigation handlers for compatibility
  const handleNavigateToPdp = (slug: string) => {
    navigate(`/mattresses/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageNavigation = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // SEO Home Schema
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RelaxPro Premium Mattresses",
    "image": "/images/products/prakriti.webp",
    "telephone": "+918686624494",
    "email": "relaxpro2022@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jeedimetla Industrial Area, Phase 3, Near Prasad Labs",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500055",
      "addressCountry": "IN"
    },
    "url": "https://remix-relaxpro-matress.vercel.app/",
    "priceRange": "₹6,500 - ₹54,000",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "21:00"
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between selection:bg-brand-500 selection:text-brand-950">
      {/* Universal header layout */}
      <Header cartCount={cartTotalCount} />

      {/* Main Content Render */}
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="animate-pulse text-brand-700 text-sm uppercase tracking-[0.3em]">Loading…</div>
            </div>
          }>
            <Routes>
          {/* HOME ROUTE */}
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SEO 
                title="RelaxPro Premium Mattresses | 100% Natural Organic Latex India"
                description="Telangana and AP's leading manufacturer of pure natural latex mattresses. Handcrafted, GOLS certified Dunlop rubber latex direct from Kerala unit to your bedroom."
                schema={homeSchema}
              />
              <HeroSlider 
                onNavigate={handlePageNavigation}
                onNavigateToPdp={handleNavigateToPdp}
              />
              <Marquee />
              <TwoWaysToOwn 
                onStartBuilding={() => handlePageNavigation('builder')}
                onSeeAllModels={() => handlePageNavigation('catalog')}
              />
              
              <section className="bg-secondary/50 border-y border-brand-200/30 py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4 fade-up">
                    <div>
                      <span className="inline-flex items-center gap-2 text-[11px] tracking-widest font-accent text-accent uppercase bg-accent/10 px-4 py-1.5 rounded-full font-bold">Top Selling Sleep Systems</span>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-3">Bestselling Products</h2>
                    </div>
                    <button
                      onClick={() => handlePageNavigation('catalog')}
                      className="btn-primary text-xs font-bold font-accent uppercase tracking-widest text-primary bg-white border border-brand-200 hover:border-accent py-3.5 px-6 rounded-full cursor-pointer shadow-sm"
                    >
                      View All Products
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PRODUCTS.slice(0, 3).map((item, idx) => {
                      const isBestSeller = item.slug === 'nirvana';
                      const cardContent = (
                        <>
                          <div className="relative img-zoom" style={{ aspectRatio: '4/3' }}>
                            <img
                              src={item.image}
                              alt={`${item.name} natural latex mattress`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              width={400}
                              height={300}
                              referrerPolicy="no-referrer"
                            />
                            {isBestSeller ? (
                              <span className="absolute top-3 left-3 bg-accent text-primary font-accent text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                                <Sparkles className="w-3 h-3 fill-current" /> Best Seller
                              </span>
                            ) : (
                              <span className="absolute top-3 left-3 bg-primary/90 text-white font-accent text-[9px] px-3 py-1.5 rounded-full uppercase z-10 tracking-wider">
                                {item.comfortLevel} Feel
                              </span>
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1 text-accent mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                                <span className="text-[10px] text-neutral-dark/40 ml-1 font-accent">(4.9)</span>
                              </div>
                              <h3 className="font-heading font-bold text-lg text-primary flex flex-wrap items-center gap-1">
                                {item.name}
                                {isBestSeller && (
                                  <span className="text-[9px] font-accent font-bold uppercase tracking-wider text-accent-dark bg-accent/15 px-1.5 py-0.5 rounded text-center">Hand-Crafted</span>
                                )}
                              </h3>
                              <p className="text-xs text-neutral-dark/50 mt-1 leading-relaxed font-body line-clamp-2">{item.keyBenefit}</p>
                              <div className="mt-4 pt-3 border-t border-brand-200/40 flex items-center gap-3">
                                <span className="text-lg font-bold text-primary font-body">
                                  <PriceText>₹{item.pricingModel === 'with_without_accessories'
                                    ? item.pricing.withoutAccessories?.king?.toLocaleString('en-IN')
                                    : item.pricing.fabric300Gsm?.king?.toLocaleString('en-IN')}</PriceText>
                                </span>
                                <span className="text-[10px] text-neutral-dark/40 font-accent">King Size</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border-t border-brand-200/30 grid grid-cols-2 gap-2 mt-auto">
                            <button onClick={(e) => { e.stopPropagation(); handleNavigateToPdp(item.slug); }} className="btn-primary py-2.5 px-3 rounded-xl border border-brand-200 hover:border-accent bg-white font-accent font-semibold text-xs text-center cursor-pointer text-primary transition-all">
                              View Details
                            </button>
                            <a
                              href={`https://wa.me/918686624494?text=${encodeURIComponent(`Hello Suresh, I am interested in the RelaxPro ${item.name} Mattress (King size). Please share pricing and delivery info.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold text-center transition-all"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Enquire on WA
                            </a>
                          </div>
                        </>
                      );

                      if (isBestSeller) {
                        return (
                          <ShineBorder key={item.slug} className="group flex flex-col justify-between h-full card-hover scale-in cursor-pointer" style={{ transitionDelay: `${idx * 0.1}s` } as any} onClick={() => handleNavigateToPdp(item.slug)}>
                            {cardContent}
                          </ShineBorder>
                        );
                      }

                      return (
                        <div key={item.slug} className={`bg-white rounded-2xl border border-brand-200/40 overflow-hidden flex flex-col justify-between group shadow-sm card-hover scale-in cursor-pointer`} style={{ transitionDelay: `${idx * 0.1}s` }} onClick={() => handleNavigateToPdp(item.slug)}>
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 fade-up">
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-widest font-accent text-accent uppercase bg-accent/10 px-4 py-1.5 rounded-full font-bold">
                    Three Curated Categories
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 text-primary leading-tight">
                    Engineered to Match Every Posture Need
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="bg-white p-7 md:p-8 rounded-2xl border border-brand-200/40 shadow-sm space-y-4 feature-card-glow relative scale-in" style={{ transitionDelay: '0s' }}>
                    <div className="absolute top-0 inset-x-0 h-1 bg-accent rounded-t-2xl" />
                    <span className="text-[10px] font-accent font-bold tracking-widest uppercase text-accent-dark bg-accent/15 px-2.5 py-1 rounded inline-block">Luxury Organic Latex</span>
                    <h3 className="text-xl font-heading font-bold text-primary">Pure Organic Latex Blocks</h3>
                    <p className="text-xs text-neutral-dark/50 leading-relaxed font-body">
                      Denser solid GOLS latex sheets harvested in Kerala. Dual monozone and orthopedic 7-Zone configurations.
                    </p>
                    <ul className="space-y-2 text-xs text-neutral-dark/60 pt-2 font-body">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Nirvana (8" Dual Zone)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Amrita (10" Reversible Hybrid)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Ananda (6" Classic Pure core)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('luxury'); handlePageNavigation('catalog'); }} className="text-accent hover:text-accent-dark text-xs font-semibold font-accent flex items-center gap-1 pt-3 cursor-pointer transition-colors">
                      Browse Luxury Series →
                    </button>
                  </div>

                  <div className="bg-white p-7 md:p-8 rounded-2xl border border-brand-200/40 shadow-sm space-y-4 feature-card-glow relative scale-in" style={{ transitionDelay: '0.15s' }}>
                    <span className="text-[10px] font-accent font-bold tracking-widest uppercase text-primary bg-brand-100 px-2.5 py-1 rounded inline-block">Premium Spine Hybrids</span>
                    <h3 className="text-xl font-heading font-bold text-primary">Orthopedic Support Cores</h3>
                    <p className="text-xs text-neutral-dark/50 leading-relaxed font-body">
                      Balanced structures blending organic latex with high density rebound posture matrices.
                    </p>
                    <ul className="space-y-2 text-xs text-neutral-dark/60 pt-2 font-body">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Arogya (8" Doctor recommendation)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Sthira (6" Ultimate firm alignment)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Somya (10" Extra softy adaptive)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('premium'); handlePageNavigation('catalog'); }} className="text-accent hover:text-accent-dark text-xs font-semibold font-accent flex items-center gap-1 pt-3 cursor-pointer transition-colors">
                      Browse Premium Series →
                    </button>
                  </div>

                  <div className="bg-white p-7 md:p-8 rounded-2xl border border-brand-200/40 shadow-sm space-y-4 feature-card-glow relative scale-in" style={{ transitionDelay: '0.3s' }}>
                    <span className="text-[10px] font-accent font-bold tracking-widest uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded inline-block">Comfort High-Resilience</span>
                    <h3 className="text-xl font-heading font-bold text-primary">Spine Transition Foams</h3>
                    <p className="text-xs text-neutral-dark/50 leading-relaxed font-body">
                      Accessible comfort mattresses with custom density transitions and Oeko-Tex certified wrappers.
                    </p>
                    <ul className="space-y-2 text-xs text-neutral-dark/60 pt-2 font-body">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Sunidra (8" Universal sleeper)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> Ojas (6" Standard micro-weave)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success shrink-0" /> AyushRest (8" Triple ortho firmness)</li>
                    </ul>
                    <button onClick={() => { setSelectedTier('comfort'); handlePageNavigation('catalog'); }} className="text-accent hover:text-accent-dark text-xs font-semibold font-accent flex items-center gap-1 pt-3 cursor-pointer transition-colors">
                      Browse Comfort Series →
                    </button>
                  </div>
                </div>
              </section>

              {/* ===== GOLS CERTIFICATION BADGE ===== */}
              <section className="bg-primary py-16 md:py-20 px-4 md:px-8 border-y border-white/10">
                <div className="max-w-5xl mx-auto text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/30 mb-6">
                    <Leaf className="w-10 h-10 text-accent" />
                  </div>
                  <span className="text-[10px] tracking-widest font-accent text-accent uppercase font-bold bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full inline-block mb-4">
                    GOLS Certified Organic
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
                    Pure Natural Latex —{' '}
                    <span className="text-accent">Zero Compromise</span>
                  </h2>
                  <p className="text-white/50 font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                    All RelaxPro latex mattresses use GOLS (Global Organic Latex Standard) certified natural rubber
                    from Kerala plantations. No synthetic latex, no chemical fillers — just pure Dunlop sap
                    transformed into your healthiest sleep surface.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                      { label: 'GOLS Certified', desc: 'Global Organic Latex' },
                      { label: 'Oeko-Tex', desc: 'Skin-Safe Fabrics' },
                      { label: 'FSC Certified', desc: 'Sustainable Harvest' },
                      { label: 'Zero VOC', desc: 'Chemical Free' },
                    ].map((cert, idx) => (
                      <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-accent font-heading font-bold text-lg">✓</div>
                        <div className="text-white font-heading font-bold text-sm mt-1">{cert.label}</div>
                        <div className="text-white/40 text-[10px] font-body mt-0.5">{cert.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ===== WHICH MATTRESS IS RIGHT FOR ME? ===== */}
              <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-[11px] tracking-widest font-accent text-accent uppercase font-bold bg-accent/10 px-4 py-1.5 rounded-full inline-block mb-4">
                      Find Your Match
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight">
                      Which Mattress Is Right for You?
                    </h2>
                    <p className="text-neutral-dark/50 text-sm mt-3 font-body leading-relaxed">
                      Not sure where to start? Pick your sleep style and we'll recommend the perfect model.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {[
                      {
                        icon: <Sparkles className="w-6 h-6" />,
                        title: 'Side Sleeper',
                        desc: 'Need pressure relief on shoulders & hips. Try our plush organic latex or soft-medium hybrids.',
                        tier: 'luxury',
                        slug: 'nirvana'
                      },
                      {
                        icon: <Shield className="w-6 h-6" />,
                        title: 'Back & Orthopedic',
                        desc: 'Require spine alignment & firm support. Our medium-firm orthopedic builds are doctor-recommended.',
                        tier: 'premium',
                        slug: 'arogya'
                      },
                      {
                        icon: <Award className="w-6 h-6" />,
                        title: 'Stomach Sleeper',
                        desc: 'Need firm even surface to prevent hip sinking. Our firm and ultra-firm options keep you aligned.',
                        tier: 'comfort',
                        slug: 'ayushrest'
                      },
                    ].map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedTier(option.tier as 'all' | 'luxury' | 'premium' | 'comfort'); handlePageNavigation('catalog'); }}
                        className="group bg-neutral-light hover:bg-accent/5 border border-brand-200/50 hover:border-accent/40 rounded-2xl p-6 md:p-8 text-left transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {option.icon}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-primary mb-2">{option.title}</h3>
                        <p className="text-neutral-dark/60 text-sm font-body leading-relaxed">{option.desc}</p>
                        <span className="inline-flex items-center gap-1 text-accent text-xs font-accent font-bold mt-4 group-hover:gap-2 transition-all">
                          View {option.tier} models <ChevronRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ===== GOOGLE MAPS ===== */}
              <section className="py-12 md:py-16 px-4 md:px-8 bg-neutral-light">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-[11px] tracking-widest font-accent text-accent uppercase font-bold bg-accent/10 px-4 py-1.5 rounded-full inline-block mb-3">
                      Visit Our Factory Showroom
                    </span>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                      Find Us in Hyderabad
                    </h2>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-brand-200/40 shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.640936998565!2d78.463397!3d17.504569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMwJzE2LjQiTiA3OMKwMjcnNDguMiJF!5e0!3m2!1sen!2sin!4v1"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="RelaxPro Hyderabad Factory Showroom"
                    />
                  </div>
                  <p className="text-center text-neutral-dark/50 text-xs mt-4 font-body">
                    Jeedimetla Industrial Area, Phase 3, Near Prasad Labs, Hyderabad — Open 10 AM to 9 PM Daily
                  </p>
                </div>
              </section>

              {/* ===== WHY CHOOSE US + STATS ===== */}
              <WhyChooseUs />

              <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 fade-up">
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-widest font-accent text-accent uppercase bg-accent/10 px-4 py-1.5 rounded-full font-bold">
                    Trust & Honest Feedback
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 text-primary leading-tight">
                    What Our Customers Say
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="text-2xl font-bold font-heading text-primary">4.9</span>
                    <span className="text-accent text-lg">/ 5 ★</span>
                    <span className="text-neutral-dark/40 text-sm font-body ml-1">from 2,400+ reviews</span>
                  </div>
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {TESTIMONIALS.map((t, idx) => (
                    <div
                      key={t.id}
                      className="bg-white p-6 rounded-2xl border border-brand-200/40 shadow-sm flex flex-col justify-between card-hover fade-up"
                      style={{ transitionDelay: `${idx * 0.08}s` }}
                    >
                      <div>
                        <span className="text-4xl font-heading text-accent/20 leading-none block mb-2">&ldquo;</span>
                        <div className="flex items-center gap-0.5 text-accent mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-dark/70 leading-relaxed italic font-body">
                          &ldquo;{t.comment}&rdquo;
                        </p>
                      </div>
                      <div className="border-t border-brand-200/30 pt-3 mt-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-heading font-bold text-sm shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-heading font-bold text-xs text-primary block">{t.name}</span>
                          <span className="text-[10px] text-neutral-dark/40 block font-body">
                            {t.city} • <span className="text-success font-semibold">✓ Verified</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden testimonial-carousel">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-2xl border border-brand-200/40 shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-3xl font-heading text-accent/20 leading-none block mb-2">&ldquo;</span>
                        <div className="flex items-center gap-0.5 text-accent mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-dark/70 leading-relaxed italic font-body">
                          &ldquo;{t.comment}&rdquo;
                        </p>
                      </div>
                      <div className="border-t border-brand-200/30 pt-3 mt-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-heading font-bold text-sm shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-heading font-bold text-xs text-primary block">{t.name}</span>
                          <span className="text-[10px] text-neutral-dark/40 block font-body">
                            {t.city} • <span className="text-success font-semibold">✓ Verified</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="locations" className="bg-zinc-100 border-t border-zinc-200 py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="max-w-2xl mb-12">
                    <span className="text-[10px] tracking-wider font-mono text-brand-600 uppercase font-bold">EXPERIENCE BEFORE BUYING</span>
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-brand-950 mt-1">Our Showrooms and Kerala Factory Outlets</h2>
                    <p className="text-gray-500 text-xs mt-1">Walk in, test firmness profiles, lay down, and speak with Suresh\'s trained team directly at the locations below.</p>
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
                          href={`https://wa.me/918686624494?text=${encodeURIComponent(`Hello, I would like to visit the RelaxPro ${loc.city} Experience Showroom. Can you please guide me on directions?`)}`}
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

              <section className="py-20 bg-white border-t border-zinc-200/50">
                <SleepFAQs />
              </section>

              <section className="py-20 bg-linear-to-b from-zinc-150 to-brand-50/50 px-4">
                <ConsultationForm />
              </section>
            </motion.div>
          } />

          {/* CATALOG ROUTE */}
          <Route path="/catalog" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Our Natural Latex & Orthopedic Mattresses | RelaxPro"
                description="Browse India's finest chemical-free mattresses. Premium 7-zone latex, heavy rebonded ortho systems, and ventilated sleep tech."
              />
              <ProductList 
                onAddToCartDirect={handleAddToCartDirect} 
                onNavigateToPdp={handleNavigateToPdp}
                onNavigate={handlePageNavigation}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
              />
            </motion.div>
          } />

          {/* DYNAMIC PRODUCT ROUTE */}
          <Route path="/mattresses/:slug" element={<PdpRouteWrapper onAddToCartDirect={handleAddToCartDirect} onNavigate={handlePageNavigation} />} />

          {/* BUILDER ROUTE */}
          <Route path="/builder" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Custom Mattress Builder - Design Your Perfect Sleep | RelaxPro"
                description="Personalize your GOLS natural latex mattress layer-by-layer. Choose GOTS bamboo cover, composite layers, custom size."
              />
              <MattressBuilder 
                onAddToCart={(item) => saveCart([...cart, item])} 
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          } />

          {/* ABOUT ROUTE */}
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="About RelaxPro | Pure Natural Latex Mattress Manufacturer"
                description="Pioneering GOLS chemical-free natural organic latex mattresses in Andhra Pradesh, Telangana and Karnataka. Factory direct with zero markups."
              />
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
          } />

          {/* COMPARE ROUTE */}
          <Route path="/compare" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Compare Mattresses | RelaxPro Premium Mattresses"
                description="Compare dimensions, layers, comfort levels, and prices of RelaxPro natural latex mattresses."
              />
              <CompareTable 
                onAddToCartDirect={handleAddToCartDirect}
                onNavigateToPdp={handleNavigateToPdp}
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          } />

          {/* SCIENCE ROUTE */}
          <Route path="/science" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Sleep Science & Orthopedic Spine Support | RelaxPro Education"
                description="Understand standard back alignment, the benefits of pincore ventilated natural latex, and how sleep ergonomics can cure chronic spine pain."
              />
              <SleepScience />
            </motion.div>
          } />

          {/* LOCATIONS ROUTE */}
          <Route path="/locations" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="RelaxPro Experience Stores - Hyderabad, Rajahmundry, Bangalore"
                description="Visit our experience showrooms to test 7-zone organic latex & firm ortho mattresses. Get direct factory pricing, maps & directions."
              />
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
                            window.open(`https://wa.me/918686624494?text=${encodeURIComponent(`Hi Suresh, I would like directions, phone triggers and appointment schedule for the RelaxPro ${loc.city} Mattress Outlet.`)}`, '_blank');
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
          } />

          {/* CONTACT ROUTE */}
          <Route path="/contact" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Contact Suresh & Get Orthopedic Sleep Advice | RelaxPro"
                description="Request a free diagnostic sleep consultation callback. Suresh will review your orthopedic concerns and customize the perfect mattress configuration."
              />
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
          } />

          {/* CART ROUTE */}
          <Route path="/cart" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SEO 
                title="Shopping Cart | RelaxPro Premium Mattresses"
                description="Review items in your shopping cart. Free metropolitan delivery and cash on delivery unrolling verified."
              />
              <CartPage 
                cart={cart}
                onUpdateQty={handleUpdateCartQty}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onCheckoutSuccess={handleCheckoutSuccess}
                onNavigate={handlePageNavigation}
              />
            </motion.div>
          } />

          {/* SUCCESS ROUTE */}
          <Route path="/success" element={
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto px-4 md:px-6 py-20 text-center space-y-8 text-zinc-950 relative"
            >
              <SEO 
                title="Order Success | RelaxPro Premium Mattresses"
                description="Thank you for ordering with RelaxPro. Your order is received and will be verified via WhatsApp shortly."
              />
              {orderReceipt && (
                <>
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
                      We\'ll confirm on WhatsApp within 1 hour.
                    </p>
                  </div>

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
                          <PriceText>₹{orderReceipt.grandTotal.toLocaleString('en-IN')}</PriceText>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
                      *A delivery coordinator from Jeedimetla Factory will call inside 12 hours. Pay COD via cash or UPI.
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => {
                        const orderStrObj = orderReceipt.cart.map((item: any) => `- ${item.name} [Size: ${item.size} x ${item.quantity}]`).join('%0A');
                        const text = `Hello Suresh! I have completed order booking ${orderReceipt.orderId} on the website. Final Amount: ₹${orderReceipt.grandTotal.toLocaleString('en-IN')}. items:%0A${orderStrObj}%0A%0AConisgnee Details: Name: ${orderReceipt.name}, phone: ${orderReceipt.phone}, address: ${orderReceipt.address}. Please verify and dispatch!`;
                        window.open(`https://wa.me/918686624494?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl py-3 text-xs font-semibold uppercase tracking-wider font-display flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/15 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" /> Instantly Submit Order to Suresh on WhatsApp
                    </button>
                    
                    <button
                      onClick={() => {
                        setOrderReceipt(null);
                        navigate('/catalog');
                      }}
                      className="w-full border border-zinc-200 bg-white hover:bg-zinc-50 rounded-xl py-3 text-xs text-brand-950 font-semibold font-display uppercase tracking-wider cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </motion.div>
            } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Universal footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Pulsing floating WhatsApp FAB helper */}
      <WhatsAppFAB />
    </div>
  );
}

// Wrapper to parse slug parameters for PDP dynamically
interface PdpRouteWrapperProps {
  onAddToCartDirect: (
    product: Product,
    size: MattressSize,
    includeAccessories: boolean,
    fabricOption?: '300GSM' | '450GSM'
  ) => void;
  onNavigate: (page: string) => void;
}

function PdpRouteWrapper({ onAddToCartDirect, onNavigate }: PdpRouteWrapperProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <SEO 
          title="Product Not Found | RelaxPro Premium Mattresses"
          description="The requested mattress model could not be found."
        />
        <h2 className="text-2xl font-display text-brand-950">Mattress Not Found</h2>
        <p className="text-xs text-stone-500">We couldn't find a mattress matching that name. Let's find your perfect model in the catalog.</p>
        <button 
          onClick={() => navigate('/catalog')}
          className="bg-brand-950 hover:bg-brand-800 text-white rounded-xl py-3 px-6 text-xs uppercase tracking-wider font-semibold font-display cursor-pointer"
        >
          View All Models
        </button>
      </div>
    );
  }

  // Schema for Product offer
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.keyBenefit,
    "brand": {
      "@type": "Brand",
      "name": "RelaxPro"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.pricingModel === 'with_without_accessories' 
        ? product.pricing.withoutAccessories?.king 
        : product.pricing.fabric300Gsm?.king,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "url": `https://remix-relaxpro-matress.vercel.app/mattresses/${product.slug}`
    }
  };

  return (
    <>
      <SEO 
        title={product.metaTitle}
        description={product.metaDescription}
        ogImage={product.image}
        schema={productSchema}
      />
      <ProductDetail 
        product={product} 
        onAddToCartDirect={onAddToCartDirect} 
        onNavigateBack={() => navigate('/catalog')}
        onNavigate={onNavigate}
      />
    </>
  );
}

// Router Entry wrapper
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
