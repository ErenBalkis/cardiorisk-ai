"use client";

/**
 * StepGender — Step 2: Gender selection with large clickable icon cards.
 */
export default function StepGender({ value, onChange }) {
  const options = [
    {
      value: 1,
      label: "Male",
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10" cy="14" r="5" />
          <path strokeLinecap="round" d="M21 3l-6.5 6.5M21 3h-5M21 3v5" />
        </svg>
      ),
      gradient: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/50",
      shadow: "shadow-blue-500/20",
    },
    {
      value: 0,
      label: "Female",
      icon: (
        <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="9" r="5" />
          <path strokeLinecap="round" d="M12 14v7M9 18h6" />
        </svg>
      ),
      gradient: "from-pink-500/20 to-rose-500/10",
      border: "border-pink-500/50",
      shadow: "shadow-pink-500/20",
    },
  ];

  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">👤</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">What is your gender?</h2>
      <p className="mb-10 text-text-secondary">
        Biological sex affects cardiovascular risk patterns.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              id={`gender-${opt.label.toLowerCase()}-btn`}
              onClick={() => onChange(opt.value)}
              className={`group relative flex h-48 w-40 flex-col items-center justify-center gap-4 rounded-3xl border-2 bg-gradient-to-br p-6 transition-all duration-300 ${opt.gradient} ${
                isSelected
                  ? `${opt.border} scale-105 ${opt.shadow} shadow-lg`
                  : "border-border-subtle hover:border-white/20 hover:scale-102"
              }`}
            >
              <div
                className={`transition-transform duration-300 ${
                  isSelected ? "scale-110 text-white" : "text-text-secondary group-hover:text-white"
                }`}
              >
                {opt.icon}
              </div>
              <span
                className={`font-heading text-lg font-semibold transition-colors duration-300 ${
                  isSelected ? "text-white" : "text-text-secondary group-hover:text-white"
                }`}
              >
                {opt.label}
              </span>
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-heart to-heart-light shadow-md animate-scale-in">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
