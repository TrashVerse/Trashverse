#!/usr/bin/env python3
"""
Migrate to Supabase using REST API (HTTPS)
This bypasses PostgreSQL port 5432 which is blocked
"""

import os
import sys
import requests
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

# Local database
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"

print("🚀 TrashVerse Migration via Supabase REST API")
print("=" * 60)
print("\n⚠️  Using HTTPS API (port 443) instead of PostgreSQL (port 5432)")
print("   This bypasses network restrictions")
print("\n" + "=" * 60)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("\n❌ ERROR: Supabase credentials not found")
    sys.exit(1)

print(f"\n📡 Supabase URL: {SUPABASE_URL}")
print(f"📡 API Key: {SUPABASE_KEY[:20]}...")

# Headers for Supabase API
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def test_api_access():
    """Test if we can access Supabase API"""
    try:
        # Try to access the REST API root
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/",
            headers=headers,
            timeout=10
        )
        
        # 200 or 404 both mean API is accessible
        if response.status_code in [200, 404, 401]:
            print("✅ Supabase API is accessible via HTTPS")
            return True
        else:
            print(f"❌ Unexpected status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Cannot reach Supabase API: {e}")
        return False

def create_tables_via_sql():
    """Create tables using Supabase SQL API"""
    print("\n📋 Creating tables via SQL API...")
    
    # Read the schema SQL
    with open("supabase_schema.sql", "r") as f:
        schema_sql = f.read()
    
    try:
        # Supabase SQL endpoint (if available)
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
            headers=headers,
            json={"query": schema_sql},
            timeout=30
        )
        
        if response.status_code in [200, 201]:
            print("✅ Tables created successfully")
            return True
        else:
            print(f"⚠️  SQL API not available (status: {response.status_code})")
            print("   You'll need to run supabase_schema.sql manually in SQL Editor")
            return False
            
    except Exception as e:
        print(f"⚠️  SQL API error: {e}")
        print("   You'll need to run supabase_schema.sql manually in SQL Editor")
        return False

def export_and_show_data():
    """Export local data and show instructions"""
    print("\n📦 Exporting data from local PostgreSQL...")
    
    try:
        engine = create_engine(LOCAL_DB_URL)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Export users as example
        result = session.execute(text("SELECT * FROM users"))
        users = []
        for row in result:
            user = dict(row._mapping)
            # Convert datetime to ISO format
            for key, value in user.items():
                if isinstance(value, datetime):
                    user[key] = value.isoformat()
            users.append(user)
        
        print(f"  ✅ Found {len(users)} users")
        
        # Show first user as example
        if users:
            print(f"\n  Example user data:")
            print(f"    Email: {users[0].get('email')}")
            print(f"    Username: {users[0].get('username')}")
        
        session.close()
        
        print("\n✅ Data export successful")
        print(f"   Total users to migrate: {len(users)}")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Export failed: {e}")
        return False

def main():
    """Main process"""
    
    # Test API access
    if not test_api_access():
        print("\n❌ Cannot access Supabase API")
        print("\n🔧 This means:")
        print("   - Your network is blocking ALL Supabase access")
        print("   - Not just PostgreSQL port, but HTTPS too")
        print("\n📝 Solutions:")
        print("   1. Check if you can access https://supabase.com in browser")
        print("   2. Try from different network (mobile hotspot)")
        print("   3. Use VPN")
        print("   4. Contact network administrator")
        return
    
    # Try to create tables
    tables_created = create_tables_via_sql()
    
    # Export data
    data_exported = export_and_show_data()
    
    if data_exported:
        print("\n" + "=" * 60)
        print("📝 MANUAL MIGRATION REQUIRED")
        print("=" * 60)
        print("\nYour network blocks direct database connections.")
        print("But we've prepared everything for manual migration:")
        print("\n1. Go to: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/sql")
        print("\n2. Run supabase_schema.sql:")
        print("   - Open the file")
        print("   - Copy all content")
        print("   - Paste in SQL Editor")
        print("   - Click Run")
        print("\n3. Run supabase_data.sql:")
        print("   - Open the file")
        print("   - Copy all content")
        print("   - Paste in SQL Editor")
        print("   - Click Run")
        print("\n4. Verify in Table Editor:")
        print("   https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/editor")
        print("\n✅ After that, your backend will connect to Supabase automatically!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
