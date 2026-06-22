"use client";

import { useState } from 'react';
import {
    Briefcase, MapPin, Clock, TrendingUp, Wallet, Users, CalendarDays, Building2,
    CheckCircle2, Heart, Gift, ArrowRight, Sparkles, Share2, Send, Mail, MessageCircle, Copy, Check,
} from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import VacancyCard from './VacancyCard';
import ApplicationForm from './ApplicationForm';
import PostedAgo from './PostedAgo';
import { useStickySidebar } from '../exams/useStickySidebar';
import { Job, Company, formatSalary, formatDate } from '../../data/careers';

// "Share this job" card — copy link + social shortcuts.
const ShareCard = () => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        if (typeof window === 'undefined') return;
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-[#0B3C5D] mb-4 flex items-center gap-2"><Share2 className="w-4 h-4 text-[#F57C00]" /> Share this job</h3>
            <div className="flex items-center gap-2">
                <button onClick={copy} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-lg hover:border-[#0B3C5D] text-gray-600 transition-colors cursor-pointer">
                    {copied ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy link</>}
                </button>
                <a aria-label="Share" href="#" className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0B3C5D] hover:border-[#0B3C5D] transition-colors"><Send className="w-4 h-4" /></a>
                <a aria-label="Share on WhatsApp" href="#" className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" /></a>
                <a aria-label="Share via Email" href="#" className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#F57C00] hover:border-[#F57C00] transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
        </div>
    );
};

const WHY_JOIN = [
    'Work on products used by millions of students',
    'Remote-friendly with flexible hours',
    'Real ownership and impact from day one',
    'Learning budget & top-tier hardware',
];

// "Why work with us?" highlights card.
const WhyJoinCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-bold text-[#0B3C5D] mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F57C00]" /> Why work with us?</h3>
        <ul className="space-y-2.5">
            {WHY_JOIN.map((w) => (
                <li key={w} className="flex gap-2 text-sm text-gray-600 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{w}</span>
                </li>
            ))}
        </ul>
    </div>
);

// Small labelled stat shown in the job header band.
const HeaderStat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-orange-300" />
        </div>
        <div className="min-w-0">
            <div className="text-[11px] text-blue-200/70 uppercase tracking-wide">{label}</div>
            <div className="text-sm font-semibold text-white truncate">{value}</div>
        </div>
    </div>
);

// A titled content section with consistent spacing.
const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-24">
        <h2 className="text-lg font-bold text-[#0B3C5D] mb-3">{title}</h2>
        {children}
    </section>
);

const CheckList = ({ items }: { items: string[] }) => (
    <ul className="space-y-2.5">
        {items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#F57C00] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const SkillChips = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-700">{s}</span>
        ))}
    </div>
);

