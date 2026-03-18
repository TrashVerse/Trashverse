#!/usr/bin/env python3
"""
Create PostgreSQL Database
"""

import psycopg2
from psycopg2 import sql

def create_database():
    """Create the TrashverseDB database"""
    print("🔨 Creating PostgreSQL database...")
    
    try:
        # Connect to default postgres database
        conn = psycopg2.connect(
            host="localhost",
            user="postgres",
            password="Web12345",
            port=5432
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'TrashverseDB'")
        exists = cursor.fetchone()
        
        if exists:
            print("✅ Database 'TrashverseDB' already exists")
        else:
            # Create database
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(
                sql.Identifier('TrashverseDB')
            ))
            print("✅ Database 'TrashverseDB' created successfully")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        return False

if __name__ == "__main__":
    create_database()