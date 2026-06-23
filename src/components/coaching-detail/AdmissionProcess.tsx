'use client';

import {
  ClipboardList,
  CalendarCheck,
  Users,
  CreditCard,
  BookOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList,
  CalendarCheck,
  Users,
  CreditCard,
  BookOpen,
};

export default function AdmissionProcess() {
  const { institute } = useCoachingData();
  const steps = institute.admissionSteps;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Admission"
          title="How to Join APEX"
          subtitle="Get started in 5 simple steps. Our team will guide you at every stage."
          align="center"
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, idx) => {
            const Icon = ICON_MAP[step.icon] ?? BookOpen;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.stepNumber} className="flex-1 flex flex-col items-center relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute top-7 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-200 z-0" />
                )}

                {/* Step circle */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-[#0D4B75] flex items-center justify-center shadow-lg mb-3 border-4 border-white">
                  <Icon size={22} className="text-white" />
                </div>

                {/* Step number */}
                <span className="text-xs font-bold text-blue-600 mb-1">Step {step.stepNumber}</span>
                <h3 className="font-bold text-[#0a2540] text-sm text-center mb-1 px-2">{step.title}</h3>
                <p className="text-xs text-gray-500 text-center leading-relaxed px-2">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical timeline */}
        <div className="flex md:hidden flex-col gap-0">
          {steps.map((step, idx) => {
            const Icon = ICON_MAP[step.icon] ?? BookOpen;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.stepNumber} className="flex gap-4">
                {/* Left: circle + line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-[#0D4B75] flex items-center justify-center shadow-md border-4 border-white shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  {!isLast && <div className="w-0.5 flex-1 bg-blue-200 mt-1" />}
                </div>

                {/* Right: content */}
                <div className="pb-8">
                  <span className="text-xs font-bold text-blue-600">Step {step.stepNumber}</span>
                  <h3 className="font-bold text-[#0a2540] text-sm mt-0.5 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
