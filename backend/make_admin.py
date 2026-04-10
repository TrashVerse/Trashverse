"""
Make a user an admin
Usage: python make_admin.py <username_or_email>
"""
import sys
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User, UserRole

def make_admin(identifier: str):
    """Make a user an admin by username or email"""
    db: Session = SessionLocal()
    
    try:
        # Try to find user by username or email
        user = db.query(User).filter(
            (User.username == identifier) | (User.email == identifier)
        ).first()
        
        if not user:
            print(f"❌ User not found: {identifier}")
            return False
        
        if user.role == UserRole.ADMIN.value:
            print(f"ℹ️  User {user.username} is already an admin")
            return True
        
        # Update role to admin
        user.role = UserRole.ADMIN.value
        db.commit()
        
        print(f"✅ User {user.username} ({user.email}) is now an admin!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_admin.py <username_or_email>")
        print("\nExample:")
        print("  python make_admin.py testuser")
        print("  python make_admin.py test@example.com")
        sys.exit(1)
    
    identifier = sys.argv[1]
    make_admin(identifier)
