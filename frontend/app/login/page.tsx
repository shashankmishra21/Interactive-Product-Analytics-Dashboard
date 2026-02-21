"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await axios.post("http://localhost:5000/login", {
            username,
            password,
        });

        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-80">
                <h1 className="text-2xl font-bold mb-4 text-center">Analytics Login</h1>

                <input
                    className="w-full p-2 mb-3 rounded bg-slate-800"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    type="password"
                    className="w-full p-2 mb-4 rounded bg-slate-800"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded" >Login</button>
            </div>
        </div>
    );
}