import { ArrowRight, ArrowDown, ShieldCheck } from 'lucide-react';
import Icon from './Icon';
import { useInView } from './useParallax';
import { deliveryProcess } from '../../data/about';

const DeliveryProcess = () => {
    const { ref, inView } = useInView(0.2);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-28 bg-gradient-to-b from-[#0B3C5D] to-[#0A2E49] text-white overflow-hidden border-b border-gray-100">
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

                <div className="grid lg:grid-cols-6 gap-y-10 lg:gap-x-2">
                    {deliveryProcess.map((step, i) => (
                        <div
                            key={step.title}
                            className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center transition-all duration-700 ease-out group"
                            style={{
                                transitionDelay: `${i * 120}ms`,
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                            }}
                        >
                            {/* node */}
                            <div className="relative flex-shrink-0 lg:mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-orange-400 group-hover:shadow-orange-500/10">
                                    <Icon name={step.icon} className="w-7 h-7 text-orange-300 transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                                    {i + 1}
                                </span>
                            </div>

                            {/* connector — horizontal on desktop, vertical on mobile */}
                            {i < deliveryProcess.length - 1 && (
                                <>
                                    <ArrowRight className="hidden lg:block absolute top-5 -right-3 w-5 h-5 text-orange-400/80 animate-pulse" />
                                    <ArrowDown className="lg:hidden absolute left-[1.9rem] top-[4.2rem] w-5 h-5 text-orange-400/80 animate-pulse" />
                                </>
                            )}

                            <div className="lg:mt-3">
                                <h3 className="text-base font-bold text-white lg:px-1 transition-colors duration-300 group-hover:text-orange-300">{step.title}</h3>
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
