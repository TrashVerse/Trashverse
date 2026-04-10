# 🚀 Quick Deployment Guide

## What You Need
1. Render account (backend)
2. Vercel account (frontend)
3. Supabase database setup complete

## 3-Step Deployment

### 1️⃣ Setup Supabase Database (5 minutes)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open SQL Editor
3. Copy and paste contents of `SUPABASE_SETUP_COMPLETE.sql`
4. Click "Run"
5. ✅ Done! Tables and admin users created

### 2️⃣ Deploy Backend to Render (10 minutes)

1. Go to [Render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Configure:
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
   SUPABASE_PROJECT_URL=https://gtieccjexcvgrqhbwosd.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
   SECRET_KEY=<generate-new-key>
   RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
   EMAIL_MODE=production
   ENVIRONMENT=production
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ```
5. Deploy
6. Copy your backend URL: `https://your-backend.onrender.com`

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3️⃣ Deploy Frontend to Vercel (5 minutes)

1. Go to [Vercel.com](https://vercel.com) → New Project
2. Import GitHub repo
3. Configure:
   - Root Directory: `web`
   - Framework: Vite
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
   (Use your actual Render URL from step 2)
5. Deploy
6. Copy your frontend URL: `https://your-app.vercel.app`
7. Go back to Render → Update `ALLOWED_ORIGINS` with your Vercel URL

## Test Your Deployment

1. Visit: `https://your-app.vercel.app`
2. Login: username=`admin`, password=`admin123`
3. Test features:
   - Create waste entry
   - Upload image
   - Check admin dashboard

## 🎉 You're Live!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: Supabase PostgreSQL
- Storage: Supabase Storage

## Detailed Guides

- **Supabase Setup**: See `SUPABASE_SETUP_COMPLETE.sql`
- **Backend Deployment**: See `DEPLOY_TO_PRODUCTION.md`
- **Frontend Deployment**: See `VERCEL_DEPLOYMENT_GUIDE.md`

## Common Issues

### Backend won't start
- Check Render logs
- Verify all environment variables are set
- Test Supabase connection

### Frontend can't connect
- Verify `VITE_API_URL` is correct
- Check backend CORS includes your Vercel URL
- Test backend health endpoint

### Login doesn't work
- Verify admin users were created in Supabase
- Check backend logs for errors
- Test backend `/api/auth/login` endpoint

## Admin Credentials

- Username: `admin`
- Password: `admin123`

(Change these after first login!)

---

**Total Time: ~20 minutes**
**Difficulty: Easy**
**Cost: Free tier available on all platforms**
