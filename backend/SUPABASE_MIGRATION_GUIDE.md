# 🚀 TrashVerse Migration to Supabase

## Overview

This guide walks you through migrating TrashVerse from local PostgreSQL to Supabase, a hosted PostgreSQL platform with additional features like real-time subscriptions, authentication, and storage.

## Why Supabase?

- ✅ **Hosted PostgreSQL**: No need to manage database servers
- ✅ **Automatic Backups**: Daily backups included
- ✅ **Scalability**: Easy to scale as your app grows
- ✅ **Real-time Features**: Built-in real-time subscriptions
- ✅ **Row Level Security**: Advanced security features
- ✅ **Free Tier**: Generous free tier for development
- ✅ **Global CDN**: Fast access from anywhere

## Prerequisites

Before starting the migration:

1. ✅ **Supabase Account**: You already have a project at `gtieccjexcvgrqhbwosd.supabase.co`
2. ✅ **Database Password**: You need your Supabase database password
3. ✅ **Local Data**: Your local PostgreSQL database should be running with data

## Step 1: Get Your Supabase Database Password

### Option A: Find Existing Password
If you saved your database password when creating the project, use that.

### Option B: Reset Password
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `gtieccjexcvgrqhbwosd`
3. Go to **Project Settings** → **Database**
4. Scroll to **Database Password** section
5. Click **Reset Database Password**
6. Copy the new password (you won't see it again!)

## Step 2: Update Backend Configuration

Update `backend/.env` with your Supabase database password:

```env
# Replace [YOUR-PASSWORD] with your actual Supabase database password
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

**Example:**
```env
DATABASE_URL=postgresql://postgres:MySecurePass123!@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

## Step 3: Run Migration Script

The migration script will:
1. ✅ Create all tables on Supabase
2. ✅ Export data from local PostgreSQL
3. ✅ Import data to Supabase
4. ✅ Verify the migration

Run the migration:

```bash
cd backend
python migrate_to_supabase.py
```

### Expected Output:

```
🚀 TrashVerse Migration: Local PostgreSQL → Supabase
============================================================

📡 Connecting to databases...
✅ Connected to local PostgreSQL
✅ Connected to Supabase

📋 Creating schema on Supabase...
✅ Schema created successfully on Supabase

📦 Migrating data...
------------------------------------------------------------

🔄 Processing users...
  ✅ Migrated 4 rows

🔄 Processing waste_entries...
  ✅ Migrated 6 rows

🔄 Processing pickups...
  ✅ Migrated 3 rows

🔄 Processing recycling_stations...
  ✅ Migrated 5 rows

🔄 Processing transactions...
  ✅ Migrated 3 rows

🔄 Processing notifications...
  ✅ Migrated 3 rows

🔄 Processing rewards...
  ✅ Migrated 6 rows

============================================================
🎉 Migration Complete!
============================================================

📊 Migration Summary:
  • users: 4 rows
  • waste_entries: 6 rows
  • pickups: 3 rows
  • recycling_stations: 5 rows
  • transactions: 3 rows
  • notifications: 3 rows
  • rewards: 6 rows

  Total: 30 rows migrated

✅ All data successfully migrated to Supabase!
```

## Step 4: Verify Migration

### Check Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor**
4. Verify all tables are created:
   - users
   - waste_entries
   - pickups
   - recycling_stations
   - transactions
   - notifications
   - rewards
5. Check that data is present in each table

### Test Backend Connection

```bash
cd backend
python -c "from app.database import engine; print('✅ Connected:', engine.execute('SELECT 1').scalar())"
```

## Step 5: Test the Application

### Start Backend Server

```bash
cd backend
python run.py
```

### Test API Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"

# Get users
curl http://localhost:8000/api/users/
```

### Start Web Application

```bash
cd web
npm run dev
```

Visit http://localhost:3001 and test:
- ✅ Login functionality
- ✅ Dashboard data loading
- ✅ All feature pages

## Step 6: Update Frontend Configuration (Optional)

If you want to use Supabase's client libraries in the frontend:

### Web Application

Update `web/.env`:

```env
VITE_SUPABASE_URL=https://gtieccjexcvgrqhbwosd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
```

### Mobile Application

Update `mobile/.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://gtieccjexcvgrqhbwosd.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
```

## Step 7: Deploy to Production

### Update Render Configuration

Update `backend/render.yaml` with Supabase connection:

```yaml
envVars:
  - key: DATABASE_URL
    value: postgresql://postgres:YOUR_PASSWORD@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

Or set it as an environment variable in Render dashboard.

### Deploy

```bash
git add .
git commit -m "Migrate to Supabase database"
git push origin main
```

Render will automatically redeploy with the new Supabase connection.

## Troubleshooting

### Connection Error: "password authentication failed"

**Solution**: Double-check your database password in `backend/.env`

```bash
# Test connection
python -c "from app.database import engine; engine.connect()"
```

### Migration Script Error: "relation already exists"

**Solution**: The script drops existing tables. If you see this error, the tables already exist. You can:

1. Drop tables manually in Supabase dashboard
2. Or modify the script to skip table creation

### Data Not Appearing in Supabase

**Solution**: Check the migration script output for errors. Verify:

1. Local PostgreSQL is running
2. Local database has data
3. Supabase connection is working

### Backend Can't Connect to Supabase

**Solution**: Verify your `DATABASE_URL` format:

```env
# Correct format
DATABASE_URL=postgresql://postgres:password@db.PROJECT_REF.supabase.co:5432/postgres

# Common mistakes
❌ Missing password
❌ Wrong project ref
❌ Using http:// instead of postgresql://
```

## Benefits After Migration

### 1. **No Local Database Required**
- Backend connects directly to Supabase
- No need to run PostgreSQL locally
- Works from any machine

### 2. **Automatic Backups**
- Daily backups included
- Point-in-time recovery available
- No data loss risk

### 3. **Better Performance**
- Hosted on fast infrastructure
- Global CDN for low latency
- Automatic scaling

### 4. **Advanced Features**
- Real-time subscriptions (future feature)
- Row Level Security (RLS)
- Built-in authentication (optional)
- File storage (for images)

### 5. **Easy Deployment**
- Single connection string
- Works with Render, Vercel, etc.
- No database server management

## Next Steps

After successful migration:

1. ✅ **Test Thoroughly**: Test all features with Supabase
2. ✅ **Monitor Performance**: Check Supabase dashboard for metrics
3. ✅ **Set Up Backups**: Configure backup schedule in Supabase
4. ✅ **Enable RLS**: Add Row Level Security policies (optional)
5. ✅ **Optimize Queries**: Use Supabase query analyzer
6. ✅ **Deploy to Production**: Update production environment

## Rollback Plan

If you need to rollback to local PostgreSQL:

1. Update `backend/.env`:
   ```env
   DATABASE_URL=postgresql://postgres:Web12345@localhost:5432/TrashverseDB
   ```

2. Restart backend server

3. Your local data is still intact

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Community**: https://github.com/supabase/supabase/discussions

## Summary

✅ **Migration Complete!**

Your TrashVerse application is now running on Supabase:
- 🗄️ Database: Hosted PostgreSQL on Supabase
- 🔐 Authentication: FastAPI JWT (existing)
- 📧 Email: Resend API (existing)
- 🚀 Deployment: Ready for Render with Supabase

Enjoy the benefits of a fully managed database platform! 🎉
