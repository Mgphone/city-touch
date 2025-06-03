import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  format,
  addMinutes,
  addDays,
  setHours,
  setMinutes,
  isBefore,
} from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import { useBooking } from "@/context/bookingContext";
import { validateLocations } from "@/lib/validateLocation";
import { checkDuration } from "@/lib/checkDuration";
import { Clock } from "lucide-react";

export default function Step4() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<QuoteFormData>();
  //will see what is my context look like
  const [durationTravel, setDurationTravel] = useState<{
    hours: number;
    minutes: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { bookingData } = useBooking();

  const locationErrors = validateLocations(bookingData);
  useEffect(() => {
    if (locationErrors.length === 0) {
      setIsLoading(true);
      (async () => {
        try {
          const duration = await checkDuration(bookingData);
          setDurationTravel(duration);
        } catch (error) {
          console.error("Error getting duration:", error);
          setDurationTravel(null);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setDurationTravel(null);
    }
  }, [bookingData]);
  const now = new Date();
  const twoHoursLater = addMinutes(now, 120);

  const minDateObj = isBefore(twoHoursLater, setHours(setMinutes(now, 0), 23))
    ? now
    : addDays(now, 1);
  const minDate = format(minDateObj, "yyyy-MM-dd");

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const timeOptions = useMemo(() => {
    const options: string[] = [];
    const todayFormatted = format(now, "yyyy-MM-dd");

    let currentStartHour: number;
    let currentStartMinute: number;

    const isSelectedDateToday = selectedDate === todayFormatted;

    if (isSelectedDateToday) {
      // If selecting today, apply the 2-hour buffer from now
      currentStartHour = twoHoursLater.getHours();
      currentStartMinute = twoHoursLater.getMinutes() <= 30 ? 30 : 0;
    } else {
      // If selecting any other day (tomorrow or later), start from 6 AM
      currentStartHour = 6;
      currentStartMinute = 0;
    }

    const baseDateForTimeGeneration = selectedDate
      ? new Date(selectedDate)
      : new Date(); // Fallback if selectedDate is not yet set

    let current = setHours(
      setMinutes(baseDateForTimeGeneration, currentStartMinute),
      currentStartHour
    );
    const end = setHours(setMinutes(baseDateForTimeGeneration, 0), 22);

    if (isBefore(end, current)) {
      return [];
    }

    while (current <= end) {
      options.push(format(current, "HH:mm"));
      current = addMinutes(current, 30);
    }
    return options;
  }, [selectedDate, twoHoursLater, now]); // Added 'now' as a dependency for todayFormatted calculation

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [hour, minute] = selectedTime.split(":").map(Number);
      const selectedDateTime = setHours(
        setMinutes(new Date(selectedDate), minute),
        hour
      );

      if (
        selectedDate === format(now, "yyyy-MM-dd") &&
        isBefore(selectedDateTime, twoHoursLater)
      ) {
        trigger("time");
      }
    }
  }, [selectedDate, selectedTime, trigger, twoHoursLater, now]);

  const vanSizes = ["small", "medium", "large", "luton"] as const;
  const menOptions = [0, 1, 2, 3];
  const durationOptions = Array.from({ length: 29 }, (_, i) =>
    ((i + 2) * 0.5).toString()
  );

  return locationErrors.length > 0 ? (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
        <h3 className="text-lg font-semibold mb-2">
          Missing or Invalid Location Info
        </h3>
        <ul className="list-disc list-inside text-sm">
          {locationErrors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Date & Time</h2>
      {/* Estimated Travel Duration */}
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-blue-500">
            <Clock size={20} />
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
            <span className="text-sm text-gray-700">
              Calculating travel time
            </span>
          </div>
        ) : (
          durationTravel && (
            <div className="flex items-center space-x-2 text-green-700">
              <Clock size={20} />
              <span className="text-sm">
                Your estimated travel time is {durationTravel.hours}h{" "}
                {durationTravel.minutes}m.
              </span>
            </div>
          )
        )}
      </div>
      {/* Date */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
          Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="date"
          min={minDate}
          {...register("date", { required: "Date is required" })}
          className={`w-full md:w-2/3 ${errors.date ? "border-red-500" : ""}`}
        />
      </div>
      {errors.date && (
        <p className="text-sm text-red-600 md:ml-[33.3333%]">
          {errors.date.message}
        </p>
      )}

      {/* Time */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
        <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
          Time <span className="text-red-500">*</span>
        </label>
        <Select
          defaultValue=""
          onValueChange={(value) =>
            setValue("time", value, { shouldValidate: true })
          }
          value={selectedTime || ""}
        >
          <SelectTrigger
            className={`w-full md:w-2/3 transition border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vanSize ? "border-red-500" : "border-gray-300"
            }`}
          >
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.length > 0 ? (
              timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="" disabled>
                No available times
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      {errors.time && (
        <p className="text-sm text-red-600 md:ml-[33.3333%]">
          {errors.time.message}
        </p>
      )}

      {/* Van Size */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
        <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
          Van Size <span className="text-red-500">*</span>
        </label>
        <Select
          defaultValue=""
          onValueChange={(value) =>
            setValue(
              "vanSize",
              value as "small" | "medium" | "large" | "luton",
              {
                shouldValidate: true,
              }
            )
          }
          value={watch("vanSize") || ""}
        >
          <SelectTrigger
            className={`w-full md:w-2/3 transition border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vanSize ? "border-red-500" : "border-gray-300"
            }`}
          >
            <SelectValue placeholder="Select van size" />
          </SelectTrigger>
          <SelectContent>
            {vanSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {errors.vanSize && (
        <p className="text-sm text-red-600 md:ml-[33.3333%]">
          {errors.vanSize.message}
        </p>
      )}

      {/* Duration */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
        <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
          Duration (hours) <span className="text-red-500">*</span>
        </label>
        <Select
          defaultValue=""
          onValueChange={(value) =>
            setValue("durationHours", parseFloat(value), {
              shouldValidate: true,
            })
          }
          value={watch("durationHours")?.toString() || ""}
        >
          <SelectTrigger
            className={`w-full md:w-2/3 transition border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vanSize ? "border-red-500" : "border-gray-300"
            }`}
          >
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {durationOptions.map((dur) => (
              <SelectItem key={dur} value={dur}>
                {dur} hrs
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {errors.durationHours && (
        <p className="text-sm text-red-600 md:ml-[33.3333%]">
          {errors.durationHours.message}
        </p>
      )}

      {/* Helpers */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
        <label className="w-full md:w-1/3 text-sm font-medium text-gray-700">
          Number of Helpers (including driver)
        </label>
        <Select
          defaultValue=""
          onValueChange={(value) =>
            setValue("menRequired", parseInt(value, 10), {
              shouldValidate: true,
            })
          }
          value={watch("menRequired")?.toString() || ""}
        >
          <SelectTrigger className="w-full md:w-2/3">
            <SelectValue placeholder="Select number of helpers" />
          </SelectTrigger>
          <SelectContent>
            {menOptions.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num === 0 ? "No Help" : num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
