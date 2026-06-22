"use client";

import { useState } from 'react';
import { Mail, Phone, Copy, Check, ArrowRight } from 'lucide-react';
import { quickContacts } from '@/data/contactConfig';
import { accent } from '@/components/blog/theme';
import { ContactIcon } from './icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function QuickContactCards() {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(email);
            window.setTimeout(() => setCopied((c) => (c === email ? null : c)), 1800);
        } catch {
            /* clipboard unavailable — silently ignore */
        }
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14 md:py-20">
            <SectionHeading
                eyebrow="Quick Contact"
                title="Reach the right team in seconds"
                description="Pick the channel that matches your needs — every inbox is monitored by a dedicated specialist."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickContacts.map((card, i) => {
                    const a = accent(card.accent);
                    return (
                        <Reveal key={card.id} delay={i * 90} direction="up">
                            <div
                                className={`group relative h-full rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${a.hoverBorder}`}
                            >
                                {/* soft glow on hover */}
                                <div className={`absolute inset-x-0 -top-px h-1 rounded-t-2xl ${a.solid} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className={`w-12 h-12 rounded-xl ${a.soft} ${a.softText} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    <ContactIcon name={card.icon} className="w-6 h-6" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{card.description}</p>

                                <div className="mt-5 space-y-2.5 text-sm">
                                    <div className="flex items-center justify-between gap-2">
                                        <a
                                            href={`mailto:${card.email}`}
                                            className="flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 transition-colors truncate"
                                        >
                                            <Mail className={`w-4 h-4 flex-shrink-0 ${a.softText}`} />
                                            <span className="truncate">{card.email}</span>
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => copy(card.email)}
                                            aria-label={`Copy ${card.title} email address`}
                                            className="flex-shrink-0 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            {copied === card.email ? (
                                                <Check className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    {card.phone && (
                                        <a
                                            href={`tel:${card.phone.replace(/\s/g, '')}`}
                                            className="flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            <Phone className={`w-4 h-4 flex-shrink-0 ${a.softText}`} />
                                            {card.phone}
                                        </a>
                                    )}
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    {card.action ? (
                                        <a
                                            href={card.action.href}
                                            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${a.softText} hover:gap-2.5 transition-all`}
                                        >
                                            {card.action.label}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <p className="text-xs font-medium text-gray-500">{card.note}</p>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
