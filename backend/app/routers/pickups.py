from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from .. import models, schemas, auth
from ..database import get_db
from ..utils import create_notification, update_user_stats

router = APIRouter(prefix="/api/pickups", tags=["Pickups"])

@router.post("/", response_model=schemas.PickupResponse, status_code=status.HTTP_201_CREATED)
def schedule_pickup(
    pickup: schemas.PickupCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Schedule a new pickup"""
    db_pickup = models.Pickup(
        user_id=current_user.id,
        pickup_address=pickup.pickup_address,
        pickup_latitude=pickup.pickup_latitude,
        pickup_longitude=pickup.pickup_longitude,
        waste_type=pickup.waste_type.value,
        estimated_weight_kg=pickup.estimated_weight_kg,
        scheduled_date=pickup.scheduled_date,
        notes=pickup.notes,
        status="pending"
    )
    db.add(db_pickup)
    db.commit()
    db.refresh(db_pickup)
    
    # Create notification
    create_notification(
        db,
        current_user.id,
        "Pickup Scheduled",
        f"Your pickup for {pickup.estimated_weight_kg}kg of {pickup.waste_type.value} has been scheduled",
        "pickup",
        {"pickup_id": db_pickup.id}
    )
    
    return db_pickup

@router.get("/", response_model=List[schemas.PickupResponse])
def get_pickups(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all pickups for current user"""
    query = db.query(models.Pickup).filter(
        models.Pickup.user_id == current_user.id
    )
    
    if status:
        query = query.filter(models.Pickup.status == status)
    
    pickups = query.order_by(models.Pickup.created_at.desc()).offset(skip).limit(limit).all()
    
    return pickups

@router.get("/{pickup_id}", response_model=schemas.PickupResponse)
def get_pickup(
    pickup_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific pickup"""
    pickup = db.query(models.Pickup).filter(
        models.Pickup.id == pickup_id,
        models.Pickup.user_id == current_user.id
    ).first()
    
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup not found")
    
    return pickup

@router.put("/{pickup_id}", response_model=schemas.PickupResponse)
def update_pickup(
    pickup_id: int,
    pickup_update: schemas.PickupUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a pickup"""
    pickup = db.query(models.Pickup).filter(
        models.Pickup.id == pickup_id,
        models.Pickup.user_id == current_user.id
    ).first()
    
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup not found")
    
    update_data = pickup_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(pickup, field, value)
    
    # If status changed to completed, update stats
    if pickup_update.status == schemas.PickupStatus.COMPLETED:
        pickup.completed_date = datetime.utcnow()
        update_user_stats(db, current_user)
        
        # Create notification
        create_notification(
            db,
            current_user.id,
            "Pickup Completed",
            f"Your pickup has been completed successfully",
            "pickup",
            {"pickup_id": pickup.id}
        )
    
    db.commit()
    db.refresh(pickup)
    
    return pickup

@router.delete("/{pickup_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_pickup(
    pickup_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Cancel a pickup"""
    pickup = db.query(models.Pickup).filter(
        models.Pickup.id == pickup_id,
        models.Pickup.user_id == current_user.id
    ).first()
    
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup not found")
    
    if pickup.status == "completed":
        raise HTTPException(status_code=400, detail="Cannot cancel completed pickup")
    
    pickup.status = "cancelled"
    db.commit()
    
    # Create notification
    create_notification(
        db,
        current_user.id,
        "Pickup Cancelled",
        f"Your pickup has been cancelled",
        "pickup",
        {"pickup_id": pickup.id}
    )
    
    return None
