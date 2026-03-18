#!/bin/bash

# Start script for Render deployment

echo "Starting TrashVerse Backend..."

# Set environment variables for production
export ENVIRONMENT=production

# Start the application with Gunicorn for production
if [ "$ENVIRONMENT" = "production" ]; then
    echo "Starting with Gunicorn (Production mode)..."
    gunicorn app.main:app -c gunicorn.conf.py
else
    echo "Starting with Uvicorn (Development mode)..."
    uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
fi