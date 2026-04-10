"""
Comprehensive test suite for newly integrated features
Tests all 7 backend APIs with their new frontend integrations
"""
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

# Test credentials
TEST_USER = {
    "username": "testuser",
    "password": "test123"
}

def get_auth_token():
    """Login and get authentication token"""
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        data=TEST_USER
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"❌ Login failed: {response.text}")
        return None

def test_create_station(token):
    """Test 1: Create Recycling Station"""
    print("\n🧪 Test 1: Create Recycling Station")
    
    headers = {"Authorization": f"Bearer {token}"}
    station_data = {
        "name": "Test Recycling Center",
        "address": "123 Test Street",
        "city": "Lagos",
        "latitude": 6.5244,
        "longitude": 3.3792,
        "phone": "+234-123-456-7890",
        "email": "test@recycling.com",
        "accepted_waste_types": "plastic, paper, metal, glass",
        "operating_hours": "Mon-Fri: 8AM-5PM"
    }
    
    response = requests.post(
        f"{BASE_URL}/api/stations/",
        headers=headers,
        json=station_data
    )
    
    if response.status_code == 201:
        station = response.json()
        print(f"✅ Station created: {station['name']} (ID: {station['id']})")
        return station['id']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def test_create_reward(token):
    """Test 2: Create Reward"""
    print("\n🧪 Test 2: Create Reward")
    
    headers = {"Authorization": f"Bearer {token}"}
    reward_data = {
        "name": "Test Reward - ₦500 Voucher",
        "description": "Get ₦500 off your next purchase",
        "points_required": 100,
        "reward_type": "voucher",
        "reward_value": 500.0,
        "stock_quantity": 50
    }
    
    response = requests.post(
        f"{BASE_URL}/api/rewards/",
        headers=headers,
        json=reward_data
    )
    
    if response.status_code == 201:
        reward = response.json()
        print(f"✅ Reward created: {reward['name']} (ID: {reward['id']})")
        return reward['id']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def test_withdraw_earnings(token):
    """Test 3: Withdraw Earnings"""
    print("\n🧪 Test 3: Withdraw Earnings")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # First check balance
    balance_response = requests.get(
        f"{BASE_URL}/api/transactions/balance",
        headers=headers
    )
    
    if balance_response.status_code == 200:
        balance = balance_response.json()
        print(f"📊 Current balance: ₦{balance['balance']}")
        
        if balance['balance'] >= 1000:
            # Try withdrawal
            response = requests.post(
                f"{BASE_URL}/api/transactions/withdraw",
                headers=headers,
                params={"amount": 1000}
            )
            
            if response.status_code == 200:
                transaction = response.json()
                print(f"✅ Withdrawal successful: ₦{abs(transaction['amount'])}")
                return True
            else:
                print(f"❌ Withdrawal failed: {response.status_code} - {response.text}")
                return False
        else:
            print(f"⚠️ Insufficient balance for withdrawal (need ₦1,000)")
            return None
    else:
        print(f"❌ Failed to get balance: {balance_response.status_code}")
        return False

def test_upload_waste_image(token):
    """Test 4: Upload Waste Image"""
    print("\n🧪 Test 4: Upload Waste Image")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create a dummy image file
    import io
    from PIL import Image
    
    # Create a simple test image
    img = Image.new('RGB', (100, 100), color='green')
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    files = {'file': ('test_waste.png', img_bytes, 'image/png')}
    
    response = requests.post(
        f"{BASE_URL}/api/upload/waste-image",
        headers=headers,
        files=files
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Image uploaded: {result['file_url']}")
        return result['file_url']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def test_upload_profile_image(token):
    """Test 5: Upload Profile Image"""
    print("\n🧪 Test 5: Upload Profile Image")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create a dummy image file
    import io
    from PIL import Image
    
    img = Image.new('RGB', (100, 100), color='blue')
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    files = {'file': ('test_profile.png', img_bytes, 'image/png')}
    
    response = requests.post(
        f"{BASE_URL}/api/upload/profile-image",
        headers=headers,
        files=files
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Profile image uploaded: {result['file_url']}")
        return result['file_url']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def test_update_pickup_status(token):
    """Test 6: Update Pickup Status"""
    print("\n🧪 Test 6: Update Pickup Status")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # First create a pickup
    pickup_data = {
        "pickup_address": "456 Test Avenue",
        "waste_type": "plastic",
        "estimated_weight_kg": 5.0,
        "notes": "Test pickup for status update"
    }
    
    create_response = requests.post(
        f"{BASE_URL}/api/pickups/",
        headers=headers,
        json=pickup_data
    )
    
    if create_response.status_code == 201:
        pickup = create_response.json()
        pickup_id = pickup['id']
        print(f"📦 Pickup created: ID {pickup_id}, Status: {pickup['status']}")
        
        # Update status
        update_data = {"status": "scheduled"}
        update_response = requests.put(
            f"{BASE_URL}/api/pickups/{pickup_id}",
            headers=headers,
            json=update_data
        )
        
        if update_response.status_code == 200:
            updated_pickup = update_response.json()
            print(f"✅ Status updated: {pickup['status']} → {updated_pickup['status']}")
            return pickup_id
        else:
            print(f"❌ Update failed: {update_response.status_code} - {update_response.text}")
            return None
    else:
        print(f"❌ Pickup creation failed: {create_response.status_code}")
        return None

def test_find_nearest_filtered(token):
    """Test 7: Find Nearest Station with Waste Type Filter"""
    print("\n🧪 Test 7: Find Nearest Station (Filtered)")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test coordinates (Lagos)
    params = {
        "latitude": 6.5244,
        "longitude": 3.3792,
        "waste_type": "plastic"
    }
    
    response = requests.get(
        f"{BASE_URL}/api/stations/nearby/search",
        headers=headers,
        params=params
    )
    
    if response.status_code == 200:
        station = response.json()
        print(f"✅ Nearest station found: {station['name']}")
        print(f"   Distance: {station.get('distance_km', 'N/A')} km")
        print(f"   Accepts: {station.get('accepted_waste_types', 'N/A')}")
        return station['id']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def run_all_tests():
    """Run all integration tests"""
    print("=" * 60)
    print("🚀 TESTING NEW FEATURE INTEGRATIONS")
    print("=" * 60)
    
    # Get authentication token
    print("\n🔐 Authenticating...")
    token = get_auth_token()
    
    if not token:
        print("\n❌ Authentication failed. Cannot proceed with tests.")
        return
    
    print(f"✅ Authenticated successfully")
    
    # Run all tests
    results = {
        "create_station": test_create_station(token),
        "create_reward": test_create_reward(token),
        "withdraw_earnings": test_withdraw_earnings(token),
        "upload_waste_image": test_upload_waste_image(token),
        "upload_profile_image": test_upload_profile_image(token),
        "update_pickup_status": test_update_pickup_status(token),
        "find_nearest_filtered": test_find_nearest_filtered(token)
    }
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for v in results.values() if v is not None and v is not False)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result not in [None, False] else "❌ FAIL" if result is False else "⚠️ SKIP"
        print(f"{status} - {test_name.replace('_', ' ').title()}")
    
    print(f"\n🎯 Results: {passed}/{total} tests passed")
    print("=" * 60)

if __name__ == "__main__":
    try:
        run_all_tests()
    except Exception as e:
        print(f"\n❌ Test suite error: {str(e)}")
        import traceback
        traceback.print_exc()
