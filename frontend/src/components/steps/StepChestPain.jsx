"use client";

import { CHEST_PAIN_TYPES } from "@/lib/constants";

/**
 * StepChestPain — Step 3: Chest pain type selection with descriptive cards.
 */
export default function StepChestPain({ value, onChange }) {
  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">💓</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">Chest Pain Type</h2>
      <p className="mb-10 max-w-md text-center text-text-secondary">
        Select the type that best describes your chest pain experience.
        This is the most significant predictor in our model.
      </p>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {CHEST_PAIN_TYPES.map((type) => {
          const isSelected = value === type.value;
          return (
            <button
              key={type.value}
              id={`cp-type-${type.value}-btn`}
              onClick={() => onChange(type.value)}
              className={`group relative flex flex-col items-start gap-3 rounded-2xl border-2 bg-gradient-to-br p-5 text-left transition-all duration-300 ${type.color} ${
                isSelected
                  ? `${type.borderColor} scale-[1.02] shadow-lg`
                  : "border-border-subtle hover:border-white/20 hover:scale-[1.01]"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-3xl">{type.icon}</span>
                {isSelected && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-heart to-heart-light animate-scale-in">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <h3
                className={`font-heading text-lg font-semibold transition-colors ${
                  isSelected ? "text-white" : "text-text-secondary group-hover:text-white"
                }`}
              >
                {type.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary/70">
                {type.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
