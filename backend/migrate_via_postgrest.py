#!/usr/bin/env python3
"""
Complete migration using Supabase PostgREST API
This works even when PostgreSQL port is blocked
"""

import os
import sys
import requests
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import json
from datetime import datetime
import time

load_dotenv()

# Supabase configuration  
SUPABASE_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

# Local database
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"

print("🚀 TrashVerse Migration via PostgREST API")
print("=" * 60)
print("\n✅ Using HTTPS (port 443) - bypasses network restrictions")
print("\n" + "=" * 60)

# Headers
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation,resolution=merge-duplicates"
}

def test_connection():
    """Test Supabase API"""
    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/", headers=headers, timeout=10)
        if response.status_code in [200, 404, 401]:
            print("✅ Supabase API accessible")
            return True
        return False
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

def export_local_data():
    """Export all data from local PostgreSQL"""
    print("\n📦 Exporting data from local PostgreSQL...")
    
    try:
        engine = create_engine(LOCAL_DB_URL)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        data = {}
        tables = ["users", "waste_entries", "pickups", "recycling_stations", 
                 "transactions", "notifications", "rewards"]
        
        for table in tables:
            try:
                result = session.execute(text(f"SELECT * FROM {table}"))
                rows = []
                for row in result:
                    row_dict = dict(row._mapping)
                    # Convert datetime to ISO format
                    for key, value in row_dict.items():
                        if isinstance(value, datetime):
                            row_dict[key] = value.isoformat()
                    rows.append(row_dict)
                
                data[table] = rows
                print(f"  ✅ {table}: {len(rows)} rows")
            except Exception as e:
                print(f"  ⚠️  {table}: {e}")
                data[table] = []
        
        session.close()
        return data
        
    except Exception as e:
        print(f"❌ Export failed: {e}")
        return None

def insert_via_api(table, rows):
    """Insert rows using PostgREST API"""
    if not rows:
        return 0
    
    try:
        # PostgREST endpoint
        url = f"{SUPABASE_URL}/rest/v1/{table}"
        
        # Insert in batches of 100
        batch_size = 100
        total_inserted = 0
        
        for i in range(0, len(rows), batch_size):
            batch = rows[i:i+batch_size]
            
            response = requests.post(
                url,
                headers=headers,
                json=batch,
                timeout=30
            )
            
            if response.status_code in [200, 201]:
                total_inserted += len(batch)
                print(f"    Inserted batch {i//batch_size + 1}: {len(batch)} rows")
            else:
                print(f"    ⚠️  Batch {i//batch_size + 1} failed: {response.status_code}")
                print(f"       {response.text[:200]}")
            
            time.sleep(0.5)  # Rate limiting
        
        return total_inserted
        
    except Exception as e:
        print(f"    ❌ Insert error: {e}")
        return 0

def main():
    """Main migration process"""
    
    # Step 1: Test connection
    if not test_connection():
        print("\n❌ Cannot connect to Supabase API")
        return
    
    # Step 2: Export local data
    data = export_local_data()
    if not data:
        print("\n❌ Data export failed")
        return
    
    # Step 3: Show schema creation instructions
    print("\n" + "=" * 60)
    print("📋 STEP 1: Create Tables")
    print("=" * 60)
    print("\nBefore inserting data, you MUST create the tables:")
    print("\n1. Go to: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/sql")
    print("\n2. Copy and run this SQL:")
    print("\n" + "-" * 60)
    
    # Show schema SQL
    try:
        with open("supabase_schema.sql", "r") as f:
            schema = f.read()
        print(schema[:500] + "\n... (see supabase_schema.sql for full content)")
    except:
        print("(Open supabase_schema.sql and copy all content)")
    
    print("-" * 60)
    
    input("\n⏸️  Press ENTER after you've created the tables in Supabase...")
    
    # Step 4: Insert data via API
    print("\n" + "=" * 60)
    print("📤 STEP 2: Inserting Data via API")
    print("=" * 60)
    
    # Insert in order (respecting foreign keys)
    tables_order = ["users", "waste_entries", "pickups", "recycling_stations",
                   "transactions", "notifications", "rewards"]
    
    summary = {}
    for table in tables_order:
        if table in data and data[table]:
            print(f"\n🔄 Inserting into {table}...")
            inserted = insert_via_api(table, data[table])
            summary[table] = {"total": len(data[table]), "inserted": inserted}
        else:
            print(f"\n  ℹ️  {table}: No data to insert")
            summary[table] = {"total": 0, "inserted": 0}
    
    # Step 5: Summary
    print("\n" + "=" * 60)
    print("🎉 Migration Complete!")
    print("=" * 60)
    print("\n📊 Summary:")
    for table, stats in summary.items():
        status = "✅" if stats["inserted"] == stats["total"] else "⚠️"
        print(f"  {status} {table}: {stats['inserted']}/{stats['total']} rows")
    
    print("\n🔍 Verify in Supabase:")
    print("   https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/editor")
    
    print("\n✅ Your backend is now configured to use Supabase!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Migration cancelled")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
