import { useFormContext } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";

export default function Step3() {
  const {
    register,
    watch,

    formState: { errors },
  } = useFormContext<QuoteFormData>();

  const selectedDate = watch("date");
  const now = new Date();

  // Format today's date for min attribute on date input (yyyy-MM-dd)
  const todayStr = now.toISOString().split("T")[0];

  // Calculate min allowed time as HH:mm (current time + 3 hours)
  const minTimeDate = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const minTimeStr = `${pad(minTimeDate.getHours())}:${pad(
    minTimeDate.getMinutes()
  )}`;

  // Custom validate time (additional to min attribute)
  const validateTime = (value: string) => {
    if (!value) return "Time is required";

    if (!selectedDate) return true; // date required validation handles it

    if (selectedDate === todayStr) {
      // If selected date is today, time must be >= minTimeStr
      if (value < minTimeStr) {
        return `Time must be at least ${minTimeStr}`;
      }
    }
    return true;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dropoff Location & Date/Time
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

      {/* Date */}
      <label
        htmlFor="date"
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="date"
        min={todayStr} // min today, allow future dates
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
        // Only add min attribute if selected date is today
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
