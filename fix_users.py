"""Fix and recreate all users with correct passwords"""
import sys
sys.path.insert(0, 'backend')

from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

def fix_users():
    db = SessionLocal()
    try:
        # Check existing users
        existing_users = db.query(User).all()
        print(f"Found {len(existing_users)} existing users:")
        for user in existing_users:
            print(f"  - {user.username} ({user.email}) - role: {user.role}")
        
        # Create or update admin user
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            print("\n Creating admin user...")
            admin = User(
                email="admin@trashverse.ng",
                username="admin",
                full_name="Admin User",
                hashed_password=get_password_hash("admin123"),
                role="admin",
                phone="+234 123 456 7890",
                city="Aba South",
                postal_code="643677",
                is_active=True
            )
            db.add(admin)
            print("✓ Created admin user")
        else:
            admin.hashed_password = get_password_hash("admin123")
            print("✓ Updated admin password")
        
        # Update testuser
        testuser = db.query(User).filter(User.username == "testuser").first()
        if testuser:
            testuser.hashed_password = get_password_hash("test123")
            testuser.role = "admin"  # Ensure it's admin
            print("✓ Updated testuser password")
        else:
            print("\n Creating testuser...")
            testuser = User(
                email="test@trashverse.ng",
                username="testuser",
                full_name="Test Admin",
                hashed_password=get_password_hash("test123"),
                role="admin",
                phone="+234 987 654 3210",
                city="Aba South",
                postal_code="643677",
                is_active=True
            )
            db.add(testuser)
            print("✓ Created testuser")
        
        # Create Scepter if not exists
        scepter = db.query(User).filter(User.username == "Scepter").first()
        if not scepter:
            print("\n Creating Scepter user...")
            scepter = User(
                email="scepterboss@gmail.com",
                username="Scepter",
                full_name="Scepter",
                hashed_password=get_password_hash("scepter123"),
                role="user",
                phone="+234 111 222 3333",
                city="Aba South",
                postal_code="643677",
                is_active=True
            )
            db.add(scepter)
            print("✓ Created Scepter user")
        else:
            scepter.hashed_password = get_password_hash("scepter123")
            print("✓ Updated Scepter password")
        
        db.commit()
        
        # Verify
        print("\n" + "="*50)
        print("All users after fix:")
        all_users = db.query(User).all()
        for user in all_users:
            print(f"  - {user.username} ({user.email}) - role: {user.role}")
        
        print("\n✅ All users fixed!")
        print("\nLogin credentials:")
        print("  Admin: username=admin, password=admin123")
        print("  Admin: username=testuser, password=test123")
        print("  User: username=Scepter, password=scepter123")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    fix_users()
