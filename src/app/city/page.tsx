"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Building2, GraduationCap, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { cityMeta } from '../../data/cityData';
import { topStudyPlaces } from '../../data/topStudyPlaces';

// Custom SVG Icons for Cities (Line Art Style)
interface CityIconProps {
    slug: string;
    className?: string;
}

const CityIcon = ({ slug, className }: CityIconProps) => {
    const defaultColor = "#1e3a8a"; // dark blue
    const accentColor = "#38bdf8"; // light blue

    switch (slug) {
        case 'delhi-ncr':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M20 54V24C20 16 24 12 32 12C40 12 44 16 44 24V54M24 54V28C24 22 28 18 32 18C36 18 40 22 40 28V54M16 54H48M28 28H36" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30 12V8H34V12M24 16H40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 54H52M20 34H44M20 44H44" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'bangalore':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M16 48V32H48V48M24 32V20C24 16 28 12 32 12C36 12 40 16 40 20V32" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 12V8M28 20H36" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 48H52M16 40H48M24 48V36M40 48V36M32 48V36" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 32V24H24M44 32V24H40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'hyderabad':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M20 54V24M44 54V24M24 54V32C24 24 28 20 32 20C36 20 40 24 40 32V54" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 24C20 18 22 14 24 14M44 24C44 18 42 14 40 14" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 54H48M20 44H44M20 34H44M24 14V8M40 14V8M24 8H40M32 8V4" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'pune':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M16 50V30H48V50M24 30V22L32 16L40 22V30" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 50H52M16 42H48" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30 50V40H34V50M22 50V40M42 50V40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 26H40M32 16V10M28 10H36" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'mumbai':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M18 52V28H46V52M26 52V36C26 30 28 26 32 26C36 26 38 30 38 36V52" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 28V20L32 14L46 20V28" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 52H50M22 24V20M42 24V20M32 14V8" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 44H26M38 44H46M18 36H26M38 36H46" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'chennai':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M16 52V36H48V52M30 36V16H34V36M32 16V8M28 8H36" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 52H52M16 44H48" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 52V40M42 52V40M26 52V40M38 52V40M30 52V40M34 52V40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 36V28H24M44 36V28H40M30 24H34M30 20H34M30 28H34" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'kolkata':
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M16 50V20M48 50V20M24 50V16L32 10L40 16V50" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 30H24M40 30H48M16 40H24M40 40H48" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 50H52M16 20L24 16M48 20L40 16M24 24H40M24 34H40M24 44H40M32 50V40" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M16 52V32L32 16L48 32V52" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 52H52M28 52V36H36V52" stroke={defaultColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 32H28M36 32H40M24 24H28M36 24H40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
    }
};

const CitiesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Map top study places to complete details from cityMeta (or default if missing)
    const citiesList = topStudyPlaces.map(place => {
        const meta = cityMeta[place.slug] || {
            name: place.name,
            state: 'India',
            tagline: 'Education Destination',
            description: `Explore educational opportunities, top colleges and academic institutions in ${place.name}.`,
            totalColleges: 100,
            totalUniversities: 3,
            totalStudents: '1L+',
            avgFees: 'N/A',
            heroImage: ''
        };
        return {
            ...meta,
            slug: place.slug
        };
    });

    const filteredCities = citiesList.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16" id="cities-page">
            {/* ─── HERO SECTION ─── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] py-12 md:py-16">
                {/* Background Ornaments */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-blue-200/70 text-sm mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Cities</span>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-4">
                            <Sparkles size={14} className="text-cyan-300 animate-pulse" />
                            <span>Serving India's Top Educational Hubs</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Education Cities</span>
                        </h1>
                        <p className="text-lg text-blue-100/80 mb-8 leading-relaxed">
                            Find verified colleges, admission updates, and explore local student hubs across India's top study places. Filter by city to start comparing.
                        </p>

                        {/* Search bar */}
                        <div className="relative max-w-lg shadow-xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-1.5 border border-white/15">
                            <div className="relative flex items-center">
                                <Search size={20} className="absolute left-4 text-blue-200" />
                                <input
                                    type="text"
                                    placeholder="Search cities by name, state..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/95 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none text-sm transition-all focus:bg-white"
                                    id="city-list-search"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CITIES GRID ─── */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {searchQuery ? 'Search Results' : 'Cities We Serve'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Showing {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'}
                        </p>
                    </div>
                </div>

                {filteredCities.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto mt-8">
                        <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-700">No Cities Found</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            We couldn't find any cities matching "{searchQuery}". Please check the spelling or try searching for another city.
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/city/${city.slug}`}
                                className="group flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-blue-200 hover:-translate-y-1.5"
                                id={`city-card-${city.slug}`}
                            >
                                <div>
                                    {/* Top row with Icon and State */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3.5 bg-blue-50/70 rounded-2xl text-blue-900 group-hover:bg-blue-100/80 group-hover:scale-105 transition-all duration-300 w-16 h-16 flex items-center justify-center">
                                            <CityIcon slug={city.slug} className="w-10 h-10" />
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                                            <MapPin size={12} className="text-red-400" />
                                            {city.state}
                                        </span>
                                    </div>

                                    {/* City details */}
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {city.name}
                                    </h3>
                                    <p className="text-xs text-blue-655/85 font-semibold mt-1 tracking-wide uppercase">
                                        {city.tagline}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                        {city.description}
                                    </p>
                                </div>

                                {/* Stats and redirect CTA */}
                                <div className="mt-6 pt-5 border-t border-gray-50">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Building2 size={16} className="text-blue-500/70" />
                                            <div>
                                                <div className="text-sm font-bold text-gray-700">{city.totalColleges}+</div>
                                                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Colleges</div>
                                            </div>
                                        </div>
                                        {city.totalUniversities > 0 && (
                                            <div className="flex items-center gap-2">
                                                <GraduationCap size={16} className="text-emerald-500/70" />
                                                <div>
                                                    <div className="text-sm font-bold text-gray-700">{city.totalUniversities}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Universities</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm font-bold text-blue-600 group-hover:text-blue-700 mt-2">
                                        <span>Explore Study Places</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CitiesPage;
