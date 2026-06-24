'use client';

import { TrendingUp, TrendingDown, Minus, CalendarCheck, ClipboardCheck } from 'lucide-react';
import { useTutor } from '@/context/TutorContext';
import SectionHeading from './SectionHeading';

function Ring({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div
        className="relative w-20 h-20 rounded-full shrink-0 grid place-items-center"
        style={{ background: `conic-gradient(#2563eb ${value * 3.6}deg, #eff6ff 0deg)` }}
      >
        <div className="w-[60px] h-[60px] rounded-full bg-white grid place-items-center">
          <span className="text-lg font-extrabold text-[#0a2540]">{value}%</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1.5 text-blue-600 mb-0.5">{icon}</div>
        <p className="text-sm font-bold text-[#0a2540]">{label}</p>
      </div>
    </div>
  );
}

export default function LearningProgressTracker() {
  const { progress } = useTutor();
  const maxScore = Math.max(...progress.weeklyProgress.map((w) => w.score), 100);

  const trendIcon = (t: 'up' | 'down' | 'flat') =>
    t === 'up' ? <TrendingUp size={14} className="text-green-500" /> :
    t === 'down' ? <TrendingDown size={14} className="text-red-500" /> :
    <Minus size={14} className="text-gray-400" />;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Dashboard"
          title="Learning Progress Tracker"
          subtitle="A transparent view of attendance, assignments and skill growth (sample data)."
        />

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Rings */}
          <div className="space-y-5">
            <Ring value={progress.attendance} label="Attendance" icon={<CalendarCheck size={16} />} />
            <Ring value={progress.assignmentCompletion} label="Assignments Done" icon={<ClipboardCheck size={16} />} />
          </div>

          {/* Weekly progress graph */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-[#0a2540] text-sm mb-4">Weekly Progress</h3>
            <div className="flex items-end justify-between gap-2 h-44">
              {progress.weeklyProgress.map((w) => (
                <div key={w.week} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
                  <span className="text-[10px] font-semibold text-[#0a2540]">{w.score}</span>
                  <div
                    className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 transition-all"
                    style={{ height: `${(w.score / maxScore) * 100}%` }}
                  />
                  <span className="text-[10px] text-gray-400">{w.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-5">
          {/* Skill growth */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-[#0a2540] text-sm mb-4">Skill Growth</h3>
            <div className="space-y-3.5">
              {progress.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#0a2540]">{s.name}</span>
                    <span className="text-gray-400">{s.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {progress.metrics.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <p className="text-[11px] text-gray-400 font-medium">{m.label}</p>
                <p className="text-xl font-extrabold text-[#0a2540] mt-1">{m.value}</p>
                <p className="flex items-center gap-1 text-[11px] font-semibold mt-1">
                  {trendIcon(m.trend)}
                  <span className={m.trend === 'up' ? 'text-green-600' : m.trend === 'down' ? 'text-red-600' : 'text-gray-500'}>{m.delta}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
