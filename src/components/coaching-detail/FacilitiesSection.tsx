'use client';

import {
  Monitor,
  Library,
  Laptop,
  Building2,
  UtensilsCrossed,
  HelpCircle,
  Stethoscope,
  Wifi,
  HeartHandshake,
  Bus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Library,
  Laptop,
  Building2,
  UtensilsCrossed,
  HelpCircle,
  Stethoscope,
  Wifi,
  HeartHandshake,
  Bus,
};

export default function FacilitiesSection() {
  const { facilities } = useCoachingData();
  return (
    <section id="section-facilities" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Campus Life"
          title="World-Class Facilities"
          subtitle="A learning environment designed to help you focus, study, and succeed."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {facilities.map((fac) => {
            const Icon = ICON_MAP[fac.icon] ?? Monitor;
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 p-5 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-[#0a2540] text-sm mb-1">{fac.name}</h3>
                <p className="text-xs text-gray-500 leading-snug">{fac.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
