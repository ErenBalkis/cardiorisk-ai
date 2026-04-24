"use client";

import { useEffect, useState } from "react";
import { getRiskLevel } from "@/lib/constants";

/**
 * RadialGauge — Animated circular gauge displaying risk percentage.
 * Uses SVG with stroke-dasharray animation for smooth fill effect.
 */
export default function RadialGauge({ probability }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round(probability * 100);
  const riskLevel = getRiskLevel(probability);

  // Circle geometry
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  // Animate the value on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={size}
        height={size}
        className="drop-shadow-lg"
        style={{ filter: `drop-shadow(0 0 20px ${riskLevel.color}40)` }}
      >
        {/* Background circle */}
        <circle
          className="gauge-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Animated fill circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={riskLevel.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: `drop-shadow(0 0 8px ${riskLevel.color})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-heading text-5xl font-bold"
          style={{ color: riskLevel.color }}
        >
          {animatedValue}%
        </span>
        <span className="mt-1 text-sm text-text-secondary">Risk Score</span>
      </div>
    </div>
  );
}
