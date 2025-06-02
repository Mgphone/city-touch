"use client";
import { cn } from "@/lib/utils";

interface StepIndicatorsProps {
  step: number;
  totalSteps: number;
}

export default function StepIndicators({
  step,
  totalSteps,
}: StepIndicatorsProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const current = index + 1;
        return (
          <div key={current} className="flex items-center">
            <div
              className={cn(
                "w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs font-medium",
                current <= step
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {current}
            </div>
            {current < totalSteps && <div className="w-8 h-0.5 bg-muted" />}
          </div>
        );
      })}
    </div>
  );
}
