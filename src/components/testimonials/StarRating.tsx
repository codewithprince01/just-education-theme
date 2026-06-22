import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

/** Renders a 5-star rating with the filled portion in the brand orange. */
export default function StarRating({ rating, size = 16, className = "" }: StarRatingProps) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? "fill-orange-400 text-orange-400"
              : "fill-transparent text-gray-300"
          }
        />
      ))}
    </div>
  );
}
