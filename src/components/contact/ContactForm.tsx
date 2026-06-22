"use client";

import { useState, useId } from 'react';
import {
    User, Mail, Phone, Building2, Tag, MessageSquare, Send, Loader2,
    CheckCircle2, X, AlertCircle, Calendar, Clock, ShieldCheck, ChevronDown,
} from 'lucide-react';
import { formDepartments, formConfig, type Department } from '@/data/contactConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

interface FormState {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    department: Department | '';
    message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

interface StoredSubmission extends FormState {
    id: string;
    submittedAt: string;
}

const EMPTY: FormState = {
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    department: '',
    message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,18}$/;

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function ContactForm() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [toast, setToast] = useState<Toast>(null);
    const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
    const fieldId = useId();

    const validateField = (name: keyof FormState, value: string): string => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Please enter your full name.';
                if (value.trim().length < 2) return 'Name looks too short.';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required.';
                if (!EMAIL_RE.test(value)) return 'Enter a valid email address.';
                return '';
            case 'phone':
                if (value && !PHONE_RE.test(value)) return 'Enter a valid phone number.';
                return '';
            case 'subject':
                if (!value.trim()) return 'Please add a subject.';
                return '';
            case 'department':
                if (!value) return 'Select a department.';
                return '';
            case 'message':
                if (!value.trim()) return 'Please write a message.';
                if (value.trim().length < 10) return 'Message should be at least 10 characters.';
                if (value.length > formConfig.messageMaxLength) return 'Message is too long.';
                return '';
            default:
                return '';
        }
    };

    const validateAll = (): Errors => {
        const next: Errors = {};
        (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
            const err = validateField(key, form[key]);
            if (err) next[key] = err;
        });
        return next;
    };

    const update = (name: keyof FormState, value: string) => {
        setForm((f) => ({ ...f, [name]: value }));
        if (touched[name]) {
            setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
        }
    };

    const blur = (name: keyof FormState) => {
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors((e) => ({ ...e, [name]: validateField(name, form[name]) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nextErrors = validateAll();
        setErrors(nextErrors);
        setTouched(
            Object.fromEntries((Object.keys(form) as (keyof FormState)[]).map((k) => [k, true])),
        );

        if (Object.values(nextErrors).some(Boolean)) {
            setToast({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
            window.setTimeout(() => setToast(null), 4000);
            return;
        }

        setStatus('loading');
        // --- Dummy API submission -------------------------------------------
        try {
            await new Promise((resolve) => window.setTimeout(resolve, formConfig.mockLatencyMs));
            const ref = `JE-${Math.floor(100000 + Math.random() * 899999)}`;
            const record: StoredSubmission = {
                ...form,
                id: ref,
                submittedAt: new Date().toLocaleString('en-IN'),
            };
            setSubmissions((s) => [record, ...s]);
            setStatus('success');
            setToast({ type: 'success', message: `Message sent! Your reference is ${ref}.` });
            window.setTimeout(() => setToast(null), 5000);
            setForm(EMPTY);
            setTouched({});
            setErrors({});
        } catch {
            setStatus('idle');
            setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
            window.setTimeout(() => setToast(null), 4000);
        }
    };

    const charCount = form.message.length;
    const overLimit = charCount > formConfig.messageMaxLength;

    const inputBase =
        'w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-4';
    const okRing = 'border-gray-200 focus:border-[#0B3C5D] focus:ring-[#0B3C5D]/10';
    const errRing = 'border-red-300 focus:border-red-500 focus:ring-red-500/10';

    return (
        <section id="contact-form" className="scroll-mt-24 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-8 pb-16 md:pt-10 md:pb-20">
                <SectionHeading
                    title="Tell us how we can help"
                    description="Fill in the form and the right specialist will get back to you."
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Left: assurance / schedule panel */}
                    <Reveal direction="right" className="lg:col-span-2">
                        <div className="h-full rounded-2xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0F4D73] text-white p-7 md:p-8 shadow-lg relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
                            <h3 className="text-2xl font-bold relative z-10">What happens next?</h3>
                            <ul className="mt-6 space-y-5 relative z-10">
                                {[
                                    { icon: CheckCircle2, title: 'We confirm receipt', text: 'You get an instant acknowledgement with a reference ID.' },
                                    { icon: Clock, title: 'Fast turnaround', text: 'A specialist replies within 2 hours during business hours.' },
                                    { icon: ShieldCheck, title: 'Private & secure', text: 'Your details are encrypted in transit and never sold.' },
                                ].map(({ icon: Icon, title, text }) => (
                                    <li key={title} className="flex gap-3.5">
                                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-orange-300" />
                                        </span>
                                        <div>
                                            <p className="font-semibold">{title}</p>
                                            <p className="text-sm text-blue-100 leading-relaxed">{text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div id="schedule" className="scroll-mt-24 mt-8 pt-6 border-t border-white/15 relative z-10">
                                <p className="flex items-center gap-2 font-semibold">
                                    <Calendar className="w-5 h-5 text-orange-300" />
                                    Prefer a live conversation?
                                </p>
                                <p className="mt-1.5 text-sm text-blue-100">
                                    Book a 30-minute meeting at a time that works for you.
                                </p>
                                <a
                                    href="/book-session"
                                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B3C5D] font-bold rounded-lg text-sm shadow-md hover:bg-orange-50 transition-colors"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Schedule a Meeting
                                </a>
                            </div>

                            {submissions.length > 0 && (
                                <p className="mt-6 text-xs text-blue-200 relative z-10">
                                    {submissions.length} message{submissions.length > 1 ? 's' : ''} sent this session ·
                                    latest ref {submissions[0].id}
                                </p>
                            )}
                        </div>
                    </Reveal>

                    {/* Right: the form */}
                    <Reveal direction="up" delay={120} className="lg:col-span-3">
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            className="rounded-2xl bg-gray-50/80 border border-gray-200 p-6 md:p-8 shadow-sm"
                        >
                            {status === 'success' && (
                                <div className="je-animate-pop mb-6 flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4 text-green-800">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold">Thank you! Your message is on its way.</p>
                                        <p className="text-green-700">
                                            Reference <span className="font-mono font-semibold">{submissions[0]?.id}</span>. We will respond shortly.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field
                                    id={`${fieldId}-name`}
                                    label="Full Name"
                                    required
                                    icon={<User className="w-4 h-4" />}
                                    error={errors.fullName}
                                >
                                    <input
                                        id={`${fieldId}-name`}
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Jane Cooper"
                                        value={form.fullName}
                                        onChange={(e) => update('fullName', e.target.value)}
                                        onBlur={() => blur('fullName')}
                                        aria-invalid={!!errors.fullName}
                                        aria-describedby={errors.fullName ? `${fieldId}-name-err` : undefined}
                                        className={`${inputBase} ${errors.fullName ? errRing : okRing}`}
                                    />
                                </Field>

                                <Field
                                    id={`${fieldId}-email`}
                                    label="Email"
                                    required
                                    icon={<Mail className="w-4 h-4" />}
                                    error={errors.email}
                                >
                                    <input
                                        id={`${fieldId}-email`}
                                        type="email"
                                        autoComplete="email"
                                        placeholder="jane@company.com"
                                        value={form.email}
                                        onChange={(e) => update('email', e.target.value)}
                                        onBlur={() => blur('email')}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? `${fieldId}-email-err` : undefined}
                                        className={`${inputBase} ${errors.email ? errRing : okRing}`}
                                    />
                                </Field>

                                <Field
                                    id={`${fieldId}-phone`}
                                    label="Phone Number"
                                    icon={<Phone className="w-4 h-4" />}
                                    error={errors.phone}
                                >
                                    <input
                                        id={`${fieldId}-phone`}
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+91 98765 43210"
                                        value={form.phone}
                                        onChange={(e) => update('phone', e.target.value)}
                                        onBlur={() => blur('phone')}
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? `${fieldId}-phone-err` : undefined}
                                        className={`${inputBase} ${errors.phone ? errRing : okRing}`}
                                    />
                                </Field>

                                <Field
                                    id={`${fieldId}-company`}
                                    label="Company Name"
                                    icon={<Building2 className="w-4 h-4" />}
                                >
                                    <input
                                        id={`${fieldId}-company`}
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Acme Inc."
                                        value={form.company}
                                        onChange={(e) => update('company', e.target.value)}
                                        className={`${inputBase} ${okRing}`}
                                    />
                                </Field>

                                <Field
                                    id={`${fieldId}-subject`}
                                    label="Subject"
                                    required
                                    icon={<Tag className="w-4 h-4" />}
                                    error={errors.subject}
                                >
                                    <input
                                        id={`${fieldId}-subject`}
                                        type="text"
                                        placeholder="How can we help?"
                                        value={form.subject}
                                        onChange={(e) => update('subject', e.target.value)}
                                        onBlur={() => blur('subject')}
                                        aria-invalid={!!errors.subject}
                                        aria-describedby={errors.subject ? `${fieldId}-subject-err` : undefined}
                                        className={`${inputBase} ${errors.subject ? errRing : okRing}`}
                                    />
                                </Field>

                                <Field
                                    id={`${fieldId}-dept`}
                                    label="Department"
                                    required
                                    icon={<ChevronDown className="w-4 h-4" />}
                                    error={errors.department}
                                >
                                    <div className="relative">
                                        <select
                                            id={`${fieldId}-dept`}
                                            value={form.department}
                                            onChange={(e) => update('department', e.target.value)}
                                            onBlur={() => blur('department')}
                                            aria-invalid={!!errors.department}
                                            aria-describedby={errors.department ? `${fieldId}-dept-err` : undefined}
                                            className={`${inputBase} appearance-none pr-10 ${errors.department ? errRing : okRing} ${form.department ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="" disabled>
                                                Select a department
                                            </option>
                                            {formDepartments.map((d) => (
                                                <option key={d} value={d} className="text-gray-900">
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </Field>
                            </div>

                            {/* Message */}
                            <div className="mt-5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <label
                                        htmlFor={`${fieldId}-message`}
                                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"
                                    >
                                        <MessageSquare className="w-4 h-4 text-gray-400" />
                                        Message
                                    </label>
                                    <span
                                        className={`text-xs font-medium tabular-nums ${
                                            overLimit ? 'text-red-500' : charCount > formConfig.messageMaxLength * 0.9 ? 'text-amber-600' : 'text-gray-400'
                                        }`}
                                    >
                                        {charCount}/{formConfig.messageMaxLength}
                                    </span>
                                </div>
                                <textarea
                                    id={`${fieldId}-message`}
                                    rows={6}
                                    placeholder="Share as much detail as you can — context helps us help you faster."
                                    value={form.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    onBlur={() => blur('message')}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? `${fieldId}-message-err` : undefined}
                                    className={`${inputBase} resize-y ${errors.message ? errRing : okRing}`}
                                />
                                {errors.message && (
                                    <p id={`${fieldId}-message-err`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className="je-animate-pop fixed bottom-5 right-5 z-[60] max-w-sm flex items-start gap-3 rounded-xl px-4 py-3.5 shadow-2xl border text-sm font-medium "
                    style={{
                        background: toast.type === 'success' ? '#ecfdf5' : '#fef2f2',
                        borderColor: toast.type === 'success' ? '#a7f3d0' : '#fecaca',
                        color: toast.type === 'success' ? '#065f46' : '#991b1b',
                    }}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="flex-1">{toast.message}</span>
                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        aria-label="Dismiss notification"
                        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </section>
    );
}

// --- Field wrapper -----------------------------------------------------------
function Field({
    id,
    label,
    icon,
    error,
    children,
}: {
    id: string;
    label: string;
    required?: boolean;
    icon: React.ReactNode;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
                <span className="text-gray-400">{icon}</span>
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                </p>
            )}
        </div>
    );
}
