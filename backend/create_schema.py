#!/usr/bin/env python3
"""
Create PostgreSQL Schema Directly
"""

import sys
import io

# Fix encoding for Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from sqlalchemy import create_engine
from app.database import Base
from app.config import settings
from app import models  # Import all models

def create_schema():
    """Create all tables in PostgreSQL"""
    print("Creating PostgreSQL schema...")
    
    try:
        engine = create_engine(settings.DATABASE_URL)
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("Schema created successfully!")
        return True
        
    except Exception as e:
        print(f"Error creating schema: {e}")
        return False

if __name__ == "__main__":
    create_schema()