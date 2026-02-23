export default function Filters({ ageRange, gender, startDate, endDate, onAge, onGender, onStart, onEnd }: any) {

    return (
        <div
            className="
      bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 mb-6
      grid grid-cols-1 gap-4
      sm:grid-cols-2
      md:grid-cols-5
      items-end
    "
        >
            {/* Age */}
            <div className="flex flex-col w-full">
                <label className="text-xs text-gray-500 mb-1">Age</label>
                <select
                    value={ageRange}
                    onChange={(e) => onAge(e.target.value)}
                    className="input w-full min-w-[120px]"
                >
                    <option value="">All</option>
                    <option value="<18">&lt;18</option>
                    <option value="18-40">18-40</option>
                    <option value=">40">&gt;40</option>
                </select>
            </div>

            {/* Gender */}
            <div className="flex flex-col w-full">
                <label className="text-xs text-gray-500 mb-1">Gender</label>
                <select
                    value={gender}
                    onChange={(e) => onGender(e.target.value)}
                    className="input w-full min-w-[120px]"
                >
                    <option value="">All</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>

            {/* Start Date */}
            <div className="flex flex-col w-full">
                <label className="text-xs text-gray-500 mb-1">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStart(e.target.value)}
                    className="input w-full min-w-[150px]"
                />
            </div>

            {/* End Date */}
            <div className="flex flex-col w-full">
                <label className="text-xs text-gray-500 mb-1">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEnd(e.target.value)}
                    className="input w-full min-w-[150px]"
                />
            </div>

            {/* Info */}
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Filters auto-saved via cookies
            </div>
        </div>
    );
}