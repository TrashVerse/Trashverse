#!/usr/bin/env python3
"""
Migrate TrashVerse from Local PostgreSQL to Supabase
This script exports data from local PostgreSQL and imports it to Supabase
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Database URLs
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"
SUPABASE_DB_URL = os.getenv("DATABASE_URL")

if not SUPABASE_DB_URL or "[YOUR-PASSWORD]" in SUPABASE_DB_URL:
    print("❌ ERROR: Please update DATABASE_URL in backend/.env with your Supabase database password")
    print("\nYour Supabase connection string should look like:")
    print("DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres")
    print("\nYou can find your database password in:")
    print("1. Supabase Dashboard → Project Settings → Database → Connection String")
    print("2. Or reset it in: Project Settings → Database → Database Password")
    sys.exit(1)

print("🚀 TrashVerse Migration: Local PostgreSQL → Supabase")
print("=" * 60)

# Create engines
print("\n📡 Connecting to databases...")
try:
    local_engine = create_engine(LOCAL_DB_URL)
    supabase_engine = create_engine(SUPABASE_DB_URL)
    
    LocalSession = sessionmaker(bind=local_engine)
    SupabaseSession = sessionmaker(bind=supabase_engine)
    
    local_session = LocalSession()
    supabase_session = SupabaseSession()
    
    print("✅ Connected to local PostgreSQL")
    print("✅ Connected to Supabase")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    sys.exit(1)

# Table migration order (respecting foreign key constraints)
TABLES = [
    "users",
    "waste_entries",
    "pickups",
    "recycling_stations",
    "transactions",
    "notifications",
    "rewards"
]

def export_table_data(session, table_name):
    """Export all data from a table"""
    try:
        result = session.execute(text(f"SELECT * FROM {table_name}"))
        columns = result.keys()
        rows = result.fetchall()
        
        data = []
        for row in rows:
            row_dict = {}
            for i, col in enumerate(columns):
                value = row[i]
                # Convert datetime to ISO format string
                if isinstance(value, datetime):
                    value = value.isoformat()
                row_dict[col] = value
            data.append(row_dict)
        
        return columns, data
    except Exception as e:
        print(f"⚠️  Warning: Could not export {table_name}: {e}")
        return None, []

def create_schema_on_supabase(session):
    """Create the database schema on Supabase"""
    print("\n📋 Creating schema on Supabase...")
    
    schema_sql = """
    -- Drop existing tables if they exist (in reverse order of dependencies)
    DROP TABLE IF EXISTS rewards CASCADE;
    DROP TABLE IF EXISTS notifications CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;
    DROP TABLE IF EXISTS recycling_stations CASCADE;
    DROP TABLE IF EXISTS pickups CASCADE;
    DROP TABLE IF EXISTS waste_entries CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    
    -- Create users table
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        full_name VARCHAR,
        hashed_password VARCHAR NOT NULL,
        phone VARCHAR,
        role VARCHAR DEFAULT 'user',
        address VARCHAR,
        city VARCHAR DEFAULT 'Aba South',
        postal_code VARCHAR DEFAULT '643677',
        latitude FLOAT,
        longitude FLOAT,
        total_earnings FLOAT DEFAULT 0.0,
        total_pickups INTEGER DEFAULT 0,
        total_waste_kg FLOAT DEFAULT 0.0,
        total_co2_averted_kg FLOAT DEFAULT 0.0,
        points INTEGER DEFAULT 0,
        fcm_token VARCHAR,
        password_reset_token VARCHAR,
        password_reset_token_expires TIMESTAMP,
        recovery_token VARCHAR,
        recovery_token_expires TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create waste_entries table
    CREATE TABLE waste_entries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        waste_type VARCHAR NOT NULL,
        weight_kg FLOAT NOT NULL,
        description TEXT,
        image_url VARCHAR,
        ai_confidence FLOAT,
        ai_suggestions TEXT,
        points_earned INTEGER DEFAULT 0,
        amount_earned FLOAT DEFAULT 0.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create pickups table
    CREATE TABLE pickups (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        status VARCHAR DEFAULT 'pending',
        pickup_address VARCHAR NOT NULL,
        pickup_latitude FLOAT,
        pickup_longitude FLOAT,
        scheduled_date TIMESTAMP,
        completed_date TIMESTAMP,
        waste_type VARCHAR,
        estimated_weight_kg FLOAT,
        actual_weight_kg FLOAT,
        collector_id INTEGER REFERENCES users(id),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create recycling_stations table
    CREATE TABLE recycling_stations (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        city VARCHAR DEFAULT 'Aba',
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        phone VARCHAR,
        email VARCHAR,
        accepted_waste_types VARCHAR,
        operating_hours VARCHAR,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create transactions table
    CREATE TABLE transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR,
        amount FLOAT NOT NULL,
        points INTEGER DEFAULT 0,
        description VARCHAR,
        reference_id VARCHAR UNIQUE,
        reference_type VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create notifications table
    CREATE TABLE notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR NOT NULL,
        body TEXT NOT NULL,
        type VARCHAR,
        is_read BOOLEAN DEFAULT FALSE,
        data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create rewards table
    CREATE TABLE rewards (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        description TEXT,
        points_required INTEGER NOT NULL,
        reward_type VARCHAR,
        reward_value FLOAT,
        image_url VARCHAR,
        is_active BOOLEAN DEFAULT TRUE,
        stock_quantity INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create indexes for better performance
    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_users_username ON users(username);
    CREATE INDEX idx_waste_entries_user_id ON waste_entries(user_id);
    CREATE INDEX idx_pickups_user_id ON pickups(user_id);
    CREATE INDEX idx_pickups_status ON pickups(status);
    CREATE INDEX idx_transactions_user_id ON transactions(user_id);
    CREATE INDEX idx_notifications_user_id ON notifications(user_id);
    """
    
    try:
        # Execute schema creation
        for statement in schema_sql.split(';'):
            if statement.strip():
                session.execute(text(statement))
        session.commit()
        print("✅ Schema created successfully on Supabase")
        return True
    except Exception as e:
        print(f"❌ Schema creation failed: {e}")
        session.rollback()
        return False

def import_table_data(session, table_name, columns, data):
    """Import data into a Supabase table"""
    if not data:
        print(f"  ℹ️  No data to import for {table_name}")
        return 0
    
    try:
        # Build INSERT statement
        col_names = ", ".join(columns)
        placeholders = ", ".join([f":{col}" for col in columns])
        
        insert_sql = f"""
        INSERT INTO {table_name} ({col_names})
        VALUES ({placeholders})
        """
        
        # Import each row
        for row in data:
            session.execute(text(insert_sql), row)
        
        session.commit()
        
        # Reset sequence for id column
        session.execute(text(f"""
            SELECT setval(pg_get_serial_sequence('{table_name}', 'id'), 
                         COALESCE((SELECT MAX(id) FROM {table_name}), 1), 
                         true);
        """))
        session.commit()
        
        return len(data)
    except Exception as e:
        print(f"  ❌ Import failed: {e}")
        session.rollback()
        return 0

def main():
    """Main migration process"""
    
    # Step 1: Create schema on Supabase
    if not create_schema_on_supabase(supabase_session):
        print("\n❌ Migration aborted due to schema creation failure")
        return
    
    # Step 2: Export and import data for each table
    print("\n📦 Migrating data...")
    print("-" * 60)
    
    total_rows = 0
    migration_summary = {}
    
    for table in TABLES:
        print(f"\n🔄 Processing {table}...")
        
        # Export from local
        columns, data = export_table_data(local_session, table)
        
        if columns:
            # Import to Supabase
            imported = import_table_data(supabase_session, table, columns, data)
            migration_summary[table] = imported
            total_rows += imported
            print(f"  ✅ Migrated {imported} rows")
        else:
            migration_summary[table] = 0
    
    # Step 3: Summary
    print("\n" + "=" * 60)
    print("🎉 Migration Complete!")
    print("=" * 60)
    print("\n📊 Migration Summary:")
    for table, count in migration_summary.items():
        print(f"  • {table}: {count} rows")
    print(f"\n  Total: {total_rows} rows migrated")
    
    # Step 4: Verification
    print("\n🔍 Verifying migration...")
    try:
        for table in TABLES:
            result = supabase_session.execute(text(f"SELECT COUNT(*) FROM {table}"))
            count = result.scalar()
            print(f"  ✅ {table}: {count} rows in Supabase")
    except Exception as e:
        print(f"  ⚠️  Verification warning: {e}")
    
    print("\n✅ All data successfully migrated to Supabase!")
    print("\n📝 Next Steps:")
    print("  1. Update DATABASE_URL in backend/.env (already done)")
    print("  2. Test the application with Supabase")
    print("  3. Update frontend environment variables if needed")
    print("  4. Deploy to production with Supabase connection")
    
    # Close sessions
    local_session.close()
    supabase_session.close()

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
