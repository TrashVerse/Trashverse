#!/usr/bin/env python3
"""
Comprehensive Integration Test Suite for TrashVerse
Tests backend API, database, authentication, and all endpoints
"""

import requests
import json
import sys
from typing import Dict, Any, List, Tuple
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8000"
TEST_USER = {
    "username": "charles",
    "password": "password123"
}

# Color codes for terminal output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = 0
        self.tests: List[Tuple[str, bool, str]] = []
    
    def add_pass(self, test_name: str, message: str = ""):
        self.passed += 1
        self.tests.append((test_name, True, message))
        print(f"{Colors.GREEN}✓{Colors.RESET} {test_name}")
        if message:
            print(f"  {Colors.BLUE}→{Colors.RESET} {message}")
    
    def add_fail(self, test_name: str, error: str):
        self.failed += 1
        self.tests.append((test_name, False, error))
        print(f"{Colors.RED}✗{Colors.RESET} {test_name}")
        print(f"  {Colors.RED}→{Colors.RESET} {error}")
    
    def add_warning(self, message: str):
        self.warnings += 1
        print(f"{Colors.YELLOW}⚠{Colors.RESET} {message}")
    
    def print_summary(self):
        total = self.passed + self.failed
        print(f"\n{Colors.BOLD}{'='*60}{Colors.RESET}")
        print(f"{Colors.BOLD}TEST SUMMARY{Colors.RESET}")
        print(f"{'='*60}")
        print(f"Total Tests: {total}")
        print(f"{Colors.GREEN}Passed: {self.passed}{Colors.RESET}")
        print(f"{Colors.RED}Failed: {self.failed}{Colors.RESET}")
        if self.warnings > 0:
            print(f"{Colors.YELLOW}Warnings: {self.warnings}{Colors.RESET}")
        
        if total > 0:
            success_rate = (self.passed / total) * 100
            print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        print(f"{'='*60}\n")
        
        return self.failed == 0

results = TestResults()

def print_header(title: str):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{title}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}\n")

