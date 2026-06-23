'use client';

import { FileText, BookOpen, RotateCcw, Sigma, BookMarked, FileCheck, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';
import SectionHeading from './SectionHeading';
import type { StudyMaterial } from '@/data/coachingData';

interface TypeConfig {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  badgeClass: string;
}

const TYPE_CONFIG: Record<StudyMaterial['type'], TypeConfig> = {
  PDF: { icon: FileText, bgColor: 'bg-red-100', iconColor: 'text-red-600', badgeClass: 'bg-red-100 text-red-700' },
  Notes: { icon: BookOpen, bgColor: 'bg-blue-100', iconColor: 'text-blue-600', badgeClass: 'bg-blue-100 text-blue-700' },
  PYP: { icon: RotateCcw, bgColor: 'bg-green-100', iconColor: 'text-green-600', badgeClass: 'bg-green-100 text-green-700' },
  Formula: { icon: Sigma, bgColor: 'bg-orange-100', iconColor: 'text-orange-600', badgeClass: 'bg-orange-100 text-orange-700' },
  Ebook: { icon: BookMarked, bgColor: 'bg-purple-100', iconColor: 'text-purple-600', badgeClass: 'bg-purple-100 text-purple-700' },
  Sample: { icon: FileCheck, bgColor: 'bg-teal-100', iconColor: 'text-teal-600', badgeClass: 'bg-teal-100 text-teal-700' },
};

export default function StudyMaterialsSection() {
  const { studyMaterials } = useCoachingData();
  return (
    <section id="section-study-materials" className="py-16 md:py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Study Materials"
          title="Free & Premium Resources"
          subtitle="Curated books, notes, formula sheets, and previous year papers to accelerate your preparation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {studyMaterials.map((mat) => {
            const config = TYPE_CONFIG[mat.type];
            const Icon = config.icon;

            return (
              <div
                key={mat.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={22} className={config.iconColor} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#0a2540] text-sm leading-snug mb-2 flex-1">{mat.title}</h3>

                {/* Type badge + pages */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badgeClass}`}>
                    {mat.type}
                  </span>
                  <span className="text-xs text-gray-400">{mat.pages} pages</span>
                </div>

                {/* Downloads + free/paid */}
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Download size={11} />
                    {mat.downloads.toLocaleString()} downloads
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      mat.isFree ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {mat.isFree ? 'FREE' : 'PAID'}
                  </span>
                </div>

                {/* Download button */}
                <button className="w-full flex items-center justify-center gap-1.5 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm py-2 rounded-xl transition-colors">
                  <Download size={13} /> Download
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
