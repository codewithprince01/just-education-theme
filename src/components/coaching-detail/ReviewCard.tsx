import { Star, BadgeCheck } from 'lucide-react';
import type { Review } from '@/data/coachingData';

interface ReviewCardProps {
  review: Review;
}

const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-yellow-500',
  'from-red-500 to-rose-500',
  'from-cyan-500 to-blue-500',
];

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.studentName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const colorIndex = review.id.charCodeAt(review.id.length - 1) % GRADIENT_COLORS.length;
  const gradientClass = GRADIENT_COLORS[colorIndex];

  const formattedDate = new Date(review.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="shrink-0 w-11 h-11 rounded-full overflow-hidden">
          {review.photo ? (
            <img
              src={review.photo}
              alt={review.studentName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-sm font-bold`}
            style={{ display: review.photo ? 'none' : 'flex' }}
          >
            {initials}
          </div>
        </div>

        {/* Name & meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#0a2540] text-sm">{review.studentName}</span>
            {review.isVerified && (
              <BadgeCheck size={14} className="text-blue-600 shrink-0" />
            )}
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {review.course}
          </span>
        </div>

        {/* Date */}
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

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{review.reviewText}</p>
    </div>
  );
}
