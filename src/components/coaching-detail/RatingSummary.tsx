import { Star } from 'lucide-react';

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
  distribution: Record<number, number>;
}

export default function RatingSummary({ rating, reviewCount, distribution }: RatingSummaryProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#0a2540] mb-4">Student Ratings</h3>
      <div className="flex gap-6 items-center">
        {/* Big rating number */}
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

        {/* Bar chart */}
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
