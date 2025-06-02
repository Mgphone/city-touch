import React, { useState, useEffect, useRef } from "react";
import { useFormContext, get } from "react-hook-form";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
}

interface LocationInputProps {
  name: "pickupLocation" | "dropoffLocation" | `viaLocations.${number}`;
  label?: string;
}

export function LocationInput({ name, label }: LocationInputProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useFormContext<QuoteFormData>();

  const stairs = watch(`${name}.stairs`);
  const fullAddressValue = watch(`${name}.fullAddress`) || "";

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [placeSelected, setPlaceSelected] = useState(false);

  const requestIdRef = useRef(0);

  // Get nested place error safely
  const placeError = get(errors, `${name}.place`);

  // Reset floor count if stairs is empty string
  useEffect(() => {
    if (stairs === "") {
      setValue(`${name}.floorCount`, 0);
    }
  }, [stairs, name, setValue]);

  // Mapbox autocomplete fetch with debounce & abort controller
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
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [searchText, placeSelected]);

  // Handlers
  const handleSelectPlace = (place: MapboxFeature) => {
    setValue(`${name}.place`, place.place_name, { shouldValidate: true });
    setValue(`${name}.latitude`, place.center[1], { shouldValidate: true });
    setValue(`${name}.longitude`, place.center[0], { shouldValidate: true });
    setSearchText(place.place_name);
    setSuggestions([]);
    setPlaceSelected(true);
    clearErrors(`${name}.place`);
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setValue(`${name}.place`, e.target.value, { shouldValidate: true });
    setValue(`${name}.latitude`, null);
    setValue(`${name}.longitude`, null);
    setPlaceSelected(false);
  };

  const handlePlaceBlur = () => {
    if (!placeSelected) {
      setError(`${name}.place`, {
        type: "manual",
        message: "Please select a place from the suggestions",
      });
    }
  };

  const resetLocation = () => {
    setSearchText("");
    setSuggestions([]);
    setPlaceSelected(false);
    setValue(`${name}.place`, "");
    setValue(`${name}.latitude`, null);
    setValue(`${name}.longitude`, null);
    setValue(`${name}.fullAddress`, "");
    setValue(`${name}.floorCount`, 0);
    clearErrors(`${name}.place`);
    clearErrors(`${name}.fullAddress`);
    clearErrors(`${name}.floorCount`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {label || "Location"}
      </h2>

      {/* Place Input */}
      <label
        htmlFor={`${name}-place`}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Place (autocomplete)
      </label>
      <input
        id={`${name}-place`}
        {...register(`${name}.place`, {
          required: "Place is required",
        })}
        value={searchText}
        onChange={handlePlaceChange}
        onBlur={handlePlaceBlur}
        placeholder="Start typing a place..."
        autoComplete="off"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          placeError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {placeError && (
        <p className="mt-1 text-sm text-red-600">{placeError.message}</p>
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
        htmlFor={`${name}-fullAddress`}
        className="block mt-6 mb-2 text-sm font-medium text-gray-700"
      >
        Full Address (manual input)
      </label>
      <textarea
        id={`${name}-fullAddress`}
        {...register(`${name}.fullAddress`, {
          required: "Full address is required",
        })}
        placeholder="Street, City, Zip, Country"
        className={`w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          get(errors, `${name}.fullAddress`)
            ? "border-red-500"
            : "border-gray-300"
        }`}
        rows={4}
        value={fullAddressValue}
        onChange={(e) =>
          setValue(`${name}.fullAddress`, e.target.value, {
            shouldValidate: true,
          })
        }
        disabled={isSubmitting}
      />
      {get(errors, `${name}.fullAddress`) && (
        <p className="mt-1 text-sm text-red-600">
          {get(errors, `${name}.fullAddress`)?.message}
        </p>
      )}

      {/* Stairs */}
      <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
        Stairs Access
      </label>
      <select
        {...register(`${name}.stairs`, {
          required: "Please select stairs access",
        })}
        className={`w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          get(errors, `${name}.stairs`) ? "border-red-500" : "border-gray-300"
        }`}
        defaultValue=""
        disabled={isSubmitting}
      >
        <option value="" disabled>
          Select stairs access
        </option>
        <option value="stairs">Stairs</option>
        <option value="lift">Lift</option>
      </select>
      {get(errors, `${name}.stairs`) && (
        <p className="mt-1 text-sm text-red-600">
          {get(errors, `${name}.stairs`)?.message}
        </p>
      )}

      {/* Floor Count */}
      {stairs && (
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Floor Count
          </label>
          <select
            {...register(`${name}.floorCount`, {
              required: "Please select floor count",
              valueAsNumber: true,
            })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              get(errors, `${name}.floorCount`)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            defaultValue="0"
            disabled={isSubmitting}
          >
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i}>
                {i === 0 ? "No Stair" : i}
              </option>
            ))}
          </select>
          {get(errors, `${name}.floorCount`) && (
            <p className="mt-1 text-sm text-red-600">
              {get(errors, `${name}.floorCount`)?.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
