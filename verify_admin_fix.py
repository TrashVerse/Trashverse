#!/usr/bin/env python3
"""
Verification script for admin authentication fix
Tests that all admin endpoints are accessible with proper authentication
"""

import requests
import json
from typing import Dict, Optional

API_URL = "http://localhost:8000"
USERNAME = "testuser"
PASSWORD = "test123"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_success(message: str):
    print(f"{Colors.GREEN}✅ {message}{Colors.END}")

def print_error(message: str):
    print(f"{Colors.RED}❌ {message}{Colors.END}")

def print_info(message: str):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.END}")

def print_warning(message: str):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.END}")

def login() -> Optional[str]:
    """Login and get access token"""
    print_info("Attempting to login...")
    
    try:
        response = requests.post(
            f"{API_URL}/api/auth/login",
            data={"username": USERNAME, "password": PASSWORD}
        )
        
        if response.status_code == 200:
            token = response.json()["access_token"]
            print_success(f"Login successful! Token: {token[:20]}...")
            return token
        else:
            print_error(f"Login failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print_error(f"Login error: {str(e)}")
        return None

def check_user_role(token: str) -> bool:
    """Check if user is admin"""
    print_info("Checking user role...")
    
    try:
        response = requests.get(
            f"{API_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200:
            user_data = response.json()
            role = user_data.get("role")
            username = user_data.get("username")
            
            if role == "admin":
                print_success(f"User '{username}' is an admin")
                return True
            else:
                print_error(f"User '{username}' is NOT an admin (role: {role})")
                return False
        else:
            print_error(f"Failed to get user data: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Error checking role: {str(e)}")
        return False

def test_endpoint(token: str, endpoint: str, name: str) -> bool:
    """Test a single admin endpoint"""
    try:
        response = requests.get(
            f"{API_URL}{endpoint}",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200:
            print_success(f"{name}: OK")
            return True
        elif response.status_code == 401:
            print_error(f"{name}: 401 Unauthorized")
            return False
        else:
            print_warning(f"{name}: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"{name}: Error - {str(e)}")
        return False

def main():
    print("\n" + "="*60)
    print("Admin Authentication Fix Verification")
    print("="*60 + "\n")
    
    # Step 1: Check backend is running
    print_info("Step 1: Checking if backend is running...")
    try:
        response = requests.get(f"{API_URL}/docs", timeout=5)
        if response.status_code == 200:
            print_success("Backend is running")
        else:
            print_error("Backend returned unexpected status")
            return
    except Exception as e:
        print_error(f"Backend is NOT running: {str(e)}")
        print_info("Please start backend: cd backend && python -m uvicorn app.main:app --reload --port 8000")
        return
    
    print()
    
    # Step 2: Login
    print_info("Step 2: Testing login...")
    token = login()
    if not token:
        print_error("Cannot proceed without valid token")
        return
    
    print()
    
    # Step 3: Check user role
    print_info("Step 3: Verifying admin role...")
    is_admin = check_user_role(token)
    if not is_admin:
        print_error("User must be admin to access admin endpoints")
        return
    
    print()
    
    # Step 4: Test admin endpoints
    print_info("Step 4: Testing admin endpoints...")
    print()
    
    endpoints = [
        ("/api/admin/analytics/overview", "Analytics Overview"),
        ("/api/admin/settings", "System Settings"),
        ("/api/admin/users", "Users List"),
        ("/api/admin/pickups", "Pickups List"),
        ("/api/admin/waste-entries", "Waste Entries"),
        ("/api/admin/transactions", "Transactions"),
        ("/api/admin/stations", "Stations"),
        ("/api/admin/rewards", "Rewards"),
    ]
    
    results = []
    for endpoint, name in endpoints:
        result = test_endpoint(token, endpoint, name)
        results.append(result)
    
    print()
    print("="*60)
    
    # Summary
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print_success(f"All tests passed! ({passed}/{total})")
        print_success("Admin authentication is working correctly! 🎉")
    else:
        print_warning(f"Some tests failed: {passed}/{total} passed")
        print_info("Check the errors above for details")
    
    print("="*60 + "\n")
    
    # Next steps
    if passed == total:
        print_info("Next steps:")
        print("  1. Open http://localhost:3001/login")
        print("  2. Login with testuser/test123")
        print("  3. Navigate to http://localhost:3001/admin")
        print("  4. Test all admin pages")
    else:
        print_info("Troubleshooting:")
        print("  1. Verify backend is running on port 8000")
        print("  2. Verify user 'testuser' exists and is admin")
        print("  3. Check backend logs for errors")
        print("  4. Run: cd backend && python check_admin_access.py")

if __name__ == "__main__":
    main()
