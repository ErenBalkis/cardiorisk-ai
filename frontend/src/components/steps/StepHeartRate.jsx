"use client";

import { useState } from "react";
import { ADVANCED_FIELDS, DEFAULTS } from "@/lib/constants";

/**
 * StepHeartRate — Step 6: Maximum heart rate achieved + Advanced Clinical Data accordion.
 * This is the final step before submitting the analysis.
 */
export default function StepHeartRate({ value, onChange, advancedData, onAdvancedChange }) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const hr = value || 150;

  // Max heart rate estimate: 220 - age (rough formula)
  const getCategory = (v) => {
    if (v < 100) return { label: "Below Average", color: "text-warning", bg: "bg-warning" };
    if (v <= 170) return { label: "Normal Range", color: "text-success", bg: "bg-success" };
    return { label: "Above Average", color: "text-blue-400", bg: "bg-blue-400" };
  };

  const cat = getCategory(hr);

  const renderAdvancedField = (field) => {
    const currentValue = advancedData[field.id] ?? DEFAULTS[field.id];

    if (field.type === "toggle") {
      return (
        <div key={field.id} className="flex items-center justify-between rounded-xl bg-surface/60 p-4">
          <div>
            <p className="text-sm font-medium text-text-primary">{field.label}</p>
            <p className="text-xs text-text-secondary">{field.description}</p>
          </div>
          <div className="flex gap-2">
            {field.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAdvancedChange(field.id, opt.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  currentValue === opt.value
                    ? "bg-gradient-to-r from-heart to-heart-light text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.id} className="rounded-xl bg-surface/60 p-4">
          <p className="mb-1 text-sm font-medium text-text-primary">{field.label}</p>
          <p className="mb-3 text-xs text-text-secondary">{field.description}</p>
          <div className="flex flex-wrap gap-2">
            {field.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAdvancedChange(field.id, opt.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  currentValue === opt.value
                    ? "bg-gradient-to-r from-heart to-heart-light text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === "number") {
      return (
        <div key={field.id} className="rounded-xl bg-surface/60 p-4">
          <p className="mb-1 text-sm font-medium text-text-primary">{field.label}</p>
          <p className="mb-3 text-xs text-text-secondary">{field.description}</p>
          <input
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
            value={currentValue}
            onChange={(e) => onAdvancedChange(field.id, parseFloat(e.target.value))}
            className="glass w-24 rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-heart/40"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="step-enter flex flex-col items-center">
      <div className="mb-2 text-4xl">❤️‍🔥</div>
      <h2 className="mb-2 font-heading text-3xl font-bold">Maximum Heart Rate</h2>
      <p className="mb-10 text-text-secondary">
        The maximum heart rate achieved during exercise (thalachh).
      </p>

      {/* Value Display */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-gradient-heart font-heading text-7xl font-bold">{hr}</span>
        <span className="text-xl text-text-secondary">bpm</span>
      </div>

      {/* Category Badge */}
      <div className={`mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${cat.color}`}>
        <span className={`h-2 w-2 rounded-full ${cat.bg}`} />
        {cat.label}
      </div>

      {/* Slider */}
      <div className="w-full max-w-sm">
        <input
          id="hr-slider"
          type="range"
          min={60}
          max={220}
          value={hr}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-xs text-text-secondary/60">
          <span>60</span>
          <span>100</span>
          <span>140</span>
          <span>180</span>
          <span>220</span>
        </div>
      </div>

      {/* Manual Input */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-text-secondary">or type:</span>
        <input
          id="hr-input"
          type="number"
          min={60}
          max={220}
          value={hr}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v >= 60 && v <= 220) onChange(v);
          }}
          className="glass w-24 rounded-xl px-3 py-2 text-center font-heading text-lg font-semibold outline-none transition-all focus:ring-2 focus:ring-heart/40"
        />
      </div>

      {/* ── Advanced Clinical Data Accordion ───────────────────────────── */}
      <div className="mt-12 w-full max-w-lg">
        <button
          id="advanced-toggle-btn"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="glass flex w-full items-center justify-between rounded-2xl px-6 py-4 text-left transition-all duration-300 hover:bg-surface-hover"
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-text-primary">Advanced Clinical Data</p>
              <p className="text-xs text-text-secondary">Optional — 7 additional medical parameters</p>
            </div>
          </div>
          <svg
            className={`h-5 w-5 text-text-secondary transition-transform duration-300 ${
              isAdvancedOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isAdvancedOpen ? "mt-4 max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 rounded-2xl border border-border-subtle bg-bg-secondary/50 p-4">
            <p className="mb-2 text-xs text-text-secondary">
              💡 These fields are pre-filled with statistically safe defaults. Adjust only if you have clinical data.
            </p>
            {ADVANCED_FIELDS.map(renderAdvancedField)}
          </div>
        </div>
      </div>
    </div>
  );
}
