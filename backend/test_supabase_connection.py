#!/usr/bin/env python3
"""
Test Supabase database connection
Verifies that the backend can connect to Supabase
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_connection():
    """Test connection to Supabase database"""
    
    print("🔍 Testing Supabase Connection")
    print("=" * 60)
    
    # Get DATABASE_URL
    db_url = os.getenv("DATABASE_URL")
    
    if not db_url:
        print("❌ DATABASE_URL not found in .env file")
        print("\n📝 Please set DATABASE_URL in backend/.env:")
        print("   DATABASE_URL=postgresql://postgres:PASSWORD@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres")
        return False
    
    if "[YOUR-PASSWORD]" in db_url:
        print("❌ DATABASE_URL contains placeholder password")
        print("\n📝 Please update DATABASE_URL with your actual Supabase password:")
        print("   Run: python setup_supabase.py")
        return False
    
    print(f"\n📡 Connection String: {db_url[:50]}...")
    
    # Test connection
    try:
        print("\n🔌 Connecting to Supabase...")
        engine = create_engine(db_url)
        
        with engine.connect() as conn:
            # Test basic query
            result = conn.execute(text("SELECT 1 as test"))
            test_value = result.scalar()
            
            if test_value == 1:
                print("✅ Connection successful!")
                
                # Get PostgreSQL version
                result = conn.execute(text("SELECT version()"))
                version = result.scalar()
                print(f"\n📊 PostgreSQL Version:")
                print(f"   {version[:80]}...")
                
                # Check if tables exist
                result = conn.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name
                """))
                tables = [row[0] for row in result]
                
                if tables:
                    print(f"\n📋 Existing Tables ({len(tables)}):")
                    for table in tables:
                        # Get row count
                        count_result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                        count = count_result.scalar()
                        print(f"   • {table}: {count} rows")
                else:
                    print("\n📋 No tables found (database is empty)")
                    print("   Run: python migrate_to_supabase.py")
                
                print("\n✅ Supabase connection test passed!")
                return True
            else:
                print("❌ Connection test failed: unexpected result")
                return False
                
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        print("\n🔧 Troubleshooting:")
        print("   1. Check your database password is correct")
        print("   2. Verify your Supabase project is active")
        print("   3. Check your internet connection")
        print("   4. Run: python setup_supabase.py")
        return False

def main():
    """Main test function"""
    success = test_connection()
    
    if success:
        print("\n🚀 Ready to use Supabase!")
        print("\n📝 Next Steps:")
        print("   • Migrate data: python migrate_to_supabase.py")
        print("   • Start backend: python run.py")
        print("   • Test API: curl http://localhost:8000/health")
        sys.exit(0)
    else:
        print("\n❌ Connection test failed")
        print("\n📝 Please fix the issues above and try again")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
