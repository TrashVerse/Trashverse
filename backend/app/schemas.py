from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"
    COLLECTOR = "collector"

class WasteType(str, Enum):
    PLASTIC = "plastic"
    PAPER = "paper"
    METAL = "metal"
    ELECTRONICS = "electronics"
    GLASS = "glass"
    ORGANIC = "organic"
    TEXTILE = "textile"

class PickupStatus(str, Enum):
    PENDING = "pending"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    address: Optional[str] = None
    city: Optional[str] = "Aba South"
    postal_code: Optional[str] = "643677"

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    fcm_token: Optional[str] = None

class UserResponse(UserBase):
    id: int
    role: str
    address: Optional[str]
    city: Optional[str]
    postal_code: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    total_earnings: float
    total_pickups: int
    total_waste_kg: float
    total_co2_averted_kg: float
    points: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Waste Entry Schemas
class WasteEntryCreate(BaseModel):
    waste_type: WasteType
    weight_kg: float = Field(gt=0)
    description: Optional[str] = None
    image_url: Optional[str] = None

class WasteEntryResponse(BaseModel):
    id: int
    user_id: int
    waste_type: str
    weight_kg: float
    description: Optional[str]
    image_url: Optional[str]
    ai_confidence: Optional[float]
    ai_suggestions: Optional[str]
    points_earned: int
    amount_earned: float
    created_at: datetime
    
    class Config:
        from_attributes = True

# Pickup Schemas
class PickupCreate(BaseModel):
    pickup_address: str
    pickup_latitude: Optional[float] = None
    pickup_longitude: Optional[float] = None
    waste_type: WasteType
    estimated_weight_kg: float = Field(gt=0)
    scheduled_date: Optional[datetime] = None
    notes: Optional[str] = None

class PickupUpdate(BaseModel):
    status: Optional[PickupStatus] = None
    scheduled_date: Optional[datetime] = None
    actual_weight_kg: Optional[float] = None
    notes: Optional[str] = None

class PickupResponse(BaseModel):
    id: int
    user_id: int
    status: str
    pickup_address: str
    pickup_latitude: Optional[float]
    pickup_longitude: Optional[float]
    scheduled_date: Optional[datetime]
    completed_date: Optional[datetime]
    waste_type: Optional[str]
    estimated_weight_kg: Optional[float]
    actual_weight_kg: Optional[float]
    collector_id: Optional[int]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Recycling Station Schemas
class RecyclingStationCreate(BaseModel):
    name: str
    address: str
    city: str = "Aba"
    latitude: float
    longitude: float
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    accepted_waste_types: Optional[str] = None
    operating_hours: Optional[str] = None

class RecyclingStationResponse(BaseModel):
    id: int
    name: str
    address: str
    city: str
    latitude: float
    longitude: float
    phone: Optional[str]
    email: Optional[str]
    accepted_waste_types: Optional[str]
    operating_hours: Optional[str]
    is_active: bool
    distance_km: Optional[float] = None
    
    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionResponse(BaseModel):
    id: int
    user_id: int
    type: str
    amount: float
    points: int
    description: Optional[str]
    reference_id: Optional[str]
    reference_type: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Notification Schemas
class NotificationCreate(BaseModel):
    title: str
    body: str
    type: Optional[str] = "general"
    data: Optional[str] = None

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    body: str
    type: Optional[str]
    is_read: bool
    data: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Reward Schemas
class RewardCreate(BaseModel):
    name: str
    description: Optional[str] = None
    points_required: int = Field(gt=0)
    reward_type: str
    reward_value: float
    image_url: Optional[str] = None
    stock_quantity: int = 0

class RewardResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    points_required: int
    reward_type: str
    reward_value: float
    image_url: Optional[str]
    is_active: bool
    stock_quantity: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Analytics Schemas
class UserStats(BaseModel):
    total_earnings: float
    total_pickups: int
    total_waste_kg: float
    total_co2_averted_kg: float
    points: int
    recent_transactions: List[TransactionResponse]
    waste_breakdown: dict

class DashboardStats(BaseModel):
    user_stats: UserStats
    upcoming_pickups: List[PickupResponse]
    available_rewards: List[RewardResponse]
