"use client";

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { newsletterConfig } from '@/data/contactConfig';
import Reveal from './Reveal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) {
            setError('Please enter a valid email address.');
            setStatus('error');
            return;
        }
        setError('');
        setStatus('loading');
        // --- Dummy API ---
        await new Promise((r) => window.setTimeout(r, newsletterConfig.mockLatencyMs));
        setStatus('success');
        setEmail('');
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
            <Reveal>
                <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-orange-50 text-[#F57C00]">
                            <Mail className="w-3.5 h-3.5" /> Newsletter
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3C5D]">{newsletterConfig.title}</h2>
                        <p className="mt-3 text-gray-600">{newsletterConfig.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                            {newsletterConfig.perks.map((perk) => (
                                <li key={perk} className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                    <Check className="w-4 h-4 text-green-600" />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        {status === 'success' ? (
                            <div className="je-animate-pop flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 p-6 text-green-800">
                                <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <p className="font-bold">You&apos;re subscribed! 🎉</p>
                                    <p className="text-sm text-green-700">Check your inbox to confirm. Welcome aboard.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={submit} noValidate>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            placeholder="you@example.com"
                                            aria-label="Email address"
                                            aria-invalid={status === 'error'}
                                            className={`w-full rounded-xl border bg-white pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-4 ${
                                                status === 'error'
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                                                    : 'border-gray-200 focus:border-[#0B3C5D] focus:ring-[#0B3C5D]/10'
                                            }`}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Joining…
                                            </>
                                        ) : (
                                            <>
                                                Subscribe <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {error}
                                    </p>
                                )}
                                <p className="mt-2 text-xs text-gray-400">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
