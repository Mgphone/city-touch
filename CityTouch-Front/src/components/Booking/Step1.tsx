import { QuoteFormData } from "@/data/type/QuoteFormData";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuoteFormData>();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pickup Location
      </h2>

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
    </div>
  );
}
