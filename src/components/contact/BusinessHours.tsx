import { Clock } from 'lucide-react';
import { businessHours, hoursHighlights } from '@/data/contactConfig';
import { accent } from '@/components/blog/theme';
import { ContactIcon } from './icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function BusinessHours() {
    return (
        <section className="bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
                <SectionHeading
                    title="When we're available"
                    description="Our teams operate across Indian time zones, with round-the-clock emergency cover."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Weekly timeline */}
                    <Reveal direction="right">
                        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6 text-[#0B3C5D]">
                                <Clock className="w-5 h-5 text-[#F57C00]" />
                                <h3 className="font-bold text-lg">Weekly Schedule</h3>
                            </div>
                            <ol className="relative border-l-2 border-gray-200 ml-2 space-y-1">
                                {businessHours.map((day) => (
                                    <li key={day.day} className="relative pl-6 py-3">
                                        <span
                                            className={`absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow ${
                                                day.closed ? 'bg-gray-300' : 'bg-[#F57C00]'
                                            }`}
                                        />
                                        <div className="flex items-center justify-between gap-4">
                                            <span className={`font-semibold ${day.closed ? 'text-gray-400' : 'text-gray-800'}`}>
                                                {day.day}
                                            </span>
                                            <span
                                                className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                    day.closed
                                                        ? 'bg-gray-100 text-gray-400'
                                                        : 'bg-green-50 text-green-700'
                                                }`}
                                            >
                                                {day.hours}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Reveal>

                    {/* Highlights */}
                    <div className="space-y-4">
                        {hoursHighlights.map((h, i) => {
                            const a = accent(h.accent);
                            return (
                                <Reveal key={h.id} delay={i * 100} direction="left">
                                    <div className="flex items-center gap-4 rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`w-12 h-12 rounded-xl ${a.soft} ${a.softText} flex items-center justify-center flex-shrink-0`}>
                                            <ContactIcon name={h.icon} className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{h.title}</h4>
                                            <p className="text-sm text-gray-600">{h.detail}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}

                        <Reveal delay={300} direction="left">
                            <div className="rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] p-5 text-white flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-orange-300" />
                                </div>
                                <div>
                                    <h4 className="font-bold">All times in IST</h4>
                                    <p className="text-sm text-blue-100">Indian Standard Time (GMT +5:30)</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
