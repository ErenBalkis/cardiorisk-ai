"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepAge from "./steps/StepAge";
import StepGender from "./steps/StepGender";
import StepChestPain from "./steps/StepChestPain";
import StepBloodPressure from "./steps/StepBloodPressure";
import StepCholesterol from "./steps/StepCholesterol";
import StepHeartRate from "./steps/StepHeartRate";
import ResultDashboard from "./ResultDashboard";
import { DEFAULTS } from "@/lib/constants";

const TOTAL_STEPS = 6;

/**
 * Wizard — Main state machine managing the step-by-step analysis flow.
 * Handles form data collection, API submission, and result display.
 */
export default function Wizard({ onReset: onBackToHome }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: 45,
    sex: null,
    cp: null,
    trtbps: 120,
    chol: 200,
    thalachh: 150,
  });
  const [advancedData, setAdvancedData] = useState({ ...DEFAULTS });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Handlers ──────────────────────────────────────────────────────────
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAdvancedField = (field, value) => {
    setAdvancedData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.age !== null;
      case 1: return formData.sex !== null;
      case 2: return formData.cp !== null;
      case 3: return formData.trtbps !== null;
      case 4: return formData.chol !== null;
      case 5: return formData.thalachh !== null;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Merge core form data with advanced data (defaults for unmodified fields)
    const payload = {
      ...formData,
      ...advancedData,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      setError(
        "Unable to connect to the analysis server. Please make sure the backend is running on " +
          process.env.NEXT_PUBLIC_API_URL
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({
      age: 45,
      sex: null,
      cp: null,
      trtbps: 120,
      chol: 200,
      thalachh: 150,
    });
    setAdvancedData({ ...DEFAULTS });
    setResult(null);
    setError(null);
    onBackToHome();
  };

  // ── Result Screen ─────────────────────────────────────────────────────
  if (result) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <ResultDashboard result={result} onReset={handleReset} />
      </section>
    );
  }

  // ── Step Renderer ─────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepAge value={formData.age} onChange={(v) => updateField("age", v)} />;
      case 1:
        return <StepGender value={formData.sex} onChange={(v) => updateField("sex", v)} />;
      case 2:
        return <StepChestPain value={formData.cp} onChange={(v) => updateField("cp", v)} />;
      case 3:
        return (
          <StepBloodPressure
            value={formData.trtbps}
            onChange={(v) => updateField("trtbps", v)}
          />
        );
      case 4:
        return (
          <StepCholesterol
            value={formData.chol}
            onChange={(v) => updateField("chol", v)}
          />
        );
      case 5:
        return (
          <StepHeartRate
            value={formData.thalachh}
            onChange={(v) => updateField("thalachh", v)}
            advancedData={advancedData}
            onAdvancedChange={updateAdvancedField}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-heart/10 to-transparent blur-3xl" />
        <div className="animate-pulse-slow absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-600/10 to-transparent blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back to home */}
        <button
          onClick={onBackToHome}
          className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Step Content Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-12" key={currentStep}>
          {renderStep()}

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-xl border border-heart/30 bg-heart/10 px-4 py-3 text-center text-sm text-heart-light">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex items-center justify-between">
            <button
              id="back-btn"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 ${
                currentStep === 0
                  ? "cursor-not-allowed text-text-secondary/30"
                  : "text-text-secondary hover:bg-surface hover:text-text-primary"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {isLastStep ? (
              <button
                id="analyze-btn"
                onClick={handleSubmit}
                disabled={!canProceed() || isLoading}
                className={`group inline-flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white transition-all duration-300 ${
                  canProceed() && !isLoading
                    ? "bg-gradient-to-r from-heart to-heart-light shadow-lg shadow-heart/20 hover:scale-105 hover:shadow-xl hover:shadow-heart/30"
                    : "cursor-not-allowed bg-surface text-text-secondary"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Risk
                    <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <button
                id="next-btn"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`group inline-flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white transition-all duration-300 ${
                  canProceed()
                    ? "bg-gradient-to-r from-heart to-heart-light shadow-lg shadow-heart/20 hover:scale-105 hover:shadow-xl hover:shadow-heart/30"
                    : "cursor-not-allowed bg-surface text-text-secondary"
                }`}
              >
                Next
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
