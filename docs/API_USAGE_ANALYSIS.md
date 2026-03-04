# API Usage Analysis Report

## Backend API Endpoints vs Frontend Usage

### Authentication Module (`/api/auth/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/auth/register` | POST | Register new user | ✅ Used | ✅ Used | **USED** |
| `/api/auth/login` | POST | User login | ✅ Used | ✅ Used | **USED** |
| `/api/auth/me` | GET | Get current user | ✅ Used | ✅ Used | **USED** |
| `/api/auth/me` | PUT | Update user profile | ✅ Used | ❌ Not Used | **PARTIALLY USED** |

**Summary:** 4/4 endpoints used (100%)

---

### Waste Management Module (`/api/waste/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/waste/entries` | POST | Create waste entry | ✅ Used | ✅ Used | **USED** |
| `/api/waste/entries` | GET | Get all entries | ✅ Used | ✅ Used | **USED** |
| `/api/waste/entries/{id}` | GET | Get specific entry | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/waste/entries/{id}` | DELETE | Delete entry | ❌ Not Used | ❌ Not Used | **UNUSED** |

**Summary:** 2/4 endpoints used (50%)

**Unused Endpoints:**
- `GET /api/waste/entries/{id}` - Get specific waste entry details
- `DELETE /api/waste/entries/{id}` - Delete a waste entry

---

### Pickups Module (`/api/pickups/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/pickups/` | POST | Schedule pickup | ✅ Used | ✅ Used | **USED** |
| `/api/pickups/` | GET | Get all pickups | ✅ Used | ✅ Used | **USED** |
| `/api/pickups/{id}` | GET | Get specific pickup | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/pickups/{id}` | PUT | Update pickup | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/pickups/{id}` | DELETE | Cancel pickup | ❌ Not Used | ❌ Not Used | **UNUSED** |

**Summary:** 2/5 endpoints used (40%)

**Unused Endpoints:**
- `GET /api/pickups/{id}` - Get specific pickup details
- `PUT /api/pickups/{id}` - Update pickup status/details
- `DELETE /api/pickups/{id}` - Cancel a pickup

---

### Recycling Stations Module (`/api/stations/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/stations/` | GET | Get all stations | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/stations/{id}` | GET | Get specific station | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/stations/` | POST | Create station (admin) | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/stations/nearby/search` | GET | Find nearest station | ❌ Not Used | ❌ Not Used | **UNUSED** |

**Summary:** 1/4 endpoints used (25%)

**Unused Endpoints:**
- `GET /api/stations/{id}` - Get specific station details
- `POST /api/stations/` - Create new recycling station (admin only)
- `GET /api/stations/nearby/search` - Find nearest station by location

---

### Transactions Module (`/api/transactions/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/transactions/` | GET | Get all transactions | ✅ Used | ✅ Used | **USED** |
| `/api/transactions/withdraw` | POST | Withdraw earnings | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/transactions/balance` | GET | Get current balance | ✅ Used | ❌ Not Used | **PARTIALLY USED** |

**Summary:** 2/3 endpoints used (67%)

**Unused Endpoints:**
- `POST /api/transactions/withdraw` - Withdraw earnings to bank account

---

### Analytics Module (`/api/analytics/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/analytics/dashboard` | GET | Get dashboard stats | ✅ Used | ✅ Used | **USED** |
| `/api/analytics/stats` | GET | Get detailed stats | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/analytics/leaderboard` | GET | Get top users | ✅ Used | ❌ Not Used | **PARTIALLY USED** |

**Summary:** 2/3 endpoints used (67%)

**Unused Endpoints:**
- `GET /api/analytics/stats` - Get detailed user statistics with monthly breakdown

---

### Notifications Module (`/api/notifications/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/notifications/` | GET | Get all notifications | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/notifications/unread/count` | GET | Get unread count | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/notifications/{id}/read` | PUT | Mark as read | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/notifications/read-all` | PUT | Mark all as read | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/notifications/{id}` | DELETE | Delete notification | ✅ Used | ❌ Not Used | **PARTIALLY USED** |

**Summary:** 5/5 endpoints used on web, 0/5 on mobile (50% overall)

---

### Rewards Module (`/api/rewards/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/rewards/` | GET | Get all rewards | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/rewards/{id}` | GET | Get specific reward | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/rewards/{id}/redeem` | POST | Redeem reward | ✅ Used | ❌ Not Used | **PARTIALLY USED** |
| `/api/rewards/` | POST | Create reward (admin) | ❌ Not Used | ❌ Not Used | **UNUSED** |

**Summary:** 2/4 endpoints used (50%)

**Unused Endpoints:**
- `GET /api/rewards/{id}` - Get specific reward details
- `POST /api/rewards/` - Create new reward (admin only)

---

### Upload Module (`/api/upload/*`)

| Endpoint | Method | Purpose | Web Usage | Mobile Usage | Status |
|----------|--------|---------|-----------|--------------|--------|
| `/api/upload/waste-image` | POST | Upload waste image | ❌ Not Used | ❌ Not Used | **UNUSED** |
| `/api/upload/profile-image` | POST | Upload profile image | ❌ Not Used | ❌ Not Used | **UNUSED** |

