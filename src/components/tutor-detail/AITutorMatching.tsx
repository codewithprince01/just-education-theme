'use client';

import { Sparkles, Target, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

export default function AITutorMatching() {
  const { aiMatch, similarTutors, currency } = useTutor();

  return (
    <section className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="AI Powered"
          title="Your AI Tutor Match"
          subtitle="We analysed your learning profile to find how well this tutor fits you."
        />

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Match ring card */}
          <div className="bg-gradient-to-br from-[#0a2540] to-[#13345c] rounded-2xl p-6 text-white relative overflow-hidden">
            <Sparkles className="absolute top-4 right-4 text-cyan-400/40" size={28} />
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-4">Compatibility Score</p>
            <div className="flex items-center gap-5">
              <div
                className="relative w-28 h-28 rounded-full shrink-0 grid place-items-center"
                style={{ background: `conic-gradient(#22d3ee ${aiMatch.percentage * 3.6}deg, rgba(255,255,255,0.12) 0deg)` }}
              >
                <div className="w-[88px] h-[88px] rounded-full bg-[#0a2540] grid place-items-center">
                  <span className="text-2xl font-extrabold">{aiMatch.percentage}%</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Excellent Match</p>
                <p className="text-sm text-white/70 mt-1">{aiMatch.recommendedFor}</p>
              </div>
            </div>
          </div>

          {/* Detail cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={18} className="text-blue-600" />
                <h3 className="font-bold text-[#0a2540] text-sm">Learning Style Match</h3>
              </div>
              <p className="text-sm text-gray-600">{aiMatch.learningStyleMatch}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} className="text-blue-600" />
                <h3 className="font-bold text-[#0a2540] text-sm">Recommended For</h3>
              </div>
              <p className="text-sm text-gray-600">{aiMatch.recommendedFor}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:col-span-2">
              <h3 className="font-bold text-[#0a2540] text-sm mb-3">Why this tutor fits you</h3>
              <ul className="grid sm:grid-cols-3 gap-2.5">
                {aiMatch.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Similar tutors strip */}
        <div className="mt-8">
          <h3 className="font-bold text-[#0a2540] text-base mb-4">Similar tutors you may like</h3>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {similarTutors.map((t) => (
              <div key={t.id} className="shrink-0 w-60 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="font-bold text-[#0a2540] text-sm truncate">{t.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{t.headline}</p>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{currency}{t.hourlyFee}/hr</p>
                </div>
                <ArrowRight size={16} className="text-gray-300 ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
