"use client";

import { useState } from 'react';
import { Clock, BadgeCheck, ChevronRight, Globe, Search, X, Users, Wallet, CheckCircle2, Briefcase } from 'lucide-react';
import type { LanguageOffering } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import { useEnquiry } from './EnquiryProvider';

interface LcLanguagesProps {
  languages: LanguageOffering[];
}

const levelBadge: Record<string, string> = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced:     'bg-rose-100 text-rose-700',
  'All Levels': 'bg-blue-100 text-blue-700',
};

export default function LcLanguages({ languages }: LcLanguagesProps) {
  const [selected, setSelected] = useState<LanguageOffering>(languages[0]);
  const [query, setQuery] = useState('');
  const { openEnquiry: open } = useEnquiry();

  const filtered = query.trim()
    ? languages.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
    : languages;

  return (
    <section className="py-10 scroll-mt-24" id="languages">
      <SectionHeading
        eyebrow="Languages Offered"
        title="9 World Languages, One Academy"
        description="Choose from globally certified programs taught by native trainers."
      />

      {/* ── Mobile: horizontal pill selector ───────────────────────── */}
      <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:hidden">
        {languages.map((lang, idx) => (
          <button
            key={lang.name}
            onClick={() => setSelected(lang)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
              selected.name === lang.name
                ? 'bg-[#0a2540] text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-[11px] font-extrabold opacity-50 tabular-nums">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>

      {/* ── Layout: sidebar + detail ────────────────────────────────── */}
      <div className="flex flex-col gap-4 lg:flex-row">

        {/* ── Left: full-height card (desktop only) ────────────────── */}
        <div className="hidden lg:flex lg:w-56 xl:w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md min-w-0">
          {/* Search bar */}
          <div className="border-b border-gray-100 p-3">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search language…"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#0a2540] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a2540]/10 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Language list — fills remaining height */}
          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Language selector"
          >
            {filtered.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">No languages found</p>
            )}
            {filtered.map((lang) => {
              const globalIdx = languages.indexOf(lang);
              const isActive = selected.name === lang.name;
              return (
                <button
                  key={lang.name}
                  onClick={() => setSelected(lang)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0a2540] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold tabular-nums transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-500 group-hover:bg-[#0a2540]/10 group-hover:text-[#0a2540]'
                  }`}>
                    {String(globalIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1 text-sm font-bold">{lang.name}</span>
                  <ChevronRight size={14} className={`shrink-0 transition-all duration-200 ${isActive ? 'translate-x-0.5 opacity-70' : 'opacity-0 group-hover:opacity-40'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Right: detail panel ──────────────────────────────────── */}
        <div
          key={selected.name}
          className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md je-animate-fade"
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] to-[#0d3a6e] p-6 text-white sm:p-8">
            <span className="pointer-events-none absolute -right-4 -top-4 select-none text-[130px] leading-none opacity-[0.10]">
              {selected.flag}
            </span>
            <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${selected.gradient}`} />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selected.gradient} text-5xl shadow-lg`}>
                {selected.flag}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-3xl font-extrabold tracking-tight">{selected.name}</h3>
                  {selected.certBody && (
                    <span className="rounded-full bg-orange-400/20 px-2.5 py-0.5 text-xs font-bold text-orange-300 ring-1 ring-orange-400/30">
                      {selected.certBody}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-blue-100/75">{selected.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    <Clock size={12} /> {selected.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    <Globe size={12} /> {selected.cefrRange}
                  </span>
                  {selected.certification && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                      <BadgeCheck size={12} /> Internationally Certified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">

            {/* 4 stat tiles */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-lg font-extrabold text-[#0a2540] sm:text-xl">{selected.duration.split('–')[0].trim()}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Min. Duration</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${levelBadge[selected.level] ?? 'bg-blue-100 text-blue-700'}`}>
                  {selected.level}
                </span>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Entry Level</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Users size={14} className="text-[#0a2540]" />
                  <p className="text-lg font-extrabold text-[#0a2540] sm:text-xl">{selected.batchSize}</p>
                </div>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Batch Size</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Wallet size={14} className="text-emerald-600" />
                  <p className="text-lg font-extrabold text-emerald-600 sm:text-xl">{selected.startingFee}</p>
                </div>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Starting Fee</p>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="mt-6">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-gray-400">
                <CheckCircle2 size={14} className="text-emerald-500" />
                What You'll Learn
              </h4>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(selected.outcomes ?? []).map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={10} />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use cases */}
            <div className="mt-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-gray-400">
                <Briefcase size={14} className="text-blue-500" />
                Best For
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selected.useCases ?? []).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full bg-gradient-to-r ${selected.gradient} px-3 py-1 text-xs font-bold text-white shadow-sm`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature chips */}
            <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-5">
              {['Native-speaker trainers', 'Flexible schedules', 'Study material included', 'Lifetime recorded access'].map((feat) => (
                <span key={feat} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                  {feat}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={open}
                className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${selected.gradient} px-6 py-3 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg`}
              >
                Enquire for {selected.name}
                <ChevronRight size={16} />
              </button>
              <button
                onClick={open}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition-all hover:border-[#0a2540]/30 hover:bg-gray-50 hover:text-[#0a2540]"
              >
                Book a Free Demo Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
