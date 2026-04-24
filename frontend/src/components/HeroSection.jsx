"use client";

/**
 * HeroSection — Landing/Welcome screen for CardioRisk AI.
 * Features animated gradient background, heartbeat icon, and CTA button.
 */
export default function HeroSection({ onStart }) {
  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* ── Background Gradient Orbs ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-heart/20 to-transparent blur-3xl" />
        <div className="animate-pulse-slow absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-indigo-600/15 to-transparent blur-3xl" style={{ animationDelay: '1.5s' }} />
        <div className="animate-pulse-slow absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-heart-light/10 to-purple-500/10 blur-3xl" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Heartbeat Icon */}
        <div className="animate-heartbeat mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-heart to-heart-light shadow-lg shadow-heart/25">
          <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>

        {/* Badge */}
        <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-text-secondary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          AI-Powered Analysis
        </div>

        {/* Title */}
        <h1 className="mb-4 max-w-2xl font-heading text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
          Analyze Your{" "}
          <span className="text-gradient-heart">Heart Health</span>{" "}
          with AI
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
          Get an instant cardiovascular risk assessment powered by machine
          learning. Answer a few simple questions about your health.
        </p>

        {/* CTA Button */}
        <button
          id="start-analysis-btn"
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-heart to-heart-light px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-heart/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-heart/30 active:scale-100"
        >
          <span className="relative z-10">Start Analysis</span>
          <svg
            className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {/* Hover shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary/60">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Private & Secure
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Instant Results
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            ML-Powered
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-text-secondary/40">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
