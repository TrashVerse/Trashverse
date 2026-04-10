"""
Admin-only API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta

from app import models, schemas, auth
from app.database import get_db

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# ============= USER MANAGEMENT =============

@router.get("/users", response_model=List[schemas.UserResponse])
def get_all_users(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    city: Optional[str] = None,
    role: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all users with optional filters"""
    query = db.query(models.User)
    
    if search:
        query = query.filter(
            (models.User.username.ilike(f"%{search}%")) |
            (models.User.email.ilike(f"%{search}%")) |
            (models.User.full_name.ilike(f"%{search}%"))
        )
    
    if city:
        query = query.filter(models.User.city.ilike(f"%{city}%"))
    
    if role:
        query = query.filter(models.User.role == role)
    
    users = query.offset(skip).limit(limit).all()
    return users

@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user_details(
    user_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get detailed user information"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{user_id}/toggle-active")
def toggle_user_active(
    user_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Activate or deactivate a user account"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = not user.is_active
    db.commit()
    
    return {"message": f"User {'activated' if user.is_active else 'deactivated'}", "is_active": user.is_active}

@router.put("/users/{user_id}/role")
def update_user_role(
    user_id: int,
    role: str = Query(..., regex="^(user|admin)$"),
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Change user role"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.role = role
    db.commit()
    
    return {"message": f"User role updated to {role}", "role": user.role}

# ============= PICKUP MANAGEMENT =============

@router.get("/pickups", response_model=List[schemas.PickupResponse])
def get_all_pickups(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all pickups across all users"""
    query = db.query(models.Pickup)
    
    if status_filter:
        query = query.filter(models.Pickup.status == status_filter)
    
    pickups = query.order_by(desc(models.Pickup.created_at)).offset(skip).limit(limit).all()
    return pickups

@router.put("/pickups/{pickup_id}/status")
def update_pickup_status(
    pickup_id: int,
    new_status: str = Query(..., regex="^(pending|in_progress|completed|cancelled)$"),
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update pickup status"""
    pickup = db.query(models.Pickup).filter(models.Pickup.id == pickup_id).first()
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup not found")
    
    pickup.status = new_status
    if new_status == "completed":
        pickup.completed_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Pickup status updated", "status": pickup.status}

# ============= WASTE ENTRY MANAGEMENT =============

@router.get("/waste-entries", response_model=List[schemas.WasteEntryResponse])
def get_all_waste_entries(
    skip: int = 0,
    limit: int = 100,
    waste_type: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all waste entries"""
    query = db.query(models.WasteEntry)
    
    if waste_type:
        query = query.filter(models.WasteEntry.waste_type == waste_type)
    
    entries = query.order_by(desc(models.WasteEntry.created_at)).offset(skip).limit(limit).all()
    return entries

@router.put("/waste-entries/{entry_id}")
def update_waste_entry(
    entry_id: int,
    weight_kg: Optional[float] = None,
    value: Optional[float] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update waste entry details"""
    entry = db.query(models.WasteEntry).filter(models.WasteEntry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Waste entry not found")
    
    if weight_kg is not None:
        entry.weight_kg = weight_kg
    if value is not None:
        entry.value = value
    
    db.commit()
    
    return {"message": "Waste entry updated", "entry_id": entry.id}

@router.delete("/waste-entries/{entry_id}")
def delete_waste_entry(
    entry_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a waste entry"""
    entry = db.query(models.WasteEntry).filter(models.WasteEntry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Waste entry not found")
    
    db.delete(entry)
    db.commit()
    
    return {"message": "Waste entry deleted"}

# ============= TRANSACTION MANAGEMENT =============

@router.get("/transactions", response_model=List[schemas.TransactionResponse])
def get_all_transactions(
    skip: int = 0,
    limit: int = 100,
    transaction_type: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all transactions"""
    query = db.query(models.Transaction)
    
    if transaction_type:
        query = query.filter(models.Transaction.type == transaction_type)
    
    transactions = query.order_by(desc(models.Transaction.created_at)).offset(skip).limit(limit).all()
    return transactions

@router.put("/transactions/{transaction_id}/approve")
def approve_withdrawal(
    transaction_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Approve a withdrawal request"""
    transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    if transaction.type != "withdrawal":
        raise HTTPException(status_code=400, detail="Only withdrawals can be approved")
    
    # Mark as approved (you can add a status field to Transaction model)
    transaction.description = f"{transaction.description} - APPROVED"
    db.commit()
    
    return {"message": "Withdrawal approved", "transaction_id": transaction.id}

# ============= STATION MANAGEMENT =============

@router.get("/stations", response_model=List[schemas.RecyclingStationResponse])
def get_all_stations(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all recycling stations"""
    stations = db.query(models.RecyclingStation).offset(skip).limit(limit).all()
    return stations

@router.put("/stations/{station_id}", response_model=schemas.RecyclingStationResponse)
def update_station(
    station_id: int,
    station_update: schemas.RecyclingStationCreate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update station details"""
    station = db.query(models.RecyclingStation).filter(models.RecyclingStation.id == station_id).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    
    for key, value in station_update.dict().items():
        setattr(station, key, value)
    
    db.commit()
    db.refresh(station)
    
    return station

@router.delete("/stations/{station_id}")
def delete_station(
    station_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a recycling station"""
    station = db.query(models.RecyclingStation).filter(models.RecyclingStation.id == station_id).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    
    db.delete(station)
    db.commit()
    
    return {"message": "Station deleted"}

# ============= REWARD MANAGEMENT =============

@router.get("/rewards", response_model=List[schemas.RewardResponse])
def get_all_rewards(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all rewards"""
    rewards = db.query(models.Reward).offset(skip).limit(limit).all()
    return rewards

@router.put("/rewards/{reward_id}", response_model=schemas.RewardResponse)
def update_reward(
    reward_id: int,
    reward_update: schemas.RewardCreate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update reward details"""
    reward = db.query(models.Reward).filter(models.Reward.id == reward_id).first()
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    for key, value in reward_update.dict().items():
        setattr(reward, key, value)
    
    db.commit()
    db.refresh(reward)
    
    return reward

@router.delete("/rewards/{reward_id}")
def delete_reward(
    reward_id: int,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a reward"""
    reward = db.query(models.Reward).filter(models.Reward.id == reward_id).first()
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    db.delete(reward)
    db.commit()
    
    return {"message": "Reward deleted"}

# ============= ANALYTICS & REPORTS =============

@router.get("/analytics/overview")
def get_platform_analytics(
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive platform-wide analytics covering all aspects of the app"""
    
    # ============= USER STATISTICS =============
    total_users = db.query(func.count(models.User.id)).scalar()
    active_users = db.query(func.count(models.User.id)).filter(models.User.is_active == True).scalar()
    
    # New users in last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    new_users = db.query(func.count(models.User.id)).filter(
        models.User.created_at >= thirty_days_ago
    ).scalar()
    
    # Users by role
    users_by_role = db.query(
        models.User.role,
        func.count(models.User.id).label('count')
    ).group_by(models.User.role).all()
    
    # Users by city
    users_by_city = db.query(
        models.User.city,
        func.count(models.User.id).label('count')
    ).group_by(models.User.city).order_by(desc('count')).limit(10).all()
    
    # ============= WASTE STATISTICS =============
    total_waste = db.query(func.sum(models.WasteEntry.weight_kg)).scalar() or 0
    total_waste_value = db.query(func.sum(models.WasteEntry.amount_earned)).scalar() or 0
    total_waste_entries = db.query(func.count(models.WasteEntry.id)).scalar()
    
    # Waste by type
    waste_by_type = db.query(
        models.WasteEntry.waste_type,
        func.sum(models.WasteEntry.weight_kg).label('total_kg'),
        func.count(models.WasteEntry.id).label('count')
    ).group_by(models.WasteEntry.waste_type).all()
    
    # Recent waste entries (last 7 days)
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_waste_entries = db.query(func.count(models.WasteEntry.id)).filter(
        models.WasteEntry.created_at >= seven_days_ago
    ).scalar()
    
    # ============= PICKUP STATISTICS =============
    total_pickups = db.query(func.count(models.Pickup.id)).scalar()
    completed_pickups = db.query(func.count(models.Pickup.id)).filter(
        models.Pickup.status == "completed"
    ).scalar()
    pending_pickups = db.query(func.count(models.Pickup.id)).filter(
        models.Pickup.status == "pending"
    ).scalar()
    in_progress_pickups = db.query(func.count(models.Pickup.id)).filter(
        models.Pickup.status == "in_progress"
    ).scalar()
    cancelled_pickups = db.query(func.count(models.Pickup.id)).filter(
        models.Pickup.status == "cancelled"
    ).scalar()
    
    # Pickups by status
    pickups_by_status = db.query(
        models.Pickup.status,
        func.count(models.Pickup.id).label('count')
    ).group_by(models.Pickup.status).all()
    
    # ============= TRANSACTION STATISTICS =============
    total_earnings = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.type == "earning"
    ).scalar() or 0
    
    total_withdrawals = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.type == "withdrawal"
    ).scalar() or 0
    
    total_bonuses = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.type == "bonus"
    ).scalar() or 0
    
    total_transactions = db.query(func.count(models.Transaction.id)).scalar()
    
    # Transactions by type
    transactions_by_type = db.query(
        models.Transaction.type,
        func.count(models.Transaction.id).label('count'),
        func.sum(models.Transaction.amount).label('total_amount')
    ).group_by(models.Transaction.type).all()
    
    # ============= STATION STATISTICS =============
    total_stations = db.query(func.count(models.RecyclingStation.id)).scalar()
    active_stations = db.query(func.count(models.RecyclingStation.id)).filter(
        models.RecyclingStation.is_active == True
    ).scalar()
    
    # Stations by city
    stations_by_city = db.query(
        models.RecyclingStation.city,
        func.count(models.RecyclingStation.id).label('count')
    ).group_by(models.RecyclingStation.city).all()
    
    # ============= REWARD STATISTICS =============
    total_rewards = db.query(func.count(models.Reward.id)).scalar()
    active_rewards = db.query(func.count(models.Reward.id)).filter(
        models.Reward.is_active == True
    ).scalar()
    total_reward_stock = db.query(func.sum(models.Reward.stock_quantity)).scalar() or 0
    
    # Rewards by type
    rewards_by_type = db.query(
        models.Reward.reward_type,
        func.count(models.Reward.id).label('count')
    ).group_by(models.Reward.reward_type).all()
    
    # ============= NOTIFICATION STATISTICS =============
    total_notifications = db.query(func.count(models.Notification.id)).scalar()
    unread_notifications = db.query(func.count(models.Notification.id)).filter(
        models.Notification.is_read == False
    ).scalar()
    
    # Notifications by type
    notifications_by_type = db.query(
        models.Notification.type,
        func.count(models.Notification.id).label('count')
    ).group_by(models.Notification.type).all()
    
    # ============= ENVIRONMENTAL IMPACT =============
    total_co2_averted = db.query(func.sum(models.User.total_co2_averted_kg)).scalar() or 0
    total_points_earned = db.query(func.sum(models.User.points)).scalar() or 0
    
    # ============= TOP PERFORMERS =============
    top_users = db.query(models.User).order_by(
        desc(models.User.total_waste_kg)
    ).limit(10).all()
    
    top_earners = db.query(models.User).order_by(
        desc(models.User.total_earnings)
    ).limit(10).all()
    
    # ============= RECENT ACTIVITY =============
    recent_users = db.query(func.count(models.User.id)).filter(
        models.User.created_at >= seven_days_ago
    ).scalar()
    
    recent_pickups = db.query(func.count(models.Pickup.id)).filter(
        models.Pickup.created_at >= seven_days_ago
    ).scalar()
    
    recent_transactions = db.query(func.count(models.Transaction.id)).filter(
        models.Transaction.created_at >= seven_days_ago
    ).scalar()
    
    return {
        "users": {
            "total": total_users,
            "active": active_users,
            "inactive": total_users - active_users,
            "new_last_30_days": new_users,
            "new_last_7_days": recent_users,
            "by_role": [{"role": r[0], "count": r[1]} for r in users_by_role],
            "by_city": [{"city": c[0] or "Unknown", "count": c[1]} for c in users_by_city]
        },
        "waste": {
            "total_kg": float(total_waste),
            "total_value": float(total_waste_value),
            "total_entries": total_waste_entries,
            "recent_entries_7_days": recent_waste_entries,
            "by_type": [{"type": wt[0], "kg": float(wt[1]), "count": wt[2]} for wt in waste_by_type]
        },
        "pickups": {
            "total": total_pickups,
            "completed": completed_pickups,
            "pending": pending_pickups,
            "in_progress": in_progress_pickups,
            "cancelled": cancelled_pickups,
            "completion_rate": (completed_pickups / total_pickups * 100) if total_pickups > 0 else 0,
            "recent_7_days": recent_pickups,
            "by_status": [{"status": s[0], "count": s[1]} for s in pickups_by_status]
        },
        "transactions": {
            "total": total_transactions,
            "total_earnings": float(total_earnings),
            "total_withdrawals": float(total_withdrawals),
            "total_bonuses": float(total_bonuses),
            "platform_revenue": float(total_earnings - total_withdrawals),
            "recent_7_days": recent_transactions,
            "by_type": [{"type": t[0], "count": t[1], "total_amount": float(t[2] or 0)} for t in transactions_by_type]
        },
        "stations": {
            "total": total_stations,
            "active": active_stations,
            "inactive": total_stations - active_stations,
            "by_city": [{"city": s[0] or "Unknown", "count": s[1]} for s in stations_by_city]
        },
        "rewards": {
            "total": total_rewards,
            "active": active_rewards,
            "inactive": total_rewards - active_rewards,
            "total_stock": int(total_reward_stock),
            "by_type": [{"type": r[0] or "Unknown", "count": r[1]} for r in rewards_by_type]
        },
        "notifications": {
            "total": total_notifications,
            "unread": unread_notifications,
            "read": total_notifications - unread_notifications,
            "by_type": [{"type": n[0] or "general", "count": n[1]} for n in notifications_by_type]
        },
        "environmental_impact": {
            "total_co2_averted_kg": float(total_co2_averted),
            "total_points_earned": int(total_points_earned)
        },
        "top_users": [
            {
                "id": u.id,
                "username": u.username,
                "total_waste_kg": u.total_waste_kg,
                "total_earnings": u.total_earnings
            } for u in top_users
        ],
        "top_earners": [
            {
                "id": u.id,
                "username": u.username,
                "total_earnings": u.total_earnings,
                "total_waste_kg": u.total_waste_kg
            } for u in top_earners
        ]
    }

# ============= NOTIFICATIONS MANAGEMENT =============

@router.post("/notifications/broadcast")
def send_broadcast_notification(
    title: str,
    message: str,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Send notification to all users"""
    users = db.query(models.User).filter(models.User.is_active == True).all()
    
    notifications_created = 0
    for user in users:
        notification = models.Notification(
            user_id=user.id,
            title=title,
            message=message,
            type="announcement"
        )
        db.add(notification)
        notifications_created += 1
    
    db.commit()
    
    return {
        "message": "Broadcast notification sent",
        "recipients": notifications_created
    }

# ============= SYSTEM SETTINGS =============

import json

# Default settings
DEFAULT_SETTINGS = {
    "waste_pricing": {
        "plastic": 50,
        "paper": 30,
        "metal": 80,
        "glass": 40,
        "organic": 20
    },
    "platform_commission": 10,
    "minimum_withdrawal": 1000,
    "points_per_kg": 10
}

def get_setting_from_db(db: Session, key: str, default=None):
    """Get a setting from database"""
    setting = db.query(models.SystemSettings).filter(models.SystemSettings.key == key).first()
    if setting:
        return json.loads(setting.value)
    return default

def save_setting_to_db(db: Session, key: str, value, user_id: int = None):
    """Save a setting to database"""
    setting = db.query(models.SystemSettings).filter(models.SystemSettings.key == key).first()
    if setting:
        setting.value = json.dumps(value)
        setting.updated_at = datetime.utcnow()
        setting.updated_by = user_id
    else:
        setting = models.SystemSettings(
            key=key,
            value=json.dumps(value),
            updated_by=user_id
        )
        db.add(setting)
    db.commit()
    return setting

@router.get("/settings")
def get_system_settings(
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get system settings"""
    # Get settings from database or use defaults
    waste_pricing = get_setting_from_db(db, "waste_pricing", DEFAULT_SETTINGS["waste_pricing"])
    platform_commission = get_setting_from_db(db, "platform_commission", DEFAULT_SETTINGS["platform_commission"])
    minimum_withdrawal = get_setting_from_db(db, "minimum_withdrawal", DEFAULT_SETTINGS["minimum_withdrawal"])
    points_per_kg = get_setting_from_db(db, "points_per_kg", DEFAULT_SETTINGS["points_per_kg"])
    
    return {
        "waste_pricing": waste_pricing,
        "platform_commission": platform_commission,
        "minimum_withdrawal": minimum_withdrawal,
        "points_per_kg": points_per_kg
    }

@router.put("/settings")
def update_system_settings(
    waste_pricing: dict = None,
    platform_commission: float = None,
    minimum_withdrawal: float = None,
    points_per_kg: int = None,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update system settings"""
    
    if waste_pricing is not None:
        save_setting_to_db(db, "waste_pricing", waste_pricing, current_user.id)
    
    if platform_commission is not None:
        save_setting_to_db(db, "platform_commission", platform_commission, current_user.id)
    
    if minimum_withdrawal is not None:
        save_setting_to_db(db, "minimum_withdrawal", minimum_withdrawal, current_user.id)
    
    if points_per_kg is not None:
        save_setting_to_db(db, "points_per_kg", points_per_kg, current_user.id)
    
    # Return updated settings
    return {
        "message": "Settings updated successfully",
        "settings": get_system_settings(current_user, db)
    }
