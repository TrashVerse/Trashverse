from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from datetime import datetime, timedelta
from .. import models, schemas, auth
from ..database import get_db
from ..utils import get_waste_breakdown

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/dashboard", response_model=schemas.DashboardStats)
def get_dashboard_stats(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get comprehensive dashboard statistics"""
    # Get recent transactions
    recent_transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id
    ).order_by(models.Transaction.created_at.desc()).limit(10).all()
    
    # Get waste breakdown
    waste_breakdown = get_waste_breakdown(db, current_user.id)
    
    # Get upcoming pickups
    upcoming_pickups = db.query(models.Pickup).filter(
        models.Pickup.user_id == current_user.id,
        models.Pickup.status.in_(["pending", "scheduled"])
    ).order_by(models.Pickup.scheduled_date).limit(5).all()
    
    # Get available rewards
    available_rewards = db.query(models.Reward).filter(
        models.Reward.is_active == True,
        models.Reward.points_required <= current_user.points
    ).order_by(models.Reward.points_required).limit(10).all()
    
    user_stats = schemas.UserStats(
        total_earnings=current_user.total_earnings,
        total_pickups=current_user.total_pickups,
        total_waste_kg=current_user.total_waste_kg,
        total_co2_averted_kg=current_user.total_co2_averted_kg,
        points=current_user.points,
        recent_transactions=recent_transactions,
        waste_breakdown=waste_breakdown
    )
    
    return schemas.DashboardStats(
        user_stats=user_stats,
        upcoming_pickups=upcoming_pickups,
        available_rewards=available_rewards
    )

@router.get("/stats")
def get_user_stats(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get detailed user statistics"""
    waste_breakdown = get_waste_breakdown(db, current_user.id)
    
    # Monthly stats
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    monthly_waste = db.query(func.sum(models.WasteEntry.weight_kg)).filter(
        models.WasteEntry.user_id == current_user.id,
        models.WasteEntry.created_at >= thirty_days_ago
    ).scalar() or 0.0
    
    monthly_earnings = db.query(func.sum(models.WasteEntry.amount_earned)).filter(
        models.WasteEntry.user_id == current_user.id,
        models.WasteEntry.created_at >= thirty_days_ago
    ).scalar() or 0.0
    
    return {
        "total_stats": {
            "earnings": current_user.total_earnings,
            "pickups": current_user.total_pickups,
            "waste_kg": current_user.total_waste_kg,
            "co2_averted_kg": current_user.total_co2_averted_kg,
            "points": current_user.points
        },
        "monthly_stats": {
            "waste_kg": round(monthly_waste, 2),
            "earnings": round(monthly_earnings, 2)
        },
        "waste_breakdown": waste_breakdown
    }

@router.get("/leaderboard")
def get_leaderboard(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get top users by waste recycled"""
    top_users = db.query(models.User).filter(
        models.User.is_active == True
    ).order_by(models.User.total_waste_kg.desc()).limit(limit).all()
    
    leaderboard = []
    for idx, user in enumerate(top_users, 1):
        leaderboard.append({
            "rank": idx,
            "username": user.username,
            "total_waste_kg": user.total_waste_kg,
            "total_co2_averted_kg": user.total_co2_averted_kg,
            "points": user.points
        })
    
    return leaderboard
