export default function KpiCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
      <h2 className="text-2xl mt-3 text-gray-900">{value}</h2>
    </div>
  );
}