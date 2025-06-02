import { QuoteFormData, Location } from "@/data/type/QuoteFormData";

export function validateLocations(data: QuoteFormData): string[] {
  const errors: string[] = [];

  const validateLocation = (loc: Location, type: string) => {
    if (!loc.place || loc.latitude == null || loc.longitude == null) {
      errors.push(
        `${type} is incomplete. Missing ${[
          !loc.place ? "place" : "",
          loc.latitude == null ? "latitude" : "",
          loc.longitude == null ? "longitude" : "",
        ]
          .filter(Boolean)
          .join(", ")}.`
      );
    }
  };

  // Validate pickup and dropoff (required)
  validateLocation(data.pickupLocation, "Pickup location");
  validateLocation(data.dropoffLocation, "Dropoff location");

  // Validate each viaLocation (if any)
  data.viaLocations?.forEach((via, i) => {
    if (!via.place || via.latitude == null || via.longitude == null) {
      errors.push(
        `Via location ${i + 1} is incomplete. Missing ${[
          !via.place ? "place" : "",
          via.latitude == null ? "latitude" : "",
          via.longitude == null ? "longitude" : "",
        ]
          .filter(Boolean)
          .join(", ")}.`
      );
    }
  });

  return errors;
}
