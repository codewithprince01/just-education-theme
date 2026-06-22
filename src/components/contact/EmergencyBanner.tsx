import { Phone, Mail, MessageCircle, Zap } from 'lucide-react';
import { emergencyBanner } from '@/data/contactConfig';
import Reveal from './Reveal';

export default function EmergencyBanner() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#ea580c] text-white p-8 md:p-10 shadow-xl">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                        <div className="absolute -top-8 -right-6 w-60 h-60 rounded-full bg-white blur-3xl" />
                    </div>
                    {/* animated pulse badge */}
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between">
                        <div className="flex items-start gap-4">
                            <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/15 border border-white/25">
                                <span className="absolute inline-flex h-full w-full rounded-2xl bg-white/20 animate-ping" aria-hidden="true" />
                                <Zap className="relative w-7 h-7" />
                            </span>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black leading-tight">{emergencyBanner.title}</h2>
                                <p className="mt-1.5 text-white/90 max-w-xl">{emergencyBanner.description}</p>
                                <p className="mt-2 text-sm font-semibold text-white/95">
                                    Hotline: {emergencyBanner.phone} · {emergencyBanner.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href={emergencyBanner.actions.call.href}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#dc2626] font-bold rounded-xl shadow-md hover:bg-red-50 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                {emergencyBanner.actions.call.label}
                            </a>
                            <a
                                href={emergencyBanner.actions.email.href}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/25 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                {emergencyBanner.actions.email.label}
                            </a>
                            <a
                                href={emergencyBanner.actions.chat.href}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/25 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                {emergencyBanner.actions.chat.label}
                            </a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
