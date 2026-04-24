"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Wizard from "@/components/Wizard";

/**
 * Home — Main entry point for CardioRisk AI.
 * Manages the transition between Hero landing and Wizard analysis flow.
 */
export default function Home() {
  const [view, setView] = useState("hero"); // "hero" | "wizard"

  return (
    <main className="relative min-h-screen">
      {view === "hero" ? (
        <HeroSection onStart={() => setView("wizard")} />
      ) : (
        <Wizard onReset={() => setView("hero")} />
      )}

      {/* ── Subtle Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border-subtle bg-bg-secondary/30 px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-text-secondary/60">
            <svg className="h-4 w-4 text-heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>CardioRisk AI</span>
          </div>
          <p className="text-xs text-text-secondary/40">
            Built with Next.js & FastAPI • For educational purposes only
          </p>
        </div>
      </footer>
    </main>
  );
}
