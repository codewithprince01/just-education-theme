"use client";

import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  featuredVideo,
  videoTestimonials,
  type VideoTestimonial,
} from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";

function VideoCard({
  video,
  onPlay,
  featured = false,
}: {
  video: VideoTestimonial;
  onPlay: (v: VideoTestimonial) => void;
  featured?: boolean;
}) {
  return (
    <button
      onClick={() => onPlay(video)}
      className={`group relative block overflow-hidden rounded-2xl text-left shadow-lg ring-1 ring-black/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50 ${
        featured ? "w-full aspect-video" : "shrink-0 w-72 aspect-[4/3] snap-start"
      }`}
      aria-label={`Play video testimonial from ${video.name}`}
    >
      <img
        src={video.thumbnail}
        alt={`${video.name} testimonial`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/90 via-[#0a2540]/30 to-transparent" />

      {/* Play button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full bg-white/90 text-orange-500 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white ${
            featured ? "h-20 w-20" : "h-14 w-14"
          }`}
        >
          <Play className="translate-x-0.5 fill-current" size={featured ? 32 : 22} />
        </span>
      </span>

      {/* Duration chip */}
      <span className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        {video.duration}
      </span>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        {featured && (
          <p className="mb-2 max-w-md text-base md:text-lg font-semibold text-white">
            “{video.quote}”
          </p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lg">{video.flag}</span>
          <div>
            <p className="text-sm font-bold text-white">{video.name}</p>
            <p className="text-xs text-blue-100/80">
              {video.course} · {video.university}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function VideoTestimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<VideoTestimonial | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="In Their Own Words"
          title="Featured Video Testimonials"
          description="Watch students share their unfiltered study-abroad experiences — the doubts, the breakthroughs, and the moment it all became real."
        />

        {/* Featured video */}
        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VideoCard video={featuredVideo} onPlay={setActive} featured />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-slate-50 border border-gray-100 p-8">
            <span className="text-4xl">{featuredVideo.flag}</span>
            <h3 className="mt-4 text-2xl font-bold text-[#0a2540]">
              {featuredVideo.name}
            </h3>
            <p className="mt-1 font-medium text-orange-500">
              {featuredVideo.course} Student
            </p>
            <p className="mt-1 text-sm text-gray-500">{featuredVideo.university}</p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              “{featuredVideo.quote}”
            </p>
            <button
              onClick={() => setActive(featuredVideo)}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <Play size={18} className="fill-current" /> Watch Story
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-bold text-[#0a2540]">More Student Stories</h4>
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
            {videoTestimonials.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={setActive} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightweight "player" modal (UI only) */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${active.name}`}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0a2540] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="relative flex aspect-video items-center justify-center">
              <img
                src={active.thumbnail}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="relative text-center text-white">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500">
                  <Play size={32} className="translate-x-0.5 fill-current" />
                </div>
                <p className="text-lg font-bold">{active.name}</p>
                <p className="text-sm text-blue-100/70">
                  Video player placeholder — demo UI only
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
