from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from .. import models, schemas, auth
from ..database import get_db
from ..config import settings
from ..email_service import send_password_reset_email, send_account_recovery_email, send_welcome_email
import secrets

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user exists
    db_user = auth.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = auth.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create new user
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        phone=user.phone,
        hashed_password=hashed_password,
        address=user.address,
        city=user.city,
        postal_code=user.postal_code,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send welcome email
    send_welcome_email(user.email, user.username)
    
    return db_user

@router.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login and get access token"""
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
def get_current_user_info(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Get current user information"""
    return current_user

@router.put("/me", response_model=schemas.UserResponse)
def update_current_user(
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user information"""
    update_data = user_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user

@router.post("/forgot-password", response_model=schemas.PasswordResetResponse)
def forgot_password(
    request: schemas.ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    """Request password reset"""
    user = auth.get_user_by_email(db, email=request.email)
    
    if not user:
        # Don't reveal if email exists for security
        return {
            "message": "If an account exists with this email, a password reset link has been sent.",
            "success": True
        }
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    
    # Store token in database (you might want to add a password_reset_token field to User model)
    # For now, we'll use a simple approach with expiration
    user.password_reset_token = reset_token
    user.password_reset_token_expires = datetime.utcnow() + timedelta(
        minutes=settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
    )
    db.commit()
    
    # Send email
    send_password_reset_email(user.email, reset_token, user.username)
    
    return {
        "message": "Password reset link has been sent to your email.",
        "success": True
    }

@router.post("/reset-password", response_model=schemas.PasswordResetResponse)
def reset_password(
    request: schemas.PasswordResetRequest,
    db: Session = Depends(get_db)
):
    """Reset password with token"""
    # Find user by reset token
    user = db.query(models.User).filter(
        models.User.password_reset_token == request.token
    ).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check if token is expired
    if user.password_reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update password
    user.hashed_password = auth.get_password_hash(request.new_password)
    user.password_reset_token = None
    user.password_reset_token_expires = None
    db.commit()
    
    return {
        "message": "Password has been reset successfully.",
        "success": True
    }

@router.post("/recover-account", response_model=schemas.AccountRecoveryResponse)
def recover_account(
    request: schemas.AccountRecoveryRequest,
    db: Session = Depends(get_db)
):
    """Request account recovery"""
    user = auth.get_user_by_email(db, email=request.email)
    
    if not user:
        # Don't reveal if email exists for security
        return {
            "message": "If an account exists with this email, a recovery link has been sent.",
            "success": True
        }
    
    # Generate recovery token
    recovery_token = secrets.token_urlsafe(32)
    
    # Store token in database
    user.recovery_token = recovery_token
    user.recovery_token_expires = datetime.utcnow() + timedelta(
        minutes=settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
    )
    db.commit()
    
    # Send email
    send_account_recovery_email(user.email, recovery_token, user.username)
    
    return {
        "message": "Account recovery link has been sent to your email.",
        "success": True
    }
