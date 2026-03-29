@echo off
echo ========================================
echo TrashVerse Supabase Migration
echo ========================================
echo.
echo This script will help you migrate to Supabase.
echo.
echo STEP 1: Get your Supabase database password
echo ----------------------------------------
echo 1. Go to: https://supabase.com/dashboard
echo 2. Select project: gtieccjexcvgrqhbwosd
echo 3. Go to Settings -^> Database
echo 4. Find or reset your database password
echo.
echo STEP 2: Configure the password
echo ----------------------------------------
python setup_supabase.py
if errorlevel 1 (
    echo.
    echo Migration setup failed!
    pause
    exit /b 1
)

echo.
echo STEP 3: Test connection
echo ----------------------------------------
python test_supabase_connection.py
if errorlevel 1 (
    echo.
    echo Connection test failed!
    echo Please check your password and try again.
    pause
    exit /b 1
)

echo.
echo STEP 4: Run migration
echo ----------------------------------------
echo.
set /p CONFIRM="Ready to migrate data to Supabase? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Migration cancelled.
    pause
    exit /b 0
)

python migrate_to_supabase.py
if errorlevel 1 (
    echo.
    echo Migration failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Migration Complete!
echo ========================================
echo.
echo Your TrashVerse application is now using Supabase!
echo.
pause
