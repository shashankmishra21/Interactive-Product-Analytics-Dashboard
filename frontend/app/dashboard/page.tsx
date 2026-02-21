"use client";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product Analytics Dashboard</h1>

      {/* Filters */}
      <div className="bg-slate-900 p-4 rounded-xl mb-6">
        <h2 className="mb-2 font-semibold">Filters</h2>
        <div className="flex gap-4">
          <select className="bg-slate-800 p-2 rounded">
            <option>Age</option>
            <option>&lt;18</option>
            <option>18-40</option>
            <option>&gt;40</option>
          </select>

          <select className="bg-slate-800 p-2 rounded">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900 p-4 rounded-xl h-80">
          Bar Chart here
        </div>

        <div className="bg-slate-900 p-4 rounded-xl h-80">
          Line Chart here
        </div>
      </div>
    </div>
  );
}  