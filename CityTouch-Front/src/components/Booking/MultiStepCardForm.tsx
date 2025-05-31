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
        className="max-w-lg mx-auto p-6 space-y-6 border rounded shadow"
      >
        <StepIndicators step={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 formData={getValues()} />}

        <div className="flex justify-between">
          {step > 1 ? (
            <button type="button" onClick={prev} className="btn btn-outline">
              Back
            </button>
          ) : (
            <div />
          )}
          {step < TOTAL_STEPS ? (
            <button type="button" onClick={next} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
