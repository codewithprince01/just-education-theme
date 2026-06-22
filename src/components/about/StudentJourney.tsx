"use client";

import { Compass, Search, GitCompare, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/blog/SectionHeading';
import Reveal from './Reveal';

const PILLARS = [
    {
        step: 'Step 01',
        title: 'Explore Interests',
        subtitle: 'Academic Discovery',
        desc: 'Filter and browse through 12,000+ undergraduate, postgraduate, and diploma courses matching your interests and goals.',
        icon: Compass,
        color: 'from-[#0B3C5D]/10 to-[#0B3C5D]/20 text-[#0B3C5D]',
        hoverColor: 'group-hover:border-[#0B3C5D] group-hover:shadow-[#0B3C5D]/5'
    },
    {
        step: 'Step 02',
        title: 'Find Top Institutes',
        subtitle: 'Directory Search',
        desc: 'Discover more than 90,000 verified colleges, universities, CBSE/ICSE schools, and coaching centres in 600+ cities.',
        icon: Search,
        color: 'from-orange-500/10 to-orange-500/20 text-[#F57C00]',
        hoverColor: 'group-hover:border-orange-500 group-hover:shadow-orange-500/5'
    },
    {
        step: 'Step 03',
        title: 'Compare Side-by-Side',
        subtitle: 'Clarity & Transparency',
        desc: 'Examine detailed fee structures, infrastructure facilities, placements, rankings, and genuine alumni reviews side-by-side.',
        icon: GitCompare,
        color: 'from-[#0B3C5D]/10 to-[#0B3C5D]/20 text-[#0B3C5D]',
        hoverColor: 'group-hover:border-[#0B3C5D] group-hover:shadow-[#0B3C5D]/5'
    },
    {
        step: 'Step 04',
        title: 'Apply with Confidence',
        subtitle: 'Direct Admissions',
        desc: 'Connect directly with verified admissions desks or request a call from expert counsellors with zero middleman commissions.',
        icon: CheckCircle2,
        color: 'from-orange-500/10 to-orange-500/20 text-[#F57C00]',
        hoverColor: 'group-hover:border-orange-500 group-hover:shadow-orange-500/5'
    }
];

const StudentJourney = () => {
    return (
        <section className="py-24 md:py-28 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Reveal>
                    <SectionHeading
                        title="Every educational journey starts with a decision"
                        subtitle="From initial interest to final admission — we guide and empower you at every single step."
                        icon={<Compass className="w-5 h-5" />}
                        className="mb-16"
                    />
                </Reveal>

                {/* Staggered Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PILLARS.map((pillar, index) => {
                        const IconComponent = pillar.icon;
                        return (
                            <Reveal key={pillar.title} delay={index * 100}>
                                <div className={`group relative h-full bg-white rounded-3xl border border-gray-200/80 p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden`}>
                                    {/* Subtle hover background glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                                    
                                    <div>
                                        {/* Step Tag & Icon wrapper */}
                                        <div className="flex items-center justify-between gap-4 mb-6">
                                            <span className="text-[10px] font-black tracking-wider uppercase bg-[#0B3C5D]/5 text-[#0B3C5D] px-2.5 py-1 rounded-full group-hover:bg-[#F57C00]/10 group-hover:text-[#F57C00] transition-colors duration-300">
                                                {pillar.step}
                                            </span>
                                            <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                                                <IconComponent className="w-5.5 h-5.5" />
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            {pillar.subtitle}
                                        </span>
                                        <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0B3C5D] transition-colors leading-tight">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    {/* Action link effect */}
                                    <div className="mt-8 pt-4 border-t border-gray-100/60 flex items-center justify-between text-xs font-bold text-[#0B3C5D] group-hover:text-[#F57C00] transition-colors">
                                        <span>Learn more</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StudentJourney;

