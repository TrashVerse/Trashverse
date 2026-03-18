#!/bin/bash

# Build script for Render deployment

echo "Starting build process..."

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create necessary directories
echo "Creating upload directories..."
mkdir -p uploads/waste_images
mkdir -p uploads/profile_images

# Run database migrations (if using Alembic)
# echo "Running database migrations..."
# alembic upgrade head

echo "Build completed successfully!"