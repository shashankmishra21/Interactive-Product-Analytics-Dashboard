"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                username: username.trim(),
                password: password.trim(),
            });

            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } catch (err: any) {
            if (err.response?.status === 401) {
                alert("Invalid username or password");
            } else {
                alert("Server error. Make sure backend is running.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 bg-gradient-to-br from-[#020617] via-[#040b1f] to-[#060b1a] text-white">
            <div className="absolute inset-0 -z-10">
                {/* Indigo Glow */}
                <div className="absolute top-[-140px] left-[-120px] w-[520px] h-[520px]
          bg-indigo-500/25 blur-[180px] rounded-full" />

                <div className="absolute bottom-[-160px] right-[-120px] w-[540px] h-[540px]
          bg-blue-600/25 blur-[190px] rounded-full" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.35),transparent_70%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="
        relative z-10 w-[380px] p-8 rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/10
        shadow-[0_25px_80px_rgba(0,0,0,0.65)]" >

                {/* Title */}
                <h1 className="text-2xl font-semibold text-center text-white mb-1">
                    Welcome You're Missed
                </h1>

                <p className="text-center text-slate-400 text-sm mb-6">
                    Login to your InsightLoop dashboard
                </p>

                {/* Username */}
                <input className="
          w-full mb-4 px-4 py-3 rounded-lg
          bg-white/[0.04] border border-white/10
          text-white placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                {/* Password */}
                <input type="password"
                    className=" w-full mb-6 px-4 py-3 
                rounded-lg bg-white/[0.04] border border-white/10
                text-white placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-3 rounded-lg
          bg-gradient-to-r from-indigo-600 to-blue-600
          hover:from-indigo-500 hover:to-blue-500
          text-white font-semibold

          shadow-[0_10px_30px_rgba(79,70,229,0.45)]
          hover:shadow-[0_15px_45px_rgba(79,70,229,0.55)]
          hover:scale-[1.02]

          transition-all duration-300
          disabled:opacity-60" >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* footer */}
                <p className="text-xs text-center text-slate-500 mt-6">
                    © {new Date().getFullYear()} InsightLoop
                </p>
            </motion.div>
        </div>
    );
}