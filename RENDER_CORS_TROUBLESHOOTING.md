# Render CORS Troubleshooting Guide

## Latest Changes (Just Pushed)

### 1. Added CORS Debugging Logs
The backend now logs the allowed origins on startup. Check Render logs to see:
```
CORS allowed origins: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://trashverse.netlify.app']
Environment: production
```

### 2. Updated render.yaml
- Added `rootDir: backend` to ensure Render looks in the correct directory
- Added `ALLOWED_ORIGINS` environment variable with Netlify URL

### 3. Version Bump
- Changed version from `1.0.0` to `1.0.1` to verify deployment
- Added CORS info to health endpoint

## How to Verify Deployment

### Step 1: Check Version
Visit: https://trashverse.onrender.com/health

If you see `"version": "1.0.1"`, the new code is deployed.
If you see `"version": "1.0.0"`, Render hasn't deployed the latest code yet.

### Step 2: Check Render Logs
1. Go to Render dashboard
2. Click on `trashverse-backend`
3. Click "Logs" tab
4. Look for these lines on startup:
   ```
   CORS allowed origins: [...]
   Environment: production
   ```

### Step 3: Check Render Settings
1. In Render dashboard, go to `trashverse-backend`
2. Click "Settings" tab
3. Verify:
   - **Branch**: Should be `main`
   - **Root Directory**: Should be `backend` (or empty if using render.yaml)
   - **Auto-Deploy**: Should be enabled

## Manual Redeploy Steps

### Option 1: Clear Build Cache
1. Go to Render dashboard → trashverse-backend
2. Click "Settings"
3. Scroll to "Build & Deploy"
4. Click "Clear build cache & deploy"
5. Wait 3-5 minutes

### Option 2: Force Redeploy
1. Go to Render dashboard → trashverse-backend
2. Click "Manual Deploy" dropdown (top right)
3. Select "Clear build cache & deploy"
4. Wait 3-5 minutes

### Option 3: Trigger via Git
Make a small change to force deployment:
```bash
cd backend
echo "# Force redeploy" >> README.md
git add README.md
git commit -m "Force Render redeploy"
git push origin main
```

## Check Render Configuration

### Verify Environment Variables
In Render dashboard → trashverse-backend → Environment:

Required variables:
- `ENVIRONMENT` = `production`
- `DATABASE_URL` = (your Supabase connection string)
- `SECRET_KEY` = (auto-generated)
- `SUPABASE_PROJECT_URL` = `https://gtieccjexcvgrqhbwosd.supabase.co`
- `SUPABASE_ANON_KEY` = (your Supabase anon key)
- `RESEND_API_KEY` = (your Resend API key)
- `ALLOWED_ORIGINS` = `https://trashverse.netlify.app` (NEW - add this!)

### Verify Repository Connection
1. In Render dashboard → trashverse-backend → Settings
2. Check "Repository" section
3. Should show: `TrashVerse/Trashverse` or `ScepterCode/Trashverse`
4. Branch: `main`

## If CORS Still Doesn't Work

### Check 1: Is Render Using render.yaml?
If Render is configured via the dashboard (not render.yaml), you need to:
1. Go to Settings → Environment
2. Manually add: `ALLOWED_ORIGINS` = `https://trashverse.netlify.app`
3. Click "Save Changes"
4. Render will auto-redeploy

### Check 2: Root Directory
If your Render service was created before adding `rootDir: backend` to render.yaml:
1. Go to Settings → Build & Deploy
2. Set "Root Directory" to `backend`
3. Save and redeploy

### Check 3: Build Command
Verify build command is:
```
pip install -r requirements.txt
```

And start command is:
```
gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

## Alternative: Temporarily Allow All Origins

If you need to test immediately while troubleshooting, you can temporarily allow all origins:

1. In Render dashboard → Environment
2. Add: `CORS_ALLOW_ALL` = `true`
3. Update `backend/app/main.py`:
```python
if os.getenv("CORS_ALLOW_ALL") == "true":
    allowed_origins = ["*"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=False,  # Must be False with "*"
        allow_methods=["*"],
        allow_headers=["*"],
    )
```

**WARNING**: This is insecure and should only be used for testing!

## Expected Behavior After Fix

Once deployed correctly:
1. Visit https://trashverse.netlify.app
2. Try to login or signup
3. No CORS errors in browser console
4. API calls succeed
5. You can login with: `admin` / `admin123`

## Contact Render Support

If none of the above works, contact Render support with:
- Service name: `trashverse-backend`
- Issue: "CORS configuration not updating after code push"
- Repository: `TrashVerse/Trashverse` or `ScepterCode/Trashverse`
- Branch: `main`
- Expected behavior: CORS should allow `https://trashverse.netlify.app`
