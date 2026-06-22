'use client';

import { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

// Simple enquiry/apply popup: name + email + math captcha. Frontend only —
// a valid submit shows optimistic confirmation (ready to wire to a real API).
export default function EnquiryModal({ title, onClose }: { title: string; onClose: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [captcha, setCaptcha] = useState(() => ({
        a: Math.floor(Math.random() * 8) + 1,
        b: Math.floor(Math.random() * 8) + 1,
    }));
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');
    const [closing, setClosing] = useState(false);

    function handleClose() {
        setClosing(true);
        setTimeout(onClose, 210);
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nameOk = name.trim().length > 1;

    function refreshCaptcha() {
        setCaptcha({ a: Math.floor(Math.random() * 8) + 1, b: Math.floor(Math.random() * 8) + 1 });
        setAnswer('');
        setError('');
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!nameOk) return setError('Please enter your name.');
        if (!emailOk) return setError('Please enter a valid email address.');
        if (Number(answer) !== captcha.a + captcha.b) {
            refreshCaptcha();
            return setError('Captcha answer is incorrect — please try again.');
        }
        setError('');
        setDone(true);
    }

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${closing ? 'je-animate-fade-out' : 'je-animate-fade'}`} onClick={handleClose} />
            <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${closing ? 'je-animate-pop-out' : 'je-animate-pop'}`}>
                {/* Branded header */}
                <div className="relative bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] text-white px-6 py-5">
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" aria-hidden="true" />
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/25 active:scale-90 transition-all cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-extrabold relative z-10 pr-10">{title}</h3>
                    <p className="text-sm text-blue-100 relative z-10 mt-0.5 pr-10">Share your details — our team will reach out shortly.</p>
                </div>

                <div className="p-6">
                    {done ? (
                        <div className="text-center py-4 je-animate-fade-up">
                            <div className="w-14 h-14 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                                <CheckCircle2 className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Request received!</h4>
                            <p className="text-sm text-gray-500 mt-1">Thanks{name ? `, ${name.split(' ')[0]}` : ''} — we&apos;ll be in touch soon.</p>
                            <button onClick={handleClose} className="mt-5 px-6 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors cursor-pointer">Done</button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-3" noValidate>
                            <div>
                                <label htmlFor="enq-name" className="block text-xs font-semibold text-gray-600 mb-1">Full name</label>
                                <input
                                    id="enq-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="enq-email" className="block text-xs font-semibold text-gray-600 mb-1">Email address</label>
                                <input
                                    id="enq-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent"
                                />
                            </div>
                            {/* Captcha */}
                            <div>
                                <label htmlFor="enq-captcha" className="block text-xs font-semibold text-gray-600 mb-1">
                                    <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Verify you&apos;re human</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-2.5 rounded-lg bg-gray-100 text-gray-800 font-bold text-sm whitespace-nowrap select-none">
                                        {captcha.a} + {captcha.b} = ?
                                    </span>
                                    <input
                                        id="enq-captcha"
                                        inputMode="numeric"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Answer"
                                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent"
                                    />
                                    <button type="button" onClick={refreshCaptcha} aria-label="Refresh captcha" className="p-2.5 text-gray-400 hover:text-[#F57C00]">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors"
                            >
                                <Send className="w-4 h-4" /> Submit
                            </button>
                            <p className="text-[11px] text-gray-400 text-center">We respect your privacy. No spam, ever.</p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
