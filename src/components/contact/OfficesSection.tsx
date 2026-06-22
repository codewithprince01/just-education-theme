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
    ArrowUpRight,
    Star,
    Sparkles,
    Calendar,
    Globe2,
    Crown,
    ChevronRight,
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
    tag: string; // short subtitle shown in the ticker (e.g. "Engineering")
    region: string;
    team: number;
    since: number;
    rating: number;
    grad: string; // tailwind gradient for accent bars / badges / icons
    hex: string; // accent colour for the constellation dots/glow
}

const SHOWCASE: Record<string, Showcase> = {
    delhi:      { role: 'National Headquarters',        tag: 'Headquarters', region: 'North India',         team: 180, since: 2016, rating: 4.9, grad: 'from-orange-500 to-amber-500',  hex: '#F97316' },
    mumbai:     { role: 'West India Regional Hub',      tag: 'Regional Hub', region: 'West India',          team: 140, since: 2017, rating: 4.8, grad: 'from-rose-500 to-pink-500',     hex: '#F43F5E' },
    bangalore:  { role: 'Product & Engineering Centre', tag: 'Engineering',  region: 'South India',         team: 165, since: 2017, rating: 4.9, grad: 'from-violet-500 to-purple-500', hex: '#8B5CF6' },
    hyderabad:  { role: 'South-Central Ops Hub',        tag: 'Operations',   region: 'South-Central',       team: 95,  since: 2018, rating: 4.8, grad: 'from-cyan-500 to-sky-500',      hex: '#06B6D4' },
    chennai:    { role: 'Coastal South Centre',         tag: 'South India',  region: 'South India',         team: 88,  since: 2018, rating: 4.7, grad: 'from-teal-500 to-emerald-500',  hex: '#14B8A6' },
    pune:       { role: 'Learning & Campus Hub',        tag: 'Campus Hub',   region: 'West India',          team: 76,  since: 2019, rating: 4.8, grad: 'from-indigo-500 to-blue-500',   hex: '#6366F1' },
    kolkata:    { role: 'East India Centre',            tag: 'East India',   region: 'East India',          team: 70,  since: 2019, rating: 4.7, grad: 'from-fuchsia-500 to-pink-500',  hex: '#D946EF' },
    ahmedabad:  { role: 'Gujarat Operations Centre',    tag: 'Gujarat',      region: 'West India',          team: 58,  since: 2020, rating: 4.8, grad: 'from-amber-500 to-orange-500',  hex: '#F59E0B' },
    jaipur:     { role: 'Rajasthan Centre',             tag: 'Rajasthan',    region: 'North-West India',    team: 48,  since: 2020, rating: 4.7, grad: 'from-pink-500 to-rose-500',     hex: '#EC4899' },
    chandigarh: { role: 'North India Hub',              tag: 'North Hub',    region: 'North India',         team: 52,  since: 2021, rating: 4.8, grad: 'from-sky-500 to-cyan-500',      hex: '#0EA5E9' },
};

const meta = (id: string): Showcase => SHOWCASE[id] ?? SHOWCASE.delhi;

const STATS = [
    { id: 'offices',  value: 10,  suffix: '+',  label: 'Office Locations', icon: Building2 },
    { id: 'states',   value: 28,  suffix: '+',  label: 'States Served',    icon: MapIcon },
    { id: 'students', value: 100, suffix: 'K+', label: 'Students Reached', icon: Users },
    { id: 'support',  value: 24,  suffix: '/7', label: 'Support Coverage', icon: LifeBuoy },
] as const;

