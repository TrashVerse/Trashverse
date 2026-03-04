@echo off
echo ========================================
echo Starting ALL TrashVerse Projects
echo ========================================
echo.
echo This will open 3 terminal windows:
echo 1. Backend (http://localhost:8000)
echo 2. Mobile App (Expo)
echo 3. Web App (http://localhost:3000)
echo.
pause

echo.
echo Starting Backend...
start "TrashVerse Backend" cmd /k "START_BACKEND.bat"

timeout /t 5 /nobreak >nul

echo Starting Mobile...
start "TrashVerse Mobile" cmd /k "START_MOBILE.bat"

timeout /t 3 /nobreak >nul

echo Starting Web...
start "TrashVerse Web" cmd /k "START_WEB.bat"

echo.
echo ========================================
echo All projects starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Web App: http://localhost:3000
echo Mobile: Check Expo terminal
echo.
echo Close this window or press any key...
pause >nul
