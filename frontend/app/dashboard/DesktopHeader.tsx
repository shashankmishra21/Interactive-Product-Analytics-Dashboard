export default function DesktopHeader({ onLogout }: { onLogout: () => void }) {
    return (
        <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Product Analytics Dashboard
            </h1>

            <button onClick={onLogout}
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600
        text-white px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm font-medium" >
                Logout
            </button>
        </div>
    );
}