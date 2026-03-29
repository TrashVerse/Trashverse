#!/usr/bin/env python3
"""
Alternative migration using Supabase REST API
This bypasses direct PostgreSQL connection issues
"""

import os
import sys
import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

# Local database
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"

print("🚀 TrashVerse Migration via Supabase API")
print("=" * 60)
print("\n⚠️  NOTE: This method uses Supabase REST API")
print("   Direct PostgreSQL connection is timing out")
print("   This is an alternative approach")
print("\n" + "=" * 60)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("\n❌ ERROR: Supabase credentials not found in .env")
    print("   Please ensure SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY are set")
    sys.exit(1)

print(f"\n📡 Supabase URL: {SUPABASE_URL}")
print(f"📡 Using API Key: {SUPABASE_KEY[:20]}...")

# Headers for Supabase API
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def test_supabase_api():
    """Test if Supabase API is accessible"""
    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/", headers=headers, timeout=10)
        if response.status_code in [200, 404]:  # 404 is ok, means API is working
            print("✅ Supabase API is accessible")
            return True
        else:
            print(f"❌ Supabase API returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot reach Supabase API: {e}")
        return False

def export_local_data():
    """Export data from local PostgreSQL"""
    print("\n📦 Exporting data from local PostgreSQL...")
    
    try:
        engine = create_engine(LOCAL_DB_URL)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Export users
        from sqlalchemy import text
        result = session.execute(text("SELECT * FROM users"))
        users = []
        for row in result:
            user = dict(row._mapping)
            # Convert datetime to ISO format
            for key, value in user.items():
                if isinstance(value, datetime):
                    user[key] = value.isoformat()
            users.append(user)
        
        print(f"  ✅ Exported {len(users)} users")
        
        session.close()
        return {"users": users}
        
    except Exception as e:
        print(f"  ❌ Export failed: {e}")
        return None

def main():
    """Main migration process"""
    
    # Test API access
    if not test_supabase_api():
        print("\n❌ Cannot access Supabase API")
        print("\n🔧 Troubleshooting:")
        print("   1. Check if Supabase project is active")
        print("   2. Verify SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY")
        print("   3. Check your internet connection")
        print("   4. Try accessing Supabase dashboard: https://supabase.com/dashboard")
        return
    
    # Export local data
    data = export_local_data()
    if not data:
        print("\n❌ Data export failed")
        return
    
    print("\n✅ Migration preparation complete!")
    print("\n📝 Next Steps:")
    print("   1. The direct PostgreSQL connection is timing out")
    print("   2. This might be due to:")
    print("      - Firewall blocking port 5432")
    print("      - Supabase project paused")
    print("      - Network restrictions")
    print("   3. Please check:")
    print("      - Supabase Dashboard: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd")
    print("      - Project status (active/paused)")
    print("      - Database settings")
    print("   4. Alternative: Use Supabase SQL Editor to create tables manually")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Migration cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
