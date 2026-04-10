from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional
from .. import models, auth
from ..database import get_db
from ..storage import upload_waste_image, upload_profile_image

router = APIRouter(prefix="/api/upload", tags=["Upload"])

@router.post("/waste-image")
async def upload_waste_image_endpoint(
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
    
    # Get file extension
    file_extension = file.filename.split(".")[-1].lower()
    
    # Upload to Supabase Storage or local fallback
    file_url = upload_waste_image(contents, file_extension)
    
    return {
        "success": True,
        "file_url": file_url,
        "message": "Image uploaded successfully"
    }

@router.post("/profile-image")
async def upload_profile_image_endpoint(
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
    
    # Get file extension
    file_extension = file.filename.split(".")[-1].lower()
    
    # Upload to Supabase Storage or local fallback
    file_url = upload_profile_image(contents, file_extension, current_user.id)
    
    return {
        "success": True,
        "file_url": file_url,
        "message": "Profile image uploaded successfully"
    }
