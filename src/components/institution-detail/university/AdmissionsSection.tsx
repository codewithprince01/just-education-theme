'use client';

import {
  ClipboardList,
  CalendarCheck,
  Users,
  CreditCard,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList,
  CalendarCheck,
  Users,
  CreditCard,
  BookOpen,
  GraduationCap,
};

export default function AdmissionsSection() {
  const institution = useInstitution();
  const admissions = institution.sections.admissions;

  if (!admissions) return null;

  const { steps, eligibility, importantDates } = admissions;

  return (
    <section className="py-16 md:py-20 bg-gray-50/60" id="section-admissions">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Admissions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Admission Process
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Follow these steps to secure your seat. Our admissions team is here to guide you at every stage.
          </p>
        </div>

        {/* Horizontal step timeline — desktop */}
        {steps && steps.length > 0 && (
          <>
            <div className="hidden md:flex items-start gap-0 mb-14">
              {steps.map((step, idx) => {
                const Icon = ICON_MAP[step.icon] ?? BookOpen;
                const isLast = idx === steps.length - 1;

                return (
                  <div
                    key={step.stepNumber}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {/* Connector line */}
                    {!isLast && (
                      <div className="absolute top-7 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-200 z-0" />
                    )}

                    {/* Step circle */}
                    <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-[#0a2540] flex items-center justify-center shadow-lg mb-3 border-4 border-white">
                      <Icon size={22} className="text-white" />
                    </div>

                    <span className="text-xs font-bold text-blue-600 mb-1">
                      Step {step.stepNumber}
                    </span>
                    <h3 className="font-bold text-[#0a2540] text-sm text-center mb-1 px-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Vertical step timeline — mobile */}
            <div className="flex md:hidden flex-col gap-0 mb-10">
              {steps.map((step, idx) => {
                const Icon = ICON_MAP[step.icon] ?? BookOpen;
                const isLast = idx === steps.length - 1;

                return (
                  <div key={step.stepNumber} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-[#0a2540] flex items-center justify-center shadow-md border-4 border-white shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      {!isLast && (
                        <div className="w-0.5 flex-1 bg-blue-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="text-xs font-bold text-blue-600">
                        Step {step.stepNumber}
                      </span>
                      <h3 className="font-bold text-[#0a2540] text-sm mt-0.5 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Two-column: Eligibility + Important Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligibility Criteria */}
          {eligibility && eligibility.length > 0 && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-extrabold text-[#0a2540] mb-4 flex items-center gap-2">
                <ClipboardList size={18} className="text-blue-600" />
                Eligibility Criteria
              </h3>
              <ul className="flex flex-col gap-3">
                {eligibility.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Important Dates */}
          {importantDates && importantDates.length > 0 && (
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6">
              <h3 className="text-lg font-extrabold text-[#0a2540] mb-4 flex items-center gap-2">
                <CalendarCheck size={18} className="text-blue-600" />
                Important Dates
              </h3>
              <ul className="flex flex-col gap-0">
                {importantDates.map((entry, i) => {
                  const isLast = i === importantDates.length - 1;
                  return (
                    <li key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0">
                          <Calendar size={13} className="text-blue-600" />
                        </div>
                        {!isLast && (
                          <div className="w-0.5 flex-1 bg-blue-100 my-1" />
                        )}
                      </div>
                      <div className={`${!isLast ? 'pb-5' : ''}`}>
                        <p className="text-sm font-semibold text-[#0a2540] leading-tight">
                          {entry.label}
                        </p>
                        <p className="text-xs text-blue-600 font-bold mt-0.5">
                          {entry.date}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
