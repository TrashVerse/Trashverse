"""
Complete migration from local database to Supabase for production
This script will:
1. Test Supabase connection
2. Migrate all data from local PostgreSQL to Supabase
3. Verify the migration
4. Update .env to use Supabase
"""
import sys
sys.path.insert(0, 'backend')

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import Base, User, WasteEntry, Pickup, RecyclingStation, Reward, Transaction, Notification, SystemSettings
from app.auth import get_password_hash
import os

# Database URLs
LOCAL_DB_URL = "postgresql://postgres:Web12345@localhost:5432/TrashverseDB"
SUPABASE_DB_URL = "postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres"

def test_supabase_connection():
    """Test if we can connect to Supabase"""
    print("🔍 Testing Supabase connection...")
    try:
        engine = create_engine(SUPABASE_DB_URL)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Connected to Supabase PostgreSQL")
            print(f"   Version: {version[:50]}...")
            return True
    except Exception as e:
        print(f"❌ Cannot connect to Supabase: {e}")
        return False

def create_supabase_tables():
    """Create all tables in Supabase"""
    print("\n📋 Creating tables in Supabase...")
    try:
        engine = create_engine(SUPABASE_DB_URL)
        Base.metadata.create_all(bind=engine)
        print("✅ All tables created successfully")
        return True
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False

def migrate_data():
    """Migrate all data from local to Supabase"""
    print("\n📦 Migrating data from local to Supabase...")
    
    # Connect to both databases
    local_engine = create_engine(LOCAL_DB_URL)
    supabase_engine = create_engine(SUPABASE_DB_URL)
    
    LocalSession = sessionmaker(bind=local_engine)
    SupabaseSession = sessionmaker(bind=supabase_engine)
    
    local_db = LocalSession()
    supabase_db = SupabaseSession()
    
    try:
        # Migrate Users
        print("  → Migrating users...")
        local_users = local_db.query(User).all()
        for user in local_users:
            # Check if user already exists
            existing = supabase_db.query(User).filter(User.email == user.email).first()
            if not existing:
                supabase_db.add(User(
                    email=user.email,
                    username=user.username,
                    full_name=user.full_name,
                    hashed_password=user.hashed_password,
                    phone=user.phone,
                    role=user.role,
                    address=user.address,
                    city=user.city,
                    postal_code=user.postal_code,
                    latitude=user.latitude,
                    longitude=user.longitude,
                    total_earnings=user.total_earnings,
                    total_pickups=user.total_pickups,
                    total_waste_kg=user.total_waste_kg,
                    total_co2_averted_kg=user.total_co2_averted_kg,
                    points=user.points,
                    is_active=user.is_active,
                    created_at=user.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_users)} users")
        
        # Migrate Stations
        print("  → Migrating stations...")
        local_stations = local_db.query(RecyclingStation).all()
        for station in local_stations:
            existing = supabase_db.query(RecyclingStation).filter(RecyclingStation.name == station.name).first()
            if not existing:
                supabase_db.add(RecyclingStation(
                    name=station.name,
                    address=station.address,
                    city=station.city,
                    latitude=station.latitude,
                    longitude=station.longitude,
                    operating_hours=station.operating_hours,
                    phone=station.phone,
                    accepted_waste_types=station.accepted_waste_types,
                    is_active=station.is_active,
                    created_at=station.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_stations)} stations")
        
        # Migrate Rewards
        print("  → Migrating rewards...")
        local_rewards = local_db.query(Reward).all()
        for reward in local_rewards:
            existing = supabase_db.query(Reward).filter(Reward.title == reward.title).first()
            if not existing:
                supabase_db.add(Reward(
                    title=reward.title,
                    description=reward.description,
                    points_required=reward.points_required,
                    category=reward.category,
                    image_url=reward.image_url,
                    is_active=reward.is_active,
                    stock_quantity=reward.stock_quantity,
                    created_at=reward.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_rewards)} rewards")
        
        # Get user ID mapping (local ID -> supabase ID)
        user_mapping = {}
        for local_user in local_users:
            supabase_user = supabase_db.query(User).filter(User.email == local_user.email).first()
            if supabase_user:
                user_mapping[local_user.id] = supabase_user.id
        
        # Migrate WasteEntries
        print("  → Migrating waste entries...")
        local_entries = local_db.query(WasteEntry).all()
        for entry in local_entries:
            if entry.user_id in user_mapping:
                supabase_db.add(WasteEntry(
                    user_id=user_mapping[entry.user_id],
                    waste_type=entry.waste_type,
                    weight_kg=entry.weight_kg,
                    image_url=entry.image_url,
                    location=entry.location,
                    latitude=entry.latitude,
                    longitude=entry.longitude,
                    status=entry.status,
                    points_earned=entry.points_earned,
                    created_at=entry.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_entries)} waste entries")
        
        # Migrate Pickups
        print("  → Migrating pickups...")
        local_pickups = local_db.query(Pickup).all()
        for pickup in local_pickups:
            if pickup.user_id in user_mapping:
                supabase_db.add(Pickup(
                    user_id=user_mapping[pickup.user_id],
                    waste_type=pickup.waste_type,
                    estimated_weight_kg=pickup.estimated_weight_kg,
                    pickup_address=pickup.pickup_address,
                    pickup_city=pickup.pickup_city,
                    pickup_latitude=pickup.pickup_latitude,
                    pickup_longitude=pickup.pickup_longitude,
                    preferred_date=pickup.preferred_date,
                    preferred_time=pickup.preferred_time,
                    status=pickup.status,
                    notes=pickup.notes,
                    created_at=pickup.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_pickups)} pickups")
        
        # Migrate Transactions
        print("  → Migrating transactions...")
        local_transactions = local_db.query(Transaction).all()
        for txn in local_transactions:
            if txn.user_id in user_mapping:
                supabase_db.add(Transaction(
                    user_id=user_mapping[txn.user_id],
                    type=txn.type,
                    amount=txn.amount,
                    points=txn.points,
                    description=txn.description,
                    status=txn.status,
                    created_at=txn.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_transactions)} transactions")
        
        # Migrate Notifications
        print("  → Migrating notifications...")
        local_notifications = local_db.query(Notification).all()
        for notif in local_notifications:
            if notif.user_id in user_mapping:
                supabase_db.add(Notification(
                    user_id=user_mapping[notif.user_id],
                    title=notif.title,
                    message=notif.message,
                    type=notif.type,
                    is_read=notif.is_read,
                    created_at=notif.created_at
                ))
        supabase_db.commit()
        print(f"    ✓ Migrated {len(local_notifications)} notifications")
        
        # Create SystemSettings if not exists
        print("  → Creating system settings...")
        settings_data = {
            "company_name": "TrashVerse",
            "company_email": "info@trashverse.ng",
            "company_phone": "+234 123 456 7890",
            "support_email": "support@trashverse.ng",
            "points_per_kg": 10.0,
            "naira_per_kg": 50.0,
            "min_withdrawal_amount": 1000.0
        }
        
        import json
        for key, value in settings_data.items():
            existing = supabase_db.query(SystemSettings).filter(SystemSettings.key == key).first()
            if not existing:
                supabase_db.add(SystemSettings(
                    key=key,
                    value=json.dumps(value)
                ))
        supabase_db.commit()
        print("    ✓ Created system settings")
        
        print("\n✅ All data migrated successfully!")
        return True
        
    except Exception as e:
        print(f"\n❌ Migration error: {e}")
        supabase_db.rollback()
        return False
    finally:
        local_db.close()
        supabase_db.close()

