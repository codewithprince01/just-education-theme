import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '@/data/contactConfig';
import {
    XIcon, FacebookIcon, LinkedInIcon, InstagramIcon, YouTubeIcon, TelegramIcon,
} from '@/components/blog/BrandIcons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const ICONS: Record<string, (p: { className?: string }) => React.ReactNode> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    x: XIcon,
    youtube: YouTubeIcon,
    telegram: TelegramIcon,
};

export default function SocialSection() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
            <SectionHeading
                eyebrow="Follow Us"
                title="Join the conversation"
                description="Stay connected for product news, study tips and community stories across your favourite platforms."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {socialLinks.map((social, i) => {
                    const Icon = ICONS[social.id];
                    return (
                        <Reveal key={social.id} delay={(i % 6) * 70} direction="up">
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${social.name} — ${social.followers} followers`}
                                style={{ '--brand': social.color } as React.CSSProperties}
                                className="group relative h-full flex flex-col items-center text-center rounded-2xl bg-white border border-gray-200 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--brand)]"
                            >
                                <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-gray-300 group-hover:text-[var(--brand)] transition-colors" />
                                <span className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[var(--brand)] transition-all duration-300 group-hover:bg-[var(--brand)] group-hover:text-white group-hover:scale-110">
                                    {Icon ? <Icon className="w-6 h-6" /> : null}
                                </span>
                                <span className="mt-3 font-bold text-gray-900 text-sm">{social.name}</span>
                                <span className="text-xs text-gray-400">{social.handle}</span>
                                <span className="mt-2 text-xs font-semibold text-gray-700">
                                    {social.followers} <span className="text-gray-400 font-normal">followers</span>
                                </span>
                            </a>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
