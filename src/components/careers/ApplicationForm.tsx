"use client";

import { useState } from 'react';
import { CheckCircle2, Upload, Loader2, AlertCircle } from 'lucide-react';

/**
 * Client-side application form.
 *
 * Validation, a honeypot spam trap, resume upload and a success state are all handled
 * here. Actual delivery (email / persistence) requires a backend endpoint — wire the
 * `submit()` body to your API route or form service to make it live. Until then it
 * simulates a submission and shows the success message.
 */

interface FormState {
    fullName: string; email: string; mobile: string; currentLocation: string;
    currentCompany: string; currentDesignation: string; totalExperience: string; relevantExperience: string;
    currentSalary: string; expectedSalary: string; noticePeriod: string;
    portfolioUrl: string; linkedinUrl: string;
    whyJoin: string; additionalNotes: string;
    company_website: string; // honeypot — must stay empty
}

const EMPTY: FormState = {
    fullName: '', email: '', mobile: '', currentLocation: '',
    currentCompany: '', currentDesignation: '', totalExperience: '', relevantExperience: '',
    currentSalary: '', expectedSalary: '', noticePeriod: '',
    portfolioUrl: '', linkedinUrl: '', whyJoin: '', additionalNotes: '',
    company_website: '',
};

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
    </div>
);

const inputCls = (hasError: boolean) =>
    `w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-800 outline-none transition-colors ${
        hasError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#F57C00]'
    }`;

