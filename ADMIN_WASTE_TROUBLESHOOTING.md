# Admin Waste Page - Troubleshooting Guide

## Issue
The `/admin/waste` page shows a blank space.

## Diagnostic Steps

### Step 1: Check Browser Console
1. Open the page: `http://localhost:3001/admin/waste`
2. Open DevTools: Press `F12`
3. Go to Console tab
4. Look for these messages:
   - ✅ "AdminWaste component mounted"
   - ✅ "Loading waste entries..."
   - ✅ "Loaded entries: [...]"
   - ❌ Any red error messages

### Step 2: Check Network Tab
1. In DevTools, go to Network tab
2. Refresh the page
3. Look for request to: `/api/admin/waste-entries`
4. Check the response:
   - Status: Should be 200 OK
   - Response: Should be JSON array

### Step 3: Check if You're Logged In
1. In Console, type: `localStorage.getItem('access_token')`
2. Should return a token string
3. If null, you need to login again

### Step 4: Check Admin Access
1. In Console, type:
```javascript
fetch('http://localhost:8000/api/auth/me', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
})
.then(r => r.json())
.then(d => console.log('User:', d))
```
2. Check if `role` is "admin"

### Step 5: Test API Directly
1. In Console, type:
```javascript
fetch('http://localhost:8000/api/admin/waste-entries', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
})
.then(r => r.json())
.then(d => console.log('Waste entries:', d))
```
2. Should return array of entries (or empty array)

---

## Common Issues & Solutions

### Issue 1: White Screen / Blank Page
**Symptoms**: Completely blank page, no content at all

**Possible Causes**:
1. JavaScript error preventing render
2. Component not imported correctly
3. Route not configured

**Solutions**:
1. Check browser console for errors
2. Hard refresh: `Ctrl + Shift + R`
3. Clear cache and reload

### Issue 2: "Loading entries..." Stuck
**Symptoms**: Shows "Loading entries..." forever

**Possible Causes**:
1. API call hanging
2. Backend not responding
3. Network error

**Solutions**:
1. Check Network tab for failed requests
2. Verify backend is running on port 8000
3. Check backend logs for errors

### Issue 3: 401 Unauthorized
**Symptoms**: Error in console about 401

**Possible Causes**:
1. Not logged in
2. Token expired
3. Not admin user

**Solutions**:
1. Login again: `http://localhost:3001/login`
2. Use admin credentials: `testuser` / `test123`
3. Verify user is admin (see Step 4 above)

### Issue 4: Empty State Shows
**Symptoms**: "No waste entries found" message

**This is CORRECT behavior** if:
- No users have submitted waste entries yet
- Database is empty
- Filter is too restrictive

**Solution**: Create test data
```bash
# Login as regular user
# Go to http://localhost:3001/waste-entry
# Submit a waste entry
# Then check admin page again
```

### Issue 5: Component Renders But No Data
**Symptoms**: Page shows but table is empty

**Possible Causes**:
1. No data in database
2. API returning empty array
3. Filter hiding all entries

**Solutions**:
1. Check "Total: X entries" counter
2. Try "All Types" filter
3. Click "Refresh" button
4. Create test data (see Issue 4)

---

## Quick Fixes

### Fix 1: Hard Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Fix 2: Clear LocalStorage
```javascript
// In browser console:
localStorage.clear();
// Then login again
```

### Fix 3: Restart Frontend
```bash
# Stop frontend (Ctrl+C)
cd web
npm run dev
```

### Fix 4: Restart Backend
```bash
# Stop backend (Ctrl+C)
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

---

## What Should You See?

### If No Data Exists
```
┌─────────────────────────────────────────┐
│ Waste Entry Management      [Refresh]   │
├─────────────────────────────────────────┤
│ [All Types ▼]  Total: 0 entries        │
├─────────────────────────────────────────┤
│                                         │
│   No waste entries found.               │
│                                         │
└─────────────────────────────────────────┘
```

### If Data Exists
```
┌──────────────────────────────────────────────────┐
│ Waste Entry Management            [Refresh]      │
├──────────────────────────────────────────────────┤
│ [All Types ▼]  Total: 3 entries                 │
├──────────────────────────────────────────────────┤
│ Table with entries...                            │
└──────────────────────────────────────────────────┘
```

### If Error Occurs
```
┌─────────────────────────────────────────┐
│ Waste Entry Management      [Refresh]   │
├─────────────────────────────────────────┤
│ ⚠️ Failed to load waste entries         │
│ Error message here...                   │
└─────────────────────────────────────────┘
```

---

## Console Commands for Testing

### Check if component loaded:
```javascript
console.log('Page loaded:', window.location.pathname);
```

### Check React DevTools:
1. Install React DevTools extension
2. Open DevTools
3. Go to Components tab
4. Find AdminWaste component
5. Check its state

### Manual API test:
```javascript
// Test the endpoint
const token = localStorage.getItem('access_token');
fetch('http://localhost:8000/api/admin/waste-entries', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(d => console.log('Data:', d))
.catch(e => console.error('Error:', e));
```

---

## Expected Console Output

When page loads correctly, you should see:
```
AdminWaste component mounted
Loading waste entries...
Loaded entries: []  // or array with data
```

If you see errors:
```
Failed to load waste entries: Error: ...
```

---

## Next Steps

1. **Open the page**: `http://localhost:3001/admin/waste`
2. **Open console**: Press F12
3. **Look for console messages** (see above)
4. **Check Network tab** for API calls
5. **Report what you see**:
   - Any error messages?
   - What does console show?
   - What does Network tab show?
   - Is the page completely blank or showing something?

---

## If Still Blank

If the page is still completely blank after all checks:

1. **Take a screenshot** of:
   - The blank page
   - Browser console (F12 → Console tab)
   - Network tab (F12 → Network tab)

2. **Check these files exist**:
   - `web/src/pages/admin/AdminWaste.tsx`
   - `web/src/components/AdminLayout.tsx`
   - `web/src/services/admin.ts`

3. **Verify imports in App.tsx**:
```typescript
import AdminWaste from './pages/admin/AdminWaste'
```

4. **Check route in App.tsx**:
```typescript
<Route path="/admin/waste" element={
  <ProtectedRoute>
    <AdminWaste />
  </ProtectedRoute>
} />
```

All of these should be correct, but worth double-checking!
