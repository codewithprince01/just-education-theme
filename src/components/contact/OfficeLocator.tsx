"use client";

import 'maplibre-gl/dist/maplibre-gl.css';
import {
    Map as MaplibreMap,
    Marker,
    Popup,
    NavigationControl,
    AttributionControl,
    type StyleSpecification,
} from 'maplibre-gl';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    Building2,
    Search,
    MapPin,
    Phone,
    Mail,
    Clock,
    Navigation,
    ChevronRight,
    X,
    LocateFixed,
    Loader2,
    Globe2,
    MapPinOff,
    RotateCcw,
} from 'lucide-react';

import {
    offices,
    INDIA_VIEW,
    googleDirectionsLink,
    haversineKm,
    type Office,
} from '@/data/contactConfig';
import { useCountUp } from './useCountUp';
import Reveal from './Reveal';

// ---------------------------------------------------------------------------
// Map style — CARTO "Voyager" raster basemap. Clean, modern, premium SaaS look
// (the Stripe / Airbnb aesthetic) and crucially needs NO API token, so it works
// out of the box. Swapping to a Mapbox/MapLibre vector style is a one-liner.
// ---------------------------------------------------------------------------
const MAP_STYLE: StyleSpecification = {
    version: 8,
    sources: {
        carto: {
            type: 'raster',
            tiles: [
                'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            ],
            tileSize: 256,
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> © <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
        },
    },
    layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#e7eef3' } },
        { id: 'carto', type: 'raster', source: 'carto' },
    ],
};


