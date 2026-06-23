'use client';

import { useState } from 'react';
import { Clock, FileQuestion, Users, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
};

const categoryColor: Record<string, string> = {
  JEE: 'bg-blue-100 text-blue-700',
  NEET: 'bg-green-100 text-green-700',
  UPSC: 'bg-orange-100 text-orange-700',
  SSC: 'bg-purple-100 text-purple-700',
  Banking: 'bg-teal-100 text-teal-700',
  CAT: 'bg-rose-100 text-rose-700',
  GATE: 'bg-indigo-100 text-indigo-700',
  IELTS: 'bg-cyan-100 text-cyan-700',
};

export default function MockTestsSection() {
  const { mockTests } = useCoachingData();
  const TOTAL_ATTEMPTS = mockTests.reduce((a, m) => a + m.attempts, 0);
  const AVG_RATING = (mockTests.reduce((a, m) => a + m.rating, 0) / mockTests.length).toFixed(1);
  const [filter, setFilter] = useState<'All' | 'Free' | 'Paid'>('All');

  const filtered = mockTests.filter((m) => {
    if (filter === 'Free') return m.isFree;
    if (filter === 'Paid') return !m.isFree;
    return true;
  });

  return (
    <section id="section-mock-tests" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Mock Tests"
          title="All India Test Series"
          subtitle="Practice with exam-level mock tests, get All India Rank, and track your progress."
        />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Tests', value: mockTests.length.toString() },
            { label: 'Total Attempts', value: `${(TOTAL_ATTEMPTS / 1000).toFixed(0)}K+` },
            { label: 'Avg Rating', value: AVG_RATING },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#0a2540]">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['All', 'Free', 'Paid'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-150 ${
                filter === f
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Test cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-5"
            >
              {/* Top badges row */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor[test.examCategory] ?? 'bg-gray-100 text-gray-700'}`}>
                  {test.examCategory}
                </span>
                {test.isFree ? (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">FREE</span>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">PAID</span>
                )}
                {test.isTrending && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                    <TrendingUp size={10} /> TRENDING
                  </span>
                )}
                {test.hasAllIndiaRank && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">AIR</span>
                )}
              </div>

              <h3 className="font-bold text-[#0a2540] text-sm leading-tight mb-3">{test.name}</h3>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <FileQuestion size={12} /> {test.questionsCount} Qs
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {test.duration} mins
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {test.attempts.toLocaleString()} attempts
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[test.difficulty] ?? 'bg-gray-100 text-gray-700'}`}>
                  {test.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#0a2540]">{test.rating}</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Start Test <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
