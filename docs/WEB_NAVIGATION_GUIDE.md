# Web Application Navigation Guide

## 🌐 Web Server Status

✅ **Server Running:** http://localhost:3001/
✅ **All Routes Configured**
✅ **Dashboard Updated with All Features**

---

## 🎯 How to Access All Features

### Step 1: Login
1. Go to http://localhost:3001/login
2. Login with your credentials
3. You'll be redirected to the Dashboard

### Step 2: Dashboard - All Features Available

The Dashboard now has **8 Quick Action buttons** in a 2x4 grid:

#### Row 1:
1. **Submit Waste** → `/waste-entry`
   - Submit new waste entries
   - Calculate earnings
   - Track waste types

2. **Pickups** → `/pickups`
   - Schedule new pickups
   - View scheduled pickups
   - Update/cancel pickups

3. **Rewards** → `/rewards`
   - Browse available rewards
   - Redeem with points
   - View redemption history

4. **Stations** → `/stations`
   - Find recycling stations
   - View station details
   - Get directions

#### Row 2:
5. **Notifications** → `/notifications`
   - View all notifications
   - Mark as read
   - Delete notifications

6. **Leaderboard** → `/leaderboard`
   - View top recyclers
   - See rankings
   - Compare stats

7. **Analytics** → `/analytics`
   - Detailed statistics
   - Monthly breakdown
   - Waste type analysis

8. **Profile** → `/profile`
   - View/edit profile
   - Update settings
   - Manage account

---

## 📍 Direct URLs (All Features)

### Authentication
- **Home:** http://localhost:3001/
- **Login:** http://localhost:3001/login
- **Signup:** http://localhost:3001/signup
- **Forgot Password:** http://localhost:3001/forgot-password

### Main Features
- **Dashboard:** http://localhost:3001/dashboard
- **Waste Entry:** http://localhost:3001/waste-entry
- **Pickups:** http://localhost:3001/pickups
- **Rewards:** http://localhost:3001/rewards
- **Notifications:** http://localhost:3001/notifications
- **Profile:** http://localhost:3001/profile
- **Stations:** http://localhost:3001/stations
- **Leaderboard:** http://localhost:3001/leaderboard
- **Analytics:** http://localhost:3001/analytics
- **Transactions:** http://localhost:3001/transactions

### Marketing Pages
- **Blog:** http://localhost:3001/blog
- **Careers:** http://localhost:3001/careers
- **Privacy Policy:** http://localhost:3001/privacy-policy

---

## 🎨 Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│                    TrashVerse Dashboard                  │
│                                              [Logout]    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ Earnings │  │ Pickups  │  │  Waste   │  │  Points  ││
│  │  ₦0.00   │  │    0     │  │  0.0 kg  │  │    0     ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │   Quick Actions     │  │  Recent Transactions    │  │
│  ├─────────────────────┤  ├─────────────────────────┤  │
│  │ [Submit Waste]      │  │  • Transaction 1        │  │
│  │ [Pickups]           │  │  • Transaction 2        │  │
│  │ [Rewards]           │  │  • Transaction 3        │  │
│  │ [Stations]          │  │  • Transaction 4        │  │
│  │ [Notifications]     │  │  • Transaction 5        │  │
│  │ [Leaderboard]       │  │                         │  │
│  │ [Analytics]         │  │                         │  │
│  │ [Profile]           │  │                         │  │
│  └─────────────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│              Upcoming Pickups (if any)                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Feature Details

### 1. Waste Entry (`/waste-entry`)
**What you can do:**
- Submit new waste entries
- Select waste type (plastic, paper, metal, etc.)
- Enter weight
- Add description
- See earnings preview
- Upload images (future)

### 2. Pickups (`/pickups`)
**What you can do:**
- Schedule new pickups
- View all scheduled pickups
- Filter by status (pending, scheduled, completed)
- Update pickup details
- Cancel pickups
- See pickup history

### 3. Rewards (`/rewards`)
**What you can do:**
- Browse available rewards
- View points required
- Check stock availability
- Redeem rewards with points
- See reward details
- Track redemption history

### 4. Stations (`/stations`)
**What you can do:**
- View all recycling stations
- Find nearest station (with location)
- See station details (address, phone, hours)
- View accepted waste types
- Get directions
- Call station directly

### 5. Notifications (`/notifications`)
**What you can do:**
- View all notifications
- Filter (all/unread)
- Mark individual as read
- Mark all as read
- Delete notifications
- See notification history

