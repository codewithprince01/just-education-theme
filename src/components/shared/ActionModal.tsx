"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  X, User, Mail, Phone, BookOpen, MessageSquare,
  Download, CheckCircle2, Loader2, ChevronDown, ArrowRight,
  GraduationCap, FileText, Sparkles
} from 'lucide-react';

export type ActionModalMode = 'apply' | 'brochure';

export interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ActionModalMode;
  institutionName: string;
  institutionType?: string;
  courses?: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
}

const COURSE_OPTIONS_BY_TYPE: Record<string, string[]> = {
  UNIVERSITY: ['B.Tech', 'M.Tech', 'MBA', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'PhD', 'B.Com', 'M.Com'],
  COLLEGE:    ['B.A', 'B.Sc', 'B.Com', 'BBA', 'MBA', 'M.A', 'M.Sc', 'B.Ed', 'LLB', 'MA'],
  SCHOOL:     ['Nursery', 'Primary (1–5)', 'Middle (6–8)', 'Secondary (9–10)', 'Sr. Secondary (11–12)'],
  COACHING:   ['JEE Main', 'JEE Advanced', 'NEET UG', 'UPSC', 'CA Foundation', 'SSC CGL', 'Bank PO'],
  TRAINING:   ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Cloud Computing', 'Python'],
  TRAINING_CENTER: ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Cloud Computing'],
  LIBRARY:    ['Annual Membership', 'Student Membership', 'Corporate Membership'],
  DEFAULT:    ['General Inquiry', 'Course A', 'Course B', 'Course C'],
};

function getCourseOptions(institutionType: string, courses?: string[]): string[] {
  if (courses && courses.length > 0) return courses;
  return COURSE_OPTIONS_BY_TYPE[institutionType] || COURSE_OPTIONS_BY_TYPE.DEFAULT;
}

function validate(data: FormData, mode: ActionModalMode): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (min. 2 characters)';
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRe.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  const phoneRe = /^[6-9]\d{9}$/;
  if (!data.phone.trim() || !phoneRe.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number';
  }
  if (!data.course) {
    errors.course = mode === 'apply' ? 'Please select a program to apply for' : 'Please select a program';
  }
  return errors;
}

