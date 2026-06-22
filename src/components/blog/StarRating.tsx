import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    count?: number;
    size?: 'sm' | 'md';
    className?: string;
}

// Accessible star rating: visual stars are decorative, the value is exposed
// to assistive tech via aria-label.
export default function StarRating({ rating, count, size = 'sm', className = '' }: StarRatingProps) {
    const px = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const rounded = Math.round(rating);
    return (
        <span
            className={`inline-flex items-center gap-1 ${className}`}
            aria-label={`Rated ${rating.toFixed(1)} out of 5${count ? ` from ${count} ratings` : ''}`}
        >
            <span className="flex" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        className={`${px} ${i <= rounded ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                ))}
            </span>
            <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
            {count !== undefined && <span className="text-xs text-gray-400">({count})</span>}
        </span>
    );
}
