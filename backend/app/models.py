from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"
    COLLECTOR = "collector"

class WasteType(str, enum.Enum):
    PLASTIC = "plastic"
    PAPER = "paper"
    METAL = "metal"
    ELECTRONICS = "electronics"
    GLASS = "glass"
    ORGANIC = "organic"
    TEXTILE = "textile"

class PickupStatus(str, enum.Enum):
    PENDING = "pending"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)
    phone = Column(String)
    role = Column(String, default=UserRole.USER.value)
    
    # Location
    address = Column(String)
    city = Column(String, default="Aba South")
    postal_code = Column(String, default="643677")
    latitude = Column(Float)
    longitude = Column(Float)
    
    # Stats
    total_earnings = Column(Float, default=0.0)
    total_pickups = Column(Integer, default=0)
    total_waste_kg = Column(Float, default=0.0)
    total_co2_averted_kg = Column(Float, default=0.0)
    points = Column(Integer, default=0)
    
    # FCM Token for push notifications
    fcm_token = Column(String, nullable=True)
    
    # Password reset tokens
    password_reset_token = Column(String, nullable=True)
    password_reset_token_expires = Column(DateTime, nullable=True)
    
    # Account recovery tokens
    recovery_token = Column(String, nullable=True)
    recovery_token_expires = Column(DateTime, nullable=True)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    waste_entries = relationship("WasteEntry", back_populates="user")
    pickups = relationship("Pickup", foreign_keys="Pickup.user_id", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class WasteEntry(Base):
    __tablename__ = "waste_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    waste_type = Column(String, nullable=False)
    weight_kg = Column(Float, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    
    # AI identification
    ai_confidence = Column(Float)
    ai_suggestions = Column(Text)
    
    # Earnings
    points_earned = Column(Integer, default=0)
    amount_earned = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="waste_entries")

class Pickup(Base):
    __tablename__ = "pickups"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default=PickupStatus.PENDING.value)
    
    # Location
    pickup_address = Column(String, nullable=False)
    pickup_latitude = Column(Float)
    pickup_longitude = Column(Float)
    
    # Scheduling
    scheduled_date = Column(DateTime)
    completed_date = Column(DateTime)
    
    # Waste details
    waste_type = Column(String)
    estimated_weight_kg = Column(Float)
    actual_weight_kg = Column(Float)
    
    # Collector
    collector_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", foreign_keys=[user_id], back_populates="pickups")
    collector = relationship("User", foreign_keys=[collector_id])

class RecyclingStation(Base):
    __tablename__ = "recycling_stations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, default="Aba")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    
    # Contact
    phone = Column(String)
    email = Column(String)
    
    # Accepted waste types (comma-separated)
    accepted_waste_types = Column(String)
    
    # Operating hours
    operating_hours = Column(String)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    type = Column(String)  # "earning", "withdrawal", "bonus"
    amount = Column(Float, nullable=False)
    points = Column(Integer, default=0)
    description = Column(String)
    
    # Reference
    reference_id = Column(String, unique=True)
    reference_type = Column(String)  # "waste_entry", "pickup", "reward"
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="transactions")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    title = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    type = Column(String)  # "pickup", "earning", "reward", "general"
    
    is_read = Column(Boolean, default=False)
    data = Column(Text)  # JSON string for additional data
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="notifications")

class Reward(Base):
    __tablename__ = "rewards"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    points_required = Column(Integer, nullable=False)
    
    # Reward details
    reward_type = Column(String)  # "cash", "voucher", "product"
    reward_value = Column(Float)
    
    image_url = Column(String)
    is_active = Column(Boolean, default=True)
    stock_quantity = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
