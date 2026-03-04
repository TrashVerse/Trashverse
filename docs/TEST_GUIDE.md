# TrashVerse Comprehensive Testing Guide

## 🎯 Overview

This guide will help you test all components of the TrashVerse system to ensure everything works together properly.

## 📋 Prerequisites

Before running tests, ensure you have:
- ✅ Python 3.8+ installed
- ✅ Node.js 16+ installed
- ✅ All dependencies installed (see below)

## 🚀 Quick Test (Automated)

### Step 1: Start the Backend
```bash
cd backend
venv\Scripts\activate
python run.py
```

Wait until you see: `Uvicorn running on http://127.0.0.1:8000`

### Step 2: Run Automated Tests (New Terminal)
```bash
# From project root
python test_integration.py
```

Or double-click: **`RUN_TESTS.bat`**

This will test:
- ✅ Backend health and connectivity
- ✅ API documentation accessibility
- ✅ Authentication system
- ✅ All API endpoints (waste, analytics, stations, etc.)
- ✅ Database integrity
- ✅ Configuration files

## 🔍 Manual Testing Checklist

### 1. Backend Testing

#### Start Backend
```bash
cd backend
venv\Scripts\activate
python run.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

#### Test Backend Endpoints

1. **Health Check**
   - URL: http://localhost:8000/health
   - Expected: `{"status": "healthy"}`

2. **API Documentation**
   - URL: http://localhost:8000/docs
   - Expected: Interactive Swagger UI

3. **Root Endpoint**
   - URL: http://localhost:8000/
   - Expected: Welcome message with version

#### Test Authentication
```bash
# Using curl or Postman
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=charles&password=password123"
```

**Expected Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### 2. Mobile App Testing

#### Start Mobile App
```bash
cd mobile
npm install
npx expo start
```

**Expected Output:**
```
Metro waiting on exp://...
› Press w │ open web
› Press a │ open Android
› Press i │ open iOS simulator
```

#### Test Mobile Features

1. **Login Screen**
   - Navigate to login
   - Enter: charles / password123
   - Should successfully authenticate

2. **Home Screen**
   - Should display user dashboard
   - Should show stats (earnings, waste collected)
   - Should load recycling guide

3. **Sell/Waste Entry**
   - Should display waste item categories
   - Should allow selecting items
   - Should calculate estimated earnings

4. **History**
   - Should display past transactions
   - Should show waste entries

5. **API Connectivity**
   - Check browser console for API calls
   - Should see requests to http://localhost:8000

### 3. Web App Testing

#### Start Web App
```bash
cd web
npm install
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

#### Test Web Features

1. **Home Page**
   - URL: http://localhost:3000
   - Should display landing page
   - Should show navigation

2. **Login Page**
   - URL: http://localhost:3000/login
   - Enter: charles / password123
   - Should authenticate (if connected to backend)

3. **Dashboard**
   - URL: http://localhost:3000/dashboard
   - Should display user dashboard (if authenticated)

4. **Other Pages**
   - Blog: http://localhost:3000/blog
   - Careers: http://localhost:3000/careers
   - Privacy Policy: http://localhost:3000/privacy-policy

### 4. Integration Testing

#### Test Backend + Mobile
1. Start backend
2. Start mobile app
3. Login on mobile
4. Create waste entry
5. Check backend logs for API calls
6. Verify data in database

#### Test Backend + Web
1. Start backend
2. Start web app
3. Login on web
4. Navigate through pages
5. Check backend logs for API calls

#### Test All Three Together
1. Start backend
2. Start mobile app
3. Start web app
4. Login on both mobile and web with same credentials
5. Create data on mobile
6. Verify it appears in backend
7. Check if web can access same data

## 📊 Test Results Checklist

### Backend Tests
- [ ] Backend starts without errors
- [ ] Health endpoint responds
- [ ] API docs accessible
- [ ] Login works with test credentials
- [ ] All API endpoints respond (200 status)
- [ ] Database file exists and has data
- [ ] CORS configured properly

### Mobile Tests
- [ ] Mobile app starts without errors
- [ ] Can connect to backend
- [ ] Login works
- [ ] Home screen loads
- [ ] Can view waste items
- [ ] Can view history
- [ ] Navigation works

### Web Tests
- [ ] Web app starts without errors
- [ ] Home page loads
- [ ] Login page accessible
- [ ] Dashboard accessible (when authenticated)
- [ ] All pages load without errors

### Integration Tests
- [ ] Mobile can authenticate with backend
- [ ] Web can authenticate with backend
- [ ] Data created on mobile appears in backend
- [ ] Same user can login on both platforms
- [ ] API calls succeed from both platforms

## 🐛 Common Issues and Solutions

### Issue: Backend won't start
**Solution:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Mobile can't connect to backend
**Solution:**
1. Ensure backend is running
2. Check mobile/services/api.ts has correct URL
3. For physical device, use computer's IP instead of localhost

### Issue: "Module not found" errors
**Solution:**
```bash
# For mobile
cd mobile
npm install

# For web
cd web
npm install

# For backend
cd backend
pip install -r requirements.txt
```

### Issue: Authentication fails
**Solution:**
1. Check database exists: `backend/trashverse.db`
2. Run seed script: `python backend/seed_data.py`
3. Verify test user exists: charles / password123

## 📈 Performance Benchmarks

### Expected Response Times
- Health check: < 50ms
- Login: < 200ms
- Get waste items: < 100ms
- Get analytics: < 150ms
- Get stations: < 100ms

### Expected Load Times
- Backend startup: 2-5 seconds
- Mobile app startup: 5-10 seconds
- Web app startup: 3-7 seconds

## 🎯 Success Criteria

Your system is working correctly if:

1. **Backend**
   - ✅ All endpoints return 200 status
   - ✅ Authentication works
   - ✅ Database queries succeed
   - ✅ No error logs

2. **Mobile**
   - ✅ App loads without crashes
   - ✅ Can login successfully
   - ✅ All screens render
   - ✅ API calls succeed

3. **Web**
   - ✅ All pages load
   - ✅ No console errors
   - ✅ Navigation works
   - ✅ Can authenticate (if connected)

4. **Integration**
   - ✅ Mobile connects to backend
   - ✅ Web connects to backend
   - ✅ Data flows between components
   - ✅ Same user works on both platforms

## 📝 Test Report Template

After testing, document your results:

```
Test Date: [DATE]
Tester: [NAME]

Backend Status: [PASS/FAIL]
- Health Check: [PASS/FAIL]
- Authentication: [PASS/FAIL]
- API Endpoints: [PASS/FAIL]
- Notes: [ANY ISSUES]

Mobile Status: [PASS/FAIL]
- Startup: [PASS/FAIL]
- Login: [PASS/FAIL]
- Features: [PASS/FAIL]
- Notes: [ANY ISSUES]

Web Status: [PASS/FAIL]
- Startup: [PASS/FAIL]
- Pages: [PASS/FAIL]
- Features: [PASS/FAIL]
- Notes: [ANY ISSUES]

Integration Status: [PASS/FAIL]
- Mobile-Backend: [PASS/FAIL]
- Web-Backend: [PASS/FAIL]
- Cross-platform: [PASS/FAIL]
- Notes: [ANY ISSUES]

Overall Status: [PASS/FAIL]
```

## 🚀 Next Steps

After successful testing:
1. Document any issues found
2. Fix critical bugs
3. Optimize slow endpoints
4. Add more test coverage
5. Prepare for deployment

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review backend logs
3. Check browser/mobile console
4. Verify all dependencies installed
5. Ensure correct Node.js and Python versions

---

**Happy Testing! 🎉**
