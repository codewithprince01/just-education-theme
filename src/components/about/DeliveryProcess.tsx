import React from 'react';
import { ArrowRight, ArrowDown, ShieldCheck } from 'lucide-react';
import Icon from './Icon';
import { useInView } from './useParallax';
import { deliveryProcess } from '../../data/about';

const DeliveryProcess = () => {
    const { ref, inView } = useInView(0.2);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-28 bg-gradient-to-b from-[#0B3C5D] to-[#0A2E49] text-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-end justify-between gap-4 mb-14">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="h-6 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                            <ShieldCheck className="w-5 h-5 text-orange-400" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                                How we deliver educational information
                            </h2>
                        </div>
                        <p className="text-blue-100 text-sm mt-2 max-w-2xl">
                            Every detail travels a verified path before it reaches a student.
                        </p>
                    </div>
                </div>

                {/* Desktop: flat flex row — cards get equal flex-1, arrows fixed w-8 */}
                <div className="hidden lg:flex items-stretch gap-0">
                    {deliveryProcess.map((step, i) => (
                        <React.Fragment key={step.title}>
                            {/* Card */}
                            <div
                                className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 flex-1 min-w-0"
                                style={{
                                    transitionDelay: `${i * 120}ms`,
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(18px)',
                                }}
                            >
                                {/* number badge */}
                                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-black flex items-center justify-center shadow-md border-2 border-white z-10">
                                    {i + 1}
                                </span>

                                {/* Icon container */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-orange-300/60">
                                    <Icon name={step.icon} className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
                                </div>

                                {/* Text content */}
                                <div className="mt-4 flex-grow flex flex-col justify-start">
                                    <h3 className="text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-orange-500">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow between cards */}
                            {i < deliveryProcess.length - 1 && (
                                <div className="flex items-center justify-center w-8 flex-shrink-0">
                                    <ArrowRight className="w-5 h-5 text-orange-400 animate-pulse drop-shadow" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Mobile: vertical stack */}
                <div className="lg:hidden grid grid-cols-1 gap-10">
                    {deliveryProcess.map((step, i) => (
                        <div key={step.title} className="flex flex-col items-center gap-0">
                            <div
                                className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-md w-full group border border-gray-100"
                                style={{
                                    transitionDelay: `${i * 120}ms`,
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(18px)',
                                }}
                            >
                                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-black flex items-center justify-center shadow-md border-2 border-white z-10">
                                    {i + 1}
                                </span>
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                                    <Icon name={step.icon} className="w-7 h-7 text-white" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-bold text-slate-800">{step.title}</h3>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                            {i < deliveryProcess.length - 1 && (
                                <div className="flex items-center justify-center h-10">
                                    <ArrowDown className="w-5 h-5 text-orange-400 animate-pulse" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeliveryProcess;
