#!/bin/bash

# Render Build Script for TrashVerse Backend
echo "🚀 Starting TrashVerse Backend Build..."

# Upgrade pip to latest version
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install dependencies with verbose output
echo "📦 Installing dependencies..."
pip install -r requirements.txt --verbose

# Install email-validator explicitly to ensure it's available
echo "📧 Ensuring email-validator is installed..."
pip install email-validator==2.1.0 --force-reinstall

# Install pydantic with email support
echo "📧 Installing pydantic with email support..."
pip install "pydantic[email]==2.5.3" --force-reinstall

# Create necessary directories
echo "📁 Creating upload directories..."
mkdir -p uploads/waste_images
mkdir -p uploads/profile_images

# Verify critical packages are installed
echo "🔍 Verifying installations..."
python -c "import pydantic; print(f'✅ Pydantic: {pydantic.__version__}')" || echo "❌ Pydantic failed"
python -c "import email_validator; print(f'✅ Email Validator: {email_validator.__version__}')" || echo "❌ Email Validator failed"
python -c "import fastapi; print(f'✅ FastAPI: {fastapi.__version__}')" || echo "❌ FastAPI failed"
python -c "import sqlalchemy; print(f'✅ SQLAlchemy: {sqlalchemy.__version__}')" || echo "❌ SQLAlchemy failed"
python -c "import resend; print(f'✅ Resend: {resend.__version__}')" || echo "❌ Resend failed"

# Test configuration loading
echo "⚙️ Testing configuration..."
python -c "from app.config import settings; print(f'✅ Config loaded - Environment: {settings.ENVIRONMENT}')" || echo "❌ Config loading failed"

echo "✅ Build completed successfully!"