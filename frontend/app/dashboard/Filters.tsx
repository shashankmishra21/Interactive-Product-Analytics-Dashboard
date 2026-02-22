export default function Filters({
    ageRange, gender, startDate, endDate,
    onAge, onGender, onStart, onEnd
}: any) {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 mb-6
    flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center">

            <select
                value={ageRange}
                onChange={(e) => onAge(e.target.value)}
                className="input w-full sm:w-auto" >
                <option value="">Age</option>
                <option value="<18">&lt;18</option>
                <option value="18-40">18-40</option>
                <option value=">40">&gt;40</option>
            </select>

            <select
                value={gender}
                onChange={(e) => onGender(e.target.value)}
                className="input w-full sm:w-auto" >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>

            <input
                type="date"
                value={startDate}
                onChange={(e) => onStart(e.target.value)}
                className="input w-full sm:w-auto" />

            <input
                type="date"
                value={endDate}
                onChange={(e) => onEnd(e.target.value)}
                className="input w-full sm:w-auto" />

            <div className="text-sm text-gray-700 font-medium w-full sm:w-auto">
                Data seeded across all age groups, genders & months
                <br />
                Filters auto-saved via cookies
            </div>
        </div>
    );
}