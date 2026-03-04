@echo off
echo ========================================
echo Starting TrashVerse Backend
echo ========================================
echo.

cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Installing/updating dependencies...
pip install -r requirements.txt --quiet

echo.
echo ========================================
echo Backend starting at http://localhost:8000
echo API Docs at http://localhost:8000/docs
echo ========================================
echo.
echo Press Ctrl+C to stop
echo.

python run.py
