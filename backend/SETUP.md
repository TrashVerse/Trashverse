# TrashVerse Backend Setup Guide

## Prerequisites

### 1. Install Python
Download and install Python 3.8+ from [python.org](https://www.python.org/downloads/)

**Windows Installation:**
- Download the installer
- ✅ Check "Add Python to PATH" during installation
- Verify installation: `python --version`

### 2. Install Dependencies

```bash
cd TrashVerse/backend
pip install -r requirements.txt
```

## Database Setup

### Initialize Database with Seed Data

```bash
python seed_data.py
```

This will:
- Create the SQLite database (`trashverse.db`)
- Create all tables
- Seed 5 recycling stations in Aba
- Seed 6 rewards
- Create test user: `charles` / `password123`

## Running the Server

### Development Mode (with auto-reload)

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Test the API

### 1. Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=charles&password=password123"
```

### 2. Get User Info
```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Environment Variables

The `.env` file has been created with default values:

```
SECRET_KEY=trashverse-super-secret-key-change-in-production-2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DATABASE_URL=sqlite:///./trashverse.db
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
```

⚠️ **Change the SECRET_KEY in production!**

## Firebase Setup (Optional)

For push notifications:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Download service account credentials
3. Save as `firebase-credentials.json` in the backend folder
4. The app will work without Firebase, but push notifications will be disabled

## Database Schema

### Tables Created:
- `users` - User accounts and stats
- `waste_entries` - Waste recycling records
- `pickups` - Pickup scheduling
- `recycling_stations` - Collection points
- `transactions` - Financial transactions
- `notifications` - In-app notifications
- `rewards` - Redeemable rewards

## Troubleshooting

### Python not found
- Ensure Python is installed and added to PATH
- Try `python3` instead of `python`
- On Windows, try `py` command

### Module not found
```bash
pip install -r requirements.txt
```

### Database locked
- Close any other connections to the database
- Delete `trashverse.db` and run `seed_data.py` again

### Port already in use
```bash
# Use a different port
uvicorn app.main:app --reload --port 8001
```

## Next Steps

1. ✅ Backend is fully implemented
2. ⏳ Frontend needs API integration
3. ⏳ Add image upload endpoint
4. ⏳ Integrate payment gateway
5. ⏳ Implement AI waste identification

## API Endpoints Summary

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/me` - Update profile

### Waste Management
- POST `/api/waste/entries` - Create waste entry
- GET `/api/waste/entries` - Get entries
- DELETE `/api/waste/entries/{id}` - Delete entry

### Pickups
- POST `/api/pickups/` - Schedule pickup
- GET `/api/pickups/` - Get pickups
- PUT `/api/pickups/{id}` - Update pickup
- DELETE `/api/pickups/{id}` - Cancel pickup

### Stations
- GET `/api/stations/` - Get all stations
- GET `/api/stations/nearby/search` - Find nearest

### Rewards
- GET `/api/rewards/` - Get rewards
- POST `/api/rewards/{id}/redeem` - Redeem reward

### Transactions
- GET `/api/transactions/` - Get transactions
- POST `/api/transactions/withdraw` - Withdraw
- GET `/api/transactions/balance` - Get balance

### Analytics
- GET `/api/analytics/dashboard` - Dashboard stats
- GET `/api/analytics/stats` - Detailed stats
- GET `/api/analytics/leaderboard` - Top users

### Notifications
- GET `/api/notifications/` - Get notifications
- GET `/api/notifications/unread/count` - Unread count
- PUT `/api/notifications/{id}/read` - Mark as read
- PUT `/api/notifications/read-all` - Mark all read
