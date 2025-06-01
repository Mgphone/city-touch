import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // adjust path if needed

export default function Step3() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuoteFormData>();

  const stairsAccess = watch("dropoffLocation.stairs");

  // Clear floorCount if stairsAccess is removed
  useEffect(() => {
    if (!stairsAccess) {
      setValue("dropoffLocation.floorCount", 0);
    }
  }, [stairsAccess, setValue]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dropoff Location & Access
      </h2>

      {/* Place */}
      <label
        htmlFor="dropoffPlace"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Place <span className="text-red-500">*</span>
      </label>
      <input
        id="dropoffPlace"
        {...register("dropoffLocation.place", {
          required: "Dropoff place is required",
        })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.dropoffLocation?.place ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="e.g. Destination"
      />
      {errors.dropoffLocation?.place && (
        <p className="mt-1 text-sm text-red-600">
          {errors.dropoffLocation.place.message}
        </p>
      )}

      {/* Full Address */}
      <label
        htmlFor="dropoffAddress"
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Full Address <span className="text-red-500">*</span>
      </label>
      <textarea
        id="dropoffAddress"
        {...register("dropoffLocation.fullAddress", {
          required: "Dropoff full address is required",
        })}
        className={`w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.dropoffLocation?.fullAddress
            ? "border-red-500"
            : "border-gray-300"
        }`}
        placeholder="Street, City, Zip, Country"
        rows={4}
      />
      {errors.dropoffLocation?.fullAddress && (
        <p className="mt-1 text-sm text-red-600">
          {errors.dropoffLocation.fullAddress.message}
        </p>
      )}

      {/* Stairs Access */}
      <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
        Stairs Access <span className="text-red-500">*</span>
      </label>
      <select
        {...register("dropoffLocation.stairs", {
          required: "Please select stairs access",
        })}
        className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.dropoffLocation?.stairs ? "border-red-500" : "border-gray-300"
        }`}
        defaultValue=""
      >
        <option value="" disabled>
          Select stairs access
        </option>
        <option value="stairs">Stairs</option>
        <option value="lift">Lift</option>
      </select>
      {errors.dropoffLocation?.stairs && (
        <p className="mt-1 text-sm text-red-600">
          {errors.dropoffLocation.stairs.message}
        </p>
      )}

      {/* Floor Count */}
      {stairsAccess && (
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Floor Count <span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={(val) =>
              setValue("dropoffLocation.floorCount", Number(val), {
                shouldValidate: true,
              })
            }
            defaultValue={watch("dropoffLocation.floorCount")?.toString() || ""}
          >
            <SelectTrigger
              className={`w-full ${
                errors.dropoffLocation?.floorCount
                  ? "border-red-500"
                  : "border-gray-300"
              } border rounded-md`}
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
          {errors.dropoffLocation?.floorCount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dropoffLocation.floorCount.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
