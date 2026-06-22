"use client";

import {
  Sparkles,
  MessagesSquare,
  GraduationCap,
  Stamp,
  Plane,
  School,
  type LucideIcon,
} from "lucide-react";
import { journeySteps } from "../../data/testimonialsData";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  dream: Sparkles,
  counseling: MessagesSquare,
  admission: GraduationCap,
  visa: Stamp,
  travel: Plane,
  enrollment: School,
};

export default function JourneyTimeline() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <SectionHeading
          eyebrow="Step by Step"
          title="The Student Journey"
          description="Every success story follows a proven path. Here's how we walk with you from a spark of ambition to your first day on campus."
        />

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-orange-400 via-blue-300 to-[#0a2540] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-10 md:space-y-0">
            {journeySteps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={step.id}
                  className={`relative md:flex md:items-center md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="ml-16 md:ml-0 md:w-1/2">
                    <div
                      className={`group rounded-2xl border border-gray-100 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg ${
                        isLeft ? "md:mr-8 md:text-right" : "md:ml-8 md:text-left"
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                        Step {step.id}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-[#0a2540]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Node with icon */}
                  <span className="absolute left-6 top-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2 transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </span>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
