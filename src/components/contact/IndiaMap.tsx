"use client";

import { useCallback, useRef, useState } from 'react';
import {
    MapPin, Phone, Mail, Clock, Navigation, Plus, Minus, Maximize2, Building2,
} from 'lucide-react';
import { offices, INDIA_BOUNDS, googleMapsLink, type Office } from '@/data/contactConfig';

// --- Projection: geographic lat/lng -> 0..100 normalised SVG/percent space ---
const LNG_SPAN = INDIA_BOUNDS.east - INDIA_BOUNDS.west;
const LAT_SPAN = INDIA_BOUNDS.north - INDIA_BOUNDS.south;

function projX(lng: number) {
    return ((lng - INDIA_BOUNDS.west) / LNG_SPAN) * 100;
}
function projY(lat: number) {
    return ((INDIA_BOUNDS.north - lat) / LAT_SPAN) * 100;
}

// Simplified India mainland boundary (lng, lat), clockwise from the north.
// Real-ish coordinates so the silhouette aligns with the projected city markers.
const OUTLINE: [number, number][] = [
    [74.0, 35.2], [78.5, 32.5], [80.5, 30.5], [83.5, 29.0], [88.2, 27.2],
    [92.0, 27.8], [95.5, 28.2], [94.5, 25.0], [92.5, 23.2], [91.0, 23.8],
    [89.5, 22.0], [87.2, 21.5], [86.5, 20.2], [84.0, 18.5], [82.0, 16.8],
    [80.3, 13.1], [79.8, 10.3], [77.5, 8.1], [76.0, 9.5], [75.0, 12.0],
    [74.0, 14.8], [73.0, 17.5], [72.7, 19.2], [72.6, 21.0], [70.0, 21.0],
    [68.8, 22.5], [68.2, 23.8], [70.5, 25.0], [70.2, 27.5], [72.5, 29.5],
    [74.5, 32.0], [74.0, 35.2],
];

