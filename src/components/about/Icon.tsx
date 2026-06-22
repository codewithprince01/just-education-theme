import {
    ShieldCheck, Heart, MapPin, RefreshCw, BadgeCheck, Globe2, Compass, Eye, Target,
    TrendingUp, GraduationCap, Building2, Landmark, BookOpen, ClipboardList, Newspaper,
    School, Users, Wallet, FileText, Lightbulb, Trophy, LineChart, Briefcase, Plane,
    PenTool, Scale, Layers, Search, CheckCircle2, IndianRupee, Star, Library, Sparkles,
    Award, Mail, Headphones, Phone, type LucideIcon,
} from 'lucide-react';

// String-key → component lookup. Keeps the data layer serializable (icons stored
// as strings) while letting the UI render real lucide components.
const ICONS: Record<string, LucideIcon> = {
    ShieldCheck, Heart, MapPin, RefreshCw, BadgeCheck, Globe2, Compass, Eye, Target,
    TrendingUp, GraduationCap, Building2, Landmark, BookOpen, ClipboardList, Newspaper,
    School, Users, Wallet, FileText, Lightbulb, Trophy, LineChart, Briefcase, Plane,
    PenTool, Scale, Layers, Search, CheckCircle2, IndianRupee, Star, Library, Sparkles,
    Award, Mail, Headphones, Phone,
};

interface IconProps {
    name: string;
    className?: string;
}

/** Renders a lucide icon by its string key; falls back to a neutral dot if unknown. */
const Icon = ({ name, className }: IconProps) => {
    const Cmp = ICONS[name] ?? Sparkles;
    return <Cmp className={className} aria-hidden="true" />;
};

export default Icon;
