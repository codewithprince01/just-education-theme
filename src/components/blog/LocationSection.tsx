import Link from 'next/link';
import { MapPin, Building } from 'lucide-react';
import type { Facet } from '@/lib/blog/listing-types';
import { routes } from '@/lib/blog/config';

interface LocationSectionProps {
    states: Facet[];
    cities: Facet[];
}

function LocationColumn({
    title,
    icon,
    items,
}: {
    title: string;
    icon: React.ReactNode;
    items: Facet[];
}) {
    if (items.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] uppercase tracking-wide mb-4">
                {icon} {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {items.map((loc) => (
                    <Link
                        key={loc.slug}
                        href={routes.location(loc.slug)}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-orange-50 hover:text-[#F57C00] border border-gray-200 hover:border-orange-200 rounded-lg px-3 py-1.5 transition-colors"
                    >
                        <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F57C00]" />
                        {loc.name}
                        <span className="text-xs text-gray-400 group-hover:text-[#F57C00]">{loc.count}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// "Browse by Location" — discover content by Popular States and Popular Cities.
export default function LocationSection({ states, cities }: LocationSectionProps) {
    if (states.length === 0 && cities.length === 0) return null;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <LocationColumn title="Popular States" icon={<Building className="w-4 h-4 text-[#F57C00]" />} items={states} />
            <LocationColumn title="Popular Cities" icon={<MapPin className="w-4 h-4 text-[#F57C00]" />} items={cities} />
        </div>
    );
}
