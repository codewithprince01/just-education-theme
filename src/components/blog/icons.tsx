import {
    GraduationCap, Building2, Presentation, School, Landmark, Library, Plane,
    FileText, Award, ClipboardCheck, Compass, Users, MonitorPlay, BadgeCheck,
    Wrench, Cpu, Globe, Stamp, Newspaper, BookOpen,
    type LucideIcon,
} from 'lucide-react';

// Resolve the string icon names stored in the dummy data to lucide components.
const ICONS: Record<string, LucideIcon> = {
    GraduationCap, Building2, Presentation, School, Landmark, Library, Plane,
    FileText, Award, ClipboardCheck, Compass, Users, MonitorPlay, BadgeCheck,
    Wrench, Cpu, Globe, Stamp, Newspaper, BookOpen,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICONS[name] ?? BookOpen;
    return <Icon className={className} aria-hidden="true" />;
}
