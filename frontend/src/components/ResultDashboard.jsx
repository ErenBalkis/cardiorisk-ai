"use client";

import RadialGauge from "./RadialGauge";
import { getRiskLevel } from "@/lib/constants";

/**
 * ResultDashboard — Displays the risk analysis results with gauge,
 * risk level indicator, health recommendations, and model info.
 */
export default function ResultDashboard({ result, onReset }) {
  const { risk_probability, risk_prediction } = result;
  const riskLevel = getRiskLevel(risk_probability);
  const percentage = Math.round(risk_probability * 100);

  // Generate contextual recommendations based on prediction
  const recommendations =
    risk_prediction === 1
      ? [
        {
          icon: "🏥",
          title: "Consult a Cardiologist",
          text: "Your risk profile suggests you should schedule an appointment with a heart specialist for further evaluation.",
        },
        {
          icon: "📊",
          title: "Get Comprehensive Tests",
          text: "Consider getting an ECG, stress test, and lipid panel to establish a detailed cardiac health baseline.",
        },
        {
          icon: "🏃",
          title: "Lifestyle Modifications",
          text: "Regular exercise, a heart-healthy diet, and stress management can significantly reduce cardiovascular risk.",
        },
        {
          icon: "💊",
          title: "Medication Review",
          text: "Discuss with your doctor whether preventive medications might be appropriate for your risk level.",
        },
      ]
      : [
        {
          icon: "✅",
          title: "Continue Healthy Habits",
          text: "Your current risk profile looks favorable. Maintain your healthy lifestyle to keep it that way.",
        },
        {
          icon: "🥗",
          title: "Heart-Healthy Diet",
          text: "Continue eating fruits, vegetables, whole grains, and lean proteins for optimal cardiovascular health.",
        },
        {
          icon: "🏋️",
          title: "Stay Active",
          text: "Aim for at least 150 minutes of moderate aerobic exercise per week to maintain heart health.",
        },
        {
          icon: "📅",
          title: "Regular Check-ups",
          text: "Even with low risk, schedule annual health screenings to monitor your cardiovascular health.",
        },
      ];

  return (
    <div className="animate-slide-up mx-auto w-full max-w-3xl px-4">
      {/* ── Main Result Card ──────────────────────────────────────────── */}
      <div className={`glass-strong rounded-3xl p-8 md:p-12`}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-heading text-3xl font-bold">Risk Analysis Complete</h2>
          <p className="text-text-secondary">
            Based on the data you provided, here are your results.
          </p>
        </div>

        {/* Gauge + Risk Level */}
        <div className="mb-10 flex flex-col items-center">
          <RadialGauge probability={risk_probability} />

          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-lg font-semibold"
            style={{
              backgroundColor: `${riskLevel.color}15`,
              color: riskLevel.color,
              border: `1px solid ${riskLevel.color}30`,
            }}
          >
            <span
              className="h-3 w-3 rounded-full animate-pulse"
              style={{ backgroundColor: riskLevel.color }}
            />
            {riskLevel.label}
          </div>

          <p className="mt-4 max-w-md text-center text-sm text-text-secondary">
            {risk_prediction === 1
              ? `Our model indicates a ${percentage}% probability of elevated cardiovascular risk. This warrants further medical evaluation.`
              : `Our model indicates a ${percentage}% probability of cardiovascular risk, which falls within the lower range. Continue maintaining a healthy lifestyle.`}
          </p>
        </div>

        {/* ── Recommendations Grid ────────────────────────────────────── */}
        <div className="mb-8">
          <h3 className="mb-4 font-heading text-lg font-semibold">Recommendations</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface/80 p-4 transition-all duration-200 hover:bg-surface-hover"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-2 text-2xl">{rec.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-text-primary">
                  {rec.title}
                </h4>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {rec.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Model Info / Disclaimer ─────────────────────────────────── */}
        <div className="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-warning">Medical Disclaimer</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                This tool is for educational and informational purposes only. It uses a
                Logistic Regression model trained on the UCI Heart Disease dataset (303
                records). It is <strong className="text-text-primary">not</strong> a substitute for professional
                medical diagnosis. Always consult a qualified healthcare provider.
              </p>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ──────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            id="restart-btn"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-heart to-heart-light px-8 py-3 font-semibold text-white shadow-lg shadow-heart/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-heart/30"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start New Analysis
          </button>
        </div>
      </div>

      {/* ── Model Transparency Section ────────────────────────────────── */}
      <div className="mt-6 rounded-2xl border border-border-subtle bg-surface/30 p-6 text-center">
        <h3 className="mb-3 font-heading text-sm font-semibold text-text-secondary">About the Model</h3>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary/70">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Logistic Regression
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            UCI Heart Disease Dataset
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            303 Clinical Records
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            ~90% Test Accuracy
          </span>
        </div>
      </div>
    </div>
  );
}
