# TrashVerse Deployment Guide

## ✅ Pre-Deployment Checklist

### Database & Storage
- [x] Switched to Supabase PostgreSQL database
- [x] Supabase Storage configured for file uploads
- [x] SystemSettings model added for persistent configuration
- [x] Admin settings now stored in database (not in-memory)

### Configuration Files
- [x] `web/vercel.json` - Vercel deployment config
- [x] `backend/render.yaml` - Render deployment config
- [x] Environment variables documented

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Supabase Database

1. **Login to Supabase**: https://supabase.com/dashboard
2. **Your Project**: `gtieccjexcvgrqhbwosd`
3. **Database is already configured** ✅

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Connect your repository

### Step 3: Deploy Backend

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Service**
   ```
   Name: trashverse-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
   Plan: Free
   ```

3. **Set Environment Variables**
   
   Click "Environment" tab and add:
   
   ```
   SECRET_KEY=trashverse-super-secret-key-change-in-production-2024
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=10080
   
   # Supabase Database
   DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
   
   # Supabase Storage
   SUPABASE_PROJECT_URL=https://gtieccjexcvgrqhbwosd.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
   
   # Email (Resend)
   RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
   DEFAULT_FROM_EMAIL=onboarding@resend.dev
   EMAIL_MODE=production
   PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
   
   # Environment
   ENVIRONMENT=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://trashverse-backend.onrender.com`

### Step 4: Initialize Database

After deployment, run migrations:

```bash
# SSH into Render service or use Render Shell
python -c "from app.database import engine, Base; from app import models; Base.metadata.create_all(bind=engine)"
```

Or use the Render dashboard Shell feature.

### Step 5: Create Admin User

```bash
# In Render Shell
python create_admin_user.py
```

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository

### Step 2: Configure Project

1. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: web
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Set Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=https://trashverse-backend.onrender.com
   ```
   
   **Important**: Replace with your actual Render backend URL!

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your site will be live at: `https://trashverse.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Part 3: Post-Deployment Configuration

### 1. Update CORS Settings

In `backend/app/main.py`, update allowed origins:

```python
origins = [
    "https://trashverse.vercel.app",  # Your Vercel domain
    "https://your-custom-domain.com",  # If you have one
]
```

Redeploy backend after this change.

### 2. Test the Deployment

1. **Visit Frontend**: https://trashverse.vercel.app
2. **Test Login**: Use admin credentials
3. **Test API**: Check if data loads
4. **Test File Upload**: Try uploading waste images
5. **Test Admin Panel**: Access `/admin`

### 3. Create Storage Buckets

Run this once to create Supabase storage buckets:

```python
from app.storage import create_storage_buckets
create_storage_buckets()
```

---

## Part 4: Environment Variables Reference

### Backend (Render)

| Variable | Value | Required |
|----------|-------|----------|
| SECRET_KEY | Your secret key | Yes |
| DATABASE_URL | Supabase PostgreSQL URL | Yes |
| SUPABASE_PROJECT_URL | Supabase project URL | Yes |
| SUPABASE_ANON_KEY | Supabase anon key | Yes |
| RESEND_API_KEY | Resend API key | Yes |
| DEFAULT_FROM_EMAIL | Email sender | Yes |
| EMAIL_MODE | production | Yes |
| ENVIRONMENT | production | Yes |
| ALGORITHM | HS256 | Yes |
| ACCESS_TOKEN_EXPIRE_MINUTES | 10080 | Yes |

### Frontend (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| VITE_API_URL | Backend URL | Yes |

---

## Part 5: Monitoring & Maintenance

### Render Dashboard
- Monitor logs: https://dashboard.render.com
- Check service health
- View deployment history

### Vercel Dashboard
- Monitor deployments: https://vercel.com/dashboard
- Check analytics
- View build logs

### Supabase Dashboard
- Monitor database: https://supabase.com/dashboard
- Check storage usage
- View API logs

---

## Part 6: Troubleshooting

### Backend Issues

**Problem**: 500 Internal Server Error
**Solution**: 
- Check Render logs
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

**Problem**: Database connection failed
**Solution**:
- Verify Supabase credentials
- Check if database is accessible
- Test connection string

**Problem**: File uploads failing
**Solution**:
- Verify SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY
- Check storage buckets exist
- Verify bucket permissions

### Frontend Issues

**Problem**: API calls failing
**Solution**:
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed

**Problem**: Blank pages
**Solution**:
- Check browser console for errors
- Verify all routes are configured
- Hard refresh (Ctrl+Shift+R)

---

## Part 7: Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment
3. **Merge to main** → Production deployment

### Manual Deployments

**Render**:
- Go to dashboard
- Click "Manual Deploy" → "Deploy latest commit"

**Vercel**:
- Go to dashboard
- Click "Redeploy"

---

## Part 8: Security Checklist

- [ ] Change SECRET_KEY to a strong random value
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set up rate limiting
- [ ] Enable Supabase RLS (Row Level Security)
- [ ] Review CORS settings
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Backup database regularly

---

## Part 9: Cost Estimation

### Free Tier Limits

**Render Free**:
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Vercel Free**:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Supabase Free**:
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth

### Upgrade Recommendations

When to upgrade:
- More than 1000 daily active users
- Need faster response times
- Require more storage
- Need 24/7 uptime

---

## Part 10: Success Criteria

✅ Backend deployed and accessible
✅ Frontend deployed and accessible
✅ Database connected to Supabase
✅ File uploads working with Supabase Storage
✅ Admin settings persisted in database
✅ Email notifications working
✅ Authentication working
✅ All features functional

---

## Quick Deploy Commands

### Backend
```bash
cd backend
pip install -r requirements.txt
gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend
```bash
cd web
npm install
npm run build
```

---

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Render/Vercel logs
3. Check Supabase dashboard
4. Verify environment variables

---

**Deployment Status**: ✅ Ready for Production

All configurations are in place. Follow the steps above to deploy!
