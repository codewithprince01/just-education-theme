import { Mail, Phone, Clock } from 'lucide-react';
import { departmentDirectory } from '@/data/contactConfig';
import { accent } from '@/components/blog/theme';
import { ContactIcon } from './icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function DepartmentDirectory() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <SectionHeading
                eyebrow="Department Directory"
                title="Talk directly to the right team"
                description="Every department has a dedicated line and inbox, with clear response-time commitments."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {departmentDirectory.map((dept, i) => {
                    const a = accent(dept.accent);
                    return (
                        <Reveal key={dept.id} delay={(i % 4) * 80} direction="up">
                            <div className={`group h-full rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${a.hoverBorder}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-11 h-11 rounded-xl ${a.soft} ${a.softText} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                        <ContactIcon name={dept.icon} className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{dept.name}</h3>
                                </div>

                                <ul className="space-y-2.5 text-sm">
                                    <li>
                                        <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[#0B3C5D] transition-colors truncate">
                                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="truncate">{dept.email}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-[#0B3C5D] transition-colors">
                                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            {dept.phone}
                                        </a>
                                    </li>
                                </ul>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <Clock className="w-3.5 h-3.5 text-green-600" />
                                    Responds {dept.responseTime.toLowerCase()}
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
