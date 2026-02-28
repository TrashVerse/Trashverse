# TrashVerse Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.8+ ([Download](https://www.python.org/downloads/))
- Node.js 18+ ([Download](https://nodejs.org/))
- Expo CLI (`npm install -g expo-cli`)

---

## Backend Setup (2 minutes)

### Windows
```bash
cd TrashVerse/backend
setup.bat
```

### Mac/Linux
```bash
cd TrashVerse/backend
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
cd TrashVerse/backend
pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
```

✅ Backend running at: http://localhost:8000
📚 API Docs: http://localhost:8000/docs

---

## Frontend Setup (1 minute)

```bash
cd TrashVerse
npm install
npm start
```

Press:
- `a` for Android
- `i` for iOS
- `w` for Web

---

## Test the Backend

### 1. Open API Docs
Visit: http://localhost:8000/docs

### 2. Login with Test User
```
Username: charles
Password: password123
```

### 3. Try Endpoints
- Click "Authorize" button
- Enter credentials
- Try any endpoint

---

## Project Structure

```
TrashVerse/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── routers/        # API endpoints
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Request/response schemas
│   │   └── main.py         # App entry point
│   ├── .env                # Environment variables
│   ├── requirements.txt    # Python dependencies
│   └── seed_data.py        # Database seeding
│
├── app/                    # React Native screens
│   ├── (tabs)/            # Tab navigation
│   ├── index.tsx          # Splash screen
│   └── onboarding.tsx     # Onboarding flow
│
├── components/            # Reusable components
├── services/              # API integration (TO BE CREATED)
└── contexts/              # State management (TO BE CREATED)
```

---

## What's Implemented

### ✅ Backend (100% Complete)
- User authentication (JWT)
- Waste entry tracking
- Pickup scheduling
- Recycling stations
- Rewards system
- Transactions
- Analytics & leaderboard
- Notifications
- Image upload
- Firebase push notifications

### ⚠️ Frontend (UI Only)
- Onboarding screens
- Home screen (hardcoded data)
- Navigation structure
- UI components

### ❌ Not Implemented
- API integration in frontend
- Login/register screens
- State management
- Data fetching

---

## Next Steps

### For Backend Development
1. ✅ Backend is complete
2. Test endpoints at http://localhost:8000/docs
3. Customize pricing in `app/utils.py`
4. Add payment gateway integration
5. Implement AI waste identification

### For Frontend Development
1. Read `FRONTEND_INTEGRATION.md`
2. Install: `npm install axios @react-native-async-storage/async-storage`
3. Create API service layer
4. Create AuthContext
5. Build login/register screens
6. Connect home screen to API

---

## Common Issues

### Python not found
- Install Python from python.org
- Check "Add Python to PATH" during installation
- Restart terminal

### Port 8000 already in use
```bash
uvicorn app.main:app --reload --port 8001
```

### Module not found
```bash
pip install -r requirements.txt
```

### Database locked
```bash
# Delete and recreate
rm trashverse.db
python seed_data.py
```

---

## API Quick Reference

### Authentication
```bash
# Login
POST /api/auth/login
Body: username=charles&password=password123

# Get user
GET /api/auth/me
Header: Authorization: Bearer {token}
```

### Waste Entry
```bash
POST /api/waste/entries
{
  "waste_type": "plastic",
  "weight_kg": 5.0,
  "description": "Plastic bottles"
}
```

### Dashboard
```bash
GET /api/analytics/dashboard
```

---

## Resources

- Backend API Docs: http://localhost:8000/docs
- Backend Setup: `backend/SETUP.md`
- Frontend Integration: `FRONTEND_INTEGRATION.md`
- Main README: `README.md`

---

## Support

### Test Credentials
```
Username: charles
Password: password123
```

### Database
- Type: SQLite
- File: `backend/trashverse.db`
- Reset: Delete file and run `python seed_data.py`

### Pricing (per kg)
- Plastic: ₦50 (10 points)
- Paper: ₦30 (8 points)
- Metal: ₦80 (15 points)
- Electronics: ₦150 (25 points)
- Glass: ₦40 (10 points)
- Organic: ₦20 (5 points)
- Textile: ₦35 (8 points)

---

## Production Deployment

### Backend
1. Change `SECRET_KEY` in `.env`
2. Use PostgreSQL instead of SQLite
3. Set up proper CORS origins
4. Add rate limiting
5. Use cloud storage for images
6. Deploy to Heroku/Railway/AWS

### Frontend
1. Update API_BASE_URL
2. Build: `expo build:android` / `expo build:ios`
3. Submit to app stores

---

🎉 **You're all set! Start building amazing features!**
