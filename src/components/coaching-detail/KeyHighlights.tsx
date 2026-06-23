'use client';

import {
  Users,
  Trophy,
  TrendingUp,
  GraduationCap,
  BookOpenCheck,
  ClipboardCheck,
  Layers,
  Award,
  BadgeCheck,
  CreditCard,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Trophy,
  TrendingUp,
  GraduationCap,
  BookOpenCheck,
  ClipboardCheck,
  Layers,
  Award,
  BadgeCheck,
  CreditCard,
};

export default function KeyHighlights() {
  const { highlights } = useCoachingData();
  return (
    <section className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Why APEX"
          title="Key Highlights"
          subtitle="What makes APEX Coaching Institute the preferred choice for 2.5 lakh+ students."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {highlights.map((h) => {
            const Icon = ICON_MAP[h.icon] ?? Award;
            return (
              <div
                key={h.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 p-4 flex flex-col items-center text-center group cursor-default"
              >
                <div className={`w-12 h-12 ${h.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} className="text-current opacity-70" />
                </div>
                <h3 className="font-bold text-[#0a2540] text-sm leading-tight mb-1">{h.title}</h3>
                <p className="text-xs text-gray-500 leading-snug">{h.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
