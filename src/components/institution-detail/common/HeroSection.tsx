'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  MapPin,
  Calendar,
  Star,
  Download,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useInstitution } from '@/context/InstitutionContext';

const SKIP_METRICS = new Set(['rating', 'reviewCount', 'established', 'location']);

interface HeroSectionProps {
  onEnquire?: () => void;
}

function useCountUp(target: number, duration = 1400, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return value;
}

function MetricChip({
  label,
  rawValue,
  started,
}: {
  label: string;
  rawValue: string | number;
  started: boolean;
}) {
  const numericVal = typeof rawValue === 'number' ? rawValue : parseFloat(String(rawValue).replace(/[^0-9.]/g, ''));
  const isNumeric = !isNaN(numericVal) && typeof rawValue === 'number';
  const counted = useCountUp(isNumeric ? numericVal : 0, 1400, started && isNumeric);

  const displayValue = isNumeric && started
    ? counted.toLocaleString('en-IN')
    : String(rawValue);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shrink-0 min-w-[110px] text-center">
      <span className="text-lg font-extrabold text-cyan-300 leading-none">{displayValue}</span>
      <span className="text-[11px] text-white/70 mt-1 capitalize">{label.replace(/([A-Z])/g, ' $1').trim()}</span>
    </div>
  );
}

export default function HeroSection({ onEnquire }: HeroSectionProps) {
  const institution = useInstitution();
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsStarted, setMetricsStarted] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { metrics, accreditations, isVerified, ratingDistribution } = institution;

  const visibleMetrics = Object.entries(metrics).filter(([key]) => !SKIP_METRICS.has(key));

  const typeLabelMap: Record<string, string> = {
    UNIVERSITY: 'University',
    COLLEGE: 'College',
    SCHOOL: 'School',
    COACHING_CENTER: 'Coaching Center',
    LANGUAGE_CENTER: 'Language Center',
    LIBRARY: 'Library',
    RESEARCH_INSTITUTE: 'Research Institute',
    TRAINING_CENTER: 'Training Center',
    SCHOLARSHIP_PROVIDER: 'Scholarship Provider',
  };
  const typeLabel = typeLabelMap[institution.type] ?? institution.type;

  const totalReviews = ratingDistribution
    ? Object.values(ratingDistribution).reduce((a, b) => a + b, 0)
    : metrics.reviewCount;

  return (
    <section className="relative w-full" id="section-hero">
      {/* Breadcrumb */}
      <nav
        className="bg-white border-b border-gray-100 px-4 md:px-8 py-2"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1.5 text-xs text-gray-500 max-w-7xl mx-auto flex-wrap">
          <li>
            <a href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Home size={12} />
              Home
            </a>
          </li>
          <ChevronRight size={11} className="text-gray-300" />
          <li>
            <a href="/browse" className="hover:text-blue-600 transition-colors">Browse</a>
          </li>
          <ChevronRight size={11} className="text-gray-300" />
          <li>
            <a
              href={`/browse?type=${institution.type.toLowerCase()}`}
              className="hover:text-blue-600 transition-colors"
            >
              {typeLabel}
            </a>
          </li>
          <ChevronRight size={11} className="text-gray-300" />
          <li className="text-gray-700 font-medium truncate max-w-[200px]">{institution.name}</li>
        </ol>
      </nav>

      {/* Banner */}
      <div className="relative w-full aspect-[21/8] sm:aspect-[16/6] overflow-hidden bg-[#0a2540]">
        <img
          src={institution.banner}
          alt={`${institution.name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/95 via-[#0a2540]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/60 to-transparent" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-5 md:px-8 lg:px-12 max-w-7xl mx-auto">
          {/* Logo + name row */}
          <div className="flex items-end gap-4 mb-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-white shadow-xl shrink-0">
              <img
                src={institution.logo}
                alt={`${institution.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
                  {institution.name}
                </h1>
                {isVerified && (
                  <BadgeCheck size={22} className="text-cyan-400 shrink-0" aria-label="Verified" />
                )}
              </div>
              {/* Accreditations */}
              {accreditations.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {accreditations.map((acc) => (
                    <span
                      key={acc}
                      className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/30 font-medium"
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-white/90">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= Math.round(metrics.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-white/40'
                  }
                />
              ))}
              <span className="font-bold text-amber-400 ml-1">{metrics.rating}</span>
              <span className="text-white/60 ml-0.5">
                ({Number(totalReviews).toLocaleString()} reviews)
              </span>
            </div>
            {metrics.location && (
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-cyan-300" />
                {metrics.location}
              </span>
            )}
            {metrics.established && (
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-cyan-300" />
                Est. {metrics.established}
              </span>
            )}
          </div>

          {/* Tagline */}
          <p className="italic text-cyan-200 text-sm mb-1 line-clamp-1">
            &ldquo;{institution.tagline}&rdquo;
          </p>

          {/* Description */}
          <p className="text-white/70 text-sm max-w-2xl line-clamp-2 mb-4 hidden md:block">
            {institution.description}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onEnquire}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg"
            >
              Enquire Now
            </button>
            <button
              onClick={onEnquire}
              className="bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              Book Visit
            </button>
            <button className="bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white/80 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
              <Download size={14} /> Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="bg-[#0a2540] px-4 md:px-8 lg:px-12 py-4" ref={metricsRef}>
        <div className="flex gap-3 overflow-x-auto pb-1 max-w-7xl mx-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleMetrics.map(([key, val]) => (
            <MetricChip
              key={key}
              label={key}
              rawValue={val}
              started={metricsStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
