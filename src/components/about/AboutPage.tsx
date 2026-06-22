import Link from 'next/link';
import { ArrowRight, GraduationCap, Quote, Network } from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import Reveal from './Reveal';
import AnimatedCounter from './AnimatedCounter';
import Icon from './Icon';
import {
    trustIndicators, missionItems, platformStats, coverageCategories, trustFeatures,
    workflowSteps, informationTypes, coreValues, ecosystemNodes,
} from '../../data/about';

// Section heading helper — keeps the centered eyebrow + title + subtitle pattern
// consistent across the page.
const SectionHeading = ({ eyebrow, title, subtitle, light = false }: {
    eyebrow?: string; title: string; subtitle?: string; light?: boolean;
}) => (
    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        {eyebrow && (
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                light ? 'bg-white/15 text-orange-300' : 'bg-orange-50 text-orange-600'
            }`}>
                {eyebrow}
            </span>
        )}
        <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
            {title}
        </h2>
        {subtitle && (
            <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? 'text-blue-100' : 'text-gray-500'}`}>
                {subtitle}
            </p>
        )}
    </div>
);

// Evenly-spaced orbit positions (top/left %) for the 8 ecosystem nodes — Section 11.
const ORBIT = [
    { top: '4%', left: '50%' }, { top: '19%', left: '83%' }, { top: '50%', left: '96%' },
    { top: '81%', left: '83%' }, { top: '96%', left: '50%' }, { top: '81%', left: '17%' },
    { top: '50%', left: '4%' }, { top: '19%', left: '17%' },
];

