import MultiStepForm from "@/components/Booking/MultiStepCardForm";
import { BookingProvider } from "@/context/bookingContext";
import React from "react";

const Booking: React.FC = () => {
  return (
    <div className="bg-background dark:bg-gray-900 py-5 sm:py-20">
      <BookingProvider>
        <MultiStepForm />
      </BookingProvider>
    </div>
  );
};

export default Booking;
