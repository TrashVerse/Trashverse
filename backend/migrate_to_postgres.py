#!/usr/bin/env python3
"""
Database Migration Script: SQLite to PostgreSQL
This script migrates all data from SQLite to PostgreSQL database.
"""

import os
import sys
import json
from datetime import datetime
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import User, WasteEntry, Pickup, RecyclingStation, Transaction, Notification, Reward
from app.config import settings

def export_sqlite_data():
    """Export data from SQLite database"""
    print("🔍 Exporting data from SQLite...")
    
    # Connect to SQLite
    sqlite_engine = create_engine("sqlite:///./trashverse.db")
    SQLiteSession = sessionmaker(bind=sqlite_engine)
    sqlite_db = SQLiteSession()
    
    data = {}
    
    try:
        # Export Users
        users = sqlite_db.query(User).all()
        data['users'] = []
        for user in users:
            user_data = {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'full_name': user.full_name,
                'hashed_password': user.hashed_password,
                'phone': user.phone,
                'role': user.role,
                'address': user.address,
                'city': user.city,
                'postal_code': user.postal_code,
                'latitude': user.latitude,
                'longitude': user.longitude,
                'total_earnings': user.total_earnings,
                'total_pickups': user.total_pickups,
                'total_waste_kg': user.total_waste_kg,
                'total_co2_averted_kg': user.total_co2_averted_kg,
                'points': user.points,
                'fcm_token': user.fcm_token,
                'is_active': user.is_active,
                'created_at': user.created_at.isoformat() if user.created_at else None,
                'updated_at': user.updated_at.isoformat() if user.updated_at else None
            }
            data['users'].append(user_data)
        print(f"✅ Exported {len(data['users'])} users")
        
        # Export Waste Entries
        waste_entries = sqlite_db.query(WasteEntry).all()
        data['waste_entries'] = []
        for entry in waste_entries:
            entry_data = {
                'id': entry.id,
                'user_id': entry.user_id,
                'waste_type': entry.waste_type,
                'weight_kg': entry.weight_kg,
                'description': entry.description,
                'image_url': entry.image_url,
                'ai_confidence': entry.ai_confidence,
                'ai_suggestions': entry.ai_suggestions,
                'points_earned': entry.points_earned,
                'amount_earned': entry.amount_earned,
                'created_at': entry.created_at.isoformat() if entry.created_at else None
            }
            data['waste_entries'].append(entry_data)
        print(f"✅ Exported {len(data['waste_entries'])} waste entries")
        
        # Export Pickups
        pickups = sqlite_db.query(Pickup).all()
        data['pickups'] = []
        for pickup in pickups:
            pickup_data = {
                'id': pickup.id,
                'user_id': pickup.user_id,
                'status': pickup.status,
                'pickup_address': pickup.pickup_address,
                'pickup_latitude': pickup.pickup_latitude,
                'pickup_longitude': pickup.pickup_longitude,
                'scheduled_date': pickup.scheduled_date.isoformat() if pickup.scheduled_date else None,
                'completed_date': pickup.completed_date.isoformat() if pickup.completed_date else None,
                'waste_type': pickup.waste_type,
                'estimated_weight_kg': pickup.estimated_weight_kg,
                'actual_weight_kg': pickup.actual_weight_kg,
                'collector_id': pickup.collector_id,
                'notes': pickup.notes,
                'created_at': pickup.created_at.isoformat() if pickup.created_at else None,
                'updated_at': pickup.updated_at.isoformat() if pickup.updated_at else None
            }
            data['pickups'].append(pickup_data)
        print(f"✅ Exported {len(data['pickups'])} pickups")
        
        # Export Recycling Stations
        stations = sqlite_db.query(RecyclingStation).all()
        data['recycling_stations'] = []
        for station in stations:
            station_data = {
                'id': station.id,
                'name': station.name,
                'address': station.address,
                'city': station.city,
                'latitude': station.latitude,
                'longitude': station.longitude,
                'phone': station.phone,
                'email': station.email,
                'accepted_waste_types': station.accepted_waste_types,
                'operating_hours': station.operating_hours,
                'is_active': station.is_active,
                'created_at': station.created_at.isoformat() if station.created_at else None
            }
            data['recycling_stations'].append(station_data)
        print(f"✅ Exported {len(data['recycling_stations'])} recycling stations")
        
        # Export Transactions
        transactions = sqlite_db.query(Transaction).all()
        data['transactions'] = []
        for transaction in transactions:
            transaction_data = {
                'id': transaction.id,
                'user_id': transaction.user_id,
                'type': transaction.type,
                'amount': transaction.amount,
                'points': transaction.points,
                'description': transaction.description,
                'reference_id': transaction.reference_id,
                'reference_type': transaction.reference_type,
                'created_at': transaction.created_at.isoformat() if transaction.created_at else None
            }
            data['transactions'].append(transaction_data)
        print(f"✅ Exported {len(data['transactions'])} transactions")
        
        # Export Notifications
        notifications = sqlite_db.query(Notification).all()
        data['notifications'] = []
        for notification in notifications:
            notification_data = {
                'id': notification.id,
                'user_id': notification.user_id,
                'title': notification.title,
                'body': notification.body,
                'type': notification.type,
                'is_read': notification.is_read,
                'data': notification.data,
                'created_at': notification.created_at.isoformat() if notification.created_at else None
            }
            data['notifications'].append(notification_data)
        print(f"✅ Exported {len(data['notifications'])} notifications")
        
        # Export Rewards
        rewards = sqlite_db.query(Reward).all()
        data['rewards'] = []
        for reward in rewards:
            reward_data = {
                'id': reward.id,
                'name': reward.name,
                'description': reward.description,
                'points_required': reward.points_required,
                'reward_type': reward.reward_type,
                'reward_value': reward.reward_value,
                'image_url': reward.image_url,
                'is_active': reward.is_active,
                'stock_quantity': reward.stock_quantity,
                'created_at': reward.created_at.isoformat() if reward.created_at else None
            }
            data['rewards'].append(reward_data)
        print(f"✅ Exported {len(data['rewards'])} rewards")
        
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
    print("📥 Importing data to PostgreSQL...")
    
    # Connect to PostgreSQL
    postgres_engine = create_engine(settings.DATABASE_URL)
    PostgresSession = sessionmaker(bind=postgres_engine)
    postgres_db = PostgresSession()
    
    try:
        # Import Users
        print("📤 Importing users...")
        for user_data in data['users']:
            user = User(
                id=user_data['id'],
                email=user_data['email'],
                username=user_data['username'],
                full_name=user_data['full_name'],
                hashed_password=user_data['hashed_password'],
                phone=user_data['phone'],
                role=user_data['role'],
                address=user_data['address'],
                city=user_data['city'],
                postal_code=user_data['postal_code'],
                latitude=user_data['latitude'],
                longitude=user_data['longitude'],
                total_earnings=user_data['total_earnings'],
                total_pickups=user_data['total_pickups'],
                total_waste_kg=user_data['total_waste_kg'],
                total_co2_averted_kg=user_data['total_co2_averted_kg'],
                points=user_data['points'],
                fcm_token=user_data['fcm_token'],
                is_active=user_data['is_active'],
                created_at=datetime.fromisoformat(user_data['created_at']) if user_data['created_at'] else None,
                updated_at=datetime.fromisoformat(user_data['updated_at']) if user_data['updated_at'] else None
            )
            postgres_db.merge(user)
        
        # Import Recycling Stations
        print("📤 Importing recycling stations...")
        for station_data in data['recycling_stations']:
            station = RecyclingStation(
                id=station_data['id'],
                name=station_data['name'],
                address=station_data['address'],
                city=station_data['city'],
                latitude=station_data['latitude'],
                longitude=station_data['longitude'],
                phone=station_data['phone'],
                email=station_data['email'],
                accepted_waste_types=station_data['accepted_waste_types'],
                operating_hours=station_data['operating_hours'],
                is_active=station_data['is_active'],
                created_at=datetime.fromisoformat(station_data['created_at']) if station_data['created_at'] else None
            )
            postgres_db.merge(station)
        
        # Import Rewards
        print("📤 Importing rewards...")
        for reward_data in data['rewards']:
            reward = Reward(
                id=reward_data['id'],
                name=reward_data['name'],
                description=reward_data['description'],
                points_required=reward_data['points_required'],
                reward_type=reward_data['reward_type'],
                reward_value=reward_data['reward_value'],
                image_url=reward_data['image_url'],
                is_active=reward_data['is_active'],
                stock_quantity=reward_data['stock_quantity'],
                created_at=datetime.fromisoformat(reward_data['created_at']) if reward_data['created_at'] else None
            )
            postgres_db.merge(reward)
        
        # Import Waste Entries
        print("📤 Importing waste entries...")
        for entry_data in data['waste_entries']:
            entry = WasteEntry(
                id=entry_data['id'],
                user_id=entry_data['user_id'],
                waste_type=entry_data['waste_type'],
                weight_kg=entry_data['weight_kg'],
                description=entry_data['description'],
                image_url=entry_data['image_url'],
                ai_confidence=entry_data['ai_confidence'],
                ai_suggestions=entry_data['ai_suggestions'],
                points_earned=entry_data['points_earned'],
                amount_earned=entry_data['amount_earned'],
                created_at=datetime.fromisoformat(entry_data['created_at']) if entry_data['created_at'] else None
            )
            postgres_db.merge(entry)
        
        # Import Pickups
        print("📤 Importing pickups...")
        for pickup_data in data['pickups']:
            pickup = Pickup(
                id=pickup_data['id'],
                user_id=pickup_data['user_id'],
                status=pickup_data['status'],
                pickup_address=pickup_data['pickup_address'],
                pickup_latitude=pickup_data['pickup_latitude'],
                pickup_longitude=pickup_data['pickup_longitude'],
                scheduled_date=datetime.fromisoformat(pickup_data['scheduled_date']) if pickup_data['scheduled_date'] else None,
                completed_date=datetime.fromisoformat(pickup_data['completed_date']) if pickup_data['completed_date'] else None,
                waste_type=pickup_data['waste_type'],
                estimated_weight_kg=pickup_data['estimated_weight_kg'],
                actual_weight_kg=pickup_data['actual_weight_kg'],
                collector_id=pickup_data['collector_id'],
                notes=pickup_data['notes'],
                created_at=datetime.fromisoformat(pickup_data['created_at']) if pickup_data['created_at'] else None,
                updated_at=datetime.fromisoformat(pickup_data['updated_at']) if pickup_data['updated_at'] else None
            )
            postgres_db.merge(pickup)
        
        # Import Transactions
        print("📤 Importing transactions...")
        for transaction_data in data['transactions']:
            transaction = Transaction(
                id=transaction_data['id'],
                user_id=transaction_data['user_id'],
                type=transaction_data['type'],
                amount=transaction_data['amount'],
                points=transaction_data['points'],
                description=transaction_data['description'],
                reference_id=transaction_data['reference_id'],
                reference_type=transaction_data['reference_type'],
                created_at=datetime.fromisoformat(transaction_data['created_at']) if transaction_data['created_at'] else None
            )
            postgres_db.merge(transaction)
        
        # Import Notifications
        print("📤 Importing notifications...")
        for notification_data in data['notifications']:
            notification = Notification(
                id=notification_data['id'],
                user_id=notification_data['user_id'],
                title=notification_data['title'],
                body=notification_data['body'],
                type=notification_data['type'],
                is_read=notification_data['is_read'],
                data=notification_data['data'],
                created_at=datetime.fromisoformat(notification_data['created_at']) if notification_data['created_at'] else None
            )
            postgres_db.merge(notification)
        
        # Commit all changes
        postgres_db.commit()
        print("✅ All data imported successfully!")
        
        # Update sequences for PostgreSQL
        print("🔄 Updating PostgreSQL sequences...")
        tables = ['users', 'waste_entries', 'pickups', 'recycling_stations', 'transactions', 'notifications', 'rewards']
        for table in tables:
            try:
                result = postgres_db.execute(text(f"SELECT MAX(id) FROM {table}"))
                max_id = result.scalar()
                if max_id:
                    postgres_db.execute(text(f"SELECT setval('{table}_id_seq', {max_id})"))
                    postgres_db.commit()
                    print(f"✅ Updated {table} sequence to {max_id}")
            except Exception as e:
                print(f"⚠️  Could not update sequence for {table}: {e}")
        
    except Exception as e:
        print(f"❌ Error importing data: {e}")
        postgres_db.rollback()
        raise
    finally:
        postgres_db.close()

