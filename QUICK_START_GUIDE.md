# TrashVerse - Quick Start Guide

## 🚀 All Features Complete: 8/8

---

## Start All Servers

```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2 - Web
cd web
npm run dev

# Terminal 3 - Mobile
cd mobile
npx expo start
```

---

## Test New Features

### 1. Real-time Notifications

**Steps:**
1. Open http://localhost:3001/notifications
2. Allow browser notifications (if prompted)
3. Open another browser/tab
4. Trigger a notification (e.g., redeem reward)
5. Watch toast appear in first browser
6. See browser notification popup

**What to Look For:**
- Toast slides in from right
- Shows notification title and body
- Auto-dismisses after 5 seconds
- Notification list updates automatically
- Browser notification appears (if allowed)

### 2. Search & Filters - Transactions

**Steps:**
1. Open http://localhost:3001/transactions
2. Type in search box (searches descriptions)
3. Select transaction type filter
4. Pick start and end dates
5. Click "Clear Filters" to reset

**What to Look For:**
- Results filter instantly
- Shows "X of Y" count
- Active filter count badge
- No page reload needed

### 3. Search & Filters - Pickups

**Steps:**
1. Open http://localhost:3001/pickups
2. Search by address or notes
3. Filter by status (pending, scheduled, etc.)
4. Filter by waste type
5. Click "Clear Filters" to reset

**What to Look For:**
- Multi-criteria filtering works
- Result count updates
- Filters hidden when form is open

### 4. Search & Filters - Stations

**Steps:**
1. Open http://localhost:3001/stations
2. Search by name or address
3. Filter by city (dropdown populated from data)
4. Click "Clear Filters" to reset

**What to Look For:**
- City list is dynamic
- Search is case-insensitive
- Works with "Find Nearest" feature

---

## Feature Checklist

- [x] Admin Dashboard
- [x] Image Upload
- [x] Image Storage (Supabase)
- [x] Withdrawal Page
- [x] Location Tracking
- [x] Mobile Integration
- [x] Real-time Notifications ⭐ NEW
- [x] Search/Filters ⭐ NEW

---

## API Endpoints

### All Working
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/auth/me/is-admin`
- POST `/api/waste/entries`
- GET `/api/waste/entries`
- POST `/api/pickups/`
- GET `/api/pickups/`
- GET `/api/rewards/`
- POST `/api/rewards/{id}/redeem`
- GET `/api/stations/`
- GET `/api/stations/nearby/search`
- GET `/api/transactions/`
- POST `/api/transactions/withdraw`
- GET `/api/notifications/`
- PUT `/api/notifications/{id}/read`
- POST `/api/upload/waste-image`
- POST `/api/upload/profile-image`

---

## Test Users

### Test Users

### Regular User
- Username: `testuser`
- Password: `test123`

### Admin User
- Username: `testuser` (made admin)
- Password: `test123`

**Make User Admin:**
```bash
cd backend
python make_admin.py testuser
```

---

## Common Issues

### Real-time Notifications Not Working
1. Check Supabase URL in hook
2. Verify user is logged in
3. Check browser console for errors
4. Ensure notifications table exists

### Search Not Working
1. Check if data is loaded
2. Verify filter state
3. Check console for errors
4. Try clearing filters

### Browser Notifications Not Showing
1. Check browser permission
2. Must be on HTTPS (or localhost)
3. Check notification settings
4. Try different browser

---

## Production Deployment

### Backend (Render)
```bash
git push origin main
# Render auto-deploys
```

### Frontend (Vercel)
```bash
cd web
vercel --prod
```

### Mobile (Expo)
```bash
cd mobile
eas build --platform all
```

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://...
SUPABASE_PROJECT_URL=https://...
SUPABASE_ANON_KEY=eyJ...
RESEND_API_KEY=re_...
EMAIL_MODE=production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## Documentation

- `ALL_FEATURES_COMPLETE.md` - Full implementation details
- `IMPLEMENTATION_SUMMARY.md` - Quick summary
- `FINAL_PROJECT_STATUS.md` - Project status
- `ENHANCED_FEATURES_COMPLETE.md` - Feature status
- `QUICK_START_GUIDE.md` - This guide

---

## Support

**Status:** All features complete and tested ✅  
**Version:** 2.0.0  
**Date:** April 10, 2026

🎉 **Ready for Production!**
