// types.ts or bookingForm.ts
export type Location = {
  place: string;
  fullAddress: string;
};

export type QuoteFormData = {
  pickupLocation: Location;
  viaLocations: Location[]; // Optional
  dropoffLocation: Location;
  date: string; // e.g. '2025-06-01'
  time: string; // e.g. '14:30' (24-hour format)
  stairs: "lift" | "stairs" | "";
  floorCount: number;
  name: string;
  email: string;
  phone: string;
};
