#!/usr/bin/env python3
"""
Quick setup script for Supabase configuration
Helps you configure the DATABASE_URL with your Supabase password
"""

import os
import sys
from pathlib import Path

def main():
    print("🔧 TrashVerse Supabase Setup")
    print("=" * 60)
    print("\nThis script will help you configure your Supabase connection.")
    print("\n📝 You need your Supabase database password.")
    print("   Find it in: Supabase Dashboard → Project Settings → Database")
    print("   Or reset it if you don't have it saved.")
    
    # Get password from user
    print("\n" + "-" * 60)
    password = input("\n🔑 Enter your Supabase database password: ").strip()
    
    if not password:
        print("❌ Password cannot be empty!")
        sys.exit(1)
    
    # Build connection string
    project_ref = "gtieccjexcvgrqhbwosd"
    connection_string = f"postgresql://postgres:{password}@db.{project_ref}.supabase.co:5432/postgres"
    
    # Read current .env file
    env_path = Path(__file__).parent / ".env"
    
    if not env_path.exists():
        print(f"❌ .env file not found at {env_path}")
        sys.exit(1)
    
    # Read and update .env
    with open(env_path, 'r') as f:
        lines = f.readlines()
    
    # Update DATABASE_URL line
    updated = False
    new_lines = []
    for line in lines:
        if line.startswith("DATABASE_URL="):
            new_lines.append(f"DATABASE_URL={connection_string}\n")
            updated = True
        else:
            new_lines.append(line)
    
    # Write back to .env
    with open(env_path, 'w') as f:
        f.writelines(new_lines)
    
    if updated:
        print("\n✅ Configuration updated successfully!")
        print(f"\n📝 Updated: {env_path}")
        print(f"\n🔗 Connection String:")
        print(f"   {connection_string}")
        
        print("\n🚀 Next Steps:")
        print("   1. Run migration: python migrate_to_supabase.py")
        print("   2. Test connection: python -c 'from app.database import engine; engine.connect()'")
        print("   3. Start backend: python run.py")
    else:
        print("\n⚠️  Warning: DATABASE_URL line not found in .env")
        print("   Please add it manually:")
        print(f"   DATABASE_URL={connection_string}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
        sys.exit(1)
