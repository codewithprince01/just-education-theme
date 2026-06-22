"use client";

import { useMemo, useState } from 'react';
import { Search, Briefcase, SlidersHorizontal, X, Star, Plus, Minus, LayoutGrid, List, MapPin, Building2, Globe, Users } from 'lucide-react';
import Breadcrumbs from '../seo/Breadcrumbs';
import VacancyCard, { type JobView } from './VacancyCard';
import CareerGuidance from './CareerGuidance';
import {
    getPublicJobs, getFeaturedJobs, departments, locations,
    employmentTypes, workModes, experienceLevels, careersFaqs,
} from '../../data/careers';

const ALL = 'All';

// A labelled <select> used for each dropdown filter.
const FilterSelect = ({ label, value, options, onChange }: {
    label: string; value: string; options: string[]; onChange: (v: string) => void;
}) => (
    <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#F57C00] cursor-pointer"
        >
            <option value={ALL}>All {label}s</option>
            {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const CareersListingPage = () => {
    const allJobs = useMemo(() => getPublicJobs(), []);
    const featured = useMemo(() => getFeaturedJobs(), []);
    const deptOptions = useMemo(() => departments(), []);
    const locOptions = useMemo(() => locations(), []);

    const [view, setView] = useState<JobView>('grid');
    const [keyword, setKeyword] = useState('');
    const [department, setDepartment] = useState(ALL);
    const [location, setLocation] = useState(ALL);
    const [employmentType, setEmploymentType] = useState(ALL);
    const [experienceLevel, setExperienceLevel] = useState(ALL);
    const [workMode, setWorkMode] = useState(ALL);

    const filtered = useMemo(() => {
        const kw = keyword.trim().toLowerCase();
        return allJobs.filter((job) => {
            const matchesKeyword = !kw ||
                job.title.toLowerCase().includes(kw) ||
                job.department.toLowerCase().includes(kw) ||
                job.shortDescription.toLowerCase().includes(kw) ||
                job.requiredSkills.some((s) => s.toLowerCase().includes(kw));
            return (
                matchesKeyword &&
                (department === ALL || job.department === department) &&
                (location === ALL || job.location === location) &&
                (employmentType === ALL || job.employmentType === employmentType) &&
                (experienceLevel === ALL || job.experienceLevel === experienceLevel) &&
                (workMode === ALL || job.workMode === workMode)
            );
        });
    }, [allJobs, keyword, department, location, employmentType, experienceLevel, workMode]);

    const activeFilterCount = [department, location, employmentType, experienceLevel, workMode].filter((v) => v !== ALL).length;
    const remoteCount = useMemo(() => allJobs.filter((j) => j.workMode === 'Remote').length, [allJobs]);

    const clearFilters = () => {
        setKeyword(''); setDepartment(ALL); setLocation(ALL);
        setEmploymentType(ALL); setExperienceLevel(ALL); setWorkMode(ALL);
    };

    const scrollToOpenings = () => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });

    // Hero quick-filter tags — apply a filter and jump to the openings list.
    const quickTags = [
        { label: 'Engineering', apply: () => setDepartment('Engineering') },
        { label: 'Design', apply: () => setDepartment('Design') },
        { label: 'Remote', apply: () => setWorkMode('Remote') },
        { label: 'Internships', apply: () => setEmploymentType('Internship') },
    ];

    const heroStats = [
        { icon: Briefcase, value: allJobs.length, label: 'Open Roles' },
        { icon: Building2, value: deptOptions.length, label: 'Departments' },
        { icon: MapPin, value: locOptions.length, label: 'Locations' },
        { icon: Globe, value: remoteCount, label: 'Remote' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276]">
                {/* Background ornaments */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-orange-400/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-2 pb-12 md:pb-16">
                    <Breadcrumbs light items={[{ name: 'Home', url: '/' }, { name: 'Careers' }]} />

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mt-2">
                        {/* Left: content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span>Actively hiring — {allJobs.length} open positions</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight">
                                Join our team &amp; shape the{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-400">future of education</span>
                            </h1>
                            <p className="text-lg text-blue-100/80 mb-7 leading-relaxed max-w-xl">
                                Explore exciting opportunities and build your career with us. We're looking for curious,
                                driven people to help millions of students find their path.
                            </p>

                            {/* Search */}
                            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                                <div className="relative flex-1">
                                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Search jobs by title, skill or department"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-gray-800 placeholder-gray-400 outline-none text-sm shadow-lg focus:ring-2 focus:ring-orange-400/50"
                                    />
                                </div>
                                <button
                                    onClick={scrollToOpenings}
                                    className="px-7 py-3.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-xl shadow-lg text-sm text-center transition-colors whitespace-nowrap cursor-pointer"
                                >
                                    View Openings
                                </button>
                            </div>

                            {/* Quick tags */}
                            <div className="flex flex-wrap items-center gap-2 mt-5">
                                <span className="text-xs text-blue-200/70">Popular:</span>
                                {quickTags.map((tag) => (
                                    <button
                                        key={tag.label}
                                        onClick={() => { tag.apply(); scrollToOpenings(); }}
                                        className="px-3 py-1.5 text-xs font-semibold text-blue-50 bg-white/10 hover:bg-[#F57C00] hover:text-white border border-white/15 hover:border-[#F57C00] rounded-full transition-colors cursor-pointer"
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: illustration + floating badges */}
                        <div className="hidden lg:block relative">
                            <div className="relative rounded-3xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-2xl border border-white/20">
                                <img src="/carrer/Psychotherapy.ef799e6b.svg" alt="Careers at Just Education" className="w-full max-w-md mx-auto" />
                            </div>

                            {/* Floating stat badge - top */}
                            <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 animate-fade-in">
                                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 text-[#F57C00]" />
                                </div>
                                <div>
                                    <div className="text-base font-extrabold text-[#0B3C5D] leading-none">{allJobs.length}</div>
                                    <div className="text-[11px] text-gray-500">Open Roles</div>
                                </div>
                            </div>

                            {/* Floating stat badge - bottom */}
                            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 animate-fade-in">
                                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-base font-extrabold text-[#0B3C5D] leading-none">1M+</div>
                                    <div className="text-[11px] text-gray-500">Students Mentored</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat strip */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
                        {heroStats.map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <stat.icon className="w-5 h-5 text-orange-300" />
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-white leading-none">{stat.value}</div>
                                    <div className="text-xs text-blue-200/70 mt-1">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
                {/* ─── FEATURED ─── */}
                {featured.length > 0 && (
                    <section className="mb-10">
                        <div className="flex items-center gap-2 mb-5">
                            <Star className="w-5 h-5 text-[#F57C00] fill-[#F57C00]" />
                            <h2 className="text-xl font-extrabold text-[#0B3C5D]">Featured Jobs</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {featured.map((job) => <VacancyCard key={job.id} job={job} />)}
                        </div>
                    </section>
                )}

                {/* ─── FILTERS (sidebar) + JOBS (main) ─── */}
                <section id="openings" className="scroll-mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Filter sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                    <h2 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wide">
                                        <SlidersHorizontal className="w-4 h-4" /> Filter Jobs
                                    </h2>
                                    {(activeFilterCount > 0 || keyword) && (
                                        <button onClick={clearFilters} className="inline-flex items-center gap-1 text-xs font-semibold text-[#F57C00] hover:underline cursor-pointer">
                                            <X className="w-3.5 h-3.5" /> Clear
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <FilterSelect label="Department" value={department} options={deptOptions} onChange={setDepartment} />
                                    <FilterSelect label="Location" value={location} options={locOptions} onChange={setLocation} />
                                    <FilterSelect label="Employment Type" value={employmentType} options={employmentTypes} onChange={setEmploymentType} />
                                    <FilterSelect label="Experience Level" value={experienceLevel} options={experienceLevels} onChange={setExperienceLevel} />
                                    <FilterSelect label="Work Mode" value={workMode} options={workModes} onChange={setWorkMode} />
                                </div>
                            </div>
                        </aside>

                        {/* Jobs column */}
                        <div className="lg:col-span-3">
                            {/* Result count + view toggle */}
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {filtered.length} {filtered.length === 1 ? 'Opening' : 'Openings'}
                                </h3>
                                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-gray-100">
                                    <button
                                        onClick={() => setView('grid')}
                                        aria-label="Card view"
                                        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer ${view === 'grid' ? 'bg-white text-[#0B3C5D] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setView('list')}
                                        aria-label="List view"
                                        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer ${view === 'list' ? 'bg-white text-[#0B3C5D] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* ─── GRID / LIST / EMPTY ─── */}
                            {filtered.length > 0 ? (
                                <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'flex flex-col gap-4'}>
                                    {filtered.map((job) => <VacancyCard key={job.id} job={job} view={view} />)}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                        <Briefcase className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-700">Currently no openings available.</h3>
                                    <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                                        No jobs match your current filters. Try clearing them or check back soon — we add new
                                        roles regularly.
                                    </p>
                                    {(activeFilterCount > 0 || keyword) && (
                                        <button onClick={clearFilters} className="mt-6 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#0F4D73] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ─── HOW IT WORKS ─── */}
                <CareerGuidance />

                {/* ─── FAQ ─── */}
                <CareersFaq />
            </div>
        </div>
    );
};

/* FAQ accordion (visible copy of the FAQ schema rendered on the server page). */
const CareersFaq = () => {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="mt-12">
            <h2 className="text-xl font-extrabold text-[#0B3C5D] mb-5">Frequently Asked Questions</h2>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {careersFaqs.map((faq, i) => (
                    <div key={i}>
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                        >
                            <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
                            {open === i ? <Minus className="w-4 h-4 text-[#F57C00] flex-shrink-0" /> : <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                        </button>
                        {open === i && <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CareersListingPage;
