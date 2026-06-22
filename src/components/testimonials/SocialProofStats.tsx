"use client";

import { socialStats } from "../../data/testimonialsData";
import AnimatedCounter from "./AnimatedCounter";

export default function SocialProofStats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] py-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Numbers That Speak for Themselves
          </h2>
          <p className="mt-3 text-blue-100/70">
            A track record built on outcomes, not promises.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {socialStats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-orange-400">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <p className="mt-2 text-sm md:text-base font-medium text-blue-100/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
