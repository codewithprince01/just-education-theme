"use client";

import { useMemo, useState } from "react";
import { Quote } from "lucide-react";
import {
  successStories,
  courseFilters,
  countryFilters,
} from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";
import StarRating from "./StarRating";

type Filter = (typeof courseFilters)[number] | (typeof countryFilters)[number];

const courseSet = new Set<string>(courseFilters);

export default function SuccessStories() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return successStories;
    if (courseSet.has(active)) {
      return successStories.filter((s) => s.course === active);
    }
    return successStories.filter((s) => s.country === active);
  }, [active]);

  const chips: Filter[] = [...courseFilters, ...countryFilters];

  return (
    <section id="stories" className="bg-[#f8fafc] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="Success Stories"
          title="Journeys Worth Celebrating"
          description="Filter by course or destination to explore stories that mirror your own ambitions."
        />
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 border-y border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {chips.map((chip) => {
              const isActive = active === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActive(chip)}
                  className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No stories match this filter yet — check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story) => (
              <article
                key={story.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0a2540]/10"
              >
                <Quote
                  className="absolute -right-2 -top-2 h-20 w-20 text-[#0a2540]/[0.04] rotate-6"
                  aria-hidden
                />
                <div className="relative flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="h-14 w-14 rounded-full border-2 border-orange-100 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-[#0a2540]">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.course}</p>
                  </div>
                  <span className="ml-auto text-2xl" title={story.country}>
                    {story.flag}
                  </span>
                </div>

                <StarRating rating={story.rating} className="relative mt-4" />

                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  “{story.review}”
                </p>

                <div className="relative mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {story.university}
                  </p>
                  <p className="text-sm font-medium text-orange-500">{story.country}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
