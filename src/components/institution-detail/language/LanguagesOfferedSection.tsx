'use client';

import { Clock, BadgeCheck, DollarSign } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-emerald-100 text-emerald-700',
  A2: 'bg-teal-100 text-teal-700',
  B1: 'bg-blue-100 text-blue-700',
  B2: 'bg-indigo-100 text-indigo-700',
  C1: 'bg-violet-100 text-violet-700',
  C2: 'bg-purple-100 text-purple-700',
};

export default function LanguagesOfferedSection() {
  const institution = useInstitution();
  const languages = institution.sections.languages;

  if (!languages || languages.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-languages">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Languages Offered
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Languages We Teach
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Globally recognised language programmes for every proficiency level.
          </p>
        </div>

        {/* Language cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col overflow-hidden"
            >
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />

              <div className="p-5 flex flex-col flex-1">
                {/* Flag + name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl leading-none">{lang.flag}</span>
                  <h3 className="font-extrabold text-[#0a2540] text-lg leading-tight">
                    {lang.name}
                  </h3>
                </div>

                {/* CEFR level chips */}
                {lang.levels && lang.levels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {lang.levels.map((level) => (
                      <span
                        key={level}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[level] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                )}

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                  <Clock size={12} className="text-blue-500 shrink-0" />
                  <span>{lang.duration}</span>
                </div>

                {/* Fee */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                  <DollarSign size={12} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#0a2540]">
                    ₹{lang.fee.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Certification badge */}
                {lang.certification && (
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-2">
                    <BadgeCheck size={14} className="text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700 leading-snug">
                      {lang.certification}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