**Summary:** 0/2 endpoints used (0%)

**Unused Endpoints:**
- `POST /api/upload/waste-image` - Upload waste image for AI identification
- `POST /api/upload/profile-image` - Upload user profile picture

---

## Overall Statistics

### Total Endpoints: 35

| Status | Count | Percentage |
|--------|-------|------------|
| **Fully Used** | 11 | 31% |
| **Partially Used** | 10 | 29% |
| **Completely Unused** | 14 | 40% |

### Usage by Platform

| Platform | Endpoints Used | Percentage |
|----------|----------------|------------|
| **Web** | 23/35 | 66% |
| **Mobile** | 12/35 | 34% |

---

## Completely Unused Endpoints (14 total)

### High Priority (Should be implemented)

1. **`GET /api/waste/entries/{id}`** - View specific waste entry details
   - Use case: View detailed information about a past waste entry
   - Recommended: Add detail view in history screens

2. **`DELETE /api/waste/entries/{id}`** - Delete waste entry
   - Use case: Remove incorrect entries
   - Recommended: Add delete button in history screens

3. **`PUT /api/pickups/{id}`** - Update pickup
   - Use case: Reschedule or modify pickup details
   - Recommended: Add edit functionality in pickups screen

4. **`DELETE /api/pickups/{id}`** - Cancel pickup
   - Use case: Cancel scheduled pickups
   - Recommended: Add cancel button in pickups screen

5. **`POST /api/transactions/withdraw`** - Withdraw earnings
   - Use case: Cash out accumulated earnings
   - Recommended: Add withdrawal feature in transactions/profile

6. **`GET /api/analytics/stats`** - Detailed statistics
   - Use case: View monthly trends and waste breakdown
   - Recommended: Create analytics/stats page

7. **`GET /api/stations/nearby/search`** - Find nearest station
   - Use case: Location-based station search
   - Recommended: Add map view with location services

8. **`POST /api/upload/waste-image`** - Upload waste images
   - Use case: AI-powered waste identification
   - Recommended: Add camera/image upload to waste entry

9. **`POST /api/upload/profile-image`** - Upload profile picture
   - Use case: Personalize user profile
   - Recommended: Add to profile settings

### Medium Priority (Admin/Advanced features)

10. **`POST /api/stations/`** - Create recycling station
    - Use case: Admin feature to add new stations
    - Recommended: Create admin panel

11. **`POST /api/rewards/`** - Create reward
    - Use case: Admin feature to add new rewards
    - Recommended: Create admin panel

12. **`GET /api/stations/{id}`** - Station details
    - Use case: View detailed station information
    - Recommended: Add detail view when clicking station

13. **`GET /api/rewards/{id}`** - Reward details
    - Use case: View detailed reward information
    - Recommended: Add detail modal in rewards screen

14. **`GET /api/pickups/{id}`** - Pickup details
    - Use case: View detailed pickup information
    - Recommended: Add detail view when clicking pickup

---

## Recommendations

### Immediate Actions (High Impact)

1. **Add Image Upload Functionality**
   - Implement camera/gallery access in mobile
   - Add file upload in web
   - Connect to `/api/upload/waste-image` and `/api/upload/profile-image`

2. **Implement Withdrawal Feature**
   - Add withdrawal form in transactions page
   - Connect to `/api/transactions/withdraw`
   - Add payment method configuration

3. **Add Edit/Delete Actions**
   - Add delete buttons for waste entries
   - Add cancel buttons for pickups
   - Add edit functionality for pickups

4. **Create Detailed Analytics Page**
   - Use `/api/analytics/stats` for monthly trends
   - Add charts and graphs
   - Show waste breakdown by type

5. **Implement Location-Based Features**
   - Add map view for stations
   - Use `/api/stations/nearby/search`
   - Request location permissions

### Future Enhancements

1. **Admin Panel**
   - Create admin dashboard
   - Use admin-only endpoints for stations and rewards
   - Add user management

2. **Detail Views**
   - Add detail pages for entries, pickups, stations, rewards
   - Use specific ID endpoints

3. **Mobile Notifications**
   - Implement notification screens on mobile
   - Add push notification support
   - Use FCM token registration

---

## Mobile Platform Gaps

The mobile app is missing screens for:
- ❌ Rewards (0% API usage)
- ❌ Notifications (0% API usage)
- ❌ Profile/Settings (partial, missing update)
- ❌ Recycling Stations (0% API usage)
- ❌ Leaderboard (0% API usage)
- ❌ Detailed Analytics (0% API usage)

**Action Required:** Create these 6 missing mobile screens to achieve feature parity with web.

---

## Conclusion

- **31% of APIs are fully utilized** across both platforms
- **40% of APIs are completely unused** - significant opportunity for feature enhancement
- **Web platform has better API coverage (66%)** than mobile (34%)
- **Priority:** Implement image upload, withdrawal, and edit/delete features
- **Next:** Complete missing mobile screens to match web functionality
