# 🚀 Local Testing Environment Ready!

## Status: ✅ RUNNING

Your local frontend is now running and connected to the Render backend!

## Access Points

- **Local Frontend**: http://localhost:3002
- **Backend API**: https://trashverse.onrender.com
- **Backend Health**: https://trashverse.onrender.com/health

## Configuration

The frontend is configured via `web/.env.local`:
```
VITE_API_URL=https://trashverse.onrender.com
```

This means all API calls from your local frontend will go to the production Render backend.

## How to Test

### 1. Open the Application
Open your browser and go to: **http://localhost:3002**

### 2. Open Browser DevTools
Press **F12** to open DevTools, then:
- Go to **Console** tab (to see errors)
- Go to **Network** tab (to see API requests)

### 3. Test Login
1. Click "Login" or go to http://localhost:3002/login
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"
4. Watch the Network tab

### 4. What to Look For

#### In Network Tab:
- **Request URL**: Should be `https://trashverse.onrender.com/api/auth/login`
- **Method**: POST
- **Status**: 
  - `200` = Success ✅
  - `401` = Wrong credentials
  - `500` = Server error (check Render logs)
  - `CORS error` = CORS not configured properly

#### In Console Tab:
- Look for any red error messages
- CORS errors will show: "blocked by CORS policy"
- Other errors will show specific messages

## Quick Backend Health Check

Run this in your browser console (F12):
```javascript
fetch('https://trashverse.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('Backend health:', d))
  .catch(e => console.error('Backend error:', e))
```

**Expected output:**
```json
{
  "status": "healthy",
  "version": "1.0.1",
  "environment": "production",
  "cors_configured": true,
  "allowed_origins_count": 4
}
```

## Test Scenarios

### Scenario 1: Test CORS
1. Open http://localhost:3002
2. Open DevTools Console
3. Run:
```javascript
fetch('https://trashverse.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('✅ CORS working!', d))
  .catch(e => console.error('❌ CORS error:', e))
```

**If you see "CORS working!"** → CORS is configured correctly
**If you see "CORS error"** → Backend needs to allow `http://localhost:3002`

### Scenario 2: Test Login API
1. Go to http://localhost:3002/login
2. Open DevTools Network tab
3. Enter: `admin` / `admin123`
4. Click Login
5. Check the request in Network tab

**Look for:**
- Request URL: `https://trashverse.onrender.com/api/auth/login`
- Request Method: POST
- Request Payload: `{"username":"admin","password":"admin123"}`
- Response Status: 200 or error code
- Response Body: Token or error message

### Scenario 3: Test Signup API
1. Go to http://localhost:3002/signup
2. Fill in the form with test data
3. Open DevTools Network tab
4. Click "Sign Up"
5. Check the request

**Look for:**
- Request URL: `https://trashverse.onrender.com/api/auth/register`
- Status code and response

## Common Issues & Solutions

### Issue 1: CORS Error
**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Check:**
1. Is backend allowing `http://localhost:3002`?
2. Go to Render logs and look for: `CORS allowed origins: [...]`
3. Should include `http://localhost:3002` or `http://localhost:5173`

**Fix:**
- Backend needs to add `http://localhost:3002` to allowed origins
- Or use port 5173 instead (already allowed)

### Issue 2: 500 Internal Server Error
**Meaning:** Backend received request but crashed

**Debug:**
1. Go to Render dashboard → trashverse-backend → Logs
2. Look for error messages at the time of your request
3. Common causes:
   - Database connection failed
   - Missing environment variable
   - Code error in backend

### Issue 3: 404 Not Found
**Meaning:** Endpoint doesn't exist

**Check:**
- Request URL should be: `https://trashverse.onrender.com/api/auth/login`
- Not: `https://trashverse.onrender.com/auth/login` (missing `/api`)

### Issue 4: Network Error / Timeout
**Meaning:** Can't reach backend

**Check:**
1. Is backend running? Visit: https://trashverse.onrender.com/health
2. Render free tier cold start? Wait 30 seconds and retry
3. Check Render dashboard - is service "Live"?

## Debugging Workflow

When you encounter an error:

1. **Note the error message** from Console
2. **Check Network tab** for:
   - Request URL
   - Status code
   - Response body
3. **Check Render logs** for backend errors
4. **Share with me:**
   - Error message from console
   - Status code from Network tab
   - Response body from Network tab
   - Relevant lines from Render logs

## Render Backend Logs

To view real-time backend logs:
1. Go to https://dashboard.render.com/
2. Click `trashverse-backend`
3. Click "Logs" tab
4. Keep this open while testing
5. Watch for errors when you make requests

## Test Credentials

- **Admin**: `admin` / `admin123`
- **Test User**: `testuser` / `test123`

## Stop the Server

When you're done testing, stop the frontend server:
```bash
# Press Ctrl+C in the terminal where npm run dev is running
```

Or I can stop it for you - just let me know!

## Next Steps

1. Open http://localhost:3002 in your browser
2. Open DevTools (F12)
3. Try to login
4. Report what you see:
   - Does it work?
   - What errors appear?
   - What's in the Network tab?
   - What's in Render logs?

This will help us identify and fix any CORS or backend issues! 🔍
