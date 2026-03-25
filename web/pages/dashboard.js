import React, { useState } from 'react';
import { Truck, Clock, Calendar, Menu, X, Leaf } from 'lucide-react';

const trashTypes = [
  { name: 'Can Trash', price: '₦500/kg', color: 'bg-emerald-500' },
  { name: 'Paper Trash', price: '₦300/kg', color: 'bg-orange-500' },
  { name: 'Glass Trash', price: '₦200/kg', color: 'bg-blue-500' },
  { name: 'Organic Trash', price: '₦100/kg', color: 'bg-lime-500' },
];

export default function TrashverseDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [trashType, setTrashType] = useState('');

  const navItems = [
    { icon: Truck, label: 'Pickup', active: true },
    { icon: Clock, label: 'History' },
    // { icon: BarChart3, label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Header */}
      <header className="bg-emerald-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight">Trashverse</h1>
            <p className="text-xs opacity-75 -mt-1">Smart Waste Collection</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 bg-white/10 px-5 py-2 rounded-3xl">
            <span className="text-sm">Hi, Wisdom</span>
            <div className="w-9 h-9 bg-white text-emerald-700 rounded-full flex items-center justify-center font-bold">U</div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-16 overflow-auto">
          <nav className="p-6 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-medium transition-all ${
                  item.active 
                    ? 'bg-emerald-600 text-white' 
                    : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6 p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
            <div className="text-zinc-400 text-sm">Total Earnings</div>
            <div className="text-4xl font-bold text-emerald-400 mt-2">₦0</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-2xl mx-auto">
            {/* Welcome */}
            <div className="mb-10">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Welcome back, User</h2>
              </div>
              <p className="text-zinc-400 m-auto text-lg">Manage your waste pickups and earnings</p>
            </div>

            {/* Pickups Card */}
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-12 mt-6">
              <div className="flex items-center gap-4">
                <Truck className="w-10 h-10 text-emerald-500" />
                <div>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-zinc-400 mt-1">Pickups</div>
                </div>
              </div>
            </div>

            {/* Schedule Pickup */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 mb-12">
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Calendar className="w-7 h-7 text-emerald-500" />
                Schedule Pickup
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-zinc-400 text-sm mb-3">Pickup Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-3">Pickup Time</label>
                  <input 
                    type="time" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-3">Trash Type</label>
                  <select 
                    value={trashType}
                    onChange={(e) => setTrashType(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select trash type</option>
                    {trashTypes.map((t, i) => (
                      <option key={i} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="mt-10 w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all font-semibold py-5 rounded-3xl text-lg shadow-2xl shadow-emerald-500/30">
                Confirm Pickup
              </button>
            </div>

            {/* Trash Pricing */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-semibold mb-8">Trash Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trashTypes.map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-emerald-500 transition-all group"
                  >
                    <div className={`w-16 h-16 ${item.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`} />
                    <div className="font-semibold text-xl">{item.name}</div>
                    <div className="text-4xl font-bold text-emerald-400 mt-3">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      Mobile Bottom Navigation
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-4 px-6 flex justify-around z-50">
        {navItems.map((item, i) => (
          <a 
            key={i} 
            href="#" 
            className={`flex flex-col items-center gap-1 ${item.active ? 'text-emerald-500' : 'text-zinc-400'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}