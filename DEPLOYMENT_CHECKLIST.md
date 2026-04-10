# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Code Preparation
- [x] Database switched to Supabase
- [x] Admin settings use database storage
- [x] Supabase storage configured
- [x] All environment variables documented
- [x] Deployment configs created
- [x] Dependencies updated (supabase added to requirements.txt)

### 2. Test Locally
```bash
cd backend
python test_deployment_ready.py
```

Expected output: All tests pass ✅

### 3. Initialize Database
```bash
cd backend
python init_system_settings.py
```

### 4. Create Admin User
```bash
cd backend
python create_admin_user.py
```

---

## Backend Deployment (Render)

### Step 1: Create Render Account
- [ ] Sign up at https://render.com
- [ ] Connect GitHub account
- [ ] Verify email

### Step 2: Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Select repository
- [ ] Configure settings:
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

### Step 3: Set Environment Variables
Copy from `backend/.env` and set in Render:

- [ ] SECRET_KEY
- [ ] DATABASE_URL (Supabase)
- [ ] SUPABASE_PROJECT_URL
- [ ] SUPABASE_ANON_KEY
- [ ] RESEND_API_KEY
- [ ] DEFAULT_FROM_EMAIL
- [ ] EMAIL_MODE=production
- [ ] ENVIRONMENT=production
- [ ] ALGORITHM=HS256
- [ ] ACCESS_TOKEN_EXPIRE_MINUTES=10080

### Step 4: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Note backend URL: `https://trashverse-backend.onrender.com`

### Step 5: Post-Deployment
- [ ] Test backend URL: `https://your-backend.onrender.com/docs`
- [ ] Run initialization scripts (if needed)
- [ ] Create admin user (if needed)

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
- [ ] Sign up at https://vercel.com
- [ ] Connect GitHub account
- [ ] Verify email

### Step 2: Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Select repository
- [ ] Configure settings:
  ```
  Framework: Vite
  Root Directory: web
  Build Command: npm run build
  Output Directory: dist
  Install Command: npm install
  ```

### Step 3: Set Environment Variables
- [ ] VITE_API_URL=https://your-backend.onrender.com

**Important**: Use your actual Render backend URL!

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-5 minutes)
- [ ] Note frontend URL: `https://trashverse.vercel.app`

### Step 5: Post-Deployment
- [ ] Test frontend URL
- [ ] Test login functionality
- [ ] Test admin panel
- [ ] Test file uploads

---

## Post-Deployment Configuration

### 1. Update CORS
In `backend/app/main.py`, add your Vercel domain:
```python
origins = [
    "https://trashverse.vercel.app",
    "https://your-custom-domain.com",
]
```
Redeploy backend after this change.

### 2. Create Storage Buckets
Run once in Render Shell:
```python
from app.storage import create_storage_buckets
create_storage_buckets()
```

### 3. Test All Features
- [ ] User registration
- [ ] User login
- [ ] Waste entry submission
- [ ] File upload
- [ ] Pickup requests
- [ ] Rewards redemption
- [ ] Admin login
- [ ] Admin dashboard
- [ ] Admin settings
- [ ] Email notifications

---

## Verification

### Backend Health Check
```bash
curl https://your-backend.onrender.com/docs
```
Should return API documentation page.

### Frontend Health Check
Visit: `https://your-frontend.vercel.app`
Should load homepage.

### Database Check
```bash
# In Render Shell
python test_deployment_ready.py
```
All tests should pass.

---

## Troubleshooting

### Backend Issues

**Problem**: Build fails
- Check requirements.txt has all dependencies
- Verify Python version compatibility
- Check Render build logs

**Problem**: Database connection fails
- Verify DATABASE_URL is correct
- Check Supabase database is accessible
- Test connection string

**Problem**: 500 errors
- Check Render logs
- Verify all environment variables are set
- Test locally first

### Frontend Issues

**Problem**: API calls fail
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Verify backend is deployed and running

**Problem**: Blank pages
- Check browser console for errors
- Verify all routes are configured
- Hard refresh (Ctrl+Shift+R)

**Problem**: Build fails
- Check package.json dependencies
- Verify Node version
- Check Vercel build logs

---

## Rollback Plan

### If Deployment Fails

**Backend**:
1. Check Render logs
2. Fix issues locally
3. Push to GitHub
4. Render auto-redeploys

**Frontend**:
1. Check Vercel logs
2. Fix issues locally
3. Push to GitHub
4. Vercel auto-redeploys

### Emergency Rollback
- Render: Click "Rollback" in dashboard
- Vercel: Select previous deployment and promote

---

## Success Criteria

✅ Backend deployed and accessible
✅ Frontend deployed and accessible
✅ Database connected to Supabase
✅ File uploads working
✅ Admin settings persisted
✅ Email notifications working
✅ Authentication working
✅ All features functional

---

## Monitoring

### Daily Checks
- [ ] Check Render service status
- [ ] Check Vercel deployment status
- [ ] Monitor error logs
- [ ] Check database usage

### Weekly Checks
- [ ] Review Supabase storage usage
- [ ] Check email delivery rates
- [ ] Monitor API response times
- [ ] Review user feedback

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **React Docs**: https://react.dev

---

## Final Notes

- Keep environment variables secure
- Never commit .env files
- Regular backups of database
- Monitor costs and usage
- Update dependencies regularly

**Status**: Ready for deployment! 🚀
