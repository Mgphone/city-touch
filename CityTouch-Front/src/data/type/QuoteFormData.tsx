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
};

// Optional pricing calculation result types
export type PricingRules = {
  vanSizeRates: {
    small: number;
    medium: number;
    large: number;
    luton: number;
  };
  _id: string;
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  halfHourRate: number;
  __v: number;
};

export type Breakdown = {
  stairCost: number;
  mileageCost: number;
  vanCost: number;
  menCost: number;
  durationCost: number;
  miles: number;
};

// Full booking data including optional pricing results
export type BookingData = QuoteFormData & {
  breakdown?: Breakdown;
  rules?: PricingRules;
  totalCost?: number;
  totalMiles?: number;
  bookingCode?: string;
  paymentPercentage?: 0 | 30 | 50 | 100;
  halfHourCost?: number;
};

// Default values for new forms
export const defaultLocation: Location = {
  place: "",
  fullAddress: "",
  stairs: "",
  floorCount: 0,
  latitude: null,
  longitude: null,
};

export const defaultBookingData: BookingData = {
  pickupLocation: defaultLocation,
  viaLocations: [],
  dropoffLocation: defaultLocation,
  date: "",
  time: "",
  vanSize: "small",
  durationHours: 1,
  menRequired: 1,
  name: "",
  email: "",
  phone: "",
  breakdown: undefined,
  rules: undefined,
  totalCost: undefined,
  totalMiles: undefined,
};
