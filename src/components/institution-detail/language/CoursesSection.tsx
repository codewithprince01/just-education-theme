'use client';

import { useState } from 'react';
import { Clock, Globe, ChevronRight, Tag } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const LANGUAGE_BADGE_COLORS: Record<string, string> = {
  French: 'bg-blue-100 text-blue-700',
  Spanish: 'bg-red-100 text-red-700',
  German: 'bg-yellow-100 text-yellow-800',
  Japanese: 'bg-pink-100 text-pink-700',
  Mandarin: 'bg-orange-100 text-orange-700',
  Italian: 'bg-green-100 text-green-700',
  Arabic: 'bg-teal-100 text-teal-700',
  Korean: 'bg-indigo-100 text-indigo-700',
  English: 'bg-cyan-100 text-cyan-700',
  Hindi: 'bg-amber-100 text-amber-800',
};

export default function CoursesSection() {
  const institution = useInstitution();
  const courses = institution.sections.courses;

  const [activeMode, setActiveMode] = useState('All');

  if (!courses || courses.length === 0) return null;

  const modes = ['All', ...Array.from(new Set(courses.map((c) => c.mode).filter(Boolean)))];
  const filtered = activeMode === 'All' ? courses : courses.filter((c) => c.mode === activeMode);

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-courses">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Explore Language Courses
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Structured language programmes for every level, goal, and schedule.
          </p>
        </div>

        {/* Mode filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                activeMode === mode
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => {
            const langBadgeColor =
              LANGUAGE_BADGE_COLORS[course.examCategory ?? ''] ?? 'bg-gray-100 text-gray-700';

            return (
              <div
                key={course.id}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white flex flex-col overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />

                <div className="p-5 flex flex-col flex-1">
                  {/* Language badge */}
                  {course.examCategory && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3 ${langBadgeColor}`}
                    >
                      <Tag size={11} />
                      {course.examCategory}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-[#0a2540] text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-blue-500" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={12} className="text-emerald-500" />
                      {course.mode}
                    </span>
                  </div>

                  {/* Highlights */}
                  {course.highlights && course.highlights.length > 0 && (
                    <ul className="flex flex-col gap-1.5 mb-4">
                      {course.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Fee row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-extrabold text-[#0a2540]">
                      ₹{course.fee.toLocaleString('en-IN')}
                    </span>
                    {course.originalFee && course.originalFee > course.fee && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{course.originalFee.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-auto">
                          {Math.round(((course.originalFee - course.fee) / course.originalFee) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                    Enroll Now <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
