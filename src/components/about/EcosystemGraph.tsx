"use client";

import { useState } from 'react';
import { GraduationCap, Layers } from 'lucide-react';
import SectionHeading from '@/components/blog/SectionHeading';
import Icon from './Icon';
import { useInView } from './useParallax';
import { ecosystemFull } from '../../data/about';

const NODE_DESCRIPTIONS: Record<string, string> = {
    'Colleges': 'Explore detailed profiles, fees, placements, and eligibility criteria for over 45,000+ colleges across India.',
    'Universities': 'Discover central, state, private, and deemed universities, compare their rankings and official details.',
    'Schools': 'Find board affiliations, infrastructure details, fee ranges, and admission dates for schools across regions.',
    'Courses': 'Search through thousands of UG, PG, diploma, and certificate courses with structured eligibility and fees.',
    'Exams': 'Track application deadlines, exam patterns, cut-offs, syllabi, and results for major national entrance exams.',
    'Scholarships': 'Browse financial aids, merit awards, and need-based scholarships with detailed benefits and application processes.',
    'Admissions': 'Understand official cut-offs, counselling timelines, seat matrices, and step-by-step application guidelines.',
    'Coaching Institutes': 'Find coaching centres, study programs, and preparation options for academic and competitive exams.',
    'Results': 'Access live updates on entrance results, merit lists, and board exam scores as soon as they are announced.',
    'Rankings': 'Review verified NIRF, India Today, and global rankings to benchmark college quality and academic standings.',
    'Careers': 'Map various courses and exams to realistic career options, salary trends, and employment pathways.',
    'Study Abroad': 'Explore international universities, student visa requirements, TOEFL/IELTS timelines, and global opportunities.',
    'Educational News': 'Read daily educational updates, policy shifts, exam announcements, and crucial notifications.',
};

