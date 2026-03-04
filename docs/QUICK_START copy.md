# TrashVerse Monorepo - Quick Start

## 🚀 Easiest Way to Run Everything

### Option 1: Run All at Once (Recommended for Testing)
Double-click: **`START_ALL.bat`**

This opens 3 terminals:
1. Backend at http://localhost:8000
2. Mobile app (Expo)
3. Web app at http://localhost:3000

### Option 2: Run Individually

**Backend Only:**
Double-click: **`START_BACKEND.bat`**

**Mobile Only:**
Double-click: **`START_MOBILE.bat`**
(Requires backend to be running)

**Web Only:**
Double-click: **`START_WEB.bat`**
(Requires backend to be running)

---

## 📋 What You Need

### First Time Setup
1. **Python** (for backend)
2. **Node.js** (for mobile and web)
3. **Git** (already initialized)

### Test Credentials
- Username: `charles`
- Password: `password123`

---

## 🎯 Typical Workflow

### For Mobile Development:
1. Double-click `START_BACKEND.bat`
2. Double-click `START_MOBILE.bat`
3. Press 'w' in mobile terminal for web preview
4. Start coding!

### For Web Development:
1. Double-click `START_BACKEND.bat`
2. Double-click `START_WEB.bat`
3. Open http://localhost:3000
4. Start coding!

### For Full Stack Testing:
1. Double-click `START_ALL.bat`
2. Wait for all 3 to start
3. Test on both platforms!

---

## 🔗 URLs

| Service | URL |
|---------|-----|
| Backend API | http://localhost:8000 |
| API Documentation | http://localhost:8000/docs |
| Web App | http://localhost:3000 |
| Mobile (Web) | Check Expo terminal |

---

## 💡 Tips

1. **Always start backend first** if running individually
2. **Keep backend running** while developing mobile or web
3. **Both mobile and web** connect to the same backend
4. **Changes in one** don't affect the other
5. **Same database** means same users and data

---

## 🐛 Troubleshooting

**"Port already in use"**
- Close other instances
- Or restart your computer

**"Module not found"**
- Run `npm install` in mobile or web folder
- Run `pip install -r requirements.txt` in backend folder

**"Can't connect to backend"**
- Make sure backend is running
- Check http://localhost:8000/docs loads

---

## 📚 More Info

- Full guide: `RUN_ALL_PROJECTS.md`
- Setup status: `SETUP_COMPLETE.md`
- Documentation: `docs/` folder

---

## ✅ Quick Check

Everything working if:
- ✅ Backend shows "Uvicorn running"
- ✅ http://localhost:8000/docs loads
- ✅ Mobile shows Expo QR code
- ✅ Web shows at http://localhost:3000
- ✅ Can login with charles/password123

**You're all set!** 🎉
