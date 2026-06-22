import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { popularAreas } from '@/data/cityData';

interface PopularAreasProps {
  cityName: string;
  citySlug: string;
}

export default function PopularAreas({ cityName, citySlug }: PopularAreasProps) {
  return (
    <section className="py-12 md:py-14 bg-gradient-to-b from-white to-blue-50/30" id="popular-areas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-3">
            <MapPin size={14} />
            <span>Localities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540]">
            Popular Areas in {cityName}
          </h2>
          <p className="text-gray-500 mt-2">Find institutions near your preferred locality</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularAreas.map((area, i) => (
            <Link
              key={i}
              href={`/city/${citySlug || 'pune'}?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2">{area.icon}</div>
              <h3 className="font-bold text-[#0a2540] text-sm group-hover:text-blue-600 transition-colors">{area.name}</h3>
              <div className="text-xs text-gray-400 mt-1">{area.colleges} Institutions</div>
              <div className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">
                {area.type}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
