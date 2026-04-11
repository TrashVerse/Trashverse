# Manual Render Redeploy Instructions

## Issue
The CORS configuration has been updated in the code, but Render hasn't automatically redeployed yet.

## Solution: Force Manual Redeploy

### Option 1: Via Render Dashboard (Recommended)
1. Go to https://dashboard.render.com/
2. Find your `trashverse-backend` service
3. Click on the service name
4. Click the "Manual Deploy" button in the top right
5. Select "Deploy latest commit" from the dropdown
6. Click "Deploy"
7. Wait 2-3 minutes for deployment to complete

### Option 2: Via Git Push (Alternative)
If Render's auto-deploy is enabled but not working:
1. Make a small change to trigger deployment (already done - we pushed the CORS fix)
2. Check the "Events" tab in Render dashboard to see if deployment started
3. If no deployment is shown, use Option 1 above

## What Was Fixed
The backend CORS configuration now explicitly includes:
- `https://trashverse.netlify.app` (your production frontend)
- All localhost URLs for development
- Removed the wildcard `["*"]` which doesn't work with credentials

## After Deployment
Once Render shows "Live" status:
1. Go to https://trashverse.netlify.app
2. Try logging in with: `admin` / `admin123`
3. Or try signing up with a new account
4. CORS errors should be gone

## Verify Deployment
Check if the new code is deployed by visiting:
https://trashverse.onrender.com/health

It should return:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "production"
}
```

## Still Having Issues?
If CORS errors persist after manual redeploy:
1. Check Render logs for any startup errors
2. Verify environment variables are set correctly in Render dashboard
3. Make sure `ENVIRONMENT=production` is set in Render environment variables
