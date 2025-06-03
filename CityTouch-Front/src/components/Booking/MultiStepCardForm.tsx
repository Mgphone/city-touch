import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import StepIndicators from "./StepIndicators";
import { QuoteFormData } from "@/data/type/QuoteFormData";
import { Button } from "../ui/button";
import { useBooking } from "@/context/bookingContext";
import axios from "axios";

const TOTAL_STEPS = 6;

export default function MultiStepForm() {
  const { bookingData, setBookingData } = useBooking();
  const methods = useForm<QuoteFormData>({
    defaultValues: bookingData,
    mode: "onTouched",
  });

  const { handleSubmit, trigger, getValues } = methods;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const API_URL = import.meta.env.VITE_BACK_URL;

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setLoading(true); // ✅ Start loading
      const response = await axios.post(API_URL, data);
      const { breakdown, rules, totalCost, totalMiles } = response.data;

      // ✅ Merge backend values into bookingData context
      setBookingData((prev) => ({
        ...prev,
        ...data,
        breakdown,
        rules,
        totalCost,
        totalMiles,
      }));

      alert(`Quote calculated! Total cost: £${response.data.totalCost}`);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to calculate quote. Please try again.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = async () => {
    const valid = await trigger();
    if (valid) {
      setBookingData(getValues()); // Sync to context
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      scrollToTop();
    }
  };

  const prev = () => {
    setBookingData(getValues());
    setStep((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 border rounded-lg shadow-lg bg-gray-50"
      >
        <StepIndicators step={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {/* {step === 6 && <Step6 formData={getValues()} />}
         */}
        {step === 6 &&
          (loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <svg
                className="animate-spin h-8 w-8 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              <span className="ml-3 text-purple-700 text-lg font-medium">
                Calculating quote...
              </span>
            </div>
          ) : (
            <Step6 />
          ))}

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-8">
          {step > 1 ? (
            <Button
              variant="outline"
              type="button"
              onClick={prev}
              className="w-full sm:w-auto border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black"
              disabled={loading}
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
              disabled={loading}
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
