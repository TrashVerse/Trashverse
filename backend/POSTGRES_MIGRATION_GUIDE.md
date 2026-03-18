# PostgreSQL Migration Guide

## Step 1: Update .env File with Your PostgreSQL Credentials

You need to update the `DATABASE_URL` in your `.env` file with your actual PostgreSQL credentials.

Replace this line in `backend/.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/trashverse_db
```

With your actual credentials. The format is:
```
DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/[database_name]
```

### Common Examples:

**Local PostgreSQL:**
```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/trashverse_db
```

**Cloud PostgreSQL (like Supabase, Neon, etc.):**
```
DATABASE_URL=postgresql://username:password@host.region.provider.com:5432/database_name
```

**With SSL (for cloud providers):**
```
DATABASE_URL=postgresql://username:password@host:5432/database_name?sslmode=require
```

## Step 2: Create the Database

Make sure your PostgreSQL database exists. You can create it using:

```sql
CREATE DATABASE trashverse_db;
```

Or use your cloud provider's interface to create the database.

## Step 3: Run the Migration

Once you've updated the `.env` file with correct credentials, run these commands:

### 3.1 Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3.2 Create Database Schema
```bash
alembic upgrade head
```

### 3.3 Migrate Data from SQLite
```bash
python migrate_to_postgres.py
```

## Step 4: Verify Migration

After migration, you can verify the data was transferred correctly by:

1. Starting the backend server:
```bash
python run.py
```

2. Testing the login with existing credentials:
   - Username: charles
   - Password: password123

## Troubleshooting

### Connection Issues
- Verify your PostgreSQL server is running
- Check firewall settings
- Ensure the database exists
- Verify credentials are correct

### SSL Issues (for cloud providers)
Add `?sslmode=require` to your DATABASE_URL if using a cloud provider.

### Permission Issues
Make sure your PostgreSQL user has CREATE, INSERT, UPDATE, DELETE permissions on the database.

## What the Migration Does

1. **Exports all data** from SQLite to a JSON file
2. **Creates PostgreSQL schema** using Alembic migrations
3. **Imports all data** to PostgreSQL while preserving:
   - All user accounts and passwords
   - Waste entries and transactions
   - Recycling stations and rewards
   - Notifications and pickups
   - All relationships and foreign keys
4. **Updates sequences** so new records get correct IDs

## Rollback Plan

If something goes wrong, you can always:
1. Change DATABASE_URL back to SQLite in .env
2. Your original SQLite database remains untouched
3. Restart the backend to use SQLite again

The migration is non-destructive - your SQLite data is preserved.