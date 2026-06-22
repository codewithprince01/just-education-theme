"use client";

import { Clock, CalendarClock, MonitorSmartphone, ArrowRight } from 'lucide-react';
import type { CourseRow } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import { useEnquiry } from './EnquiryProvider';

interface LcCoursesProps {
  courses: CourseRow[];
}

const levelStyles: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-rose-50 text-rose-700',
  'All Levels': 'bg-blue-50 text-blue-700',
};

export default function LcCourses({ courses }: LcCoursesProps) {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="py-10 scroll-mt-24" id="courses">
      <SectionHeading
        eyebrow="Courses & Fees"
        title="Transparent Pricing, No Surprises"
        description="Pick a course that fits your goal, schedule and budget."
      />

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] text-white">
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Course</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Duration</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Batch Timing</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Mode</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Level</th>
              <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wide">Fee</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-100 text-sm transition-colors last:border-0 hover:bg-blue-50/40 ${
                  i % 2 ? 'bg-gray-50/40' : 'bg-white'
                }`}
              >
                <td className="px-5 py-4 font-bold text-[#0a2540]">{c.name}</td>
                <td className="px-5 py-4 text-gray-600">{c.duration}</td>
                <td className="px-5 py-4 text-gray-600">{c.batchTiming}</td>
                <td className="px-5 py-4 text-gray-600">{c.mode}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${levelStyles[c.level]}`}>
                    {c.level}
                  </span>
                </td>
                <td className="px-5 py-4 font-black text-emerald-600">{c.fee}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={openEnquiry}
                    className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-orange-600 active:scale-95"
                  >
                    Enquire <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {courses.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-[#0a2540]">{c.name}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${levelStyles[c.level]}`}>
                {c.level}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-gray-400" /> {c.duration}</span>
              <span className="inline-flex items-center gap-1.5"><MonitorSmartphone size={13} className="text-gray-400" /> {c.mode}</span>
              <span className="col-span-2 inline-flex items-center gap-1.5"><CalendarClock size={13} className="text-gray-400" /> {c.batchTiming}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-lg font-black text-emerald-600">{c.fee}</span>
              <button
                onClick={openEnquiry}
                className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:bg-orange-600 active:scale-95"
              >
                Enquire <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
