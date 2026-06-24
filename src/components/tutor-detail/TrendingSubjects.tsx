'use client';

import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

export default function TrendingSubjects() {
  const { trendingSubjects } = useTutor();

  return (
    <section className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Discover"
          title="Trending Right Now"
          subtitle="Popular searches students are exploring this week."
        />

        <div className="flex flex-wrap gap-3">
          {trendingSubjects.map((c) => (
            <button
              key={c.id}
              className="group inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-600 text-[#0a2540] hover:text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <TrendingUp size={14} className="text-blue-500 group-hover:text-white" />
              {c.label}
              <ArrowUpRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
