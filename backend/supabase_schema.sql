-- TrashVerse Database Schema for Supabase
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/gtieccjexcvgrqhbwosd/sql

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS recycling_stations CASCADE;
DROP TABLE IF EXISTS pickups CASCADE;
DROP TABLE IF EXISTS waste_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    hashed_password VARCHAR NOT NULL,
    phone VARCHAR,
    role VARCHAR DEFAULT 'user',
    address VARCHAR,
    city VARCHAR DEFAULT 'Aba South',
    postal_code VARCHAR DEFAULT '643677',
    latitude FLOAT,
    longitude FLOAT,
    total_earnings FLOAT DEFAULT 0.0,
    total_pickups INTEGER DEFAULT 0,
    total_waste_kg FLOAT DEFAULT 0.0,
    total_co2_averted_kg FLOAT DEFAULT 0.0,
    points INTEGER DEFAULT 0,
    fcm_token VARCHAR,
    password_reset_token VARCHAR,
    password_reset_token_expires TIMESTAMP,
    recovery_token VARCHAR,
    recovery_token_expires TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create waste_entries table
CREATE TABLE waste_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    waste_type VARCHAR NOT NULL,
    weight_kg FLOAT NOT NULL,
    description TEXT,
    image_url VARCHAR,
    ai_confidence FLOAT,
    ai_suggestions TEXT,
    points_earned INTEGER DEFAULT 0,
    amount_earned FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pickups table
CREATE TABLE pickups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR DEFAULT 'pending',
    pickup_address VARCHAR NOT NULL,
    pickup_latitude FLOAT,
    pickup_longitude FLOAT,
    scheduled_date TIMESTAMP,
    completed_date TIMESTAMP,
    waste_type VARCHAR,
    estimated_weight_kg FLOAT,
    actual_weight_kg FLOAT,
    collector_id INTEGER REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recycling_stations table
CREATE TABLE recycling_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR DEFAULT 'Aba',
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    phone VARCHAR,
    email VARCHAR,
    accepted_waste_types VARCHAR,
    operating_hours VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR,
    amount FLOAT NOT NULL,
    points INTEGER DEFAULT 0,
    description VARCHAR,
    reference_id VARCHAR UNIQUE,
    reference_type VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR,
    is_read BOOLEAN DEFAULT FALSE,
    data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rewards table
CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL,
    reward_type VARCHAR,
    reward_value FLOAT,
    image_url VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_waste_entries_user_id ON waste_entries(user_id);
CREATE INDEX idx_pickups_user_id ON pickups(user_id);
CREATE INDEX idx_pickups_status ON pickups(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Success message
SELECT 'Schema created successfully!' as message;
