import { Briefcase, ArrowRight, Rocket } from 'lucide-react';
import { careersCta } from '@/data/contactConfig';
import Reveal from './Reveal';

export default function CareersCTA() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3C5D] via-[#0D4B75] to-[#126094] text-white p-8 md:p-14 shadow-xl">
                    {/* decorative */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                        <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
                        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-sky-300 blur-3xl" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                <Rocket className="w-3.5 h-3.5" /> {careersCta.badge}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black mt-5 leading-tight">{careersCta.title}</h2>
                            <p className="mt-4 text-blue-100 text-lg max-w-xl">{careersCta.description}</p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href={careersCta.primary.href}
                                    className="group px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                                >
                                    <Briefcase className="w-5 h-5" />
                                    {careersCta.primary.label}
                                </a>
                                <a
                                    href={careersCta.secondary.href}
                                    className="group px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 hover:border-white/40 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                                >
                                    {careersCta.secondary.label}
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {careersCta.stats.map((s, i) => (
                                <Reveal key={s.id} delay={i * 120} className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-5 text-center">
                                    <div className="text-3xl md:text-4xl font-black text-orange-400">{s.value}</div>
                                    <div className="mt-1 text-xs text-blue-100">{s.label}</div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
