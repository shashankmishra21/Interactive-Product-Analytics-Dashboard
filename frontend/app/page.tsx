"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-5xl font-bold mb-4">
          Interactive Product Analytics
        </h1>

        <p className="text-slate-400 max-w-xl mb-6">
          Understand feature usage, track user interactions, and visualize
          analytics through powerful interactive charts and smart filtering.
        </p>

        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Go to Login
        </Link>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-10 py-12 text-center">
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Track Interactions</h3>
          <p className="text-slate-400 text-sm">
            Every filter and chart click is captured and analyzed to understand
            product usage.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Smart Analytics</h3>
          <p className="text-slate-400 text-sm">
            Visualize feature usage and trends through interactive bar and line
            charts.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Advanced Filters</h3>
          <p className="text-slate-400 text-sm">
            Slice data by date, age, and gender to gain deeper product insights.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-center py-4 text-slate-400 text-sm">
        Built for Full Stack Engineering Challenge • Vigility Technologies
      </footer>
    </div>
  );
}