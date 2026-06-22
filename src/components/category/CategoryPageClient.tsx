"use client";

import Link from 'next/link';
import { Award } from 'lucide-react';
import { institutionTypes, InstitutionTypeItem } from '@/data/cityData';
import InstitutionsBrowserClient from '@/components/shared/InstitutionsBrowserClient';

interface Props {
  categoryType: string;
}

export default function CategoryPageClient({ categoryType }: Props) {
  const upper = categoryType.toUpperCase();
  const meta: InstitutionTypeItem | undefined = institutionTypes.find((t) => t.value === upper);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">

      {/* ── Category hero ── */}
      <section className="bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">{meta?.label ?? upper}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-5xl shadow-lg shrink-0">
              {meta?.icon ?? '🏫'}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
                <Award size={12} /> Top Rated in India
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">{meta?.label ?? upper}</h1>
              <p className="text-white/80 mt-1 text-sm md:text-base">
                Browse across all cities · Compare fees, ratings &amp; placements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Unified browser — type pre-selected, all cities available ── */}
      <InstitutionsBrowserClient initialType={upper} />
    </div>
  );
}
