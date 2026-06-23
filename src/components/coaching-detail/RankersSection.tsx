'use client';

import { Trophy, Star, Quote } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

function getMedalStyle(rank: number) {
  if (rank === 1) return 'from-yellow-400 via-amber-300 to-yellow-600 border-yellow-400';
  if (rank === 2) return 'from-gray-300 via-gray-200 to-gray-400 border-gray-300';
  if (rank === 3) return 'from-amber-700 via-amber-600 to-amber-800 border-amber-700';
  return 'from-blue-500 to-indigo-600 border-blue-400';
}

export default function RankersSection() {
  const { rankers, institute } = useCoachingData();
  const TOP_STATS = [
    { label: 'Total Selections', value: institute.metrics.totalSelections, icon: Trophy },
    { label: 'AIR 1 Holders', value: '6', icon: Star },
    { label: 'Success Rate', value: institute.metrics.successRate, icon: Trophy },
  ];
  return (
    <section id="section-results" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Our Rankers"
          title="Hall of Fame"
          subtitle="Celebrating our students who made it to the very top of India's most competitive examinations."
          align="center"
        />

        {/* Top stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {TOP_STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <Icon size={22} className="text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-extrabold text-[#0a2540]">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Rankers grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rankers.map((r) => {
            const isTop3 = r.airRank <= 3;
            const medalStyle = getMedalStyle(r.airRank);

            return (
              <div
                key={r.id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden flex flex-col ${
                  r.airRank === 1 ? 'border-yellow-200 ring-2 ring-yellow-300/40' : 'border-gray-100'
                }`}
              >
                {/* Gradient avatar area */}
                <div className={`relative bg-gradient-to-br ${isTop3 ? medalStyle : 'from-blue-500 to-indigo-600 border-blue-400'} p-4 flex flex-col items-center`}>
                  {/* AIR Badge */}
                  <div className={`absolute top-2 right-2 bg-gradient-to-br ${medalStyle} border text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg shadow`}>
                    AIR {r.airRank}
                  </div>

                  <img
                    src={r.photo}
                    alt={r.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white/50 shadow-md mb-2"
                  />
                  <h3 className="font-bold text-white text-sm text-center leading-tight">{r.name}</h3>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{r.exam}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.year}</span>
                  </div>

                  <p className="text-sm font-extrabold text-[#0a2540] mb-0.5">{r.score}</p>
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium w-fit mb-3">
                    {r.course}
                  </span>

                  {/* Testimonial */}
                  <div className="flex-1 mt-auto">
                    <Quote size={12} className="text-gray-300 mb-1" />
                    <p className="text-[11px] text-gray-500 leading-snug italic line-clamp-3">{r.testimonial}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
