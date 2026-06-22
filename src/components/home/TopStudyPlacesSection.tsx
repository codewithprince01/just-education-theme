"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { topStudyPlaces } from '@/data/topStudyPlaces';
import { getCityMonument, MonumentIcon } from '../shared/MonumentIcon';


const TopStudyPlacesSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'right' ? 220 : -220,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-12 relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-slate-50 to-cyan-50/50 border-b border-gray-100">
            {/* Decorative Background Blobs for Glassmorphism Contrast */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d3748] tracking-tight relative">
                        Top Study Places
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"></div>
                    </h2>
                    <Link
                        href="/city"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group shadow-sm self-start sm:self-auto cursor-pointer"
                        id="view-all-cities-btn"
                    >
                        View All Cities
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="relative group/slider mt-10">
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-blue-600 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-105"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} className="mr-0.5" />
                        </button>
                    )}

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-5 overflow-x-auto scroll-smooth py-6 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
                    >
                        {topStudyPlaces.map((place) => {
                            const monument = getCityMonument(place.slug);
                            return (
                                <Link
                                    key={place.slug}
                                    href={`/city/${place.slug}`}
                                    className="flex-shrink-0 w-[150px] md:w-[160px] aspect-square flex flex-col items-center justify-center gap-4 p-5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:bg-white/60 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                                >
                                    {/* Glass reflection highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                                    
                                    <div className="text-blue-900 group-hover:scale-110 transition-transform duration-500 w-20 h-20 rounded-full overflow-hidden shadow-md border-[3px] border-white/80 flex items-center justify-center bg-white relative z-10">
                                        <MonumentIcon titles={monument.titles} fallbackIcon={monument.icon} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[15px] font-extrabold text-gray-800 text-center leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300 relative z-10">
                                        {place.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {showRightArrow && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-blue-600 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-105"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={24} className="ml-0.5" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopStudyPlacesSection;
