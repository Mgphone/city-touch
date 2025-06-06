import { useBooking } from "@/context/bookingContext";

export default function PaymentSummary() {
  const { bookingData } = useBooking();
  const { totalCost = 0, paymentPercentage = 0 } = bookingData;

  const payNow = (totalCost * paymentPercentage) / 100;
  const payLater = totalCost - payNow;

  return (
    <div className="col-span-full text-center space-y-2 mt-12">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700">
        Total Cost: <span className="text-4xl">£{totalCost.toFixed(2)}</span>
      </div>
      <div className="text-gray-700 font-medium flex justify-center sm:justify-end gap-6">
        <div>
          <span className="font-semibold">
            Pay Now ({paymentPercentage}%):{" "}
          </span>
          £{payNow.toFixed(2)}
        </div>
        <div>
          <span className="font-semibold">
            Pay Later ({100 - paymentPercentage}%):{" "}
          </span>
          £{payLater.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
