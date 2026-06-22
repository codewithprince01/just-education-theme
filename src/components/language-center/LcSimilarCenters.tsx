"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { Star, MapPin, Globe, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { SimilarCenter } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';

interface LcSimilarCentersProps {
  centers: SimilarCenter[];
}

export default function LcSimilarCenters({ centers }: LcSimilarCentersProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scroller.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50/40 py-14" id="similar-centers">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Explore More"
            title="Similar Language Centers"
            align="left"
          />
          {/* Carousel controls (desktop) */}
          <div className="mb-12 hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {centers.map((center) => (
            <Link
              key={center.slug}
              href={`/language-center/${center.slug}`}
              className="group w-[270px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-36 overflow-hidden bg-gray-100">
                <img
                  src={center.image}
                  alt={center.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                  {center.rating} <Star size={11} className="fill-white" />
                </span>
              </div>
              <div className="p-4">
                <h3 className="truncate font-extrabold text-[#0a2540] transition-colors group-hover:text-blue-600">
                  {center.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={12} className="text-gray-400" /> {center.location}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-gray-600">
                    <Globe size={13} className="text-blue-500" /> {center.languagesCount} languages
                  </span>
                  <span className="font-bold text-emerald-600">from {center.startingFee}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
