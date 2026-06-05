import React from 'react';
import { Mail, Phone, MapPin, Shield, RefreshCcw, Truck, Sparkles, Facebook, Instagram, Youtube } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import RelaxProLogo from '../ui/RelaxProLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onNavigateToPdp: (slug: string) => void;
}

export default function Footer({ onNavigate, onNavigateToPdp }: FooterProps) {
  // Group products for pretty column listing
  const luxuryModels = PRODUCTS.filter(p => p.tier === 'luxury');
  const premiumModels = PRODUCTS.filter(p => p.tier === 'premium');
  const comfortModels = PRODUCTS.filter(p => p.tier === 'comfort');

  return (
    <footer className="bg-brand-950 text-stone-300 pt-16 pb-8 border-t-2 border-brand-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 border-b border-white/10 pb-12 mb-12">
        {/* Brand identity col */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col items-start gap-1">
            <RelaxProLogo variant="footer" inverse={true} className="!items-start" />
            <span className="text-[8px] font-mono tracking-[0.22em] text-brand-500 block uppercase font-black mt-2">
              KERALA ORGANIC LATEX LABS
            </span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
            Leading Latex foam mattress manufacturer in Andhra Pradesh and Telangana. By harvesting 100% natural biodegradable Dunlop rubber sap in Kerala, Suresh custom formats medical-grade latex mattresses without high distributor markups.
          </p>

          {/* Social guarantees flags */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 text-stone-200">
              <Shield className="w-4 h-4 text-brand-500 shrink-0" />
              <span>10-Year Direct Factory Replacement Warranty</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-200">
              <RefreshCcw className="w-4 h-4 text-brand-500 shrink-0" />
              <span>No Showroom Commissions • Direct From Kerala Unit</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-200">
              <Truck className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Free Doorstep Shipping To Major Metropolitan Hubs</span>
            </div>
          </div>
        </div>

        {/* Directory lists */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-4 md:gap-6">
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Luxury Latex</h4>
            <ul className="space-y-2 text-xs">
              {luxuryModels.map(p => (
                <li key={p.slug}>
                  <button
                    onClick={() => onNavigateToPdp(p.slug)}
                    className="hover:text-white transition-colors underline cursor-pointer text-left block"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Premium Ortho</h4>
            <ul className="space-y-2 text-xs">
              {premiumModels.map(p => (
                <li key={p.slug}>
                  <button
                    onClick={() => onNavigateToPdp(p.slug)}
                    className="hover:text-white transition-colors underline cursor-pointer text-left block"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-4">Comfort Foam</h4>
            <ul className="space-y-2 text-xs">
              {comfortModels.map(p => (
                <li key={p.slug}>
                  <button
                    onClick={() => onNavigateToPdp(p.slug)}
                    className="hover:text-white transition-colors underline cursor-pointer text-left block"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact info / Factory outlets */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Connect Direct</h4>
          <div className="space-y-3.5 text-xs">
            <div className="flex gap-2.5 items-start">
              <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-stone-500 block uppercase">CUSTOMER HELPLINE</span>
                <a href="tel:+918977024494" className="text-white hover:underline block font-semibold">
                  +91 89770 24494
                </a>
                <a href="tel:+917207424494" className="text-white hover:underline block">
                  +91 72074 24494
                </a>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <Mail className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-stone-500 block uppercase">SUPPORT MAIL</span>
                <a href="mailto:relaxpro2022@gmail.com" className="text-white hover:underline block">
                  relaxpro2022@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-stone-500 block uppercase">HYDERABAD FACTORY UNIT</span>
                <p className="text-stone-400">Jeedimetla Ind. Area Phase 3, Hyderabad, Telangana</p>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-[10px] text-stone-500 block uppercase mb-2">SOCIAL CONNECT</span>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/p/Relaxpro-Mattresses-100069671211998/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/relaxpro__mattresses/?hl=en" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.youtube.com/@sureshmattressmanufacturer3784" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <div>
          <p>© {new Date().getFullYear()} RelaxPro Premium Mattresses Pvt Ltd. All rights reserved.</p>
          <p className="mt-1 text-[10px]">All Kerala harvested latex is GOLS Certified, and our fabrics hold Oeko-Tex Standard-100 certification.</p>
        </div>
        <div className="flex gap-6">
          <button onClick={() => onNavigate('science')} className="hover:text-stone-300 transition-colors uppercase tracking-widest font-mono text-[10px] cursor-pointer">
            Sleep Science Education
          </button>
          <button onClick={() => onNavigate('locations')} className="hover:text-stone-300 transition-colors uppercase tracking-widest font-mono text-[10px] cursor-pointer">
            Showrooms Map
          </button>
        </div>
      </div>
    </footer>
  );
}
