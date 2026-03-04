@echo off
echo ========================================
echo Starting TrashVerse Web App
echo ========================================
echo.

cd web

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo.
echo ========================================
echo Web app starting at http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev
