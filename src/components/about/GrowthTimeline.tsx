import { TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/blog/SectionHeading';
import Icon from './Icon';
import { useScrollProgress } from './useParallax';
import { growthMilestones } from '../../data/about';

const GrowthTimeline = () => {
    const { ref, progress } = useScrollProgress();
    const n = growthMilestones.length;

    return (
        <section className="py-24 md:py-28 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <SectionHeading
                    title="Growing into a national education ecosystem"
                    subtitle="A milestone-by-milestone look at where we are headed."
                    icon={<TrendingUp className="w-5 h-5" />}
                    className="mb-16"
                />

                <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
                    {/* rail */}
                    <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-1 bg-gray-200 rounded-full" />
                    <div
                        className="absolute top-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"
                        style={{ height: `${progress * 100}%` }}
                    />

                    <div className="space-y-12">
                        {growthMilestones.map((m, i) => {
                            const reached = progress >= i / Math.max(n - 1, 1) - 0.04;
                            const left = i % 2 === 0;
                            return (
                                <div key={m.year} className={`relative flex items-center md:justify-between gap-6 ${left ? '' : 'md:flex-row-reverse'}`}>
                                    {/* node */}
                                    <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 z-10">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-gray-50 transition-all duration-500 ${
                                            reached ? 'bg-gradient-to-br from-orange-500 to-orange-600 scale-100' : 'bg-white border border-gray-200 scale-90'
                                        }`}>
                                            <Icon name={m.icon} className={`w-6 h-6 ${reached ? 'text-white' : 'text-gray-300'}`} />
                                        </div>
                                    </div>

                                    {/* content */}
                                    <div
                                        className="pl-20 md:pl-0 md:w-[44%] transition-all duration-700 ease-out"
                                        style={{ opacity: reached ? 1 : 0.35, transform: reached ? 'translateY(0)' : 'translateY(10px)' }}
                                    >
                                        <div className={`p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 ${left ? 'md:text-right' : 'md:text-left'}`}>
                                            <span className="inline-block text-2xl md:text-3xl font-black text-[#0B3C5D]">{m.year}</span>
                                            <h3 className="text-lg font-bold text-gray-900 mt-1">{m.title}</h3>
                                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{m.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-[44%]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthTimeline;
