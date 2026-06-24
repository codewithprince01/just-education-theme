'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MapPin, BadgeCheck, Star, Clock, Languages, Wallet, Calendar,
  MessageCircle, Heart, GitCompare, Sparkles,
} from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import { Icon } from './icons';

function useCountUp(target: number, duration = 1500, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
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

const STATUS_MAP = {
  available: { label: 'Available Now', dot: 'bg-green-400', text: 'text-green-300' },
  busy: { label: 'Limited Slots', dot: 'bg-amber-400', text: 'text-amber-300' },
  offline: { label: 'Currently Offline', dot: 'bg-gray-400', text: 'text-gray-300' },
} as const;

function StatCard({
  icon, label, value, suffix, decimal, started,
}: {
  icon: string; label: string; value: number; suffix?: string; decimal?: number; started: boolean;
}) {
  const count = useCountUp(value, 1500, started && !decimal);
  const display = decimal != null ? decimal.toFixed(1) : `${count.toLocaleString('en-IN')}${suffix ?? ''}`;
  return (
    <div className="flex-1 min-w-[110px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
      <Icon name={icon} size={22} className="text-cyan-300 mx-auto mb-1.5" />
      <p className="text-lg font-extrabold text-white leading-none">{display}</p>
      <p className="text-[11px] text-white/70 mt-1">{label}</p>
    </div>
  );
}

export default function TutorHero({ onBookTrial }: { onBookTrial?: () => void }) {
  const tutor = useTutor();
  const [started, setStarted] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const status = STATUS_MAP[tutor.availabilityStatus];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="section-overview" className="relative w-full">
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] overflow-hidden bg-[#0a2540]">
        <img src={tutor.banner} alt={`${tutor.name} banner`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540] via-[#0a2540]/70 to-[#0a2540]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/70 to-transparent" />
      </div>

      {/* Profile overlay */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="-mt-24 sm:-mt-28 md:-mt-32 relative z-10 flex flex-col md:flex-row md:items-end gap-5 pb-2">
          {/* Photo */}
          <div className="shrink-0">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
              <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0 text-white md:pb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-300 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full">
              <Sparkles size={12} /> {tutor.typeLabel}
            </span>
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">{tutor.name}</h1>
              {tutor.isVerified && <BadgeCheck size={26} className="text-cyan-400 shrink-0" />}
            </div>
            <p className="italic text-cyan-100/90 text-sm mt-1">&ldquo;{tutor.tagline}&rdquo;</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-white/90">
              <span className="flex items-center gap-1">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-400">{tutor.rating}</span>
                <span className="text-white/60">({tutor.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1"><MapPin size={14} className="text-cyan-300" />{tutor.location}</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-cyan-300" />Responds {tutor.responseTime.toLowerCase()}</span>
              <span className={`flex items-center gap-1.5 font-semibold ${status.text}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />{status.label}
              </span>
            </div>

            {/* badge chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tutor.badges.map((b) => (
                <span key={b} className="text-[10px] bg-white/15 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/25 font-medium">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick info pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {[
            { icon: <Wallet size={16} className="text-blue-600" />, label: 'Starting Fee', value: `${tutor.currency}${tutor.hourlyFee}/hr` },
            { icon: <Calendar size={16} className="text-blue-600" />, label: 'Experience', value: `${tutor.experienceYears}+ years` },
            { icon: <Languages size={16} className="text-blue-600" />, label: 'Languages', value: tutor.languages.join(', ') },
            { icon: <MapPin size={16} className="text-blue-600" />, label: 'Modes', value: tutor.teachingModes.join(' / ') },
          ].map((p) => (
            <div key={p.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-2.5">
              <span className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">{p.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{p.label}</p>
                <p className="text-xs font-bold text-[#0a2540] truncate">{p.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs font-semibold text-gray-500">Teaches:</span>
          {tutor.subjectsTaught.map((s) => (
            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{s}</span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button onClick={onBookTrial} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
            Book Trial Class
          </button>
          <button onClick={onBookTrial} className="bg-[#0a2540] hover:bg-[#13345c] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
            <Calendar size={15} /> Schedule Session
          </button>
          <button className="border border-gray-200 hover:bg-gray-50 text-[#0a2540] font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
            <MessageCircle size={15} /> Message
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className={`border font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 ${saved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-gray-200 hover:bg-gray-50 text-[#0a2540]'}`}
          >
            <Heart size={15} className={saved ? 'fill-rose-500 text-rose-500' : ''} /> {saved ? 'Saved' : 'Save'}
          </button>
          <button className="border border-gray-200 hover:bg-gray-50 text-[#0a2540] font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5">
            <GitCompare size={15} /> Compare
          </button>
        </div>
      </div>

      {/* Quick stat cards bar */}
      <div className="bg-[#0a2540] mt-6 py-5" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tutor.stats.map((s) => (
            <StatCard key={s.id} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
