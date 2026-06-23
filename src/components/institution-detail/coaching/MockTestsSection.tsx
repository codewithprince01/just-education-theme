'use client';

import { useState } from 'react';
import { ClipboardList, Clock, Star, TrendingUp, Users, ChevronRight, Flame } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { MockTest } from '@/types/institution';

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < full ? 'text-amber-400 fill-amber-400' : half && i === full ? 'text-amber-400 fill-amber-200' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

function MockTestCard({ test }: { test: MockTest }) {
  const diffClass = DIFFICULTY_COLORS[test.difficulty] ?? 'bg-gray-100 text-gray-600';

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      <div className="p-5 flex-1">
        {/* Top badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {test.examCategory}
          </span>
          {test.isTrending && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
              <Flame className="w-3 h-3" /> Trending
            </span>
          )}
          <span
            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              test.isFree ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'
            }`}
          >
            {test.isFree ? 'Free' : 'Paid'}
          </span>
        </div>

        {/* Test name */}
        <h3 className="text-base font-bold text-[#0a2540] mb-3 leading-snug">{test.name}</h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <ClipboardList className="w-3.5 h-3.5 text-blue-500" />
            {test.questionsCount} Qs
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            {test.duration} mins
          </span>
          <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${diffClass}`}>
            {test.difficulty}
          </span>
        </div>

        {/* Attempts + rating */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {test.attempts.toLocaleString()} attempts
          </span>
          {test.rating !== undefined && <StarRating rating={test.rating} />}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
          Attempt Now <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function MockTestsSection() {
  const institution = useInstitution();
  const mockTests = institution.sections.mockTests;

  const [activeFilter, setActiveFilter] = useState<'All' | 'Free' | 'Paid'>('All');

  if (!mockTests || mockTests.length === 0) return null;

  const filtered =
    activeFilter === 'All'
      ? mockTests
      : activeFilter === 'Free'
      ? mockTests.filter((t) => t.isFree)
      : mockTests.filter((t) => !t.isFree);

  const totalAttempts = mockTests.reduce((sum, t) => sum + t.attempts, 0);
  const ratingsWithValue = mockTests.filter((t) => t.rating !== undefined);
  const avgRating =
    ratingsWithValue.length > 0
      ? ratingsWithValue.reduce((sum, t) => sum + (t.rating ?? 0), 0) / ratingsWithValue.length
      : null;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-mockTests">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Mock Tests
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Practice &amp; Assess
          </h2>
          <p className="text-gray-500">Sharpen your exam skills with our comprehensive mock test series.</p>
        </div>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-[#0a2540]">{totalAttempts.toLocaleString()}</span>
            <span className="text-gray-500">total attempts</span>
          </div>
          {avgRating !== null && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-[#0a2540]">{avgRating.toFixed(1)}</span>
              <span className="text-gray-500">avg rating</span>
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-[#0a2540]">{mockTests.length}</span>
            <span className="text-gray-500">tests available</span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-8">
          {(['All', 'Free', 'Paid'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeFilter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((test) => (
            <MockTestCard key={test.id} test={test} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No {activeFilter.toLowerCase()} tests available right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}
