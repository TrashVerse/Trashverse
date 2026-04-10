"""
Check and grant admin access to testuser
"""
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import User, UserRole, Base

def check_and_grant_admin():
    """Check if testuser exists and has admin access"""
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Find testuser
        user = db.query(User).filter(User.username == "testuser").first()
        
        if not user:
            print("❌ User 'testuser' not found in database")
            print("\nAvailable users:")
            users = db.query(User).all()
            for u in users:
                print(f"  - {u.username} ({u.email}) - Role: {u.role}")
            return False
        
        print(f"✅ Found user: {user.username}")
        print(f"   Email: {user.email}")
        print(f"   Current Role: {user.role}")
        
        if user.role == UserRole.ADMIN.value:
            print(f"✅ User already has admin access!")
            return True
        
        # Grant admin access
        print(f"\n🔄 Granting admin access...")
        user.role = UserRole.ADMIN.value
        db.commit()
        
        print(f"✅ Admin access granted successfully!")
        print(f"\nLogin credentials:")
        print(f"  Username: testuser")
        print(f"  Password: test123")
        
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
    check_and_grant_admin()
