# 🚀 Manual Setup & Run Instructions

## ✅ Prerequisites Installed
- Node.js: ✅ Installed at C:\Program Files\nodejs
- Python: ✅ Installed (version 3.13.11)

---

## 📋 Quick Start (Easiest Method)

### Option 1: Use the Startup Script

1. **Double-click** `START_PROJECT.bat`
2. Wait for setup to complete
3. Two windows will open (Backend & Frontend)
4. In the Frontend window, press `w` for web browser
5. Login with `charles` / `password123`

---

## 📋 Manual Setup (If Script Doesn't Work)

### Step 1: Open TWO PowerShell/Command Prompt Windows

**Window 1 - Backend:**
```bash
cd "C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\TrashVerse\backend"
python -m pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
```

**Window 2 - Frontend:**
```bash
cd "C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\TrashVerse"
npm install
npm install axios @react-native-async-storage/async-storage
npm start
```

Then press `w` in the frontend window to open in browser.

---

## 📋 Quick Run (After Initial Setup)

### Option 1: Use Quick Start Scripts

**Backend:**
- Double-click `RUN_BACKEND.bat`

**Frontend:**
- Double-click `RUN_FRONTEND.bat`
- Press `w` when prompted

### Option 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm start
```

---

## 🌐 Access the Application

### Backend
- **API Server:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Frontend
- After running `npm start`, press `w`
- Browser will open automatically
- Or visit: http://localhost:19006

---

## 🔑 Login Credentials

```
Username: charles
Password: password123
```

---

## 📱 What You Can Do

### 1. Login
- Use the credentials above
- You'll see the home screen with real data

### 2. View Dashboard
- See your total earnings
- View total pickups
- Check waste recycled
- See CO₂ averted

### 3. Add Waste Entry
- Click "Sell" tab
- Select waste type (Plastic, Paper, Metal, etc.)
- Enter weight in kg
- See estimated earnings
- Submit entry
- Earnings added automatically!

### 4. View History
- Click "History" tab
- Switch between "Waste Entries" and "Transactions"
- Pull down to refresh
- See all your recycling history

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
cd backend
python -m pip install -r requirements.txt
python seed_data.py
```

### Frontend won't start
```bash
npm install
npm install axios @react-native-async-storage/async-storage
```

### Port already in use
**Backend:**
```bash
uvicorn app.main:app --reload --port 8001
```

**Frontend:**
```bash
npm start -- --port 19007
```

### Database errors
```bash
cd backend
del trashverse.db
python seed_data.py
```

---

## 📊 Project Features

### ✅ Implemented
- User authentication (login/register)
- Home dashboard with real-time stats
- Waste entry creation
- Automatic earnings calculation
- Transaction history
- Pull-to-refresh on all screens
- Loading states
- Error handling
- Beautiful UI

### 💰 Pricing (per kg)
- Plastic: ₦50 (10 points)
- Paper: ₦30 (8 points)
- Metal: ₦80 (15 points)
- Electronics: ₦150 (25 points)
- Glass: ₦40 (10 points)
- Organic: ₦20 (5 points)
- Textile: ₦35 (8 points)

---

## 🎯 Quick Test

1. Start backend: `RUN_BACKEND.bat`
2. Start frontend: `RUN_FRONTEND.bat`
3. Press `w` in frontend window
4. Login: `charles` / `password123`
5. Go to "Sell" tab
6. Select "Plastic"
7. Enter "5" kg
8. See estimated: ₦250 (50 points)
9. Click "Submit Entry"
10. Check "History" tab - see your entry!
11. Check "Home" tab - see updated stats!

---

## 📞 Support

### Test Credentials
```
Username: charles
Password: password123
```

### URLs
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:19006

### Documentation
- README.md - Main documentation
- QUICK_START.md - Quick start guide
- SETUP_INSTRUCTIONS.md - Detailed setup

---

## 🎉 You're Ready!

The project is fully functional. Just run the scripts or commands above and start using TrashVerse!

**Everything works - authentication, waste tracking, earnings calculation, history, and more!**
