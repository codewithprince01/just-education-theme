'use client';

import { CheckCircle2, Target, Eye } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

export default function AboutSection() {
  const institution = useInstitution();
  const about = institution.sections.about;

  if (!about) return null;

  const hasMission = Boolean(about.mission);
  const hasVision = Boolean(about.vision);
  const hasCards = hasMission || hasVision;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left column: description + highlights ── */}
          <div>
            {/* Badge + heading */}
            <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
              {institution.name}
            </h2>
            <p className="text-gray-500 mb-6">
              {about.description}
            </p>

            {about.highlights && about.highlights.length > 0 && (
              <>
                <h3 className="font-bold text-[#0a2540] text-base mb-3">Why Choose Us</h3>
                <ul className="flex flex-col gap-2.5">
                  {about.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2
                        size={18}
                        className="text-green-500 shrink-0 mt-0.5"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* ── Right column: mission / vision cards or fallback image ── */}
          <div className="flex flex-col gap-4">
            {hasCards ? (
              <>
                {hasMission && (
                  <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Target size={18} className="text-white" />
                      </div>
                      <h3 className="font-bold text-white text-base">Our Mission</h3>
                    </div>
                    <div className="px-6 py-5 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed">{about.mission}</p>
                    </div>
                  </div>
                )}

                {hasVision && (
                  <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Eye size={18} className="text-white" />
                      </div>
                      <h3 className="font-bold text-white text-base">Our Vision</h3>
                    </div>
                    <div className="px-6 py-5 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed">{about.vision}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden aspect-[4/3]">
                <img
                  src={institution.banner}
                  alt={institution.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