export default function OfficeLocator() {
    const headquarters = useMemo(
        () => offices.find((o) => o.isHeadquarters) ?? offices[0],
        [],
    );
    const officeById = useMemo(() => {
        const m: Record<string, Office> = {};
        offices.forEach((o) => (m[o.id] = o));
        return m;
    }, []);

    const [selectedId, setSelectedId] = useState<string>(headquarters.id);
    const [showPopup, setShowPopup] = useState(false);
    const [query, setQuery] = useState('');
    const [locating, setLocating] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [nearest, setNearest] = useState<{ id: string; km: number } | null>(null);

    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [markerEls, setMarkerEls] = useState<Record<string, HTMLDivElement>>({});
    const [popupEl, setPopupEl] = useState<HTMLDivElement | null>(null);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MaplibreMap | null>(null);
    const markersRef = useRef<Record<string, Marker>>({});
    const popupRef = useRef<Popup | null>(null);
    const userMarkerRef = useRef<Marker | null>(null);
    const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    // -- Fly + select helper -------------------------------------------------
    const flyTo = useCallback((office: Office) => {
        mapRef.current?.flyTo({
            center: [office.lng, office.lat],
            zoom: INDIA_VIEW.officeZoom,
            speed: 1.2,
            curve: 1.5,
            essential: true,
        });
    }, []);

    const selectOffice = useCallback(
        (id: string, opts: { fly?: boolean; popup?: boolean } = {}) => {
            const { fly = true, popup = true } = opts;
            setSelectedId(id);
            setShowPopup(popup);
            if (fly && officeById[id]) flyTo(officeById[id]);
        },
        [officeById, flyTo],
    );

    // -- Initialise the map (once; re-runs when the user hits "Retry") -------
    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return;

        let map: MaplibreMap;
        try {
            map = new MaplibreMap({
                container: mapContainer.current,
                style: MAP_STYLE,
                center: INDIA_VIEW.center,
                zoom: INDIA_VIEW.zoom,
                minZoom: 3.6,
                maxZoom: 15,
                maxBounds: INDIA_VIEW.maxBounds,
                attributionControl: false,
                dragRotate: false,
                pitchWithRotate: false,
            });
        } catch (err) {
            // WebGL unavailable / blocked → show the graceful fallback, never a blank box.
            console.error('[OfficeLocator] Map failed to initialise:', err);
            setMapError(true);
            return;
        }
        mapRef.current = map;

        map.addControl(
            new NavigationControl({ showCompass: false, visualizePitch: false }),
            'bottom-right',
        );
        map.addControl(new AttributionControl({ compact: true }), 'bottom-left');

        // Empty DOM nodes for each office marker — React fills them via portals.
        const els: Record<string, HTMLDivElement> = {};
        offices.forEach((office, i) => {
            const el = document.createElement('div');
            el.style.setProperty('--i', String(i));
            const marker = new Marker({ element: el, anchor: 'bottom' })
                .setLngLat([office.lng, office.lat])
                .addTo(map);
            markersRef.current[office.id] = marker;
            els[office.id] = el;
        });

        // One shared popup; React portals the card into it.
        const pEl = document.createElement('div');
        popupRef.current = new Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 54,
            maxWidth: '328px',
            className: 'je-popup',
        }).setDOMContent(pEl);

        map.on('load', () => {
            setMapReady(true);
            // The container can settle to its final size slightly after mount
            // (lazy reveal, font swap, scrollbar). Sync the GL canvas so the
            // first paint fills the frame with tiles instead of clipping.
            map.resize();
        });
        map.on('click', () => setShowPopup(false));
        map.on('error', (e) => {
            // Single-tile 404s are transient and self-heal — ignore them. Only a
            // genuinely fatal error (lost WebGL context, style/source load failure)
            // should fall back to the error UI.
            const message = String((e as { error?: Error })?.error?.message ?? '');
            if (/webgl|context lost|failed to (initialize|load)/i.test(message)) {
                console.error('[OfficeLocator] Fatal map error:', message);
                setMapError(true);
            }
        });

        setMarkerEls(els);
        setPopupEl(pEl);

        return () => {
            map.remove();
            mapRef.current = null;
            markersRef.current = {};
            popupRef.current = null;
            userMarkerRef.current = null;
        };
    }, [reloadKey]);

    // -- Tear down and re-create the map after a fatal error ----------------
    const retryMap = useCallback(() => {
        setMapError(false);
        setMapReady(false);
        setReloadKey((k) => k + 1);
    }, []);

    // -- Keep the map sized to its (responsive) container -------------------
    useEffect(() => {
        const map = mapRef.current;
        const node = mapContainer.current;
        if (!map || !node || typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(() => map.resize());
        ro.observe(node);
        return () => ro.disconnect();
    }, [mapReady]);

    // -- Drive the popup from selection state -------------------------------
    useEffect(() => {
        const map = mapRef.current;
        const popup = popupRef.current;
        if (!map || !popup) return;
        const office = selectedId ? officeById[selectedId] : null;
        if (showPopup && office) {
            popup.setLngLat([office.lng, office.lat]).addTo(map);
        } else {
            popup.remove();
        }
    }, [showPopup, selectedId, officeById, mapReady]);

    // -- Scroll the active card into view inside the sidebar ----------------
    useEffect(() => {
        if (!selectedId) return;
        cardRefs.current[selectedId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [selectedId]);

    // -- Geolocation: find & highlight the nearest office -------------------
    const findNearest = useCallback(() => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            setGeoError('Location services are not available in this browser.');
            return;
        }
        setLocating(true);
        setGeoError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                let best = offices[0];
                let bestKm = Infinity;
                for (const o of offices) {
                    const km = haversineKm(latitude, longitude, o.lat, o.lng);
                    if (km < bestKm) {
                        bestKm = km;
                        best = o;
                    }
                }
                setNearest({ id: best.id, km: bestKm });

                const map = mapRef.current;
                if (map) {
                    if (!userMarkerRef.current) {
                        const el = document.createElement('div');
                        el.className = 'je-user-marker';
                        el.title = 'Your location';
                        userMarkerRef.current = new Marker({ element: el })
                            .setLngLat([longitude, latitude])
                            .addTo(map);
                    } else {
                        userMarkerRef.current.setLngLat([longitude, latitude]);
                    }
                }
                selectOffice(best.id, { fly: true, popup: true });
                setLocating(false);
            },
            () => {
                setGeoError('We could not access your location. Please allow permission and try again.');
                setLocating(false);
            },
            { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
        );
    }, [selectOffice]);

    // -- "View details" → jump to the matching office card below ------------
    const viewDetails = useCallback((id: string) => {
        document
            .getElementById(`office-${id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    // -- Search filter (city / state / office name / address) ---------------
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return offices;
        return offices.filter((o) =>
            [o.city, o.state, o.name, o.address].some((f) => f.toLowerCase().includes(q)),
        );
    }, [query]);

    return (
        <section
            id="india-map"
            className="scroll-mt-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
        >
            <div className="container mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-10 lg:px-8">
                {/* Heading */}
                <Reveal className="mx-auto mb-6 max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#0B3C5D] md:text-4xl">
                        Visit a Just Education office near you
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Explore our 10 offices across India. Browse the directory, search by city
                        or state, or locate the office closest to you on the live map.
                    </p>
                </Reveal>

                {/* Split layout: directory (30%) + interactive map (70%) */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-10">
                    {/* Sidebar */}
                    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:col-span-3 lg:h-[652px]">
                        <div className="space-y-3 border-b border-gray-100 p-4">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search city, state or office…"
                                    aria-label="Search offices"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-8 text-sm text-gray-700 outline-none transition focus:border-[#F57C00] focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery('')}
                                        aria-label="Clear search"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={findNearest}
                                disabled={locating}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3C5D] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F4D73] disabled:opacity-70"
                            >
                                {locating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <LocateFixed className="h-4 w-4" />
                                )}
                                {locating ? 'Locating…' : 'Find Nearest Office'}
                            </button>

                            {geoError && <p className="text-xs font-medium text-rose-600">{geoError}</p>}
                            {nearest && !geoError && officeById[nearest.id] && (
                                <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                                    <LocateFixed className="h-3.5 w-3.5" />
                                    Nearest: {officeById[nearest.id].city} · ~{Math.round(nearest.km)} km away
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between px-4 pb-1 pt-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                {filtered.length} {filtered.length === 1 ? 'office' : 'offices'}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                                <span className="h-2 w-2 rounded-full bg-[#F57C00]" /> Tap to locate
                            </span>
                        </div>

                        <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-hide px-4 pb-4 pt-1">
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                    <Search className="mb-2 h-7 w-7" />
                                    <p className="text-sm font-medium">No offices match “{query}”.</p>
                                </div>
                            ) : (
                                filtered.map((office) => (
                                    <OfficeListCard
                                        key={office.id}
                                        office={office}
                                        active={selectedId === office.id}
                                        isNearest={nearest?.id === office.id}
                                        cardRef={(el) => {
                                            cardRefs.current[office.id] = el;
                                        }}
                                        onSelect={() => selectOffice(office.id, { fly: true })}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-7">
                        <div className="relative h-[460px] overflow-hidden rounded-3xl border border-gray-200 shadow-xl sm:h-[560px] lg:h-[652px]">
                            {/* The GL canvas mounts here. Explicit h/w (not `absolute
                                inset-0`) so sizing never depends on the `position`
                                utility, which maplibre-gl.css overrides — see globals.css. */}
                            <div ref={mapContainer} className="h-full w-full" />

                            {/* Legend */}
                            {!mapError && (
                                <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] shadow-lg backdrop-blur">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#F57C00]" />
                                    {offices.length} offices across India
                                </div>
                            )}

                            {/* Loading skeleton */}
                            {!mapReady && !mapError && <MapLoadingOverlay />}

                            {/* Graceful fallback — never leave a blank white box */}
                            {mapError && <MapErrorOverlay onRetry={retryMap} />}
                        </div>
                    </div>
                </div>

                {/* Marker + popup portals */}
                {mapReady &&
                    offices.map((office) => {
                        const el = markerEls[office.id];
                        if (!el) return null;
                        return createPortal(
                            <MarkerPin
                                office={office}
                                active={selectedId === office.id}
                                popupOpen={showPopup && selectedId === office.id}
                                onSelect={() => selectOffice(office.id, { fly: true })}
                            />,
                            el,
                            office.id,
                        );
                    })}

                {popupEl &&
                    showPopup &&
                    selectedId &&
                    officeById[selectedId] &&
                    createPortal(
                        <PopupCard
                            office={officeById[selectedId]}
                            onClose={() => setShowPopup(false)}
                            onViewDetails={viewDetails}
                        />,
                        popupEl,
                    )}
            </div>
        </section>
    );
}

// ===========================================================================
// Sub-components
// ===========================================================================


function MarkerPin({
    office,
    active,
    popupOpen,
    onSelect,
}: {
    office: Office;
    active: boolean;
    popupOpen: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            className="je-marker"
            data-active={active}
            data-popup={popupOpen}
            aria-label={`${office.city} office`}
            aria-pressed={active}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
        >
            <span className="je-marker-ping" aria-hidden="true" />
            <span className="je-marker-head">
                <Building2 />
            </span>
            <span className="je-marker-label">{office.city}</span>
        </button>
    );
}

function PopupCard({
    office,
    onClose,
    onViewDetails,
}: {
    office: Office;
    onClose: () => void;
    onViewDetails: (id: string) => void;
}) {
    return (
        <div className="je-animate-pop w-[300px] max-w-[86vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            <div className="relative bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] p-4 text-white">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2.5 pr-8">
                    <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                        <Building2 className="h-5 w-5 text-orange-300" />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate text-base font-bold leading-tight">{office.city}</h3>
                            {office.isHeadquarters && (
                                <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                                    HQ
                                </span>
                            )}
                        </div>
                        <p className="truncate text-[11px] text-blue-100">{office.state}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5 p-4 text-[13px]">
                <p className="flex gap-2 text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F57C00]" />
                    <span className="leading-snug">{office.address}</span>
                </p>
                <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-[#0B3C5D]"
                >
                    <Phone className="h-4 w-4 flex-shrink-0 text-[#F57C00]" />
                    {office.phone}
                </a>
                <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-[#0B3C5D]"
                >
                    <Mail className="h-4 w-4 flex-shrink-0 text-[#F57C00]" />
                    <span className="truncate">{office.email}</span>
                </a>
                <p className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 flex-shrink-0 text-[#F57C00]" />
                    {office.hours}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <a
                        href={googleDirectionsLink(office.lat, office.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#F57C00] py-2.5 text-xs font-bold text-white transition hover:bg-[#E65100]"
                    >
                        <Navigation className="h-3.5 w-3.5" />
                        Directions
                    </a>
                    <button
                        type="button"
                        onClick={() => onViewDetails(office.id)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-[#0B3C5D] transition hover:border-[#0B3C5D] hover:bg-gray-50"
                    >
                        View Details
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function OfficeListCard({
    office,
    active,
    isNearest,
    onSelect,
    cardRef,
}: {
    office: Office;
    active: boolean;
    isNearest?: boolean;
    onSelect: () => void;
    cardRef: (el: HTMLButtonElement | null) => void;
}) {
    return (
        <button
            ref={cardRef}
            type="button"
            onClick={onSelect}
            aria-pressed={active}
            className={`group block w-full rounded-xl border p-3.5 text-left transition-all ${
                active
                    ? 'border-[#F57C00] bg-orange-50/70 shadow-sm ring-1 ring-orange-200'
                    : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#F57C00]/60 hover:bg-orange-50/40 hover:shadow-sm'
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                    <span
                        className={`mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors ${
                            active ? 'bg-[#F57C00] text-white' : 'bg-orange-50 text-[#F57C00]'
                        }`}
                    >
                        <Building2 className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h4 className="text-sm font-bold text-[#0B3C5D]">{office.city}</h4>
                            {office.isHeadquarters && (
                                <span className="rounded-full bg-[#0B3C5D] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                                    HQ
                                </span>
                            )}
                            {isNearest && (
                                <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-green-700">
                                    Nearest
                                </span>
                            )}
                        </div>
                        <p className="mt-0.5 text-[11px] font-medium text-gray-400">{office.state}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-500">
                            {office.address}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-gray-600">{office.phone}</p>
                    </div>
                </div>
                <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        active ? 'text-[#F57C00]' : 'text-gray-300 group-hover:text-[#F57C00]'
                    }`}
                />
            </div>
        </button>
    );
}

function MapLoadingOverlay() {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0F4D73]">
            <div
                className="absolute inset-0 opacity-[0.12]"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
            />
            <div className="je-shimmer absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-col items-center gap-3 text-white/80">
                <span className="relative grid h-14 w-14 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-orange-400/40" />
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                        <Globe2 className="h-6 w-6 text-orange-300" />
                    </span>
                </span>
                <p className="flex items-center gap-2 text-sm font-medium">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading interactive map…
                </p>
            </div>
        </div>
    );
}

function MapErrorOverlay({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#0F4D73] px-6 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                <MapPinOff className="h-7 w-7 text-orange-300" />
            </span>
            <div className="space-y-1">
                <p className="text-base font-bold text-white">Unable to load the interactive map</p>
                <p className="mx-auto max-w-xs text-sm text-blue-100">
                    All {offices.length} office locations are still listed beside and below this
                    map.
                </p>
            </div>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F57C00] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#E65100]"
            >
                <RotateCcw className="h-4 w-4" /> Retry
            </button>
        </div>
    );
}
