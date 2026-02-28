# TrashVerse - Waste to Wealth Platform

Monorepo containing all TrashVerse applications.

## 📁 Project Structure

- `backend/` - FastAPI backend API
- `mobile/` - React Native/Expo mobile app
- `web/` - Next.js web application
- `docs/` - Documentation

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python run.py
```
Backend runs on: http://localhost:8000
API Docs: http://localhost:8000/docs

### Mobile App
```bash
cd mobile
npm install
npx expo start
```
Press 'w' for web, 'a' for Android, 'i' for iOS

### Web App
```bash
cd web
npm install
npm run dev
```
Web app runs on: http://localhost:3000

## 📚 Documentation
See `docs/` folder for detailed guides:
- `MONOREPO_QUICK_START.md` - Quick start guide
- `PROJECT_COMPARISON_REPORT.md` - Comparison of mobile vs web
- `REPOSITORY_RESTRUCTURE_GUIDE.md` - Detailed restructure guide

## 🔗 Links
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Mobile App: Expo Go
- Web App: http://localhost:3000

## 🧪 Test Credentials
- Username: charles
- Password: password123

## 📦 Installation

Install all dependencies at once:
```bash
# Install mobile dependencies
cd mobile && npm install

# Install web dependencies
cd ../web && npm install

# Install backend dependencies
cd ../backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## 🚀 Development Workflow

1. Start backend (Terminal 1):
   ```bash
   cd backend
   venv\Scripts\activate
   python run.py
   ```

2. Start mobile (Terminal 2):
   ```bash
   cd mobile
   npx expo start
   ```

3. Start web (Terminal 3):
   ```bash
   cd web
   npm run dev
   ```

## 📝 Git Workflow

```bash
# Make changes to any project
# ... edit files ...

# Commit all changes
git add .
git commit -m "Your commit message"
git push
```

## 🌐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./trashverse.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Mobile (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

### Web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎯 Features

### Mobile App
- ✅ User authentication
- ✅ Waste entry submission
- ✅ Earnings tracking
- ✅ Transaction history
- ✅ Dashboard with stats

### Web App
- ✅ Marketing landing page
- ✅ Blog
- ✅ Careers page
- ⚠️ Dashboard (needs backend integration)
- ⚠️ Authentication (needs backend integration)

### Backend
- ✅ RESTful API
- ✅ User management
- ✅ Waste tracking
- ✅ Pickup scheduling
- ✅ Rewards system
- ✅ Analytics

## 📄 License
© 2026 TrashVerse Inc. All rights reserved.
