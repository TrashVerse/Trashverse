"""
Supabase Storage integration for file uploads
Handles waste images and profile images
"""
import os
import uuid
from typing import Optional
from supabase import create_client, Client
from .config import settings

# Initialize Supabase client
supabase: Optional[Client] = None

if settings.SUPABASE_PROJECT_URL and settings.SUPABASE_ANON_KEY:
    try:
        supabase = create_client(
            settings.SUPABASE_PROJECT_URL,
            settings.SUPABASE_ANON_KEY
        )
        print("✅ Supabase Storage initialized")
    except Exception as e:
        print(f"⚠️ Supabase Storage initialization failed: {e}")
        supabase = None
else:
    print("⚠️ Supabase credentials not configured. Using local storage.")

# Storage bucket names
WASTE_IMAGES_BUCKET = "waste-images"
PROFILE_IMAGES_BUCKET = "profile-images"

def upload_to_supabase(
    file_content: bytes,
    filename: str,
    bucket: str,
    content_type: str = "image/png"
) -> Optional[str]:
    """
    Upload file to Supabase Storage
    
    Args:
        file_content: File bytes
        filename: Unique filename
        bucket: Storage bucket name
        content_type: MIME type
        
    Returns:
        Public URL of uploaded file or None if failed
    """
    if not supabase:
        return None
    
    try:
        # Upload file to Supabase Storage
        response = supabase.storage.from_(bucket).upload(
            filename,
            file_content,
            {
                "content-type": content_type,
                "upsert": "true"  # Overwrite if exists
            }
        )
        
        # Get public URL
        public_url = supabase.storage.from_(bucket).get_public_url(filename)
        
        return public_url
    except Exception as e:
        print(f"❌ Supabase upload failed: {e}")
        return None

def upload_waste_image(file_content: bytes, file_extension: str) -> str:
    """
    Upload waste image to Supabase or local storage
    
    Args:
        file_content: Image bytes
        file_extension: File extension (e.g., 'png', 'jpg')
        
    Returns:
        Public URL or local path
    """
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    
    # Try Supabase first
    if supabase:
        public_url = upload_to_supabase(
            file_content,
            unique_filename,
            WASTE_IMAGES_BUCKET,
            f"image/{file_extension}"
        )
        if public_url:
            return public_url
    
    # Fallback to local storage
    local_dir = "uploads/waste_images"
    os.makedirs(local_dir, exist_ok=True)
    local_path = os.path.join(local_dir, unique_filename)
    
    with open(local_path, "wb") as f:
        f.write(file_content)
    
    return f"/uploads/waste_images/{unique_filename}"

def upload_profile_image(file_content: bytes, file_extension: str, user_id: int) -> str:
    """
    Upload profile image to Supabase or local storage
    
    Args:
        file_content: Image bytes
        file_extension: File extension
        user_id: User ID for filename
        
    Returns:
        Public URL or local path
    """
    # Generate unique filename with user ID
    unique_filename = f"profile_{user_id}_{uuid.uuid4()}.{file_extension}"
    
    # Try Supabase first
    if supabase:
        public_url = upload_to_supabase(
            file_content,
            unique_filename,
            PROFILE_IMAGES_BUCKET,
            f"image/{file_extension}"
        )
        if public_url:
            return public_url
    
    # Fallback to local storage
    local_dir = "uploads/profile_images"
    os.makedirs(local_dir, exist_ok=True)
    local_path = os.path.join(local_dir, unique_filename)
    
    with open(local_path, "wb") as f:
        f.write(file_content)
    
    return f"/uploads/profile_images/{unique_filename}"

def delete_from_supabase(filename: str, bucket: str) -> bool:
    """
    Delete file from Supabase Storage
    
    Args:
        filename: File to delete
        bucket: Storage bucket name
        
    Returns:
        True if successful, False otherwise
    """
    if not supabase:
        return False
    
    try:
        supabase.storage.from_(bucket).remove([filename])
        return True
    except Exception as e:
        print(f"❌ Supabase delete failed: {e}")
        return False

def create_storage_buckets():
    """
    Create storage buckets if they don't exist
    Should be run once during setup
    """
    if not supabase:
        print("⚠️ Supabase not initialized. Cannot create buckets.")
        return
    
    buckets = [WASTE_IMAGES_BUCKET, PROFILE_IMAGES_BUCKET]
    
    for bucket_name in buckets:
        try:
            # Try to create bucket (will fail if exists)
            supabase.storage.create_bucket(
                bucket_name,
                {
                    "public": True,  # Make bucket public
                    "file_size_limit": 5242880  # 5MB limit
                }
            )
            print(f"✅ Created bucket: {bucket_name}")
        except Exception as e:
            # Bucket might already exist
            print(f"ℹ️ Bucket {bucket_name}: {e}")
