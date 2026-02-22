export default function Sidebar() {
    return (
        <aside className="hidden lg:flex w-64 bg-gradient-to-b from-[#0f4cbd] via-[#1e6de0] to-[#2aa7df]
    text-white p-8 flex-col justify-between shadow-xl">

            <div>
                <h2 className="text-3xl font-semibold tracking-tight">Analytics</h2>

                <div className="mt-8 bg-white/20 px-4 py-2 rounded-lg font-medium">
                    Interactive Dashboard
                </div>
            </div>

            <div className="text-sm text-white/80">Developed by Shashank</div>
        </aside>
    );
}