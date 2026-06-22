"use client";

import { useState } from 'react';
import { Globe, Users, Building2, TrendingUp } from 'lucide-react';
import { regions, globalSummary, type Region } from '@/data/contactConfig';
import { accent } from '@/components/blog/theme';
import Reveal from './Reveal';

// Soft continent blobs — stylised, not geographic. Positioned to evoke a world map.
const CONTINENTS = [
    { id: 'na', style: 'left-[10%] top-[24%] w-[20%] h-[34%]' },
    { id: 'sa', style: 'left-[24%] top-[58%] w-[12%] h-[34%]' },
    { id: 'eu', style: 'left-[46%] top-[22%] w-[12%] h-[20%]' },
    { id: 'af', style: 'left-[48%] top-[44%] w-[14%] h-[34%]' },
    { id: 'as', style: 'left-[62%] top-[22%] w-[26%] h-[34%]' },
    { id: 'au', style: 'left-[80%] top-[64%] w-[12%] h-[18%]' },
];

const hub = regions.find((r) => r.id === 'india') ?? regions[0];

export default function GlobalPresence() {
    const [active, setActive] = useState<Region>(hub);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#082A42] via-[#0B3C5D] to-[#0D4B75] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-white/15 text-orange-200">
                        <Globe className="w-3.5 h-3.5" /> Global Presence
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                        Trusted by teams around the world
                    </h2>
                    <p className="mt-4 text-blue-100">
                        Headquartered in India, serving learners and institutions across five regions.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-12">
                    {globalSummary.map((s, i) => (
                        <Reveal key={s.id} delay={i * 100} className="text-center">
                            <div className="text-2xl sm:text-4xl font-black text-orange-400">{s.value}</div>
                            <div className="mt-1 text-[11px] sm:text-sm text-blue-100">{s.label}</div>
                        </Reveal>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Stylised world map */}
                    <div className="lg:col-span-2">
                        <div className="relative w-full aspect-[2/1] rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
                            {/* dotted grid */}
                            <div
                                className="absolute inset-0 opacity-20"
                                aria-hidden="true"
                                style={{
                                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                                    backgroundSize: '18px 18px',
                                }}
                            />
                            {/* continent blobs */}
                            {CONTINENTS.map((c) => (
                                <div
                                    key={c.id}
                                    aria-hidden="true"
                                    className={`absolute rounded-[40%] bg-white/10 blur-sm ${c.style}`}
                                />
                            ))}

                            {/* connection lines from hub to each region */}
                            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
                                {regions
                                    .filter((r) => r.id !== hub.id)
                                    .map((r) => (
                                        <line
                                            key={r.id}
                                            className="je-flow"
                                            x1={hub.x}
                                            y1={hub.y / 2}
                                            x2={r.x}
                                            y2={r.y / 2}
                                            stroke="#F57C00"
                                            strokeOpacity={active.id === r.id || active.id === hub.id ? 0.8 : 0.3}
                                            strokeWidth={active.id === r.id || active.id === hub.id ? 0.6 : 0.4}
                                            strokeDasharray="2 2"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    ))}
                            </svg>

                            {/* region markers */}
                            {regions.map((r) => {
                                const isActive = r.id === active.id;
                                return (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => setActive(r)}
                                        onMouseEnter={() => setActive(r)}
                                        aria-label={`${r.name} region`}
                                        aria-pressed={isActive}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 group/region"
                                        style={{ left: `${r.x}%`, top: `${r.y}%` }}
                                    >
                                        <span className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-orange-400 opacity-70 animate-ping" aria-hidden="true" />
                                        <span
                                            className={`relative block rounded-full border-2 border-white shadow-md transition-all ${
                                                isActive ? 'h-5 w-5 bg-orange-500 ring-4 ring-orange-500/30' : 'h-3.5 w-3.5 bg-orange-400 group-hover/region:scale-125'
                                            }`}
                                        />
                                        <span
                                            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#0B3C5D] shadow transition-opacity ${
                                                isActive ? 'opacity-100' : 'opacity-0 group-hover/region:opacity-100'
                                            }`}
                                        >
                                            {r.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active region detail */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-6">
                            <div className="flex items-center gap-2 text-orange-300">
                                <Globe className="w-5 h-5" />
                                <span className="text-sm font-semibold uppercase tracking-wide">{active.name}</span>
                            </div>
                            <div className="mt-5 space-y-4">
                                <Metric icon={<Building2 className="w-4 h-4" />} label="Clients" value={active.clients} />
                                <Metric icon={<Users className="w-4 h-4" />} label="Active users" value={active.activeUsers} />
                                <Metric icon={<TrendingUp className="w-4 h-4" />} label="YoY growth" value={active.growth} highlight />
                            </div>
                            <div className="mt-6 grid grid-cols-5 gap-1.5">
                                {regions.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => setActive(r)}
                                        aria-label={r.name}
                                        className={`h-1.5 rounded-full transition-colors ${r.id === active.id ? 'bg-orange-400' : 'bg-white/25 hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* All-region quick grid */}
                        <div className="mt-4 grid grid-cols-1 gap-2">
                            {regions.map((r) => {
                                const a = accent(r.accent);
                                return (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => setActive(r)}
                                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm border transition-all ${
                                            r.id === active.id ? 'bg-white/15 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2 font-semibold">
                                            <span className={`h-2.5 w-2.5 rounded-full ${a.solid}`} />
                                            {r.name}
                                        </span>
                                        <span className="text-orange-300 font-bold">{r.growth}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Metric({
    icon,
    label,
    value,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0">
            <span className="flex items-center gap-2 text-sm text-blue-100">
                <span className="text-orange-300">{icon}</span>
                {label}
            </span>
            <span className={`text-xl font-black ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</span>
        </div>
    );
}
