'use client';

import { useState } from 'react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';
import CourseCard from './CourseCard';

export default function CoursesSection() {
  const { courses } = useCoachingData();
  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.examCategory)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? courses : courses.filter((c) => c.examCategory === active);

  return (
    <section id="section-courses" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Courses"
          title="Explore Our Courses"
          subtitle="Comprehensive coaching programmes for every major competitive exam — designed by India's top educators."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                active === cat
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
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
