"use client";

import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Icon from './Icon';
import { useParallax } from './useParallax';
import { heroFloatingChips } from '../../data/about';

const HeroStory = () => {
    const { ref: artRef, offset } = useParallax(0.06);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0A2E49] text-white">
            {/* Animated geometric / glow background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-orange-500/20 blur-3xl je-float-slow" />
                <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-blue-400/20 blur-3xl je-float" />
                <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-orange-300/60 je-float" />
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-blue-200/50 je-float-slow" />
                <svg className="absolute -right-10 top-10 w-72 h-72 text-white/[0.04] je-spin-slow" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[88vh] py-20">
                    {/* Left — copy */}
                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-orange-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                            <GraduationCap className="w-4 h-4" /> About JustEducation
                        </span>
                        <h1 className="text-4xl sm:text-5xl xl:text-[4.1rem] font-black mt-6 leading-[1.05]">
                            India&apos;s Trusted <br />
                            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Education Discovery</span> Platform
                        </h1>
                        <p className="mt-7 text-base md:text-lg text-blue-100/90 leading-relaxed max-w-xl">
                            Helping students discover colleges, universities, schools, courses, entrance exams,
                            scholarships, admissions, coaching institutes, and career opportunities through structured
                            and reliable educational information.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link href="/exams" className="group px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
                                Explore Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link href="/exams" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                                Explore Courses
                            </Link>
                            <a href="#contact" className="px-7 py-3.5 text-white/90 hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-1.5">
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right — illustration with parallax + floating chips */}
                    <div className="relative hidden lg:block">
                        <div
                            ref={artRef as React.RefObject<HTMLDivElement>}
                            className="relative aspect-square max-w-lg mx-auto"
                            style={{ transform: `translateY(${offset}px)` }}
                        >
                            {/* concentric orbit rings */}
                            <div className="absolute inset-0 rounded-full border border-white/10" />
                            <div className="absolute inset-[12%] rounded-full border border-white/10" />
                            <div className="absolute inset-[26%] rounded-full border border-dashed border-white/15 je-spin-slow" />

                            {/* center hub */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl shadow-orange-900/40 flex flex-col items-center justify-center text-center z-10">
                                <GraduationCap className="w-12 h-12 text-white" />
                                <span className="text-sm font-extrabold text-white mt-2 leading-tight">Just<br />Education</span>
                            </div>

                            {/* floating chips */}
                            {heroFloatingChips.map((chip) => (
                                <div
                                    key={chip.label}
                                    className={`absolute ${chip.pos} flex items-center gap-2 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl je-float`}
                                    style={{ animationDelay: `${chip.delay}ms` }}
                                >
                                    <span className="w-7 h-7 rounded-lg bg-[#0B3C5D]/5 flex items-center justify-center">
                                        <Icon name={chip.icon} className="w-4 h-4 text-[#0B3C5D]" />
                                    </span>
                                    <span className="text-xs font-bold text-gray-800 whitespace-nowrap">{chip.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom wave divider */}
            <svg className="block w-full h-12 md:h-16 text-gray-50" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
                <path d="M0 80 L0 40 Q 360 0 720 40 T 1440 40 L1440 80 Z" fill="currentColor" />
            </svg>
        </section>
    );
};

export default HeroStory;
