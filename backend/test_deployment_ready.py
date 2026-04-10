#!/usr/bin/env python3
"""
Pre-Deployment Test Script
Verifies all systems are ready for production deployment
"""

import os
import sys
from sqlalchemy import create_engine, text
from app.config import settings

def test_database_connection():
    """Test Supabase database connection"""
    print("\n1. Testing Database Connection...")
    print(f"   Database URL: {settings.DATABASE_URL[:50]}...")
    
    try:
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("   ✅ Database connection successful")
            return True
    except Exception as e:
        print(f"   ❌ Database connection failed: {e}")
        return False

def test_supabase_storage():
    """Test Supabase storage configuration"""
    print("\n2. Testing Supabase Storage...")
    
    if not settings.SUPABASE_PROJECT_URL:
        print("   ❌ SUPABASE_PROJECT_URL not set")
        return False
    
    if not settings.SUPABASE_ANON_KEY:
        print("   ❌ SUPABASE_ANON_KEY not set")
        return False
    
    print(f"   Project URL: {settings.SUPABASE_PROJECT_URL}")
    print(f"   Anon Key: {settings.SUPABASE_ANON_KEY[:20]}...")
    
    try:
        from app.storage import supabase
        if supabase:
            print("   ✅ Supabase client initialized")
            return True
        else:
            print("   ❌ Supabase client not initialized")
            return False
    except Exception as e:
        print(f"   ❌ Supabase initialization failed: {e}")
        return False

def test_email_configuration():
    """Test email configuration"""
    print("\n3. Testing Email Configuration...")
    
    if not settings.RESEND_API_KEY:
        print("   ❌ RESEND_API_KEY not set")
        return False
    
    print(f"   API Key: {settings.RESEND_API_KEY[:10]}...")
    print(f"   From Email: {settings.DEFAULT_FROM_EMAIL}")
    print(f"   Email Mode: {settings.EMAIL_MODE}")
    print("   ✅ Email configuration present")
    return True

def test_environment_variables():
    """Test all required environment variables"""
    print("\n4. Testing Environment Variables...")
    
    required_vars = {
        "SECRET_KEY": settings.SECRET_KEY,
        "DATABASE_URL": settings.DATABASE_URL,
        "SUPABASE_PROJECT_URL": settings.SUPABASE_PROJECT_URL,
        "SUPABASE_ANON_KEY": settings.SUPABASE_ANON_KEY,
        "RESEND_API_KEY": settings.RESEND_API_KEY,
    }
    
    all_present = True
    for var, value in required_vars.items():
        if value:
            print(f"   ✅ {var}: Set")
        else:
            print(f"   ❌ {var}: Not set")
            all_present = False
    
    return all_present

def test_database_tables():
    """Test if all required tables exist"""
    print("\n5. Testing Database Tables...")
    
    try:
        from app.database import engine
        from app import models
        
        # Try to query each table
        tables = [
            "users",
            "waste_entries",
            "pickups",
            "transactions",
            "rewards",
            "recycling_stations",
            "notifications",
            "system_settings"
        ]
        
        with engine.connect() as conn:
            for table in tables:
                try:
                    result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                    count = result.scalar()
                    print(f"   ✅ {table}: {count} rows")
                except Exception as e:
                    print(f"   ❌ {table}: Not found or error")
                    return False
        
        return True
    except Exception as e:
        print(f"   ❌ Error checking tables: {e}")
        return False

def test_admin_user_exists():
    """Test if admin user exists"""
    print("\n6. Testing Admin User...")
    
    try:
        from app.database import SessionLocal
        from app import models
        
        db = SessionLocal()
        admin = db.query(models.User).filter(models.User.role == "admin").first()
        db.close()
        
        if admin:
            print(f"   ✅ Admin user found: {admin.username}")
            return True
        else:
            print("   ⚠️  No admin user found")
            print("   Run: python create_admin_user.py")
            return False
    except Exception as e:
        print(f"   ❌ Error checking admin user: {e}")
        return False

def test_system_settings():
    """Test if system settings are initialized"""
    print("\n7. Testing System Settings...")
    
    try:
        from app.database import SessionLocal
        from app import models
        
        db = SessionLocal()
        settings_count = db.query(models.SystemSettings).count()
        db.close()
        
        if settings_count > 0:
            print(f"   ✅ System settings initialized: {settings_count} settings")
            return True
        else:
            print("   ⚠️  System settings not initialized")
            print("   Run: python init_system_settings.py")
            return False
    except Exception as e:
        print(f"   ❌ Error checking system settings: {e}")
        return False

def main():
    """Run all tests"""
    print("="*60)
    print("Pre-Deployment Test Suite")
    print("="*60)
    
    tests = [
        ("Database Connection", test_database_connection),
        ("Supabase Storage", test_supabase_storage),
        ("Email Configuration", test_email_configuration),
        ("Environment Variables", test_environment_variables),
        ("Database Tables", test_database_tables),
        ("Admin User", test_admin_user_exists),
        ("System Settings", test_system_settings),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n   ❌ Test crashed: {e}")
            results.append((name, False))
    
    # Summary
    print("\n" + "="*60)
    print("Test Summary")
    print("="*60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print("\n" + "="*60)
    print(f"Results: {passed}/{total} tests passed")
    print("="*60)
    
    if passed == total:
        print("\n🎉 All tests passed! Ready for deployment!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed. Fix issues before deploying.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
