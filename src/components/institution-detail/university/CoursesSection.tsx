'use client';

import { useState } from 'react';
import { Clock, Users, ChevronRight, CheckCircle2, Layers } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { Course } from '@/types/institution';

const MODE_FILTERS = ['All', 'UG', 'PG', 'PhD', 'Diploma'];

const modeBadgeColors: Record<string, string> = {
  Online: 'bg-blue-50 text-blue-700',
  Offline: 'bg-gray-100 text-gray-700',
  Hybrid: 'bg-purple-50 text-purple-700',
  'Distance Learning': 'bg-orange-50 text-orange-700',
};

function formatFee(fee: number): string {
  if (fee >= 100000) {
    return `₹${(fee / 100000).toFixed(1)}L`;
  }
  if (fee >= 1000) {
    return `₹${(fee / 1000).toFixed(0)}K`;
  }
  return `₹${fee.toLocaleString('en-IN')}`;
}

function CourseCard({ course }: { course: Course }) {
  const modeColor = modeBadgeColors[course.mode] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
      <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
      <div className="p-5 flex flex-col flex-1">
        {/* Mode badge */}
        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3 ${modeColor}`}>
          {course.mode}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[#0a2540] text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Duration + Seats row */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-blue-500" />
            {course.duration}
          </span>
          {course.seats !== undefined && (
            <span className="flex items-center gap-1">
              <Users size={12} className="text-blue-500" />
              {course.seats} seats
            </span>
          )}
          {course.difficulty && (
            <span className="flex items-center gap-1">
              <Layers size={12} className="text-blue-500" />
              {course.difficulty}
            </span>
          )}
        </div>

        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 mb-4">
            {course.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex-1" />

        {/* Fee */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-extrabold text-[#0a2540]">
            {formatFee(course.fee)}
          </span>
          {course.originalFee && course.originalFee > course.fee && (
            <span className="text-sm text-gray-400 line-through">
              {formatFee(course.originalFee)}
            </span>
          )}
          <span className="text-xs font-semibold text-gray-500 ml-auto">per year</span>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
          Apply Now <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  const institution = useInstitution();
  const courses = institution.sections.courses;

  const [activeFilter, setActiveFilter] = useState('All');

  if (!courses || courses.length === 0) return null;

  // Determine which filter pills to show based on actual course titles
  const availableFilters = MODE_FILTERS.filter((f) => {
    if (f === 'All') return true;
    return courses.some((c) => {
      const title = c.title.toUpperCase();
      const mode = c.mode.toUpperCase();
      return title.includes(f.toUpperCase()) || mode.includes(f.toUpperCase());
    });
  });

  const filtered =
    activeFilter === 'All'
      ? courses
      : courses.filter((c) => {
          const title = c.title.toUpperCase();
          const mode = c.mode.toUpperCase();
          return (
            title.includes(activeFilter.toUpperCase()) ||
            mode.includes(activeFilter.toUpperCase())
          );
        });

  return (
    <section className="py-16 md:py-20 bg-white" id="section-courses">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Explore Our Programmes
          </h2>
          <p className="text-gray-500 max-w-2xl">
            From undergraduate to doctoral programmes — find the right course for your academic journey.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {availableFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                activeFilter === filter
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm py-10 text-center">
            No courses found for the selected filter.
          </p>
        )}
      </div>
    </section>
  );
}
