import { useState } from 'react';
import { LayoutDashboard, Trash2, Calendar, Gift, Bell, User, MapPin, Trophy, BarChart3, History, DollarSign } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Dashboard from '../Dashboard';
import WasteEntry from '../WasteEntry';
import Transactions from '../Transactions';
import Pickups from '../Pickups';
import Rewards from '../Rewards';
import Notifications from '../Notifications';
import Profile from '../Profile';
import Stations from '../Stations';
import Leaderboard from '../Leaderboard';
import Analytics from '../Analytics';
import Withdraw from '../Withdraw';

type UserTabType = 'dashboard' | 'waste-entry' | 'transactions' | 'pickups' | 'rewards' | 'withdraw' | 'notifications' | 'profile' | 'stations' | 'leaderboard' | 'analytics';

export default function UserFunctions() {
  const [activeTab, setActiveTab] = useState<UserTabType>('dashboard');

  const userTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'waste-entry', label: 'Waste Entry', icon: Trash2 },
    { id: 'transactions', label: 'History', icon: History },
    { id: 'pickups', label: 'Pickups', icon: Calendar },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'withdraw', label: 'Withdraw', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'stations', label: 'Stations', icon: MapPin },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    // Remove the DashboardLayout wrapper from each component's content
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'waste-entry':
        return <WasteEntry />;
      case 'transactions':
        return <Transactions />;
      case 'pickups':
        return <Pickups />;
      case 'rewards':
        return <Rewards />;
      case 'withdraw':
        return <Withdraw />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'stations':
        return <Stations />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Functions</h1>
        <p className="text-gray-600 mb-8">View and test user-facing features from the admin perspective</p>

        {/* Horizontal Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {userTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as UserTabType)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </AdminLayout>
  );
}
