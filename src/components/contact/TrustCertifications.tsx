import { certifications } from '@/data/contactConfig';
import { accent } from '@/components/blog/theme';
import { ContactIcon } from './icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function TrustCertifications() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <SectionHeading
                eyebrow="Trust & Security"
                title="Enterprise-grade by default"
                description="Your data and your trust are protected by the standards large organisations expect."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {certifications.map((cert, i) => {
                    const a = accent(cert.accent);
                    return (
                        <Reveal key={cert.id} delay={(i % 5) * 80} direction="up">
                            <div className="group h-full flex flex-col items-center text-center rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-2xl ${a.soft} ${a.softText} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                    <ContactIcon name={cert.icon} className="w-7 h-7" />
                                </div>
                                <span className="mt-3 text-sm font-bold text-gray-800">{cert.label}</span>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
