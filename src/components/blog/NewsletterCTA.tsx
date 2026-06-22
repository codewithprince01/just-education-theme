'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Send } from 'lucide-react';

interface NewsletterCTAProps {
    variant?: 'card' | 'banner';
    className?: string;
}

// Frontend-only newsletter capture. With no backend, a valid submit just shows
// optimistic confirmation — ready to wire to a real endpoint later.
export default function NewsletterCTA({ variant = 'card', className = '' }: NewsletterCTAProps) {
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (valid) setDone(true);
    }

    if (variant === 'banner') {
        return (
            <section
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white p-8 md:p-10 ${className}`}
            >
                <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
                <div className="relative z-10 md:flex items-center justify-between gap-8">
                    <div className="max-w-lg">
                        <h2 className="text-2xl md:text-3xl font-extrabold">Never miss an education update</h2>
                        <p className="text-blue-100 mt-2 text-sm md:text-base">
                            Get exam alerts, scholarship deadlines and admission news delivered to your inbox every week.
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="mt-6 md:mt-0 w-full md:w-auto">
                        {done ? (
                            <p className="inline-flex items-center gap-2 font-semibold text-orange-300">
                                <CheckCircle2 className="w-5 h-5" /> You&apos;re subscribed!
                            </p>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="nl-banner" className="sr-only">Email address</label>
                                <input
                                    id="nl-banner"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="px-4 py-3 rounded-xl text-sm text-gray-800 bg-white outline-none w-full sm:w-72 border border-white/20 focus:ring-2 focus:ring-orange-400"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-xl shadow-md transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    <Send className="w-4 h-4" /> Subscribe
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        );
    }

    return (
        <div className={`bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] rounded-xl shadow-md p-5 text-white ${className}`}>
            <h3 className="flex items-center gap-2 text-lg font-bold mb-1">
                <Mail className="w-5 h-5 text-orange-400" /> Newsletter
            </h3>
            <p className="text-sm text-blue-100 mb-4">Weekly education insights, straight to your inbox.</p>
            {done ? (
                <p className="inline-flex items-center gap-2 font-semibold text-orange-300 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Subscribed — thank you!
                </p>
            ) : (
                <form onSubmit={onSubmit} className="space-y-2.5">
                    <label htmlFor="nl-card" className="sr-only">Email address</label>
                    <input
                        id="nl-card"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg shadow-sm transition-colors text-sm"
                    >
                        Subscribe Now
                    </button>
                </form>
            )}
        </div>
    );
}
