'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import type { Faq } from '@/data/blog/types';

// Accessible FAQ accordion. FAQ structured data is emitted separately on the
// page via JSON-LD, so this is purely the visible UI.
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
    const [open, setOpen] = useState<number | null>(0);
    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#0B3C5D] mb-4">
                <HelpCircle className="w-5 h-5 text-[#F57C00]" /> Frequently Asked Questions
            </h2>
            <div>
                {faqs.map((faq, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={i} className="border-b border-gray-200 last:border-b-0">
                            <button
                                className="w-full flex items-center justify-between gap-4 py-4 text-left"
                                onClick={() => setOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                {isOpen ? (
                                    <Minus className="w-5 h-5 text-[#F57C00] flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            {isOpen && <p className="pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
