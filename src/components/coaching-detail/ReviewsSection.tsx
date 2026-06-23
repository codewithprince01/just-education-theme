'use client';

import { useState } from 'react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';

const INITIAL_COUNT = 4;

export default function ReviewsSection() {
  const { reviews, institute } = useCoachingData();
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);

  return (
    <section id="section-reviews" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Student Reviews"
          title="What Our Students Say"
          subtitle="Real feedback from students who transformed their futures at APEX."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Rating Summary (left, 2/5 width) */}
          <div className="lg:col-span-2">
            <RatingSummary
              rating={institute.rating}
              reviewCount={institute.reviewCount}
              distribution={institute.ratingDistribution}
            />
          </div>

          {/* Reviews list (right, 3/5 width) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {displayed.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {!showAll && reviews.length > INITIAL_COUNT && (
              <button
                onClick={() => setShowAll(true)}
                className="self-center mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-2.5 rounded-xl transition-colors"
              >
                Load More Reviews ({reviews.length - INITIAL_COUNT} more)
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
