import { Star, BadgeCheck } from 'lucide-react';
import type { TutorReview } from '@/data/tutors/types';

const GRADIENTS = [
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-yellow-500',
  'from-rose-500 to-red-500',
  'from-cyan-500 to-blue-500',
];

export default function ReviewCard({ review }: { review: TutorReview }) {
  const initials = review.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const gradient = GRADIENTS[review.id.charCodeAt(review.id.length - 1) % GRADIENTS.length];
  const formattedDate = new Date(review.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 w-11 h-11 rounded-full overflow-hidden">
          {review.photo ? (
            <img
              src={review.photo}
              alt={review.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold`}
            style={{ display: review.photo ? 'none' : 'flex' }}
          >
            {initials}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#0a2540] text-sm">{review.name}</span>
            {review.isVerified && <BadgeCheck size={14} className="text-blue-600 shrink-0" />}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${review.role === 'Parent' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
              {review.role}
            </span>
            <span className="text-[11px] text-gray-400">{review.subject}</span>
          </div>
        </div>

        <span className="text-xs text-gray-400 shrink-0">{formattedDate}</span>
      </div>

      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
    </div>
  );
}
