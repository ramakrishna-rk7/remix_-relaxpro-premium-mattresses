import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Check, Phone, Clipboard, Send, UserCheck, AlertCircle } from 'lucide-react';
import BlurFade from '../ui/BlurFade';
import { submitLead } from '../../utils/googleSheets';

export default function ConsultationForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [painLevel, setPainLevel] = useState('none');
  const [customNotes, setCustomNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please specify your name so we can address you correctly.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setValidationError('Please specify a valid 10-digit mobile number for Suresh to call back.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Call Google Sheets integration
      await submitLead({
        orderId: "",
        name,
        phone,
        email: "",
        city: "Hyderabad / Online",
        address: "",
        pincode: "",
        contactTime: "Immediate Callback Request",
        product: `Orthopedic Consultation (${painLevel})`,
        size: "",
        price: "0",
        notes: customNotes || `Back concerns flagged level: ${painLevel}`,
        source: "Consultation Form"
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setValidationError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLaunchWhatsApp = () => {
    const complaintText = painLevel !== 'none' ? `My back pain level is ${painLevel}/5. Notes: ${customNotes}` : '';
    const text = `Hello Suresh, I am requesting an orthopedic mattress consultation. Name: ${name}. Phone: ${phone}. ${complaintText}`;
    window.location.href = `https://wa.me/918977024494?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="consultation-section" className="bg-white rounded-3xl border border-zinc-200/50 shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      {!submitted ? (
        <BlurFade duration={0.65}>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3.5 border-b border-zinc-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
              <Clipboard className="w-5 h-5 text-brand-650" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-brand-950 text-md leading-none">Diagnostic Consultation Form</h3>
              <p className="text-xs text-gray-400 mt-1">Direct callback request coordinate for personal recommendation.</p>
            </div>
          </div>

          {validationError && (
            <div className="bg-rose-50 text-rose-800 text-xs p-3.5 rounded-xl border border-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Srinivas Rao"
                className="w-full px-3.5 py-2.5 rounded-md border border-brand-200 text-xs focus:outline-hidden focus:border-brand-500 bg-brand-50/20 text-brand-950 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Mobile Number (WhatsApp Callback)</label>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 8977024494"
                className="w-full px-3.5 py-2.5 rounded-md border border-brand-200 text-xs focus:outline-hidden focus:border-brand-500 bg-brand-50/20 text-brand-950 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1.5 font-bold text-zinc-700">Current Back Comfort Concerns?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: 'none', label: 'Healthy/None' },
                  { value: 'mild', label: 'Mild Neck pain' },
                  { value: 'lumbar', label: 'Lower Back Soreness' },
                  { value: 'spine', label: 'Spine/Cervical Spine' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPainLevel(item.value)}
                    className={`p-3 rounded-md border font-sans font-medium text-[10px] text-center uppercase tracking-wider capitalize cursor-pointer transition-all ${
                      painLevel === item.value
                        ? 'border-brand-950 bg-brand-950 text-white font-bold'
                        : 'border-brand-200 hover:border-brand-500 hover:bg-brand-100 text-zinc-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1">Anatomical Notes or Doctors Advice (Optional)</label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={3}
                placeholder="Write specific details (e.g. Doc recommended GOLS hard mattress, sleep on side...)"
                className="w-full px-3.5 py-2.5 rounded-md border border-brand-200 text-xs focus:outline-hidden focus:border-brand-500 bg-brand-50/20 resize-none text-brand-950 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-950 hover:bg-zinc-800 disabled:bg-zinc-300 active:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-full transition-all group cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Saving details securely...</span>
            ) : (
              <>Submit <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>
            )}
          </button>
        </form>
        </BlurFade>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
            <UserCheck className="w-6 h-6" />
          </div>
          
          <div>
            <h3 className="font-display font-bold text-xl text-brand-950">Diagnostic Callback Booked!</h3>
            <p className="text-gray-500 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
              Hey <strong className="text-zinc-900">{name}</strong>, Suresh has received your clinical diagnostic notes. He will reach out directly on <strong className="text-zinc-900">{phone}</strong> within 12 working hours.
            </p>
          </div>

          <div className="bg-brand-100 p-4 rounded-xl border border-brand-200 max-w-md mx-auto flex flex-col items-center justify-center text-center font-sans text-xs">
            <strong className="font-semibold text-brand-950 block">Want immediate advice?</strong>
            <p className="text-zinc-600 mt-1 mb-3">
              You can also reach out to us directly on WhatsApp for a faster response:
            </p>
            <button
              onClick={handleLaunchWhatsApp}
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-display font-semibold text-xs py-2.5 px-6 rounded-full cursor-pointer transition-colors shadow-sm shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" /> Start WhatsApp Chat
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
