from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db
from ..utils import create_notification, generate_reference_id

router = APIRouter(prefix="/api/rewards", tags=["Rewards"])

@router.get("/", response_model=List[schemas.RewardResponse])
def get_rewards(
    skip: int = 0,
    limit: int = 50,
    available_only: bool = False,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all rewards"""
    query = db.query(models.Reward).filter(models.Reward.is_active == True)
    
    if available_only:
        query = query.filter(models.Reward.points_required <= current_user.points)
    
    rewards = query.order_by(models.Reward.points_required).offset(skip).limit(limit).all()
    
    return rewards

@router.get("/{reward_id}", response_model=schemas.RewardResponse)
def get_reward(
    reward_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific reward"""
    reward = db.query(models.Reward).filter(models.Reward.id == reward_id).first()
    
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    return reward

@router.post("/{reward_id}/redeem", response_model=schemas.TransactionResponse)
def redeem_reward(
    reward_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Redeem a reward using points"""
    reward = db.query(models.Reward).filter(
        models.Reward.id == reward_id,
        models.Reward.is_active == True
    ).first()
    
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    if current_user.points < reward.points_required:
        raise HTTPException(status_code=400, detail="Insufficient points")
    
    if reward.stock_quantity <= 0:
        raise HTTPException(status_code=400, detail="Reward out of stock")
    
    # Deduct points
    current_user.points -= reward.points_required
    
    # Reduce stock
    reward.stock_quantity -= 1
    
    # Create transaction
    transaction = models.Transaction(
        user_id=current_user.id,
        type="reward",
        amount=reward.reward_value,
        points=-reward.points_required,
        description=f"Redeemed: {reward.name}",
        reference_id=generate_reference_id("RW"),
        reference_type="reward"
    )
    db.add(transaction)
    
    db.commit()
    db.refresh(transaction)
    
    # Create notification
    create_notification(
        db,
        current_user.id,
        "Reward Redeemed!",
        f"You've successfully redeemed {reward.name} for {reward.points_required} points",
        "reward",
        {"reward_id": reward.id, "transaction_id": transaction.id}
    )
    
    return transaction

@router.post("/", response_model=schemas.RewardResponse, status_code=status.HTTP_201_CREATED)
def create_reward(
    reward: schemas.RewardCreate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new reward (admin only)"""
    db_reward = models.Reward(**reward.model_dump())
    db.add(db_reward)
    db.commit()
    db.refresh(db_reward)
    
    return db_reward
