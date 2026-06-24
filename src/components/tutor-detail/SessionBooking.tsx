'use client';

import { useState } from 'react';
import { Calendar, Clock, Gift, Check } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

export default function SessionBooking() {
  const { availability, sessionDurations, trialAvailable, currency } = useTutor();
  const [activeDay, setActiveDay] = useState(0);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState(
    sessionDurations.find((d) => d.popular)?.id ?? sessionDurations[0]?.id
  );

  const day = availability[activeDay];
  const selectedDuration = sessionDurations.find((d) => d.id === activeDuration);

  return (
    <section id="section-booking" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Book a Session"
          title="Choose Your Slot"
          subtitle="Pick a day, time and session length that works for you."
        />

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Calendar + slots */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            {/* Day selector */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {availability.map((d, i) => {
                const isActive = i === activeDay;
                const open = d.slots.filter((s) => s.available).length;
                return (
                  <button
                    key={d.day}
                    onClick={() => { setActiveDay(i); setActiveSlot(null); }}
                    className={`shrink-0 w-16 py-2.5 rounded-xl border text-center transition-all ${
                      isActive ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <p className="text-xs font-bold">{d.short}</p>
                    <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{open} slots</p>
                  </button>
                );
              })}
            </div>

            {/* Slots */}
            <p className="text-sm font-semibold text-[#0a2540] mb-3 flex items-center gap-2">
              <Clock size={16} className="text-blue-600" /> Available on {day.day}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {day.slots.map((s) => {
                const isSelected = activeSlot === s.time;
                return (
                  <button
                    key={s.time}
                    disabled={!s.available}
                    onClick={() => setActiveSlot(s.time)}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      !s.available
                        ? 'bg-gray-50 border-gray-100 text-gray-300 line-through cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                        : 'bg-white border-gray-200 text-[#0a2540] hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {s.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Booking summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
            <p className="text-sm font-semibold text-[#0a2540] mb-3">Session Duration</p>
            <div className="space-y-2.5 mb-4">
              {sessionDurations.map((d) => {
                const isActive = d.id === activeDuration;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDuration(d.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all relative ${
                      isActive ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#0a2540]">{d.label}</p>
                      <p className="text-xs text-gray-400">{d.minutes} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{currency}{d.price}</p>
                      {d.popular && <span className="text-[9px] font-bold text-cyan-600 uppercase">Popular</span>}
                    </div>
                    {isActive && (
                      <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {trialAvailable && (
              <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3 mb-4">
                <Gift size={18} className="text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-green-700"><span className="font-bold">Free 30-min trial</span> available for new students.</p>
              </div>
            )}

            <div className="mt-auto border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-500">
                  {activeSlot ? `${day.short}, ${activeSlot}` : 'Select a slot'}
                </span>
                <span className="font-bold text-[#0a2540]">{currency}{selectedDuration?.price ?? 0}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Calendar size={16} /> Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
