# TrashVerse Backend API

Backend API for TrashVerse - Transforming Waste into Wealth & Financial Inclusion for Nigeria

## Features

1. ✅ **User Management** - Registration, authentication, profile management
2. ✅ **Waste Tracking** - Log waste entries with automatic earnings calculation
3. ✅ **Earnings & Rewards** - Points system and reward redemption
4. ✅ **Payment Integration** - Withdrawal system (ready for payment gateway)
5. ✅ **Recycling Stations** - Geolocation-based station finder
6. ✅ **Analytics** - Dashboard stats, leaderboard, waste breakdown
7. ✅ **Pickup Scheduling** - Schedule and track waste pickups
8. ✅ **AI Integration** - Ready for waste identification (placeholder)
9. ✅ **Notifications** - In-app notification system
10. ✅ **Push Notifications** - Firebase Cloud Messaging integration

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite (easily migrates to PostgreSQL/Supabase)
- **Authentication**: JWT with OAuth2
- **Push Notifications**: Firebase Admin SDK
- **Geolocation**: Geopy

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Seed the database:
```bash
python seed_data.py
```

4. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Test User

- Username: `charles`
- Password: `password123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile

### Waste Management
- `POST /api/waste/entries` - Create waste entry
- `GET /api/waste/entries` - Get user's waste entries
- `GET /api/waste/entries/{id}` - Get specific entry
- `DELETE /api/waste/entries/{id}` - Delete entry

### Transactions
- `GET /api/transactions/` - Get all transactions
- `POST /api/transactions/withdraw` - Withdraw earnings
- `GET /api/transactions/balance` - Get current balance

### Recycling Stations
- `GET /api/stations/` - Get all stations (with distance filter)
- `GET /api/stations/{id}` - Get specific station
- `GET /api/stations/nearby/search` - Find nearest station
- `POST /api/stations/` - Create station (admin)

### Pickups
- `POST /api/pickups/` - Schedule pickup
- `GET /api/pickups/` - Get user's pickups
- `GET /api/pickups/{id}` - Get specific pickup
- `PUT /api/pickups/{id}` - Update pickup
- `DELETE /api/pickups/{id}` - Cancel pickup

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats
- `GET /api/analytics/stats` - Get detailed stats
- `GET /api/analytics/leaderboard` - Get top users

### Notifications
- `GET /api/notifications/` - Get all notifications
- `GET /api/notifications/unread/count` - Get unread count
- `PUT /api/notifications/{id}/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/{id}` - Delete notification

### Rewards
- `GET /api/rewards/` - Get all rewards
- `GET /api/rewards/{id}` - Get specific reward
- `POST /api/rewards/{id}/redeem` - Redeem reward
- `POST /api/rewards/` - Create reward (admin)

## Pricing & Points

### Waste Pricing (per kg)
- Plastic: ₦50
- Paper: ₦30
- Metal: ₦80
- Electronics: ₦150
- Glass: ₦40
- Organic: ₦20
- Textile: ₦35

### Points (per kg)
- Plastic: 10 points
- Paper: 8 points
- Metal: 15 points
- Electronics: 25 points
- Glass: 10 points
- Organic: 5 points
- Textile: 8 points

### CO₂ Averted (per kg)
- Plastic: 2.5 kg
- Paper: 1.8 kg
- Metal: 3.2 kg
- Electronics: 4.0 kg
- Glass: 0.5 kg
- Organic: 0.3 kg
- Textile: 1.5 kg

## Firebase Setup (Optional)

For push notifications:

1. Create a Firebase project
2. Download service account credentials
3. Save as `firebase-credentials.json` in backend folder
4. Update `.env` with correct path

## Migration to Supabase

To migrate to Supabase:

1. Update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

2. Update `app/database.py` to remove SQLite-specific settings:
```python
engine = create_engine(settings.DATABASE_URL)
```

3. Run migrations or recreate tables

## Development

Run with auto-reload:
```bash
uvicorn app.main:app --reload
```

## Production

Run with Gunicorn:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```
