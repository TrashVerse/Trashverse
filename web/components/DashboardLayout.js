import Link from "next/link";
import { Home, User, Clock, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">

      {/* SIDEBAR */}
      <aside className="w-80 bg-zinc-950 shadow-md p-5 hidden md:block">
        <h1 className="text-2xl font-bold text-white mb-8 min-h-[40px] flex items-center gap-2 justify-center bg-emerald-600 rounded-lg">
          Trashverse
        </h1>

        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-400">
            <Home size={18} /> Dashboard
          </Link>

          <Link href="/dashboard/profile" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-400">
            <User size={18} /> Profile
          </Link>

          <Link href="/login" className="flex items-center gap-2 text-red-500 mt-10">
            <LogOut size={18} /> Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}