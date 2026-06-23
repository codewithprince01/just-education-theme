'use client';

import { BookOpen, FlaskConical, Quote, MapPin, FileText, BarChart2 } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

function BigStatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border shadow-sm bg-white p-6 gap-2 text-center ${accent}`}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-1">
        <Icon size={22} className="text-blue-600" />
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight">
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
}

export default function ResearchSection() {
  const institution = useInstitution();
  const research = institution.sections.research;

  if (!research) return null;

  const {
    publications,
    activeProjects,
    citations,
    researchCenters,
    highlights,
  } = research;

  const centerCount = researchCenters?.length ?? 0;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-research">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Research
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Research &amp; Innovation
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Driving knowledge and discovery through world-class research facilities, publications, and active projects.
          </p>
        </div>

        {/* Four big stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <BigStatCard
            label="Publications"
            value={publications}
            icon={FileText}
            accent="border-blue-100"
          />
          <BigStatCard
            label="Active Projects"
            value={activeProjects}
            icon={FlaskConical}
            accent="border-green-100"
          />
          <BigStatCard
            label="Citations"
            value={citations}
            icon={BarChart2}
            accent="border-amber-100"
          />
          <BigStatCard
            label="Research Centers"
            value={centerCount}
            icon={BookOpen}
            accent="border-purple-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Centers list */}
          {researchCenters && researchCenters.length > 0 && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-extrabold text-[#0a2540] mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Research Centers
              </h3>
              <div className="flex flex-wrap gap-2">
                {researchCenters.map((center) => (
                  <span
                    key={center}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-[#0a2540] font-medium"
                  >
                    <MapPin size={12} className="text-blue-500 shrink-0" />
                    {center}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Research Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-extrabold text-[#0a2540] mb-5 flex items-center gap-2">
                <Quote size={18} className="text-blue-600" />
                Research Highlights
              </h3>
              <ul className="flex flex-col gap-3">
                {highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen size={13} className="text-blue-600" />
                    </div>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
