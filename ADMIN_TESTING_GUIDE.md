# Admin Dashboard Testing Guide

## Prerequisites

### 1. Start Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend Server
```bash
cd web
npm run dev
```

### 3. Admin Credentials
```
Username: testuser
Password: test123
```

## Testing Checklist

### Step 1: Login
1. Navigate to `http://localhost:3001/login`
2. Enter credentials: `testuser` / `test123`
3. Click "Sign In"
4. Should redirect to `/dashboard`

### Step 2: Access Admin Dashboard
1. From user dashboard, click "Admin" button in sidebar (if visible)
2. OR directly navigate to `http://localhost:3001/admin`
3. Should see green-themed admin sidebar
4. Should see "Platform Overview" page with analytics

### Step 3: Test Each Admin Page

#### ✅ Overview (`/admin`)
**What to check:**
- [ ] Platform statistics cards display correctly
- [ ] User stats (total, active, new users)
- [ ] Waste stats (total kg, value, by type)
- [ ] Pickup stats (total, completion rate)
- [ ] Transaction stats (earnings, withdrawals, revenue)
- [ ] Top contributors list
- [ ] Environmental impact (CO₂ averted)

**Expected behavior:**
- All statistics should load from backend
- Numbers should be accurate
- No 401 errors in console

#### ✅ Users (`/admin/users`)
**What to check:**
- [ ] User list displays with pagination
- [ ] Search box works (type username/email)
- [ ] Role filter works (All/User/Admin)
- [ ] "Toggle Active" button works
- [ ] "Change Role" button works
- [ ] User statistics display (earnings, pickups, waste)

**Test actions:**
1. Search for a user
2. Filter by role
3. Try toggling a user's active status
4. Try changing a user's role

#### ✅ Pickups (`/admin/pickups`)
**What to check:**
- [ ] Pickup list displays
- [ ] Status filter works (All/Pending/In Progress/Completed/Cancelled)
- [ ] "Update Status" button works
- [ ] Pickup details display (user, address, waste type, weight)

**Test actions:**
1. Filter by status
2. Try updating a pickup status
3. Verify status changes reflect immediately

#### ✅ Waste Entries (`/admin/waste`)
**What to check:**
- [ ] Waste entry list displays
- [ ] Waste type filter works
- [ ] "Edit" button opens edit form
- [ ] "Delete" button works with confirmation
- [ ] User information displays for each entry

**Test actions:**
1. Filter by waste type
2. Try editing a waste entry (weight/value)
3. Try deleting a waste entry

#### ✅ Transactions (`/admin/transactions`)
**What to check:**
- [ ] Transaction list displays
- [ ] Type filter works (All/Earning/Withdrawal/Redemption)
- [ ] "Approve" button shows for withdrawals
- [ ] Transaction details display correctly

**Test actions:**
1. Filter by transaction type
2. Try approving a withdrawal
3. Verify approval updates the transaction

#### ✅ Stations (`/admin/stations`)
**What to check:**
- [ ] Station list displays
- [ ] "Create New Station" form works
- [ ] All form fields are present (name, address, city, contact, waste types)
- [ ] "Edit" button opens edit form
- [ ] "Delete" button works with confirmation

**Test actions:**
1. Try creating a new station
2. Try editing an existing station
3. Try deleting a station

#### ✅ Rewards (`/admin/rewards`)
**What to check:**
- [ ] Reward list displays
- [ ] "Create New Reward" form works
- [ ] All form fields are present (name, points, description, image URL)
- [ ] "Edit" button opens edit form
- [ ] "Delete" button works with confirmation

**Test actions:**
1. Try creating a new reward
2. Try editing an existing reward
3. Try deleting a reward

#### ✅ Notifications (`/admin/notifications`) - NEW
**What to check:**
- [ ] Broadcast form displays
- [ ] Title input field works
- [ ] Message textarea works
- [ ] "Send Broadcast Notification" button works
- [ ] Success message appears after sending
- [ ] Form clears after successful send
- [ ] Tips section displays

**Test actions:**
1. Enter a title: "Test Notification"
2. Enter a message: "This is a test broadcast"
3. Click "Send Broadcast Notification"
4. Verify success message appears
5. Check that all active users received the notification

#### ✅ Settings (`/admin/settings`) - NEW
**What to check:**
- [ ] Waste pricing section displays
- [ ] All waste types show with prices (plastic, paper, metal, glass, organic)
- [ ] Platform commission displays
- [ ] Minimum withdrawal amount displays
- [ ] Points per kilogram displays
- [ ] Read-only notice displays

