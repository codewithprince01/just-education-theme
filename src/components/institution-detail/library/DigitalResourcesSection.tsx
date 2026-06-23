'use client';

import { Lock, Unlock, ExternalLink } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const CATEGORY_COLORS: Record<string, string> = {
  'E-Books': 'bg-blue-100 text-blue-700',
  Journals: 'bg-violet-100 text-violet-700',
  Databases: 'bg-teal-100 text-teal-700',
  Newspapers: 'bg-orange-100 text-orange-700',
  'Research Papers': 'bg-indigo-100 text-indigo-700',
  Magazines: 'bg-pink-100 text-pink-700',
  Audio: 'bg-amber-100 text-amber-700',
  Video: 'bg-emerald-100 text-emerald-700',
};

export default function DigitalResourcesSection() {
  const institution = useInstitution();
  const digitalResources = institution.sections.digitalResources;

  if (!digitalResources || digitalResources.length === 0) return null;

  const freeCount = digitalResources.filter((r) => r.accessType === 'free').length;
  const memberCount = digitalResources.filter((r) => r.accessType === 'member').length;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-digitalResources">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Digital Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Digital Library Access
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gray-500 text-base">
              Access our curated digital collection anytime, anywhere.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <Unlock size={11} />
                {freeCount} Free
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                <Lock size={11} />
                {memberCount} Member Only
              </span>
            </div>
          </div>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalResources.map((resource) => {
            const isFree = resource.accessType === 'free';
            const categoryColor =
              CATEGORY_COLORS[resource.category] ?? 'bg-gray-100 text-gray-700';

            return (
              <div
                key={resource.id}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col overflow-hidden group"
              >
                {/* Top accent */}
                <div
                  className={`h-1 ${
                    isFree
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                  }`}
                />

                <div className="p-5 flex flex-col flex-1">
                  {/* Category badge + access type chip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${categoryColor}`}
                    >
                      {resource.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isFree
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {isFree ? <Unlock size={10} /> : <Lock size={10} />}
                      {isFree ? 'Free' : 'Member Only'}
                    </span>
                  </div>

                  {/* Resource name */}
                  <h3 className="font-bold text-[#0a2540] text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                    {resource.description}
                  </p>

                  {/* Access Now button */}
                  <button
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isFree
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Access Now
                    <ExternalLink size={13} />
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
