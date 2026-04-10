# Admin Settings - Quick Guide

## How to Edit Settings

### Step 1: Navigate to Settings
```
http://localhost:3001/admin/settings
```

### Step 2: Click "Edit Settings"
- Button is in the top right corner
- Blue button with pencil icon

### Step 3: Edit Values
All fields become editable:

**Waste Pricing**:
- Plastic: ₦50 → Change to any value
- Paper: ₦30 → Change to any value
- Metal: ₦80 → Change to any value
- Glass: ₦40 → Change to any value
- Organic: ₦20 → Change to any value

**Platform Settings**:
- Commission: 10% → Change (0-100%)
- Min Withdrawal: ₦1000 → Change (any positive value)
- Points/kg: 10 pts → Change (any positive integer)

### Step 4: Save or Cancel
- **Save Changes**: Green button - Saves all changes
- **Cancel**: Gray button - Discards all changes

### Step 5: Confirmation
- ✅ Green success message appears
- Settings are updated immediately
- Page returns to view mode

---

## Visual Indicators

### View Mode
- Clean display
- No borders
- "Edit Settings" button visible

### Edit Mode
- **Blue borders** around all editable fields
- Input fields replace static text
- "Cancel" and "Save Changes" buttons
- **Yellow warning** message

---

## Quick Test

1. Login: `testuser` / `test123`
2. Go to: `/admin/settings`
3. Click: "Edit Settings"
4. Change: Plastic price to 60
5. Click: "Save Changes"
6. See: ✅ Success message
7. Refresh: Settings persist

---

## Status: ✅ WORKING
