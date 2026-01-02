import React from "react";

interface SignupStepperProps {
  currentStep: number;
  steps?: string[];
}

const defaultSteps = ["Clinic Details", "Verification", "Agreement"];

export default function SignupStepper({ currentStep, steps = defaultSteps }: SignupStepperProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      {steps.map((step, idx) => {
        const isActive = currentStep > idx;
        const isCurrent = currentStep === idx + 1;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isActive ? "bg-green-500" : isCurrent ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                {isActive ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </div>
              <span className={`text-xs whitespace-nowrap ${isActive ? "text-green-700 font-semibold" : isCurrent ? "text-gray-400" : "text-gray-400"}`}>{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-24 h-1 mb-6 bg-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
