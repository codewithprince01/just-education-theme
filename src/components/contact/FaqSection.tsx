"use client";

import { useMemo, useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { contactFaqs, type ContactFaq } from '@/data/contactConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const CATEGORIES: ('All' | ContactFaq['category'])[] = ['All', 'General', 'Support', 'Business', 'Account'];

export default function FaqSection() {
    const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All');
    const [open, setOpen] = useState<string | null>(contactFaqs[0]?.id ?? null);

    const visible = useMemo(
        () => (filter === 'All' ? contactFaqs : contactFaqs.filter((f) => f.category === filter)),
        [filter],
    );

    return (
        <section id="faq" className="scroll-mt-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
            <SectionHeading
                title="Frequently asked questions"
                description="Quick answers to the things people ask us most. Can't find what you need? Send us a message."
            />

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                            filter === cat
                                ? 'bg-[#0B3C5D] text-white border-[#0B3C5D]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0B3C5D] hover:text-[#0B3C5D]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
                {visible.map((faq, i) => {
                    const isOpen = open === faq.id;
                    return (
                        <Reveal key={faq.id} delay={Math.min(i, 6) * 50}>
                            <div
                                className={`rounded-2xl border bg-white transition-all duration-300 ${
                                    isOpen ? 'border-[#F57C00] shadow-md' : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : faq.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${faq.id}`}
                                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                                >
                                    <span className="flex items-start gap-3">
                                        <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isOpen ? 'text-[#F57C00]' : 'text-gray-400'}`} />
                                        <span className="font-semibold text-gray-900">{faq.question}</span>
                                    </span>
                                    <span
                                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                            isOpen ? 'bg-orange-50 text-[#F57C00]' : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </span>
                                </button>
                                {/* smooth grid-rows expand */}
                                <div
                                    id={`faq-panel-${faq.id}`}
                                    role="region"
                                    className={`grid transition-all duration-300 ease-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 pl-12 text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            {/* Still have questions */}
            <div className="mt-10 text-center">
                <p className="text-gray-600">Still have questions?</p>
                <a
                    href="#contact-form"
                    className="mt-3 inline-flex items-center gap-2 px-6 py-3 bg-[#0B3C5D] hover:bg-[#0F4D73] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                    <MessageCircle className="w-5 h-5" />
                    Ask our team
                </a>
            </div>
        </section>
    );
}
