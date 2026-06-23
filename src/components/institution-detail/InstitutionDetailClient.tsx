'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import type { Institution } from '@/types/institution';
import { InstitutionProvider } from '@/context/InstitutionContext';
import HeroSection from '@/components/institution-detail/common/HeroSection';
import QuickFactsSection from '@/components/institution-detail/common/QuickFactsSection';
import SimilarInstitutionsSection from '@/components/institution-detail/common/SimilarInstitutionsSection';
import DynamicSectionRenderer from '@/components/institution-detail/DynamicSectionRenderer';

interface InstitutionDetailClientProps {
  institution: Institution;
}

interface CounsellingFormState {
  name: string;
  phone: string;
  courseInterest: string;
  message: string;
}

const INITIAL_FORM: CounsellingFormState = {
  name: '',
  phone: '',
  courseInterest: '',
  message: '',
};

function CounsellingModal({
  institution,
  onClose,
}: {
  institution: Institution;
  onClose: () => void;
}) {
  const [form, setForm] = useState<CounsellingFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<CounsellingFormState>>({});

  const courses = institution.sections.courses ?? [];

  function validate(): boolean {
    const next: Partial<CounsellingFormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.phone.trim()) {
      next.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      next.phone = 'Enter a valid 10-digit phone number';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    const key = `counselling_shown_${institution.slug}`;
    sessionStorage.setItem(key, 'true');
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-navy-800 bg-[#0f2044] px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Get Expert Guidance</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <p className="text-lg font-semibold text-gray-800">Thank you!</p>
              <p className="text-gray-500">We&apos;ll call you within 24 hours.</p>
              <button
                onClick={onClose}
                className="mt-2 rounded-lg bg-[#0f2044] px-6 py-2 text-sm font-medium text-white hover:bg-[#1a3566] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0f2044] focus:ring-1 focus:ring-[#0f2044]"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0f2044] focus:ring-1 focus:ring-[#0f2044]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Course Interest */}
              {courses.length > 0 && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Course Interest
                  </label>
                  <select
                    value={form.courseInterest}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, courseInterest: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0f2044] focus:ring-1 focus:ring-[#0f2044] bg-white"
                  >
                    <option value="">Select a course (optional)</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Any specific questions? (optional)"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0f2044] focus:ring-1 focus:ring-[#0f2044]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#0f2044] py-2.5 text-sm font-semibold text-white hover:bg-[#1a3566] transition-colors"
              >
                Get Free Counselling
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InstitutionDetailClient({ institution }: InstitutionDetailClientProps) {
  const [counsellingOpen, setCounsellingOpen] = useState(false);

  useEffect(() => {
    const key = `counselling_shown_${institution.slug}`;
    if (sessionStorage.getItem(key)) return;
    const timer = setTimeout(() => {
      setCounsellingOpen(true);
      sessionStorage.setItem(key, 'true');
    }, 1500);
    return () => clearTimeout(timer);
  }, [institution.slug]);

  return (
    <InstitutionProvider institution={institution}>
      <div className="min-h-screen bg-gray-50">
        <HeroSection onEnquire={() => setCounsellingOpen(true)} />
        <QuickFactsSection />

        <div className="mx-auto max-w-7xl px-4 py-8">
          <DynamicSectionRenderer />
          <SimilarInstitutionsSection />
        </div>

        {counsellingOpen && (
          <CounsellingModal
            institution={institution}
            onClose={() => setCounsellingOpen(false)}
          />
        )}
      </div>
    </InstitutionProvider>
  );
}
