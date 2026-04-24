"use client";

import { useState } from "react";

/**
 * StepAge — Step 1: Age input with slider + number field combo.
 */
export default function StepAge({ value, onChange }) {
  const age = value || 45;
  const [inputValue, setInputValue] = useState(String(age));

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);

    const v = parseInt(raw);
    if (!isNaN(v) && v >= 18 && v <= 100) {
      onChange(v);
    }
  };

  const handleBlur = () => {
    setInputValue(String(age));
  };

  const handleSliderChange = (e) => {
    const v = parseInt(e.target.value);
    onChange(v);
    setInputValue(String(v));
  };

  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">🎂</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">How old are you?</h2>
      <p className="mb-10 text-text-secondary">
        Age is one of the key factors in cardiovascular risk assessment.
      </p>

      {/* Age Display */}
      <div className="mb-8 flex items-baseline gap-2">
        <span className="text-gradient-heart font-heading text-7xl font-bold">{age}</span>
        <span className="text-xl text-text-secondary">years</span>
      </div>

      {/* Slider */}
      <div className="w-full max-w-sm">
        <input
          id="age-slider"
          type="range"
          min={18}
          max={100}
          value={age}
          onChange={handleSliderChange}
          className="w-full cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-xs text-text-secondary/60">
          <span>18</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>

      {/* Manual Input */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-text-secondary">or type directly:</span>
        <input
          id="age-input"
          type="number"
          min={18}
          max={100}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="glass w-20 rounded-xl px-3 py-2 text-center font-heading text-lg font-semibold outline-none transition-all focus:ring-2 focus:ring-heart/40"
        />
      </div>
    </div>
  );
}