const JobDetailClient = ({ job, related, company }: { job: Job; related: Job[]; company: Company }) => {
    const salary = formatSalary(job);
    // JS-based sticky sidebar (same behaviour as the exam detail page) — a tall sidebar
    // scrolls naturally and pins to the bottom of the viewport until its end is reached.
    const { containerRef, sidebarRef, sidebarColRef } = useStickySidebar(job.slug);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ─── HEADER BAND ─── */}
            <section className="bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] pt-4 pb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <Breadcrumbs light items={[{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }, { name: job.title }]} />

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mt-2">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white">{job.department}</span>
                                {job.status === 'Urgent Hiring' && (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-red-500 text-white">
                                        <Sparkles className="w-3 h-3" /> Urgent Hiring
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{job.title}</h1>
                            <p className="text-blue-100/80 mt-2 max-w-2xl">{job.shortDescription}</p>
                        </div>
                        <a
                            href="#apply"
                            className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg shadow-lg transition-colors"
                        >
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Header stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-7 pt-6 border-t border-white/10">
                        <HeaderStat icon={MapPin} label="Location" value={job.location} />
                        <HeaderStat icon={Briefcase} label="Type" value={job.employmentType} />
                        <HeaderStat icon={Building2} label="Work Mode" value={job.workMode} />
                        <HeaderStat icon={TrendingUp} label="Experience" value={job.experienceRange} />
                        <HeaderStat icon={Wallet} label="Salary" value={salary ?? 'Not disclosed'} />
                        <HeaderStat icon={Users} label="Openings" value={`${job.vacancyCount}`} />
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* ─── MAIN ─── */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">
                            <Section title="Job Overview">
                                <p className="text-sm text-gray-700 leading-relaxed">{job.overview}</p>
                            </Section>
                            <Section title="Key Responsibilities"><CheckList items={job.responsibilities} /></Section>
                            <Section title="Required Skills"><SkillChips items={job.requiredSkills} /></Section>
                            {job.preferredSkills.length > 0 && (
                                <Section title="Preferred Skills"><SkillChips items={job.preferredSkills} /></Section>
                            )}
                            <Section title="Qualifications"><CheckList items={job.qualifications} /></Section>
                            <Section title="Experience Requirements">
                                <p className="text-sm text-gray-700 leading-relaxed">{job.experienceRequirements}</p>
                            </Section>

                            <Section title="Benefits & Perks">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {job.benefits.map((b) => (
                                        <div key={b} className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-3.5 py-2.5">
                                            <Gift className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section title="Selection Process">
                                {/* Horizontal stepper on desktop, stacks vertically on mobile */}
                                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                                    {job.selectionProcess.map((step, i) => {
                                        const isLast = i === job.selectionProcess.length - 1;
                                        return (
                                            <div key={i} className="flex md:flex-1 items-center md:items-start gap-3 md:gap-0">
                                                <div className="flex md:flex-col items-center gap-3 md:gap-2 md:flex-1 md:px-1">
                                                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isLast ? 'bg-emerald-500 text-white' : 'bg-[#0B3C5D] text-white'}`}>
                                                        {isLast ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-700 md:text-center leading-snug">{step}</span>
                                                </div>
                                                {!isLast && <div className="hidden md:block flex-1 h-0.5 bg-gray-200 mt-5 mx-1" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Section>
                        </div>

                        {/* Company info */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-[#0B3C5D] mb-4">About {company.name}</h2>
                            <div className="flex items-start gap-4">
                                <img src={company.logo} alt={company.name} className="w-14 h-14 rounded-xl border border-gray-200 object-cover flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{company.about}</p>
                                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                                        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {company.location}</span>
                                        <a href={company.website} className="inline-flex items-center gap-1 text-[#F57C00] hover:underline">{company.website.replace('https://', '')}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── APPLICATION ─── */}
                        <div id="apply" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 scroll-mt-24">
                            <div className="flex items-center gap-2 mb-1">
                                <Heart className="w-5 h-5 text-[#F57C00]" />
                                <h2 className="text-xl font-extrabold text-[#0B3C5D]">Apply for this role</h2>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">Fill in your details below. Fields marked * are required.</p>
                            <ApplicationForm jobTitle={job.title} />
                        </div>
                    </div>

                    {/* ─── SIDEBAR ─── */}
                    <div ref={sidebarColRef} className="lg:col-span-1 relative">
                        <div ref={sidebarRef} className="space-y-6">
                            {/* Quick apply card */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                                    <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-4 h-4 text-[#F57C00]" />
                                    </span>
                                    <h3 className="font-bold text-[#0B3C5D] text-[15px] leading-tight">Job Summary</h3>
                                </div>
                                <dl className="space-y-3 text-sm">
                                    {[
                                        [Briefcase, 'Employment', job.employmentType],
                                        [Building2, 'Work Mode', job.workMode],
                                        [TrendingUp, 'Experience', job.experienceRange],
                                        [Wallet, 'Salary', salary ?? 'Not disclosed'],
                                        [Users, 'Vacancies', `${job.vacancyCount}`],
                                        [CalendarDays, 'Published', formatDate(job.postedDate)],
                                        [Clock, 'Apply Before', formatDate(job.expiryDate)],
                                    ].map(([Icon, label, value]) => {
                                        const I = Icon as React.ElementType;
                                        return (
                                            <div key={label as string} className="flex items-center justify-between gap-3">
                                                <dt className="flex items-center gap-2 text-gray-500"><I className="w-4 h-4 text-gray-400" /> {label as string}</dt>
                                                <dd className="font-semibold text-gray-800 text-right">{value as string}</dd>
                                            </div>
                                        );
                                    })}
                                </dl>
                                <a href="#apply" className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg shadow-sm transition-colors">
                                    Apply Now <ArrowRight className="w-4 h-4" />
                                </a>
                                <p className="text-center text-xs text-gray-400 mt-2"><PostedAgo iso={job.postedDate} /></p>
                            </div>

                            <ShareCard />
                            <WhyJoinCard />
                        </div>
                    </div>
                </div>

                {/* ─── RELATED ─── */}
                {related.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-extrabold text-[#0B3C5D] mb-5">Related Jobs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {related.map((j) => <VacancyCard key={j.id} job={j} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default JobDetailClient;
