"""Create a test user for testing"""
import requests

BASE_URL = "http://localhost:8000"

# Create test user
user_data = {
    "email": "testuser@trashverse.ng",
    "username": "testuser",
    "password": "test123",
    "full_name": "Test User"
}

response = requests.post(f"{BASE_URL}/api/auth/register", json=user_data)

if response.status_code == 201:
    print("✅ Test user created successfully!")
    print(f"Username: {user_data['username']}")
    print(f"Email: {user_data['email']}")
    print(f"Password: {user_data['password']}")
else:
    print(f"Response: {response.status_code}")
    print(f"Message: {response.text}")
