import { MapPin, Phone, Mail, Clock, Navigation, Building2 } from 'lucide-react';
import { offices, googleMapsLink } from '@/data/contactConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function OfficesSection() {
    return (
        <section id="offices" className="scroll-mt-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <SectionHeading
                eyebrow="Our Offices"
                title="10 offices across India"
                description="From our New Delhi headquarters to regional hubs, a Just Education team is always close by."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offices.map((office, i) => (
                    <Reveal key={office.id} delay={(i % 3) * 90} direction="up">
                        <article id={`office-${office.id}`} className="group h-full flex flex-col scroll-mt-24 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#F57C00] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                            {/* Card header */}
                            <div className="flex items-start justify-between gap-3 p-5 pb-4 bg-gradient-to-br from-[#0B3C5D] to-[#0F4D73] text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-orange-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">{office.city}</h3>
                                        <p className="text-xs text-blue-100">{office.name}</p>
                                    </div>
                                </div>
                                {office.isHeadquarters && (
                                    <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2 py-1 rounded-full">
                                        HQ
                                    </span>
                                )}
                            </div>

                            {/* Card body */}
                            <div className="flex flex-col flex-1 p-5 pt-4">
                                <ul className="space-y-3 text-sm flex-1">
                                    <li className="flex gap-2.5 text-gray-600">
                                        <MapPin className="w-4 h-4 text-[#F57C00] flex-shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{office.address}</span>
                                    </li>
                                    <li>
                                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0B3C5D] font-medium transition-colors">
                                            <Phone className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                            {office.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 text-gray-700 hover:text-[#0B3C5D] font-medium transition-colors truncate">
                                            <Mail className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                            <span className="truncate">{office.email}</span>
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-2.5 text-gray-600">
                                        <Clock className="w-4 h-4 text-[#F57C00] flex-shrink-0" />
                                        {office.hours}
                                    </li>
                                </ul>

                                <a
                                    href={googleMapsLink(office.mapsQuery)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#0B3C5D] group-hover:bg-[#0B3C5D] group-hover:text-white group-hover:border-[#0B3C5D] transition-all duration-300"
                                >
                                    <Navigation className="w-4 h-4" />
                                    View on Google Maps
                                </a>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
