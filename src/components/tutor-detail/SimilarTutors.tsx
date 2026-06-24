'use client';

import { Star, ChevronRight, Monitor, MapPin, Layers } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

const MODE_ICON = {
  Online: Monitor,
  Offline: MapPin,
  Hybrid: Layers,
} as const;

export default function SimilarTutors() {
  const { similarTutors, currency } = useTutor();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Explore More"
          title="Similar Tutors"
          subtitle="Other top-rated tutors you might want to compare."
        />

        <div className="flex gap-5 overflow-x-auto pb-3" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {similarTutors.map((t) => {
            const ModeIcon = MODE_ICON[t.mode];
            return (
              <div
                key={t.id}
                className="shrink-0 w-64 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#0a2540] text-sm truncate">{t.name}</h3>
                    <p className="text-[11px] text-gray-500 truncate">{t.headline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-[#0a2540]">{t.rating}</span>
                    <span className="text-gray-400">({t.reviewCount})</span>
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <ModeIcon size={12} className="text-blue-500" /> {t.mode}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {t.subjects.map((s) => (
                    <span key={s} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0a2540]">{currency}{t.hourlyFee}<span className="text-xs font-normal text-gray-400">/hr</span></span>
                  <button className="flex items-center gap-0.5 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors">
                    View <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
