"use client";

import { useEffect, useState } from 'react';
import { Play, X, Quote } from 'lucide-react';
import type { VideoReview, ReviewCard } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import StarRating from '@/components/testimonials/StarRating';

interface LcTestimonialsProps {
  videos: VideoReview[];
  reviews: ReviewCard[];
  rating: number;
  reviewCount: number;
}

export default function LcTestimonials({ videos, reviews, rating, reviewCount }: LcTestimonialsProps) {
  const [active, setActive] = useState<VideoReview | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section className="py-10 scroll-mt-24" id="testimonials">
      <SectionHeading
        eyebrow="Student Testimonials"
        title="Loved by 12,000+ Learners"
        description={`Rated ${rating}/5 across ${reviewCount.toLocaleString('en-IN')} verified reviews.`}
      />

      {/* Video testimonials */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActive(video)}
            className="group relative aspect-video overflow-hidden rounded-2xl text-left ring-1 ring-black/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50"
            aria-label={`Play testimonial from ${video.name}`}
          >
            <img
              src={video.thumbnail}
              alt={video.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/90 via-[#0a2540]/25 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-orange-500 shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play size={22} className="translate-x-0.5 fill-current" />
              </span>
            </span>
            <span className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {video.duration}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="line-clamp-1 text-sm font-bold text-white">{video.name}</p>
              <p className="text-[11px] text-blue-100/80">{video.course}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review) => (
          <figure
            key={review.id}
            className="relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Quote size={28} className="absolute right-4 top-4 text-blue-100" />
            <div className="flex items-center gap-3">
              <img src={review.photo} alt={review.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
              <div>
                <figcaption className="font-bold text-[#0a2540]">{review.name}</figcaption>
                <span className="text-xs font-semibold text-gray-400">{review.language} · {review.date}</span>
              </div>
            </div>
            <StarRating rating={review.rating} size={14} className="mt-3" />
            <blockquote className="mt-2 text-sm leading-relaxed text-gray-600">“{review.text}”</blockquote>
          </figure>
        ))}
      </div>

      {/* Video lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0a2540]/85 backdrop-blur-sm je-animate-fade" onClick={() => setActive(null)} />
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close video"
          >
            <X size={22} />
          </button>
          <figure className="relative z-10 w-full max-w-3xl je-animate-pop">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <img src={active.thumbnail} alt={active.name} className="h-full w-full object-cover opacity-80" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-orange-500 shadow-xl">
                  <Play size={28} className="translate-x-0.5 fill-current" />
                </span>
              </span>
            </div>
            <figcaption className="mt-3 text-center text-sm text-blue-100/90">
              <span className="font-bold text-white">{active.name}</span> — “{active.quote}”
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
