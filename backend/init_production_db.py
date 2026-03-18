#!/usr/bin/env python3
"""
Production Database Initialization Script for Render
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import get_db, engine, Base
from app.models import User, RecyclingStation, Reward
from app.auth import get_password_hash
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_production_database():
    """Initialize production database with essential data"""
    try:
        logger.info("Initializing production database...")
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        db = next(get_db())
        
        # Check if admin user already exists
        existing_admin = db.query(User).filter(User.username == "admin").first()
        if existing_admin:
            logger.info("Admin user already exists, skipping initialization")
            return True
        
        # Create admin user
        admin_user = User(
            email="admin@trashverse.ng",
            username="admin",
            full_name="TrashVerse Administrator",
            hashed_password=get_password_hash("TrashVerse2024!"),
            phone="+234-800-TRASH",
            role="admin",
            address="TrashVerse HQ",
            city="Aba South",
            postal_code="643677",
            latitude=5.1065,
            longitude=7.3986,
            total_earnings=0.0,
            total_pickups=0,
            total_waste_kg=0.0,
            total_co2_averted_kg=0.0,
            points=0,
            is_active=True,
            created_at=datetime.utcnow()
        )
        db.add(admin_user)
        
        # Create essential recycling stations
        stations = [
            RecyclingStation(
                name="Aba Main Recycling Center",
                address="No. 123 Aba-Owerri Road",
                city="Aba",
                latitude=5.1065,
                longitude=7.3986,
                phone="+234-803-123-4567",
                email="aba@trashverse.ng",
                accepted_waste_types="plastic,paper,metal,electronics",
                operating_hours="Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
                is_active=True
            ),
            RecyclingStation(
                name="Ariaria Market Collection Point",
                address="Ariaria International Market",
                city="Aba",
                latitude=5.1158,
                longitude=7.3697,
                phone="+234-803-234-5678",
                email="ariaria@trashverse.ng",
                accepted_waste_types="plastic,paper,textile",
                operating_hours="Mon-Sat: 7AM-7PM",
                is_active=True
            ),
            RecyclingStation(
                name="School Road Eco Center",
                address="School Road, Aba South",
                city="Aba",
                latitude=5.0972,
                longitude=7.4025,
                phone="+234-803-345-6789",
                email="school@trashverse.ng",
                accepted_waste_types="plastic,paper,metal,glass",
                operating_hours="Mon-Fri: 9AM-5PM",
                is_active=True
            )
        ]
        
        for station in stations:
            db.add(station)
        
        # Create essential rewards
        rewards = [
            Reward(
                name="₦500 Cash Reward",
                description="Redeem 100 points for ₦500 cash",
                points_required=100,
                reward_type="cash",
                reward_value=500.0,
                is_active=True,
                stock_quantity=1000
            ),
            Reward(
                name="₦1000 Cash Reward",
                description="Redeem 200 points for ₦1000 cash",
                points_required=200,
                reward_type="cash",
                reward_value=1000.0,
                is_active=True,
                stock_quantity=500
            ),
            Reward(
                name="Eco-Friendly Water Bottle",
                description="Sustainable water bottle made from recycled materials",
                points_required=50,
                reward_type="product",
                reward_value=25.0,
                is_active=True,
                stock_quantity=250
            ),
            Reward(
                name="Shopping Voucher - ₦2000",
                description="₦2000 shopping voucher for eco-friendly products",
                points_required=300,
                reward_type="voucher",
                reward_value=2000.0,
                is_active=True,
                stock_quantity=200
            ),
            Reward(
                name="Tree Planting Certificate",
                description="Plant a tree in your name and get a certificate",
                points_required=75,
                reward_type="product",
                reward_value=50.0,
                is_active=True,
                stock_quantity=1000
            )
        ]
        
        for reward in rewards:
            db.add(reward)
        
        db.commit()
        
        logger.info("✅ Production database initialized successfully!")
        logger.info("Admin credentials: admin@trashverse.ng / TrashVerse2024!")
        logger.info(f"Created {len(stations)} recycling stations")
        logger.info(f"Created {len(rewards)} rewards")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to initialize production database: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    init_production_database()