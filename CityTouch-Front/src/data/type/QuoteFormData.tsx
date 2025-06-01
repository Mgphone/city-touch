// types.ts or bookingForm.ts
// export type Location = {
//   userInput: string;         // What the user typed (raw input)
//   fullAddress: string;       // From Mapbox (place_name)
//   latitude: number;
//   longitude: number;
//   postcode?: string;
//   stairs: "lift" | "stairs" | ""; // Required
//   floorCount: number;             // Required
// };

export type Location = {
  place: string;
  fullAddress: string;
  stairs: "lift" | "stairs" | ""; // Required
  floorCount: number; // Required
};

export type QuoteFormData = {
  pickupLocation: Location;
  viaLocations?: Location[]; // Optional intermediate stops
  dropoffLocation: Location;

  date: string; // e.g. '2025-06-01'
  time: string; // e.g. '14:30'

  vanSize: "small" | "medium" | "large" | "luton";
  durationHours: number; // Hours they want to book for
  menRequired: number; // Number of helpers

  name: string;
  email: string;
  phone: string;
};
