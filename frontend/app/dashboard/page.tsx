"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";

type BarItem = {
    name: string;
    count: number;
};

type LineItem = {
    date: string;
    count: number;
};

export default function Dashboard() {
    const [barData, setBarData] = useState<BarItem[]>([]);
    const [lineData, setLineData] = useState<LineItem[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    const [gender, setGender] = useState(Cookies.get("gender") || "");
    const [ageRange, setAgeRange] = useState(Cookies.get("ageRange") || "");
    const [startDate, setStartDate] = useState(Cookies.get("startDate") || "");
    const [endDate, setEndDate] = useState(Cookies.get("endDate") || "");

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchAnalytics = async () => {
        let minAge: number | undefined;
        let maxAge: number | undefined;

        if (ageRange === "<18") {
            minAge = 0;
            maxAge = 17;
        } else if (ageRange === "18-40") {
            minAge = 18;
            maxAge = 40;
        } else if (ageRange === ">40") {
            minAge = 41;
            maxAge = 100;
        }

        if (startDate && endDate && startDate > endDate) {
            alert("Start date must be before End date");
            return;
        }
        const res = await axios.get("http://localhost:5000/analytics", {
            params: { gender, minAge, maxAge, start: startDate, end: endDate },
        });

        const bar: BarItem[] = Object.entries(res.data.barChart).map(
            ([name, count]) => ({
                name,
                count: Number(count),
            })
        );

        const line: LineItem[] = Object.entries(res.data.lineChart).map(
            ([date, count]) => ({
                date,
                count: Number(count),
            })
        );

        setBarData(bar);
        setLineData(line);
    };

    useEffect(() => {
        fetchAnalytics();
    }, [gender, ageRange, startDate, endDate]);

    const track = async (featureName: string) => {
        if (!token) return;
        await axios.post(
            "http://localhost:5000/track",
            { featureName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    };

    const handleGenderChange = (value: string) => {
        setGender(value);
        Cookies.set("gender", value);
        track("gender_filter");
    };

    const handleAgeChange = (value: string) => {
        setAgeRange(value);
        Cookies.set("ageRange", value);
        track("age_filter");
    };

    const handleStartDate = (value: string) => {
        setStartDate(value);
        Cookies.set("startDate", value);
        track("date_filter");
    };

    const handleEndDate = (value: string) => {
        setEndDate(value);
        Cookies.set("endDate", value);
        track("date_filter");
    };


    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Product Analytics Dashboard</h1>

            {/* Filters */}
            <div className="bg-slate-900 p-4 rounded-xl mb-6 flex flex-wrap gap-4">
                <select
                    value={ageRange}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    className="bg-slate-800 p-2 rounded"
                >
                    <option value="">Age</option>
                    <option value="<18">&lt;18</option>
                    <option value="18-40">18-40</option>
                    <option value=">40">&gt;40</option>
                </select>

                <select
                    value={gender}
                    onChange={(e) => handleGenderChange(e.target.value)}
                    className="bg-slate-800 p-2 rounded"
                >
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDate(e.target.value)}
                    className="bg-slate-800 p-2 rounded"
                />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleEndDate(e.target.value)}
                    className="bg-slate-800 p-2 rounded"
                />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-slate-900 p-4 rounded-xl h-[350px] flex flex-col">
                    <h2 className="mb-2 font-semibold">Feature Usage</h2>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="name" stroke="#aaa" />
                                <YAxis stroke="#aaa" />
                                <Tooltip />
                                <Bar
                                    dataKey="count"
                                    fill="#3b82f6"
                                    onClick={(data: any) => {
                                        if (!data?.name) return;
                                        setSelectedFeature(data.name);
                                        track(data.name);
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* line chart */}
                <div className="bg-slate-900 p-4 rounded-xl h-[350px] flex flex-col">
                    <h2 className="mb-2 font-semibold">
                        {selectedFeature ? `Trend for ${selectedFeature}` : "Overall Trend"}
                    </h2>

                    <div className="flex-1">
                        {lineData.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                No data available for selected filters
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="date" stroke="#aaa" />
                                    <YAxis stroke="#aaa" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}