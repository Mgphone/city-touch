// import { useFormContext } from "react-hook-form";
// import { QuoteFormData } from "@/data/type/QuoteFormData";
import { LocationInput } from "../form/LocationInput";

export default function Step1() {
  // const { formState } = useFormContext<QuoteFormData>();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-900">
        Step 1: Select Locations
      </h2>

      <LocationInput name="pickupLocation" label="Pickup Location" />
    </div>
  );
}
