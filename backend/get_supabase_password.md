# Get Your Supabase Database Password

## Quick Steps

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon in sidebar)
   - Click on **Database**

3. **Find Connection String**
   - Scroll to **Connection string** section
   - Select **URI** tab
   - You'll see something like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
     ```

4. **Get the Password**
   - If you see `[YOUR-PASSWORD]`, you need to reset it
   - Scroll down to **Database Password** section
   - Click **Reset database password**
   - Copy the new password (you won't see it again!)

5. **Update backend/.env**
   - Replace `[YOUR-PASSWORD]` with your actual password:
     ```env
     DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
     ```

## Example

If your password is `MySecurePass123!`, your DATABASE_URL should be:

```env
DATABASE_URL=postgresql://postgres:MySecurePass123!@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
```

## After Updating

Run the migration:

```bash
cd backend
python test_supabase_connection.py
python migrate_to_supabase.py
```
