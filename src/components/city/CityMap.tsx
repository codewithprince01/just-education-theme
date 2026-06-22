import { CityMetaItem } from '@/data/cityData';

interface CityMapProps {
  city: CityMetaItem;
  cityName: string;
}

export default function CityMap({ city, cityName }: CityMapProps) {
  if (!city.mapEmbed) return null;

  return (
    <section className="py-12 bg-white" id="city-map">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-md h-96 relative">
          <iframe
            src={city.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${cityName} Location Map`}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
