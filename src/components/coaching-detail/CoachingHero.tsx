'use client';

import { useEffect, useState, useRef } from 'react';
import {
  MapPin,
  BadgeCheck,
  Star,
  Users,
  Calendar,
  Share2,
  GitCompare,
  Download,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Award,
  Layers,
} from 'lucide-react';
import { useCoachingData } from '@/context/CoachingContext';

// ── Count-up hook ──────────────────────────────
function useCountUp(target: number, duration = 1600, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return value;
}

// ── Metric card data ──────────────────────────
const metricItems = [
  { icon: Users, label: 'Students Trained', value: 250000, display: '2,50,000+' },
  { icon: Award, label: 'Total Selections', value: 18000, display: '18,000+' },
  { icon: BookOpen, label: 'Courses Offered', value: 24, display: '24' },
  { icon: Users, label: 'Expert Faculties', value: 85, display: '85' },
  { icon: TrendingUp, label: 'Success Rate', value: 94, display: '94%' },
];

function MetricCard({
  icon: Icon,
  label,
  value,
  display,
  started,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  display: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1600, started);
  const isPercentage = display.endsWith('%');
  const hasPlus = display.endsWith('+');
  const displayValue = started
    ? isPercentage
      ? `${count}%`
      : hasPlus
      ? `${count.toLocaleString('en-IN')}+`
      : count.toLocaleString('en-IN')
    : display;

  return (
    <div className="flex-1 min-w-[120px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
      <Icon size={22} className="text-cyan-300 mx-auto mb-1.5" />
      <p className="text-lg font-extrabold text-white leading-none">{displayValue}</p>
      <p className="text-xs text-white/70 mt-1">{label}</p>
    </div>
  );
}

export default function CoachingHero({ onEnquire }: { onEnquire?: () => void }) {
  const { institute } = useCoachingData();
  const [metricsStarted, setMetricsStarted] = useState(false);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = metricRef.current;
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

  return (
    <section className="relative w-full">
      {/* Banner */}
      <div className="relative w-full aspect-[21/7] sm:aspect-[16/6] overflow-hidden bg-[#0a2540]">
        <img
          src={institute.banner}
          alt={`${institute.name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/95 via-[#0a2540]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/60 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:px-12">
          {/* Logo + name row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-white shadow-xl shrink-0">
              <img
                src={institute.logo}
                alt={`${institute.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
                  {institute.name}
                </h1>
                {institute.isVerified && (
                  <BadgeCheck size={22} className="text-cyan-400 shrink-0" />
                )}
              </div>
              {/* Accreditations */}
              <div className="flex flex-wrap gap-2 mt-1.5">
                {institute.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/30 font-medium"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rating + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-white/90">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s <= Math.round(institute.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/40'}
                />
              ))}
              <span className="font-bold text-amber-400 ml-1">{institute.rating}</span>
              <span className="text-white/60 ml-0.5">({institute.reviewCount.toLocaleString()} reviews)</span>
            </div>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-cyan-300" />
              {institute.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-cyan-300" />
              Est. {institute.established}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} className="text-cyan-300" />
              {institute.metrics.faculties} Faculties
            </span>
          </div>

          {/* Tagline */}
          <p className="italic text-cyan-200 text-sm mb-1">&ldquo;{institute.tagline}&rdquo;</p>

          {/* Description */}
          <p className="text-white/70 text-sm max-w-2xl line-clamp-2 mb-4 hidden md:block">
            {institute.description}
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
              Book Free Demo
            </button>
            <button className="bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white/80 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
              <Download size={14} /> Brochure
            </button>
            <button className="ml-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white p-2.5 rounded-xl transition-colors" title="Compare">
              <Layers size={16} />
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white p-2.5 rounded-xl transition-colors" title="Share">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="bg-[#0a2540] px-4 md:px-8 lg:px-12 py-4" ref={metricRef}>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar max-w-7xl mx-auto">
          {metricItems.map((m) => (
            <MetricCard key={m.label} {...m} started={metricsStarted} />
          ))}
        </div>
      </div>
    </section>
  );
}
