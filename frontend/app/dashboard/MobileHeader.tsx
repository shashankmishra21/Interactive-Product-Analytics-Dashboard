export default function MobileHeader({ onLogout }: { onLogout: () => void }) {
    return (
        <div className="md:hidden bg-gradient-to-r from-[#0f4cbd] to-[#2aa7df] text-white p-4 shadow">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold">Analytics</h2>
                    <p className="text-xs opacity-80">Interactive Dashboard</p>
                </div>

                <button
                    onClick={onLogout}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md text-sm font-medium transition" >
                    Logout
                </button>
            </div>
        </div>
    );
}