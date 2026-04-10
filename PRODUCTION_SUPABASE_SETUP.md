# Production Supabase Setup Guide

## Current Status
- ✅ Supabase project created
- ✅ Database credentials configured
- ✅ Storage buckets configured
- ⚠️ Currently using LOCAL database (needs migration)

## Step-by-Step Migration to Supabase

### Step 1: Test Supabase Connection

First, verify you can connect to Supabase:

```bash
python migrate_to_production.py
```

This script will:
1. Test Supabase connection
2. Create all tables in Supabase
3. Migrate all data from local to Supabase
4. Verify the migration
5. Update .env to use Supabase

### Step 2: Restart Backend

After migration completes, restart your backend:

```bash
# Stop current backend (Ctrl+C)
cd backend
uvicorn app.main:app --reload --port 8000
```

### Step 3: Verify Login

Test that you can login with:
- Username: `admin`, Password: `admin123`
- Username: `testuser`, Password: `test123`

### Step 4: Test All Features

Verify these work:
- ✅ User login/signup
- ✅ Waste entry creation
- ✅ Pickup requests
- ✅ Admin dashboard
- ✅ Settings management
- ✅ Image uploads (Supabase Storage)

## Database Configuration

### Current .env (Local)
```env
DATABASE_URL=postgresql://postgres:Web12345@localhost:5432/TrashverseDB
```

### Production .env (Supabase)
```env
DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

## Storage Configuration

### Supabase Storage Buckets
- `waste-images` - For waste entry photos
- `profile-images` - For user profile pictures

Both buckets are:
- ✅ Public (accessible via URL)
- ✅ 5MB file size limit
- ✅ Configured in `backend/app/storage.py`

## What Uses Supabase?

### Database (PostgreSQL)
- ✅ All user data
- ✅ Waste entries
- ✅ Pickups
- ✅ Stations
- ✅ Rewards
- ✅ Transactions
- ✅ Notifications
- ✅ System settings

### Storage (Supabase Storage)
- ✅ Waste entry images
- ✅ Profile images
- ✅ Automatic fallback to local if Supabase fails

## Deployment Checklist

### Backend (Render)
- [ ] Set environment variables:
  - `DATABASE_URL` (Supabase PostgreSQL)
  - `SUPABASE_PROJECT_URL`
  - `SUPABASE_ANON_KEY`
  - `SECRET_KEY` (generate new)
  - `RESEND_API_KEY`
  - `EMAIL_MODE=production`
- [ ] Deploy from GitHub
- [ ] Run database migrations
- [ ] Test API endpoints

### Frontend (Vercel)
- [ ] Set environment variables:
  - `VITE_API_URL` (Render backend URL)
- [ ] Deploy from GitHub
- [ ] Test all pages
- [ ] Verify API calls work

## Troubleshooting

### Cannot Connect to Supabase
**Error**: `could not translate host name "db.gtieccjexcvgrqhbwosd.supabase.co"`

**Solutions**:
1. Check internet connection
2. Verify Supabase project is active
3. Check database password is correct
4. Try from different network (VPN/mobile hotspot)

### Migration Fails
**Error**: Data migration errors

**Solutions**:
1. Check local database is running
2. Verify Supabase connection works
3. Run migration script again (it's idempotent)
4. Check logs for specific errors

### Images Not Uploading
**Error**: Image upload fails

**Solutions**:
1. Verify Supabase Storage buckets exist
2. Check `SUPABASE_PROJECT_URL` and `SUPABASE_ANON_KEY`
3. Verify bucket permissions are public
4. Check file size < 5MB

## Manual Verification

### Check Supabase Database
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Verify tables exist:
   - users
   - waste_entries
   - pickups
   - stations
   - rewards
   - transactions
   - notifications
   - system_settings

### Check Supabase Storage
1. Go to Supabase Dashboard
2. Navigate to Storage
3. Verify buckets exist:
   - waste-images
   - profile-images

## Production URLs

### Supabase
- Project URL: `https://gtieccjexcvgrqhbwosd.supabase.co`
- Database: `db.gtieccjexcvgrqhbwosd.supabase.co:5432`

### Deployment (After Setup)
- Backend: `https://your-app.onrender.com`
- Frontend: `https://your-app.vercel.app`

## Security Notes

### Before Production
1. ✅ Change `SECRET_KEY` in .env
2. ✅ Use strong database password
3. ✅ Enable RLS (Row Level Security) in Supabase
4. ✅ Set up proper CORS
5. ✅ Use HTTPS only
6. ✅ Rotate API keys regularly

### Supabase Security
- Database password is in connection string
- Anon key is safe for client-side use
- Service role key should NEVER be exposed
- Enable RLS policies for production

## Next Steps After Migration

1. ✅ Test locally with Supabase
2. ✅ Verify all features work
3. ✅ Push changes to GitHub
4. ✅ Deploy backend to Render
5. ✅ Deploy frontend to Vercel
6. ✅ Test production deployment
7. ✅ Monitor logs and errors

## Support

If you encounter issues:
1. Check this guide
2. Review error logs
3. Test Supabase connection
4. Verify environment variables
5. Check Supabase dashboard

---

**Last Updated**: Ready for production migration
**Status**: Local database → Needs migration to Supabase
