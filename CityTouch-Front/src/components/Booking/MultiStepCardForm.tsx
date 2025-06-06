import { useEffect, useState } from "react";
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
import SuccessPage from "./SuccessPage";
import { toast } from "react-toastify";

const TOTAL_STEPS = 6;

export default function MultiStepForm() {
  const { bookingData, setBookingData } = useBooking();

  const methods = useForm<QuoteFormData>({
    defaultValues: bookingData,
    mode: "onTouched",
  });

  const { trigger, getValues } = methods;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_BACK_URL;
  const quoteURL = `${API_URL}calculate`;
  const bookingURL = `${API_URL}booking`;

  // Quote calculation on step 6
  useEffect(() => {
    if (step !== 6) return;

    const calculateQuote = async () => {
      try {
        setLoading(true);
        const values = getValues();
        const response = await axios.post(quoteURL, values);
        const {
          breakdown,
          rules,
          totalCost,
          totalMiles,
          halfHourCost,
          payableNow,
          outstandingBalance,
        } = response.data;

        setBookingData((prev) => ({
          ...prev,
          ...values,
          breakdown,
          rules,
          totalCost,
          totalMiles,
          halfHourCost,
          payableNow,
          outstandingBalance,
        }));
      } catch (err) {
        console.error("Quote calculation failed", err);
        toast.error("Failed to calculate quote.");
      } finally {
        setLoading(false);
      }
    };

    calculateQuote();
  }, [step]);

  const next = async () => {
    const valid = await trigger();
    if (valid) {
      setBookingData(getValues());
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    setBookingData(getValues());
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.post(bookingURL, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Booking confirmed successfully!");
      console.log("Booking response:", response.data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking submission failed", err);
      toast.error("Failed to confirm booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <SuccessPage />
      ) : (
        <FormProvider {...methods}>
          <form className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 border rounded-lg shadow-lg bg-gray-50">
            <StepIndicators step={step} totalSteps={TOTAL_STEPS} />

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
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
                  className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700"
                  type="button"
                  onClick={next}
                  disabled={loading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full sm:w-auto bg-purple-700 text-white hover:bg-purple-800"
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={loading}
                >
                  Confirm & Pay
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}
