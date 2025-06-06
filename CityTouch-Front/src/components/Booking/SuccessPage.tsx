import { useEffect } from "react";
import { useBooking } from "@/context/bookingContext";
import { defaultBookingData } from "@/data/type/QuoteFormData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    setBookingData(defaultBookingData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50 p-8">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
        Booking Confirmed!
      </h1>
      <p className="text-lg text-purple-600 max-w-md text-center mb-6">
        Thanks, {bookingData.name || "Customer"}. Your booking has been
        successfully placed. You can start a new booking now.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="bg-purple-700 text-white hover:bg-purple-800"
      >
        Go to Home
      </Button>
    </div>
  );
}