def verify_migration():
    """Verify data in Supabase"""
    print("\n🔍 Verifying migration...")
    
    engine = create_engine(SUPABASE_DB_URL)
    Session = sessionmaker(bind=engine)
    db = Session()
    
    try:
        users_count = db.query(User).count()
        stations_count = db.query(RecyclingStation).count()
        rewards_count = db.query(Reward).count()
        waste_count = db.query(WasteEntry).count()
        pickups_count = db.query(Pickup).count()
        
        print(f"  Users: {users_count}")
        print(f"  Stations: {stations_count}")
        print(f"  Rewards: {rewards_count}")
        print(f"  Waste Entries: {waste_count}")
        print(f"  Pickups: {pickups_count}")
        
        # Show admin users
        admins = db.query(User).filter(User.role == "admin").all()
        print(f"\n  Admin users:")
        for admin in admins:
            print(f"    - {admin.username} ({admin.email})")
        
        print("\n✅ Verification complete!")
        return True
        
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return False
    finally:
        db.close()

def update_env_file():
    """Update .env to use Supabase"""
    print("\n📝 Updating .env file...")
    
    env_path = "backend/.env"
    with open(env_path, 'r') as f:
        content = f.read()
    
    # Switch database URLs
    content = content.replace(
        "# Production Supabase Database (temporarily disabled due to network issue)\n# DATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres\n\n# Local PostgreSQL for development (ACTIVE)\nDATABASE_URL=postgresql://postgres:Web12345@localhost:5432/TrashverseDB",
        "# Production Supabase Database (ACTIVE)\nDATABASE_URL=postgresql://postgres:N81aNAj80RuiRpqC@db.gtieccjexcvgrqhbwosd.supabase.co:5432/postgres\n\n# Local PostgreSQL for development (commented out)\n# DATABASE_URL=postgresql://postgres:Web12345@localhost:5432/TrashverseDB"
    )
    
    with open(env_path, 'w') as f:
        f.write(content)
    
    print("✅ .env file updated to use Supabase")

def main():
    print("=" * 60)
    print("  PRODUCTION MIGRATION: Local → Supabase")
    print("=" * 60)
    
    # Step 1: Test connection
    if not test_supabase_connection():
        print("\n❌ Cannot proceed without Supabase connection")
        print("Please check:")
        print("  1. Your internet connection")
        print("  2. Supabase project is active")
        print("  3. Database password is correct")
        return
    
    # Step 2: Create tables
    if not create_supabase_tables():
        print("\n❌ Cannot proceed without tables")
        return
    
    # Step 3: Migrate data
    if not migrate_data():
        print("\n❌ Migration failed")
        return
    
    # Step 4: Verify
    if not verify_migration():
        print("\n⚠️ Verification had issues")
    
    # Step 5: Update .env
    update_env_file()
    
    print("\n" + "=" * 60)
    print("  ✅ MIGRATION COMPLETE!")
    print("=" * 60)
    print("\n📋 Next Steps:")
    print("  1. Restart your backend server")
    print("  2. Test login with admin credentials")
    print("  3. Verify all features work")
    print("  4. Deploy to production (Vercel + Render)")
    print("\n🔐 Admin Credentials:")
    print("  - username: admin, password: admin123")
    print("  - username: testuser, password: test123")

if __name__ == "__main__":
    main()