const outlinePath =
    OUTLINE.map(([lng, lat], i) => `${i === 0 ? 'M' : 'L'}${projX(lng).toFixed(2)},${projY(lat).toFixed(2)}`).join(' ') +
    ' Z';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function IndiaMap() {
    const [selected, setSelected] = useState<Office>(
        offices.find((o) => o.isHeadquarters) ?? offices[0],
    );
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const stageRef = useRef<HTMLDivElement>(null);
    const drag = useRef<{ active: boolean; sx: number; sy: number; ox: number; oy: number; moved: boolean }>(
        { active: false, sx: 0, sy: 0, ox: 0, oy: 0, moved: false },
    );

    const zoom = useCallback((factor: number) => {
        setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(s * factor).toFixed(2))));
    }, []);

    const reset = useCallback(() => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    }, []);

    const onPointerDown = (e: React.PointerEvent) => {
        drag.current = { active: true, sx: e.clientX, sy: e.clientY, ox: offset.x, oy: offset.y, moved: false };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.sx;
        const dy = e.clientY - drag.current.sy;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.current.moved = true;
        setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
    };
    const onPointerUp = (e: React.PointerEvent) => {
        drag.current.active = false;
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    };

    return (
        <section id="india-map" className="scroll-mt-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-orange-50 text-[#F57C00]">
                        Find Us
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B3C5D] tracking-tight">
                        Explore our locations on the map
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Tap any marker to see that office&apos;s details. Use the controls to zoom and drag to pan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Map stage */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0F4D73] shadow-xl overflow-hidden">
                            {/* dotted texture */}
                            <div
                                className="absolute inset-0 opacity-[0.15]"
                                aria-hidden="true"
                                style={{
                                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                                    backgroundSize: '22px 22px',
                                }}
                            />

                            <div
                                ref={stageRef}
                                onPointerDown={onPointerDown}
                                onPointerMove={onPointerMove}
                                onPointerUp={onPointerUp}
                                onPointerLeave={onPointerUp}
                                className="relative w-full aspect-[4/5] sm:aspect-square touch-none cursor-grab active:cursor-grabbing select-none"
                                role="application"
                                aria-label="Interactive map of Just Education offices in India"
                            >
                                {/* Pan/zoom layer */}
                                <div
                                    className="absolute inset-0 transition-transform duration-150 ease-out"
                                    style={{
                                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                                        transformOrigin: '50% 50%',
                                    }}
                                >
                                    {/* India silhouette */}
                                    <svg
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        className="absolute inset-0 w-full h-full"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                                                <stop offset="100%" stopColor="#F57C00" stopOpacity="0.12" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={outlinePath}
                                            fill="url(#india-fill)"
                                            stroke="#ffffff"
                                            strokeOpacity="0.55"
                                            strokeWidth="0.6"
                                            strokeLinejoin="round"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>

                                    {/* Markers */}
                                    {offices.map((office) => {
                                        const isActive = office.id === selected.id;
                                        return (
                                            <button
                                                key={office.id}
                                                type="button"
                                                onPointerDown={(e) => e.stopPropagation()}
                                                onClick={() => {
                                                    if (!drag.current.moved) setSelected(office);
                                                }}
                                                aria-label={`${office.city} office`}
                                                aria-pressed={isActive}
                                                className="absolute -translate-x-1/2 -translate-y-1/2 group/marker"
                                                style={{ left: `${projX(office.lng)}%`, top: `${projY(office.lat)}%` }}
                                            >
                                                {/* pulse ring */}
                                                <span
                                                    className={`absolute inset-0 m-auto h-3 w-3 rounded-full ${isActive ? 'bg-orange-400' : 'bg-orange-300'} opacity-75 animate-ping`}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className={`relative block rounded-full border-2 border-white shadow-md transition-all duration-200 ${
                                                        isActive
                                                            ? 'h-5 w-5 bg-orange-500 ring-4 ring-orange-500/30'
                                                            : 'h-3.5 w-3.5 bg-orange-400 group-hover/marker:scale-125'
                                                    }`}
                                                    style={{ transform: `scale(${1 / scale})` }}
                                                />
                                                {/* label on hover/active */}
                                                <span
                                                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#0B3C5D] shadow transition-opacity ${
                                                        isActive ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'
                                                    }`}
                                                    style={{ transform: `scale(${1 / scale})`, transformOrigin: 'center bottom' }}
                                                >
                                                    {office.city}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Zoom / pan controls */}
                                <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
                                    <button
                                        type="button"
                                        onClick={() => zoom(1.4)}
                                        aria-label="Zoom in"
                                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur text-[#0B3C5D] shadow-lg flex items-center justify-center hover:bg-white hover:text-[#F57C00] transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => zoom(1 / 1.4)}
                                        aria-label="Zoom out"
                                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur text-[#0B3C5D] shadow-lg flex items-center justify-center hover:bg-white hover:text-[#F57C00] transition-colors"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={reset}
                                        aria-label="Reset map view"
                                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur text-[#0B3C5D] shadow-lg flex items-center justify-center hover:bg-white hover:text-[#F57C00] transition-colors"
                                    >
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* legend */}
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] shadow">
                                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                                    {offices.length} offices
                                </div>
                            </div>
                        </div>

                        {/* City chips */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {offices.map((office) => (
                                <button
                                    key={office.id}
                                    type="button"
                                    onClick={() => setSelected(office)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                                        office.id === selected.id
                                            ? 'bg-[#F57C00] text-white border-[#F57C00]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#F57C00] hover:text-[#F57C00]'
                                    }`}
                                >
                                    {office.city}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Selected office detail */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] p-5 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-orange-300" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold">{selected.city}</h3>
                                            {selected.isHeadquarters && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500 px-2 py-0.5 rounded-full">
                                                    HQ
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-blue-100">{selected.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 space-y-4 text-sm">
                                <p className="flex gap-2.5 text-gray-600">
                                    <MapPin className="w-4 h-4 text-[#F57C00] flex-shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{selected.address}</span>
                                </p>
                                <a href={`tel:${selected.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0B3C5D] font-medium">
                                    <Phone className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                    {selected.phone}
                                </a>
                                <a href={`mailto:${selected.email}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0B3C5D] font-medium truncate">
                                    <Mail className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                    <span className="truncate">{selected.email}</span>
                                </a>
                                <p className="flex items-center gap-2.5 text-gray-600">
                                    <Clock className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                    {selected.hours}
                                </p>
                                <a
                                    href={googleMapsLink(selected.mapsQuery)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0B3C5D] hover:bg-[#0F4D73] text-white text-sm font-semibold transition-colors"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
