# Manual Supabase Migration Guide

## Issue: Direct Database Connection Blocked

Your network/firewall is blocking direct PostgreSQL connections (port 5432). This is common in corporate or restricted networks.

## Solution: Use Supabase SQL Editor

We've generated SQL files that you can run directly in the Supabase dashboard.

## Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/sql
2. You should see the SQL Editor interface

### Step 2: Create the Schema

1. Open the file: `backend/supabase_schema.sql`
2. Copy ALL the content
3. Paste it into the Supabase SQL Editor
4. Click "Run" or press Ctrl+Enter
5. You should see: "Schema created successfully!"

This creates all 7 tables:
- users
- waste_entries
- pickups
- recycling_stations
- transactions
- notifications
- rewards

### Step 3: Import the Data

1. Open the file: `backend/supabase_data.sql`
2. Copy ALL the content
3. Paste it into the Supabase SQL Editor
4. Click "Run" or press Ctrl+Enter
5. You should see: "Data imported successfully!"

### Step 4: Verify Migration

1. Go to: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/editor
2. Click on each table to verify data:
   - users (should have 4 rows)
   - waste_entries (should have 6 rows)
   - pickups (should have 3 rows)
   - recycling_stations (should have 5 rows)
   - transactions (should have 3 rows)
   - notifications (should have 3 rows)
   - rewards (should have 6 rows)

### Step 5: Test the Application

1. Start the backend:
   ```bash
   cd backend
   python run.py
   ```

2. The backend will now connect to Supabase
3. Test login at: http://localhost:8000/docs

## What Was Migrated

✅ All user accounts with passwords
✅ All waste submissions
✅ All pickup requests
✅ All recycling station locations
✅ All transaction history
✅ All notifications
✅ All reward items

## Files Generated

- `supabase_schema.sql` - Creates all tables and indexes
- `supabase_data.sql` - Inserts all your data

## Troubleshooting

### "relation already exists"
- Tables already exist
- Run the DROP TABLE commands first
- Or delete tables manually in Table Editor

### "syntax error"
- Make sure you copied the ENTIRE file
- Check for any truncation
- Try running in smaller chunks

### "foreign key violation"
- Make sure you ran schema.sql BEFORE data.sql
- Schema must be created first

## After Migration

Your application is now using Supabase! 🎉

Benefits:
- ✅ No local PostgreSQL needed
- ✅ Automatic daily backups
- ✅ Better performance
- ✅ Ready for production deployment

## Next Steps

1. Test all features in your application
2. Verify data integrity
3. Deploy to production with Supabase connection
4. Update Render environment variables

## Connection String

Your backend is configured to use:
```
DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

Even though direct connection from your machine is blocked, the backend server (when deployed) will be able to connect.
