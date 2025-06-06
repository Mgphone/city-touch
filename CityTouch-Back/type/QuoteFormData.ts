export type Location = {
  place: string;
  fullAddress: string;
  stairs: "lift" | "stairs" | "";
  floorCount: number;
  latitude?: number | null;
  longitude?: number | null;
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
  bookingCode: string;
  paymentPercentage: number;
  halfHourCost: number;
  totalCost: number;
  payableNow: number;
  outstandingBalance: number;
};
