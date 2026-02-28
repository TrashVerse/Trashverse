import firebase_admin
from firebase_admin import credentials, messaging
from typing import Optional
import os
from .config import settings

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        if not firebase_admin._apps:
            if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
                cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
                firebase_admin.initialize_app(cred)
                return True
            else:
                print("Firebase credentials file not found. Push notifications disabled.")
                return False
    except Exception as e:
        print(f"Firebase initialization error: {e}")
        return False

def send_push_notification(
    fcm_token: str,
    title: str,
    body: str,
    data: Optional[dict] = None
) -> bool:
    """Send push notification to a device"""
    try:
        if not firebase_admin._apps:
            return False
        
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data or {},
            token=fcm_token,
        )
        
        response = messaging.send(message)
        print(f"Successfully sent message: {response}")
        return True
    except Exception as e:
        print(f"Error sending push notification: {e}")
        return False

def send_push_to_multiple(
    fcm_tokens: list,
    title: str,
    body: str,
    data: Optional[dict] = None
) -> dict:
    """Send push notification to multiple devices"""
    try:
        if not firebase_admin._apps:
            return {"success": 0, "failure": len(fcm_tokens)}
        
        message = messaging.MulticastMessage(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data or {},
            tokens=fcm_tokens,
        )
        
        response = messaging.send_multicast(message)
        print(f"Successfully sent {response.success_count} messages")
        print(f"Failed to send {response.failure_count} messages")
        
        return {
            "success": response.success_count,
            "failure": response.failure_count
        }
    except Exception as e:
        print(f"Error sending push notifications: {e}")
        return {"success": 0, "failure": len(fcm_tokens)}
