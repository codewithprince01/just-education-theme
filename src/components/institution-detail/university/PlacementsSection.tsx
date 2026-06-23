'use client';

import { TrendingUp, Award, Users, CalendarDays, Briefcase } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border shadow-sm bg-white p-6 gap-2 text-center ${accent}`}
    >
      <Icon size={24} className="text-blue-600 mb-1" />
      <p className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight">
        {value}
      </p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
}

function RecruiterChip({ name }: { name: string }) {
  // Derive initials from company name (up to 2 chars)
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-extrabold">{initials}</span>
      </div>
      <span className="text-sm font-semibold text-[#0a2540] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function PlacementsSection() {
  const institution = useInstitution();
  const placements = institution.sections.placements;

  if (!placements) return null;

  const { avgPackage, highestPackage, placementRate, topRecruiters, year } =
    placements;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-placements">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Placements
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Placement Highlights
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Our graduates are placed at leading organisations across industries. Here&apos;s how we performed in {year}.
          </p>
        </div>

        {/* Hero stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            label="Average Package"
            value={avgPackage}
            icon={TrendingUp}
            accent="border-blue-100"
          />
          <StatCard
            label="Highest Package"
            value={highestPackage}
            icon={Award}
            accent="border-amber-100"
          />
          <StatCard
            label="Placement Rate"
            value={placementRate}
            icon={Users}
            accent="border-green-100"
          />
          <StatCard
            label="Placement Year"
            value={String(year)}
            icon={CalendarDays}
            accent="border-purple-100"
          />
        </div>

        {/* Top Recruiters */}
        {topRecruiters && topRecruiters.length > 0 && (
          <div>
            <h3 className="text-lg font-extrabold text-[#0a2540] mb-5 flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600" />
              Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-3">
              {topRecruiters.map((company) => (
                <RecruiterChip key={company} name={company} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
