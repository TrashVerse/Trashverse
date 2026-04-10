import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Calendar,
  Trash2,
  DollarSign,
  MapPin,
  Gift,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { authService } from '../services/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const adminMenuItems = [
    { path: '/admin', icon: BarChart3, label: 'Overview' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/pickups', icon: Calendar, label: 'Pickups' },
    { path: '/admin/waste', icon: Trash2, label: 'Waste Entries' },
    { path: '/admin/transactions', icon: DollarSign, label: 'Transactions' },
    { path: '/admin/stations', icon: MapPin, label: 'Stations' },
    { path: '/admin/rewards', icon: Gift, label: 'Rewards' },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Admin Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed lg:static
        inset-y-0 left-0
        z-50 lg:z-auto
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
        bg-gradient-to-b from-green-700 to-green-900 text-white shadow-lg
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-green-600">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="TrashVerse" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">TrashVerse</h1>
                <p className="text-xs text-green-200">Admin Panel</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <img src="/images/logo.png" alt="TrashVerse" className="w-10 h-10 mx-auto" />
          )}
          
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-green-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center py-2 hover:bg-green-600 border-b border-green-600"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-green-600 text-white font-medium'
                        : 'text-green-100 hover:bg-green-600 hover:text-white'
                    }`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <Icon size={20} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-green-600 px-3 py-4">
          <button
            onClick={handleLogout}
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg text-red-300 hover:bg-red-600 hover:text-white w-full transition`}
            title={sidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="TrashVerse" className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold text-green-600">TrashVerse</h1>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
