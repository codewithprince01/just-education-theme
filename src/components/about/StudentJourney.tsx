"use client";

import Icon from './Icon';
import { useInView } from './useParallax';
import { journeyStages } from '../../data/about';

const StudentJourney = () => {
    const { ref, inView } = useInView(0.2);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-28 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">The Student Journey</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Every educational journey starts with a decision
                    </h2>
                    <p className="mt-4 text-gray-500 text-lg">From first curiosity to a confident career — we guide each step.</p>
                </div>

                {/* Desktop horizontal journey */}
                <div className="hidden lg:block relative">
                    <svg className="absolute top-[34px] left-0 w-full h-3 overflow-visible" viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true">
                        <line x1="0" y1="3" x2="1000" y2="3" stroke="#E5E7EB" strokeWidth="3" />
                        <line
                            x1="0" y1="3" x2="1000" y2="3" stroke="#F57C00" strokeWidth="3" strokeLinecap="round"
                            className={`je-draw-line ${inView ? 'is-drawn' : ''}`}
                            style={{ ['--len' as string]: '1000' }}
                        />
                    </svg>
                    <div className="relative grid grid-cols-8 gap-2">
                        {journeyStages.map((stage, i) => (
                            <div
                                key={stage.title}
                                className="flex flex-col items-center text-center transition-all duration-700 ease-out"
                                style={{
                                    transitionDelay: `${i * 110}ms`,
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(16px)',
                                }}
                            >
                                <div className={`relative z-10 w-[70px] h-[70px] rounded-2xl flex items-center justify-center shadow-lg ${
                                    i === 0 ? 'bg-gradient-to-br from-[#0B3C5D] to-[#126094]' : 'bg-white border border-gray-200'
                                }`}>
                                    <Icon name={stage.icon} className={`w-7 h-7 ${i === 0 ? 'text-orange-400' : 'text-[#0B3C5D]'}`} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mt-4 px-1">{stage.title}</h3>
                                <p className="text-xs text-gray-500 mt-1 px-1 leading-snug">{stage.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile vertical journey */}
                <div className="lg:hidden relative pl-14">
                    <div className="absolute top-3 bottom-3 left-[26px] w-0.5 bg-gray-200" />
                    <div
                        className="absolute top-3 left-[26px] w-0.5 bg-orange-500 transition-[height] duration-1000 ease-out"
                        style={{ height: inView ? 'calc(100% - 24px)' : '0%' }}
                    />
                    <div className="space-y-8">
                        {journeyStages.map((stage, i) => (
                            <div
                                key={stage.title}
                                className="relative transition-all duration-700 ease-out"
                                style={{
                                    transitionDelay: `${i * 90}ms`,
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateX(0)' : 'translateX(14px)',
                                }}
                            >
                                <div className={`absolute -left-[3.5rem] w-[52px] h-[52px] rounded-xl flex items-center justify-center shadow-md ${
                                    i === 0 ? 'bg-gradient-to-br from-[#0B3C5D] to-[#126094]' : 'bg-white border border-gray-200'
                                }`}>
                                    <Icon name={stage.icon} className={`w-6 h-6 ${i === 0 ? 'text-orange-400' : 'text-[#0B3C5D]'}`} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">{stage.title}</h3>
                                <p className="text-sm text-gray-500 mt-0.5">{stage.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentJourney;
