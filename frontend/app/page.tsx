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
    <div className="relative min-h-screen transition-colors duration-500 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:bg-[#060b1a] dark:bg-none text-slate-900 dark:text-white overflow-hidden">

      {/* Bg Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[-120px] w-[550px] h-[550px] 
                        bg-indigo-300/30 dark:bg-indigo-500/25 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-180px] right-[-120px] w-[550px] h-[550px] 
                        bg-blue-300/30 dark:bg-blue-600/25 blur-[180px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4">
        <h1 className="text-lg font-semibold tracking-tight">InsightLoop</h1>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition" >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg 
                       bg-slate-900 text-white 
                       dark:bg-white dark:text-[#060b1a]
                       text-sm font-medium shadow-lg transition" >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-5 items-center px-10 md:px-20 py-12 max-w-[1200px] mx-auto">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight 
             bg-gradient-to-b 
                         from-slate-900 to-slate-700
                         dark:from-[#dbeafe] dark:to-[#93c5fd] 
                         bg-clip-text text-transparent">
            Turning User Interactions into<br />
            Actionable Insights
          </h1>

          <p className="mt-6 text-slate-600 dark:text-blue-100/70 text-[17px] max-w-lg leading-relaxed">
            InsightLoop turns product interactions into clear, actionable analytics.
            Monitor feature usage, explore trends, and understand user behavior effortlessly.
          </p>

          <div className="mt-10 flex">
            <Link
              href="/login"
              className="px-7 py-3 rounded-lg 
                         bg-slate-900 text-white 
                         dark:bg-white dark:text-[#060b1a]
                         text-sm font-semibold shadow-lg
                         hover:scale-[1.03] transition-all duration-200" >
              Get started
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="absolute w-[1250px] h-[1250px] 
                          bg-blue-200/30 dark:bg-blue-500/20 
                          blur-[200px] rounded-full" />

          <motion.img
            src="/analytics.png"
            alt="Analytics"
            className="relative w-[900px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10 mt-16 py-8 text-center text-sm text-slate-800 dark:text-slate-300">
        © {new Date().getFullYear()} InsightLoop — Interactive Product Analytics Dashboard
        <br /> Developed by Shashank
      </footer>
    </div>
  );
}