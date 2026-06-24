'use client';

import { useState } from 'react';
import { Star, PlayCircle } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import ReviewCard from './ReviewCard';

type Filter = 'All' | 'Parent' | 'Student';

export default function ReviewsSection() {
  const { rating, reviewCount, ratingDistribution, reviews, videoTestimonials } = useTutor();
  const [filter, setFilter] = useState<Filter>('All');

  const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
  const filtered = filter === 'All' ? reviews : reviews.filter((r) => r.role === filter);

  return (
    <section id="section-reviews" className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Reviews"
          title="Ratings & Reviews"
          subtitle="Honest feedback from parents and students."
        />

        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {/* Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center flex flex-col justify-center">
            <p className="text-5xl font-extrabold text-[#0a2540]">{rating}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <p className="text-sm text-gray-500">Based on {reviewCount} reviews</p>
          </div>

          {/* Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0a2540] text-sm mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingDistribution[star] ?? 0;
                const pct = total ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-500 w-8">
                      {star} <Star size={11} className="fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-5">
          {(['All', 'Parent', 'Student'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {f === 'All' ? 'All Reviews' : `${f} Reviews`}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {filtered.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>

        {/* Video testimonials */}
        <h3 className="font-bold text-[#0a2540] text-base mb-4">Video Testimonials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videoTestimonials.map((v) => (
            <div key={v.id} className="group relative rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img src={v.thumbnail} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <PlayCircle size={48} className="absolute inset-0 m-auto text-white/90 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-bold text-sm">{v.name}</p>
                <p className="text-xs text-white/80">{v.classOrExam}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
