import { useFormContext, useFieldArray } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Step2() {
  const {
    control,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<QuoteFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "viaLocations",
  });

  const handleAddVia = async () => {
    if (fields.length > 0) {
      const lastIndex = fields.length - 1;
      // Validate only the last via stop fields
      const isValid = await trigger([
        `viaLocations.${lastIndex}.place`,
        `viaLocations.${lastIndex}.fullAddress`,
        `viaLocations.${lastIndex}.stairs`,
        `viaLocations.${lastIndex}.floorCount`,
      ]);
      if (!isValid) return; // Stop if last stop not valid
    }
    // Append a new empty via stop
    append({ place: "", fullAddress: "", stairs: "", floorCount: 0 });
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

      {fields.map((field, index) => {
        const stairs = watch(`viaLocations.${index}.stairs`);
        return (
          <div
            key={field.id}
            className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50"
          >
            {/* Place */}
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Place <span className="text-red-500">*</span>
            </label>
            <input
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

            {/* Full Address */}
            <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
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

            {/* Stairs */}
            <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
              Stairs Access <span className="text-red-500">*</span>
            </label>
            <select
              {...register(`viaLocations.${index}.stairs`, {
                required: "Please select stairs access",
              })}
              className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.viaLocations?.[index]?.stairs
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select stairs access
              </option>
              <option value="stairs">Stairs</option>
              <option value="lift">Lift</option>
            </select>
            {errors.viaLocations?.[index]?.stairs && (
              <p className="mt-1 text-sm text-red-600">
                {errors.viaLocations[index]?.stairs?.message}
              </p>
            )}

            {/* Floor Count */}
            {stairs && (
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Floor Count <span className="text-red-500">*</span>
                </label>
                <Select
                  onValueChange={(val) =>
                    setValue(`viaLocations.${index}.floorCount`, Number(val), {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={
                    watch(`viaLocations.${index}.floorCount`)?.toString() || ""
                  }
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.viaLocations?.[index]?.floorCount
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select floor count" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.viaLocations?.[index]?.floorCount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.viaLocations[index]?.floorCount?.message}
                  </p>
                )}
              </div>
            )}

            {/* Remove */}
            <Button
              variant="destructive"
              onClick={() => remove(index)}
              className="mt-4"
              aria-label={`Remove via location ${index + 1}`}
            >
              Remove Stop
            </Button>
          </div>
        );
      })}

      <Button
        variant="default"
        className="bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
        onClick={handleAddVia}
      >
        + Add Via Stop
      </Button>
    </div>
  );
}
