from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db
from ..utils import calculate_earnings, update_user_stats, create_notification, generate_reference_id

router = APIRouter(prefix="/api/waste", tags=["Waste Management"])

@router.post("/entries", response_model=schemas.WasteEntryResponse, status_code=status.HTTP_201_CREATED)
def create_waste_entry(
    waste_entry: schemas.WasteEntryCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new waste entry and calculate earnings"""
    # Calculate earnings
    earnings = calculate_earnings(waste_entry.waste_type.value, waste_entry.weight_kg)
    
    # Create waste entry
    db_entry = models.WasteEntry(
        user_id=current_user.id,
        waste_type=waste_entry.waste_type.value,
        weight_kg=waste_entry.weight_kg,
        description=waste_entry.description,
        image_url=waste_entry.image_url,
        points_earned=earnings["points"],
        amount_earned=earnings["amount"]
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    
    # Create transaction record
    transaction = models.Transaction(
        user_id=current_user.id,
        type="earning",
        amount=earnings["amount"],
        points=earnings["points"],
        description=f"Recycled {waste_entry.weight_kg}kg of {waste_entry.waste_type.value}",
        reference_id=generate_reference_id("WE"),
        reference_type="waste_entry"
    )
    db.add(transaction)
    db.commit()
    
    # Update user stats
    update_user_stats(db, current_user)
    
    # Create notification
    create_notification(
        db,
        current_user.id,
        "Waste Entry Recorded!",
        f"You earned ₦{earnings['amount']} and {earnings['points']} points for recycling {waste_entry.weight_kg}kg of {waste_entry.waste_type.value}",
        "earning",
        {"entry_id": db_entry.id, "amount": earnings["amount"], "points": earnings["points"]}
    )
    
    return db_entry

@router.get("/entries", response_model=List[schemas.WasteEntryResponse])
def get_waste_entries(
    skip: int = 0,
    limit: int = 50,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all waste entries for current user"""
    entries = db.query(models.WasteEntry).filter(
        models.WasteEntry.user_id == current_user.id
    ).order_by(models.WasteEntry.created_at.desc()).offset(skip).limit(limit).all()
    
    return entries

@router.get("/entries/{entry_id}", response_model=schemas.WasteEntryResponse)
def get_waste_entry(
    entry_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific waste entry"""
    entry = db.query(models.WasteEntry).filter(
        models.WasteEntry.id == entry_id,
        models.WasteEntry.user_id == current_user.id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Waste entry not found")
    
    return entry

@router.delete("/entries/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_waste_entry(
    entry_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a waste entry"""
    entry = db.query(models.WasteEntry).filter(
        models.WasteEntry.id == entry_id,
        models.WasteEntry.user_id == current_user.id
    ).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Waste entry not found")
    
    db.delete(entry)
    db.commit()
    
    # Update user stats
    update_user_stats(db, current_user)
    
    return None
