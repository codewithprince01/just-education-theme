'use client';

import { Trophy, Star, Quote, Users, TrendingUp, Award } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { Ranker } from '@/types/institution';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getRankStyle(rank: number): { gradient: string; badge: string; textColor: string } {
  if (rank === 1) return { gradient: 'from-yellow-400 to-amber-500', badge: 'bg-yellow-400 text-yellow-900', textColor: 'text-yellow-600' };
  if (rank === 2) return { gradient: 'from-gray-300 to-slate-400', badge: 'bg-gray-300 text-gray-800', textColor: 'text-gray-500' };
  if (rank === 3) return { gradient: 'from-orange-400 to-amber-600', badge: 'bg-orange-400 text-orange-900', textColor: 'text-orange-600' };
  return { gradient: 'from-blue-500 to-blue-700', badge: 'bg-blue-100 text-blue-700', textColor: 'text-blue-600' };
}

function RankerCard({ ranker }: { ranker: Ranker }) {
  const style = getRankStyle(ranker.airRank);

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden flex flex-col">
      {/* Top gradient strip */}
      <div className={`h-1.5 bg-gradient-to-r ${style.gradient}`} />

      <div className="p-5 flex-1">
        {/* Photo / initials + name */}
        <div className="flex items-center gap-4 mb-4">
          {ranker.photo ? (
            <img
              src={ranker.photo}
              alt={ranker.name}
              className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-gray-100"
            />
          ) : (
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center shrink-0`}>
              <span className="text-white font-extrabold text-lg">{getInitials(ranker.name)}</span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold text-[#0a2540] text-base leading-snug truncate">{ranker.name}</h3>
            <p className="text-sm text-gray-500 truncate">{ranker.exam} · {ranker.year}</p>
          </div>
        </div>

        {/* AIR Rank badge + score */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${style.badge}`}>
            <Trophy className="w-3 h-3" />
            AIR {ranker.airRank}
          </span>
          <span className="text-sm text-gray-600 font-semibold">Score: {ranker.score}</span>
        </div>

        {/* Testimonial */}
        {ranker.testimonial && (
          <blockquote className="relative pl-4 border-l-2 border-cyan-300">
            <Quote className="w-3.5 h-3.5 text-cyan-400 mb-1" />
            <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-3">{ranker.testimonial}</p>
          </blockquote>
        )}
      </div>
    </div>
  );
}

export default function RankersSection() {
  const institution = useInstitution();
  const rankers = institution.sections.rankers;
  const metrics = institution.metrics;

  if (!rankers || rankers.length === 0) return null;

  // Sort by AIR rank ascending
  const sorted = [...rankers].sort((a, b) => a.airRank - b.airRank);

  const totalSelections = (metrics.totalSelections as number | undefined) ?? rankers.length;
  const successRate = (metrics.successRate as string | undefined) ?? null;
  const facultyCount = (metrics.facultyCount as number | undefined) ?? null;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-rankers">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Our Rankers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Hall of Fame
          </h2>
          <p className="text-gray-500">Students who achieved top ranks across competitive exams.</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-gray-100 shadow-sm bg-blue-600 text-white p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{totalSelections}+</p>
              <p className="text-blue-100 text-xs font-medium">Total Selections</p>
            </div>
          </div>

          {successRate && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0a2540]">{successRate}</p>
                <p className="text-gray-500 text-xs font-medium">Success Rate</p>
              </div>
            </div>
          )}

          {facultyCount && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0a2540]">{facultyCount}+</p>
                <p className="text-gray-500 text-xs font-medium">Expert Faculty</p>
              </div>
            </div>
          )}
        </div>

        {/* Ranker grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((ranker) => (
            <RankerCard key={ranker.id} ranker={ranker} />
          ))}
        </div>
      </div>
    </section>
  );
}
