'use client';

import {
  Atom, Award, BadgeCheck, BookOpen, Briefcase, ClipboardCheck, ClipboardList,
  FileText, FlaskConical, GraduationCap, Library, LineChart, Map, MessageCircleQuestion,
  Monitor, PencilRuler, Presentation, Rocket, ShieldCheck, Sigma, Smartphone,
  Star, Stethoscope, TrendingUp, Trophy, User, UserCheck, Users, Video,
  type LucideIcon,
} from 'lucide-react';

/** Maps the string icon keys stored in tutor data to lucide-react components. */
export const ICONS: Record<string, LucideIcon> = {
  Atom, Award, BadgeCheck, BookOpen, Briefcase, ClipboardCheck, ClipboardList,
  FileText, FlaskConical, GraduationCap, Library, LineChart, Map, MessageCircleQuestion,
  Monitor, PencilRuler, Presentation, Rocket, ShieldCheck, Sigma, Smartphone,
  Star, Stethoscope, TrendingUp, Trophy, User, UserCheck, Users, Video,
};

export function Icon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = ICONS[name] ?? BookOpen;
  return <Cmp className={className} size={size} />;
}
