# TrashVerse - Transforming Waste into Wealth

A comprehensive waste management and recycling platform for Nigeria, built with React Native (Expo) and FastAPI.

## 🌟 Features

### ✅ Fully Implemented Backend
- **User Management** - Registration, authentication, profile management
- **Waste Tracking** - Log waste entries with automatic earnings calculation
- **Earnings & Rewards** - Points system and reward redemption
- **Payment Integration** - Withdrawal system (ready for payment gateway)
- **Recycling Stations** - Geolocation-based station finder
- **Analytics** - Dashboard stats, leaderboard, waste breakdown
- **Pickup Scheduling** - Schedule and track waste pickups
- **Notifications** - In-app notification system
- **Push Notifications** - Firebase Cloud Messaging integration
- **Image Upload** - Upload waste and profile images

### ⚠️ Frontend (UI Complete, API Integration Needed)
- Onboarding flow
- Home screen with stats
- Navigation structure
- Recycling guide
- UI components

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ ([Download](https://www.python.org/downloads/))
- Node.js 18+ ([Download](https://nodejs.org/))

### Backend Setup (2 minutes)

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

**Manual:**
```bash
cd backend
pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
```

✅ Backend: http://localhost:8000
📚 API Docs: http://localhost:8000/docs

### Frontend Setup (1 minute)

```bash
npm install
npm start
```

Press `a` for Android, `i` for iOS, or `w` for Web

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[backend/SETUP.md](backend/SETUP.md)** - Detailed backend setup
- **[FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)** - API integration guide

## 🧪 Test Credentials

```
Username: charles
Password: password123
```

## 📊 Pricing & Points

### Waste Pricing (per kg)
- Plastic: ₦50 (10 points)
- Paper: ₦30 (8 points)
- Metal: ₦80 (15 points)
- Electronics: ₦150 (25 points)
- Glass: ₦40 (10 points)
- Organic: ₦20 (5 points)
- Textile: ₦35 (8 points)

## 🏗️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (easily migrates to PostgreSQL)
- **Authentication**: JWT with OAuth2
- **Push Notifications**: Firebase Admin SDK
- **Geolocation**: Geopy

### Frontend
- **Framework**: React Native (Expo)
- **Navigation**: Expo Router
- **UI**: React Native components

## 📁 Project Structure

```
TrashVerse/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── routers/        # API endpoints
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Request/response schemas
│   │   ├── auth.py         # Authentication utilities
│   │   ├── utils.py        # Helper functions
│   │   └── main.py         # App entry point
│   ├── .env                # Environment variables
│   ├── requirements.txt    # Python dependencies
│   ├── seed_data.py        # Database seeding
│   └── SETUP.md           # Setup guide
│
├── app/                    # React Native screens
│   ├── (tabs)/            # Tab navigation
│   ├── index.tsx          # Splash screen
│   └── onboarding.tsx     # Onboarding flow
│
├── components/            # Reusable components
├── services/              # API integration (TO BE CREATED)
├── contexts/              # State management (TO BE CREATED)
└── FRONTEND_INTEGRATION.md # Integration guide
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile

### Waste Management
- `POST /api/waste/entries` - Create waste entry
- `GET /api/waste/entries` - Get user's entries
- `DELETE /api/waste/entries/{id}` - Delete entry

### Pickups
- `POST /api/pickups/` - Schedule pickup
- `GET /api/pickups/` - Get user's pickups
- `PUT /api/pickups/{id}` - Update pickup
- `DELETE /api/pickups/{id}` - Cancel pickup

### Recycling Stations
- `GET /api/stations/` - Get all stations
- `GET /api/stations/nearby/search` - Find nearest station

### Rewards
- `GET /api/rewards/` - Get all rewards
- `POST /api/rewards/{id}/redeem` - Redeem reward

### Transactions
- `GET /api/transactions/` - Get transactions
- `POST /api/transactions/withdraw` - Withdraw earnings
- `GET /api/transactions/balance` - Get balance

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/stats` - Detailed stats
- `GET /api/analytics/leaderboard` - Top users

### Upload
- `POST /api/upload/waste-image` - Upload waste image
- `POST /api/upload/profile-image` - Upload profile image

## 🔧 Development

### Backend
```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend
```bash
npm start
```

## 📱 Next Steps

### For Backend
1. ✅ Backend is complete
2. Customize pricing in `backend/app/utils.py`
3. Add payment gateway integration
4. Implement AI waste identification

### For Frontend
1. Read `FRONTEND_INTEGRATION.md`
2. Install: `npm install axios @react-native-async-storage/async-storage`
3. Create API service layer
4. Create AuthContext
5. Build login/register screens
6. Connect screens to API

## 🚀 Production Deployment

### Backend
1. Change `SECRET_KEY` in `.env`
2. Migrate to PostgreSQL
3. Set up proper CORS origins
4. Add rate limiting
5. Use cloud storage for images
6. Deploy to Heroku/Railway/AWS

### Frontend
1. Update API_BASE_URL
2. Build: `expo build:android` / `expo build:ios`
3. Submit to app stores

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read the documentation before submitting PRs.

## 📞 Support

For issues or questions, please check the documentation:
- [QUICK_START.md](QUICK_START.md)
- [backend/SETUP.md](backend/SETUP.md)
- [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
