"use client";

import { GraduationCap } from 'lucide-react';
import Icon from './Icon';
import { useInView } from './useParallax';
import { networkNodes } from '../../data/about';

const RADIUS = 40;
const positions = networkNodes.map((_, i) => {
    const angle = (-90 + i * (360 / networkNodes.length)) * (Math.PI / 180);
    return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

// Decorative icons drifting in the background.
const FLOATERS = [
    { icon: 'BookOpen', cls: 'top-[12%] left-[8%] je-float' },
    { icon: 'Award', cls: 'top-[20%] right-[10%] je-float-slow' },
    { icon: 'Wallet', cls: 'bottom-[16%] left-[12%] je-float-slow' },
    { icon: 'ClipboardList', cls: 'bottom-[12%] right-[14%] je-float' },
    { icon: 'Sparkles', cls: 'top-[44%] left-[3%] je-float' },
];

const NetworkVisual = () => {
    const { ref, inView } = useInView(0.2);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 md:py-28 bg-gradient-to-br from-[#0A2E49] via-[#0B3C5D] to-[#0A2E49] text-white overflow-hidden">
            {/* floating background icons */}
            <div className="absolute inset-0 pointer-events-none">
                {FLOATERS.map((f, i) => (
                    <span key={i} className={`absolute ${f.cls} text-white/[0.07]`}>
                        <Icon name={f.icon} className="w-16 h-16" />
                    </span>
                ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 bg-white/10 px-3 py-1 rounded-full mb-4">The JustEducation Network</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Connecting students with opportunities</h2>
                    <p className="mt-4 text-blue-100 text-lg">One student, an entire ecosystem of educational possibilities.</p>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[38rem]">
                    {/* connections */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#F57C00" stopOpacity="0.9" />
                                <stop offset="1" stopColor="#60A5FA" stopOpacity="0.4" />
                            </linearGradient>
                        </defs>
                        {positions.map((p, i) => (
                            <line
                                key={i}
                                x1="50" y1="50" x2={p.x} y2={p.y}
                                stroke="url(#net-line)" strokeWidth="0.35"
                                className={`je-draw-line ${inView ? 'is-drawn' : ''}`}
                                style={{ ['--len' as string]: '50', animationDelay: `${i * 80}ms` }}
                            />
                        ))}
                    </svg>

                    {/* center student with pulse */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <span className="absolute inset-0 rounded-full bg-orange-500/40 je-pulse-ring" />
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl flex flex-col items-center justify-center ring-8 ring-white/10">
                            <GraduationCap className="w-9 h-9 md:w-11 md:h-11 text-white" />
                            <span className="text-sm font-extrabold text-white mt-1.5">Student</span>
                        </div>
                    </div>

                    {/* nodes */}
                    {networkNodes.map((node, i) => {
                        const p = positions[i];
                        return (
                            <div
                                key={node.label}
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5 transition-all duration-500"
                                style={{
                                    top: `${p.y}%`, left: `${p.x}%`,
                                    opacity: inView ? 1 : 0,
                                    transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.6})`,
                                    transitionDelay: `${i * 80}ms`,
                                }}
                            >
                                <span className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg je-float" style={{ animationDelay: `${i * 200}ms` }}>
                                    <Icon name={node.icon} className="w-5 h-5 md:w-6 md:h-6 text-orange-300" />
                                </span>
                                <span className="text-[10px] md:text-xs font-semibold text-blue-50 whitespace-nowrap">{node.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NetworkVisual;
