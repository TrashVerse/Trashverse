from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, auth
from ..database import get_db
from ..utils import calculate_distance

router = APIRouter(prefix="/api/stations", tags=["Recycling Stations"])

@router.get("/", response_model=List[schemas.RecyclingStationResponse])
def get_recycling_stations(
    latitude: Optional[float] = None,
    longitude: Optional[float] = None,
    max_distance_km: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """Get all recycling stations, optionally filtered by distance"""
    stations = db.query(models.RecyclingStation).filter(
        models.RecyclingStation.is_active == True
    ).all()
    
    # Calculate distances if coordinates provided
    if latitude and longitude:
        for station in stations:
            station.distance_km = calculate_distance(
                latitude, longitude,
                station.latitude, station.longitude
            )
        
        # Sort by distance
        stations.sort(key=lambda x: x.distance_km)
        
        # Filter by max distance if specified
        if max_distance_km:
            stations = [s for s in stations if s.distance_km <= max_distance_km]
    
    return stations

@router.get("/{station_id}", response_model=schemas.RecyclingStationResponse)
def get_recycling_station(
    station_id: int,
    latitude: Optional[float] = None,
    longitude: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """Get a specific recycling station"""
    station = db.query(models.RecyclingStation).filter(
        models.RecyclingStation.id == station_id
    ).first()
    
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    
    # Calculate distance if coordinates provided
    if latitude and longitude:
        station.distance_km = calculate_distance(
            latitude, longitude,
            station.latitude, station.longitude
        )
    
    return station

@router.post("/", response_model=schemas.RecyclingStationResponse, status_code=status.HTTP_201_CREATED)
def create_recycling_station(
    station: schemas.RecyclingStationCreate,
    current_user: models.User = Depends(auth.get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new recycling station (admin only)"""
    db_station = models.RecyclingStation(**station.model_dump())
    db.add(db_station)
    db.commit()
    db.refresh(db_station)
    
    return db_station

@router.get("/nearby/search")
def find_nearest_station(
    latitude: float,
    longitude: float,
    waste_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Find the nearest recycling station"""
    stations = db.query(models.RecyclingStation).filter(
        models.RecyclingStation.is_active == True
    ).all()
    
    if not stations:
        raise HTTPException(status_code=404, detail="No stations found")
    
    # Calculate distances and find nearest
    nearest = None
    min_distance = float('inf')
    
    for station in stations:
        # Filter by waste type if specified
        if waste_type and station.accepted_waste_types:
            if waste_type.lower() not in station.accepted_waste_types.lower():
                continue
        
        distance = calculate_distance(
            latitude, longitude,
            station.latitude, station.longitude
        )
        
        if distance < min_distance:
            min_distance = distance
            nearest = station
            nearest.distance_km = distance
    
    if not nearest:
        raise HTTPException(status_code=404, detail="No suitable station found")
    
    return nearest
