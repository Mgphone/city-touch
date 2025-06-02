import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LocationInput } from "../form/LocationInput";
import { QuoteFormData } from "@/data/type/QuoteFormData";

export default function Step2() {
  const { control } = useFormContext<QuoteFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "viaLocations",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">
        Step 2: Via Locations
      </h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-gray-300 rounded-md bg-gray-50"
        >
          <LocationInput
            name={`viaLocations.${index}`}
            label={`Via Stop ${index + 1}`}
          />

          <Button
            type="button"
            variant="destructive"
            className="mt-4"
            onClick={() => remove(index)}
          >
            Remove Stop
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="default"
        onClick={() =>
          append({
            place: "",
            fullAddress: "",
            stairs: "",
            floorCount: 0,
            latitude: null,
            longitude: null,
          })
        }
      >
        Add Via Stop
      </Button>
    </div>
  );
}
