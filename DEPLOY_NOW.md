# 🚀 Deploy Now - Quick Start

## Ready to Deploy in 3 Steps!

---

## Step 1: Deploy Backend (10 minutes)

### 1.1 Go to Render
Visit: https://render.com/signup

### 1.2 Create Web Service
- Click "New +" → "Web Service"
- Connect GitHub → Select your repository
- Configure:
  ```
  Name: trashverse-backend
  Root Directory: backend
  Build Command: pip install -r requirements.txt
  Start Command: gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
  ```

### 1.3 Add Environment Variables
Copy these (update SECRET_KEY):
```
SECRET_KEY=your-new-secret-key-here
DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres
SUPABASE_PROJECT_URL=https://gtieccjexcvgrqhbwosd.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWVjY2pleGN2Z3JxaGJ3b3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDU4NzAsImV4cCI6MjA5MDMyMTg3MH0.K5Uhdhn9CDr-FKoFVbGVkN9-KX4ZmDlinyAxSzjello
RESEND_API_KEY=re_imeqaLTJ_LMycHLq3YEs1R9XAiHqD9VvW
DEFAULT_FROM_EMAIL=onboarding@resend.dev
EMAIL_MODE=production
ENVIRONMENT=production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### 1.4 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes
- Copy your backend URL: `https://trashverse-backend-xxxx.onrender.com`

---

## Step 2: Deploy Frontend (5 minutes)

### 2.1 Go to Vercel
Visit: https://vercel.com/signup

### 2.2 Import Project
- Click "Add New..." → "Project"
- Import from GitHub → Select your repository
- Configure:
  ```
  Framework: Vite
  Root Directory: web
  Build Command: npm run build
  Output Directory: dist
  ```

### 2.3 Add Environment Variable
```
VITE_API_URL=https://your-backend-url.onrender.com
```
**Replace with your actual Render URL from Step 1.4!**

### 2.4 Deploy
- Click "Deploy"
- Wait 2-5 minutes
- Your site is live! 🎉

---

## Step 3: Initialize (5 minutes)

### 3.1 Open Render Shell
- Go to Render dashboard
- Click your service → "Shell"

### 3.2 Initialize Settings
```bash
python init_system_settings.py
```

### 3.3 Create Admin User
```bash
python create_admin_user.py
```
Follow prompts to create admin account.

---

## ✅ Done!

Your app is now live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Admin**: https://your-app.vercel.app/admin

---

## 🧪 Test It

1. Visit your frontend URL
2. Click "Get Started"
3. Create an account
4. Login
5. Test features
6. Login as admin
7. Access `/admin`

---

## 🔧 If Something Goes Wrong

### Backend Issues
- Check Render logs
- Verify environment variables
- Test database connection

### Frontend Issues
- Check Vercel logs
- Verify VITE_API_URL
- Hard refresh (Ctrl+Shift+R)

### Need Help?
Read: `DEPLOYMENT_GUIDE.md` for detailed instructions

---

## 📊 Monitor Your App

### Render Dashboard
https://dashboard.render.com
- View logs
- Monitor performance
- Check deployments

### Vercel Dashboard
https://vercel.com/dashboard
- View analytics
- Check builds
- Monitor errors

### Supabase Dashboard
https://supabase.com/dashboard
- Monitor database
- Check storage
- View logs

---

## 🎉 Congratulations!

Your waste management platform is now live and running in the cloud!

**What's Next?**
- Share with users
- Monitor performance
- Collect feedback
- Iterate and improve

---

**Total Time**: ~20 minutes
**Cost**: $0 (Free tier)
**Status**: LIVE! 🚀
