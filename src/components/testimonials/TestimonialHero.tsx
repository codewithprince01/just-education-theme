"use client";

import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Users,
  Globe2,
  Building2,
  Star,
} from "lucide-react";
import { heroStats } from "../../data/testimonialsData";
import AnimatedCounter from "./AnimatedCounter";

const iconMap = {
  students: Users,
  countries: Globe2,
  universities: Building2,
  rating: Star,
} as const;

export default function TestimonialHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276] pt-14 pb-32">
      {/* Decorative blurred orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <nav className="flex items-center justify-center gap-2 text-blue-200/70 text-sm mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium">Testimonials</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-orange-300 text-sm mb-5 animate-fade-up">
          <Sparkles size={14} />
          <span>4.9/5 from 2,800+ verified students</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-[1.1] max-w-4xl mx-auto animate-fade-up [animation-delay:80ms]">
          Hear From Students Who{" "}
          <span className="text-orange-400">Achieved Their Dreams</span>
        </h1>
        <p className="text-lg text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:160ms]">
          Real journeys. Real outcomes. Discover how thousands of students turned
          their study-abroad aspirations into life-changing realities with expert
          guidance every step of the way.
        </p>
      </div>

      {/* Animated statistic cards */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {heroStats.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.id}
                className="group bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5 md:p-6 text-center transition-all duration-300 hover:bg-white/15 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/20 animate-fade-up"
                style={{ animationDelay: `${240 + i * 90}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-300 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-1 text-xs md:text-sm font-medium text-blue-100/70">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
