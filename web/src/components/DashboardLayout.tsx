import { ReactNode, useState, useEffect } from 'react';
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
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { authService } from '../services/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const adminStatus = await authService.isAdmin();
      setIsAdmin(adminStatus);
    } catch (error) {
      setIsAdmin(false);
    }
  };

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
    { path: '/withdraw', icon: DollarSign, label: 'Withdraw' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/stations', icon: MapPin, label: 'Stations' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  if (isAdmin) {
    menuItems.push({ path: '/admin', icon: Settings, label: 'Admin' });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar - Desktop: always visible, part of layout. Mobile: overlay */}
      <aside className={`
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed lg:static
        inset-y-0 left-0
        z-50 lg:z-auto
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
        bg-white shadow-lg
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-6 border-b">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Trashverse" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-green-600">Trashverse</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <img src="/images/logo.png" alt="Trashverse" className="w-10 h-10 mx-auto" />
          )}
          
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center py-2 hover:bg-gray-50 border-b"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

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
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-green-50 text-green-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
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
        <div className="border-t px-3 py-4">
          <button
            onClick={handleLogout}
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition`}
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
            <img src="/images/logo.png" alt="Trashverse" className="w-8 h-8" />
            <h1 className="text-lg font-bold text-green-600">Trashverse</h1>
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
