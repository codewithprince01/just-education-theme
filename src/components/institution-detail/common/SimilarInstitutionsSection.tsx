'use client';

import { MapPin, Star, ChevronRight } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const TYPE_LABEL: Record<string, string> = {
  UNIVERSITY: 'University',
  COLLEGE: 'College',
  SCHOOL: 'School',
  COACHING_CENTER: 'Coaching',
  LANGUAGE_CENTER: 'Language',
  LIBRARY: 'Library',
  RESEARCH_INSTITUTE: 'Research',
  TRAINING_CENTER: 'Training',
  SCHOLARSHIP_PROVIDER: 'Scholarship',
};

export default function SimilarInstitutionsSection() {
  const institution = useInstitution();
  const similar = institution.similar;

  if (!similar || similar.length === 0) return null;

  return (
    <section id="section-similar" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Explore More
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Similar Institutions
          </h2>
          <p className="text-gray-500">Discover other top-rated institutions near you.</p>
        </div>

        {/* Horizontal scroll-snap carousel */}
        <div
          className="flex gap-5 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {similar.map((inst) => (
            <div
              key={inst.id}
              className="shrink-0 w-64 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden [scroll-snap-align:start]"
            >
              {/* Image */}
              <div className="w-full aspect-video overflow-hidden relative">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Type badge */}
                <span className="absolute top-2 left-2 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {TYPE_LABEL[inst.type] ?? inst.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#0a2540] text-sm mb-1.5 leading-tight line-clamp-2">
                  {inst.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5 text-xs">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className={
                        s <= Math.round(inst.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                  <span className="font-semibold text-[#0a2540] ml-0.5">{inst.rating}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <MapPin size={11} className="text-blue-500 shrink-0" />
                  <span className="truncate">{inst.location}</span>
                </div>

                <a
                  href={`/institutions/${inst.slug}`}
                  className="w-full flex items-center justify-center gap-1 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs py-2 rounded-xl transition-colors"
                >
                  View Details <ChevronRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
