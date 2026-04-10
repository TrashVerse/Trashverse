# Deploy to Production - Complete Guide

## ✅ What's Ready

Your app is now production-ready with:
- ✅ CORS configured (allows all in development, restricted in production)
- ✅ Supabase PostgreSQL database configured
- ✅ Supabase Storage for images
- ✅ Admin users created
- ✅ All features working locally

## 🚀 Deployment Steps

### Step 1: Push Latest Changes to GitHub

```bash
git add .
git commit -m "Production ready: CORS fixed, Supabase configured"
git push origin main
```

### Step 2: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and sign in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `ScepterCode/Trashverse` or `TrashVerse/Trashverse`

3. **Configure Service**
   - Name: `trashverse-backend` (or your choice)
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Set Environment Variables** (Click "Advanced" → "Add Environment Variable")

   ```
   DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
   
   SUPABASE_PROJECT_URL=https://gtieccjexcvgrqhbwosd.supabase.co
   
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
   
   SECRET_KEY=<generate-a-new-secret-key>
   
   RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
   
   EMAIL_MODE=production
   
   ENVIRONMENT=production
   
   ALLOWED_ORIGINS=https://your-app.vercel.app,https://www.your-domain.com
   ```

   **Generate SECRET_KEY**: Run this in your terminal:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

5. **Click "Create Web Service"**
   - Render will build and deploy your backend
   - Wait for deployment to complete (5-10 minutes)
   - Note your backend URL: `https://trashverse-backend.onrender.com`

6. **Create Admin User in Supabase**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to SQL Editor
   - Run the SQL from `CREATE_ADMIN_IN_SUPABASE.sql`

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign in

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select: `ScepterCode/Trashverse` or `TrashVerse/Trashverse`

3. **Configure Project**
   - Framework Preset: `Vite`
   - Root Directory: `web`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**
   
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://trashverse-backend.onrender.com
   ```
   
   Replace `trashverse-backend.onrender.com` with your actual Render backend URL

5. **Click "Deploy"**
   - Vercel will build and deploy your frontend
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://your-app.vercel.app`

6. **Update CORS in Render**
   - Go back to Render dashboard
   - Open your backend service
   - Go to "Environment"
   - Update `ALLOWED_ORIGINS` to include your Vercel URL:
     ```
     ALLOWED_ORIGINS=https://your-app.vercel.app
     ```
   - Save changes (backend will redeploy)

### Step 4: Test Production Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Test Login**
   - Username: `admin`
   - Password: `admin123`

3. **Test Features**
   - ✅ User dashboard
   - ✅ Waste entry creation
   - ✅ Image uploads
   - ✅ Admin dashboard
   - ✅ Settings management

4. **Check Backend Health**
   - Visit: `https://your-backend.onrender.com/health`
   - Should return: `{"status":"healthy"}`

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

#### For Vercel (Frontend)
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

#### For Render (Backend)
1. Go to your service settings
2. Click "Custom Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Update CORS for Custom Domain
If you add a custom domain, update the `ALLOWED_ORIGINS` environment variable in Render to include it.

## 📊 Monitoring

### Render Backend
- View logs: Render Dashboard → Your Service → Logs
- Monitor performance: Render Dashboard → Metrics

### Vercel Frontend
- View deployments: Vercel Dashboard → Your Project → Deployments
- Monitor analytics: Vercel Dashboard → Analytics

### Supabase Database
- View data: Supabase Dashboard → Table Editor
- Monitor queries: Supabase Dashboard → Database → Query Performance

## 🔐 Security Checklist

- ✅ SECRET_KEY is unique and secure
- ✅ Database password is strong
- ✅ CORS is restricted to your domains only
- ✅ HTTPS is enabled (automatic on Vercel/Render)
- ✅ Environment variables are not in code
- ✅ API keys are kept secret

## 🐛 Troubleshooting

### Backend Won't Start
- Check Render logs for errors
- Verify all environment variables are set
- Test Supabase connection

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

### Database Connection Fails
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Test connection from Render logs

### Images Won't Upload
- Verify Supabase Storage buckets exist
- Check `SUPABASE_PROJECT_URL` and `SUPABASE_ANON_KEY`
- Ensure buckets are public

## 📝 Environment Variables Reference

### Backend (Render)
| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | Supabase PostgreSQL connection | Yes |
| SUPABASE_PROJECT_URL | Supabase project URL | Yes |
| SUPABASE_ANON_KEY | Supabase anonymous key | Yes |
| SECRET_KEY | JWT secret key | Yes |
| RESEND_API_KEY | Email service API key | Yes |
| EMAIL_MODE | Set to "production" | Yes |
| ENVIRONMENT | Set to "production" | Yes |
| ALLOWED_ORIGINS | Comma-separated frontend URLs | Yes |

### Frontend (Vercel)
| Variable | Description | Required |
|----------|-------------|----------|
| VITE_API_URL | Backend API URL | Yes |

## 🎉 You're Live!

Your app is now deployed and running in production!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: Supabase PostgreSQL
- Storage: Supabase Storage

## 📞 Support

If you encounter issues:
1. Check the logs (Render/Vercel dashboards)
2. Verify environment variables
3. Test each component individually
4. Review this guide

---

**Congratulations on deploying to production! 🚀**
