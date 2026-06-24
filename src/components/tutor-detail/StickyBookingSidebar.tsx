'use client';

import { useState } from 'react';
import { X, ShieldCheck, Star, Clock, CalendarCheck } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';

interface FormState {
  name: string;
  phone: string;
  subject: string;
  mode: string;
  time: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  subject?: string;
}

const INITIAL: FormState = { name: '', phone: '', subject: '', mode: '', time: '' };

function EnquiryForm({ onClose }: { onClose?: () => void }) {
  const { subjectsTaught, teachingModes } = useTutor();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit number';
    if (!form.subject) e.subject = 'Please select a subject';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <ShieldCheck size={48} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-[#0a2540] text-lg mb-2">Request Sent!</h3>
        <p className="text-gray-500 text-sm">The tutor will reach out to you shortly.</p>
        {onClose && (
          <button onClick={onClose} className="mt-4 text-blue-600 text-sm font-semibold hover:underline">Close</button>
        )}
      </div>
    );
  }

  const inputCls = (err?: string) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0a2540] text-lg">Quick Enquiry</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
      )}

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
        <input type="text" placeholder="Your full name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls(errors.name)} />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
        <input type="tel" placeholder="10-digit mobile number" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} className={inputCls(errors.phone)} />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Subject Interested *</label>
        <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={`${inputCls(errors.subject)} bg-white`}>
          <option value="">Select a subject</option>
          {subjectsTaught.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Mode</label>
        <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
          <option value="">Select mode</option>
          {teachingModes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Time</label>
        <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
          <option value="">Select time</option>
          <option value="Morning">Morning (8 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 - 4 PM)</option>
          <option value="Evening">Evening (4 - 8 PM)</option>
          <option value="Night">Night (8 - 10 PM)</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mb-2.5">
        Book Trial Class
      </button>
      <button type="button" className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-colors">
        Send Enquiry
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-500">
        <ShieldCheck size={14} className="text-green-500" /> Free trial · No obligation
      </div>
    </form>
  );
}

export default function StickyBookingSidebar() {
  const { hourlyFee, currency, rating, reviewCount, availabilityStatus, responseTime } = useTutor();
  const [mobileOpen, setMobileOpen] = useState(false);

  const statusLabel = availabilityStatus === 'available' ? 'Available Now' : availabilityStatus === 'busy' ? 'Limited Slots' : 'Offline';

  return (
    <>
      {/* Desktop sticky sidebar */}
      <div className="sticky top-24 hidden lg:block">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
          {/* Price header */}
          <div className="bg-gradient-to-r from-[#0a2540] to-[#13345c] p-5 text-white">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wide">Starting from</p>
                <p className="text-2xl font-extrabold">{currency}{hourlyFee}<span className="text-sm font-normal text-white/70">/hour</span></p>
              </div>
              <span className="flex items-center gap-1 text-sm">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold">{rating}</span>
                <span className="text-white/60 text-xs">({reviewCount})</span>
              </span>
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-white/80">
              <span className="flex items-center gap-1"><CalendarCheck size={13} className="text-green-400" />{statusLabel}</span>
              <span className="flex items-center gap-1"><Clock size={13} className="text-cyan-300" />{responseTime}</span>
            </div>
          </div>
          <div className="p-5">
            <EnquiryForm />
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
        <div className="shrink-0">
          <p className="text-[10px] text-gray-400 font-medium">From</p>
          <p className="text-base font-extrabold text-[#0a2540] leading-none">{currency}{hourlyFee}<span className="text-[11px] font-normal text-gray-400">/hr</span></p>
        </div>
        <button onClick={() => setMobileOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors">
          Book Trial Class
        </button>
      </div>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="w-full bg-white rounded-t-3xl p-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <EnquiryForm onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
