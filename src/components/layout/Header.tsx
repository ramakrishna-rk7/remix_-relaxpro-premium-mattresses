import React, { useState } from 'react';
import { Menu, X, ShoppingCart, MessageSquare, Shield, Award, MapPin } from 'lucide-react';
import RelaxProLogo from '../ui/RelaxProLogo';

interface HeaderProps {
  activePage: string;
  cartCount: number;
  onNavigate: (page: string) => void;
}

export default function Header({ activePage, cartCount, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Our Models' },
    { id: 'builder', label: 'Customize Model' },
    { id: 'science', label: 'Sleep Science' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-50/95 backdrop-blur-md border-b border-brand-200">
      {/* Top Banner Message */}
      <div className="bg-brand-100 text-brand-950 text-[10px] md:text-[11px] py-1.5 px-2 md:px-4 text-center font-mono tracking-wider flex-col md:flex-row flex items-center justify-center gap-1 md:gap-4 border-b border-brand-200">
        <span className="font-semibold text-brand-800">Telangana and AP 1st pure latex mattress company • 100% pure Natural latex</span>
        <span className="hidden md:inline-block text-brand-600">•</span>
        <span className="font-semibold text-zinc-600">📞 8977024494, 9642024494</span>
        <span className="hidden md:inline-block text-brand-600">•</span>
        <span className="text-zinc-500 font-bold">📍Hyderabad 📍Rajahmundry 📍Bangalore</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo Identity */}
        <div
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center cursor-pointer group"
        >
          <RelaxProLogo variant="compact" className="scale-85 md:scale-100 origin-left" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider font-display">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`hover:text-brand-600 transition-colors py-1 relative cursor-pointer ${
                activePage === item.id ? 'text-brand-950 border-b-2 border-brand-950' : 'text-zinc-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Utility button Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="text-zinc-600 hover:text-brand-950 text-xs font-semibold flex items-center gap-1 cursor-pointer font-display uppercase tracking-widest"
          >
            <MessageSquare className="w-4 h-4 text-brand-500" />
            Contact
          </button>

          {/* Cart triggers */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative bg-brand-950 hover:bg-brand-800 active:bg-black text-white p-3 rounded-xl transition-all cursor-pointer shadow-sm shadow-brand-950/10"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Cart mobile trigger */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative bg-zinc-100 hover:bg-zinc-200 text-brand-950 p-2.5 rounded-xl transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-900 focus:outline-hidden p-1 bg-zinc-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu expanded */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-200 py-6 px-4 space-y-4 shadow-xl divide-y divide-zinc-100">
          <div className="space-y-2.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left font-display text-sm font-semibold py-2 block uppercase tracking-wider ${
                  activePage === item.id ? 'text-brand-950 pl-2 border-l-2 border-brand-950' : 'text-zinc-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-brand-100 hover:bg-brand-200 text-brand-950 rounded-lg py-3 text-xs font-semibold flex items-center justify-center gap-1 uppercase tracking-wider font-display cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-brand-600" />
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
