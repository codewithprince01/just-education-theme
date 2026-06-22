"use client";

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import Icon from './Icon';
import { useInView } from './useParallax';
import { ecosystemFull } from '../../data/about';

// Evenly distribute the nodes on a circle (start at top, go clockwise).
const RADIUS = 42; // % of the square container
const positions = ecosystemFull.map((_, i) => {
    const angle = (-90 + i * (360 / ecosystemFull.length)) * (Math.PI / 180);
    return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

const EcosystemGraph = () => {
    const { ref, inView } = useInView(0.2);
    const [active, setActive] = useState<number | null>(null);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">The Bigger Picture</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Building India&apos;s education ecosystem
                    </h2>
                    <p className="mt-4 text-gray-500 text-lg">
                        JustEducation connects students to every part of the educational landscape. Hover a node to see how it links in.
                    </p>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[40rem]">
                    {/* connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        {positions.map((p, i) => {
                            const isActive = active === i;
                            const dim = active !== null && !isActive;
                            return (
                                <line
                                    key={i}
                                    x1="50" y1="50" x2={p.x} y2={p.y}
                                    stroke={isActive ? '#F57C00' : '#CBD5E1'}
                                    strokeWidth={isActive ? 0.7 : 0.3}
                                    strokeOpacity={dim ? 0.12 : isActive ? 1 : 0.5}
                                    strokeDasharray={isActive ? undefined : '1.5 1.5'}
                                    className={`je-draw-line ${inView ? 'is-drawn' : ''} transition-all duration-300`}
                                    style={{ ['--len' as string]: '60', transitionDelay: `${i * 60}ms` }}
                                />
                            );
                        })}
                    </svg>

                    {/* center hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#126094] shadow-2xl flex flex-col items-center justify-center text-center z-20 ring-8 ring-white">
                        <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
                        <span className="text-[11px] md:text-sm font-extrabold text-white mt-1.5 tracking-wide leading-tight px-2">JUST<br />EDUCATION</span>
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
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 group outline-none transition-all duration-300"
                                style={{
                                    top: `${p.y}%`, left: `${p.x}%`,
                                    opacity: !inView ? 0 : dim ? 0.4 : 1,
                                    transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`,
                                    transitionDelay: inView ? `${i * 60}ms` : '0ms',
                                }}
                            >
                                <span className={`w-12 h-12 md:w-[3.4rem] md:h-[3.4rem] rounded-2xl flex items-center justify-center shadow-md border transition-colors duration-300 ${
                                    isActive ? 'bg-[#0B3C5D] border-[#0B3C5D]' : 'bg-white border-gray-200 group-hover:border-orange-400'
                                }`}>
                                    <Icon name={node.icon} className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-orange-400' : 'text-[#0B3C5D]'}`} />
                                </span>
                                <span className={`text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors ${isActive ? 'text-[#F57C00]' : 'text-gray-600'}`}>
                                    {node.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EcosystemGraph;
