#!/usr/bin/env python3
"""
Export local PostgreSQL data to SQL INSERT statements
These can be run directly in Supabase SQL Editor
"""

import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Local database
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"

print("🚀 Exporting TrashVerse Data to SQL")
print("=" * 60)

try:
    engine = create_engine(LOCAL_DB_URL)
    Session = sessionmaker(bind=engine)
    session = Session()
    print("✅ Connected to local PostgreSQL")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    sys.exit(1)

# Tables to export
TABLES = [
    "users",
    "waste_entries",
    "pickups",
    "recycling_stations",
    "transactions",
    "notifications",
    "rewards"
]

def escape_sql_string(value):
    """Escape strings for SQL"""
    if value is None:
        return "NULL"
    if isinstance(value, str):
        # Escape single quotes
        value = value.replace("'", "''")
        return f"'{value}'"
    if isinstance(value, bool):
        return "TRUE" if value else "FALSE"
    if isinstance(value, datetime):
        return f"'{value.isoformat()}'"
    if isinstance(value, (int, float)):
        return str(value)
    return f"'{value}'"

def export_table(table_name):
    """Export table data as SQL INSERT statements"""
    try:
        result = session.execute(text(f"SELECT * FROM {table_name}"))
        columns = result.keys()
        rows = result.fetchall()
        
        if not rows:
            return f"-- No data in {table_name}\n"
        
        sql = f"\n-- Insert data into {table_name} ({len(rows)} rows)\n"
        
        for row in rows:
            values = []
            for i, col in enumerate(columns):
                values.append(escape_sql_string(row[i]))
            
            col_names = ", ".join(columns)
            val_str = ", ".join(values)
            sql += f"INSERT INTO {table_name} ({col_names}) VALUES ({val_str});\n"
        
        return sql
        
    except Exception as e:
        return f"-- Error exporting {table_name}: {e}\n"

# Generate SQL file
print("\n📝 Generating SQL INSERT statements...")

sql_content = """-- TrashVerse Data Export
-- Generated from local PostgreSQL
-- Run this in Supabase SQL Editor after creating the schema

-- Disable triggers temporarily for faster inserts
SET session_replication_role = replica;

"""

for table in TABLES:
    print(f"  📦 Exporting {table}...")
    sql_content += export_table(table)

sql_content += """
-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- Reset sequences to max ID
SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), true);
SELECT setval(pg_get_serial_sequence('waste_entries', 'id'), COALESCE((SELECT MAX(id) FROM waste_entries), 1), true);
SELECT setval(pg_get_serial_sequence('pickups', 'id'), COALESCE((SELECT MAX(id) FROM pickups), 1), true);
SELECT setval(pg_get_serial_sequence('recycling_stations', 'id'), COALESCE((SELECT MAX(id) FROM recycling_stations), 1), true);
SELECT setval(pg_get_serial_sequence('transactions', 'id'), COALESCE((SELECT MAX(id) FROM transactions), 1), true);
SELECT setval(pg_get_serial_sequence('notifications', 'id'), COALESCE((SELECT MAX(id) FROM notifications), 1), true);
SELECT setval(pg_get_serial_sequence('rewards', 'id'), COALESCE((SELECT MAX(id) FROM rewards), 1), true);

-- Success message
SELECT 'Data imported successfully!' as message;
"""

# Write to file
output_file = "supabase_data.sql"
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(sql_content)

print(f"\n✅ SQL file generated: {output_file}")
print("\n📋 Next Steps:")
print("  1. Go to: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/sql")
print("  2. Open supabase_schema.sql and run it first")
print("  3. Then open supabase_data.sql and run it")
print("  4. Verify data in Table Editor")

session.close()
