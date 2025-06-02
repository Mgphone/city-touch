import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
}

export default function Step1() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<QuoteFormData>();
  const stairs = watch("pickupLocation.stairs");

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [placeSelected, setPlaceSelected] = useState(false);
  const fullAddressValue = watch("pickupLocation.fullAddress") || "";

  // Track the latest request ID for fetch calls
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (stairs === "") {
      setValue("pickupLocation.floorCount", 0);
    }
  }, [stairs, setValue]);

  useEffect(() => {
    if (searchText.length < 3 || placeSelected) {
      setSuggestions([]);
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    const controller = new AbortController();

    const debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchText
          )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5&country=gb`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (requestIdRef.current === currentRequestId) {
          setSuggestions(data.features || []);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Mapbox fetch error:", err);
        }
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(debounceTimer); // Clear the debounce timer on effect cleanup
      controller.abort(); // Abort ongoing fetch on cleanup
    };
  }, [searchText, placeSelected]);

  const handleSelectPlace = (place: MapboxFeature) => {
    setValue("pickupLocation.place", place.place_name, {
      shouldValidate: true,
    });
    setValue("pickupLocation.latitude", place.center[1], {
      shouldValidate: true,
    });
    setValue("pickupLocation.longitude", place.center[0], {
      shouldValidate: true,
    });
    setSearchText(place.place_name);
    setSuggestions([]);
    setPlaceSelected(true);
    clearErrors("pickupLocation.place");
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setValue("pickupLocation.place", e.target.value, { shouldValidate: true });
    setValue("pickupLocation.latitude", null);
    setValue("pickupLocation.longitude", null);
    setPlaceSelected(false);
  };

  const handlePlaceBlur = () => {
    if (!placeSelected) {
      setError("pickupLocation.place", {
        type: "manual",
        message: "Please select a place from the suggestions",
      });
    }
  };
  const resetLocation = () => {
    setSearchText("");
    setSuggestions([]);
    setPlaceSelected(false);

    // Reset all pickupLocation fields except "stairs"
    setValue("pickupLocation.place", "");
    setValue("pickupLocation.latitude", null);
    setValue("pickupLocation.longitude", null);
    setValue("pickupLocation.fullAddress", "");
    setValue("pickupLocation.floorCount", 0);

    clearErrors("pickupLocation.place");
    clearErrors("pickupLocation.fullAddress");
    clearErrors("pickupLocation.floorCount");
  };

  return (
    <div className=" max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pickup Location
      </h2>

      {/* Place Input */}
      <label
        htmlFor="pickupPlace"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Place (autocomplete)
      </label>
      <input
        id="pickupPlace"
        {...register("pickupLocation.place", {
          required: "Pickup place is required",
        })}
        value={searchText}
        onChange={handlePlaceChange}
        onBlur={handlePlaceBlur}
        placeholder="Start typing a place..."
        autoComplete="off"
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.pickupLocation?.place ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.pickupLocation?.place && (
        <p className="mt-1 text-sm text-red-600">
          {errors.pickupLocation.place.message}
        </p>
      )}

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
        <ul className="w-full mt-2 bg-white border rounded-md max-h-48 overflow-auto shadow-md z-10">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input losing focus before click
                handleSelectPlace(s);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
            >
              {s.place_name}
            </li>
          ))}
        </ul>
      )}
      {placeSelected && (
        <Button
          type="button"
          variant="ghost"
          onClick={resetLocation}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          Change location
        </Button>
      )}

      {/* Full Address */}
      <label
        htmlFor="pickupAddress"
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Full Address (manual input)
      </label>
      <textarea
        id="pickupAddress"
        {...register("pickupLocation.fullAddress", {
          required: "Pickup full address is required",
        })}
        placeholder="Street, City, Zip, Country"
        className={`w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          errors.pickupLocation?.fullAddress
            ? "border-red-500"
            : "border-gray-300"
        }`}
        rows={4}
        value={fullAddressValue}
        onChange={(e) =>
          setValue("pickupLocation.fullAddress", e.target.value, {
            shouldValidate: true,
          })
        }
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
