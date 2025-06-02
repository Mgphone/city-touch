import { QuoteFormData } from "@/data/type/QuoteFormData";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export default function Step1() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormData>();

  const stairs = watch("pickupLocation.stairs");

  // Optional: Reset floorCount if stairs is ""
  useEffect(() => {
    if (stairs === "") {
      setValue("pickupLocation.floorCount", 0);
    }
  }, [stairs, setValue]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pickup Location
      </h2>

      {/* Place */}
      <label
        htmlFor="pickupPlace"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Place
      </label>
      <input
        id="pickupPlace"
        {...register("pickupLocation.place", {
          required: "Pickup place is required",
        })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.pickupLocation?.place ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="e.g. Home"
      />
      {errors.pickupLocation?.place && (
        <p className="mt-1 text-sm text-red-600">
          {errors.pickupLocation.place.message}
        </p>
      )}

      {/* Full Address */}
      <label
        htmlFor="pickupAddress"
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Full Address
      </label>
      <textarea
        id="pickupAddress"
        {...register("pickupLocation.fullAddress", {
          required: "Pickup full address is required",
        })}
        className={`w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.pickupLocation?.fullAddress
            ? "border-red-500"
            : "border-gray-300"
        }`}
        rows={4}
        placeholder="Street, City, Zip, Country"
      />
      {errors.pickupLocation?.fullAddress && (
        <p className="mt-1 text-sm text-red-600">
          {errors.pickupLocation.fullAddress.message}
        </p>
      )}

      {/* Stairs */}
      <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
        Stairs Access
      </label>
      <select
        {...register("pickupLocation.stairs", {
          required: "Please select stairs access",
        })}
        className={`w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.pickupLocation?.stairs ? "border-red-500" : "border-gray-300"
        }`}
        defaultValue=""
      >
        <option value="" disabled>
          Select stairs access
        </option>
        <option value="stairs">Stairs</option>
        <option value="lift">Lift</option>
      </select>
      {errors.pickupLocation?.stairs && (
        <p className="mt-1 text-sm text-red-600">
          {errors.pickupLocation.stairs.message}
        </p>
      )}

      {/* Floor Count - shown only if stairs or lift is selected */}
      {stairs && (
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Floor Count
          </label>
          <Select
            onValueChange={(val) =>
              setValue("pickupLocation.floorCount", Number(val), {
                shouldValidate: true,
              })
            }
            defaultValue={watch("pickupLocation.floorCount")?.toString() || ""}
          >
            <SelectTrigger
              className={`w-full ${
                errors.pickupLocation?.floorCount ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select floor count" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i === 0 ? "No Stair" : i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.pickupLocation?.floorCount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.pickupLocation.floorCount.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
