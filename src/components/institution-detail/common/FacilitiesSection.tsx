'use client';

import {
  Monitor,
  Library,
  Laptop,
  Wifi,
  Bus,
  Home,
  Heart,
  Wind,
  BookOpen,
  UtensilsCrossed,
  FlaskConical,
  HelpCircle,
  Stethoscope,
  HeartHandshake,
  Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Library,
  Laptop,
  Wifi,
  Bus,
  Home,
  Heart,
  Wind,
  BookOpen,
  Utensils: UtensilsCrossed,
  UtensilsCrossed,
  FlaskConical,
  HelpCircle,
  Stethoscope,
  HeartHandshake,
};

export default function FacilitiesSection() {
  const institution = useInstitution();
  const facilities = institution.sections.facilities;

  if (!facilities || facilities.length === 0) return null;

  return (
    <section id="section-facilities" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-8">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Campus Life
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            World-Class Facilities
          </h2>
          <p className="text-gray-500">
            A learning environment designed to help you focus, study, and succeed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {facilities.map((fac) => {
            const Icon = ICON_MAP[fac.icon] ?? Building2;
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-all duration-200 p-5 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-[#0a2540] text-sm mb-1">{fac.name}</h3>
                {fac.description && (
                  <p className="text-xs text-gray-500 leading-snug">{fac.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
