import MultiStepForm from "@/components/Booking/MultiStepCardForm";
import React from "react";

const Booking: React.FC = () => {
  return (
    <div className="bg-background dark:bg-gray-900 py-5 sm:py-20">
      <MultiStepForm />
    </div>
  );
};

export default Booking;
