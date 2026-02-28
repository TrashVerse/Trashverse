from app.database import SessionLocal, engine, Base
from app.models import RecyclingStation, Reward, User
from app.auth import get_password_hash

def seed_database():
    """Seed the database with initial data"""
    db = SessionLocal()
    
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        
        # Check if data already exists
        if db.query(RecyclingStation).first():
            print("Database already seeded!")
            return
        
        # Seed Recycling Stations in Aba, Nigeria
        stations = [
            RecyclingStation(
                name="Aba Main Recycling Center",
                address="142 Aba-Owerri Road, Aba",
                city="Aba",
                latitude=5.1065,
                longitude=7.3667,
                phone="+234 803 123 4567",
                email="aba.main@trashverse.ng",
                accepted_waste_types="plastic,paper,metal,electronics,glass",
                operating_hours="Mon-Sat: 8AM-6PM",
                is_active=True
            ),
            RecyclingStation(
                name="Ariaria Market Collection Point",
                address="Ariaria International Market, Aba",
                city="Aba",
                latitude=5.1156,
                longitude=7.3789,
                phone="+234 803 234 5678",
                email="ariaria@trashverse.ng",
                accepted_waste_types="plastic,paper,textile",
                operating_hours="Mon-Sat: 7AM-7PM",
                is_active=True
            ),
            RecyclingStation(
                name="Eziukwu Waste Hub",
                address="Eziukwu Road, Aba South",
                city="Aba South",
                latitude=5.0987,
                longitude=7.3598,
                phone="+234 803 345 6789",
                email="eziukwu@trashverse.ng",
                accepted_waste_types="plastic,metal,electronics,glass",
                operating_hours="Mon-Fri: 8AM-5PM",
                is_active=True
            ),
            RecyclingStation(
                name="Ngwa Road Recycling Station",
                address="Port Harcourt Road, Aba",
                city="Aba",
                latitude=5.1234,
                longitude=7.3456,
                phone="+234 803 456 7890",
                email="ngwa@trashverse.ng",
                accepted_waste_types="plastic,paper,metal,glass,organic",
                operating_hours="Mon-Sat: 8AM-6PM",
                is_active=True
            ),
            RecyclingStation(
                name="Osisioma Industrial Recycling",
                address="Osisioma Industrial Layout, Aba",
                city="Aba",
                latitude=5.1345,
                longitude=7.3712,
                phone="+234 803 567 8901",
                email="osisioma@trashverse.ng",
                accepted_waste_types="plastic,metal,electronics",
                operating_hours="Mon-Sat: 7AM-6PM",
                is_active=True
            )
        ]
        
        db.add_all(stations)
        
        # Seed Rewards
        rewards = [
            Reward(
                name="₦500 Cash Reward",
                description="Redeem 500 points for ₦500 cash",
                points_required=500,
                reward_type="cash",
                reward_value=500.0,
                stock_quantity=100,
                is_active=True
            ),
            Reward(
                name="₦1000 Cash Reward",
                description="Redeem 1000 points for ₦1000 cash",
                points_required=1000,
                reward_type="cash",
                reward_value=1000.0,
                stock_quantity=50,
                is_active=True
            ),
            Reward(
                name="Reusable Shopping Bag",
                description="Eco-friendly reusable shopping bag",
                points_required=200,
                reward_type="product",
                reward_value=300.0,
                stock_quantity=30,
                is_active=True
            ),
            Reward(
                name="₦2000 Airtime Voucher",
                description="Mobile airtime voucher worth ₦2000",
                points_required=1800,
                reward_type="voucher",
                reward_value=2000.0,
                stock_quantity=40,
                is_active=True
            ),
            Reward(
                name="Water Bottle",
                description="Stainless steel water bottle",
                points_required=300,
                reward_type="product",
                reward_value=500.0,
                stock_quantity=25,
                is_active=True
            ),
            Reward(
                name="₦5000 Cash Reward",
                description="Redeem 5000 points for ₦5000 cash",
                points_required=5000,
                reward_type="cash",
                reward_value=5000.0,
                stock_quantity=20,
                is_active=True
            )
        ]
        
        db.add_all(rewards)
        
        # Create a test user
        test_user = User(
            email="charles@trashverse.ng",
            username="charles",
            full_name="Charles Okeke",
            hashed_password=get_password_hash("password123"),
            phone="+234 803 123 4567",
            address="15 School Road, Aba South",
            city="Aba South",
            postal_code="643677",
            latitude=5.1065,
            longitude=7.3667,
            role="user",
            is_active=True
        )
        
        db.add(test_user)
        
        db.commit()
        print("✅ Database seeded successfully!")
        print("\n📍 Seeded 5 recycling stations in Aba")
        print("🎁 Seeded 6 rewards")
        print("👤 Created test user: charles / password123")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
