// BookingContext.tsx
import { Location, QuoteFormData } from "@/data/type/QuoteFormData";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const defaultLocation: Location = {
  place: "",
  fullAddress: "",
  stairs: "",
  floorCount: 0,
};

const defaultBookingData: QuoteFormData = {
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
};

type BookingContextType = {
  bookingData: QuoteFormData;
  setBookingData: React.Dispatch<React.SetStateAction<QuoteFormData>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] =
    useState<QuoteFormData>(defaultBookingData);

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
