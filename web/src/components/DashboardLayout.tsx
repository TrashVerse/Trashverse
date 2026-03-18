import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Trash2,
  Calendar,
  Gift,
  Bell,
  User,
  MapPin,
  Trophy,
  BarChart3,
  History,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { authService } from '../services/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/waste-entry', icon: Trash2, label: 'Waste Entry' },
    { path: '/transactions', icon: History, label: 'History' },
    { path: '/pickups', icon: Calendar, label: 'Pickups' },
    { path: '/rewards', icon: Gift, label: 'Rewards' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/stations', icon: MapPin, label: 'Stations' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="TrashVerse" className="w-8 h-8" />
            <h1 className="text-lg font-bold text-green-600">TrashVerse</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center space-x-2 px-6 py-6 border-b">
            <img src="/images/logo.png" alt="TrashVerse" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-green-600">TrashVerse</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? 'bg-green-50 text-green-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t px-3 py-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
