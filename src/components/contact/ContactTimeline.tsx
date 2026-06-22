import { contactTimeline } from '@/data/contactConfig';
import { ContactIcon } from './icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ContactTimeline() {
    return (
        <section className="bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
                <SectionHeading
                    title="What happens after you reach out"
                    description="A transparent, five-step journey from your first message to full resolution."
                />

                <div className="relative">
                    {/* connecting line (desktop) */}
                    <div className="hidden lg:block absolute top-9 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0B3C5D] via-[#F57C00] to-[#0B3C5D] opacity-25" aria-hidden="true" />

                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
                        {contactTimeline.map((step, i) => (
                            <Reveal as="li" key={step.id} delay={i * 120} className="relative flex flex-col items-center text-center">
                                <div className="relative z-10 w-16 h-16 mb-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] text-white flex items-center justify-center shadow-lg">
                                        <ContactIcon name={step.icon} className="w-7 h-7 text-orange-300" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shadow-md ring-2 ring-white">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900">{step.title}</h3>
                                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed max-w-[14rem]">{step.description}</p>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
