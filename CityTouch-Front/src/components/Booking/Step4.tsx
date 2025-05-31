import React from "react";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

export default function Step4() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const stairsValue = watch("stairs");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Stairs and Floor Count
      </h2>

      {/* Stairs Radio */}
      <Label className="block mb-2 text-sm font-medium text-gray-700">
        Stairs <span className="text-red-500">*</span>
      </Label>

      <RadioGroup
        onValueChange={(val) =>
          setValue("stairs", val, { shouldValidate: true })
        }
        value={stairsValue || ""}
        className="flex space-x-6 mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="lift"
            id="lift"
            className="w-5 h-5 rounded-full border border-gray-400 bg-white
              data-[state=checked]:bg-blue-600
              data-[state=checked]:border-blue-600
              relative
              before:block
              before:absolute
              before:top-1/2
              before:left-1/2
              before:w-3
              before:h-3
              before:-translate-x-1/2
              before:-translate-y-1/2
              before:rounded-full
              before:bg-white
              data-[state=checked]:before:bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="lift" className="text-gray-800 cursor-pointer">
            Lift
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="stairs"
            id="stairs"
            className="w-5 h-5 rounded-full border border-gray-400 bg-white
              data-[state=checked]:bg-blue-600
              data-[state=checked]:border-blue-600
              relative
              before:block
              before:absolute
              before:top-1/2
              before:left-1/2
              before:w-3
              before:h-3
              before:-translate-x-1/2
              before:-translate-y-1/2
              before:rounded-full
              before:bg-white
              data-[state=checked]:before:bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="stairs" className="text-gray-800 cursor-pointer">
            Stairs
          </label>
        </div>
      </RadioGroup>

      {errors.stairs && typeof errors.stairs.message === "string" && (
        <p className="text-red-600 text-sm mt-1">{errors.stairs.message}</p>
      )}

      {/* Floor Count */}
      <Label
        htmlFor="floorCount"
        className="block mb-2 mt-6 text-sm font-medium text-gray-700"
      >
        Floor Count <span className="text-red-500">*</span>
      </Label>
      <input
        type="number"
        id="floorCount"
        {...register("floorCount", {
          required: "Floor count is required",
          min: { value: 0, message: "Floor count cannot be negative" },
        })}
        min={0}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.floorCount ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="0"
      />
      {errors.floorCount && typeof errors.floorCount.message === "string" && (
        <p className="text-red-600 text-sm mt-1">{errors.floorCount.message}</p>
      )}
    </div>
  );
}
