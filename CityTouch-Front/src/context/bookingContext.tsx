import React, { createContext, useContext, useState, ReactNode } from "react";
import { Location, BookingData } from "@/data/type/QuoteFormData";

// Default values
const defaultLocation: Location = {
  place: "",
  fullAddress: "",
  stairs: "",
  floorCount: 0,
  latitude: null,
  longitude: null,
};

const defaultBookingData: BookingData = {
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
  bookingCode: undefined,
  paymentPercentage: 0,
};

// Context types
type BookingContextType = {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
};

// Context setup
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] =
    useState<BookingData>(defaultBookingData);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
