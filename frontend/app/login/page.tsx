"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const res = await axios.post("http://localhost:5000/login", {
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
        <div className="flex items-center justify-center h-screen bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-80 border border-slate-800">
                <h1 className="text-2xl font-bold mb-4 text-center text-white">
                    Analytics Login
                </h1>

                <input
                    className="w-full p-2 mb-3 rounded bg-slate-800 text-white outline-none"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    type="password"
                    className="w-full p-2 mb-4 rounded bg-slate-800 text-white outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white disabled:opacity-50">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}