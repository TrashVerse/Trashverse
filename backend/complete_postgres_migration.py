#!/usr/bin/env python3
"""
Complete PostgreSQL Migration Script
This script handles the entire migration process from SQLite to PostgreSQL.
"""

import os
import sys
import json
import subprocess
from datetime import datetime
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import User, WasteEntry, Pickup, RecyclingStation, Transaction, Notification, Reward
from app.config import settings

def run_command(command, cwd=None):
    """Run a shell command and return success status"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {command}")
            return True
        else:
            print(f"❌ {command}")
            print(f"Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ {command}")
        print(f"Error: {e}")
        return False

def test_postgres_connection():
    """Test PostgreSQL connection"""
    print("🔍 Testing PostgreSQL connection...")
    
    try:
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            print(f"✅ PostgreSQL connection successful!")
            print(f"Database version: {version}")
        return True
    except Exception as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        return False

def export_sqlite_data():
    """Export data from SQLite database"""
    print("\n📤 Exporting data from SQLite...")
    
    if not os.path.exists("trashverse.db"):
        print("❌ SQLite database 'trashverse.db' not found!")
        return None
    
    sqlite_engine = create_engine("sqlite:///./trashverse.db")
    SQLiteSession = sessionmaker(bind=sqlite_engine)
    sqlite_db = SQLiteSession()
    
    data = {}
    
    try:
        # Export all tables
        tables = [
            ('users', User),
            ('recycling_stations', RecyclingStation),
            ('rewards', Reward),
            ('waste_entries', WasteEntry),
            ('pickups', Pickup),
            ('transactions', Transaction),
            ('notifications', Notification)
        ]
        
        for table_name, model_class in tables:
            records = sqlite_db.query(model_class).all()
            data[table_name] = []
            
            for record in records:
                record_data = {}
                for column in record.__table__.columns:
                    value = getattr(record, column.name)
                    if isinstance(value, datetime):
                        value = value.isoformat()
                    record_data[column.name] = value
                data[table_name].append(record_data)
            
            print(f"✅ Exported {len(data[table_name])} {table_name}")
        
    except Exception as e:
        print(f"❌ Error exporting data: {e}")
        return None
    finally:
        sqlite_db.close()
    
    # Save to JSON file
    with open('migration_data.json', 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"💾 Data exported to migration_data.json")
    return data

def import_to_postgres(data):
    """Import data to PostgreSQL database"""
    print("\n📥 Importing data to PostgreSQL...")
    
    postgres_engine = create_engine(settings.DATABASE_URL)
    PostgresSession = sessionmaker(bind=postgres_engine)
    postgres_db = PostgresSession()
    
    try:
        # Import in correct order (respecting foreign keys)
        import_order = [
            ('users', User),
            ('recycling_stations', RecyclingStation),
            ('rewards', Reward),
            ('waste_entries', WasteEntry),
            ('pickups', Pickup),
            ('transactions', Transaction),
            ('notifications', Notification)
        ]
        
        for table_name, model_class in import_order:
            print(f"📤 Importing {table_name}...")
            
            for record_data in data[table_name]:
                # Convert datetime strings back to datetime objects
                for key, value in record_data.items():
                    if key.endswith('_at') or key.endswith('_date'):
                        if value:
                            try:
                                record_data[key] = datetime.fromisoformat(value)
                            except:
                                pass
                
                # Create and merge record
                record = model_class(**record_data)
                postgres_db.merge(record)
            
            print(f"✅ Imported {len(data[table_name])} {table_name}")
        
        # Commit all changes
        postgres_db.commit()
        print("✅ All data imported successfully!")
        
        # Update sequences for PostgreSQL
        print("🔄 Updating PostgreSQL sequences...")
        for table_name, _ in import_order:
            try:
                result = postgres_db.execute(text(f"SELECT MAX(id) FROM {table_name}"))
                max_id = result.scalar()
                if max_id:
                    postgres_db.execute(text(f"SELECT setval('{table_name}_id_seq', {max_id})"))
                    postgres_db.commit()
                    print(f"✅ Updated {table_name} sequence to {max_id}")
            except Exception as e:
                print(f"⚠️  Could not update sequence for {table_name}: {e}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error importing data: {e}")
        postgres_db.rollback()
        return False
    finally:
        postgres_db.close()

def main():
    """Main migration function"""
    print("🚀 Complete PostgreSQL Migration")
    print("=" * 50)
    
    # Step 1: Check if PostgreSQL URL is configured
    if "postgresql://" not in settings.DATABASE_URL:
        print("❌ PostgreSQL not configured!")
        print("Please update your .env file with PostgreSQL credentials.")
        print("See POSTGRES_MIGRATION_GUIDE.md for instructions.")
        return False
    
    # Step 2: Test PostgreSQL connection
    if not test_postgres_connection():
        print("\n❌ Cannot connect to PostgreSQL.")
        print("Please check your credentials and try again.")
        return False
    
    # Step 3: Create database schema
    print("\n🏗️  Creating database schema...")
    if not run_command("python create_schema.py"):
        print("❌ Failed to create database schema")
        return False
    
    # Step 4: Export data from SQLite
    print("\n" + "=" * 50)
    data = export_sqlite_data()
    if not data:
        print("❌ Failed to export SQLite data")
        return False
    
    # Step 5: Import data to PostgreSQL
    print("\n" + "=" * 50)
    if not import_to_postgres(data):
        print("❌ Failed to import data to PostgreSQL")
        return False
    
    # Step 6: Success summary
    print("\n" + "=" * 50)
    print("🎉 Migration completed successfully!")
    print("\n📊 Migration Summary:")
    for table_name, records in data.items():
        print(f"   {table_name.replace('_', ' ').title()}: {len(records)}")
    
    print("\n✅ Next Steps:")
    print("1. Test your application with PostgreSQL")
    print("2. Update production environment variables")
    print("3. Remove SQLite database file if everything works")
    
    # Clean up
    if os.path.exists('migration_data.json'):
        os.remove('migration_data.json')
        print("🧹 Cleaned up temporary files")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)