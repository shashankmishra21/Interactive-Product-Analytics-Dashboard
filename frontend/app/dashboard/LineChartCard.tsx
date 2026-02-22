import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function LineChartCard({ data, loading, title }: any) {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border min-h-[320px] md:h-[380px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>

            {loading ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                    Loading analytics...
                </div>
            ) : (
                <div className="w-full h-[260px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}