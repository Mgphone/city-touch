import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useBooking } from "@/context/bookingContext";
import { defaultBookingData } from "@/data/type/QuoteFormData";
import { useEffect } from "react";

export default function FailurePage() {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  useEffect(() => {
    setBookingData(defaultBookingData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-50 p-8">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-10 h-10 text-red-600" />
        <h1 className="text-4xl font-extrabold text-red-700">Booking Failed</h1>
      </div>

      <p className="text-lg text-purple-700 max-w-md text-center mb-6">
        Something went wrong while submitting your booking. Please try again
        later.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="bg-purple-700 text-white hover:bg-purple-800"
      >
        Return to Home
      </Button>
    </div>
  );
}
