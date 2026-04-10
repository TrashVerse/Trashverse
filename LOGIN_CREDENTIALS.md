# 🔐 Login Credentials

## Test User Account

**Username:** `testuser`  
**Password:** `test123`  
**Email:** testuser@trashverse.ng  
**Role:** Admin (made admin via make_admin.py)

---

## How to Login

1. Go to http://localhost:3001/login
2. Enter username: `testuser`
3. Enter password: `test123`
4. Click "Login"

---

## If Login Fails

### Check Backend is Running
```bash
# Should see: INFO: Uvicorn running on http://127.0.0.1:8000
```

### Check User Exists
```bash
python create_test_user.py
```

### Reset Password (if needed)
```python
# Run in backend directory
python
>>> from app.database import SessionLocal
>>> from app.models import User
>>> from app.auth import get_password_hash
>>> db = SessionLocal()
>>> user = db.query(User).filter(User.username == "testuser").first()
>>> user.hashed_password = get_password_hash("test123")
>>> db.commit()
>>> print("Password reset!")
```

---

## Create New User

If you want to create a new user:

```bash
# Edit create_test_user.py with your details
python create_test_user.py
```

Or use the signup page:
http://localhost:3001/signup

---

## Make User Admin

```bash
cd backend
python make_admin.py testuser
```

---

**IMPORTANT:** The password is `test123`, NOT `testpass123`!

Use these credentials to test all features.
