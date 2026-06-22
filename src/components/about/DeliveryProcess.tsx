"use client";

import { ArrowRight, ArrowDown } from 'lucide-react';
import Icon from './Icon';
import { useInView } from './useParallax';
import { deliveryProcess } from '../../data/about';

const DeliveryProcess = () => {
    const { ref, inView } = useInView(0.2);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-28 bg-gradient-to-b from-[#0B3C5D] to-[#0A2E49] text-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-300 bg-white/10 px-3 py-1 rounded-full mb-4">Trust &amp; Transparency</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">How we deliver educational information</h2>
                    <p className="mt-4 text-blue-100 text-lg">Every detail travels a verified path before it reaches a student.</p>
                </div>

                <div className="grid lg:grid-cols-6 gap-y-10 lg:gap-x-2">
                    {deliveryProcess.map((step, i) => (
                        <div
                            key={step.title}
                            className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center transition-all duration-700 ease-out"
                            style={{
                                transitionDelay: `${i * 120}ms`,
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                            }}
                        >
                            {/* node */}
                            <div className="relative flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                    <Icon name={step.icon} className="w-7 h-7 text-orange-300" />
                                </div>
                                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow">
                                    {i + 1}
                                </span>
                            </div>

                            {/* connector — horizontal on desktop, vertical on mobile */}
                            {i < deliveryProcess.length - 1 && (
                                <>
                                    <ArrowRight className="hidden lg:block absolute top-5 -right-3 w-5 h-5 text-orange-400/70" />
                                    <ArrowDown className="lg:hidden absolute left-[1.9rem] top-[4.2rem] w-5 h-5 text-orange-400/70" />
                                </>
                            )}

                            <div className="lg:mt-5">
                                <h3 className="text-base font-bold text-white lg:px-1">{step.title}</h3>
                                <p className="text-sm text-blue-100/80 mt-1.5 leading-relaxed lg:px-2">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeliveryProcess;
