"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const html = document.documentElement;

    if (saved === "dark") {
      html.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-500
      bg-gradient-to-br from-white via-blue-50 to-indigo-100
      dark:bg-[#060b1a] dark:bg-none text-slate-900 dark:text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px]
          md:w-[600px] md:h-[600px]
          bg-indigo-300/30 dark:bg-indigo-500/25 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[420px] h-[420px]
          md:w-[600px] md:h-[600px]
          bg-blue-300/30 dark:bg-blue-600/25 blur-[160px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-5 md:px-10 py-4 max-w-[1200px] mx-auto">
        <h1 className="text-base md:text-lg font-semibold tracking-tight">
          InsightLoop
        </h1>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/login"
            className="px-4 md:px-5 py-2 rounded-lg text-sm font-medium shadow-lg
              bg-slate-900 text-white
              dark:bg-white dark:text-[#060b1a]
              hover:scale-[1.03] transition">
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center
        gap-10 md:gap-6
        px-5 md:px-10 lg:px-20
        py-10 md:py-16
        max-w-[1200px] mx-auto">

        {/* LEFT */}
        <div className="text-center md:text-left">

          <h1 className="font-semibold tracking-tight leading-[1.05]
            text-4xl sm:text-5xl md:text-6xl
            bg-gradient-to-b
            from-slate-900 to-slate-700
            dark:from-[#dbeafe] dark:to-[#93c5fd]
            bg-clip-text text-transparent">

            Turning User Interactions into
            <br className="hidden sm:block" />
            Actionable Insights
          </h1>

          <p className="mt-5 md:mt-6
            text-[15px] sm:text-[16px] md:text-[17px]
            text-slate-600 dark:text-blue-100/70
            max-w-xl mx-auto md:mx-0 leading-relaxed">

            InsightLoop transforms product interactions into clear,
            actionable analytics. Track feature usage, uncover trends,
            and understand user behavior effortlessly.
          </p>

          {/* CTA */}
          <div className="mt-8 md:mt-10 flex justify-center md:justify-start gap-4">

            <Link
              href="/login"
              className="px-6 md:px-7 py-3 rounded-lg text-sm font-semibold shadow-lg
                bg-slate-900 text-white
                dark:bg-white dark:text-[#060b1a]
                hover:scale-[1.04] active:scale-[0.98]
                transition-all duration-200">
              Get started
            </Link>

            <Link
              href="/demo"
              className="px-6 py-3 rounded-lg text-sm font-medium
                border border-slate-300 dark:border-white/15
                hover:bg-black/5 dark:hover:bg-white/5
                transition">
              Live demo
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center mt-6 md:mt-0">

          <div className="absolute w-[500px] h-[500px]
            md:w-[800px] md:h-[800px]
            bg-blue-200/30 dark:bg-blue-500/20
            blur-[180px] rounded-full" />

          <motion.img
            src="/analytics.png"
            alt="Analytics"
            className="relative
              w-[280px] sm:w-[360px] md:w-[520px] lg:w-[640px]
              object-contain
              drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10
        mt-14 md:mt-20 py-6 text-center
        text-xs sm:text-sm
        text-slate-700 dark:text-slate-400">

        © {new Date().getFullYear()} InsightLoop — Interactive Product Analytics
        <br /> Developed by Shashank
      </footer>
    </div>
  );
}