const ApplicationForm = ({ jobTitle }: { jobTitle: string }) => {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [resumeName, setResumeName] = useState('');
    const [resumeError, setResumeError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const onResume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) { setResumeName(''); return; }
        const okType = /\.(pdf|docx?)$/i.test(file.name);
        const okSize = file.size <= 5 * 1024 * 1024;
        if (!okType) { setResumeError('Please upload a PDF or Word document.'); setResumeName(''); return; }
        if (!okSize) { setResumeError('File must be under 5 MB.'); setResumeName(''); return; }
        setResumeError('');
        setResumeName(file.name);
    };

    const validate = (): boolean => {
        const next: Partial<Record<keyof FormState, string>> = {};
        if (!form.fullName.trim()) next.fullName = 'Full name is required.';
        if (!form.email.trim()) next.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
        if (!form.mobile.trim()) next.mobile = 'Mobile number is required.';
        else if (!/^[+\d][\d\s-]{7,14}$/.test(form.mobile)) next.mobile = 'Enter a valid mobile number.';
        if (!form.currentLocation.trim()) next.currentLocation = 'Current location is required.';
        if (!form.totalExperience.trim()) next.totalExperience = 'Total experience is required.';
        if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl)) next.linkedinUrl = 'Enter a full URL (https://…).';
        if (form.portfolioUrl && !/^https?:\/\/.+/.test(form.portfolioUrl)) next.portfolioUrl = 'Enter a full URL (https://…).';
        if (!form.whyJoin.trim()) next.whyJoin = 'Please tell us why you want to join.';
        if (!resumeName) setResumeError('Resume is required.');
        setErrors(next);
        return Object.keys(next).length === 0 && !!resumeName;
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Honeypot: a bot will fill this hidden field — silently drop.
        if (form.company_website) { setSubmitted(true); return; }
        if (!validate()) return;
        setSubmitting(true);
        // Simulated submission — replace with a real API call (POST /api/careers/apply).
        await new Promise((r) => setTimeout(r, 900));
        setSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-10 px-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Application submitted!</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                    Thanks for applying to <span className="font-semibold text-gray-700">{jobTitle}</span>. We've received
                    your application and will email you if there's a fit. Keep an eye on your inbox.
                </p>
                <button
                    onClick={() => { setForm(EMPTY); setResumeName(''); setSubmitted(false); }}
                    className="mt-6 px-5 py-2.5 text-sm font-semibold text-[#0B3C5D] border border-gray-300 rounded-lg hover:border-[#0B3C5D] transition-colors cursor-pointer"
                >
                    Submit another application
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={submit} noValidate className="space-y-8">
            {/* Honeypot (visually hidden, off-screen) */}
            <input
                type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={form.company_website} onChange={set('company_website')}
                className="absolute -left-[9999px] w-px h-px opacity-0" name="company_website"
            />

            {/* Personal */}
            <fieldset>
                <legend className="text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">Personal Information</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required error={errors.fullName}>
                        <input className={inputCls(!!errors.fullName)} value={form.fullName} onChange={set('fullName')} placeholder="Jane Doe" />
                    </Field>
                    <Field label="Email Address" required error={errors.email}>
                        <input type="email" className={inputCls(!!errors.email)} value={form.email} onChange={set('email')} placeholder="jane@example.com" />
                    </Field>
                    <Field label="Mobile Number" required error={errors.mobile}>
                        <input className={inputCls(!!errors.mobile)} value={form.mobile} onChange={set('mobile')} placeholder="+91 98765 43210" />
                    </Field>
                    <Field label="Current Location" required error={errors.currentLocation}>
                        <input className={inputCls(!!errors.currentLocation)} value={form.currentLocation} onChange={set('currentLocation')} placeholder="Bengaluru, India" />
                    </Field>
                </div>
            </fieldset>

            {/* Professional */}
            <fieldset>
                <legend className="text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">Professional Information</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Current Company"><input className={inputCls(false)} value={form.currentCompany} onChange={set('currentCompany')} placeholder="Acme Inc." /></Field>
                    <Field label="Current Designation"><input className={inputCls(false)} value={form.currentDesignation} onChange={set('currentDesignation')} placeholder="Software Engineer" /></Field>
                    <Field label="Total Experience" required error={errors.totalExperience}><input className={inputCls(!!errors.totalExperience)} value={form.totalExperience} onChange={set('totalExperience')} placeholder="e.g. 4 years" /></Field>
                    <Field label="Relevant Experience"><input className={inputCls(false)} value={form.relevantExperience} onChange={set('relevantExperience')} placeholder="e.g. 3 years" /></Field>
                    <Field label="Current Salary (LPA)"><input className={inputCls(false)} value={form.currentSalary} onChange={set('currentSalary')} placeholder="e.g. 14" /></Field>
                    <Field label="Expected Salary (LPA)"><input className={inputCls(false)} value={form.expectedSalary} onChange={set('expectedSalary')} placeholder="e.g. 20" /></Field>
                    <Field label="Notice Period"><input className={inputCls(false)} value={form.noticePeriod} onChange={set('noticePeriod')} placeholder="e.g. 30 days" /></Field>
                </div>
            </fieldset>

            {/* Uploads & links */}
            <fieldset>
                <legend className="text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">Resume & Links</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Field label="Resume / CV" required error={resumeError}>
                            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed cursor-pointer hover:border-[#F57C00] transition-colors ${resumeError ? 'border-red-400' : 'border-gray-300'}`}>
                                <Upload className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600">{resumeName || 'Upload PDF or Word (max 5 MB)'}</span>
                                <input type="file" accept=".pdf,.doc,.docx" onChange={onResume} className="hidden" />
                            </label>
                        </Field>
                    </div>
                    <Field label="Portfolio URL" error={errors.portfolioUrl}><input className={inputCls(!!errors.portfolioUrl)} value={form.portfolioUrl} onChange={set('portfolioUrl')} placeholder="https://your-portfolio.com" /></Field>
                    <Field label="LinkedIn URL" error={errors.linkedinUrl}><input className={inputCls(!!errors.linkedinUrl)} value={form.linkedinUrl} onChange={set('linkedinUrl')} placeholder="https://linkedin.com/in/you" /></Field>
                </div>
            </fieldset>

            {/* Additional */}
            <fieldset>
                <legend className="text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">Additional Questions</legend>
                <div className="space-y-4">
                    <Field label="Why do you want to join?" required error={errors.whyJoin}>
                        <textarea rows={4} className={inputCls(!!errors.whyJoin)} value={form.whyJoin} onChange={set('whyJoin')} placeholder="Tell us what excites you about this role…" />
                    </Field>
                    <Field label="Additional Notes">
                        <textarea rows={3} className={inputCls(false)} value={form.additionalNotes} onChange={set('additionalNotes')} placeholder="Anything else you'd like us to know?" />
                    </Field>
                </div>
            </fieldset>

            <div className="flex items-center gap-3">
                <button
                    type="submit" disabled={submitting}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#F57C00] hover:bg-[#E67300] disabled:opacity-60 text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : 'Submit Application'}
                </button>
                <p className="text-xs text-gray-400">We'll never share your details. Required fields are marked *.</p>
            </div>
        </form>
    );
};

export default ApplicationForm;
