'use client';

import { MapPin, Star, ChevronRight } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

export default function SimilarInstitutes() {
  const { similarInstitutes } = useCoachingData();
  return (
    <section id="section-similar" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Explore More"
          title="Similar Institutes"
          subtitle="Discover other top-rated coaching institutes in Maharashtra."
        />

        {/* Horizontal scroll carousel */}
        <div
          className="flex gap-5 overflow-x-auto pb-3"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {similarInstitutes.map((inst) => (
            <div
              key={inst.id}
              className="shrink-0 w-64 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image */}
              <div className="w-full aspect-video overflow-hidden">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#0a2540] text-sm mb-1.5 leading-tight">{inst.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5 text-xs">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#0a2540]">{inst.rating}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin size={11} className="text-blue-500 shrink-0" />
                  {inst.location}
                </div>

                {/* Course chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {inst.courses.map((c) => (
                    <span key={c} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-1 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs py-2 rounded-xl transition-colors">
                  View Details <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
