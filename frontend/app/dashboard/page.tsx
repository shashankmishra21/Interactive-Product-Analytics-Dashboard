"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

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
    const [selectedFeature, setSelectedFeature] = useState(null);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchAnalytics = async () => {
        const res = await axios.get("http://localhost:5000/analytics");
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
    }, []);

    const track = async (featureName: string) => {
        if (!token) return;
        await axios.post(
            "http://localhost:5000/track",
            { featureName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Product Analytics Dashboard</h1>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Bar Chart */}
                <div className="bg-slate-900 p-4 rounded-xl">
                    <h2 className="mb-2 font-semibold">Feature Usage</h2>
                    <BarChart width={400} height={250} data={barData}>
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
                </div>

                {/* Line Chart */}
                <div className="bg-slate-900 p-4 rounded-xl">
                    <h2 className="mb-2 font-semibold">
                        {selectedFeature
                            ? `Trend for ${selectedFeature}`
                            : "Overall Trend"}
                    </h2>

                    <LineChart width={400} height={250} data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="date" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#10b981" />
                    </LineChart>
                </div>
            </div>
        </div>
    );
}