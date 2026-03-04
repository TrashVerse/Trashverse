@echo off
echo ========================================
echo Starting TrashVerse Mobile App
echo ========================================
echo.

cd mobile

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

if not exist ".env" (
    echo Creating .env file...
    echo EXPO_PUBLIC_API_URL=http://localhost:8000 > .env
    echo.
)

echo.
echo ========================================
echo Mobile app starting...
echo Press 'w' to open in web browser
echo Press 'a' for Android emulator
echo Press 'i' for iOS simulator
echo ========================================
echo.
echo Press Ctrl+C to stop
echo.

call npx expo start
