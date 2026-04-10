"""Reset passwords for admin and test users"""
import sys
sys.path.insert(0, 'backend')

from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

def reset_passwords():
    db = SessionLocal()
    try:
        # Reset admin password
        admin = db.query(User).filter(User.username == "admin").first()
        if admin:
            admin.hashed_password = get_password_hash("admin123")
            print(f"✓ Reset password for admin: admin123")
        
        # Reset testuser password
        testuser = db.query(User).filter(User.username == "testuser").first()
        if testuser:
            testuser.hashed_password = get_password_hash("test123")
            print(f"✓ Reset password for testuser: test123")
        
        # Reset Scepter password
        scepter = db.query(User).filter(User.username == "Scepter").first()
        if scepter:
            scepter.hashed_password = get_password_hash("scepter123")
            print(f"✓ Reset password for Scepter: scepter123")
        
        # Reset Oscar password
        oscar = db.query(User).filter(User.username == "Oscar").first()
        if oscar:
            oscar.hashed_password = get_password_hash("oscar123")
            print(f"✓ Reset password for Oscar: oscar123")
        
        db.commit()
        print("\n✅ All passwords reset successfully!")
        print("\nLogin credentials:")
        print("  Admin: username=admin, password=admin123")
        print("  Admin: username=testuser, password=test123")
        print("  User: username=Scepter, password=scepter123")
        print("  User: username=Oscar, password=oscar123")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_passwords()
