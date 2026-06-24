'use client';

import { ShieldCheck, Check } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';
import { Icon } from './icons';

export default function VerificationSection() {
  const { verifications } = useTutor();

  return (
    <section className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Trust & Safety"
          title="Verified & Trusted"
          subtitle="Every credential is checked so you can book with complete confidence."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {verifications.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 text-center relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={13} className="text-white" strokeWidth={3} />
              </span>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-3">
                <Icon name={v.icon} size={24} className="text-white" />
              </div>
              <p className="font-bold text-[#0a2540] text-sm leading-tight">{v.label}</p>
              <p className="text-[11px] text-gray-500 mt-1">{v.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <ShieldCheck size={16} className="text-green-500" />
          All tutors undergo a rigorous 5-step verification process.
        </div>
      </div>
    </section>
  );
}
