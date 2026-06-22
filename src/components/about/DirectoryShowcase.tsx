"use client";

import { Phone, MessageSquare, ShieldCheck, Search } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from '../blog/SectionHeading';

export default function DirectoryShowcase() {
    return (
        <section id="directory-showcase" className="py-24 md:py-28 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Reveal>
                    <SectionHeading
                        title="India's Smartest Education Directory"
                        subtitle="Discover verified institutions, coaching, and schools with direct contact and real student reviews."
                        icon={<Search className="w-5 h-5" />}
                        className="mb-16"
                    />
                </Reveal>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Premium Directory Online Image Mockup */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <div className="relative rounded-[2rem] overflow-hidden border border-gray-200/80 shadow-2xl group hover:shadow-orange-500/10 hover:border-orange-300 transition-all duration-500 bg-gray-50 aspect-[4/3] w-full">
                                <img 
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Education Directory Search Interface" 
                                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                                    loading="lazy"
                                />
                                {/* Glass gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Platform Capabilities cards list */}
                    <div className="lg:col-span-5 flex flex-col gap-5">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Verified Directory Profiles',
                                desc: 'We directly audit institution profiles, contact details, and locations to ensure zero spam or fake directory listings.',
                                tag: 'Zero fake listings',
                            },
                            {
                                icon: Phone,
                                title: 'Direct Contacts (No Middlemen)',
                                desc: 'Students can call admissions desks directly. We charge no commission to students or institutes, matching them transparently.',
                                tag: 'No commission',
                            },
                            {
                                icon: MessageSquare,
                                title: 'Student & Alumni Reviews',
                                desc: 'Verified review ratings submitted by real learners, giving prospective students honest insights before they apply.',
                                tag: 'Real learners',
                            },
                        ].map((card, i) => (
                            <Reveal key={card.title} delay={i * 120}>
                                <div className="group relative overflow-hidden flex gap-5 p-6 bg-white border border-gray-200/80 hover:border-orange-300 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {/* left accent bar */}
                                    <span className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-400 to-orange-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                                    {/* index watermark */}
                                    <span className="absolute -bottom-[7px] right-2 text-6xl font-black text-gray-100 group-hover:text-orange-100 transition-colors duration-300 select-none pointer-events-none leading-none">
                                        0{i + 1}
                                    </span>

                                    <span className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F57C00] flex items-center justify-center flex-shrink-0 ring-1 ring-orange-100 transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white group-hover:ring-orange-300 group-hover:scale-105">
                                        <card.icon className="w-5.5 h-5.5" />
                                    </span>
                                    <div className="relative">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors leading-snug">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                            {card.desc}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-[#0B3C5D] bg-orange-50 px-2.5 py-1 rounded-full">
                                            <ShieldCheck className="w-3 h-3 text-orange-500" />
                                            {card.tag}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
