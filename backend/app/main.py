from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
from .routers import auth, waste, transactions, stations, pickups, analytics, notifications, rewards, upload
from .firebase import initialize_firebase
import os
import logging

# Configure logging for production
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize Firebase (optional - will not crash if credentials missing)
try:
    initialize_firebase()
except Exception as e:
    logging.warning(f"Firebase initialization failed: {e}")

app = FastAPI(
    title="TrashVerse API",
    description="Backend API for TrashVerse - Transforming Waste into Wealth",
    version="1.0.0",
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None,
)

# CORS middleware - configure for production
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001", 
    "https://trashverse.vercel.app",
    "https://trashverse-web.vercel.app",
    "https://www.trashverse.com",
    "https://trashverse.com",
]

# Add environment-specific origins
if os.getenv("FRONTEND_URL"):
    allowed_origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Create upload directories
os.makedirs("uploads/waste_images", exist_ok=True)
os.makedirs("uploads/profile_images", exist_ok=True)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(waste.router)
app.include_router(transactions.router)
app.include_router(stations.router)
app.include_router(pickups.router)
app.include_router(analytics.router)
app.include_router(notifications.router)
app.include_router(rewards.router)
app.include_router(upload.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to TrashVerse API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs" if os.getenv("ENVIRONMENT") != "production" else "disabled"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development")
    }
