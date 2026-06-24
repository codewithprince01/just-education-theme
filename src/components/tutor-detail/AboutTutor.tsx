'use client';

import { GraduationCap, CheckCircle2, Quote } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

export default function AboutTutor() {
  const { about, name } = useTutor();

  return (
    <section id="section-about" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading badge="About" title={`Meet ${name.split(' ').slice(0, 2).join(' ')}`} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[7/6]">
              <img src={about.image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3 flex items-center gap-2">
              <Quote className="text-blue-600" size={20} />
              <p className="text-xs font-semibold text-[#0a2540] max-w-[160px]">Trusted by 1,850+ students &amp; parents</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">{about.intro}</p>

            {/* Qualifications */}
            <h3 className="font-bold text-[#0a2540] text-lg mb-3 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" /> Educational Qualifications
            </h3>
            <div className="space-y-2.5 mb-6">
              {about.qualifications.map((q) => (
                <div key={q.id} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="shrink-0 mt-0.5 w-2 h-2 rounded-full bg-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0a2540]">{q.degree}</p>
                    <p className="text-xs text-gray-500">{q.institution}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-400">{q.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy + Why choose */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Teaching Philosophy</h3>
            <p className="text-sm text-white/90 leading-relaxed">{about.philosophy}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#0a2540] text-lg mb-3">Why Students Choose Me</h3>
            <ul className="space-y-2.5">
              {about.whyChoose.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0a2540] text-lg mb-2">Teaching Experience</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{about.experienceText}</p>
        </div>
      </div>
    </section>
  );
}
