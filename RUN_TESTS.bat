@echo off
echo ========================================
echo TrashVerse Integration Test Runner
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python first
    pause
    exit /b 1
)

echo Installing required test dependencies...
pip install requests >nul 2>&1

echo.
echo ========================================
echo Running Comprehensive Tests...
echo ========================================
echo.

python test_integration.py

echo.
pause