def test_backend_health():
    """Test if backend is running and healthy"""
    print_header("1. BACKEND HEALTH CHECKS")
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            results.add_pass("Backend health check", f"Status: {response.json()}")
        else:
            results.add_fail("Backend health check", f"Status code: {response.status_code}")
    except requests.exceptions.ConnectionError:
        results.add_fail("Backend health check", "Cannot connect to backend. Is it running?")
        return False
    except Exception as e:
        results.add_fail("Backend health check", str(e))
        return False
    
    # Test root endpoint
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            results.add_pass("Root endpoint", f"Version: {data.get('version')}")
        else:
            results.add_fail("Root endpoint", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Root endpoint", str(e))
    
    # Test API docs
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=5)
        if response.status_code == 200:
            results.add_pass("API documentation", "Swagger UI accessible")
        else:
            results.add_fail("API documentation", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("API documentation", str(e))
    
    return True

def test_authentication():
    """Test authentication endpoints"""
    print_header("2. AUTHENTICATION TESTS")
    
    # Test login
    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data={
                "username": TEST_USER["username"],
                "password": TEST_USER["password"]
            },
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            if "access_token" in data:
                results.add_pass("User login", f"Token received for user: {TEST_USER['username']}")
                return data["access_token"]
            else:
                results.add_fail("User login", "No access token in response")
                return None
        else:
            results.add_fail("User login", f"Status code: {response.status_code}, Response: {response.text}")
            return None
    except Exception as e:
        results.add_fail("User login", str(e))
        return None

def test_protected_endpoints(token: str):
    """Test endpoints that require authentication"""
    print_header("3. PROTECTED ENDPOINT TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test current user endpoint
    try:
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers, timeout=5)
        if response.status_code == 200:
            user_data = response.json()
            results.add_pass("Get current user", f"User: {user_data.get('username')}")
        else:
            results.add_fail("Get current user", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get current user", str(e))

def test_waste_endpoints(token: str):
    """Test waste management endpoints"""
    print_header("4. WASTE MANAGEMENT TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get waste items
    try:
        response = requests.get(f"{BASE_URL}/api/waste/items", headers=headers, timeout=5)
        if response.status_code == 200:
            items = response.json()
            results.add_pass("Get waste items", f"Found {len(items)} waste items")
        else:
            results.add_fail("Get waste items", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get waste items", str(e))
    
    # Get user waste entries
    try:
        response = requests.get(f"{BASE_URL}/api/waste/entries", headers=headers, timeout=5)
        if response.status_code == 200:
            entries = response.json()
            results.add_pass("Get user waste entries", f"Found {len(entries)} entries")
        else:
            results.add_fail("Get user waste entries", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get user waste entries", str(e))

def test_analytics_endpoints(token: str):
    """Test analytics endpoints"""
    print_header("5. ANALYTICS TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get dashboard analytics
    try:
        response = requests.get(f"{BASE_URL}/api/analytics/dashboard", headers=headers, timeout=5)
        if response.status_code == 200:
            analytics = response.json()
            results.add_pass("Get dashboard analytics", f"Total earnings: {analytics.get('total_earnings', 0)}")
        else:
            results.add_fail("Get dashboard analytics", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get dashboard analytics", str(e))
    
    # Get impact stats
    try:
        response = requests.get(f"{BASE_URL}/api/analytics/impact", headers=headers, timeout=5)
        if response.status_code == 200:
            impact = response.json()
            results.add_pass("Get impact statistics", f"CO2 saved: {impact.get('co2_saved', 0)} kg")
        else:
            results.add_fail("Get impact statistics", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get impact statistics", str(e))

def test_stations_endpoints(token: str):
    """Test recycling stations endpoints"""
    print_header("6. RECYCLING STATIONS TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get all stations
    try:
        response = requests.get(f"{BASE_URL}/api/stations/", headers=headers, timeout=5)
        if response.status_code == 200:
            stations = response.json()
            results.add_pass("Get recycling stations", f"Found {len(stations)} stations")
        else:
            results.add_fail("Get recycling stations", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get recycling stations", str(e))
    
    # Get nearby stations
    try:
        response = requests.get(
            f"{BASE_URL}/api/stations/nearby",
            params={"latitude": 6.5244, "longitude": 3.3792},  # Lagos coordinates
            headers=headers,
            timeout=5
        )
        if response.status_code == 200:
            stations = response.json()
            results.add_pass("Get nearby stations", f"Found {len(stations)} nearby stations")
        else:
            results.add_fail("Get nearby stations", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get nearby stations", str(e))

def test_transactions_endpoints(token: str):
    """Test transaction endpoints"""
    print_header("7. TRANSACTIONS TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get user transactions
    try:
        response = requests.get(f"{BASE_URL}/api/transactions/", headers=headers, timeout=5)
        if response.status_code == 200:
            transactions = response.json()
            results.add_pass("Get user transactions", f"Found {len(transactions)} transactions")
        else:
            results.add_fail("Get user transactions", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get user transactions", str(e))

def test_pickups_endpoints(token: str):
    """Test pickup scheduling endpoints"""
    print_header("8. PICKUP SCHEDULING TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get user pickups
    try:
        response = requests.get(f"{BASE_URL}/api/pickups/", headers=headers, timeout=5)
        if response.status_code == 200:
            pickups = response.json()
            results.add_pass("Get user pickups", f"Found {len(pickups)} scheduled pickups")
        else:
            results.add_fail("Get user pickups", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get user pickups", str(e))

def test_rewards_endpoints(token: str):
    """Test rewards endpoints"""
    print_header("9. REWARDS TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get available rewards
    try:
        response = requests.get(f"{BASE_URL}/api/rewards/", headers=headers, timeout=5)
        if response.status_code == 200:
            rewards = response.json()
            results.add_pass("Get available rewards", f"Found {len(rewards)} rewards")
        else:
            results.add_fail("Get available rewards", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get available rewards", str(e))
    
    # Get user rewards
    try:
        response = requests.get(f"{BASE_URL}/api/rewards/my-rewards", headers=headers, timeout=5)
        if response.status_code == 200:
            user_rewards = response.json()
            results.add_pass("Get user rewards", f"User has {len(user_rewards)} rewards")
        else:
            results.add_fail("Get user rewards", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get user rewards", str(e))

def test_notifications_endpoints(token: str):
    """Test notifications endpoints"""
    print_header("10. NOTIFICATIONS TESTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get user notifications
    try:
        response = requests.get(f"{BASE_URL}/api/notifications/", headers=headers, timeout=5)
        if response.status_code == 200:
            notifications = response.json()
            results.add_pass("Get user notifications", f"Found {len(notifications)} notifications")
        else:
            results.add_fail("Get user notifications", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Get user notifications", str(e))

def test_database_files():
    """Check if database files exist"""
    print_header("11. DATABASE FILE CHECKS")
    
    import os
    
    db_path = "backend/trashverse.db"
    if os.path.exists(db_path):
        size = os.path.getsize(db_path)
        results.add_pass("Database file exists", f"Size: {size} bytes")
    else:
        results.add_fail("Database file exists", "Database file not found")

def test_configuration_files():
    """Check if configuration files are properly set up"""
    print_header("12. CONFIGURATION FILES CHECK")
    
    import os
    
    # Check backend .env
    if os.path.exists("backend/.env"):
        results.add_pass("Backend .env file", "Configuration file exists")
    else:
        results.add_warning("Backend .env file not found (using defaults)")
    
    # Check mobile package.json
    if os.path.exists("mobile/package.json"):
        results.add_pass("Mobile package.json", "Configuration file exists")
    else:
        results.add_fail("Mobile package.json", "File not found")
    
    # Check web package.json
    if os.path.exists("web/package.json"):
        results.add_pass("Web package.json", "Configuration file exists")
    else:
        results.add_fail("Web package.json", "File not found")

def main():
    """Run all tests"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔════════════════════════════════════════════════════════════╗")
    print("║     TrashVerse Comprehensive Integration Test Suite       ║")
    print("║                                                            ║")
    print("║  Testing: Backend API, Database, Auth, and All Endpoints  ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print(f"{Colors.RESET}\n")
    
    print(f"{Colors.YELLOW}Starting tests at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.RESET}\n")
    
    # Test backend health first
    if not test_backend_health():
        print(f"\n{Colors.RED}{Colors.BOLD}CRITICAL: Backend is not running!{Colors.RESET}")
        print(f"{Colors.YELLOW}Please start the backend first:{Colors.RESET}")
        print(f"  cd backend")
        print(f"  venv\\Scripts\\activate")
        print(f"  python run.py")
        sys.exit(1)
    
    # Test authentication and get token
    token = test_authentication()
    
    if token:
        # Run all endpoint tests
        test_protected_endpoints(token)
        test_waste_endpoints(token)
        test_analytics_endpoints(token)
        test_stations_endpoints(token)
        test_transactions_endpoints(token)
        test_pickups_endpoints(token)
        test_rewards_endpoints(token)
        test_notifications_endpoints(token)
    else:
        results.add_warning("Skipping protected endpoint tests (no auth token)")
    
    # Test database and configuration
    test_database_files()
    test_configuration_files()
    
    # Print summary
    success = results.print_summary()
    
    if success:
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 All tests passed! Your TrashVerse system is working great!{Colors.RESET}\n")
        sys.exit(0)
    else:
        print(f"{Colors.RED}{Colors.BOLD}⚠️  Some tests failed. Please review the errors above.{Colors.RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
