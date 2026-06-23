'use client';

import { FileText, BookOpen, FileQuestion, Sigma, BookMarked, FileCheck, Download, TrendingDown } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';
import type { StudyMaterial } from '@/types/institution';

// Type → { icon, bgColor, textColor, badgeBg, badgeText }
const TYPE_CONFIG: Record<
  StudyMaterial['type'],
  { icon: React.ReactNode; bgColor: string; textColor: string; badgeBg: string; badgeText: string }
> = {
  PDF: {
    icon: <FileText className="w-5 h-5" />,
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
  },
  Notes: {
    icon: <BookOpen className="w-5 h-5" />,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  PYP: {
    icon: <FileQuestion className="w-5 h-5" />,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
  },
  Formula: {
    icon: <Sigma className="w-5 h-5" />,
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
  },
  Ebook: {
    icon: <BookMarked className="w-5 h-5" />,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
  },
  Sample: {
    icon: <FileCheck className="w-5 h-5" />,
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
  },
};

function MaterialCard({ material }: { material: StudyMaterial }) {
  const config = TYPE_CONFIG[material.type];

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      <div className="p-5 flex-1">
        {/* Icon + type badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl ${config.bgColor} ${config.textColor} flex items-center justify-center shrink-0`}>
            {config.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${config.badgeBg} ${config.badgeText}`}>
              {material.type}
            </span>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                material.isFree ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'
              }`}
            >
              {material.isFree ? 'Free' : 'Paid'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#0a2540] mb-3 leading-snug">{material.title}</h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {material.pages !== undefined && (
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-gray-400" />
              {material.pages} pages
            </span>
          )}
          {material.downloads !== undefined && (
            <span className="flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-gray-400" />
              {material.downloads.toLocaleString()} downloads
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <button
          className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            material.isFree
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
          }`}
        >
          <Download className="w-4 h-4" />
          {material.isFree ? 'Download Free' : 'Download'}
        </button>
      </div>
    </div>
  );
}

export default function StudyMaterialsSection() {
  const institution = useInstitution();
  const materials = institution.sections.studyMaterials;

  if (!materials || materials.length === 0) return null;

  const totalDownloads = materials.reduce((sum, m) => sum + (m.downloads ?? 0), 0);
  const freeCount = materials.filter((m) => m.isFree).length;

  return (
    <section className="py-16 md:py-20 bg-white" id="section-studyMaterials">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Study Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Learning Resources
          </h2>
          <p className="text-gray-500">
            Curated study materials to accelerate your exam preparation.
          </p>
        </div>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-[#0a2540]">{materials.length}</span>
            <span className="text-gray-500">resources</span>
          </div>
          {freeCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-bold text-[#0a2540]">{freeCount}</span>
              <span className="text-gray-500">free materials</span>
            </div>
          )}
          {totalDownloads > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-sm">
              <Download className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-[#0a2540]">{totalDownloads.toLocaleString()}</span>
              <span className="text-gray-500">total downloads</span>
            </div>
          )}
        </div>

        {/* Type legend strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.entries(TYPE_CONFIG) as [StudyMaterial['type'], (typeof TYPE_CONFIG)[StudyMaterial['type']]][]).map(
            ([type, cfg]) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}
              >
                {cfg.icon}
                {type}
              </span>
            )
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
}
