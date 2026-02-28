#!/usr/bin/env python
"""Test if all dependencies are installed"""

print("Testing dependencies...")

try:
    import sqlalchemy
    print("✅ SQLAlchemy installed")
except ImportError as e:
    print(f"❌ SQLAlchemy missing: {e}")

try:
    import fastapi
    print("✅ FastAPI installed")
except ImportError as e:
    print(f"❌ FastAPI missing: {e}")

try:
    import uvicorn
    print("✅ Uvicorn installed")
except ImportError as e:
    print(f"❌ Uvicorn missing: {e}")

try:
    import pydantic
    print("✅ Pydantic installed")
except ImportError as e:
    print(f"❌ Pydantic missing: {e}")

try:
    import email_validator
    print("✅ Email validator installed")
except ImportError as e:
    print(f"❌ Email validator missing: {e}")

try:
    import bcrypt
    print("✅ Bcrypt installed")
except ImportError as e:
    print(f"❌ Bcrypt missing: {e}")

try:
    import passlib
    print("✅ Passlib installed")
except ImportError as e:
    print(f"❌ Passlib missing: {e}")

try:
    from jose import jwt
    print("✅ Python-jose installed")
except ImportError as e:
    print(f"❌ Python-jose missing: {e}")

print("\n" + "="*50)
print("Testing database setup...")

try:
    from app.database import SessionLocal, engine, Base
    print("✅ Database imports successful")
    
    # Try to create tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    # Test database connection
    db = SessionLocal()
    db.close()
    print("✅ Database connection successful")
    
except Exception as e:
    print(f"❌ Database error: {e}")

print("\n" + "="*50)
print("All checks complete!")
