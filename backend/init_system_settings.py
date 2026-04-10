#!/usr/bin/env python3
"""
Initialize System Settings in Database
Run this once after deployment to set up default settings
"""

from app.database import SessionLocal, engine, Base
from app import models
import json

def init_settings():
    """Initialize system settings in database"""
    
    # Create tables if they don't exist
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created")
    
    db = SessionLocal()
    
    try:
        # Default settings
        default_settings = {
            "waste_pricing": {
                "plastic": 50,
                "paper": 30,
                "metal": 80,
                "glass": 40,
                "organic": 20
            },
            "platform_commission": 10,
            "minimum_withdrawal": 1000,
            "points_per_kg": 10
        }
        
        # Check if settings already exist
        existing = db.query(models.SystemSettings).first()
        if existing:
            print("⚠️  Settings already exist in database")
            print("   Use admin panel to update settings")
            return
        
        # Create settings
        print("\nInitializing default settings...")
        
        for key, value in default_settings.items():
            setting = models.SystemSettings(
                key=key,
                value=json.dumps(value)
            )
            db.add(setting)
            print(f"  ✅ {key}: {value}")
        
        db.commit()
        print("\n✅ System settings initialized successfully!")
        print("\nYou can now update these settings from the admin panel:")
        print("  → /admin/settings")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("="*60)
    print("System Settings Initialization")
    print("="*60)
    init_settings()