**Expected values:**
- Plastic: ₦50/kg
- Paper: ₦30/kg
- Metal: ₦80/kg
- Glass: ₦40/kg
- Organic: ₦20/kg
- Platform Commission: 10%
- Minimum Withdrawal: ₦1000
- Points per kg: 10 pts

### Step 4: Test Navigation
1. Click each menu item in the admin sidebar
2. Verify correct page loads
3. Verify active menu item is highlighted
4. Test sidebar collapse/expand on desktop
5. Test mobile responsive behavior

### Step 5: Test Sidebar Behavior

#### Desktop (width > 1024px)
- [ ] Sidebar is visible by default
- [ ] Sidebar is part of layout flow (not overlay)
- [ ] Content adjusts when sidebar collapses
- [ ] No dark overlay appears
- [ ] Toggle button works

#### Mobile (width < 1024px)
- [ ] Sidebar is hidden by default
- [ ] Hamburger menu button appears
- [ ] Sidebar slides in as overlay
- [ ] Dark backdrop appears behind sidebar
- [ ] Clicking backdrop closes sidebar

## Common Issues & Solutions

### Issue 1: 401 Unauthorized Errors
**Symptom:** All admin pages show "Failed to load" or 401 errors in console

**Solution:**
1. Make sure you're logged in
2. Check that token is stored in localStorage
3. Verify backend server is running
4. Check that user has admin role

**Verify admin status:**
```bash
cd backend
python check_admin_access.py
```

### Issue 2: Blank Pages or "Under Construction"
**Symptom:** Admin pages show placeholder text

**Solution:**
1. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache completely
3. Restart frontend dev server

### Issue 3: Sidebar Overlapping Content
**Symptom:** Sidebar blocks dashboard content on desktop

**Solution:**
1. Check AdminLayout.tsx uses `lg:static` positioning
2. Verify Tailwind config scans `./src/**` directory
3. Hard refresh browser to clear cached styles

### Issue 4: Routes Not Working (404)
**Symptom:** Clicking admin menu items shows 404 page

**Solution:**
1. Verify all routes are in App.tsx
2. Check route paths match sidebar links
3. Restart frontend dev server

### Issue 5: Backend Endpoints Not Found
**Symptom:** API calls return 404 or "Not Found"

**Solution:**
1. Verify backend server is running
2. Check admin router is imported in main.py
3. Restart backend server to load new routes

## Browser Console Checks

### No Errors Expected
Open browser console (F12) and check for:
- ✅ No 401 Unauthorized errors
- ✅ No 404 Not Found errors
- ✅ No React errors or warnings (except future flag warnings)
- ✅ API calls return 200 status

### Expected Console Output
```
GET http://localhost:8000/api/admin/analytics/overview 200
GET http://localhost:8000/api/admin/users 200
GET http://localhost:8000/api/admin/pickups 200
```

## Performance Checks

### Page Load Times
- [ ] Overview page loads in < 2 seconds
- [ ] User list loads in < 2 seconds
- [ ] All pages respond quickly to interactions

### Data Refresh
- [ ] Pull-to-refresh works (if implemented)
- [ ] Data updates after actions (create/edit/delete)
- [ ] No stale data displayed

## Security Checks

### Authorization
- [ ] Non-admin users cannot access admin routes
- [ ] Admin endpoints require authentication
- [ ] Token is sent with all API requests

### Data Validation
- [ ] Forms validate input before submission
- [ ] Error messages display for invalid data
- [ ] Success messages display after successful actions

## Final Verification

### All Pages Working
- [x] Overview - Platform analytics
- [x] Users - User management
- [x] Pickups - Pickup management
- [x] Waste - Waste entry management
- [x] Transactions - Transaction management
- [x] Stations - Station management
- [x] Rewards - Reward management
- [x] Notifications - Broadcast notifications
- [x] Settings - System settings

### All Features Working
- [x] Search and filter functionality
- [x] Create/edit/delete operations
- [x] Status updates
- [x] Form validation
- [x] Success/error feedback
- [x] Responsive design
- [x] Navigation and routing

## Success Criteria

✅ All 9 admin pages load without errors
✅ All API endpoints return 200 status
✅ All CRUD operations work correctly
✅ Sidebar navigation works on desktop and mobile
✅ No console errors (except future flag warnings)
✅ Forms validate and submit correctly
✅ Success/error messages display appropriately
✅ Data refreshes after actions

## Next Steps After Testing

If all tests pass:
1. ✅ Admin dashboard is production-ready
2. Consider adding optional enhancements (charts, export, audit log)
3. Deploy to production environment

If tests fail:
1. Note which specific test failed
2. Check the error message in console
3. Refer to "Common Issues & Solutions" section
4. Report issue with specific details
