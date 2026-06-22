"use client";

import { useState } from 'react';
import { Send, CheckCircle2, User, Phone } from 'lucide-react';
import { enquiryLanguages, enquiryModes } from '@/data/languageCenterData';

interface EnquiryFormProps {
  /** Pre-select a language (e.g. when opened from a language card). */
  defaultLanguage?: string;
  compact?: boolean;
}

const inputBase =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 font-medium transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15';

export default function EnquiryForm({ defaultLanguage = '', compact = false }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    language: defaultLanguage,
    mode: '',
    message: '',
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only demo — no backend integration.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center je-animate-pop">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={34} />
        </div>
        <h4 className="text-lg font-extrabold text-[#0a2540]">Enquiry Sent!</h4>
        <p className="max-w-xs text-sm text-gray-500">
          Thank you, {form.name || 'there'}. Our counselor will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', phone: '', language: defaultLanguage, mode: '', message: '' });
          }}
          className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3.5 ${compact ? '' : ''}`}>
      <div className="relative">
        <User size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          required
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={update('name')}
          className={`${inputBase} pl-9`}
          aria-label="Your name"
        />
      </div>

      <div className="relative">
        <Phone size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          required
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={update('phone')}
          className={`${inputBase} pl-9`}
          aria-label="Phone number"
        />
      </div>

      <select
        required
        value={form.language}
        onChange={update('language')}
        className={`${inputBase} ${form.language ? 'text-gray-700' : 'text-gray-400'}`}
        aria-label="Interested language"
      >
        <option value="" disabled>Interested Language</option>
        {enquiryLanguages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <select
        required
        value={form.mode}
        onChange={update('mode')}
        className={`${inputBase} ${form.mode ? 'text-gray-700' : 'text-gray-400'}`}
        aria-label="Preferred mode"
      >
        <option value="" disabled>Preferred Mode</option>
        {enquiryModes.map((mode) => (
          <option key={mode} value={mode}>{mode}</option>
        ))}
      </select>

      <textarea
        rows={compact ? 2 : 3}
        placeholder="Message (optional)"
        value={form.message}
        onChange={update('message')}
        className={`${inputBase} resize-none`}
        aria-label="Message"
      />

      <button
        type="submit"
        className="group mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 active:scale-[0.98]"
      >
        Send Enquiry
        <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
      </button>

      <p className="text-center text-[11px] leading-relaxed text-gray-400">
        By submitting, you agree to be contacted by our team. We respect your privacy.
      </p>
    </form>
  );
}
