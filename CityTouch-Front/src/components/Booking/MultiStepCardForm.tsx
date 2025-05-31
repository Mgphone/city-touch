"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const TOTAL_STEPS = 4;

type FormData = {
  name: string;
  email: string;
  address: string;
  date: string;
};

export default function MultiStepForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      date: "",
    },
    mode: "onTouched",
  });

  const [step, setStep] = useState(1);
  const { handleSubmit, trigger } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Final submitted data:", data);
  };

  const next = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-6"
      >
        {/* Step Indicators */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const current = index + 1;
            return (
              <div key={current} className="flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full transition-all",
                    current <= step ? "bg-primary" : "bg-muted"
                  )}
                />
                {current < TOTAL_STEPS && (
                  <div className="w-8 h-0.5 bg-muted" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Components */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prev}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
