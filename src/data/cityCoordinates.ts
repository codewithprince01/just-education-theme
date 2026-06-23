// Approximate latitude/longitude for the cities used by the search bar.
// Keyed by the exact city name as it appears in `mockCities`, so we can sort
// the location dropdown by proximity to the user's current position.
export const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  // Cities backed by cityMeta
  Pune: { lat: 18.5204, lng: 73.8567 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  'Delhi NCR': { lat: 28.6139, lng: 77.209 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Bhopal: { lat: 23.2599, lng: 77.4126 },
  Indore: { lat: 22.7196, lng: 75.8577 },
  Nagpur: { lat: 21.1458, lng: 79.0882 },

  // Cities tied to NIT/IIIT/GFTI locations
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
  Trichy: { lat: 10.7905, lng: 78.7047 },
  Warangal: { lat: 17.9689, lng: 79.5941 },
  Surathkal: { lat: 13.0068, lng: 74.7943 },
  Calicut: { lat: 11.2588, lng: 75.7804 },
  Rourkela: { lat: 22.2604, lng: 84.8536 },
  Allahabad: { lat: 25.4358, lng: 81.8463 },
  Kurukshetra: { lat: 29.9695, lng: 76.8783 },
  Durgapur: { lat: 23.5204, lng: 87.3119 },
  Gwalior: { lat: 26.2183, lng: 78.1828 },
  Jabalpur: { lat: 23.1815, lng: 79.9864 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Kancheepuram: { lat: 12.8342, lng: 79.7036 },
  Shibpur: { lat: 22.555, lng: 88.31 },
  Silchar: { lat: 24.8333, lng: 92.7789 },
  Tezpur: { lat: 26.6528, lng: 92.7926 },
  Mesra: { lat: 23.4126, lng: 85.4408 },
  Vijayawada: { lat: 16.5062, lng: 80.648 },
};

/** Great-circle distance in km between two lat/lng points (Haversine). */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}
