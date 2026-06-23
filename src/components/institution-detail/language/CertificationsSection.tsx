'use client';

import { Award, BadgeCheck, Globe } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

export default function CertificationsSection() {
  const institution = useInstitution();
  const certifications = institution.sections.certifications;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-certifications">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Certifications
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Recognised Certifications
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Earn internationally recognised credentials that open doors worldwide.
          </p>
        </div>

        {/* Certification cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden relative group"
            >
              {/* Gold top accent */}
              <div className="h-1 bg-gradient-to-r from-amber-400 to-yellow-300" />

              {/* Subtle gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

              <div className="p-6 relative z-10">
                {/* Award icon header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <Award size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-[#0a2540] text-base leading-snug mb-1">
                      {cert.name}
                    </h3>
                    {/* Issued by badge */}
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <BadgeCheck size={11} />
                      {cert.issuedBy}
                    </span>
                  </div>
                </div>

                {/* Recognised by */}
                <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2 mb-4">
                  <Globe size={14} className="text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-700 font-semibold leading-snug">
                    {cert.recognized}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