export default function ActionModal({
  isOpen,
  onClose,
  mode,
  institutionName,
  institutionType = 'DEFAULT',
  courses,
}: ActionModalProps) {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', course: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [courseOpen, setCourseOpen] = useState(false);
  const courseRef = useRef<HTMLDivElement>(null);

  const courseOptions = getCourseOptions(institutionType, courses);

  // Reset on open/mode change
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', phone: '', course: '', message: '' });
      setErrors({});
      setTouched({});
      setStatus('idle');
      setCourseOpen(false);
    }
  }, [isOpen, mode]);

  // Close course dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (courseRef.current && !courseRef.current.contains(e.target as Node)) {
        setCourseOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!isOpen) return null;

  const isApply = mode === 'apply';

  const handleChange = (field: keyof FormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next, mode));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors(validate(form, mode));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = { name: true, email: true, phone: true, course: true };
    setTouched(allTouched);
    const errs = validate(form, mode);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
  };

  // ─── Success Screen ────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm" onClick={onClose} />
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden border border-gray-100">
          {/* Confetti strip */}
          <div className={`h-2 w-full ${isApply ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500' : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500'}`} />
          <div className="p-10 flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${isApply ? 'bg-orange-50 border-4 border-orange-100' : 'bg-emerald-50 border-4 border-emerald-100'}`}>
              <CheckCircle2 size={38} className={isApply ? 'text-orange-500' : 'text-emerald-500'} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0a2540] mb-2">
              {isApply ? 'Application Submitted!' : 'Brochure on its Way!'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-1">
              {isApply
                ? `Your application to ${institutionName} has been received. Our admissions team will reach out to you at`
                : `The brochure for ${institutionName} will be sent to`}
            </p>
            <p className="font-bold text-[#0a2540] text-sm mb-6">{form.email}</p>

            {isApply && (
              <div className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-left mb-6">
                <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wider mb-2">Application Summary</p>
                <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                  <div className="flex justify-between"><span className="text-gray-400">Program</span><span className="font-bold">{form.course}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="font-bold">{form.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Mobile</span><span className="font-bold">{form.phone}</span></div>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all cursor-pointer ${isApply ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Input Helper ──────────────────────────────────────────────────────────
  const inputCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 ${
      touched[field] && errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-200 text-red-900 placeholder:text-red-300'
        : 'border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-100 text-gray-800 placeholder:text-gray-400 focus:bg-white'
    }`;

  // ─── Main Form ─────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden border border-gray-100 max-h-[94vh] flex flex-col">

        {/* Header */}
        <div className={`p-6 text-white shrink-0 relative overflow-hidden ${isApply ? 'bg-gradient-to-br from-[#0a2540] via-[#1a3f6f] to-[#1a5276]' : 'bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857]'}`}>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -left-6 w-28 h-28 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-2 px-2.5 py-1 rounded-full ${isApply ? 'bg-orange-400/20 text-orange-200' : 'bg-emerald-300/20 text-emerald-200'}`}>
                {isApply ? <GraduationCap size={11} /> : <FileText size={11} />}
                {isApply ? 'Admissions Portal' : 'Brochure Request'}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-snug">
                {isApply ? 'Apply Now' : 'Download Brochure'}
              </h2>
              <p className="text-white/60 text-xs mt-1 leading-relaxed line-clamp-2">
                {institutionName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer shrink-0 mt-1"
            >
              <X size={17} />
            </button>
          </div>

          {/* Info strip */}
          <div className={`mt-4 flex items-center gap-2 text-[11px] font-semibold rounded-xl px-3 py-2 ${isApply ? 'bg-white/10 text-white/80' : 'bg-white/10 text-white/80'}`}>
            <Sparkles size={12} className="shrink-0" />
            {isApply
              ? 'Fill in your details and our admissions team will contact you within 24 hours.'
              : 'Share your details to instantly receive the official brochure on your email.'}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`${inputCls('name')} pl-10`}
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="e.g. rahul@email.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`${inputCls('email')} pl-10`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <div className="relative flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm font-bold text-gray-500 select-none">
                  +91
                </span>
                <div className="relative flex-1">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                    onBlur={() => handleBlur('phone')}
                    className={`${inputCls('phone')} pl-10 rounded-l-none`}
                  />
                </div>
              </div>
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Course/Program - Custom Select */}
            <div ref={courseRef}>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                {isApply ? 'Program of Interest' : 'Interested In'} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                <button
                  type="button"
                  onClick={() => setCourseOpen(!courseOpen)}
                  className={`w-full px-4 py-3 pl-10 rounded-xl border text-sm font-medium transition-all outline-none text-left flex items-center justify-between ${
                    touched.course && errors.course
                      ? 'border-red-300 bg-red-50 text-red-400'
                      : form.course
                      ? 'border-gray-200 bg-gray-50 text-gray-800'
                      : 'border-gray-200 bg-gray-50 text-gray-400'
                  } ${courseOpen ? 'ring-2 ring-blue-100 border-blue-400' : ''}`}
                >
                  <span>{form.course || `Select ${isApply ? 'a program' : 'an option'}`}</span>
                  <ChevronDown size={15} className={`text-gray-400 transition-transform ${courseOpen ? 'rotate-180' : ''}`} />
                </button>

                {courseOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                    {courseOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          handleChange('course', opt);
                          setCourseOpen(false);
                          setTouched((p) => ({ ...p, course: true }));
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] font-medium border-b border-gray-50 last:border-0 transition-colors hover:bg-blue-50 ${form.course === opt ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {touched.course && errors.course && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.course}</p>
              )}
            </div>

            {/* Message – only for Apply */}
            {isApply && (
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  Additional Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                  <textarea
                    rows={3}
                    placeholder="Any questions about admissions, eligibility, scholarships..."
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Privacy note */}
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              🔒 Your information is safe with us. We never share your details with third parties.
            </p>
          </div>

          {/* Submit Footer */}
          <div className="px-6 pb-6 shrink-0">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-3.5 rounded-xl font-extrabold text-white text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-wait ${
                isApply
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-orange-500/20'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {isApply ? 'Submitting...' : 'Processing...'}
                </>
              ) : isApply ? (
                <>
                  <GraduationCap size={17} />
                  Submit Application
                  <ArrowRight size={15} />
                </>
              ) : (
                <>
                  <Download size={17} />
                  Send Brochure to Email
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
