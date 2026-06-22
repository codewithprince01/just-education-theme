"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    MapPin, Search, Building2, GraduationCap, ArrowRight, ChevronRight, Sparkles,
    Landmark, Cpu, BookOpen, Briefcase, Coffee, Mountain, Sun, Compass, TreePine, Snowflake, Map, Building
} from 'lucide-react';
import { cityMeta } from '../../data/cityData';
import { topStudyPlaces } from '../../data/topStudyPlaces';
import { getCityMonument, MonumentIcon } from '../../components/shared/MonumentIcon';


const CitiesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'cities' | 'regions'>('cities');

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

    const regionsList = [
        { name: 'North India', slug: 'north-india', state: 'Multiple States', tagline: 'Educational Hubs in the North', description: 'Explore top colleges in Delhi, Punjab, Haryana, UP, and surrounding areas.', totalColleges: 1200, totalUniversities: 45 },
        { name: 'South India', slug: 'south-india', state: 'Multiple States', tagline: 'Premier Institutes of the South', description: 'Discover premier institutions across Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh.', totalColleges: 1500, totalUniversities: 60 },
        { name: 'North East', slug: 'north-east', state: 'Multiple States', tagline: 'Scenic Educational Destinations', description: 'Find the best educational opportunities in the scenic states of North East India.', totalColleges: 300, totalUniversities: 15 },
        { name: 'Kashmir', slug: 'kashmir', state: 'Jammu & Kashmir', tagline: 'Education in the Valley', description: 'Explore universities and institutes in the beautiful valley of Kashmir.', totalColleges: 120, totalUniversities: 6 },
        { name: 'West India', slug: 'west-india', state: 'Multiple States', tagline: 'Western Academic Hubs', description: 'Top colleges across Maharashtra, Gujarat, Goa, and Rajasthan.', totalColleges: 1100, totalUniversities: 40 },
        { name: 'Central India', slug: 'central-india', state: 'Multiple States', tagline: 'Heart of India Education', description: 'Academic institutions located in Madhya Pradesh and Chhattisgarh.', totalColleges: 400, totalUniversities: 20 },
    ];

    const currentList = activeTab === 'cities' ? citiesList : regionsList;

    const filteredItems = currentList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase())
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
                        <span className="text-white font-medium">Locations</span>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-4">
                            <Sparkles size={14} className="text-cyan-300 animate-pulse" />
                            <span>Serving India&apos;s Top Educational Hubs</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Cities & Regions</span>
                        </h1>
                        <p className="text-lg text-blue-100/80 mb-8 leading-relaxed">
                            Find verified colleges, admission updates, and explore local student hubs across India&apos;s top study places and geographic regions.
                        </p>

                        {/* Search bar */}
                        <div className="relative max-w-lg shadow-xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-1.5 border border-white/15">
                            <div className="relative flex items-center">
                                <Search size={20} className="absolute left-4 text-blue-200" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab} by name, state...`}
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

            {/* ─── LOCATIONS GRID ─── */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {searchQuery ? 'Search Results' : (activeTab === 'cities' ? 'Cities We Serve' : 'Educational Regions')}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Showing {filteredItems.length} {filteredItems.length === 1 ? 'location' : 'locations'}
                        </p>
                    </div>

                    {/* Tabs for Cities vs Regions */}
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button
                            onClick={() => setActiveTab('cities')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'cities' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Cities
                        </button>
                        <button
                            onClick={() => setActiveTab('regions')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'regions' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Regions
                        </button>
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto mt-8">
                        <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-700">No {activeTab} Found</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            We couldn&apos;t find any {activeTab} matching &quot;{searchQuery}&quot;. Please check the spelling or try searching for something else.
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
                        {filteredItems.map((item) => {
                            const monument = getCityMonument(item.slug);
                            return (
                                <Link
                                    key={item.slug}
                                    href={`/city/${item.slug}`}
                                    className="group flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-blue-200 hover:-translate-y-1.5"
                                    id={`location-card-${item.slug}`}
                                >
                                    <div>
                                        {/* Top row with Icon and State */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300 w-16 h-16 flex items-center justify-center shadow-sm border border-gray-100 bg-gray-50">
                                                <MonumentIcon titles={monument.titles} fallbackIcon={monument.icon} className="w-full h-full" />
                                            </div>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                                            <MapPin size={12} className={activeTab === 'regions' ? 'text-orange-400' : 'text-red-400'} />
                                            {item.state}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-blue-600/80 font-semibold mt-1 tracking-wide uppercase">
                                        {item.tagline}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Stats and redirect CTA */}
                                <div className="mt-6 pt-5 border-t border-gray-50">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Building2 size={16} className="text-blue-500/70" />
                                            <div>
                                                <div className="text-sm font-bold text-gray-700">{item.totalColleges}+</div>
                                                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Colleges</div>
                                            </div>
                                        </div>
                                        {item.totalUniversities > 0 && (
                                            <div className="flex items-center gap-2">
                                                <GraduationCap size={16} className="text-emerald-500/70" />
                                                <div>
                                                    <div className="text-sm font-bold text-gray-700">{item.totalUniversities}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Universities</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm font-bold text-blue-600 group-hover:text-blue-700 mt-2">
                                        <span>Explore {activeTab === 'regions' ? 'Region' : 'Study Places'}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CitiesPage;
