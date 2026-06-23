"use client";

import { ArrowRight, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { heroContent, heroStats, type HeroStat } from '@/data/contactConfig';
import { useCountUp } from './useCountUp';

const trustSignals = [
    { icon: Clock, label: 'Replies in under 2 hours' },
    { icon: MapPin, label: '10+ offices across India' },
    { icon: ShieldCheck, label: '24/7 emergency support' },
];

function StatCounter({ stat, index }: { stat: HeroStat; index: number }) {
    const { ref, value } = useCountUp(stat.value, 1400 + index * 150);
    return (
        <div
            ref={ref}
            className="group rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.12] sm:p-5"
        >
            <div className="text-2xl font-black tabular-nums leading-none text-white sm:text-[2rem]">
                {stat.prefix}
                {value}
                {stat.suffix}
            </div>
            <div className="mt-1.5 text-[11px] font-medium leading-tight text-blue-100/80 sm:text-xs">
                {stat.label}
            </div>
        </div>
    );
}

export default function ContactHero() {
    const { title, highlight, subtitle, description, primaryCta, secondaryCta } =
        heroContent;
    const [before, after] = title.split(highlight);

    return (
        <section className="relative overflow-hidden bg-[#0B3C5D] text-white">
            {/* ---- Background: smooth gradient + soft glows (no grid pattern) ---- */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#0B3C5D] via-[#0D4A72] to-[#11598C]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-orange-500/20 blur-[120px]" />
                <div className="absolute -bottom-40 -right-24 h-[36rem] w-[36rem] rounded-full bg-sky-400/20 blur-[130px]" />
                <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E7FC0]/25 blur-[120px]" />
            </div>
            {/* top spotlight + gentle depth toward the page body */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(75% 55% at 50% -10%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(to bottom, transparent 62%, rgba(8,38,60,0.55))',
                }}
            />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Left: copy + CTAs */}
                    <div className="je-animate-fade-up lg:col-span-7">
                        <h1 className="text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                            {before}
                            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                {highlight}
                            </span>
                            {after}
                        </h1>

                        <p className="mt-5 max-w-xl text-lg font-semibold text-blue-50 sm:text-xl">
                            {subtitle}
                        </p>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-100/80">
                            {description}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-4">
                            <a
                                href={primaryCta.href}
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-900/40"
                            >
                                {primaryCta.label}
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a
                                href={secondaryCta.href}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                            >
                                <Calendar className="h-5 w-5" />
                                {secondaryCta.label}
                            </a>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
                            {trustSignals.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-100/80"
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0 text-orange-300" />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: animated trust stats */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md sm:p-7">
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent"
                            />
                            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-blue-200/70">
                                Trusted by learners &amp; teams nationwide
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

            {/* Smooth fade into the gray-50 page body */}
            <div className="relative z-10 -mb-px" aria-hidden="true">
                <svg viewBox="0 0 1440 80" className="h-[40px] w-full sm:h-[60px]" preserveAspectRatio="none">
                    <path
                        d="M0,48 C360,86 1080,10 1440,44 L1440,80 L0,80 Z"
                        fill="#f9fafb"
                    />
                </svg>
            </div>
        </section>
    );
}
