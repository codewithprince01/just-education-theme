"use client";

import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { heroContent, heroStats, type HeroStat } from '@/data/contactConfig';
import { useCountUp } from './useCountUp';

function StatCounter({ stat, index }: { stat: HeroStat; index: number }) {
    const { ref, value } = useCountUp(stat.value, 1400 + index * 150);
    return (
        <div
            ref={ref}
            className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 text-center transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
        >
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {stat.prefix}
                {value}
                {stat.suffix}
            </div>
            <div className="mt-1 text-[11px] sm:text-xs font-medium text-blue-100 leading-tight">
                {stat.label}
            </div>
        </div>
    );
}

export default function ContactHero() {
    const { badge, title, highlight, subtitle, description, primaryCta, secondaryCta } =
        heroContent;
    const [before, after] = title.split(highlight);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white">
            {/* Decorative blurred blobs (matches home hero) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-12 -left-10 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-300 blur-3xl" />
                <div className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-[#126094] blur-3xl" />
            </div>
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left: copy + CTAs */}
                    <div className="lg:col-span-7 je-animate-fade-up">
                        <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {badge}
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 leading-[1.05] tracking-tight">
                            {before}
                            <span className="text-orange-400">{highlight}</span>
                            {after}
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl font-semibold text-blue-50 max-w-2xl">
                            {subtitle}
                        </p>
                        <p className="mt-4 text-base text-blue-100/90 leading-relaxed max-w-2xl">
                            {description}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <a
                                href={primaryCta.href}
                                className="group px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                            >
                                {primaryCta.label}
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a
                                href={secondaryCta.href}
                                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 hover:border-white/40 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                {secondaryCta.label}
                            </a>
                        </div>
                    </div>

                    {/* Right: animated trust stats */}
                    <div className="lg:col-span-5">
                        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200/80 mb-4 text-center">
                                Trusted by learners & teams nationwide
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {heroStats.map((stat, i) => (
                                    <StatCounter key={stat.id} stat={stat} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave divider into the gray-50 page body */}
            <div className="relative z-10 -mb-px" aria-hidden="true">
                <svg viewBox="0 0 1440 80" className="w-full h-[40px] sm:h-[64px]" preserveAspectRatio="none">
                    <path
                        d="M0,40 C240,80 480,0 720,24 C960,48 1200,80 1440,40 L1440,80 L0,80 Z"
                        fill="#f9fafb"
                    />
                </svg>
            </div>
        </section>
    );
}
