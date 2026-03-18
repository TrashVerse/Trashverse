#!/usr/bin/env python3
"""
Test script to verify all critical imports work correctly
This helps debug deployment issues on Render
"""

import sys
import traceback

def test_import(module_name, description=""):
    """Test importing a module and report results"""
    try:
        __import__(module_name)
        print(f"✅ {module_name} - {description}")
        return True
    except ImportError as e:
        print(f"❌ {module_name} - {description}: {e}")
        return False
    except Exception as e:
        print(f"⚠️ {module_name} - {description}: Unexpected error: {e}")
        return False

def main():
    print("🔍 Testing Critical Imports for TrashVerse Backend")
    print("=" * 50)
    
    # Test core dependencies
    results = []
    
    # Core FastAPI and web framework
    results.append(test_import("fastapi", "Web framework"))
    results.append(test_import("uvicorn", "ASGI server"))
    results.append(test_import("gunicorn", "WSGI server"))
    
    # Database and ORM
    results.append(test_import("sqlalchemy", "Database ORM"))
    results.append(test_import("psycopg2", "PostgreSQL adapter"))
    results.append(test_import("alembic", "Database migrations"))
    
    # Data validation and settings
    results.append(test_import("pydantic", "Data validation"))
    results.append(test_import("pydantic_settings", "Settings management"))
    results.append(test_import("email_validator", "Email validation"))
    
    # Authentication and security
    results.append(test_import("jose", "JWT tokens"))
    results.append(test_import("passlib", "Password hashing"))
    
    # Email and external services
    results.append(test_import("resend", "Email service"))
    results.append(test_import("firebase_admin", "Firebase integration"))
    
    # Utilities
    results.append(test_import("geopy", "Geolocation"))
    results.append(test_import("dotenv", "Environment variables"))
    
    print("\n" + "=" * 50)
    
    # Test application imports
    print("🔍 Testing Application Imports")
    print("-" * 30)
    
    try:
        from app.config import settings
        print(f"✅ app.config - Settings loaded")
        print(f"   Environment: {settings.ENVIRONMENT}")
        print(f"   Email Mode: {settings.EMAIL_MODE}")
        results.append(True)
    except Exception as e:
        print(f"❌ app.config: {e}")
        traceback.print_exc()
        results.append(False)
    
    try:
        from app.database import engine, Base
        print("✅ app.database - Database connection configured")
        results.append(True)
    except Exception as e:
        print(f"❌ app.database: {e}")
        results.append(False)
    
    try:
        from app.models import User, Station, Reward
        print("✅ app.models - Database models loaded")
        results.append(True)
    except Exception as e:
        print(f"❌ app.models: {e}")
        results.append(False)
    
    try:
        from app.main import app
        print("✅ app.main - FastAPI application created")
        results.append(True)
    except Exception as e:
        print(f"❌ app.main: {e}")
        results.append(False)
    
    # Summary
    print("\n" + "=" * 50)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 All tests passed! ({passed}/{total})")
        print("✅ Application should start successfully")
        sys.exit(0)
    else:
        print(f"❌ {total - passed} tests failed ({passed}/{total} passed)")
        print("🚨 Application may fail to start")
        sys.exit(1)

if __name__ == "__main__":
    main()