// types.ts or bookingForm.ts

export type Location = {
  place: string;
  fullAddress: string;
  stairs: "lift" | "stairs" | ""; // Required
  floorCount: number; // Required
};

export type QuoteFormData = {
  pickupLocation: Location;
  viaLocations?: Location[]; // Optional array of locations
  dropoffLocation: Location;
  date: string; // e.g. '2025-06-01'
  time: string; // e.g. '14:30'
  name: string;
  email: string;
  phone: string;
};
