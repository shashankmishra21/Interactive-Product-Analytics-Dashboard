"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Sidebar from "./sidebar";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import KpiCard from "./KpiCard";
import Filters from "./Filters";
import BarChartCard from "./BarChartCard";
import LineChartCard from "./LineChartCard";

import { BarItem, LineItem } from "./type";

export default function DashboardPage() {
    const [barData, setBarData] = useState<BarItem[]>([]);
    const [lineData, setLineData] = useState<LineItem[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
    const [lastTracked, setLastTracked] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [gender, setGender] = useState(Cookies.get("gender") || "");
    const [ageRange, setAgeRange] = useState(Cookies.get("ageRange") || "");
    const [startDate, setStartDate] = useState(Cookies.get("startDate") || "");
    const [endDate, setEndDate] = useState(Cookies.get("endDate") || "");

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchAnalytics = async () => {
        setLoading(true);

        let minAge: number | undefined;
        let maxAge: number | undefined;

        if (ageRange === "<18") { minAge = 0; maxAge = 17; }
        else if (ageRange === "18-40") { minAge = 18; maxAge = 40; }
        else if (ageRange === ">40") { minAge = 41; maxAge = 100; }

        if (startDate && endDate && startDate > endDate) {
            alert("Start date must be before End date");
            return;
        }

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics`, {
                params: { gender, minAge, maxAge, start: startDate, end: endDate },
            });

            const bar = Object.entries(res.data.barChart).map(([name, count]) => ({
                name,
                count: Number(count),
            }));

            const line = Object.entries(res.data.lineChart).map(([date, count]) => ({
                date,
                count: Number(count),
            }));

            setBarData(bar);
            setLineData(line);
        } catch (err) {
            console.error("Analytics fetch failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) window.location.href = "/login";
    }, []);

    useEffect(() => {
        fetchAnalytics();
    }, [gender, ageRange, startDate, endDate]);

    // Track
    const track = async (featureName: string) => {
        if (!token) return;
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/track`,
            { featureName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setLastTracked(featureName);
    };

    // filte handling
    const handleGenderChange = (v: string) => {
        setGender(v);
        Cookies.set("gender", v);
        track("gender_filter");
    };

    const handleAgeChange = (v: string) => {
        setAgeRange(v);
        Cookies.set("ageRange", v);
        track("age_filter");
    };

    const handleStartDate = (v: string) => {
        setStartDate(v);
        Cookies.set("startDate", v);
        track("date_filter");
    };

    const handleEndDate = (v: string) => {
        setEndDate(v);
        Cookies.set("endDate", v);
        track("date_filter");
    };

    const totalClicks = barData.reduce((a, b) => a + b.count, 0);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };


    return (
        <div className="min-h-screen bg-[#f5f7fb] flex flex-col lg:flex-row overflow-x-hidden">

            <Sidebar />

            <MobileHeader onLogout={logout} />

            <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">

                <DesktopHeader onLogout={logout} />

                {/* KPI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                    <KpiCard title="Total Interactions" value={totalClicks} />
                    <KpiCard
                        title="Top Feature"
                        value={
                            barData.length
                                ? barData.reduce((a, b) => (a.count > b.count ? a : b)).name
                                : "-"} />
                    <KpiCard title="Total Features" value={barData.length} />
                    <KpiCard
                        title="Data Status"
                        value={totalClicks > 0 ? "Seeded / Active" : "No Data"} />
                </div>

                <Filters
                    ageRange={ageRange}
                    gender={gender}
                    startDate={startDate}
                    endDate={endDate}
                    onAge={handleAgeChange}
                    onGender={handleGenderChange}
                    onStart={handleStartDate}
                    onEnd={handleEndDate} />

                {selectedFeature && (
                    <div className="mb-3 text-sm text-indigo-600 font-medium">
                        Showing analytics for: {selectedFeature}
                    </div>
                )}

                {lastTracked && (
                    <div className="text-xs text-gray-500 mb-4">
                        Last interaction tracked: {lastTracked}
                    </div>
                )}

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BarChartCard
                        data={barData}
                        loading={loading}
                        onBarClick={(feature: string) => {
                            setSelectedFeature(feature);
                            track(feature);
                        }} />

                    <LineChartCard
                        data={lineData}
                        loading={loading}
                        title={selectedFeature ? `Trend for ${selectedFeature}` : "Overall Trend"} />
                </div>

                <footer className="border-t border-slate-200 dark:border-white/10 mt-7 py-3 text-center text-sm text-slate-700 dark:text-slate-400">
                    © {new Date().getFullYear()} InsightLoop — Interactive Product Analytics Dashboard
                    <br /> Developed by Shashank
                </footer>
            </div>
        </div>
    );
}