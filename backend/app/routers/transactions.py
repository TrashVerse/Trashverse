from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db
from ..utils import generate_reference_id, create_notification

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("/", response_model=List[schemas.TransactionResponse])
def get_transactions(
    skip: int = 0,
    limit: int = 50,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all transactions for current user"""
    transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user.id
    ).order_by(models.Transaction.created_at.desc()).offset(skip).limit(limit).all()
    
    return transactions

@router.post("/withdraw", response_model=schemas.TransactionResponse)
def withdraw_earnings(
    amount: float,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Withdraw earnings (placeholder for payment integration)"""
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")
    
    if current_user.total_earnings < amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    # Create withdrawal transaction
    transaction = models.Transaction(
        user_id=current_user.id,
        type="withdrawal",
        amount=-amount,
        points=0,
        description=f"Withdrawal of ₦{amount}",
        reference_id=generate_reference_id("WD"),
        reference_type="withdrawal"
    )
    db.add(transaction)
    
    # Update user balance
    current_user.total_earnings -= amount
    
    db.commit()
    db.refresh(transaction)
    
    # Create notification
    create_notification(
        db,
        current_user.id,
        "Withdrawal Successful",
        f"₦{amount} has been withdrawn from your account",
        "earning",
        {"transaction_id": transaction.id, "amount": amount}
    )
    
    return transaction

@router.get("/balance")
def get_balance(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Get current balance and points"""
    return {
        "balance": current_user.total_earnings,
        "points": current_user.points,
        "total_waste_kg": current_user.total_waste_kg,
        "total_co2_averted_kg": current_user.total_co2_averted_kg
    }
