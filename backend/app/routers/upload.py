from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional
import os
import uuid
from datetime import datetime
from .. import models, auth
from ..database import get_db

router = APIRouter(prefix="/api/upload", tags=["Upload"])

# Configure upload directory
UPLOAD_DIR = "uploads/waste_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/waste-image")
async def upload_waste_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload waste image for identification"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only JPEG, PNG, and WebP are allowed"
        )
    
    # Validate file size (max 5MB)
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max size is 5MB")
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # Return file URL (in production, use cloud storage URL)
    file_url = f"/uploads/waste_images/{unique_filename}"
    
    return {
        "success": True,
        "file_url": file_url,
        "filename": unique_filename,
        "message": "Image uploaded successfully"
    }

@router.post("/profile-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload user profile image"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only JPEG, PNG, and WebP are allowed"
        )
    
    # Validate file size (max 2MB)
    contents = await file.read()
    if len(contents) > 2 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max size is 2MB")
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"profile_{current_user.id}_{uuid.uuid4()}.{file_extension}"
    
    # Create profile images directory
    profile_dir = "uploads/profile_images"
    os.makedirs(profile_dir, exist_ok=True)
    
    file_path = os.path.join(profile_dir, unique_filename)
    
    # Save file
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # Return file URL
    file_url = f"/uploads/profile_images/{unique_filename}"
    
    return {
        "success": True,
        "file_url": file_url,
        "filename": unique_filename,
        "message": "Profile image uploaded successfully"
    }
