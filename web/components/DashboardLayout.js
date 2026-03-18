import Link from "next/link";
import { Home, User, Clock, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h1 className="text-2xl font-bold text-green-600 mb-8">
          TrashVerse
        </h1>

        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <Home size={18} /> Dashboard
          </Link>

          <Link href="/dashboard/history" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <Clock size={18} /> History
          </Link>

          <Link href="/dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
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