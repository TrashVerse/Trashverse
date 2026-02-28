from geopy.distance import geodesic
from typing import Optional, List
import json
from datetime import datetime
from sqlalchemy.orm import Session
from . import models

# Pricing per kg for different waste types (in Naira)
WASTE_PRICING = {
    "plastic": 50.0,
    "paper": 30.0,
    "metal": 80.0,
    "electronics": 150.0,
    "glass": 40.0,
    "organic": 20.0,
    "textile": 35.0,
}

# Points per kg
POINTS_PER_KG = {
    "plastic": 10,
    "paper": 8,
    "metal": 15,
    "electronics": 25,
    "glass": 10,
    "organic": 5,
    "textile": 8,
}

# CO2 averted per kg (approximate values)
CO2_AVERTED_PER_KG = {
    "plastic": 2.5,
    "paper": 1.8,
    "metal": 3.2,
    "electronics": 4.0,
    "glass": 0.5,
    "organic": 0.3,
    "textile": 1.5,
}

def calculate_earnings(waste_type: str, weight_kg: float) -> dict:
    """Calculate earnings, points, and CO2 averted for waste entry"""
    waste_type_lower = waste_type.lower()
    
    amount = WASTE_PRICING.get(waste_type_lower, 30.0) * weight_kg
    points = int(POINTS_PER_KG.get(waste_type_lower, 8) * weight_kg)
    co2_averted = CO2_AVERTED_PER_KG.get(waste_type_lower, 1.0) * weight_kg
    
    return {
        "amount": round(amount, 2),
        "points": points,
        "co2_averted_kg": round(co2_averted, 2)
    }

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in kilometers"""
    try:
        return round(geodesic((lat1, lon1), (lat2, lon2)).kilometers, 2)
    except:
        return 0.0

def update_user_stats(db: Session, user: models.User):
    """Recalculate and update user statistics"""
    # Total waste entries
    waste_entries = db.query(models.WasteEntry).filter(
        models.WasteEntry.user_id == user.id
    ).all()
    
    total_waste_kg = sum(entry.weight_kg for entry in waste_entries)
    total_earnings = sum(entry.amount_earned for entry in waste_entries)
    total_points = sum(entry.points_earned for entry in waste_entries)
    
    # Calculate CO2 averted
    total_co2 = 0.0
    for entry in waste_entries:
        co2 = CO2_AVERTED_PER_KG.get(entry.waste_type.lower(), 1.0) * entry.weight_kg
        total_co2 += co2
    
    # Total completed pickups
    total_pickups = db.query(models.Pickup).filter(
        models.Pickup.user_id == user.id,
        models.Pickup.status == "completed"
    ).count()
    
    # Update user
    user.total_waste_kg = round(total_waste_kg, 2)
    user.total_earnings = round(total_earnings, 2)
    user.points = total_points
    user.total_co2_averted_kg = round(total_co2, 2)
    user.total_pickups = total_pickups
    user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(user)
    return user

def create_notification(
    db: Session,
    user_id: int,
    title: str,
    body: str,
    notification_type: str = "general",
    data: Optional[dict] = None
) -> models.Notification:
    """Create a notification for a user"""
    notification = models.Notification(
        user_id=user_id,
        title=title,
        body=body,
        type=notification_type,
        data=json.dumps(data) if data else None
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def get_waste_breakdown(db: Session, user_id: int) -> dict:
    """Get waste breakdown by type for a user"""
    waste_entries = db.query(models.WasteEntry).filter(
        models.WasteEntry.user_id == user_id
    ).all()
    
    breakdown = {}
    for entry in waste_entries:
        waste_type = entry.waste_type
        if waste_type not in breakdown:
            breakdown[waste_type] = {
                "weight_kg": 0.0,
                "count": 0,
                "earnings": 0.0
            }
        breakdown[waste_type]["weight_kg"] += entry.weight_kg
        breakdown[waste_type]["count"] += 1
        breakdown[waste_type]["earnings"] += entry.amount_earned
    
    # Round values
    for waste_type in breakdown:
        breakdown[waste_type]["weight_kg"] = round(breakdown[waste_type]["weight_kg"], 2)
        breakdown[waste_type]["earnings"] = round(breakdown[waste_type]["earnings"], 2)
    
    return breakdown

def generate_reference_id(prefix: str = "TRV") -> str:
    """Generate a unique reference ID"""
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    return f"{prefix}{timestamp}"
