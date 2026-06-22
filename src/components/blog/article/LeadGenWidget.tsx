'use client';

import { useState } from 'react';
import { Send, CheckCircle2, GraduationCap } from 'lucide-react';

// Lead-generation widget (frontend only): captures interest, shows optimistic
// confirmation — ready to wire to a real CRM/endpoint later.
export default function LeadGenWidget({ topic = 'admissions' }: { topic?: string }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [done, setDone] = useState(false);
    const valid = name.trim().length > 1 && /^[0-9+\s-]{7,}$/.test(phone);

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] text-white p-5 shadow-md">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl" aria-hidden="true" />
            <div className="relative z-10">
                <h3 className="flex items-center gap-2 text-base font-bold">
                    <GraduationCap className="w-5 h-5 text-orange-300" /> Free {topic} guidance
                </h3>
                <p className="text-sm text-blue-100 mt-1 mb-4">Talk to an education expert — no cost, no spam.</p>
                {done ? (
                    <p className="inline-flex items-center gap-2 font-semibold text-orange-300 text-sm">
                        <CheckCircle2 className="w-4 h-4" /> Thanks! We&apos;ll reach out soon.
                    </p>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (valid) setDone(true);
                        }}
                        className="space-y-2.5"
                    >
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            aria-label="Your name"
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            inputMode="tel"
                            aria-label="Phone number"
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            type="submit"
                            disabled={!valid}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#F57C00] hover:bg-[#E67300] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition-colors"
                        >
                            <Send className="w-4 h-4" /> Request a callback
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
