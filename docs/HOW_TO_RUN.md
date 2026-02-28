# 🚀 How to Run TrashVerse

## ✅ Prerequisites Confirmed
- ✅ Node.js installed
- ✅ Python installed

---

## 🎯 Easiest Way to Run

### Double-click this file:
```
SIMPLE_START.bat
```

This will:
1. Open Backend window (wait for it to say "Application startup complete")
2. Open Frontend window (press `w` when it's ready)
3. Browser will open automatically

---

## 📋 Manual Method (If Batch File Doesn't Work)

### Step 1: Open PowerShell/Command Prompt

### Step 2: Install Dependencies (First Time Only)

**Backend:**
```bash
cd "C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\TrashVerse\backend"
python -m pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings python-jose passlib python-multipart python-dotenv geopy firebase-admin
python seed_data.py
```

**Frontend:**
```bash
cd "C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\TrashVerse"
npm install
npm install axios @react-native-async-storage/async-storage
```

### Step 3: Run the Project

**Open TWO terminals:**

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

Wait for: `Application startup complete`

**Terminal 2 - Frontend:**
```bash
npm start
```

Press `w` when prompted

---

## 🌐 Access Points

- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Frontend:** http://localhost:19006 (opens automatically)

---

## 🔑 Login

```
Username: charles
Password: password123
```

---

## 📱 What to Test

1. **Login** - Use credentials above
2. **Home Screen** - See your stats (earnings, pickups, waste, CO₂)
3. **Sell Tab** - Add waste entry:
   - Select waste type (e.g., Plastic)
   - Enter weight (e.g., 5 kg)
   - See estimated earnings (₦250, 50 points)
   - Submit
4. **History Tab** - View your entries and transactions
5. **Pull to Refresh** - On any screen

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
cd backend
python seed_data.py
uvicorn app.main:app --reload
```

### Frontend won't start
```bash
npm install
npm start
```

### "Module not found" errors
```bash
npm install axios @react-native-async-storage/async-storage
```

### Database errors
```bash
cd backend
del trashverse.db
python seed_data.py
```

---

## ✅ Expected Output

### Backend Terminal:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Frontend Terminal:
```
Metro waiting on exp://192.168.x.x:8081
› Press w │ open web
```

### Browser:
- Login screen appears
- Enter credentials
- Home screen with stats
- Fully functional app!

---

## 🎉 Success!

Once both terminals show they're running:
1. Press `w` in frontend terminal
2. Browser opens automatically
3. Login and start using TrashVerse!

**Everything is ready - the app is fully functional!**