// India "constellation" projection — decorative, not a real map. Maps each
// office lat/lng into a 100×120 box that reads as the shape of the country.
const LNG_MIN = 68, LNG_MAX = 98, LAT_MIN = 6, LAT_MAX = 37;
function project(o: Office) {
    return {
        x: ((o.lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100,
        y: ((LAT_MAX - o.lat) / (LAT_MAX - LAT_MIN)) * 120,
    };
}

export default function OfficesSection() {
    const [selectedId, setSelectedId] = useState<string>(
        offices.find((o) => o.isHeadquarters)?.id ?? offices[0].id,
    );
    const selected = useMemo(
        () => offices.find((o) => o.id === selectedId) ?? offices[0],
        [selectedId],
    );
    const points = useMemo(() => offices.map((o) => ({ o, ...project(o) })), []);
    const m = meta(selected.id);
    const selIdx = offices.findIndex((o) => o.id === selected.id);
    const sel = project(selected);

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
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F57C00] shadow-sm backdrop-blur">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                        </span>
                        Nationwide Presence
                    </span>
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
                                <span className="text-xs font-semibold text-gray-400">{offices.length} cities</span>
                            </div>

                            <ul
                                tabIndex={0}
                                aria-label="Select an office"
                                className="scrollbar-hide h-[380px] space-y-0.5 overflow-y-auto scroll-smooth pr-1 outline-none"
                                style={{
                                    maskImage:
                                        'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
                                    WebkitMaskImage:
                                        'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
                                }}
                            >
                                {offices.map((o) => (
                                    <OfficeRow
                                        key={o.id}
                                        office={o}
                                        active={o.id === selected.id}
                                        onSelect={() => setSelectedId(o.id)}
                                    />
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* City profile */}
                    <Reveal direction="right" className="lg:col-span-8">
                        <OfficeDetail office={selected} m={m} index={selIdx} points={points} sel={sel} />
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
                {/* accent dot */}
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center">
                    {active && (
                        <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full"
                            style={{ backgroundColor: m.hex, opacity: 0.4 }}
                        />
                    )}
                    <span
                        className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: active ? m.hex : '#cbd5e1' }}
                    />
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

function OfficeDetail({
    office,
    m,
    index,
    points,
    sel,
}: {
    office: Office;
    m: Showcase;
    index: number;
    points: { o: Office; x: number; y: number }[];
    sel: { x: number; y: number };
}) {
    const num = String(index + 1).padStart(2, '0');
    return (
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#08263C] via-[#0B3C5D] to-[#0F4D73] shadow-2xl">
            {/* accent glow keyed to the selected city */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: m.hex, opacity: 0.22 }}
            />

            <Constellation points={points} sel={sel} hex={m.hex} selectedId={office.id} />

            {/* left-side readability scrim over the constellation */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#08263C] via-[#08263C]/85 to-transparent"
            />

            {/* content (re-keyed so it cross-fades on each selection) */}
            <div key={office.id} className="je-animate-fade-up relative z-10 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100 backdrop-blur">
                        Office N°{num}
                    </span>
                    {office.isHeadquarters ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                            <Crown className="h-3 w-3" /> Headquarters
                        </span>
                    ) : (
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${m.grad} px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow`}
                        >
                            <Sparkles className="h-3 w-3" /> Regional Office
                        </span>
                    )}
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                        <span className="ml-1 text-white">{m.rating.toFixed(1)}</span>
                    </span>
                </div>

                <h3 className="mt-4 text-[28px] font-black leading-none tracking-tight text-white sm:text-[32px]">
                    {office.city}
                </h3>
                <p className="mt-2 text-sm font-semibold text-orange-300">
                    {m.role}
                    <span className="font-medium text-blue-200/70"> · {office.state}</span>
                </p>

                <div className="mt-4 grid gap-2 text-sm sm:max-w-md">
                    <p className="flex gap-2.5 text-blue-50/90">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-300" />
                        <span className="leading-snug">{office.address}</span>
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <a
                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                            className="inline-flex items-center gap-2 font-medium text-blue-50 transition-colors hover:text-white"
                        >
                            <Phone className="h-4 w-4 text-orange-300" />
                            {office.phone}
                        </a>
                        <a
                            href={`mailto:${office.email}`}
                            className="inline-flex min-w-0 items-center gap-2 font-medium text-blue-50 transition-colors hover:text-white"
                        >
                            <Mail className="h-4 w-4 flex-shrink-0 text-orange-300" />
                            <span className="truncate">{office.email}</span>
                        </a>
                    </div>
                    <p className="inline-flex items-center gap-2 text-blue-50/90">
                        <Clock className="h-4 w-4 text-orange-300" />
                        {office.hours}
                    </p>
                </div>

                {/* mini-stats */}
                <div className="mt-5 grid max-w-md grid-cols-3 gap-2.5">
                    <Chip icon={Users} value={`${m.team}+`} label="Team size" />
                    <Chip icon={Calendar} value={`${m.since}`} label="Established" />
                    <Chip icon={Globe2} value={m.region} label="Coverage" small />
                </div>

                {/* actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <a
                        href="#india-map"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        <MapPin className="h-4 w-4" /> View on Map
                    </a>
                    <a
                        href={googleDirectionsLink(office.lat, office.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                    >
                        <Navigation className="h-4 w-4" /> Get Directions
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}

function Chip({
    icon: Icon,
    value,
    label,
    small,
}: {
    icon: LucideIcon;
    value: string;
    label: string;
    small?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur">
            <Icon className="mx-auto h-4 w-4 text-orange-300" />
            <div className={`mt-1 font-black leading-tight text-white ${small ? 'text-xs' : 'text-lg'}`}>
                {value}
            </div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-200/70">
                {label}
            </div>
        </div>
    );
}

function Constellation({
    points,
    sel,
    hex,
    selectedId,
}: {
    points: { o: Office; x: number; y: number }[];
    sel: { x: number; y: number };
    hex: string;
    selectedId: string;
}) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <div className="relative h-full w-full">
                {/* connection lines from the selected office to every other */}
                <svg
                    viewBox="0 0 100 120"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                >
                    {points.map(({ o, x, y }) =>
                        o.id === selectedId ? null : (
                            <line
                                key={o.id}
                                x1={sel.x}
                                y1={sel.y}
                                x2={x}
                                y2={y}
                                stroke={hex}
                                strokeWidth="0.25"
                                opacity="0.35"
                            />
                        ),
                    )}
                </svg>

                {/* glow under the selected dot */}
                <div
                    className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{ left: `${sel.x}%`, top: `${(sel.y / 120) * 100}%`, backgroundColor: hex, opacity: 0.3 }}
                />

                {/* dots */}
                {points.map(({ o, x, y }) => {
                    const active = o.id === selectedId;
                    return (
                        <span
                            key={o.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${x}%`, top: `${(y / 120) * 100}%` }}
                        >
                            {active && (
                                <span
                                    className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                                    style={{ backgroundColor: hex, opacity: 0.5 }}
                                />
                            )}
                            <span
                                className={`block rounded-full ${active ? 'h-3 w-3' : 'h-1.5 w-1.5 bg-white/40'}`}
                                style={active ? { backgroundColor: hex, boxShadow: `0 0 12px ${hex}` } : undefined}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
