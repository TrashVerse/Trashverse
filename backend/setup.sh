#!/bin/bash

echo "========================================"
echo "TrashVerse Backend Setup"
echo "========================================"
echo ""

echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org/downloads/"
    exit 1
fi

python3 --version

echo ""
echo "Installing dependencies..."
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Initializing database..."
python3 seed_data.py
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to initialize database"
    exit 1
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Test user created:"
echo "  Username: charles"
echo "  Password: password123"
echo ""
echo "To start the server, run:"
echo "  uvicorn app.main:app --reload"
echo ""
echo "Then visit: http://localhost:8000/docs"
echo ""
