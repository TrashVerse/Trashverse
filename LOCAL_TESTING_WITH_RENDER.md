# Local Frontend Testing with Render Backend

## Goal
Test the production Render backend (`https://trashverse.onrender.com`) using your local frontend to debug CORS and internal server issues.

## Setup Complete ✅

I've created `web/.env.local` which configures your local frontend to connect to the Render backend.

## How to Start Testing

### 1. Start the Local Frontend
```bash
cd web
npm run dev
```

This will start the Vite dev server on `http://localhost:5173`

### 2. Open Browser
Navigate to: `http://localhost:5173`

### 3. Open Browser DevTools
Press `F12` to open DevTools and go to:
- **Console tab** - to see errors
- **Network tab** - to see API requests

## What to Test

### Test 1: Health Check
1. Open browser console
2. Run this command:
```javascript
fetch('https://trashverse.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

**Expected result:**
```json
{
  "status": "healthy",
  "version": "1.0.1",
  "environment": "production",
  "cors_configured": true,
  "allowed_origins_count": 4
}
```

### Test 2: Login
1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"
4. Watch the Network tab for the request

**What to check:**
- Request URL should be: `https://trashverse.onrender.com/api/auth/login`
- Method: `POST`
- Status: Should be `200` (success) or show specific error
- Response: Check the response body for error details

### Test 3: Signup
1. Go to `http://localhost:5173/signup`
2. Fill in the form with test data
3. Click "Sign Up"
4. Watch the Network tab

**What to check:**
- Request URL: `https://trashverse.onrender.com/api/auth/register`
- Status code and response body

## Common Issues and How to Debug

### Issue 1: CORS Error
**Error message:**
```
Access to XMLHttpRequest at 'https://trashverse.onrender.com/api/...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**How to check:**
1. Go to Render dashboard → trashverse-backend → Logs
2. Look for the startup log line:
   ```
   CORS allowed origins: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://trashverse.netlify.app']
   ```
3. Verify `http://localhost:5173` is in the list

**If not in the list:**
- The backend hasn't deployed the latest code
- Manually redeploy on Render

### Issue 2: 500 Internal Server Error
**What it means:**
The backend received the request but encountered an error processing it.

**How to debug:**
1. Go to Render dashboard → trashverse-backend → Logs
2. Look for error messages around the time you made the request
3. Common causes:
   - Database connection issues
   - Missing environment variables
   - Code errors in the backend

**Check these in Render:**
- `DATABASE_URL` is set correctly
- `SECRET_KEY` is set
- `SUPABASE_PROJECT_URL` and `SUPABASE_ANON_KEY` are set

### Issue 3: 404 Not Found
**What it means:**
The endpoint doesn't exist on the backend.

**How to check:**
1. Verify the request URL in Network tab
2. Should be: `https://trashverse.onrender.com/api/auth/login` (not `/auth/login`)
3. Check if the backend is running: visit `https://trashverse.onrender.com/health`

### Issue 4: Timeout
**What it means:**
The backend is taking too long to respond (>10 seconds).

**Possible causes:**
- Render free tier cold start (first request after inactivity)
- Database connection timeout
- Backend is down

**Solution:**
- Wait 30 seconds and try again (cold start)
- Check Render dashboard to see if backend is "Live"

## Debugging Checklist

When you encounter an error, check these in order:

1. ✅ **Frontend is running**: `http://localhost:5173` loads
2. ✅ **Backend is live**: Visit `https://trashverse.onrender.com/health`
3. ✅ **Request URL is correct**: Check Network tab
4. ✅ **CORS headers present**: Check Response Headers in Network tab for `Access-Control-Allow-Origin`
5. ✅ **Status code**: 
   - 200 = Success
   - 401 = Unauthorized (wrong credentials)
   - 404 = Endpoint not found
   - 500 = Server error (check Render logs)
6. ✅ **Response body**: Check for error message details

## Useful Browser Console Commands

### Check current API URL
```javascript
console.log(import.meta.env.VITE_API_URL)
// Should output: https://trashverse.onrender.com
```

### Test API connection
```javascript
fetch('https://trashverse.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('Backend health:', d))
  .catch(e => console.error('Backend error:', e))
```

### Test login endpoint
```javascript
fetch('https://trashverse.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
})
  .then(r => r.json())
  .then(d => console.log('Login response:', d))
  .catch(e => console.error('Login error:', e))
```

## Render Backend Logs

To view real-time logs:
1. Go to https://dashboard.render.com/
2. Click on `trashverse-backend`
3. Click "Logs" tab
4. Keep this open while testing
5. Watch for errors when you make requests from local frontend

## Environment Variables

Your local frontend is configured with:
- `VITE_API_URL` = `https://trashverse.onrender.com`
- `VITE_SUPABASE_URL` = Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key

These are loaded from `web/.env.local` (already created).

## Expected Workflow

1. Start local frontend: `cd web && npm run dev`
2. Open `http://localhost:5173` in browser
3. Open DevTools (F12)
4. Try to login/signup
5. Check Network tab for request details
6. Check Console tab for errors
7. Check Render logs for backend errors
8. Report findings with:
   - Request URL
   - Status code
   - Error message from console
   - Error message from Render logs

## Quick Test Script

Run this in your terminal to verify the backend is accessible:

```bash
# Test health endpoint
curl https://trashverse.onrender.com/health

# Test login endpoint
curl -X POST https://trashverse.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Next Steps

1. Start the frontend: `cd web && npm run dev`
2. Test login/signup
3. Share any errors you see:
   - Screenshot of browser console
   - Screenshot of Network tab
   - Copy of Render logs
   - Specific error messages

This will help identify whether the issue is:
- CORS configuration
- Backend code error
- Database connection
- Environment variables
- Authentication logic
