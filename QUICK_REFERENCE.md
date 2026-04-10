# Quick Reference Guide

## Start Servers

### Backend
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd web
npm run dev
```

## Admin Access

### Login
- URL: `http://localhost:3001/login`
- Username: `testuser`
- Password: `test123`

### Admin Dashboard
- URL: `http://localhost:3001/admin`

## Admin Pages

| Page | Route | Description |
|------|-------|-------------|
| Overview | `/admin` | Platform analytics |
| Users | `/admin/users` | User management |
| Pickups | `/admin/pickups` | Pickup management |
| Waste | `/admin/waste` | Waste entry management |
| Transactions | `/admin/transactions` | Transaction management |
| Stations | `/admin/stations` | Station management |
| Rewards | `/admin/rewards` | Reward management |
| Notifications | `/admin/notifications` | Broadcast notifications |
| Settings | `/admin/settings` | System settings |

## Common Commands

### Create Admin User
```bash
cd backend
python create_admin_user.py
```

### Check Admin Access
```bash
cd backend
python check_admin_access.py
```

### Hard Refresh Browser
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Admin Endpoints
```
GET    /api/admin/analytics/overview
GET    /api/admin/users
PUT    /api/admin/users/{id}/toggle-active
PUT    /api/admin/users/{id}/role
GET    /api/admin/pickups
PUT    /api/admin/pickups/{id}/status
GET    /api/admin/waste-entries
PUT    /api/admin/waste-entries/{id}
DELETE /api/admin/waste-entries/{id}
GET    /api/admin/transactions
PUT    /api/admin/transactions/{id}/approve
GET    /api/admin/stations
PUT    /api/admin/stations/{id}
DELETE /api/admin/stations/{id}
GET    /api/admin/rewards
PUT    /api/admin/rewards/{id}
DELETE /api/admin/rewards/{id}
POST   /api/admin/notifications/broadcast
GET    /api/admin/settings
```

## File Locations

### Admin Pages
```
web/src/pages/Admin.tsx
web/src/pages/admin/AdminUsers.tsx
web/src/pages/admin/AdminPickups.tsx
web/src/pages/admin/AdminWaste.tsx
web/src/pages/admin/AdminTransactions.tsx
web/src/pages/admin/AdminStations.tsx
web/src/pages/admin/AdminRewards.tsx
web/src/pages/admin/AdminNotifications.tsx
web/src/pages/admin/AdminSettings.tsx
```

### Admin Components
```
web/src/components/AdminLayout.tsx
web/src/services/admin.ts
```

### Backend
```
backend/app/routers/admin.py
backend/app/main.py
```

## Troubleshooting

### 401 Errors
1. Login with admin credentials
2. Check token in localStorage
3. Verify backend is running

### Blank Pages
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Restart dev server

### Sidebar Issues
1. Check AdminLayout.tsx
2. Verify Tailwind config
3. Hard refresh browser

### Routes Not Working
1. Check App.tsx routes
2. Restart frontend server
3. Clear browser cache

## Quick Test

1. ✅ Start backend server
2. ✅ Start frontend server
3. ✅ Login with testuser/test123
4. ✅ Navigate to /admin
5. ✅ Test each admin page
6. ✅ Verify no console errors

## Status

✅ All 9 admin pages complete
✅ All backend endpoints working
✅ All routes configured
✅ No console errors
✅ Production ready

## Documentation

- `ADMIN_PAGES_COMPLETE.md` - Implementation details
- `ADMIN_TESTING_GUIDE.md` - Testing checklist
- `PROJECT_COMPLETE_SUMMARY.md` - Full summary
- `QUICK_REFERENCE.md` - This file
