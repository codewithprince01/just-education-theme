'use client';

import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';

export default function FinalCTA({ onBookTrial }: { onBookTrial?: () => void }) {
  const { name } = useTutor();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#13345c] to-[#0d6e9c] px-6 py-12 md:px-12 md:py-16 text-center">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4">
              <Sparkles size={13} /> Limited slots this month
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
              Start Learning With the Right Tutor Today
            </h2>
            <p className="text-white/70 text-sm md:text-base mt-3 max-w-xl mx-auto">
              Book a free trial class with {name.split(' ').slice(0, 2).join(' ')} and experience personalised teaching that delivers real results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <button
                onClick={onBookTrial}
                className="w-full sm:w-auto bg-white text-[#0a2540] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Book Free Trial <ArrowRight size={16} />
              </button>
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Search size={16} /> Explore Similar Tutors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