const AboutPage = () => {
    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: 'About Us' },
    ];

    return (
        <div className="bg-gray-50">
            {/* ============================ SECTION 1: HERO ============================ */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white">
                {/* Decorative glow blobs */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-10 left-10 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-blue-300 blur-3xl" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 pt-6 pb-16 md:pb-24">
                    <div className="[&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-white">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mt-6 md:mt-10">
                        {/* Hero copy */}
                        <Reveal>
                            <span className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                <GraduationCap className="w-4 h-4" /> About JustEducation
                            </span>
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black mt-6 leading-[1.1]">
                                India&apos;s Trusted <span className="text-orange-400">Education Discovery</span> Platform
                            </h1>
                            <p className="mt-6 text-base md:text-lg text-blue-100 leading-relaxed max-w-xl">
                                JustEducation helps students discover colleges, universities, schools, courses, entrance
                                exams, scholarships, admissions, coaching institutes, and educational opportunities through
                                structured and reliable information.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-4">
                                <Link href="/exams" className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5">
                                    Explore Colleges <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/exams" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 hover:border-white/40 transition-all duration-300">
                                    Explore Courses
                                </Link>
                                <a href="#contact" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 hover:border-white/40 transition-all duration-300">
                                    Contact Us
                                </a>
                            </div>
                        </Reveal>

                        {/* Hero visual — stylised education ecosystem graphic */}
                        <Reveal delay={150} className="hidden lg:block">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm" />
                                {/* Central hub */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl flex flex-col items-center justify-center text-center p-3 z-10">
                                    <GraduationCap className="w-9 h-9 text-white" />
                                    <span className="text-[11px] font-bold text-white mt-1.5 leading-tight">Just<br />Education</span>
                                </div>
                                {/* Floating category chips */}
                                {[
                                    { icon: 'Building2', label: 'Colleges', pos: 'top-6 left-6' },
                                    { icon: 'Landmark', label: 'Universities', pos: 'top-6 right-6' },
                                    { icon: 'BookOpen', label: 'Courses', pos: 'bottom-6 left-6' },
                                    { icon: 'ClipboardList', label: 'Exams', pos: 'bottom-6 right-6' },
                                    { icon: 'Wallet', label: 'Scholarships', pos: 'top-1/2 -translate-y-1/2 left-2' },
                                    { icon: 'Briefcase', label: 'Careers', pos: 'top-1/2 -translate-y-1/2 right-2' },
                                ].map((chip) => (
                                    <div key={chip.label} className={`absolute ${chip.pos} flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg`}>
                                        <Icon name={chip.icon} className="w-4 h-4 text-[#0B3C5D]" />
                                        <span className="text-xs font-bold text-gray-800">{chip.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="relative z-10 border-t border-white/10 bg-[#082A42]/40 backdrop-blur-sm">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5">
                        <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3">
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

            {/* ========================== SECTION 2: WHO WE ARE ========================== */}
            <section className="py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <Reveal>
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-orange-50 text-orange-600">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            A comprehensive education information &amp; discovery platform
                        </h2>
                        <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                JustEducation is a comprehensive education information and discovery platform designed to
                                simplify educational decision-making for students and parents.
                            </p>
                            <p>
                                The platform provides structured information related to colleges, universities, schools,
                                courses, entrance exams, scholarships, admissions, educational institutions, and academic
                                opportunities across India.
                            </p>
                            <p>
                                Our objective is to help students make informed educational decisions through transparent
                                and accessible information.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {['Transparent', 'Reliable', 'Nationwide', 'Student-First'].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#0B3C5D] border border-blue-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={150}>
                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-br from-orange-100 to-blue-100 rounded-[2rem] -z-10 blur-sm" />
                            <div className="grid grid-cols-2 gap-4">
                                {coverageCategories.slice(0, 4).map((c, i) => (
                                    <div key={c.title} className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm ${i % 2 === 1 ? 'mt-6' : ''}`}>
                                        <div className="w-11 h-11 rounded-xl bg-[#0B3C5D] flex items-center justify-center mb-3">
                                            <Icon name={c.icon} className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <h3 className="font-bold text-gray-900">{c.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ========================== SECTION 3: OUR MISSION ========================== */}
            <section className="py-20 md:py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <SectionHeading
                        eyebrow="Our Mission"
                        title="What drives JustEducation forward"
                        subtitle="Every feature we build serves one goal — helping students make confident, well-informed educational decisions."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {missionItems.map((m, i) => (
                            <Reveal key={m.title} delay={(i % 3) * 100}>
                                <div className="group h-full bg-gray-50 rounded-2xl border border-gray-200 p-7 hover:shadow-md hover:border-orange-200 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                        <Icon name={m.icon} className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======================= SECTION 4: PLATFORM STATISTICS ======================= */}
            <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#082A42] text-white">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-orange-500 blur-3xl" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <SectionHeading
                        eyebrow="Platform at a Glance"
                        title="Trusted scale across Indian education"
                        subtitle="Numbers that reflect the breadth of educational information available on JustEducation."
                        light
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {platformStats.map((s, i) => (
                            <Reveal key={s.label} delay={(i % 4) * 80}>
                                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center mb-4">
                                        <Icon name={s.icon} className="w-6 h-6" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black text-white">
                                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                                    </div>
                                    <p className="text-sm text-blue-100 mt-2 font-medium">{s.label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================= SECTION 5: WHAT WE COVER ========================= */}
            <section className="py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <SectionHeading
                    eyebrow="What We Cover"
                    title="One platform, every educational category"
                    subtitle="From colleges and courses to exams and scholarships — explore the full spectrum of educational opportunities."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {coverageCategories.map((c, i) => (
                        <Reveal key={c.title} delay={(i % 4) * 70}>
                            <div className="group h-full bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#126094] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon name={c.icon} className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-[#F57C00] transition-colors">{c.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{c.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ==================== SECTION 6: WHY STUDENTS TRUST US ==================== */}
            <section className="py-20 md:py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <SectionHeading
                        eyebrow="Built on Trust"
                        title="Why Students Trust JustEducation"
                        subtitle="Credibility, transparency, and a relentless focus on student needs guide everything we publish."
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trustFeatures.map((f, i) => (
                            <Reveal key={f.title} delay={(i % 3) * 100}>
                                <div className="h-full bg-gray-50 rounded-2xl border border-gray-200 p-7 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-orange-600" />
                                    <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center mb-5">
                                        <Icon name={f.icon} className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====================== SECTION 7: HOW IT WORKS (TIMELINE) ====================== */}
            <section className="py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Your academic journey in five simple steps"
                    subtitle="A clear, guided path from first search to a confident final decision."
                />

                {/* Desktop horizontal timeline */}
                <div className="hidden lg:block relative">
                    <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />
                    <div className="grid grid-cols-5 gap-4">
                        {workflowSteps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 120}>
                                <div className="text-center">
                                    <div className="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg">
                                        <Icon name={step.icon} className="w-6 h-6" />
                                    </div>
                                    <span className="inline-block mt-4 text-xs font-bold text-orange-500 uppercase tracking-wide">Step {i + 1}</span>
                                    <h3 className="text-base font-bold text-gray-900 mt-1 px-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 px-2 leading-relaxed">{step.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Mobile vertical timeline */}
                <div className="lg:hidden relative pl-12">
                    <div className="absolute top-2 bottom-2 left-[1.4rem] w-0.5 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200" />
                    <div className="space-y-8">
                        {workflowSteps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 80}>
                                <div className="relative">
                                    <div className="absolute -left-[2.6rem] w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md">
                                        <Icon name={step.icon} className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Step {i + 1}</span>
                                    <h3 className="text-base font-bold text-gray-900 mt-0.5">{step.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============== SECTION 8: INFORMATION AVAILABLE ON PLATFORM ============== */}
            <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <SectionHeading
                        eyebrow="Deep & Structured Data"
                        title="Information You Can Explore"
                        subtitle="Every institution and course is backed by detailed, structured information you can rely on."
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        {informationTypes.map((info, i) => (
                            <Reveal key={info.label} delay={(i % 7) * 50}>
                                <div className="group h-full bg-white rounded-xl border border-gray-200 p-5 text-center hover:border-[#0B3C5D] hover:shadow-md transition-all duration-300">
                                    <div className="w-11 h-11 mx-auto rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-3 group-hover:bg-[#0B3C5D] group-hover:text-white transition-colors duration-300">
                                        <Icon name={info.icon} className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800 leading-snug">{info.label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================== SECTION 9: OUR VISION ========================== */}
            <section className="relative overflow-hidden py-24 md:py-28 bg-[#0B3C5D] text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-16 left-1/4 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
                    <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
                    <Reveal>
                        <Quote className="w-12 h-12 mx-auto text-orange-400/70" />
                        <span className="block mt-6 text-xs font-bold uppercase tracking-widest text-orange-300">Our Vision</span>
                        <p className="mt-6 text-2xl md:text-3xl xl:text-4xl font-bold leading-snug">
                            To become one of India&apos;s most trusted education ecosystems where students can
                            <span className="text-orange-400"> discover, compare, evaluate, and pursue </span>
                            educational opportunities with confidence.
                        </p>
                        <p className="mt-8 text-base md:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
                            Our vision is to create a transparent and comprehensive education platform that bridges the
                            gap between students and educational institutions.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ======================= SECTION 10: OUR CORE VALUES ======================= */}
            <section className="py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <SectionHeading
                    eyebrow="Our Values"
                    title="The principles behind every decision"
                    subtitle="Six values that define how we build, what we publish, and who we serve."
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreValues.map((v, i) => (
                        <Reveal key={v.title} delay={(i % 3) * 100}>
                            <div className="group h-full bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-lg transition-all duration-300 text-center">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <Icon name={v.icon} className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ==================== SECTION 11: EDUCATIONAL ECOSYSTEM ==================== */}
            <section className="py-20 md:py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <SectionHeading
                        eyebrow="The Bigger Picture"
                        title="A connected educational ecosystem"
                        subtitle="JustEducation acts as the bridge between learners and the institutions, courses, and opportunities that shape their future."
                    />

                    {/* Desktop radial diagram */}
                    <Reveal className="hidden md:block">
                        <div className="relative mx-auto aspect-square max-w-2xl">
                            {/* Connector lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                {ORBIT.map((p) => (
                                    <line
                                        key={p.top + p.left}
                                        x1="50" y1="50"
                                        x2={parseFloat(p.left)} y2={parseFloat(p.top)}
                                        stroke="#F57C00" strokeWidth="0.3" strokeOpacity="0.35" strokeDasharray="1.5 1.5"
                                    />
                                ))}
                            </svg>

                            {/* Center hub: Students */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#126094] shadow-2xl flex flex-col items-center justify-center text-center z-10 ring-8 ring-white">
                                <Icon name="GraduationCap" className="w-9 h-9 text-orange-400" />
                                <span className="text-sm font-bold text-white mt-2">Students</span>
                                <span className="text-[10px] text-blue-200">at the center</span>
                            </div>

                            {/* Orbit nodes */}
                            {ecosystemNodes.map((node, i) => (
                                <div
                                    key={node.label}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                                    style={{ top: ORBIT[i].top, left: ORBIT[i].left }}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-orange-400 hover:shadow-lg transition-all duration-300">
                                            <Icon name={node.icon} className="w-7 h-7 text-[#0B3C5D]" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700 whitespace-nowrap">{node.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Mobile fallback grid */}
                    <div className="md:hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#126094] shadow-xl flex flex-col items-center justify-center ring-4 ring-white">
                                <Icon name="GraduationCap" className="w-7 h-7 text-orange-400" />
                                <span className="text-xs font-bold text-white mt-1">Students</span>
                            </div>
                            <Network className="w-6 h-6 text-orange-400 my-3" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {ecosystemNodes.map((node) => (
                                <div key={node.label} className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3">
                                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                                        <Icon name={node.icon} className="w-5 h-5 text-[#0B3C5D]" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{node.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== SECTION 12: SEO RICH CONTENT ===================== */}
            <section className="py-20 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <article className="prose-custom">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                        JustEducation: A Trusted Education Information Platform for Colleges, Courses &amp; Exams in India
                    </h2>
                    <div className="space-y-5 text-gray-600 leading-relaxed text-[15px] md:text-base">
                        <p>
                            Choosing the right educational path is one of the most important decisions a student makes,
                            and JustEducation exists to make that decision clearer, simpler, and more reliable. As a
                            dedicated <strong>education portal</strong> and <strong>education information platform</strong>,
                            JustEducation brings together verified, structured details about <strong>colleges in India</strong>,
                            <strong> universities in India</strong>, <strong>schools in India</strong>, and thousands of
                            academic programs — all in one place. Whether a student is exploring undergraduate options,
                            evaluating postgraduate specialisations, or researching competitive entrance exams, the
                            platform is designed to remove confusion and replace it with confidence.

                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Simplifying College Search and Course Search</h3>
                        <p>
                            The modern <strong>college search</strong> experience can feel overwhelming. Information is
                            scattered across countless websites, brochures, and forums, often outdated or inconsistent.
                            JustEducation solves this by offering a unified <strong>course search</strong> and college
                            discovery experience where students can filter institutions by location, stream, course level,
                            fees, and eligibility. Each profile is structured to surface the details that matter most —
                            admission process, fee structure, infrastructure, placement information, and academic
                            reputation — so comparisons are genuinely meaningful rather than superficial.
                        </p>
                        <p>
                            By organising <strong>educational institutions</strong> into clear, comparable formats,
                            JustEducation helps students and parents evaluate options side by side. Instead of visiting
                            dozens of pages, a student can review multiple colleges and courses on a single platform,
                            understand how they differ, and shortlist the ones that align with their goals, budget, and
                            career aspirations.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Comprehensive Coverage of Entrance Exams</h3>
                        <p>
                            Entrance examinations are a defining milestone for millions of aspirants every year.
                            JustEducation maintains detailed information on major <strong>entrance exams</strong> across
                            engineering, medical, management, law, design, and other streams. Students can track exam
                            dates, application timelines, eligibility criteria, exam patterns, syllabi, and result
                            announcements. This makes it easier to prepare strategically and avoid missing critical
                            deadlines — a common and costly mistake during admission cycles.
                        </p>
                        <p>
                            For each exam, the platform connects the dots between the test, the courses it unlocks, and
                            the institutions that accept it. This interconnected approach means a student researching an
                            exam can immediately see which colleges and courses it leads to, transforming isolated facts
                            into an actionable academic roadmap.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Scholarships, Admissions, and Financial Clarity</h3>
                        <p>
                            Financing education is a real concern for many families. JustEducation provides accessible
                            information on <strong>scholarships</strong> and <strong>admissions</strong>, helping students
                            discover opportunities they might otherwise overlook. From merit-based awards to need-based
                            support, the platform highlights eligibility requirements and benefits in a transparent format.
                            Combined with clear fee-structure information, this empowers students to plan their education
                            financially and pursue opportunities without unnecessary barriers.
                        </p>
                        <p>
                            Transparent <strong>admissions</strong> information is central to the JustEducation mission.
                            Understanding application steps, important dates, required documents, and cut-off trends can be
                            the difference between a smooth admission and a missed opportunity. By presenting these details
                            clearly, the platform reduces anxiety and helps students approach the admission process with
                            preparation rather than guesswork.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Schools, Coaching Institutes, and Lifelong Learning</h3>
                        <p>
                            Education is a continuous journey, and JustEducation reflects that by covering more than just
                            higher education. The platform includes information on <strong>schools in India</strong> and
                            <strong> coaching institutes</strong>, supporting students at every stage — from early
                            schooling decisions to focused exam preparation. Parents researching schools can review
                            curriculum, facilities, and admission details, while aspirants preparing for competitive exams
                            can explore coaching options suited to their needs.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Career Guidance and Future Opportunities</h3>
                        <p>
                            Academic decisions are ultimately about the future. That is why JustEducation pairs educational
                            information with <strong>career guidance</strong>, helping students understand how a course or
                            qualification connects to real-world career opportunities. By mapping academic pathways to
                            outcomes, the platform encourages students to think beyond the next exam and consider the
                            long-term value of their choices.
                        </p>
                        <p>
                            Alongside structured data, JustEducation offers a growing library of <strong>educational
                            resources</strong> — guides, articles, and blogs that explain complex processes in simple
                            language. These resources help students stay informed about changes in the education landscape,
                            preparation strategies, and emerging opportunities, reinforcing the platform&apos;s role as a
                            dependable companion throughout the academic journey.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4">Why JustEducation Matters</h3>
                        <p>
                            India&apos;s education ecosystem is vast and constantly evolving. With thousands of
                            institutions and countless programs, students need a trustworthy guide more than ever.
                            JustEducation is built to be that guide — an independent, student-first
                            <strong> education information platform</strong> committed to accuracy, transparency, and
                            accessibility. By consolidating reliable information about colleges, universities, courses,
                            exams, scholarships, and careers into a single, well-structured experience, the platform helps
                            students move forward with clarity and confidence.
                        </p>
                        <p>
                            Ultimately, JustEducation is more than a directory. It is a comprehensive
                            <strong> education portal</strong> designed to empower better decisions, bridge the gap between
                            students and institutions, and support every learner&apos;s ambition to build a brighter
                            future through education.
                        </p>
                    </div>
                </article>
            </section>

            {/* ========================= SECTION 13: DISCLAIMER ========================= */}
            <section className="pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <Reveal>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-7 flex gap-4">
                        <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                            <Icon name="ShieldCheck" className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-amber-900 mb-2">Information Disclaimer</h2>
                            <p className="text-sm text-amber-800 leading-relaxed">
                                Educational information, admissions, fees, eligibility, placements, rankings, and
                                examination details may change over time. Users are encouraged to verify critical
                                information directly from official institutional sources before making final decisions.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ===================== SECTION 14: CONTACT & SUPPORT CTA ===================== */}
            <section id="contact" className="pb-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white px-6 py-14 md:px-16 md:py-20 text-center">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-300 blur-3xl" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                                Need Help With Your Educational Journey?
                            </h2>
                            <p className="mt-5 text-base md:text-lg text-blue-100 leading-relaxed">
                                Reach out to our team for assistance, feedback, suggestions, or partnership opportunities.
                            </p>
                            <div className="mt-9 flex flex-wrap justify-center gap-4">
                                <a href="mailto:support@justeducation.com" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5">
                                    <Icon name="Mail" className="w-5 h-5" /> Contact Us
                                </a>
                                <a href="mailto:support@justeducation.com" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 hover:border-white/40 transition-all duration-300 flex items-center gap-2">
                                    <Icon name="Headphones" className="w-5 h-5" /> Get Support
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default AboutPage;
