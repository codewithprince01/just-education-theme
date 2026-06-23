'use client';

import {
  BookOpen,
  Newspaper,
  Film,
  Music,
  Laptop,
  Map,
  Archive,
  FileText,
  Library,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Newspaper,
  Film,
  Music,
  Laptop,
  Map,
  Archive,
  FileText,
  Library,
};

export default function CollectionsSection() {
  const institution = useInstitution();
  const collections = institution.sections.collections;

  if (!collections || collections.length === 0) return null;

  const totalCount = collections.reduce((sum, col) => sum + col.count, 0);

  return (
    <section className="py-16 md:py-20 bg-white" id="section-collections">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">
            Our Library Collections
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-gray-500 text-base md:text-lg">
              Explore a vast repository of knowledge across{' '}
              <span className="font-bold text-[#0a2540]">
                {totalCount.toLocaleString('en-IN')}+
              </span>{' '}
              total resources.
            </p>
          </div>
        </div>

        {/* Collection stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {collections.map((col) => {
            const Icon = ICON_MAP[col.icon] ?? Library;

            return (
              <div
                key={col.id}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col p-6 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon size={22} className="text-blue-600" />
                </div>

                {/* Category name */}
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  {col.category}
                </p>

                {/* Count — large and bold */}
                <p className="text-4xl font-extrabold text-[#0a2540] mb-2 tabular-nums">
                  {col.count.toLocaleString('en-IN')}
                  <span className="text-lg text-gray-400 font-semibold ml-1">+</span>
                </p>

                {/* Description */}
                {col.description && (
                  <p className="text-sm text-gray-500 leading-relaxed mt-auto pt-2 border-t border-gray-100">
                    {col.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
