# How to Run All Projects Together

## 🎯 The Setup: One Backend, Two Frontends

```
Backend (Port 8000)
    ↓
    ├─→ Mobile App (Expo)
    └─→ Web App (Port 3000)
```

Both mobile and web connect to the **same backend** at `http://localhost:8000`.
They won't interfere with each other - they just share the same API!

---

## 🚀 Quick Start (3 Terminals)

### Terminal 1: Start Backend (REQUIRED)
```bash
cd C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\monorepo-new\backend
python -m venv venv
venv\Scripts\activate
python run.py
```

**Output:** Backend running at http://localhost:8000
**Leave this running!**

### Terminal 2: Start Mobile (Optional)
```bash
cd C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\monorepo-new\mobile
npm install
npx expo start
```

**Output:** Expo DevTools opens
**Press 'w'** to open in browser
**Leave this running if you want to use mobile!**

### Terminal 3: Start Web (Optional)
```bash
cd C:\Users\kelechi Daniel\Desktop\Scepter\Recycle\monorepo-new\web
npm install
npm run dev
```

**Output:** Web app at http://localhost:3000
**Leave this running if you want to use web!**

---

## 📱 Usage Scenarios

### Scenario 1: Test Mobile Only
```bash
# Terminal 1
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2
cd monorepo-new\mobile
npx expo start
```

### Scenario 2: Test Web Only
```bash
# Terminal 1
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2
cd monorepo-new\web
npm run dev
```

### Scenario 3: Test Both Simultaneously
```bash
# Terminal 1 - Backend
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2 - Mobile
cd monorepo-new\mobile
npx expo start

# Terminal 3 - Web
cd monorepo-new\web
npm run dev
```

**Result:** 
- Mobile app connects to backend
- Web app connects to same backend
- Both work independently
- Changes in one don't affect the other
- They share the same database and users!

---

## 🔄 How They Share the Backend

### Same API Endpoints
Both mobile and web call the same endpoints:

**Mobile (services/api.ts):**
```typescript
const API_URL = 'http://localhost:8000';
// Calls: POST /api/auth/login
```

**Web (will need to configure):**
```javascript
const API_URL = 'http://localhost:8000';
// Calls: POST /api/auth/login
```

### Same Database
- Both read/write to `backend/trashverse.db`
- Login on mobile → user exists in web
- Create waste entry on mobile → visible in backend
- Same test user works on both: `charles / password123`

### No Interference
- Mobile uses Expo (different port)
- Web uses Next.js (port 3000)
- Backend serves both (port 8000)
- They're completely independent clients!

---

## 🎮 Testing Both Together

### Step 1: Start Backend
```bash
cd monorepo-new\backend
venv\Scripts\activate
python run.py
```
✅ Backend ready at http://localhost:8000

### Step 2: Start Mobile
```bash
cd monorepo-new\mobile
npx expo start
# Press 'w' for web preview
```
✅ Mobile app running

### Step 3: Start Web
```bash
cd monorepo-new\web
npm run dev
```
✅ Web app at http://localhost:3000

### Step 4: Test Simultaneously
1. **Mobile:** Login with `charles / password123`
2. **Web:** Login with same credentials
3. **Mobile:** Create a waste entry
4. **Backend:** Check API logs - see both requests
5. **Both:** Share same data!

---

## 🔧 First Time Setup

### Backend Setup (One Time)
```bash
cd monorepo-new\backend

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Database is already seeded, but if needed:
python seed_data.py
```

### Mobile Setup (One Time)
```bash
cd monorepo-new\mobile

# Install dependencies
npm install

# Create .env file
echo EXPO_PUBLIC_API_URL=http://localhost:8000 > .env
```

