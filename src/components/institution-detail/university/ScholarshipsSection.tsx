'use client';

import { Award, CalendarClock, IndianRupee } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { ScholarshipData } from '@/types/institution';

const TYPE_CONFIG: Record<
  ScholarshipData['type'],
  { label: string; className: string }
> = {
  merit: {
    label: 'Merit',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  need: {
    label: 'Need-based',
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  sports: {
    label: 'Sports',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  research: {
    label: 'Research',
    className: 'bg-purple-50 text-purple-700 border border-purple-200',
  },
};

function ScholarshipCard({ scholarship }: { scholarship: ScholarshipData }) {
  const typeConfig = TYPE_CONFIG[scholarship.type] ?? {
    label: scholarship.type,
    className: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white p-5 flex flex-col gap-3">
      {/* Type badge */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeConfig.className}`}
        >
          {typeConfig.label}
        </span>
        <Award size={18} className="text-blue-600" />
      </div>

      {/* Name */}
      <h3 className="font-extrabold text-[#0a2540] text-base leading-snug">
        {scholarship.name}
      </h3>

      {/* Amount — big */}
      <div className="flex items-center gap-1">
        <IndianRupee size={20} className="text-blue-600" />
        <span className="text-2xl font-extrabold text-blue-600">
          {scholarship.amount}
        </span>
      </div>

      {/* Eligibility */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        {scholarship.eligibility}
      </p>

      {/* Deadline chip */}
      <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-2 w-fit">
        <CalendarClock size={13} className="text-gray-500" />
        <span className="text-xs font-semibold text-gray-600">
          Deadline:{' '}
          <span className="text-[#0a2540]">{scholarship.deadline}</span>
        </span>
      </div>
    </div>
  );
}

export default function ScholarshipsSection() {
  const institution = useInstitution();
  const scholarships = institution.sections.scholarships;

  if (!scholarships || scholarships.length === 0) return null;

  const totalCount = scholarships.length;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-scholarships">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Scholarships
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Financial Aid & Scholarships
          </h2>
          <p className="text-gray-500 max-w-2xl">
            We believe financial constraints should never be a barrier to quality education. Explore available scholarships.
          </p>
        </div>

        {/* Header stat bar */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-3 bg-blue-50 rounded-2xl px-5 py-4 border border-blue-100">
            <Award size={22} className="text-blue-600" />
            <div>
              <p className="text-2xl font-extrabold text-[#0a2540]">
                {totalCount}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Scholarships Available
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-5 py-4 border border-amber-100">
            <IndianRupee size={22} className="text-amber-600" />
            <div>
              <p className="text-2xl font-extrabold text-[#0a2540]">
                {scholarships.filter((s) => s.type === 'merit').length}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Merit-based Scholarships
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50 rounded-2xl px-5 py-4 border border-green-100">
            <IndianRupee size={22} className="text-green-600" />
            <div>
              <p className="text-2xl font-extrabold text-[#0a2540]">
                {scholarships.filter((s) => s.type === 'need').length}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Need-based Scholarships
              </p>
            </div>
          </div>
        </div>

        {/* Scholarships grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    </section>
  );
}
