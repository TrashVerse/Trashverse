# 🚀 Complete Setup Instructions

## Prerequisites Installation

### 1. Install Node.js and npm
**Download:** https://nodejs.org/
- Download the LTS version (recommended)
- Run the installer
- Check "Automatically install necessary tools" during installation
- Restart your computer after installation

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Install Python
**Download:** https://www.python.org/downloads/
- Download Python 3.8 or higher
- ✅ **IMPORTANT**: Check "Add Python to PATH" during installation
- Restart your computer after installation

**Verify Installation:**
```bash
python --version
pip --version
```

---

## Project Setup

### Step 1: Install Frontend Dependencies

```bash
cd TrashVerse
npm install
npm install axios @react-native-async-storage/async-storage
```

### Step 2: Setup Backend

**Windows:**
```bash
cd backend
setup.bat
```

**Mac/Linux:**
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**
```bash
cd backend
pip install -r requirements.txt
python seed_data.py
```

---

## Running the Project

### Terminal 1: Start Backend

```bash
cd TrashVerse/backend
uvicorn app.main:app --reload
```

Backend will run at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

### Terminal 2: Start Frontend

```bash
cd TrashVerse
npm start
```

Then press:
- `w` for **Web** (browser)
- `a` for Android emulator
- `i` for iOS simulator

---

## Test Credentials

```
Username: charles
Password: password123
```

---

## Project Structure

```
TrashVerse/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── routers/        # API endpoints (8 routers, 38 endpoints)
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Request/response schemas
│   │   ├── auth.py         # Authentication utilities
│   │   ├── utils.py        # Helper functions
│   │   ├── firebase.py     # Push notifications
│   │   └── main.py         # App entry point
│   ├── .env                # Environment variables
│   ├── trashverse.db       # SQLite database (created after seed)
│   ├── requirements.txt    # Python dependencies
│   └── seed_data.py        # Database seeding script
│
├── app/                    # React Native Screens
│   ├── (tabs)/
│   │   ├── home.tsx        # ✅ Home screen with real data
│   │   ├── sell.tsx        # ✅ Waste entry form
│   │   └── history.tsx     # ✅ Waste & transaction history
│   ├── login.tsx           # ✅ Login screen
│   ├── register.tsx        # ✅ Register screen
│   ├── onboarding.tsx      # Onboarding flow
│   └── _layout.tsx         # Root layout with AuthProvider
│
├── services/               # API Integration Layer
│   ├── api.ts             # Axios instance
│   ├── auth.ts            # Authentication service
│   ├── waste.ts           # Waste management
│   ├── pickups.ts         # Pickup scheduling
│   ├── stations.ts        # Recycling stations
│   ├── rewards.ts         # Rewards system
│   ├── transactions.ts    # Transactions
│   ├── analytics.ts       # Analytics & dashboard
│   ├── notifications.ts   # Notifications
│   └── upload.ts          # Image uploads
│
├── contexts/              # State Management
│   └── AuthContext.tsx    # Authentication context
│
└── components/            # Reusable UI Components
```

---

## Features Implemented

### ✅ Backend (100%)
- 38 API endpoints
- JWT authentication
- User management
- Waste tracking with automatic earnings
- Pickup scheduling
- Recycling stations with geolocation
- Rewards system
- Transactions & withdrawals
- Analytics & leaderboard
- Notifications (in-app + Firebase push)
- Image upload
- Complete documentation

### ✅ Frontend (100%)
- Complete API integration (10 services)
- Authentication flow (login/register)
- Home screen with real-time data
- Sell/Scan screen for waste entries
- History screen (waste entries & transactions)
- Pull-to-refresh on all screens
- Loading states
- Error handling
- TypeScript support

---

## How to Use the App

### 1. First Time Setup
1. Start backend
2. Start frontend
3. App will redirect to login

### 2. Login
- Enter username: `charles`
- Enter password: `password123`
- Click Login
- You'll see the home screen with real data

### 3. Add Waste Entry
- Go to "Sell" tab
- Select waste type (Plastic, Paper, Metal, etc.)
- Enter weight in kg
- Add optional description
- See estimated earnings
- Click "Submit Entry"
- Earnings and points are added automatically!

### 4. View History
- Go to "History" tab
- Switch between "Waste Entries" and "Transactions"
- Pull down to refresh
- See all your recycling history

### 5. Home Screen
- View total earnings
- View total pickups
- View total waste recycled
- View CO₂ averted
- Pull down to refresh stats

---

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/me` - Update profile

### Waste Management
- POST `/api/waste/entries` - Create waste entry
- GET `/api/waste/entries` - Get entries
- DELETE `/api/waste/entries/{id}` - Delete entry

### Transactions
- GET `/api/transactions/` - Get transactions
- POST `/api/transactions/withdraw` - Withdraw earnings
- GET `/api/transactions/balance` - Get balance

### Analytics
- GET `/api/analytics/dashboard` - Dashboard stats
- GET `/api/analytics/stats` - Detailed stats
- GET `/api/analytics/leaderboard` - Top users

[See backend/README.md for complete API documentation]

---

## Pricing & Points

### Per Kilogram
- Plastic: ₦50 (10 points, 2.5kg CO₂)
- Paper: ₦30 (8 points, 1.8kg CO₂)
- Metal: ₦80 (15 points, 3.2kg CO₂)
- Electronics: ₦150 (25 points, 4.0kg CO₂)
- Glass: ₦40 (10 points, 0.5kg CO₂)
- Organic: ₦20 (5 points, 0.3kg CO₂)
- Textile: ₦35 (8 points, 1.5kg CO₂)

---

## Troubleshooting

### Node.js/npm not found
- Install Node.js from nodejs.org
- Restart terminal/computer
- Verify: `node --version`

### Python not found
- Install Python from python.org
- Check "Add Python to PATH"
- Restart terminal/computer
- Verify: `python --version`

### Backend won't start
```bash
cd backend
pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
```

### Frontend won't start
```bash
cd TrashVerse
npm install
npm start
```

### Can't login
- Check backend is running at http://localhost:8000
- Use credentials: `charles` / `password123`
- Check browser console for errors

### Database errors
```bash
cd backend
rm trashverse.db
python seed_data.py
```

---

## Next Steps

### Completed ✅
- Backend API (100%)
- API Integration (100%)
- Authentication (100%)
- Home Screen (100%)
- Sell Screen (100%)
- History Screen (100%)

### Optional Enhancements
- Rewards screen
- Profile screen
- Notifications screen
- Pickup scheduling UI
- Recycling station map
- Image upload for waste entries
- Payment gateway integration
- AI waste identification

---

## Documentation

- **README.md** - Main documentation
- **QUICK_START.md** - Quick start guide
- **INTEGRATION_COMPLETE.md** - Integration details
- **FINAL_STATUS.md** - Project status
- **backend/SETUP.md** - Backend setup
- **backend/README.md** - API documentation

---

## Support

### Test Credentials
```
Username: charles
Password: password123
```

### API Documentation
http://localhost:8000/docs

### Backend
http://localhost:8000

### Frontend
http://localhost:19006 (web)

---

## 🎉 You're All Set!

Once you have Node.js and Python installed:
1. Run backend: `cd backend && uvicorn app.main:app --reload`
2. Run frontend: `cd TrashVerse && npm start`
3. Press `w` for web browser
4. Login and start recycling!

**The app is fully functional and ready to use!**
