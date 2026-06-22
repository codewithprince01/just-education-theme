import {
    Headphones, Sparkles, Handshake, Newspaper, Wrench, Megaphone, Briefcase,
    Scale, Zap, Lock, ShieldCheck, BadgeCheck, Activity, Server, Send, Search,
    Users, MailCheck, CircleCheckBig, type LucideIcon,
} from 'lucide-react';

// Maps the string icon names stored in contactConfig to real lucide components,
// so the config stays serialisable / backend-friendly (no JSX in data).
const ICONS: Record<string, LucideIcon> = {
    Headphones, Sparkles, Handshake, Newspaper, Wrench, Megaphone, Briefcase,
    Scale, Zap, Lock, ShieldCheck, BadgeCheck, Activity, Server, Send, Search,
    Users, MailCheck, CircleCheckBig,
};

export function ContactIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICONS[name] ?? Sparkles;
    return <Icon className={className} aria-hidden="true" />;
}
