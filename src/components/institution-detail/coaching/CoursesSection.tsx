'use client';

import { useState } from 'react';
import { BookOpen, Clock, IndianRupee, Monitor, Laptop, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { Course } from '@/types/institution';

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
};

const MODE_ICONS: Record<string, React.ReactNode> = {
  Online: <Laptop className="w-3.5 h-3.5" />,
  Offline: <Users className="w-3.5 h-3.5" />,
  Hybrid: <Monitor className="w-3.5 h-3.5" />,
};

function formatFee(fee: number) {
  if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L`;
  if (fee >= 1000) return `₹${(fee / 1000).toFixed(0)}K`;
  return `₹${fee}`;
}

function CourseCard({ course }: { course: Course }) {
  const diffClass = DIFFICULTY_COLORS[course.difficulty ?? ''] ?? 'bg-gray-100 text-gray-600';
  const modeIcon = MODE_ICONS[course.mode] ?? <Monitor className="w-3.5 h-3.5" />;

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      <div className="p-5 flex-1">
        {/* Top badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {course.examCategory && (
            <span className="inline-flex px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {course.examCategory}
            </span>
          )}
          {course.difficulty && (
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${diffClass}`}>
              {course.difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#0a2540] mb-3 leading-snug">{course.title}</h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            {modeIcon}
            <span className="text-gray-500">{course.mode}</span>
          </span>
        </div>

        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {course.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-[#0a2540] flex items-center">
            <IndianRupee className="w-4 h-4" />
            {formatFee(course.fee).replace('₹', '')}
          </span>
          {course.originalFee && course.originalFee > course.fee && (
            <span className="text-sm text-gray-400 line-through">{formatFee(course.originalFee)}</span>
          )}
        </div>
        <button className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          Enrol Now <ChevronRight className="w-3.5 h-3.5" />
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

  // Collect unique exam categories
  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.examCategory).filter(Boolean) as string[]))];

  const filtered = activeFilter === 'All' ? courses : courses.filter((c) => c.examCategory === activeFilter);

  return (
    <section className="py-16 md:py-20 bg-white" id="section-courses">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Explore Our Courses
          </h2>
          <p className="text-gray-500">Choose from our comprehensive range of exam-focused programs.</p>
        </div>

        {/* Filter pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
