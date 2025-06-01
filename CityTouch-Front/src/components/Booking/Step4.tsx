import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";

export default function Step4() {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<QuoteFormData>();

  const selectedDate = watch("date");
  const now = new Date();

  const todayStr = now.toISOString().split("T")[0];
  const minTimeDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const minTimeStr = `${pad(minTimeDate.getHours())}:${pad(
    minTimeDate.getMinutes()
  )}`;

  const validateTime = (value: string) => {
    if (!value) return "Time is required";
    if (!selectedDate) return true;
    if (selectedDate === todayStr && value < minTimeStr) {
      return `Time must be at least ${minTimeStr}`;
    }
    return true;
  };

  useEffect(() => {
    if (selectedDate) {
      trigger("time");
    }
  }, [selectedDate, trigger]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Date & Time</h2>

      {/* Date */}
      <label
        htmlFor="date"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="date"
        min={todayStr}
        {...register("date", { required: "Date is required" })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.date ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.date && (
        <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
      )}

      {/* Time */}
      <label
        htmlFor="time"
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Time <span className="text-red-500">*</span>
      </label>
      <input
        type="time"
        id="time"
        {...register("time", {
          validate: validateTime,
        })}
        min={selectedDate === todayStr ? minTimeStr : undefined}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.time ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.time && (
        <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
      )}
    </div>
  );
}
