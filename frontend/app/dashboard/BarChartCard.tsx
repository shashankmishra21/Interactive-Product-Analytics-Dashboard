import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function BarChartCard({ data, loading, onBarClick }: any) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    /* Empty State */
    if (!loading && data?.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border min-h-[320px] md:h-[380px] flex items-center justify-center">
                <div className="text-center max-w-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        No Analytics Found
                    </h2>
                    <p className="text-gray-500 text-sm">
                        There is no data available for the selected filters.
                        Try adjusting the date range, age, or gender filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border min-h-[320px] md:h-[380px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Feature Usage
            </h2>


            {loading ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                    Loading analytics...
                </div>
            ) : !mounted ? null : (
                <div className="w-full h-[260px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />

                            <Bar
                                dataKey="count"
                                fill="#6366f1"
                                radius={[6, 6, 0, 0]}
                                onClick={(data) => {
                                    if (!data || !onBarClick) return;
                                    const featureName = data?.payload?.name;
                                    onBarClick(featureName);
                                }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}