// Pull the orbit in so node labels never spill past the diagram. The container
// reserves side padding (below) so edge labels have room to breathe.
const RADIUS = 38; // % of the square container
const positions = ecosystemFull.map((_, i) => {
    const angle = (-90 + i * (360 / ecosystemFull.length)) * (Math.PI / 180);
    return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

const EcosystemGraph = () => {
    const { ref, inView } = useInView(0.2);
    const [active, setActive] = useState<number | null>(null);

    return (
        <section id="ecosystem" ref={ref as React.RefObject<HTMLElement>} className="pt-16 pb-24 md:pt-20 md:pb-28 bg-white border-b border-gray-100">
            {/* Inline CSS for solid flowing line animation */}
            <style dangerouslySetInnerHTML={{ __html: `
                .je-bg-line {
                    transition: opacity 0.8s ease-in-out !important;
                }
                .je-active-line {
                    stroke-dasharray: 40;
                    stroke-dashoffset: 40;
                    transition: stroke-dashoffset 0.8s ease-in-out, opacity 0.8s ease-in-out !important;
                }
                .je-active-line-active {
                    stroke-dasharray: 40;
                    stroke-dashoffset: 0;
                    transition: stroke-dashoffset 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-in-out !important;
                }
            `}} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Title & Dynamic Hover Details Card */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <SectionHeading
                             title="Building India's education ecosystem"
                             subtitle="JustEducation connects students to every part of the educational landscape."
                             icon={<Layers className="w-5 h-5" />}
                             className="mb-0"
                        />
                        
                        {/* Dynamic Hover Details Card */}
                        <div className="mt-8 p-6 rounded-2xl border border-gray-200 bg-gray-50/50 backdrop-blur-sm lg:h-[190px] h-auto flex flex-col justify-start transition-all duration-300 hover:border-orange-300 shadow-sm hover:shadow-md overflow-hidden">
                            {active !== null ? (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-2.5 text-[#0B3C5D] font-bold">
                                        <span className="w-8 h-8 rounded-lg bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center">
                                            <Icon name={ecosystemFull[active].icon} className="w-4.5 h-4.5 text-[#0B3C5D]" />
                                        </span>
                                        <span className="text-base text-gray-900">{ecosystemFull[active].label}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3.5 leading-relaxed">
                                        {NODE_DESCRIPTIONS[ecosystemFull[active].label] ?? 'Information structured to guide and simplify your educational journey.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-2.5 text-[#0B3C5D] font-bold">
                                        <span className="w-8 h-8 rounded-lg bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center">
                                            <GraduationCap className="w-4.5 h-4.5 text-orange-500" />
                                        </span>
                                        <span className="text-base text-gray-900">About JustEducation</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3.5 leading-relaxed">
                                        JustEducation is India&apos;s premier education discovery platform, dedicated to bringing transparency, structured clarity, and trust to academic decision-making. We help students navigate colleges, courses, exams, and careers with verified, student-first information.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Orbit Graph */}
                    <div className="lg:col-span-7">
                        {/* px reserves room so the leftmost/rightmost labels stay inside */}
                        <div className="px-6 sm:px-12 lg:px-14">
                            <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
                                {/* connection lines */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                    {positions.map((p, i) => {
                                        const isActive = active === i;
                                        return (
                                            <g key={i}>
                                                {/* Background solid line */}
                                                <line
                                                    x1="50" y1="50" x2={p.x} y2={p.y}
                                                    stroke="#CBD5E1"
                                                    strokeWidth="0.8"
                                                    className="je-bg-line"
                                                    style={{
                                                        opacity: !inView ? 0 : (active !== null && !isActive ? 0.15 : 0.6),
                                                        transitionDelay: inView ? `${i * 40}ms` : '0ms',
                                                    }}
                                                />
                                                {/* Active solid line with drawing animation */}
                                                <line
                                                    x1="50" y1="50" x2={p.x} y2={p.y}
                                                    stroke="#F57C00"
                                                    strokeWidth="0.8"
                                                    className={isActive ? 'je-active-line-active' : 'je-active-line'}
                                                    style={{
                                                        opacity: isActive ? 1 : 0,
                                                    }}
                                                />
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* center hub */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#126094] shadow-xl flex flex-col items-center justify-center text-center z-20 ring-8 ring-white">
                                    <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-orange-400" />
                                    <span className="text-[10px] md:text-xs font-extrabold text-white mt-1 tracking-wide leading-tight">JUST<br />EDUCATION</span>
                                </div>

                                {/* nodes */}
                                {ecosystemFull.map((node, i) => {
                                    const p = positions[i];
                                    const isActive = active === i;
                                    const dim = active !== null && !isActive;
                                    return (
                                        <button
                                            key={node.label}
                                            onMouseEnter={() => setActive(i)}
                                            onMouseLeave={() => setActive(null)}
                                            onFocus={() => setActive(i)}
                                            onBlur={() => setActive(null)}
                                            className="absolute z-10 flex items-center justify-center group outline-none transition-all duration-300"
                                            style={{
                                                top: `${p.y}%`, left: `${p.x}%`,
                                                width: '3rem', height: '3rem',
                                                marginLeft: '-1.5rem',
                                                marginTop: '-1.5rem',
                                                opacity: !inView ? 0 : dim ? 0.45 : 1,
                                                transform: `scale(${isActive ? 1.08 : 1})`,
                                                transitionDelay: inView ? `${i * 40}ms` : '0ms',
                                            }}
                                        >
                                            <span className={`w-full h-full rounded-2xl flex items-center justify-center shadow-sm border transition-colors duration-300 ${
                                                isActive ? 'bg-[#0B3C5D] border-[#0B3C5D]' : 'bg-white border-gray-200 group-hover:border-orange-400'
                                            }`}>
                                                <Icon name={node.icon} className={`w-5 h-5 ${isActive ? 'text-orange-400' : 'text-[#0B3C5D]'}`} />
                                            </span>
                                            <span className={`absolute left-1/2 -translate-x-1/2 text-[11px] font-bold leading-tight text-center transition-colors whitespace-nowrap ${
                                                isActive ? 'text-[#F57C00]' : 'text-gray-600'
                                            } ${p.y < 50 ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                                                {node.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemGraph;
