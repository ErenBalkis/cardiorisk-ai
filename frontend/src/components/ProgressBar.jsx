"use client";

import { STEPS } from "@/lib/constants";

/**
 * ProgressBar — Visual step indicator for the wizard flow.
 * Shows current step with numbered circles and connecting lines.
 */
export default function ProgressBar({ currentStep }) {
  return (
    <div className="mx-auto mb-10 flex w-full max-w-md items-center justify-between">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500 ${
                  isCompleted
                    ? "bg-gradient-to-br from-heart to-heart-light text-white shadow-lg shadow-heart/25 scale-100"
                    : isActive
                      ? "bg-gradient-to-br from-heart to-heart-light text-white shadow-lg shadow-heart/30 scale-110 ring-4 ring-heart/20"
                      : "bg-surface text-text-secondary border border-border-subtle"
                }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Label */}
              <span
                className={`mt-1.5 text-xs font-medium transition-colors duration-300 ${
                  isActive ? "text-heart-light" : isCompleted ? "text-text-secondary" : "text-text-secondary/50"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div className="relative mx-1 mb-5 h-0.5 w-8 flex-shrink-0 overflow-hidden rounded-full bg-surface sm:mx-2 sm:w-12 md:w-16">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-heart to-heart-light transition-all duration-700 ease-out"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
