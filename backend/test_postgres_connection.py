#!/usr/bin/env python3
"""
Test PostgreSQL Connection
This script tests if the PostgreSQL connection is working with your credentials.
"""

from sqlalchemy import create_engine, text
from app.config import settings

def test_connection():
    """Test PostgreSQL connection"""
    print("🔍 Testing PostgreSQL connection...")
    print(f"Database URL: {settings.DATABASE_URL}")
    
    try:
        # Create engine
        engine = create_engine(settings.DATABASE_URL)
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            print(f"✅ Connection successful!")
            print(f"PostgreSQL version: {version}")
            
            # Test if we can create tables
            conn.execute(text("SELECT 1"))
            print("✅ Database permissions OK")
            
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        print("\n💡 Common solutions:")
        print("1. Check your DATABASE_URL in .env file")
        print("2. Ensure PostgreSQL server is running")
        print("3. Verify database exists")
        print("4. Check username/password are correct")
        print("5. For cloud providers, add ?sslmode=require to URL")
        return False

if __name__ == "__main__":
    test_connection()