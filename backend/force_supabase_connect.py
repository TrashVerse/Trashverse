#!/usr/bin/env python3
"""
Force Supabase connection with multiple methods
"""

import os
import sys
import socket
from dotenv import load_dotenv

load_dotenv()

print("🔍 Supabase Connection Diagnostics")
print("=" * 60)

# Get credentials
password = "N81aNAj80RuiRpqC"
host = "db.gtieccjexcvgrqhbwosd.supabase.co"
port = 5432
database = "postgres"
user = "postgres"

print(f"\n📡 Connection Details:")
print(f"   Host: {host}")
print(f"   Port: {port}")
print(f"   Database: {database}")
print(f"   User: {user}")
print(f"   Password: {password[:4]}...{password[-4:]}")

# Test 1: DNS Resolution
print(f"\n🔍 Test 1: DNS Resolution")
try:
    ip_addresses = socket.getaddrinfo(host, port, socket.AF_INET)
    ipv4 = ip_addresses[0][4][0]
    print(f"   ✅ Resolved to IPv4: {ipv4}")
except Exception as e:
    print(f"   ❌ DNS resolution failed: {e}")
    ipv4 = None

# Test 2: TCP Connection
print(f"\n🔍 Test 2: TCP Socket Connection")
if ipv4:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        result = sock.connect_ex((ipv4, port))
        sock.close()
        
        if result == 0:
            print(f"   ✅ TCP connection successful to {ipv4}:{port}")
        else:
            print(f"   ❌ TCP connection failed: Error code {result}")
    except Exception as e:
        print(f"   ❌ TCP connection error: {e}")

# Test 3: psycopg2 with IPv4
print(f"\n🔍 Test 3: PostgreSQL Connection (psycopg2)")
try:
    import psycopg2
    
    # Try with IPv4 address directly
    if ipv4:
        print(f"   Attempting connection to {ipv4}...")
        conn = psycopg2.connect(
            host=ipv4,
            port=port,
            database=database,
            user=user,
            password=password,
            connect_timeout=10
        )
        
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        
        print(f"   ✅ Connected successfully!")
        print(f"   PostgreSQL: {version[:80]}...")
        
        cursor.close()
        conn.close()
        
        print("\n🎉 SUCCESS! Connection works!")
        print("\nNow running full migration...")
        
        # Run the migration
        import subprocess
        result = subprocess.run([sys.executable, "migrate_to_supabase.py"], 
                              capture_output=False)
        sys.exit(result.returncode)
        
except ImportError:
    print("   ❌ psycopg2 not installed")
    print("   Run: pip install psycopg2-binary")
except Exception as e:
    print(f"   ❌ Connection failed: {e}")

# Test 4: Try with hostname
print(f"\n🔍 Test 4: PostgreSQL Connection (using hostname)")
try:
    import psycopg2
    
    print(f"   Attempting connection to {host}...")
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password,
        connect_timeout=10,
        options='-c statement_timeout=10000'
    )
    
    cursor = conn.cursor()
    cursor.execute("SELECT 1;")
    result = cursor.fetchone()[0]
    
    if result == 1:
        print(f"   ✅ Connected successfully!")
        
        cursor.close()
        conn.close()
        
        print("\n🎉 SUCCESS! Connection works!")
        print("\nNow running full migration...")
        
        # Run the migration
        import subprocess
        result = subprocess.run([sys.executable, "migrate_to_supabase.py"], 
                              capture_output=False)
        sys.exit(result.returncode)
        
except Exception as e:
    print(f"   ❌ Connection failed: {e}")

# Test 5: SQLAlchemy with different parameters
print(f"\n🔍 Test 5: SQLAlchemy Connection")
try:
    from sqlalchemy import create_engine, text
    
    # Try with connect_args
    if ipv4:
        connection_string = f"postgresql://postgres:{password}@{ipv4}:{port}/{database}"
    else:
        connection_string = f"postgresql://postgres:{password}@{host}:{port}/{database}"
    
    print(f"   Connection string: {connection_string[:50]}...")
    
    engine = create_engine(
        connection_string,
        connect_args={
            "connect_timeout": 10,
            "options": "-c statement_timeout=10000"
        },
        pool_pre_ping=True
    )
    
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        if result.scalar() == 1:
            print(f"   ✅ Connected successfully!")
            
            print("\n🎉 SUCCESS! Connection works!")
            print("\nNow running full migration...")
            
            # Run the migration
            import subprocess
            result = subprocess.run([sys.executable, "migrate_to_supabase.py"], 
                                  capture_output=False)
            sys.exit(result.returncode)
            
except Exception as e:
    print(f"   ❌ Connection failed: {e}")

print("\n" + "=" * 60)
print("❌ All connection attempts failed")
print("\n🔧 Possible Issues:")
print("   1. Firewall blocking outbound connections on port 5432")
print("   2. Corporate network restrictions")
print("   3. Supabase project might be paused")
print("   4. ISP blocking PostgreSQL ports")
print("\n📝 Solutions:")
print("   1. Try from a different network (mobile hotspot)")
print("   2. Use VPN")
print("   3. Use the manual SQL migration method")
print("   4. Check Supabase project status in dashboard")
