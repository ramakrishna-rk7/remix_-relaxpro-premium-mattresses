import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../../types';
import { submitLead } from '../../utils/googleSheets';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (orderId: string, summary: any) => void;
  onNavigate: (page: string) => void;
}

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
  onNavigate
}: CartPageProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [zip, setZip] = useState('');
  const [contactTime, setContactTime] = useState('');
  const [notes, setNotes] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const grandTotal = subtotal;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!phone.trim() || phone.length < 10) errs.phone = 'Valid primary contact number is required.';
    if (!address.trim()) errs.address = 'Delivery address is required.';
    if (!zip.trim() || zip.length !== 6) errs.zip = '6-digit postal pincode is required.';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const mockOrderId = `RP-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const summary = {
        orderId: mockOrderId,
        name,
        phone,
        email,
        address,
        city,
        zip,
        contactTime,
        notes,
        subtotal,
        discountAmount: 0,
        grandTotal,
        cart: [...cart]
      };

      const productNames = cart.map((item) => `${item.name} (Qty: ${item.quantity})`).join(' + ');
      const productSizes = cart.map((item) => item.size).join(', ');
      const accessoriesList = cart.map((item) => item.includeAccessories ? 'Yes' : 'No').join(', ');

      // Call Google Sheets integration integration
      await submitLead({
        orderId: mockOrderId,
        name,
        phone,
        email,
        city,
        address,
        pincode: zip,
        contactTime: contactTime || 'Not specified',
        product: productNames,
        size: productSizes,
        price: `₹${grandTotal.toLocaleString('en-IN')}`,
        notes: `Total: ₹${subtotal.toLocaleString('en-IN')}. Delivery Notes: ${notes || 'None'}. Accessories: ${accessoriesList}`,
        source: "Website Order Checkout"
      });

      onCheckoutSuccess(mockOrderId, summary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -15 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center"
      >
        <div className="w-16 h-16 bg-brand-100 text-brand-950 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-amber-800" />
        </div>
        <h2 className="font-display font-medium text-3xl text-brand-950">Your Cart is Currently Empty</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed text-sm font-sans">
          Before initiating your custom order, customize a mattress layer by layer or look through our pre-built models.
        </p>
        <button
          onClick={() => onNavigate('catalog')}
          className="mt-6 bg-brand-950 hover:bg-zinc-850 text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl cursor-pointer shadow-md transition-all"
        >
          View Mattress Collections
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 md:px-6 py-12"
    >
      {/* Dynamic Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-brand-950">
          Almost there.
        </h1>
        <p className="text-amber-800 mt-2 text-sm font-sans font-medium flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" /> We'll confirm your order on WhatsApp within 1 hour.
        </p>
      </div>

      <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Your details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/80 shadow-xs space-y-6">
            <h3 className="font-display font-semibold text-lg text-brand-950 tracking-tight pb-3 border-b border-zinc-100">
              Your details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Srinivas Rao"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none"
                />
                {errors.name && <span className="text-[10px] text-rose-500 font-mono block mt-1">{errors.name}</span>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none"
                />
                {errors.phone && <span className="text-[10px] text-rose-500 font-mono block mt-1">{errors.phone}</span>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. srinivas@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none"
                />
              </div>

              {/* Detailed Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Delivery address
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="House / flat, street, landmark"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none resize-none"
                />
                {errors.address && <span className="text-[10px] text-rose-500 font-mono block mt-1">{errors.address}</span>}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  City <span className="text-rose-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden cursor-pointer bg-zinc-50/50 focus:bg-white transition-all outline-none"
                >
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Rajahmundry">Rajahmundry</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Pincode (Zip) */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="6-digit pincode"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none"
                />
                {errors.zip && <span className="text-[10px] text-rose-500 font-mono block mt-1">{errors.zip}</span>}
              </div>

              {/* Preferred contact time */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Preferred contact time
                </label>
                <input
                  type="text"
                  value={contactTime}
                  onChange={(e) => setContactTime(e.target.value)}
                  placeholder="e.g. Weekdays after 6pm"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none"
                />
              </div>

              {/* Delivery notes */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Delivery notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Building, floor, lift access, time preference, etc."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 bg-zinc-50/50 focus:bg-white transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Your order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/80 shadow-xs space-y-6">
            <div className="flex md:items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-display font-semibold text-lg text-brand-950 tracking-tight">
                Your order
              </h3>
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-zinc-400 hover:text-rose-600 transition-colors underline cursor-pointer font-sans"
              >
                Clear items
              </button>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-zinc-100">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-sm text-brand-950 leading-tight">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                        {item.size} <span className="mx-1">•</span> Qty: {item.quantity}
                      </p>
                      
                      {item.includeAccessories && (
                        <p className="text-[9px] text-emerald-700 font-medium font-mono bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                          🎁 Access. bundle included
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-brand-950 block">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      
                      {/* Responsive adjustment controls inline */}
                      <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-md p-0.5 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-4 h-4 rounded text-zinc-500 hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-2 h-2" />
                        </button>
                        <span className="font-mono text-[9px] font-semibold text-zinc-700 px-0.5">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-4 h-4 rounded text-zinc-500 hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-2 h-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal & Free Delivery */}
            <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs font-sans text-zinc-650">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-brand-950">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-500">
                <span>Delivery</span>
                <span className="font-sans font-bold text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Free
                </span>
              </div>
            </div>

            {/* Total Balance */}
            <div className="pt-4 border-t border-zinc-100 flex justify-between items-baseline">
              <span className="text-zinc-900 font-display font-medium text-sm">Total</span>
              <span className="text-xl font-bold font-display text-brand-950 font-mono">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action buttons embedded in the order card */}
            <div className="pt-2">
              <button
                id="btn-place-order"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-950 hover:bg-zinc-800 disabled:bg-zinc-300 active:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>Place order · ₹{grandTotal.toLocaleString('en-IN')}</>
                )}
              </button>
              
              <p className="text-[10px] text-stone-500 text-center mt-3.5 leading-normal max-w-xs mx-auto">
                No payment now. We'll WhatsApp you to confirm and arrange payment.
              </p>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
