from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
from .routers import auth, waste, transactions, stations, pickups, analytics, notifications, rewards, upload
from .firebase import initialize_firebase
import os

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize Firebase
initialize_firebase()

app = FastAPI(
    title="TrashVerse API",
    description="Backend API for TrashVerse - Transforming Waste into Wealth",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
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
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
