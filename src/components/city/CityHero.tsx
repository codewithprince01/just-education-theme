import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { CityMetaItem } from '@/data/cityData';

interface CityHeroProps {
  city: CityMetaItem;
  cityName: string;
}

export default function CityHero({ city, cityName }: CityHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3868] to-[#1a5276]" id="city-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-blue-200/70 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/city" className="hover:text-white transition-colors">Cities</Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium">{cityName}</span>
        </nav>

        <div className="max-w-4xl mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-blue-100 text-sm mb-5">
              <MapPin size={14} className="text-cyan-300" />
              <span>{city.state}, India</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight tracking-tight">
              Institutions in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{cityName}</span>
            </h1>
            <p className="text-lg text-blue-100/80 mb-2 font-medium italic">&quot;{city.tagline}&quot;</p>
            <p className="text-blue-200/70 text-base max-w-2xl leading-relaxed">{city.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
