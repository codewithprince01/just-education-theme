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
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Verified Directory Profiles',
                                desc: 'We directly audit institution profiles, contact details, and locations to ensure zero spam or fake directory listings.',
                            },
                            {
                                icon: Phone,
                                title: 'Direct Contacts (No Middlemen)',
                                desc: 'Students can call admissions desks directly. We charge no commission to students or institutes, matching them transparently.',
                            },
                            {
                                icon: MessageSquare,
                                title: 'Student & Alumni Reviews',
                                desc: 'Verified review ratings submitted by real learners, giving prospective students honest insights before they apply.',
                            },
                        ].map((card, i) => (
                            <Reveal key={card.title} delay={i * 120}>
                                <div className="group flex gap-5 p-5 bg-gray-50/50 hover:bg-white border border-gray-200/80 hover:border-orange-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <span className="w-12 h-12 rounded-xl bg-orange-50 text-[#F57C00] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                                        <card.icon className="w-5.5 h-5.5" />
                                    </span>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors leading-snug">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                            {card.desc}
                                        </p>
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
