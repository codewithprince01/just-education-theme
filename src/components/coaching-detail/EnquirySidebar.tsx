'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';

interface FormState {
  name: string;
  phone: string;
  course: string;
  mode: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  course?: string;
}

const INITIAL_FORM: FormState = { name: '', phone: '', course: '', mode: '', message: '' };

function EnquiryForm({ onClose }: { onClose?: () => void }) {
  const { courses } = useCoachingData();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!form.course) newErrors.course = 'Please select a course';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <ShieldCheck size={48} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-[#0a2540] text-lg mb-2">Request Received!</h3>
        <p className="text-gray-500 text-sm">Our counsellor will call you within 24 hours.</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 text-blue-600 text-sm font-semibold hover:underline"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0a2540] text-lg">Enquire Now</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Name */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
        <input
          type="tel"
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Course select */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Interested Course *</label>
        <select
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
            errors.course ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        >
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
      </div>

      {/* Preferred mode */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Mode</label>
        <select
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
        >
          <option value="">Select mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Message */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-700 mb-1">Message (optional)</label>
        <textarea
          rows={3}
          placeholder="Any specific requirements or questions..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      </div>

      {/* Buttons */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mb-2.5"
      >
        Request Callback
      </button>
      <button
        type="button"
        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-colors"
      >
        Book Free Demo
      </button>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-500">
        <ShieldCheck size={14} className="text-green-500" />
        100% Free Consultation — No Spam
      </div>
    </form>
  );
}

interface EnquirySidebarProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  hideSidebar?: boolean;
}

export default function EnquirySidebar({ externalOpen = false, onExternalClose, hideSidebar = false }: EnquirySidebarProps) {
  const { courses } = useCoachingData();
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  /* Close body scroll when the counselling modal is open */
  useEffect(() => {
    if (externalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [externalOpen]);

  return (
    <>
      {/* Desktop sticky sidebar */}
      {!hideSidebar && (
        <div className="sticky top-24 hidden lg:block">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5">
            <h3 className="font-bold text-[#0a2540] text-lg mb-4 pb-3 border-b border-gray-100">
              Get Free Counselling
            </h3>
            <EnquiryForm />
          </div>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 flex gap-3 lg:hidden">
        <button
          onClick={() => setMobileModalOpen(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          Enquire Now
        </button>
        <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-3 rounded-xl transition-colors">
          Book Free Demo
        </button>
      </div>

      {/* Mobile bottom-sheet modal (triggered from mobile bottom bar) */}
      {mobileModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end lg:hidden"
          onClick={() => setMobileModalOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <EnquiryForm onClose={() => setMobileModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Centered counselling modal — auto-open on load + hero button (all screen sizes) */}
      {externalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onExternalClose}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative header band */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#126094] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">Free Counselling</p>
                  <h2 className="text-xl font-extrabold text-white leading-tight">
                    Get Expert Guidance
                  </h2>
                  <p className="text-blue-200/80 text-sm mt-1">
                    Talk to our counsellors — completely free, no obligation.
                  </p>
                </div>
                <button
                  onClick={onExternalClose}
                  className="shrink-0 mt-0.5 text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form body */}
            <div className="p-6">
              <EnquiryForm onClose={onExternalClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
