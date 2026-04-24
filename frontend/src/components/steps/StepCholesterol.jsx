"use client";

import { useState } from "react";

/**
 * StepCholesterol — Step 5: Serum cholesterol input.
 * Includes health range visualization.
 */
export default function StepCholesterol({ value, onChange }) {
  const chol = value || 200;
  const [inputValue, setInputValue] = useState(String(chol));

  const getCategory = (v) => {
    if (v < 200) return { label: "Desirable", color: "text-success", bg: "bg-success" };
    if (v <= 239) return { label: "Borderline High", color: "text-warning", bg: "bg-warning" };
    return { label: "High", color: "text-heart", bg: "bg-heart" };
  };

  const cat = getCategory(chol);

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);

    const v = parseInt(raw);
    if (!isNaN(v) && v >= 100 && v <= 600) {
      onChange(v);
    }
  };

  const handleBlur = () => {
    setInputValue(String(chol));
  };

  const handleSliderChange = (e) => {
    const v = parseInt(e.target.value);
    onChange(v);
    setInputValue(String(v));
  };

  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">🧪</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">Serum Cholesterol</h2>
      <p className="mb-10 text-text-secondary">
        Enter your serum cholesterol level in mg/dl.
      </p>

      {/* Value Display */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-gradient-heart font-heading text-7xl font-bold">{chol}</span>
        <span className="text-xl text-text-secondary">mg/dl</span>
      </div>

      {/* Category Badge */}
      <div className={`mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${cat.color}`}>
        <span className={`h-2 w-2 rounded-full ${cat.bg}`} />
        {cat.label}
      </div>

      {/* Slider */}
      <div className="w-full max-w-sm">
        <input
          id="chol-slider"
          type="range"
          min={100}
          max={600}
          value={chol}
          onChange={handleSliderChange}
          className="w-full cursor-pointer"
        />
        <div className="mt-3 flex justify-between text-xs">
          <span className="text-success">Desirable</span>
          <span className="text-warning">Borderline</span>
          <span className="text-heart">High</span>
        </div>
      </div>

      {/* Manual Input */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-text-secondary">or type:</span>
        <input
          id="chol-input"
          type="number"
          min={100}
          max={600}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="glass w-24 rounded-xl px-3 py-2 text-center font-heading text-lg font-semibold outline-none transition-all focus:ring-2 focus:ring-heart/40"
        />
      </div>
    </div>
  );
}
