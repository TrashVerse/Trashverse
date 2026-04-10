"""
Create admin user for testing
"""
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import User, UserRole, Base
from app.auth import get_password_hash

def create_admin_user():
    """Create testuser with admin access"""
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.username == "testuser").first()
        
        if existing_user:
            print(f"✅ User 'testuser' already exists")
            print(f"   Current Role: {existing_user.role}")
            
            if existing_user.role != UserRole.ADMIN.value:
                existing_user.role = UserRole.ADMIN.value
                db.commit()
                print(f"✅ Updated to admin role")
            else:
                print(f"✅ Already has admin role")
            
            print(f"\n📋 Login Credentials:")
            print(f"   Username: testuser")
            print(f"   Password: test123")
            return True
        
        # Create new admin user
        print("🔄 Creating new admin user...")
        
        hashed_password = get_password_hash("test123")
        
        new_user = User(
            email="test@example.com",
            username="testuser",
            full_name="Test User",
            hashed_password=hashed_password,
            role=UserRole.ADMIN.value,
            phone="+2348012345678",
            address="123 Test Street",
            city="Lagos",
            postal_code="100001",
            is_active=True
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"✅ Admin user created successfully!")
        print(f"\n📋 Login Credentials:")
        print(f"   Username: testuser")
        print(f"   Password: test123")
        print(f"   Email: test@example.com")
        print(f"   Role: {new_user.role}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user()
