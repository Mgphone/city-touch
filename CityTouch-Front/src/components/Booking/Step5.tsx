import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@radix-ui/react-label";

export default function Step5() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Contact Information
      </h2>

      {/* Name */}
      <div>
        <Label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </Label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name", { required: "Name is required" })}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && typeof errors.name.message === "string" && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Email <span className="text-red-500">*</span>
        </Label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && typeof errors.email.message === "string" && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label
          htmlFor="phone"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <input
          id="phone"
          type="tel"
          placeholder="+44 1234 567890"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[0-9\s\-()]{7,}$/,
              message: "Invalid phone number",
            },
          })}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && typeof errors.phone.message === "string" && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
}
