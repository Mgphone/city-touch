import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/context/bookingContext";
import { CreditCard } from "lucide-react";

export default function PaymentOptions() {
  const { bookingData, setBookingData } = useBooking();

  const options = [30, 50, 100];

  const handleChange = (value: string) => {
    const percentage = parseInt(value, 10);
    setBookingData((prev) => ({
      ...prev,
      paymentPercentage: percentage,
    }));
  };

  return (
    <section className="space-y-4 mt-6 p-4 bg-gray-50 rounded-md shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <CreditCard size={20} className="text-purple-600" />
        Select Payment Percentage
      </h3>

      <RadioGroup
        defaultValue={bookingData.paymentPercentage?.toString() || "30"}
        onValueChange={handleChange}
        className="flex gap-6"
        aria-label="Payment percentage options"
      >
        {options.map((value) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`pay-${value}`}
              value={value.toString()}
              className="focus:ring-purple-500"
            />
            <Label htmlFor={`pay-${value}`} className="cursor-pointer">
              Pay {value}%
            </Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
}
