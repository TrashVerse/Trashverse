import React, { useState, useEffect } from 'react';
import { Truck, Clock, Calendar, Food, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const trashTypes = [
  { name: 'Can Trash', price: '₦500/kg', color: 'bg-emerald-500', img: '/images/canT.jpg'},
  { name: 'Paper Trash', price: '₦300/kg', color: 'bg-orange-500', img: '/images/paperT.jpg'},
  { name: 'Glass Trash', price: '₦200/kg', color: 'bg-blue-500', img: '/images/glassT.jpg'},
  { name: 'Organic Trash', price: '₦100/kg', color: 'bg-lime-500', img: '/images/organicT.jpg'},
];

export default function TrashverseDashboard() {
  const [activeTab, setActiveTab] = useState('pickup');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [trashType, setTrashType] = useState('');

  // set yesterday as default
  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const navItems = [
    { icon: Truck, label: 'Pickup', key: 'pickup' },
    { icon: Clock, label: 'History', key: 'history' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="bg-emerald-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" width={40} height={40} alt="TrashVerse Logo" />
          <div>
            <h1 className="font-bold text-2xl">Trashverse</h1>
            <p className="text-xs opacity-75">Smart Waste Collection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Profile */}
          <Link 
            href="/dashboard/profile"
            className="hidden md:flex items-center gap-3 bg-white/10 px-5 py-2 rounded-3xl hover:bg-white/20 transition"
          >
            <span className="text-sm">Hi, Wisdom</span>
            <div className="w-9 h-9 bg-white text-emerald-700 rounded-full flex items-center justify-center font-bold">
              W
            </div>
          </Link>

          {/* Mobile Avatar */}
          <Link href="/dashboard/profile" className="md:hidden">
            <div className="w-9 h-9 bg-white text-emerald-700 rounded-full flex items-center justify-center font-bold">
              W
            </div>
          </Link>
        </div>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden md:block w-72 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-16">
          <nav className="p-6 space-y-2">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(item.key)}
                className={`flex w-full items-center gap-4 px-6 py-4 rounded-2xl ${
                  activeTab === item.key
                    ? 'bg-emerald-600 text-white'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Total Earnings */}
          <div className="absolute bottom-8 left-6 right-6 p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
            <div className="text-zinc-400 text-sm">Total Earnings</div>
            <div className="text-3xl font-bold text-emerald-400 mt-2">₦0</div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-2xl mx-auto">

            {activeTab === 'pickup' && (
              <>
                <h2 className="text-2xl font-bold mb-6">Welcome back</h2>

                {/* Pickup Count */}
                <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
                  <div className="flex items-center gap-4">
                    <Truck className="text-emerald-500" />
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-zinc-400">Pickups</div>
                    </div>
                  </div>
                </div>

                {/* Schedule Pickup */}
                <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex gap-2 items-center">
                    <Calendar /> Schedule Pickup
                  </h3>

                  <div className="grid gap-4">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-zinc-800 p-3 rounded-xl"
                    />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="bg-zinc-800 p-3 rounded-xl"
                    />
                    <select
                      value={trashType}
                      onChange={(e) => setTrashType(e.target.value)}
                      className="bg-zinc-800 p-3 rounded-xl"
                    >
                      <option value="">Select Trash Type</option>
                      {trashTypes.map((t, i) => (
                        <option key={i}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <button className="mt-4 w-full bg-emerald-600 py-3 rounded-xl">
                    Confirm Pickup
                  </button>
                </div>

                {/* Trash Pricing */}
                <div className="bg-zinc-900 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-4">Trash Pricing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {trashTypes.map((t, i) => (
                      <div key={i} className="bg-zinc-800 p-4 rounded-xl flex flex-col items-center">
                        <Image src={t.img} alt={t.name} width={150} height={100} />
                        <div className="mt-2 font-semibold">{t.name}</div>
                        <div className="text-emerald-400 font-bold">{t.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'history' && (
              <div className="bg-zinc-900 p-6 rounded-2xl mt-4">
                <h3 className="flex items-center gap-2 mb-4">
                  <Clock className="text-emerald-500" />
                  Pickup History
                </h3>

                <div className="text-center text-zinc-400 py-10">
                  No pickup history yet.
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Mobile Total Earnings */}
      <div className="md:hidden fixed bottom-16 left-4 right-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-center">
        <div className="text-zinc-400 text-sm">Total Earnings</div>
        <div className="text-2xl font-bold text-emerald-400 mt-1">₦0</div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3">
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(item.key)}
            className={activeTab === item.key ? 'text-emerald-500' : 'text-zinc-400'}
          >
            <item.icon />
          </button>
        ))}
      </nav>

    </div>
  );
}