'use client';

import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  BookOpen,
  Building2,
  Globe,
  FlaskConical,
  BarChart3,
  Clock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

// Keys already shown in hero — skip here
const SKIP_KEYS = new Set(['rating', 'reviewCount', 'location', 'established']);

// Best-effort mapping of common metric keys to icons
const ICON_MAP: Record<string, LucideIcon> = {
  students: Users,
  studentsTrained: Users,
  faculties: GraduationCap,
  faculty: GraduationCap,
  courses: BookOpen,
  coursesOffered: BookOpen,
  selections: Award,
  totalSelections: Award,
  successRate: TrendingUp,
  placementRate: TrendingUp,
  programs: BookOpen,
  campuses: Building2,
  languages: Globe,
  researchCenters: FlaskConical,
  publications: BarChart3,
  years: Clock,
  experience: Clock,
};

function getIcon(key: string): LucideIcon {
  const lower = key.toLowerCase();
  for (const [pattern, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(pattern.toLowerCase())) return icon;
  }
  return Building2;
}

function toLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export default function QuickFactsSection() {
  const institution = useInstitution();
  const { metrics } = institution;

  const facts = Object.entries(metrics).filter(([key]) => !SKIP_KEYS.has(key));

  if (facts.length === 0) return null;

  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-[#0a2540] to-[#0D4B75]" id="section-quick-facts">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {facts.slice(0, 6).map(([key, val]) => {
            const Icon = getIcon(key);
            return (
              <div
                key={key}
                className="flex flex-col items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-center"
              >
                <Icon size={22} className="text-cyan-300 shrink-0" />
                <span className="text-base font-extrabold text-white leading-none">
                  {typeof val === 'number' ? val.toLocaleString('en-IN') : String(val)}
                </span>
                <span className="text-[11px] text-white/70 leading-snug">{toLabel(key)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
