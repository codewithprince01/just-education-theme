"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  googleReviews,
  googleOverallRating,
  googleReviewCount,
} from "../../data/testimonialsData";
import StarRating from "./StarRating";

/** Inline Google "G" mark so we don't depend on an external asset. */
function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[320px_1fr]">
          {/* Overall rating badge */}
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-8 text-center shadow-sm">
            <div className="mb-4 flex items-center justify-center gap-2">
              <GoogleG />
              <span className="text-lg font-bold text-[#0a2540]">Google Reviews</span>
            </div>
            <div className="text-5xl font-extrabold text-[#0a2540]">
              {googleOverallRating.toFixed(1)}
            </div>
            <div className="mt-2 flex justify-center">
              <StarRating rating={googleOverallRating} size={20} />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Based on{" "}
              <span className="font-semibold text-[#0a2540]">
                {googleReviewCount.toLocaleString("en-IN")}
              </span>{" "}
              reviews
            </p>
            <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              <Star size={12} className="fill-current" /> Highly Rated
            </span>
          </div>

          {/* Reviews carousel */}
          <div className="relative min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-[#0a2540]">
                What People Are Saying
              </h2>
              <div className="hidden gap-2 sm:flex">
                <button
                  onClick={() => scroll("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0a2540] transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0a2540] transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            >
              {googleReviews.map((review) => (
                <article
                  key={review.id}
                  className="flex w-80 shrink-0 snap-start flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-[#0a2540]">
                        {review.name}
                      </h3>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <span className="ml-auto">
                      <GoogleG size={18} />
                    </span>
                  </div>
                  <StarRating rating={review.rating} className="mt-3" />
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {review.review}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
