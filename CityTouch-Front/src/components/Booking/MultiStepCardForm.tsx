"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import StepIndicators from "./StepIndicators";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import Step6 from "./Step6";
import { Button } from "../ui/button";

const TOTAL_STEPS = 6;

export default function MultiStepForm() {
  const methods = useForm<QuoteFormData>({
    defaultValues: {
      pickupLocation: { place: "", fullAddress: "" },
      viaLocations: [],
      dropoffLocation: { place: "", fullAddress: "" },
      date: "",
      time: "",
      stairs: "",
      floorCount: 0,
      name: "",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const [step, setStep] = useState(1);
  const { handleSubmit, trigger, getValues } = methods;

  const onSubmit = (data: QuoteFormData) => {
    console.log("Final data submitted:", data);
    alert("Form submitted! Check console.");
  };

  const next = async () => {
    // Trigger validation for all fields for simplicity,
    // or customize to validate step-specific fields if needed
    const valid = await trigger();
    if (valid) setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 border rounded-lg shadow-lg bg-white"
      >
        <StepIndicators step={step} totalSteps={TOTAL_STEPS} />

        {/* Step Rendering */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 formData={getValues()} />}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-8">
          {step > 1 ? (
            <Button
              variant="outline"
              type="button"
              onClick={prev}
              className="w-full sm:w-auto border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < TOTAL_STEPS ? (
            <Button
              variant="default"
              className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
              type="button"
              onClick={next}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full sm:w-auto bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-600 shadow-md"
              type="submit"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
