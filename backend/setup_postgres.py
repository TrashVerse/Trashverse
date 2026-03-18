#!/usr/bin/env python3
"""
PostgreSQL Setup Helper
This script helps you configure PostgreSQL connection.
"""

import os
import re

def get_user_input(prompt, default=None):
    """Get user input with optional default"""
    if default:
        user_input = input(f"{prompt} [{default}]: ").strip()
        return user_input if user_input else default
    else:
        return input(f"{prompt}: ").strip()

def validate_database_url(url):
    """Validate PostgreSQL URL format"""
    pattern = r'^postgresql://[^:]+:[^@]+@[^:]+:\d+/[^?]+(\?.*)?$'
    return re.match(pattern, url) is not None

def setup_postgres_config():
    """Interactive PostgreSQL configuration"""
    print("🐘 PostgreSQL Configuration Setup")
    print("=" * 40)
    
    print("\nThis will help you configure PostgreSQL connection.")
    print("You'll need your PostgreSQL credentials.\n")
    
    # Get connection details
    print("📝 Enter your PostgreSQL connection details:")
    
    host = get_user_input("Host", "localhost")
    port = get_user_input("Port", "5432")
    username = get_user_input("Username", "postgres")
    password = get_user_input("Password")
    database = get_user_input("Database name", "trashverse_db")
    
    # Ask about SSL
    use_ssl = get_user_input("Use SSL? (y/n)", "n").lower() == 'y'
    ssl_param = "?sslmode=require" if use_ssl else ""
    
    # Build DATABASE_URL
    database_url = f"postgresql://{username}:{password}@{host}:{port}/{database}{ssl_param}"
    
    print(f"\n🔗 Generated DATABASE_URL:")
    print(f"DATABASE_URL={database_url}")
    
    # Validate format
    if not validate_database_url(database_url):
        print("❌ Invalid URL format. Please check your inputs.")
        return None
    
    # Ask to update .env file
    update_env = get_user_input("\nUpdate .env file? (y/n)", "y").lower() == 'y'
    
    if update_env:
        try:
            # Read current .env file
            with open('.env', 'r') as f:
                content = f.read()
            
            # Replace DATABASE_URL line
            lines = content.split('\n')
            updated_lines = []
            database_url_updated = False
            
            for line in lines:
                if line.startswith('DATABASE_URL=') or line.startswith('# DATABASE_URL='):
                    if not database_url_updated:
                        updated_lines.append(f"DATABASE_URL={database_url}")
                        database_url_updated = True
                    # Skip other DATABASE_URL lines
                elif line.startswith('# SQLite') or line.startswith('# PostgreSQL'):
                    # Skip comments
                    pass
                else:
                    updated_lines.append(line)
            
            # If no DATABASE_URL found, add it
            if not database_url_updated:
                updated_lines.append(f"DATABASE_URL={database_url}")
            
            # Write updated .env file
            with open('.env', 'w') as f:
                f.write('\n'.join(updated_lines))
            
            print("✅ .env file updated successfully!")
            
        except Exception as e:
            print(f"❌ Error updating .env file: {e}")
            print(f"Please manually add this line to your .env file:")
            print(f"DATABASE_URL={database_url}")
    
    return database_url

def main():
    """Main setup function"""
    database_url = setup_postgres_config()
    
    if database_url:
        print("\n🎉 PostgreSQL configuration complete!")
        print("\n📋 Next steps:")
        print("1. Make sure your PostgreSQL server is running")
        print("2. Create the database if it doesn't exist")
        print("3. Test the connection: python test_postgres_connection.py")
        print("4. Run the migration: python complete_postgres_migration.py")
    else:
        print("\n❌ Configuration failed. Please try again.")

if __name__ == "__main__":
    main()