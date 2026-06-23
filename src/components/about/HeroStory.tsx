"use client";

import Link from 'next/link';
import { ArrowRight, GraduationCap, Check, Sparkles } from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import Icon from './Icon';
import { trustIndicators } from '../../data/about';

const PANEL_TILES = [
    { icon: 'Building2', label: 'Colleges' },
    { icon: 'BookOpen', label: 'Courses' },
    { icon: 'ClipboardList', label: 'Entrance Exams' },
    { icon: 'Wallet', label: 'Scholarships' },
    { icon: 'FileText', label: 'Admissions' },
    { icon: 'Briefcase', label: 'Careers' },
];

const INLINE_TRUST = ['Verified Listings', 'Direct Inquiry', 'Student Reviews'];

const HeroStory = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white border-b border-gray-100">
            {/* spotlight overlay + grids */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-36 -left-36 w-[45rem] h-[45rem] rounded-full bg-orange-500/10 blur-[120px]" />
                <div className="absolute top-1/2 -right-36 w-[40rem] h-[40rem] rounded-full bg-blue-400/10 blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 pt-5 pb-16 md:pb-20">
                <div className="[&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-white">
                    <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'About Us' }]} />
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-6 md:mt-10">
                    {/* Left — copy */}
                    <div className="lg:col-span-7 animate-fade-in">
                        <span className="inline-flex items-center gap-2 bg-white border border-white text-[#0B3C5D] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-orange-500" /> India&apos;s Education Directory
                        </span>

                        <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold mt-6 leading-[1.12] tracking-tight">
                            Discover the Right <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Path for Your Future</span>
                        </h1>

                        <p className="mt-6 text-base md:text-lg text-blue-100/90 leading-relaxed max-w-xl">
                            Search, filter, and compare top-rated colleges, schools, coaching institutes, and universities near you — connected directly with official listings and verified details.
                        </p>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-wrap gap-3.5">
                            <Link href="/exams" className="group px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-950/20 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
                                Search Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link href="/exams" className="px-6 py-3.5 bg-white hover:bg-gray-50 text-[#0B3C5D] font-semibold rounded-xl border border-white transition-all duration-300 shadow-sm">
                                Browse Listings
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                            {INLINE_TRUST.map((t) => (
                                <span key={t} className="flex items-center gap-2 text-sm font-medium text-blue-100">
                                    <span className="w-5 h-5 rounded-full bg-orange-500/95 flex items-center justify-center shadow-sm">
                                        <Check className="w-3 h-3 text-white" />
                                    </span>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — clean ecosystem preview panel */}
                    <div className="hidden lg:block lg:col-span-5 relative">


                        {/* glow behind card */}
                        <div className="absolute -inset-6 bg-orange-500/15 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative max-w-md ml-auto je-float-slow">
                            <div className="rounded-3xl bg-white border border-gray-200 backdrop-blur-md p-6 shadow-2xl">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-5 h-5 text-white" />
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-[#0B3C5D] leading-tight">JustEducation Listings</p>
                                        <p className="text-xs text-gray-500">Search directory categories</p>
                                    </div>
                                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {PANEL_TILES.map((tile) => (
                                        <div key={tile.label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 shadow-sm border border-transparent hover:border-orange-400 hover:shadow-md transition-all duration-300">
                                            <span className="w-8 h-8 rounded-lg bg-[#0B3C5D]/5 flex items-center justify-center flex-shrink-0">
                                                <Icon name={tile.icon} className="w-4 h-4 text-[#0B3C5D]" />
                                            </span>
                                            <span className="text-xs font-bold text-gray-800 truncate">{tile.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/exams" className="group mt-5 flex items-center justify-between rounded-2xl bg-[#0B3C5D] hover:bg-[#0D4B75] px-4 py-3.5 transition-colors duration-300">
                                    <span className="flex items-center gap-2 text-sm font-bold text-white">
                                        <Sparkles className="w-4 h-4 text-orange-400" /> Browse all categories
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* trust strip */}
            <div className="relative z-10 border-t border-white/10 bg-[#082A42]/40 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
                    <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-2.5">
                        {trustIndicators.map((t) => (
                            <li key={t.label} className="flex items-center gap-2 text-sm font-semibold text-blue-50">
                                <Icon name={t.icon} className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                {t.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HeroStory;
