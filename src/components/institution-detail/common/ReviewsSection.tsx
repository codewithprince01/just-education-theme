'use client';

import { useState } from 'react';
import { Star, BadgeCheck } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { Review } from '@/types/institution';

const INITIAL_COUNT = 3;

const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-yellow-500',
  'from-red-500 to-rose-500',
  'from-cyan-500 to-blue-500',
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getGradient(id: string) {
  return GRADIENT_COLORS[id.charCodeAt(id.length - 1) % GRADIENT_COLORS.length];
}

function ReviewCard({ review }: { review: Review }) {
  const initials = getInitials(review.studentName);
  const gradient = getGradient(review.id);
  const formattedDate = new Date(review.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="shrink-0 w-11 h-11 rounded-full overflow-hidden">
          {review.photo ? (
            <img
              src={review.photo}
              alt={review.studentName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold`}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name & meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#0a2540] text-sm">{review.studentName}</span>
            {review.isVerified && (
              <BadgeCheck size={14} className="text-blue-600 shrink-0" />
            )}
          </div>
          {review.course && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {review.course}
            </span>
          )}
        </div>

        <span className="text-xs text-gray-400 shrink-0">{formattedDate}</span>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
          />
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{review.reviewText}</p>
    </div>
  );
}

function RatingSummary({
  rating,
  reviewCount,
  distribution,
}: {
  rating: number;
  reviewCount: number;
  distribution: Record<number, number>;
}) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#0a2540] mb-4">Student Ratings</h3>
      <div className="flex gap-6 items-center">
        <div className="flex flex-col items-center shrink-0">
          <span className="text-6xl font-extrabold text-[#0a2540] leading-none">{rating}</span>
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 mt-1">{reviewCount.toLocaleString()} reviews</span>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] ?? 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-gray-600 font-medium shrink-0">{star}</span>
                <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-right text-gray-500 shrink-0">{count.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const institution = useInstitution();
  const reviews = institution.sections.reviews;
  const [showAll, setShowAll] = useState(false);

  if (!reviews || reviews.length === 0) return null;

  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);
  const distribution: Record<number, number> = institution.ratingDistribution ?? {};
  const rating = institution.metrics.rating;
  const reviewCount = institution.metrics.reviewCount ?? reviews.length;

  return (
    <section id="section-reviews" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Student Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            What Our Students Say
          </h2>
          <p className="text-gray-500">
            Real feedback from students who have experienced {institution.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Rating summary — 2/5 */}
          <div className="lg:col-span-2">
            <RatingSummary
              rating={rating}
              reviewCount={Number(reviewCount)}
              distribution={distribution}
            />
          </div>

          {/* Reviews list — 3/5 */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {displayed.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {!showAll && reviews.length > INITIAL_COUNT && (
              <button
                onClick={() => setShowAll(true)}
                className="self-center mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-2.5 rounded-xl transition-colors"
              >
                Load More ({reviews.length - INITIAL_COUNT} more)
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