### Web Setup (One Time)
```bash
cd monorepo-new\web

# Install dependencies
npm install

# .env.local already exists, but verify it has:
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📊 Port Reference

| Service | Port | URL |
|---------|------|-----|
| Backend API | 8000 | http://localhost:8000 |
| Backend Docs | 8000 | http://localhost:8000/docs |
| Web App | 3000 | http://localhost:3000 |
| Mobile (Web) | 8081 | http://localhost:8081 (Expo) |

---

## 🐛 Troubleshooting

### "Backend not responding"
**Problem:** Mobile/Web can't connect to backend
**Solution:** 
1. Check backend is running (Terminal 1)
2. Visit http://localhost:8000/docs
3. Should see API documentation

### "Port already in use"
**Problem:** Port 8000 or 3000 already taken
**Solution:**
```bash
# Find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or change port in backend/run.py
```

### "Mobile can't connect to localhost"
**Problem:** Testing on physical device
**Solution:** 
1. Find your computer's IP: `ipconfig`
2. Update mobile/.env: `EXPO_PUBLIC_API_URL=http://192.168.x.x:8000`
3. Restart Expo

### "Web shows 404"
**Problem:** Web app not connecting to backend
**Solution:**
1. Check web/.env.local has correct API URL
2. Restart web dev server
3. Check browser console for errors

---

## 💡 Pro Tips

### Tip 1: Keep Backend Running
Start backend first, leave it running all day. Start/stop mobile and web as needed.

### Tip 2: Watch Backend Logs
Backend terminal shows all API requests from both mobile and web:
```
INFO: 127.0.0.1:52341 - "POST /api/auth/login HTTP/1.1" 200 OK
INFO: 127.0.0.1:52342 - "GET /api/analytics/dashboard HTTP/1.1" 200 OK
```

### Tip 3: Use API Docs
Visit http://localhost:8000/docs to test endpoints directly

### Tip 4: Shared Test User
Use `charles / password123` on both mobile and web to see shared data

### Tip 5: Database Browser
Install DB Browser for SQLite to view `backend/trashverse.db` directly

---

## 🎯 Common Workflows

### Workflow 1: Develop Mobile Feature
```bash
# Terminal 1: Backend (keep running)
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2: Mobile
cd monorepo-new\mobile
npx expo start
# Make changes, see live reload
```

### Workflow 2: Develop Web Feature
```bash
# Terminal 1: Backend (keep running)
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2: Web
cd monorepo-new\web
npm run dev
# Make changes, see live reload
```

### Workflow 3: Test Full Stack
```bash
# Terminal 1: Backend
cd monorepo-new\backend
venv\Scripts\activate
python run.py

# Terminal 2: Mobile
cd monorepo-new\mobile
npx expo start

# Terminal 3: Web
cd monorepo-new\web
npm run dev

# Test feature on both platforms
```

---

## 🔐 Test Credentials

**Username:** charles
**Password:** password123

Works on:
- ✅ Mobile app
- ✅ Web app (when connected to backend)
- ✅ API docs (http://localhost:8000/docs)

---

## 📝 Quick Commands Cheat Sheet

```bash
# Start Backend
cd monorepo-new\backend && venv\Scripts\activate && python run.py

# Start Mobile
cd monorepo-new\mobile && npx expo start

# Start Web
cd monorepo-new\web && npm run dev

# Stop All
# Press Ctrl+C in each terminal
```

---

## ✅ Success Checklist

When everything is running correctly:

- [ ] Backend terminal shows: "Uvicorn running on http://127.0.0.1:8000"
- [ ] Can visit http://localhost:8000/docs
- [ ] Mobile terminal shows: "Metro waiting on exp://..."
- [ ] Web terminal shows: "ready - started server on 0.0.0.0:3000"
- [ ] Can visit http://localhost:3000
- [ ] Mobile app can login
- [ ] Web app can login (when backend connected)
- [ ] Both use same test user

---

## 🎉 You're Ready!

The setup allows you to:
- ✅ Run mobile and web simultaneously
- ✅ Both connect to same backend
- ✅ Share same database and users
- ✅ Develop independently
- ✅ Test full stack integration

**No interference, just seamless integration!** 🚀
