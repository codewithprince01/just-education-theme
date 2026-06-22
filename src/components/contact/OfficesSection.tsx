"use client";

import { useMemo, useState } from 'react';
import {
    Building2,
    Map as MapIcon,
    Users,
    LifeBuoy,
    MapPin,
    Phone,
    Mail,
    Clock,
    Navigation,
    ChevronRight,
    Search,
    X,
    type LucideIcon,
} from 'lucide-react';
import { offices, googleDirectionsLink, type Office } from '@/data/contactConfig';
import { useCountUp } from './useCountUp';
import Reveal from './Reveal';

// ---------------------------------------------------------------------------
// Per-office "showcase" identity — premium display metadata (team, coverage,
// founding year, rating + a unique accent) layered on top of the core data.
// ---------------------------------------------------------------------------
interface Showcase {
    role: string;
    tag: string; // short subtitle shown in the navigator
    region: string;
    team: number;
    since: number;
    rating: number;
    grad: string; // tailwind gradient for the navigator accent
    hex: string; // accent colour for the navigator
    nearby: string[]; // regional cities served
}

const SHOWCASE: Record<string, Showcase> = {
    delhi:      { role: 'National Headquarters',        tag: 'Headquarters', region: 'North India',         team: 180, since: 2016, rating: 4.9, grad: 'from-orange-500 to-amber-500',  hex: '#F97316', nearby: ['Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Ghaziabad'] },
    mumbai:     { role: 'West India Regional Hub',      tag: 'Regional Hub', region: 'West India',          team: 140, since: 2017, rating: 4.8, grad: 'from-rose-500 to-pink-500',     hex: '#F43F5E', nearby: ['Mumbai', 'Thane', 'Navi Mumbai', 'Nashik', 'Surat'] },
    bangalore:  { role: 'Product & Engineering Centre', tag: 'Engineering',  region: 'South India',         team: 165, since: 2017, rating: 4.9, grad: 'from-violet-500 to-purple-500', hex: '#8B5CF6', nearby: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi'] },
    hyderabad:  { role: 'South-Central Ops Hub',        tag: 'Operations',   region: 'South-Central',       team: 95,  since: 2018, rating: 4.8, grad: 'from-cyan-500 to-sky-500',      hex: '#06B6D4', nearby: ['Hyderabad', 'Secunderabad', 'Warangal', 'Vijayawada', 'Guntur'] },
    chennai:    { role: 'Coastal South Centre',         tag: 'South India',  region: 'South India',         team: 88,  since: 2018, rating: 4.7, grad: 'from-teal-500 to-emerald-500',  hex: '#14B8A6', nearby: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'] },
    pune:       { role: 'Learning & Campus Hub',        tag: 'Campus Hub',   region: 'West India',          team: 76,  since: 2019, rating: 4.8, grad: 'from-indigo-500 to-blue-500',   hex: '#6366F1', nearby: ['Pune', 'Pimpri-Chinchwad', 'Nashik', 'Kolhapur', 'Aurangabad'] },
    kolkata:    { role: 'East India Centre',            tag: 'East India',   region: 'East India',          team: 70,  since: 2019, rating: 4.7, grad: 'from-fuchsia-500 to-pink-500',  hex: '#D946EF', nearby: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'] },
    ahmedabad:  { role: 'Gujarat Operations Centre',    tag: 'Gujarat',      region: 'West India',          team: 58,  since: 2020, rating: 4.8, grad: 'from-amber-500 to-orange-500',  hex: '#F59E0B', nearby: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'] },
    jaipur:     { role: 'Rajasthan Regional Centre',    tag: 'Rajasthan',    region: 'North-West India',    team: 48,  since: 2020, rating: 4.7, grad: 'from-pink-500 to-rose-500',     hex: '#EC4899', nearby: ['Jaipur', 'Ajmer', 'Kota', 'Udaipur', 'Jodhpur'] },
    chandigarh: { role: 'North India Hub',              tag: 'North Hub',    region: 'North India',         team: 52,  since: 2021, rating: 4.8, grad: 'from-sky-500 to-cyan-500',      hex: '#0EA5E9', nearby: ['Chandigarh', 'Mohali', 'Panchkula', 'Ludhiana', 'Amritsar'] },
};

const meta = (id: string): Showcase => SHOWCASE[id] ?? SHOWCASE.delhi;


const STATS = [
    { id: 'offices',  value: 10,  suffix: '+',  label: 'Office Locations', icon: Building2 },
    { id: 'states',   value: 28,  suffix: '+',  label: 'States Served',    icon: MapIcon },
    { id: 'students', value: 100, suffix: 'K+', label: 'Students Reached', icon: Users },
    { id: 'support',  value: 24,  suffix: '/7', label: 'Support Coverage', icon: LifeBuoy },
] as const;

export default function OfficesSection() {
    const [selectedId, setSelectedId] = useState<string>(
        offices.find((o) => o.isHeadquarters)?.id ?? offices[0].id,
    );
    const [query, setQuery] = useState('');
    const selected = useMemo(
        () => offices.find((o) => o.id === selectedId) ?? offices[0],
        [selectedId],
    );
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return offices;
        return offices.filter((o) => {
            const t = meta(o.id);
            return [o.city, o.state, o.name, t.tag, t.role].some((f) =>
                f.toLowerCase().includes(q),
            );
        });
    }, [query]);
    const m = meta(selected.id);

    return (
        <section
            id="offices"
            className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-white"
        >
            {/* Premium background — soft blobs + radial glow (no plain white) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-[12%] h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="absolute -bottom-10 right-[8%] h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200/30 blur-3xl" />
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(11,60,93,0.06), transparent 70%)' }}
            />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-10 lg:px-8">
                {/* Header */}
                <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">

                    <h2 className="text-3xl font-extrabold tracking-tight text-[#0B3C5D] md:text-5xl">
                        Serving Every Corner of India
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
                        Our teams operate across major Indian cities, helping students, educators and
                        institutions with local expertise and nationwide support.
                    </p>
                </Reveal>

                {/* Animated stats */}
                <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 md:mb-14 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.id} stat={stat} index={i} />
                    ))}
                </div>

                {/* Deep-link anchors for the map popup's "View Details" — kept
                    out of the moving ticker so the scroll targets stay put. */}
                {offices.map((o) => (
                    <span key={o.id} id={`office-${o.id}`} aria-hidden="true" className="block scroll-mt-28" />
                ))}

                {/* Interactive office explorer */}
                <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
                    {/* Office navigator — manual scroll, hidden scrollbar */}
                    <Reveal direction="left" className="lg:col-span-4">
                        <div className="flex flex-col">
                            <div className="mb-3 flex items-center justify-between px-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#0B3C5D]/50">
                                    Our offices
                                </span>
                                <span className="text-xs font-semibold text-gray-400">
                                    {filtered.length} {filtered.length === 1 ? 'city' : 'cities'}
                                </span>
                            </div>

                            {/* Search */}
                            <div className="relative mb-2.5">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search city or state…"
                                    aria-label="Search offices"
                                    className="w-full rounded-xl border border-gray-200/80 bg-white/70 py-2.5 pl-9 pr-9 text-sm text-gray-700 outline-none backdrop-blur transition focus:border-[#0B3C5D]/40 focus:bg-white focus:ring-4 focus:ring-[#0B3C5D]/10"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        aria-label="Clear search"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-gray-400 transition-colors hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {filtered.length === 0 ? (
                                <div className="flex h-[200px] flex-col items-center justify-center text-center text-gray-400">
                                    <Search className="mb-2 h-6 w-6" />
                                    <p className="text-sm font-medium">No offices match “{query}”.</p>
                                </div>
                            ) : (
                                <ul
                                    tabIndex={0}
                                    aria-label="Select an office"
                                    className="scrollbar-hide h-[332px] space-y-0.5 overflow-y-auto scroll-smooth pr-1 outline-none"
                                    style={{
                                        maskImage:
                                            'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
                                        WebkitMaskImage:
                                            'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
                                    }}
                                >
                                    {filtered.map((o) => (
                                        <OfficeRow
                                            key={o.id}
                                            office={o}
                                            active={o.id === selected.id}
                                            onSelect={() => setSelectedId(o.id)}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Reveal>

                    {/* City profile */}
                    <Reveal direction="right" className="lg:col-span-8">
                        <OfficeDetail office={selected} m={m} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

// ===========================================================================
// Sub-components
// ===========================================================================

function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
    const { ref, value } = useCountUp(stat.value, 1400 + index * 150);
    const Icon = stat.icon;
    return (
        <Reveal delay={index * 80} direction="up">
            <div
                ref={ref}
                className="group rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-sm ring-1 ring-black/[0.03] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
            >
                <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#FF9838] to-[#E65100] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                </span>
                <div className="text-2xl font-black tabular-nums text-[#0B3C5D] sm:text-3xl">
                    {value}
                    {stat.suffix}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-gray-500">{stat.label}</div>
            </div>
        </Reveal>
    );
}

function OfficeRow({
    office,
    active,
    onSelect,
}: {
    office: Office;
    active: boolean;
    onSelect: () => void;
}) {
    const m = meta(office.id);
    return (
        <li>
            <button
                type="button"
                onClick={onSelect}
                aria-pressed={active}
                className="group relative flex w-full items-center gap-3 rounded-xl py-2.5 pl-4 pr-3 text-left transition-colors duration-300"
            >
                {/* active highlight — soft accent wash + ring (never a heavy block) */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500"
                    style={{
                        opacity: active ? 1 : 0,
                        background: `linear-gradient(to right, ${m.hex}1f, ${m.hex}0a 45%, transparent)`,
                        boxShadow: active ? `inset 0 0 0 1px ${m.hex}26` : 'none',
                    }}
                />
                {/* idle hover wash */}
                {!active && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-xl bg-[#0B3C5D]/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                )}
                {/* gradient left border */}
                <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b ${m.grad} transition-all duration-300 ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}
                />
                {/* location icon (brand orange) */}
                <span
                    className={`relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                        active ? 'bg-orange-100' : 'bg-orange-50'
                    }`}
                >
                    <MapPin className="h-3.5 w-3.5 text-[#F57C00] transition-colors duration-300" />
                </span>
                {/* two-line label */}
                <span className="relative min-w-0 flex-1">
                    <span
                        className={`block truncate text-sm font-bold tracking-tight transition-colors duration-300 ${
                            active ? 'text-[#0B3C5D]' : 'text-[#0B3C5D]/70 group-hover:text-[#0B3C5D]'
                        }`}
                    >
                        {office.city}
                    </span>
                    <span
                        className={`block truncate text-[11px] font-medium transition-colors duration-300 ${
                            active ? 'text-gray-500' : 'text-gray-400'
                        }`}
                    >
                        {m.tag}
                    </span>
                </span>
                {/* trailing */}
                {office.isHeadquarters ? (
                    <span className="relative flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                        HQ
                    </span>
                ) : (
                    <ChevronRight
                        className={`relative h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                            active
                                ? 'text-[#0B3C5D]/60'
                                : 'text-gray-300 group-hover:translate-x-0.5 group-hover:text-gray-400'
                        }`}
                    />
                )}
            </button>
        </li>
    );
}

function OfficeDetail({ office, m }: { office: Office; m: Showcase }) {
    const established = String(m.since);
    return (
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            {/* slim brand accent at the very top */}
            <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${m.grad}`} />


            {/* content — re-keyed so it softly fades on each selection */}
            <div key={office.id} className="je-animate-fade-up relative z-10 p-6 sm:p-7">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-[30px] font-extrabold leading-none tracking-tight text-[#0B3C5D] sm:text-[36px]">
                            {office.city}
                        </h3>
                        <p className="mt-2.5 text-base font-semibold text-gray-700">{m.role}</p>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
                            <MapPin className="h-4 w-4 text-[#F57C00]" /> {office.state}, India
                        </p>
                    </div>
                    <span className="hidden flex-shrink-0 items-center rounded-xl border border-orange-200 bg-orange-50/20 px-3 py-1.5 text-center sm:flex sm:flex-col sm:justify-center shadow-sm">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[#C2410C]">
                            Established
                        </span>
                        <span className="block text-base font-extrabold text-[#0B3C5D]">
                            {established}
                        </span>
                    </span>
                </div>

                <div className="my-6 h-px bg-gray-100" />


                {/* BODY — contact (left) + cities (right) */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <h4 className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Contact Information
                        </h4>
                        <div className="space-y-2">
                            <ContactRow icon={MapPin} label="Address" value={office.address} />
                            <ContactRow
                                icon={Phone}
                                label="Phone"
                                value={office.phone}
                                href={`tel:${office.phone.replace(/\s/g, '')}`}
                            />
                            <ContactRow
                                icon={Mail}
                                label="Email"
                                value={office.email}
                                href={`mailto:${office.email}`}
                            />
                            <ContactRow icon={Clock} label="Working Hours" value={office.hours} />
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Cities Served
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {m.nearby.map((c) => (
                                <span
                                    key={c}
                                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 transition-all duration-200 hover:border-orange-250 hover:bg-orange-50/20"
                                >
                                    <MapPin className="h-3 w-3 text-orange-500" />
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                    <a
                        href="#india-map"
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#F57C00] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E65100] hover:shadow-lg"
                    >
                        <MapPin className="h-4 w-4" /> View on Map
                    </a>
                    <a
                        href={googleDirectionsLink(office.lat, office.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3C5D] transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50"
                    >
                        <Navigation className="h-4 w-4 text-[#F57C00] transition-transform duration-300 group-hover:rotate-12" /> Get Directions
                    </a>
                    <a
                        href={`mailto:${office.email}`}
                        className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3C5D] transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50"
                    >
                        <Mail className="h-4 w-4 text-[#F57C00] transition-transform duration-300 group-hover:scale-110" /> Contact Office
                    </a>
                </div>
            </div>
        </div>
    );
}

function ContactRow({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
}) {
    const inner = (
        <>
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-orange-50 text-[#F57C00] transition-colors duration-300 group-hover:bg-orange-100">
                <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {label}
                </span>
                <span className="block break-words text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-[#F57C00]">
                    {value}
                </span>
            </span>
        </>
    );
    const cls = 'group flex items-start gap-3 py-1 transition-colors';
    return href ? (
        <a href={href} className={cls}>
            {inner}
        </a>
    ) : (
        <div className={cls}>{inner}</div>
    );
}


