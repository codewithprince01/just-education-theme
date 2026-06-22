"use client";

import { useRef } from 'react';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import type { FacultyMember } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';

interface LcFacultyProps {
  faculty: FacultyMember[];
}

export default function LcFaculty({ faculty }: LcFacultyProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 20 : 300;
    track.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-10 scroll-mt-24" id="faculty">
      <SectionHeading
        eyebrow="Meet the Faculty"
        title="Learn From Native Experts"
        description="Certified, experienced trainers who make fluency feel natural."
      />

      {/* Carousel */}
      <div className="relative">

        {/* Left arrow — inside bounds, overlays track edge */}
        <button
          onClick={() => scroll('left')}
          aria-label="Previous faculty"
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all hover:border-[#0a2540] hover:bg-[#0a2540] hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Track — px-14 keeps cards clear of both arrows */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {faculty.map((member) => (
            <div
              key={member.id}
              data-card=""
              className="group w-[calc(25%-15px)] shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a2540]/80 to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#0a2540] shadow-sm">
                  <Briefcase size={11} className="mr-1 inline" />{member.experience}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-extrabold text-[#0a2540]">{member.name}</h3>
                <p className="mt-0.5 text-xs font-semibold text-orange-600">{member.designation}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {member.languages.map((lang) => (
                    <span key={lang} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Next faculty"
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all hover:border-[#0a2540] hover:bg-[#0a2540] hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
