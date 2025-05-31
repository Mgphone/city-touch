import { useFormContext, useFieldArray } from "react-hook-form";
import { Location, QuoteFormData } from "@/data/type/QuoteFormData";
import { Button } from "../ui/button";

export default function Step2() {
  const {
    control,
    register,
    formState: { errors },
    trigger,
  } = useFormContext<QuoteFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "viaLocations",
  });

  // Function to add new via location only if current last is valid
  const handleAddVia = async () => {
    // Validate all current viaLocations fields
    const isValid = await trigger(`viaLocations`);

    if (isValid) {
      append({ place: "", fullAddress: "" } as Location);
    }
    // If not valid, react-hook-form will set errors and display messages automatically
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Via Locations{" "}
        <span className="text-gray-500 text-base">(Optional)</span>
      </h2>
      {fields.length === 0 && (
        <p className="mb-4 text-gray-500 italic">
          You can add stopover locations if needed.
        </p>
      )}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50"
        >
          <label
            htmlFor={`viaLocations.${index}.place`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Place <span className="text-red-500">*</span>
          </label>
          <input
            id={`viaLocations.${index}.place`}
            {...register(`viaLocations.${index}.place`, {
              required: "Place is required",
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.viaLocations?.[index]?.place
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="e.g. Stopover place"
          />
          {errors.viaLocations?.[index]?.place && (
            <p className="mt-1 text-sm text-red-600">
              {errors.viaLocations[index]?.place?.message}
            </p>
          )}

          <label
            htmlFor={`viaLocations.${index}.fullAddress`}
            className="block mt-4 mb-1 text-sm font-medium text-gray-700"
          >
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`viaLocations.${index}.fullAddress`}
            {...register(`viaLocations.${index}.fullAddress`, {
              required: "Full address is required",
            })}
            className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.viaLocations?.[index]?.fullAddress
                ? "border-red-500"
                : "border-gray-300"
            }`}
            rows={3}
            placeholder="Street, City, Zip, Country"
          />
          {errors.viaLocations?.[index]?.fullAddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.viaLocations[index]?.fullAddress?.message}
            </p>
          )}

          <Button
            variant="destructive"
            onClick={() => remove(index)}
            aria-label={`Remove via location ${index + 1}`}
          >
            Remove Stop
          </Button>
        </div>
      ))}
      <Button
        variant="default"
        className="bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
        onClick={handleAddVia}
      >
        + Add Via Stop
      </Button>{" "}
    </div>
  );
}
