"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, MessageCircle, Globe2, BadgeCheck, Star,
  ChevronRight, Send, GitCompareArrows, Check,
} from 'lucide-react';
import type { LanguageCenter } from '@/data/languageCenterData';
import { useEnquiry } from './EnquiryProvider';

interface LcHeroProps {
  center: LanguageCenter;
}

export default function LcHero({ center }: LcHeroProps) {
  const { openEnquiry } = useEnquiry();
  const [compared, setCompared] = useState(false);
  const tel = center.phone.replace(/\s/g, '');

  return (
    <section className="relative" id="lc-hero">
      {/* Banner */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80 lg:h-[360px]">
        <img
          src={center.banner}
          alt={`${center.name} campus`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540] via-[#0a2540]/55 to-[#0a2540]/10" />

        {/* Breadcrumb */}
        <nav className="absolute left-0 right-0 top-0 z-10" aria-label="Breadcrumb">
          <div className="container mx-auto flex items-center gap-1.5 px-4 py-4 text-xs font-medium text-blue-100/80 sm:px-6 lg:px-8">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight size={13} />
            <Link href="/directory" className="transition-colors hover:text-white">Language Centers</Link>
            <ChevronRight size={13} />
            <span className="truncate text-white">{center.name}</span>
          </div>
        </nav>
      </div>

      {/* Info card overlapping the banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-[#0a2540]/5 sm:p-6 md:-mt-24 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            {/* Logo */}
            <div className="-mt-16 shrink-0 self-start md:-mt-20">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg md:h-28 md:w-28">
                <img src={center.logo} alt={`${center.name} logo`} className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Main info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold leading-tight text-[#0a2540] md:text-3xl">
                  {center.name}
                </h1>
                {center.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    <BadgeCheck size={14} className="text-blue-600" /> Verified
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-orange-600">{center.tagline}</p>

              {/* Rating + location */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2 py-0.5 font-bold text-white">
                    {center.rating} <Star size={12} className="fill-white" />
                  </span>
                  <span className="font-semibold text-gray-600">
                    {center.reviewCount.toLocaleString('en-IN')} reviews
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin size={15} className="text-gray-400" />
                  <span className="font-medium">{center.location.area}, {center.location.city}</span>
                </div>
                <div className="hidden items-center gap-1.5 text-gray-600 sm:flex">
                  <Phone size={15} className="text-gray-400" />
                  <span className="font-medium">{center.phone}</span>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">{center.intro}</p>

              {/* CTAs */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={openEnquiry}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 active:scale-95"
                >
                  <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
                  Enquire Now
                </button>
                <a
                  href={`tel:${tel}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a2540] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#143a5e] active:scale-95"
                >
                  <Phone size={15} /> Call Now
                </a>
                <a
                  href={`https://wa.me/${center.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a
                  href={center.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-all hover:border-blue-300 hover:text-blue-600 active:scale-95"
                >
                  <Globe2 size={15} /> Website
                </a>
                <button
                  onClick={() => setCompared((v) => !v)}
                  aria-pressed={compared}
                  className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                    compared
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {compared ? <Check size={15} /> : <GitCompareArrows size={15} />}
                  {compared ? 'Added' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
