"use client";

import { useState } from "react";

/**
 * StepBloodPressure — Step 4: Resting blood pressure input.
 * Includes visual gauge and health range indicators.
 */
export default function StepBloodPressure({ value, onChange }) {
  const bp = value || 120;
  const [inputValue, setInputValue] = useState(String(bp));

  const getCategory = (v) => {
    if (v < 90) return { label: "Low", color: "text-blue-400", bg: "bg-blue-400" };
    if (v <= 120) return { label: "Normal", color: "text-success", bg: "bg-success" };
    if (v <= 139) return { label: "Elevated", color: "text-warning", bg: "bg-warning" };
    return { label: "High", color: "text-heart", bg: "bg-heart" };
  };

  const cat = getCategory(bp);

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);

    const v = parseInt(raw);
    if (!isNaN(v) && v >= 80 && v <= 200) {
      onChange(v);
    }
  };

  const handleBlur = () => {
    setInputValue(String(bp));
  };

  const handleSliderChange = (e) => {
    const v = parseInt(e.target.value);
    onChange(v);
    setInputValue(String(v));
  };

  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">🩺</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">Resting Blood Pressure</h2>
      <p className="mb-10 text-text-secondary">
        Enter your resting blood pressure in mm Hg (measurement at rest).
      </p>

      {/* Value Display */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-gradient-heart font-heading text-7xl font-bold">{bp}</span>
        <span className="text-xl text-text-secondary">mm Hg</span>
      </div>

      {/* Category Badge */}
      <div className={`mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${cat.color}`}>
        <span className={`h-2 w-2 rounded-full ${cat.bg}`} />
        {cat.label}
      </div>

      {/* Slider */}
      <div className="w-full max-w-sm">
        <input
          id="bp-slider"
          type="range"
          min={80}
          max={200}
          value={bp}
          onChange={handleSliderChange}
          className="w-full cursor-pointer"
        />
        {/* Range labels */}
        <div className="mt-3 flex justify-between text-xs">
          <span className="text-blue-400">Low</span>
          <span className="text-success">Normal</span>
          <span className="text-warning">Elevated</span>
          <span className="text-heart">High</span>
        </div>
      </div>

      {/* Manual Input */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-text-secondary">or type:</span>
        <input
          id="bp-input"
          type="number"
          min={80}
          max={200}
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