def main():
    """Main migration function"""
    print("🚀 Starting database migration from SQLite to PostgreSQL")
    print("=" * 60)
    
    # Check if SQLite database exists
    if not os.path.exists("trashverse.db"):
        print("❌ SQLite database 'trashverse.db' not found!")
        print("Make sure you're running this script from the backend directory.")
        return
    
    # Check PostgreSQL connection
    try:
        postgres_engine = create_engine(settings.DATABASE_URL)
        with postgres_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ PostgreSQL connection successful")
    except Exception as e:
        print(f"❌ Cannot connect to PostgreSQL: {e}")
        print("Please check your DATABASE_URL in .env file")
        return
    
    # Export data from SQLite
    data = export_sqlite_data()
    if not data:
        print("❌ Failed to export data from SQLite")
        return
    
    print("\n" + "=" * 60)
    
    # Import data to PostgreSQL
    try:
        import_to_postgres(data)
        print("\n" + "=" * 60)
        print("🎉 Migration completed successfully!")
        print("📊 Summary:")
        print(f"   Users: {len(data['users'])}")
        print(f"   Waste Entries: {len(data['waste_entries'])}")
        print(f"   Pickups: {len(data['pickups'])}")
        print(f"   Recycling Stations: {len(data['recycling_stations'])}")
        print(f"   Transactions: {len(data['transactions'])}")
        print(f"   Notifications: {len(data['notifications'])}")
        print(f"   Rewards: {len(data['rewards'])}")
        print("\n✅ You can now update your .env file to use PostgreSQL permanently")
        
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        print("The PostgreSQL database may be in an inconsistent state.")
        print("You may need to drop and recreate the database before retrying.")

if __name__ == "__main__":
    main()