'use client';

import { Video, School, Layers, BookOpen, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const MODE_CONFIG: Record<
  string,
  { Icon: LucideIcon; description: string; color: string; bg: string }
> = {
  'Online Live': {
    Icon: Video,
    description:
      'Interactive live sessions with real-time doubt solving from expert instructors, accessible from anywhere.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  'Offline Classroom': {
    Icon: School,
    description:
      'In-person classroom training in a structured environment with peer interaction and direct faculty access.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  Blended: {
    Icon: Layers,
    description:
      'A hybrid approach combining the best of online and offline learning for maximum flexibility and depth.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  'Self-paced': {
    Icon: BookOpen,
    description:
      'Learn at your own schedule with recorded lectures, downloadable materials, and lifetime access.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
};

const DEFAULT_CONFIG = {
  Icon: GraduationCap,
  description: 'A flexible learning format designed to suit your individual needs and schedule.',
  color: 'text-cyan-600',
  bg: 'bg-cyan-50',
};

export default function LearningModesSection() {
  const institution = useInstitution();
  const learningModes = institution.sections.learningModes;

  if (!learningModes || learningModes.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-learningModes">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading — centered */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Learning Modes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Learn Your Way
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Flexible formats designed around your lifestyle, pace, and learning goals.
          </p>
        </div>

        {/* Mode cards — centered large layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningModes.map((mode) => {
            const config = MODE_CONFIG[mode] ?? DEFAULT_CONFIG;
            const { Icon, description, color, bg } = config;

            return (
              <div
                key={mode}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center text-center p-8 group"
              >
                {/* Icon circle */}
                <div
                  className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                >
                  <Icon size={28} className={color} />
                </div>

                {/* Mode label */}
                <h3 className="font-extrabold text-[#0a2540] text-lg mb-3">{mode}</h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
