import { QuoteFormData } from "@/data/type/QuoteFormData";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

export async function checkDuration(
  data: QuoteFormData
): Promise<{ hours: number; minutes: number }> {
  // Build coordinates string for Mapbox API, e.g. "lon1,lat1;lon2,lat2;lon3,lat3"
  const coords = [
    data.pickupLocation,
    ...(data.viaLocations ?? []), // Provide empty array fallback if undefined
    data.dropoffLocation,
  ]
    .map((loc) => `${loc.longitude},${loc.latitude}`)
    .join(";");

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch directions");

  const json = await response.json();

  // duration is in seconds from Mapbox API
  const durationSeconds = json.routes[0]?.duration || 0;

  // Convert seconds to hours and minutes
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  return { hours, minutes };
}
