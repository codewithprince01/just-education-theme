"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, Headphones, Users, Target, ShieldCheck, Eye, Heart, Globe, CalendarCheck, Compass } from 'lucide-react';
import SectionHeading from '@/components/blog/SectionHeading';
import Reveal from './Reveal';
import Icon from './Icon';
import Illustration from './Illustrations';
import HeroStory from './HeroStory';
import StudentJourney from './StudentJourney';
import EcosystemGraph from './EcosystemGraph';
import DeliveryProcess from './DeliveryProcess';
import GrowthTimeline from './GrowthTimeline';
import { transparencyPillars } from '../../data/about';
import DirectoryShowcase from './DirectoryShowcase';

const OriginMockup = () => (
    <div className="relative rounded-[2rem] overflow-hidden border border-gray-200/80 shadow-2xl group hover:shadow-orange-500/10 hover:border-orange-300 transition-all duration-500 bg-gray-50 aspect-[4/3] w-full">
        <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop" 
            alt="Why We Started JustEducation" 
            className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
            loading="lazy"
        />
        {/* Subtle glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none" />
    </div>
);

const AboutPage = () => {

    return (
        <div className="bg-gray-50 scroll-smooth">
            {/* ===== 1 · HERO ===== */}
            <HeroStory />

            {/* ===== 2 · WHY WE STARTED ===== */}
            <section id="origin" className="py-24 md:py-28 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <Reveal>
                            <OriginMockup />
                        </Reveal>
                        <Reveal delay={120}>
                            <SectionHeading
                                title="Why we started JustEducation"
                                subtitle="Simplifying educational discovery and helping students make informed decisions."
                                icon={<Target className="w-5 h-5" />}
                                className="mb-8"
                            />
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] md:text-base">
                                <p>Students often struggle to find reliable educational information. The details that shape a future — fees, eligibility, deadlines, outcomes — sit scattered across countless websites and sources.</p>
                                <p>Comparing colleges, courses, exams, admissions, fees, scholarships, and career options quickly becomes overwhelming. It is easy to feel lost, and easy to make a decision based on incomplete information.</p>
                                <p>JustEducation was created to change that — to simplify educational discovery and help students make informed decisions through structured, transparent, and trustworthy information.</p>
                            </div>
                            <div className="mt-8 grid sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Scattered → Structured', desc: 'Consolidated info' },
                                    { label: 'Confusion → Clarity', desc: 'No guesswork' },
                                    { label: 'Guesswork → Confidence', desc: 'Verifiable details' }
                                ].map((item) => (
                                    <div key={item.label} className="p-4 bg-gray-50 rounded-xl border border-gray-200/60 hover:border-orange-200 transition-colors">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D]">
                                            <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item.label}
                                        </span>
                                        <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== 3 · STUDENT JOURNEY ===== */}
            <StudentJourney />

            {/* ===== 4 · ECOSYSTEM GRAPH ===== */}
            <EcosystemGraph />

            {/* ===== 5 · HOW INFORMATION REACHES STUDENTS ===== */}
            <div id="process">
                <DeliveryProcess />
            </div>

            {/* ===== 6 · INTERACTIVE DIRECTORY SHOWCASE (Replacing trust alternate blocks) ===== */}
            <DirectoryShowcase />

            {/* ===== 7 · GROWTH TIMELINE ===== */}
            <div id="timeline">
                <GrowthTimeline />
            </div>

            {/* ===== 8 · VISION ===== */}
            <section id="vision" className="relative overflow-hidden py-24 md:py-28 bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-16 left-1/4 w-96 h-96 rounded-full bg-blue-400 blur-3xl je-float-slow" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-orange-500 blur-3xl je-float" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <Reveal className="lg:col-span-7">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 bg-white/10 px-3 py-1 rounded-full mb-5">Our Vision</span>
                            <h2 className="text-3xl md:text-4xl xl:text-[2.75rem] font-extrabold leading-[1.14]">
                                Building India&apos;s most trusted <span className="text-orange-400">education ecosystem</span>
                            </h2>
                            <p className="mt-6 text-base md:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
                                We envision a future where every student — in every city — can discover, compare, evaluate,
                                and pursue educational opportunities with complete confidence. A transparent, comprehensive
                                platform that closes the distance between learners and the institutions that shape their futures.
                            </p>
                            <div className="mt-8">
                                <Link href="/exams" className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                    Start Exploring <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </Reveal>

                        {/* vision pillars */}
                        <Reveal delay={120} className="lg:col-span-5">
                            <div className="space-y-4">
                                {[
                                    { icon: 'Globe2', title: 'Accessible to every student', text: 'Reliable information, within reach for all.' },
                                    { icon: 'ShieldCheck', title: 'Transparent by default', text: 'Clear, honest, verifiable details.' },
                                    { icon: 'TrendingUp', title: 'Built for the future', text: 'Connecting today\'s choice to tomorrow\'s career.' },
                                ].map((p) => (
                                    <div key={p.title} className="flex items-start gap-4 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm p-5 hover:bg-white/[0.12] transition-colors duration-300">
                                        <span className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                            <Icon name={p.icon} className="w-5 h-5 text-orange-300" />
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-white">{p.title}</h3>
                                            <p className="text-sm text-blue-100/80 mt-0.5">{p.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== 9 · LONG-FORM SEO CONTENT & SIDEBAR ===== */}
            <section id="seo-article" className="py-24 md:py-28 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
                        {/* Left column: Article content */}
                        <div className="min-w-0">
                            <article className="space-y-5 text-gray-600 leading-relaxed text-[15px] md:text-base">
                                <SectionHeading
                                    title="JustEducation: A Trusted Education Portal"
                                    subtitle="Our comprehensive guide to colleges, courses, and entrance exams in India."
                                    icon={<ShieldCheck className="w-5 h-5" />}
                                    className="mb-8"
                                />
                                <p>
                                    Education is one of the most significant investments a student and their family will ever make, and the
                                    quality of that decision depends heavily on the quality of information behind it. JustEducation was built
                                    as a comprehensive <strong>education portal</strong> and <strong>education information platform</strong>
                                    to bring clarity to that process — consolidating reliable details about <strong>colleges in India</strong>,
                                    <strong> universities in India</strong>, <strong>schools in India</strong>, courses, exams, scholarships,
                                    and careers into a single, structured experience. Instead of navigating scattered, inconsistent sources,
                                    students can explore everything they need in one trustworthy place.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Simplifying College Search and Course Search
                                </h3>
                                <p>
                                    For most students, the journey begins with a question: which institution and which program is right for me?
                                    The modern <strong>college search</strong> can feel overwhelming when information lives across dozens of
                                    websites, brochures, and forums. JustEducation reimagines this with a unified <strong>course search</strong>
                                    and discovery experience, where institutions and programs are organised by location, stream, course level,
                                    fees, and eligibility. Each profile surfaces the details that matter most — admission process, fee structure,
                                    infrastructure, placement information, and academic reputation — so comparisons are meaningful rather than
                                    superficial.
                                </p>
                                <p>
                                    By presenting <strong>educational institutions</strong> in clear, comparable formats, the platform helps
                                    students and parents weigh options side by side. Rather than visiting countless pages, a student can review
                                    multiple colleges and courses together, understand how they differ, and shortlist the ones that fit their
                                    goals, budget, and ambitions.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Comprehensive Coverage of Entrance Exams
                                </h3>
                                <p>
                                    Entrance examinations are a defining milestone for millions of aspirants every year. JustEducation maintains
                                    detailed information on major <strong>entrance exams</strong> across engineering, medical, management, law,
                                    design, and more. Students can track exam dates, application windows, eligibility criteria, exam patterns,
                                    syllabi, and result announcements — and prepare strategically instead of scrambling against deadlines. For
                                    each exam, the platform connects the test to the courses it unlocks and the institutions that accept it,
                                    turning isolated facts into an actionable academic roadmap.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Scholarships, Admissions, and Financial Clarity
                                </h3>
                                <p>
                                    Financing education is a genuine concern for many families. JustEducation provides accessible information on
                                    <strong> scholarships</strong> and <strong>admissions</strong>, helping students discover opportunities they
                                    might otherwise miss. From merit-based awards to need-based support, eligibility and benefits are presented
                                    transparently. Combined with clear fee details, this empowers students to plan financially and pursue
                                    opportunities without unnecessary barriers. Transparent admissions information — application steps, important
                                    dates, required documents, and cut-off trends — can be the difference between a smooth admission and a missed
                                    opportunity.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Schools, Coaching Institutes, and Lifelong Learning
                                </h3>
                                <p>
                                    Education is a continuous journey, and JustEducation reflects that by covering far more than higher education
                                    alone. The platform includes information on <strong>schools in India</strong> and <strong>coaching
                                    institutes</strong>, supporting students at every stage — from early schooling decisions to focused exam
                                    preparation. Parents researching schools can review curriculum and facilities, while aspirants can explore
                                    coaching options suited to their goals, all within the same dependable ecosystem.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Career Guidance and Future Opportunities
                                </h3>
                                <p>
                                    Academic decisions are ultimately about the future. That is why JustEducation pairs educational information
                                    with <strong>career guidance</strong>, helping students understand how a course or qualification connects to
                                    real-world outcomes. By mapping academic pathways to careers, the platform encourages students to think beyond
                                    the next exam and consider the long-term value of their choices. A growing library of <strong>educational
                                    resources</strong> — guides, articles, and explainers — translates complex processes into simple language,
                                    reinforcing the platform&apos;s role as a dependable companion throughout the journey.
                                </p>

                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3C5D] pt-4 flex items-center gap-2">
                                    <span className="h-4 w-1 bg-orange-500 rounded" /> Why a Trusted Education Platform Matters
                                </h3>
                                <p>
                                    India&apos;s education landscape is vast and constantly evolving, with thousands of institutions and countless
                                    programs. In that complexity, students need a trustworthy guide more than ever. JustEducation is built to be
                                    that guide — an independent, student-first platform committed to accuracy, transparency, and accessibility. By
                                    consolidating reliable information about <strong>courses in India</strong>, colleges, universities, exams,
                                    scholarships, and careers into a single, well-structured experience, it helps students move forward with
                                    clarity and confidence. More than a directory, JustEducation is a comprehensive education ecosystem designed to
                                    empower better decisions, bridge the gap between students and institutions, and support every learner&apos;s
                                    ambition to build a brighter future.
                                </p>
                            </article>
                        </div>

                        {/* Right column: Sticky Sidebar Widgets */}
                        <aside>
                            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 pb-4 no-scrollbar">
                                {/* Table of Contents */}
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-orange-500 transition-colors duration-300">
                                    <h3 className="text-sm font-extrabold text-[#0B3C5D] uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <span className="h-4 w-1 bg-orange-500 rounded" /> About Section Index
                                    </h3>
                                    <nav className="space-y-2.5 text-sm font-semibold text-gray-500">
                                        {[
                                            { name: 'Our Origin Story', href: '#origin' },
                                            { name: 'Student Decision Journey', href: '#ecosystem' },
                                            { name: 'Information Processing Path', href: '#process' },
                                            { name: 'Directory Discovery Portal', href: '#directory-showcase' },
                                            { name: 'Growth Roadmap Timeline', href: '#timeline' },
                                            { name: 'Vision for the Future', href: '#vision' },
                                            { name: 'Comprehensive Portal Article', href: '#seo-article' },
                                            { name: 'Quality Principles & Values', href: '#values' },
                                            { name: 'Contact & Inquiry Portal', href: '#contact' },
                                        ].map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className="block hover:text-[#F57C00] transition-colors hover:translate-x-0.5 duration-200"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                {/* Newsletter Sign-Up Mini-CTA (matching Blog details page style) */}
                                <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0D4B75] rounded-xl shadow-md p-5 text-white">
                                    <h3 className="text-sm font-bold flex items-center gap-2 mb-1 text-white">
                                        <Mail className="w-4 h-4 text-orange-400" />
                                        Keep Updated on Education
                                    </h3>
                                    <p className="text-xs text-blue-100 mb-3">Get the latest institutional admissions alerts and dates.</p>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-blue-200/60 outline-none mb-2 focus:border-orange-400 transition-colors"
                                    />
                                    <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow transition-colors duration-300">
                                        Subscribe Free
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ===== 10 · TRUST & TRANSPARENCY PRINCIPLES ===== */}
            <section id="values" className="py-24 md:py-28 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <Reveal className="text-center max-w-3xl mx-auto mb-16">
                        <SectionHeading
                            title="The principles we never compromise on"
                            subtitle="Trust is not a feature we add — it is the foundation everything else stands on."
                            icon={<ShieldCheck className="w-5 h-5" />}
                            className="flex justify-center mb-4"
                        />
                        <p className="text-gray-600 leading-relaxed text-[15px] md:text-base mt-4">
                            These core principles guide how we collect, verify, present, and improve the information students depend on every day to build their future.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                num: '01',
                                icon: ShieldCheck,
                                title: 'Accuracy First',
                                desc: 'We source educational data directly from official references and cross-check details to eliminate spam and errors.',
                                color: 'text-emerald-500 bg-emerald-50 border-emerald-100'
                            },
                            {
                                num: '02',
                                icon: Eye,
                                title: 'Radical Transparency',
                                desc: 'Admissions eligibility, comprehensive fee structures, cut-offs, and rules are presented openly without hidden terms.',
                                color: 'text-blue-500 bg-blue-50 border-blue-100'
                            },
                            {
                                num: '03',
                                icon: Heart,
                                title: 'Student Centricity',
                                desc: 'Every design, tool, and directory search logic is built around student success, with absolutely zero broker commission bias.',
                                color: 'text-rose-500 bg-rose-50 border-rose-100'
                            },
                            {
                                num: '04',
                                icon: Globe,
                                title: 'Universal Access',
                                desc: 'We bridge the search gap by compiling searchable, structured directory profiles for institutions across 600+ cities in India.',
                                color: 'text-amber-500 bg-amber-50 border-amber-100'
                            }
                        ].map((item, idx) => {
                            const IconComp = item.icon;
                            return (
                                <Reveal key={item.title} delay={idx * 100} className="h-full">
                                    <div className="group relative h-full bg-white rounded-3xl border border-gray-200/80 p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                                        
                                        <div>
                                            <div className="flex items-center justify-between gap-4 mb-6">
                                                <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                                                    <IconComp className="w-5.5 h-5.5" />
                                                </span>
                                                <span className="text-2xl font-black text-gray-150 group-hover:text-orange-500/10 transition-colors select-none">
                                                    {item.num}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0B3C5D] transition-colors leading-tight">
                                                {item.title}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-8 pt-4 border-t border-gray-100/60 flex items-center text-xs font-semibold text-gray-400 group-hover:text-[#F57C00] transition-colors">
                                            <span>Commitment Verified</span>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== 12 · CONTACT & SUPPORT ===== */}
            <section id="contact" className="bg-[#f8fafc] py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] px-6 py-16 text-center shadow-2xl md:px-16">
                            {/* Decorative layers */}
                            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                                <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
                                <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
                            </div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-orange-300 backdrop-blur-sm">
                                    <ShieldCheck size={14} /> 100% Free · No Obligation
                                </span>

                                <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
                                    Ready to Begin Your{" "}
                                    <span className="text-orange-400">Study Abroad Journey?</span>
                                </h2>
                                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100/80">
                                    Your dream university is closer than you think. Talk to an expert
                                    counselor today and take the first confident step toward a global
                                    education.
                                </p>

                                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link
                                        href="/book-session"
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 sm:w-auto"
                                    >
                                        <CalendarCheck size={20} />
                                        Book Free Counseling
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>
                                    <Link
                                        href="/search"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
                                    >
                                        <Compass size={20} />
                                        Explore Universities
                                    </Link>
                                </div>

                                <p className="mt-6 text-sm text-blue-100/60">
                                    Join 15,000+ students who started right here.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