### 6. Leaderboard (`/leaderboard`)
**What you can do:**
- View top 20 recyclers
- See rankings (🥇🥈🥉)
- Compare waste recycled
- View CO₂ impact
- See points earned
- Track your position

### 7. Analytics (`/analytics`)
**What you can do:**
- View detailed statistics
- See monthly breakdown
- Analyze waste by type
- Track earnings over time
- View CO₂ impact
- Export data (future)

### 8. Profile (`/profile`)
**What you can do:**
- View profile information
- Edit personal details
- Update contact info
- Change password (future)
- Upload profile picture (future)
- Manage preferences

### 9. Transactions (`/transactions`)
**What you can do:**
- View all transactions
- See transaction history
- Check balance
- Filter by type
- Withdraw earnings (future)
- Download statements (future)

---

## 🎨 Color Coding

Each feature has a unique color for easy identification:

- **Submit Waste:** Green (#10B981)
- **Pickups:** Blue (#3B82F6)
- **Rewards:** Purple (#9333EA)
- **Stations:** Emerald (#10B981)
- **Notifications:** Orange (#F97316)
- **Leaderboard:** Yellow (#EAB308)
- **Analytics:** Indigo (#6366F1)
- **Profile:** Pink (#EC4899)

---

## 🚀 Quick Start Guide

### For First-Time Users:

1. **Register Account**
   - Go to http://localhost:3001/signup
   - Fill in details
   - Create account

2. **Login**
   - Go to http://localhost:3001/login
   - Enter credentials
   - Access dashboard

3. **Submit First Waste Entry**
   - Click "Submit Waste" on dashboard
   - Select waste type
   - Enter weight
   - Submit

4. **Schedule Pickup**
   - Click "Pickups" on dashboard
   - Fill pickup form
   - Schedule

5. **Explore Features**
   - Browse rewards
   - Check leaderboard
   - View analytics
   - Update profile

---

## 🔧 Troubleshooting

### Can't see features on dashboard?
- **Solution:** Refresh the page (Ctrl+R or Cmd+R)
- The dashboard was just updated with all 8 feature buttons

### Features not loading?
- **Check:** Backend server is running (port 8000)
- **Check:** You're logged in
- **Check:** Network connection

### Getting 404 errors?
- **Check:** Web server is running on port 3001
- **Check:** URL is correct
- **Try:** http://localhost:3001/dashboard

### Buttons not working?
- **Check:** JavaScript is enabled
- **Try:** Clear browser cache
- **Try:** Different browser

---

## 📱 Mobile vs Web

### Features Available on Both:
✅ All 11 core features
✅ Same API backend
✅ Same data
✅ Real-time sync

### Web-Specific:
- Larger screen layout
- Keyboard shortcuts
- Desktop notifications (future)
- Multi-tab support

### Mobile-Specific:
- Touch gestures
- Camera integration
- GPS location
- Push notifications
- Offline mode (future)

---

## 🎯 Testing Checklist

After logging in, verify you can access:

- [ ] Dashboard with 8 quick action buttons
- [ ] Submit Waste Entry page
- [ ] Pickups page
- [ ] Rewards page
- [ ] Stations page
- [ ] Notifications page
- [ ] Leaderboard page
- [ ] Analytics page
- [ ] Profile page
- [ ] Transactions page

---

## 📊 Current Status

✅ **Web Server:** Running on http://localhost:3001/
✅ **Mobile Server:** Running on http://localhost:8081/
✅ **Backend API:** Should be running on http://localhost:8000/
✅ **All Routes:** Configured
✅ **Dashboard:** Updated with all features
✅ **Navigation:** Complete

---

## 🆘 Need Help?

### Common Issues:

**Q: I don't see the new buttons on dashboard**
A: Hard refresh the page (Ctrl+Shift+R)

**Q: Features return 401 errors**
A: You need to login first at /login

**Q: Backend API not responding**
A: Start backend server: `cd backend && python run.py`

**Q: Can't find a specific feature**
A: All features are accessible from the dashboard quick actions

---

## 📞 Server Information

### Web Application
- **URL:** http://localhost:3001/
- **Port:** 3001
- **Status:** ✅ Running
- **Framework:** Vite + React

### Mobile Application
- **URL:** http://localhost:8081/
- **Port:** 8081
- **Status:** ✅ Running
- **Framework:** Expo + React Native

### Backend API
- **URL:** http://localhost:8000/
- **Port:** 8000
- **Status:** ⏳ Check if running
- **Framework:** FastAPI + Python

---

**Last Updated:** March 1, 2026
**Web Server:** http://localhost:3001/
**All Features:** ✅ Available on Dashboard
