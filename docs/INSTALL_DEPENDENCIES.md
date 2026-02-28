# Install Frontend Dependencies

## Required Packages

The frontend needs these additional packages for API integration:

```bash
npm install axios @react-native-async-storage/async-storage
```

## What These Packages Do

### axios
- HTTP client for making API requests
- Handles request/response interceptors
- Supports automatic token injection

### @react-native-async-storage/async-storage
- Persistent storage for React Native
- Used to store authentication tokens
- Works on iOS, Android, and Web

## Installation Steps

1. Navigate to the TrashVerse directory:
```bash
cd TrashVerse
```

2. Install the packages:
```bash
npm install axios @react-native-async-storage/async-storage
```

3. For iOS (if developing for iOS):
```bash
cd ios
pod install
cd ..
```

4. Start the development server:
```bash
npm start
```

## Verify Installation

After installation, you should see these in your `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "@react-native-async-storage/async-storage": "^1.21.0"
  }
}
```

## Troubleshooting

### Module not found
If you get "Module not found" errors:
```bash
npm install
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android build issues
```bash
npm run android
```

## Next Steps

After installing dependencies:
1. Start the backend: `cd backend && uvicorn app.main:app --reload`
2. Start the frontend: `npm start`
3. Login with test credentials: `charles` / `password123`
